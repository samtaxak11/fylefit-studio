import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';

export interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-workout.component.html',
})
export class AddWorkoutComponent implements OnInit {
  workoutForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    type: new FormControl('Gym', [Validators.required]),
  });

  userData: UserData[] | null = null;

  constructor(private router: Router, private workoutService: WorkoutService) {}

  ngOnInit() {
    // Get initial user data from the service
    this.userData = this.workoutService.getUserData();
  }

  onSubmit() {
    if (!this.workoutForm.valid) {
      return;
    }

    const formValue = this.workoutForm.value;
    const workout: Workout = {
      type: formValue.type ?? 'Gym',
      minutes: parseInt(formValue.duration ?? '0', 10),
    };

    // Add or update the workout for the specified user
    this.workoutService.addOrUpdateWorkout(formValue.name ?? '', workout);

    // Redirect to explore page
    this.router.navigate(['/explore']);
  }
}
