// Mathematical calculator app doesn't require storage/user management
// All calculations are handled client-side with validation on API endpoints

export interface IStorage {
  // Future storage methods can be added here if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Mathematical calculations don't require persistent storage
  }
}

export const storage = new MemStorage();
