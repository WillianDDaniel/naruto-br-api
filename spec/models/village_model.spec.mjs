import { Village } from '../../models';

describe('Village', () => {
  it('should be defined', () => {
    expect(Village).toBeDefined();
  });

  it('should be valid when all fields are correct', async () => {
    const village = Village.build({
      name: 'Konohagakure',
    });

    await expect(village.validate()).resolves.not.toThrow();
  });

  it('should require a name', async () => {
    const village = Village.build({
      name: null,
    });

    await expect(village.validate()).rejects.toThrow(/name cannot be null/);
  });

  it('should reject an empty name', async () => {
    const village = Village.build({
      name: '',
    });

    await expect(village.validate()).rejects.toThrow(/Validation error/);
  });

  it('should require the name to be unique', async () => {
    await Village.create({ name: 'Konohagakure' });

    const duplicateVillage = Village.build({
      name: 'Konohagakure',
    });

    await expect(duplicateVillage.save()).rejects.toThrow(/Village name must be unique/);
  });

  it('should allow creating villages with different names', async () => {
    const village1 = await Village.create({ name: 'Konohagakure' });
    const village2 = await Village.create({ name: 'Sunagakure' });

    expect(village1.name).toBe('Konohagakure');
    expect(village2.name).toBe('Sunagakure');
  });
});
