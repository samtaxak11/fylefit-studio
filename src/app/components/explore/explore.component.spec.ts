import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreComponent } from './explore.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutService, UserData, Workout } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  
  // Mock user data to be used in the tests
  const mockUserData: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  beforeEach(async () => {
    // Create a spy object for the WorkoutService with mock implementations
    const spy = jasmine.createSpyObj('WorkoutService', ['getUserData', 'getWorkoutTypes', 'getTotalMinutes', 'deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, CommonModule],
      providers: [
        { provide: WorkoutService, useValue: spy }
      ]
    }).compileComponents();

    // Inject the spy service and set up mock returns
    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    workoutService.getUserData.and.returnValue(mockUserData);
    workoutService.getWorkoutTypes.and.callFake((workouts: Workout[]) => workouts.map(w => w.type).join(', '));
    workoutService.getTotalMinutes.and.callFake((workouts: Workout[]) => workouts.reduce((total, w) => total + w.minutes, 0));

    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to ensure the component is created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test to verify that user data is initialized correctly
  it('should initialize with user data', () => {
    expect(component.userData).toEqual(mockUserData);
  });

  // Test the filtering functionality of the user data
  it('should filter user data by name and type', () => {
    component.filterForm.setValue({ name: 'Jane', type: 'Running' });
    const filteredData = component.filteredUserData;
    expect(filteredData.length).toBe(1); // Expect one match
    expect(filteredData[0].name).toBe('Jane Smith'); // Expect correct user
  });

  // Test pagination functionality to ensure it behaves as expected
  it('should handle pagination correctly', () => {
    component.itemsPerPage = 2; // Set items per page
    component.currentPage = 1; // Set current page to 1
    expect(component.paginatedData.length).toBe(2); // Expect 2 items on the first page
    component.nextPage(); // Move to the next page
    expect(component.currentPage).toBe(2); // Expect page to be 2
    expect(component.paginatedData.length).toBe(1); // Expect 1 item on the second page
    component.prevPage(); // Move back to the previous page
    expect(component.currentPage).toBe(1); // Expect page to be 1 again
  });

  // Test to ensure the number of items per page can be changed
  it('should change items per page', () => {
    const event = { target: { value: '2' } } as unknown as Event;
    component.changeItemsPerPage(event); // Change items per page to 2
    expect(component.itemsPerPage).toBe(2); // Expect items per page to be 2
  });

  // Test to get the workout types as a comma-separated string
  it('should get workout types as a comma-separated string', () => {
    const workoutTypes = component.getWorkoutTypes(mockUserData[0].workouts);
    expect(workoutTypes).toBe('Running, Cycling'); // Expect correct comma-separated types
  });

  // Test to calculate total workout minutes
  it('should calculate total workout minutes', () => {
    const totalMinutes = component.getTotalMinutes(mockUserData[0].workouts);
    expect(totalMinutes).toBe(75); // Expect correct total minutes
  });

  // Test trackBy function for optimal rendering
  it('should track by user ID', () => {
    const trackBy = component.trackById(0, mockUserData[0]);
    expect(trackBy).toBe(mockUserData[0].id); // Expect the ID to match
  });

  // Test the delete user functionality
  it('should delete a user', () => {
    workoutService.deleteUser.and.callFake((id: number) => {
      const index = mockUserData.findIndex(user => user.id === id);
      if (index > -1) {
        mockUserData.splice(index, 1); // Remove user from mock data
      }
    });

    component.deleteUser(1); // Delete user with ID 1
    expect(workoutService.deleteUser).toHaveBeenCalledWith(1); // Expect deleteUser to be called with ID 1
    expect(component.userData.length).toBe(2); // Expect remaining data length to be 2
  });
});
