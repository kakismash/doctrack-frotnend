import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { LottieStandaloneComponent } from 'src/app/lottie/lottie.standalone.component';
import { AuthService } from 'src/app/service/auth.service';
import { UserI, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieStandaloneComponent,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {

  userReady = false;
  user!: UserI;
  tempUser!: UserI;

  constructor(private userService: UserService, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    this.userService.getUserById(userId).subscribe((user: UserI) => {
      this.user = user;
      this.tempUser = { ...user };
      this.userReady = true;
      this.cdr.markForCheck(); // Manually trigger change detection
    });
  }

  canSave(): boolean {
    return JSON.stringify(this.user) !== JSON.stringify(this.tempUser);
  }

  updatePassword() {
    console.log('Update password');
  }

  private getChangedProperties(): Partial<UserI> {
    const updatedProperties: any = {}; // Create an empty object to hold changed properties

    // Exclude 'email' and 'username' from comparison
    const excludedKeys = ['email', 'username', 'id'];

    // Iterate through the user properties
    for (const key in this.user) {
      if (this.user.hasOwnProperty(key) && !excludedKeys.includes(key)) {
        const userValue = this.user[key as keyof UserI];
        const tempUserValue = this.tempUser[key as keyof UserI];

        // Only add properties that have changed and are not undefined
        if (userValue !== tempUserValue && userValue !== undefined) {
          updatedProperties[key] = tempUserValue;
        }
      }
    }

    return updatedProperties;
  }

  saveProfile() {
    const updatedData = this.getChangedProperties();

    if (Object.keys(updatedData).length > 0) {
      console.log('Updated properties:', updatedData);
      this.userService.updateUser(this.user.id, updatedData).subscribe((user: UserI) => {
        this.user = user;
        this.tempUser = { ...user };
        this.cdr.markForCheck(); // Manually trigger change detection
      });
    } else {
      console.log('No changes to save.');
    }
  }

}
