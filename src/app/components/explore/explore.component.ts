import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular structural directives
import { WorkoutService, UserData, Workout } from '../../services/workout.service'; // Import WorkoutService and interfaces

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule], // Include CommonModule here
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  filterForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('All'),
  });

  userData: UserData[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private workoutService: WorkoutService) {}

  // Initialize component and fetch user data
  ngOnInit() {
    this.userData = this.workoutService.getUserData();
  }

  // Filter user data based on form inputs
  get filteredUserData(): UserData[] {
    const formValue = this.filterForm.value;
    const name = formValue.name?.toLowerCase() || '';
    const type = formValue.type || 'All';
    return this.userData.filter(user => {
      const matchesName = user.name.toLowerCase().includes(name);
      const matchesType = type === 'All' || user.workouts.some(workout => workout.type === type);
      return matchesName && matchesType;
    });
  }

  // Change current page
  pageChange(page: number) {
    this.currentPage = page;
  }

  // Navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Calculate total pages for pagination
  get totalPages() {
    return Math.ceil(this.filteredUserData.length / this.itemsPerPage);
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Change the number of items per page
  changeItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
  }

  // Get paginated data for current page
  get paginatedData(): UserData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUserData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Get workout types as a comma-separated string
  getWorkoutTypes(workouts: Workout[]): string {
    return this.workoutService.getWorkoutTypes(workouts);
  }

  // Calculate total workout minutes
  getTotalMinutes(workouts: Workout[]): number {
    return this.workoutService.getTotalMinutes(workouts);
  }

  // Track by user ID to optimize rendering
  trackById(index: number, user: UserData): number {
    return user.id;
  }

  // Delete a user and update the user data
  deleteUser(userId: number) {
    this.workoutService.deleteUser(userId);
    this.userData = this.workoutService.getUserData();
  }
}


