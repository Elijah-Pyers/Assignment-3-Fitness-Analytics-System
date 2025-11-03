
//CSV Data

/*
Create CSV Reader Function(s): In the workoutReader.js file, create a script that:
1. Uses the csv-parser package to read CSV workout data asynchronously
2. Counts the total number of workouts in the CSV file
3. Calculates total workout minutes in the CSV file using a basic for loop
4. Handles errors when the CSV file is missing or corrupted
5. Provides clear error messages to users
*/



const fs = require('fs');
const csv = require('csv-parser');

async function readWorkoutData(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function workoutCalculator(filepath) {
    try {
        // Read the CSV file
        const workoutData = await readWorkoutData(filepath);
        
        // Count total number of workouts

        const totalWorkouts = Array.isArray(workoutData) ? workoutData.length : 0;
        //let totalWorkouts = workoutData.length;
        
        
        // Calculate total workout minutes using a basic for loop
        let totalMinutes = 0;
        for (let i = 0; i < workoutData.length; i++) {
            const workout = workoutData[i];
            // Convert string to number using parseInt
            totalMinutes += parseInt(workout.duration);
        }
        
        // Display results
        //console.log('Total workouts:', totalWorkouts);
        //console.log('Total minutes:', totalMinutes);
        
        return { totalWorkouts, totalMinutes };
        
    } catch(error) {
        // Handle different types of errors
        if (error.code === 'ENOENT') {
            console.log(' CSV file not found - check the file path');
        } else {
            console.log(' Error processing CSV file:', error.message);
        }
        return null;
    }
}

// Main
//async function readWorkoutData(filepath) {
//console.log('Read workout data:', readWorkoutData('../Assignment-3-Fitness-Analytics-System/data/workouts.csv'));
//console.log('Total minutes:', workoutCalculator('../Assignment-3-Fitness-Analytics-System/data/workouts.csv'));

// workoutReader.js
// ... your readWorkoutData + workoutCalculator code ...

/*

(async () => {
    //read workout data
  //const csvPath = './data/workouts.csv';
  //const rows = await readWorkoutData(csvPath);
  //console.log('rows:', rows.length);


  //Workout calculator
  const csvPath1 = './data/workouts.csv';
  const stats = await workoutCalculator(csvPath1);
  console.log('stats:', stats);
})();
*/

/*
(async () => {
  const csvPath = './data/workouts.csv';

  const stats = await workoutCalculator(csvPath);
  // stats = { totalWorkouts, totalMinutes }
  console.log('rows:', stats.totalWorkouts); // replaces rows.length
  console.log('stats:', stats);
})();
*/
// Export functions for testing
module.exports = { workoutCalculator, readWorkoutData };