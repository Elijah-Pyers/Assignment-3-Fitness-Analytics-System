// Test health reader.js module here

const path = require('path');
const fs = require('fs/promises');
const { readHealthFile } = require('./healthReader');

const TEST_FILE = path.join(__dirname, 'test-health.json');

// Create test data
const testData = {
    user: 'TestUser',
    entries: [
        {
            date: '2024-01-15',
            steps: 8000,
            heartRate: 72
        },
        {
            date: '2024-01-16',
            steps: 10000,
            heartRate: 68
        },
        {
            date: '2024-01-17',
            steps: 6500,
            heartRate: 75
        }
    ]
};

beforeAll(async () => {
    // Create test file before running tests
    await fs.writeFile(TEST_FILE, JSON.stringify(testData));
});

afterAll(async () => {
    // Clean up test file after tests complete
    try {
        await fs.unlink(TEST_FILE);
    } catch {
        // It's okay if the file is already gone
    }
});

describe('readHealthFile', () => {
    test('reads a valid JSON file', async () => {
        const result = await readHealthFile(TEST_FILE);
        expect(result).not.toBeNull();
        expect(result.user).toBe('TestUser');
        expect(result.entries).toHaveLength(3);
        expect(result.entries[0].date).toBe('2024-01-15');
    });

    test('returns correct data structure', async () => {
        const result = await readHealthFile(TEST_FILE);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('entries');
        expect(Array.isArray(result.entries)).toBe(true);
    });

    test('returns null when the file is missing', async () => {
        const result = await readHealthFile('missing.json');
        expect(result).toBeNull();
    });

    test('counts health entries correctly', async () => {
        const result = await readHealthFile(TEST_FILE);
        expect(result).not.toBeNull();
        expect(result.entries.length).toBe(3);
    });

    test('each entry has required properties', async () => {
        const result = await readHealthFile(TEST_FILE);
        expect(result).not.toBeNull();
        const firstEntry = result.entries[0];
        expect(firstEntry).toHaveProperty('date');
        expect(firstEntry).toHaveProperty('steps');
        expect(firstEntry).toHaveProperty('heartRate');
    });
});