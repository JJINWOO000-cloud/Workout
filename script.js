// Get DOM elements
const workoutForm = document.getElementById('workout-form');
const workoutNameInput = document.getElementById('workout-name');
const workoutDurationInput = document.getElementById('workout-duration');
const workoutList = document.getElementById('workout-list');
const totalWorkoutsDisplay = document.getElementById('total-workouts');
const totalDurationDisplay = document.getElementById('total-duration');

// Load workouts from local storage
function loadWorkouts() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workoutList.innerHTML = '';
    let totalWorkouts = 0;
    let totalDuration = 0;

    workouts.forEach((workout, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${workout.name}</span>
            <div>
                <p>Duration: ${workout.duration} minutes</p>
                <button onclick="deleteWorkout(${index})">Delete</button>
            </div>
        `;
        workoutList.appendChild(li);

        totalWorkouts++;
        totalDuration += workout.duration;
    });

    // Update the stats
    totalWorkoutsDisplay.textContent = totalWorkouts;
    totalDurationDisplay.textContent = totalDuration;
}

// Save workouts to local storage
function saveWorkouts(workouts) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Add workout to the list
function addWorkout(e) {
    e.preventDefault();

    const workoutName = workoutNameInput.value.trim();
    const workoutDuration = parseInt(workoutDurationInput.value.trim());

    if (workoutName && workoutDuration > 0) {
        const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        const newWorkout = { name: workoutName, duration: workoutDuration };
        workouts.push(newWorkout);
        saveWorkouts(workouts);

        workoutNameInput.value = '';
        workoutDurationInput.value = '';

        loadWorkouts();
    } else {
        alert('Please enter a valid workout name and duration.');
    }
}

// Delete a workout from the list
function deleteWorkout(index) {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.splice(index, 1);
    saveWorkouts(workouts);
    loadWorkouts();
}

// Event listener for form submission
workoutForm.addEventListener('submit', addWorkout);

// Initial load of workouts from local storage
loadWorkouts();
