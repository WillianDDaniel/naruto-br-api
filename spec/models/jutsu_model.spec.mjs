import { Jutsu, Character, Village } from '../../models';

describe('Jutsu', () => {
  it('should be defined', () => {
    expect(Jutsu).toBeDefined();
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

    const jutsu = Jutsu.build({
      name: 'Rasengan',
      type: 'Ninjutsu',
      power: 8000,
      description: 'A powerful spiraling sphere of chakra.',
      character_id: character.id,
    });

    await expect(jutsu.validate()).resolves.not.toThrow();
  });

  it('should require a name', async () => {
    const jutsu = Jutsu.build({
      type: 'Ninjutsu',
      power: 8000,
      description: 'A powerful spiraling sphere of chakra.',
      character_id: 1,
    });

    await expect(jutsu.validate()).rejects.toThrow(/name cannot be null/);
  });

  it('should require a type', async () => {
    const jutsu = Jutsu.build({
      name: 'Rasengan',
      power: 8000,
      description: 'A powerful spiraling sphere of chakra.',
      character_id: 1,
    });

    await expect(jutsu.validate()).rejects.toThrow(/type cannot be null/);
  });

  it('should require a power', async () => {
    const jutsu = Jutsu.build({
      name: 'Rasengan',
      type: 'Ninjutsu',
      description: 'A powerful spiraling sphere of chakra.',
      character_id: 1,
    });

    await expect(jutsu.validate()).rejects.toThrow(/power cannot be null/);
  });

  it('should require a character_id', async () => {
    const jutsu = Jutsu.build({
      name: 'Rasengan',
      type: 'Ninjutsu',
      power: 8000,
      description: 'A powerful spiraling sphere of chakra.',
    });

    await expect(jutsu.validate()).rejects.toThrow(/character_id cannot be null/);
  });

  it('should reject invalid foreign keys for character_id', async () => {
    const jutsu = Jutsu.build({
      name: 'Rasengan',
      type: 'Ninjutsu',
      power: 8000,
      description: 'A powerful spiraling sphere of chakra.',
      character_id: 9999,
    });

    await expect(jutsu.validate()).rejects.toThrow(/Character ID must refer to a valid Character/);
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

    const jutsu = Jutsu.build({
      name: '',
      type: '',
      power: '',
      description: '',
      character_id: character.id,
    });

    await expect(jutsu.validate()).rejects.toThrow(/Validation error/);
  });

});
