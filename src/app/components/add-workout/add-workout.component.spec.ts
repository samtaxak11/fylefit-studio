import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    // Create spy objects for Router and WorkoutService
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getUserData', 'addOrUpdateWorkout']);
    
    // Mock return value for getUserData method
    mockWorkoutService.getUserData.and.returnValue([
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      }
    ]);

    // Configure testing module with necessary imports and providers
    await TestBed.configureTestingModule({
      declarations: [AddWorkoutComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: WorkoutService, useValue: mockWorkoutService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create component and fixture
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Test to ensure the component is created successfully
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    // Test to check if the form is initialized with default values
    expect(component.workoutForm).toBeDefined();
    expect(component.workoutForm.controls['name'].value).toBe('');
    expect(component.workoutForm.controls['duration'].value).toBe('');
    expect(component.workoutForm.controls['type'].value).toBe('Gym');
  });

  it('should get initial user data on init', () => {
    // Test to ensure user data is fetched correctly on initialization
    component.ngOnInit();
    expect(component.userData).toEqual([
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      }
    ]);
  });

  it('should not submit the form if invalid', () => {
    // Test to ensure the form is not submitted if invalid
    component.workoutForm.controls['name'].setValue('');
    component.workoutForm.controls['duration'].setValue('');
    component.onSubmit();
    expect(mockWorkoutService.addOrUpdateWorkout).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should submit the form and navigate to explore page if valid', () => {
    // Test to ensure the form is submitted correctly and navigation happens if form is valid
    component.workoutForm.controls['name'].setValue('Jane Smith');
    component.workoutForm.controls['duration'].setValue('60');
    component.workoutForm.controls['type'].setValue('Swimming');

    component.onSubmit();

    expect(mockWorkoutService.addOrUpdateWorkout).toHaveBeenCalledWith('Jane Smith', {
      type: 'Swimming',
      minutes: 60
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/explore']);
  });
});
