# FyleFit Studio 🤾‍♀️🚀

FyleFit Studio is a single-page application (SPA) developed in Angular 18, designed to track and explore workout activities. It allows users to add, delete, filter, and view detailed progress of their workouts.

## Features ✨

* Add Workout: Enter workout details including name, duration, and type.
* Delete Workout: User can delete the added workout.
* Filter Workouts: Search for workouts by name or filter by type.
* View Progress: View detailed workout progress for each user.
* Pagination: Navigate through users with pagination.
* Data Storage: Save workout data in local storage.

## Tech Stack used 🌐

* Angular 18: Front-end framework for building robust SPAs.
* Tailwind CSS: Provides utility-first CSS classes for rapid UI development.
* primeNG: Integration for displaying charts within Angular.

## Usage 💡
### Adding Workout 🏋️‍♂️
1. Go to the "Add Workout" page.
2. Enter workout details: name, duration, and type.
3. Submit to add the workout.

### Explore Workouts 🔍
1. Visit the "Explore" page.
2. Explore all the added Workouts with Username, No. of Workouts and Total Workout Minutes.
3. Use the search bar to filter by name.
4. Use the dropdown to filter by workout type.
5. Use delete button to delete the workout permanently.

### Viewing User Progress 📈
1. On the "Explore" page, click a user's name.
2. View detailed workout progress for the selected user.

## Application's Screenshots 📸

![Screenshot (956)](https://github.com/user-attachments/assets/2a1868c4-0241-43bb-9979-bed751dc1bed)
![Screenshot (957)](https://github.com/user-attachments/assets/45ce00f8-5a1f-46d0-bdd6-f45705182f44)
![Screenshot (958)](https://github.com/user-attachments/assets/9558c687-93b3-49f4-8805-eb1f323f0254)
![Screenshot (959)](https://github.com/user-attachments/assets/d57a89f2-b8c1-4406-b5c0-e3a142fdee31)

## Installation ⬇️
1. Clone the Repository
```
git clone https://github.com/samtaxak11/fylefit-studio.git
```
2. Install Dependencies
```
cd fylefit-studio
npm install
```
3. Start the Development Server
```
ng serve
```
4. Build
```
ng build --prod
```
Executing this command will launch the application in development mode. To preview it in the browser, navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Testing 🧪

Run `ng test` to execute the unit tests via Karma. Unit tests for the components are written using Angular's testing utilities and Jasmine. You can run the tests using the following command:

### Test Cases for Explore Component
* Setup and Teardown: Configure TestBed and create spies for WorkoutService. Use mock data to simulate user data.
* Component Creation: Ensure the component is created successfully.
* Initialization: Check if the component initializes correctly with mock data.
* Filtering: Verify filtering by setting form values and checking filtered data.
* Pagination: Check pagination by verifying items per page and navigating pages.
* Items Per Page: Ensure changing the number of items per page works correctly.
* Workout Types: Verify getWorkoutTypes returns a comma-separated string.
* Total Minutes: Verify the calculation of total workout minutes.
* Track By ID: Ensure trackById returns the correct user ID.
* Delete User: Verify deleteUser updates user data correctly.

### Test Cases for Add-workout Component
* Component Creation: Check component creation.
* Form Initialization: Verify form initializes with default values.
* User Data Initialization: Confirm initial user data is fetched on init.
* Form Submission (Invalid): Ensure form doesn't submit if invalid.
* Form Submission (Valid): Verify form submits and calls WorkoutService and Router methods if valid.

### Test Cases for Workout Service
* Setup and Teardown: beforeEach sets up mock data and initializes the service; afterEach clears local storage.
* Initialization Tests: Verifies data initialization if local storage is empty.
* CRUD Tests: Tests data retrieval, saving, adding, updating, and deleting.
* Utility Method Tests: Covers getWorkoutTypes, getTotalMinutes, filterUserData, paginateData.
* Observable Test: Ensures getUserDataChart returns initial data as an observable.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Personal Links 🔗
### Portfolio : https://sourabhtakshak.netlify.app/
### LinkedIn Profile : www.linkedin.com/in/sourabh-takshak
