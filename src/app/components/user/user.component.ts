import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';

interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  user: UserData | null = null;
  basicData: any;
  basicOptions: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const username = this.router.url.split('/')[1];
    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    this.user = userData.find((user: UserData) => user.name === username) || null;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.updateChartData();
  }

  updateChartData() {
    if (this.user) {
      this.basicData = {
        labels: this.user.workouts.map((workout) => workout.type),
        datasets: [
          {
            label: 'Minutes',
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            data: this.user.workouts.map((workout) => workout.minutes),
          },
        ],
      };

      // Ensure change detection is triggered
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    // Clean up any resources if necessary
  }
}
