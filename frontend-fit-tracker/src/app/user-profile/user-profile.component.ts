import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormGroup } from '@angular/forms';
import { UserProfileEditComponent } from './user-edit/user-profile-edit.component';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GoalsComponent } from './goals/goals.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    UserProfileEditComponent,
    GoalsComponent,
    MatButtonModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private subscription: Subscription | null = null; // might need to make this an array later
  user: User | null = null;
  isModalOpen: boolean = false;
  profileForm!: FormGroup;

  photoUrlPath: string | ArrayBuffer = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    if (this.user?.photo) {
      this.photoUrlPath = `http://localhost:3000/${this.user.photo}`;
    }
  }

  openEditModalDialog() {
    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.photo && result.photo.name) {
          this.generateDataUrlForImmediateDisplay(result);
        }
        this.handleUpdate(this.user!.id, result);
        this.user = result;
      }
    });
  }

  openGoalModalDialog() {
    
  }

  generateDataUrlForImmediateDisplay(result: User) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        this.photoUrlPath = event.target.result;
      }
    };

    reader.readAsDataURL(result.photo);
  }

  handleUpdate(userId: number, updatedUser: User) {
    // remember to consider .add in future if need be
    this.subscription = this.userService.updateUser(userId, updatedUser).subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
