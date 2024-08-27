import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {jwtDecode} from 'jwt-decode';
import {RoleConfig, ROLES_TOKEN} from '../config/roles.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiGatewayUrl = environment.apiGatewayUrl;

  private authControllerPath = '/auth';

  constructor(private http: HttpClient, @Inject(ROLES_TOKEN) private roles: RoleConfig) {}

  isLoggedIn(): boolean {
    // Implement your login check logic here
    return !!localStorage.getItem('userToken');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
                .post<loginResponseDto>(`${this.apiGatewayUrl}${this.authControllerPath}/login`, { username, password })
                .pipe(
                  map((response: loginResponseDto) => {
                    localStorage.setItem('userToken', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    return true;
                  }),
                  catchError((error) => {
                    // Handle the error appropriately
                    console.error('Login error:', error);
                    return throwError(() => error);
                  })
                );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
  }

  refreshToken(): Observable<boolean> {
    return this.http
                .post<loginResponseDto>(`${this.apiGatewayUrl}${this.authControllerPath}/refresh-token`, { refreshToken: localStorage.getItem('refreshToken') })
                .pipe(
                  map((response: loginResponseDto) => {
                    localStorage.setItem('userToken', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    return true;
                  }),
                  catchError((error) => {
                    // Handle the error appropriately
                    console.error('Refresh token error:', error);
                    return throwError(() => error);
                  })
                );
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  private parseToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  getUserIdFromToken(): number | null {
    const decoded = this.parseToken();
    return decoded?.id || null;
  }

  private getRoleFromToken(): string | null {
    const decoded = this.parseToken();
    return decoded?.role || null;
  }

  isAdmin(): boolean {
    const role = this.getRoleFromToken();
    return role === this.roles.admin;
  }

  isUser(): boolean {
    const role = this.getRoleFromToken();
    return role === this.roles.user;
  }

  isOwner(): boolean {
    const role = this.getRoleFromToken();
    return role === this.roles.owner;
  }

}

interface loginResponseDto {
  token: string;
  refreshToken: string;
}

interface DecodedToken {
  username?: string; // 'sub' will be mapped to 'username'
  role?: string;
  id?: number;
  // Add more properties as needed
}
