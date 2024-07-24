import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Define the Workout and UserData interfaces
export interface Workout {
  type: string;
  minutes: number;
}

export interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private initialData: UserData[] = [
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

  constructor() {
    this.initializeData();
  }

  // Initialize localStorage with initial data if empty
  private initializeData(): void {
    if (!localStorage.getItem('userData')) {
      this.saveUserData(this.initialData);
    }
  }

  getUserDataChart(): Observable<UserData[]> {
    return of(this.initialData);
  }

  // Get user data from localStorage
  getUserData(): UserData[] {
    return JSON.parse(localStorage.getItem('userData') || '[]');
  }

  // Save user data to localStorage
  saveUserData(userData: UserData[]): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Add or update a user's workout
  addOrUpdateWorkout(userName: string, workout: Workout): void {
    let userData = this.getUserData();
    let user = userData.find((u) => u.name === userName);
    if (!user) {
      user = { id: userData.length + 1, name: userName, workouts: [] };
      userData.push(user);
    }
    user.workouts.push(workout);
    this.saveUserData(userData);
  }

  // Delete user by ID
  deleteUser(userId: number): void {
    let userData = this.getUserData();
    userData = userData.filter((user) => user.id !== userId);
    this.saveUserData(userData);
  }

  // Get workout types as a comma-separated string
  getWorkoutTypes(workouts: Workout[]): string {
    return workouts.map((workout) => workout.type).join(', ');
  }

  // Calculate total workout minutes
  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  // Filter user data based on name and workout type
  filterUserData(name: string, type: string): UserData[] {
    const userData = this.getUserData();
    return userData.filter(user => {
      const matchesName = user.name.toLowerCase().includes(name.toLowerCase());
      const matchesType = type === 'All' || user.workouts.some(workout => workout.type === type);
      return matchesName && matchesType;
    });
  }

  // Paginate user data
  paginateData(data: UserData[], page: number, itemsPerPage: number): UserData[] {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }
}
