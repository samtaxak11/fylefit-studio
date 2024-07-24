import { TestBed } from '@angular/core/testing';
import { WorkoutService, UserData, Workout } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let mockUserData: UserData[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);

    mockUserData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
      },
    ];

    // Initialize localStorage with mock data
    localStorage.setItem('userData', JSON.stringify(mockUserData));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize data in localStorage if empty', () => {
    localStorage.clear();
    service = TestBed.inject(WorkoutService);
    const data = service.getUserData();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should get user data from localStorage', () => {
    const data = service.getUserData();
    expect(data).toEqual(mockUserData);
  });

  it('should save user data to localStorage', () => {
    const newUserData: UserData[] = [
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
    ];
    service.saveUserData(newUserData);
    const data = service.getUserData();
    expect(data).toEqual(newUserData);
  });

  it('should add a new workout for an existing user', () => {
    const newWorkout: Workout = { type: 'Yoga', minutes: 60 };
    service.addOrUpdateWorkout('John Doe', newWorkout);
    const data = service.getUserData();
    const user = data.find((u) => u.name === 'John Doe');
    expect(user?.workouts.length).toBe(3);
    expect(user?.workouts).toContain(newWorkout);
  });

  it('should add a new user with workout if user does not exist', () => {
    const newWorkout: Workout = { type: 'Yoga', minutes: 60 };
    service.addOrUpdateWorkout('Mike Johnson', newWorkout);
    const data = service.getUserData();
    const user = data.find((u) => u.name === 'Mike Johnson');
    expect(user).toBeTruthy();
    expect(user?.workouts.length).toBe(1);
    expect(user?.workouts).toContain(newWorkout);
  });

  it('should delete a user by ID', () => {
    service.deleteUser(1);
    const data = service.getUserData();
    const user = data.find((u) => u.id === 1);
    expect(user).toBeUndefined();
  });

  it('should get workout types as a comma-separated string', () => {
    const workouts: Workout[] = [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ];
    const workoutTypes = service.getWorkoutTypes(workouts);
    expect(workoutTypes).toBe('Running, Cycling');
  });

  it('should calculate total workout minutes', () => {
    const workouts: Workout[] = [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ];
    const totalMinutes = service.getTotalMinutes(workouts);
    expect(totalMinutes).toBe(75);
  });

  it('should filter user data based on name and workout type', () => {
    const filteredData = service.filterUserData('John', 'Running');
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].name).toBe('John Doe');
  });

  it('should paginate user data', () => {
    const paginatedData = service.paginateData(mockUserData, 1, 1);
    expect(paginatedData.length).toBe(1);
    expect(paginatedData[0].id).toBe(1);
  });

  it('should return empty array if pagination page is out of bounds', () => {
    const paginatedData = service.paginateData(mockUserData, 3, 1);
    expect(paginatedData.length).toBe(0);
  });

  it('should return initial data as observable', (done) => {
    service.getUserDataChart().subscribe(data => {
      expect(data).toEqual(service['initialData']);
      done();
    });
  });
});
