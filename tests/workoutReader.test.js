// Test your workoutReader.js module here

const path = require('path');
const fs = require('fs');
const { workoutCalculator, readWorkoutData } = require('./workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-workouts.csv');

// Create test CSV data
const testCsvData = `date,exercise,minutes,calories
2024-01-15,Running,30,300
2024-01-16,Cycling,45,400
2024-01-17,Swimming,25,250`;

beforeAll(async () => {
    // Create test file before running tests
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(async () => {
    // Clean up test file after tests complete
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch {
        // It's okay if the file doesn't exist
    }
});

describe('Workout CSV Processing', () => {
    test('reads and processes valid CSV file', async () => {
        const result = await workoutCalculator(TEST_CSV_FILE);
        expect(result).not.toBeNull();
        expect(result.totalWorkouts).toBe(3);
        expect(result.totalMinutes).toBe(100);
    });

    test('readWorkoutData returns correct data structure', async () => {
        const data = await readWorkoutData(TEST_CSV_FILE);
        expect(Array.isArray(data)).toBe(true);
        expect(data).toHaveLength(3);
        expect(data[0]).toHaveProperty('date');
        expect(data[0]).toHaveProperty('exercise');
        expect(data[0]).toHaveProperty('minutes');
    });

    test('returns null when the file is missing', async () => {
        const result = await workoutCalculator('missing-file.csv');
        expect(result).toBeNull();
    });

    test('calculates correct total minutes', async () => {
        const result = await workoutCalculator(TEST_CSV_FILE);
        expect(result).not.toBeNull();
        // 30 + 45 + 25 = 100
        expect(result.totalMinutes).toBe(100);
    });
});