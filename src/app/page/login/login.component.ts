import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { DataService } from '../../service/data.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatCardModule, MatFormFieldModule,FormsModule,MatIconModule,MatProgressSpinnerModule,CommonModule,MatInputModule]
})
export class LoginComponent {
  email = '';
  isLoading = false;
  errorMessage = '';
  isLoginMode = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

   onSubmit() {
    console.log(this.email)
    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.isLoading = true;
    this.authService.getUser(this.email).subscribe({
    next: (response: HttpResponse<any>) => {
    console.log('Status Code:', response.status);
    console.log('Response Body:', response.body);
    
    if ((response.status === 200) && response.body?._id != null ) {
      // Handle 201 Created response
      console.log('Resource created successfully');
      this.dataService.setUser(response.body);
      localStorage.setItem('user',JSON.stringify(response.body));
      this.router.navigate(['/home']);
    } else{
      console.log('retry registration');
      this.authService.addUser(this.email).subscribe({
        next: (response: HttpResponse<any>) => {
          if ((response.status === 200) && response.body?._id != null ) {
            this.dataService.setUser(response.body);
            localStorage.setItem('user',JSON.stringify(response.body));
            this.router.navigate(['/home']);
          }
        },
        error :(error) =>{

        }
      })
    }
  },
  error: (error) => {
    console.error('Error:', error);
    this.errorMessage = error.message || 'Request failed. Please try again.';
    
    // Handle specific status codes
    if (error.status === 401) {
      this.errorMessage = 'Unauthorized access';
    } else if (error.status === 404) {
      this.errorMessage = 'Resource not found';
    }
    },
    complete: () => {
      this.isLoading = false;
      console.log('Request completed');
    }
  });

  }
}
