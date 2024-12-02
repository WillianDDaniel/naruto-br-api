import { describe, it, expect, beforeEach } from 'vitest';
import { setupDatabase } from '../setup.js';
import { Character, Village } from '../../models';

describe('Character', () => {

  beforeEach(async () => {
    await setupDatabase();
  });

  it('should be defined', () => {
    expect(Character).toBeDefined();
  });

  it('should be valid when all fields are correct', async () => {
    const village = await Village.create({ name: 'Konohagakure' });

    const father = await Character.create({
      name: 'Minato Namikaze',
      rank: 'Fourth Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      village_id: village.id,
    });

    const mother = await Character.create({
      name: 'Kushina Uzumaki',
      rank: 'Jinchuuriki',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      village_id: village.id,
    });

    const character = Character.build({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      father_id: father.id,
      mother_id: mother.id,
      village_id: village.id,
    });

    await expect(character.validate()).resolves.not.toThrow();
  });

  it('should require a name', async () => {
    const character = Character.build({
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
    });

    await expect(character.validate()).rejects.toThrow(/name cannot be null/);
  });

  it('should require a rank', async () => {
    const character = Character.build({
      name: 'Naruto Uzumaki',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
    });

    await expect(character.validate()).rejects.toThrow(/rank cannot be null/);
  });

  it('should require a power level', async () => {
    const character = Character.build({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
    });

    await expect(character.validate()).rejects.toThrow(/power cannot be null/);
  });

  it('should require a profile_image', async () => {
    const character = Character.build({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      summary: 'A ninja from Konoha who aims to become Hokage.',
    });

    await expect(character.validate()).rejects.toThrow(/profile_image cannot be null/);
  });

  it('should require a summary', async () => {
    const character = Character.build({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
    });

    await expect(character.validate()).rejects.toThrow(/summary cannot be null/);
  });

  it('should allow nullable relationships', async () => {
    const character = Character.build({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      father_id: null,
      mother_id: null,
      village_id: null,
    });

    await expect(character.validate()).resolves.not.toThrow();
  });

  it('should reject empty strings for required fields', async () => {
    const character = Character.build({
      name: '',
      rank: '',
      power: 9000,
      profile_image: '',
      summary: '',
    });

    await expect(character.validate()).rejects.toThrow(/Validation error/);
  });

  it('should reject invalid foreign keys', async () => {
    const character = Character.build({
      name: 'Naruto Uzumaki',
      rank: 'Hokage',
      power: 9000,
      profile_image: 'https://example.com/naruto.jpg',
      summary: 'A ninja from Konoha who aims to become Hokage.',
      father_id: 9999,
      mother_id: 9999,
      village_id: 9999,
    });

    await expect(character.validate()).rejects.toThrow(/Father ID must refer to a valid Character/);
    await expect(character.validate()).rejects.toThrow(/Mother ID must refer to a valid Character/);
    await expect(character.validate()).rejects.toThrow(/Village ID must refer to a valid Village/);
  });
});