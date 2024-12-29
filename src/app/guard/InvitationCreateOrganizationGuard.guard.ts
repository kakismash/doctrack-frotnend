import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InvitationCreateOrganizationGuardGuard {
  constructor(
    private authService: AuthService, 
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Extract the token from the route parameters
    const token = route.queryParams['token'];

    if (!token) {
      // If the token is missing, redirect to the login page
      console.error('Token is missing');
      this.router.navigate(['/login']);
      return of(false);
    } else if (route.queryParams['isValidated']) {
      // If the token is already validated, allow access
      return of(true);
    }

    // Validate the token via the API
    return this.authService.validateInvitationToken(token).pipe(
      map((response: any) => {
        // Extract additional data from the response
        const role = response?.role || 'UNKNOWN';
        const userId = response?.userId || null;
        const username = response?.username || null;

        // If data is missing, deny access
        if (!role || !userId || !username) {
          console.error('Required information missing');
          this.router.navigate(['/login']);
          return false;
        }

        // Attach data to the state
        // Navigate with state to pass the data
        this.router.navigate(['/invite_create_organization'], {
          state: { role, userId, username },
          queryParams: { token, isValidated: true },
          queryParamsHandling: 'merge', // Merge new params with existing ones
        });
        return true;
      }),
      catchError(() => {
        // Handle any errors by redirecting to login
        console.error('Token validation error');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}