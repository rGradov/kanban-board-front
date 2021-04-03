import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authKey: string;
  authErr: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  Register(email: string, password: string): any {
    return this.http.post<any>(`/api/auth/register`, { email, password })
      .subscribe((data: any) => {
        this.router.navigate(['']);
        localStorage.setItem('auth_token', data['token']);
      }, error => this.authErr = error.message);

  }

  login(email: string, password: string) {

    return this.http.post<any>(`api/auth/login`, { email, password })
      .subscribe(
        (data: any) => {
          this.router.navigate(['']);
          localStorage.setItem('auth_token', data['token']);
        },
        error => this.authErr = error.message);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }


  getToken(): string {
    return localStorage.getItem('auth_token');
  }

}
