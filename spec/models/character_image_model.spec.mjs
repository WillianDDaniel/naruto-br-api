import { CharacterImage, Character, Village } from '../../models';

describe('CharacterImage', () => {
  it('should be defined', () => {
    expect(CharacterImage).toBeDefined();
  });

  it('should be valid when all fields are correct', async () => {
    const village = await Village.create({ name: 'Konohagakure' });

    const character = await Character.create({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      village_id: village.id,
    });

    const characterImage = CharacterImage.build({
      image_url: 'https://example.com/naruto.png',
      image_type: 'jpg',
      character_id: character.id,
    });

    await expect(characterImage.validate()).resolves.not.toThrow();
  });

  it('should require an image_url', async () => {
    const characterImage = CharacterImage.build({
      image_type: 'png',
      character_id: 1,
    });

    await expect(characterImage.validate()).rejects.toThrow(/image_url cannot be null/);
  });

  it('should require an image_type', async () => {
    const characterImage = CharacterImage.build({
      image_url: 'https://example.com/naruto.png',
      character_id: 1,
    });

    await expect(characterImage.validate()).rejects.toThrow(/image_type cannot be null/);
  });

  it('should allow only jpg and png as image_type', async () => {
    const characterImage = CharacterImage.build({
      image_url: 'https://example.com/naruto.gif',
      image_type: 'gif',
      character_id: 1,
    });

    await expect(characterImage.validate()).rejects.toThrow(/Validation error/);
  });

  it('should require a character_id', async () => {
    const characterImage = CharacterImage.build({
      image_url: 'https://example.com/naruto.png',
      image_type: 'png',
    });

    await expect(characterImage.validate()).rejects.toThrow(/character_id cannot be null/);
  });

  it('should reject invalid foreign keys for character_id', async () => {
    const characterImage = CharacterImage.build({
      image_url: 'https://example.com/naruto.png',
      image_type: 'png',
      character_id: 9999,
    });

    await expect(characterImage.validate()).rejects.toThrow(/Character ID must refer to a valid Character/);
  });

  it('should reject empty strings for required fields', async () => {
    const village = await Village.create({ name: 'Konohagakure' });
    const character = await Character.create({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      village_id: village.id,
    });

    const characterImage = CharacterImage.build({
      image_url: '',
      image_type: '',
      character_id: character.id,
    });

    await expect(characterImage.validate()).rejects.toThrow(/Validation error/);
  });

});
