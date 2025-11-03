
console.log('Resolved healthReader:', require.resolve('../Assignment-3-Fitness-Analytics-System/healthReader.js'));

const { readHealthFile } = require('../Assignment-3-Fitness-Analytics-System/healthReader');
const { readWorkoutData } = require('../Assignment-3-Fitness-Analytics-System/workoutReader');
const { workoutCalculator } = require('../Assignment-3-Fitness-Analytics-System/workoutReader');

require('dotenv').config({ path: 'fitness.env' });
console.log(process.env.USER_NAME); // 
console.log(process.env.WEEKLY_GOAL); // 

async function processFiles() {
    try {
        // Get user name from environment variable
        const userName = process.env.USER_NAME;
        const weeklyGoal = parseInt(process.env.WEEKLY_GOAL);
        
        console.log(`Processing data for: ${userName}`);
        console.log(' Reading workout data...');
        
        // Call workout calculator and get results
        const workoutResults = await workoutCalculator('../Assignment-3-Fitness-Analytics-System/data/workouts.csv');
        
        console.log(' Reading health data...');
        
        // Call health file reader and get results
        const healthResults = await readHealthFile('../Assignment-3-Fitness-Analytics-System/data/health-metrics.json');
        
        // Check if both functions returned valid data
        if (!workoutResults || !healthResults) {
            console.log(' Error: Could not load all required data files');
            return;
        }
        
        // Display summary
        console.log('\n=== SUMMARY ===');
        console.log(`Workouts found: ${workoutResults.totalWorkouts}`);
        console.log(`Total workout minutes: ${workoutResults.totalMinutes}`);
        console.log(`Health entries found: ${healthResults.entries.length}`);
        console.log(`Weekly goal: ${weeklyGoal} minutes`);
        
        // Check if weekly goal has been met
        if (workoutResults.totalMinutes >= weeklyGoal) {
            console.log(` Congratulations ${userName}! You have exceeded your weekly goal!`);
        } else {
            const minutesNeeded = weeklyGoal - workoutResults.totalMinutes;
            console.log(`Keep going ${userName}! You need ${minutesNeeded} more minutes to reach your weekly goal.`);
        }
        
    } catch(error) {
        console.log(' Error processing files:', error.message);
        console.log('Please check that:');
        console.log('  - Your .env file exists with USER_NAME and WEEKLY_GOAL');
        console.log('  - Your data files exist in the correct location');
    }
}

// Call the main function
processFiles();

// Export for testing
module.exports = { processFiles };