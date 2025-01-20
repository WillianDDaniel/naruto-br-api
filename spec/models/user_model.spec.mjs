import { User } from '../../models';

describe('User', () => {
  it('should be defined', () => {
    expect(User).toBeDefined();
  });

  it('should be valid when all fields are correct', async () => {
    const user = User.build({
      username: 'admin',
      email: 'admin@localhost.com',
    });
    await user.setPassword('password123');

    await expect(user.validate()).resolves.not.toThrow();
  });

  it('should be invalid when username is missing', async () => {
    const user = User.build({
      email: 'admin@localhost.com',
    });
    await user.setPassword('password123');

    await expect(user.validate()).rejects.toThrow(/username cannot be null/);
  });

  it('should be invalid when email is missing', async () => {
    const user = User.build({
      username: 'admin',
    });
    await user.setPassword('password123');

    await expect(user.validate()).rejects.toThrow(/email cannot be null/);
  });

  it('should be invalid when password is missing', async () => {
    const user = User.build({
      username: 'admin',
      email: 'admin@localhost.com',
    });
    await expect(user.validate()).rejects.toThrow(/password_hash cannot be null/);
  });

  it('should reject empty strings for required fields', async () => {
    const user = User.build({
      username: '',
      email: '',
      password_hash: '',
    });

    await expect(user.validate()).rejects.toThrow(/Validation notEmpty on username failed/);
    await expect(user.validate()).rejects.toThrow(/Validation notEmpty on email failed/);
    await expect(user.validate()).rejects.toThrow(/Validation notEmpty on password_hash failed/);
  });
});