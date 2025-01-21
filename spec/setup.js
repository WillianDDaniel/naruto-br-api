import { setupDatabase } from "./setupDatabase";

beforeEach(async () => {
  await setupDatabase();
});