import { CanActivate, CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Super_adminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAdminRole();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAdminRole();
  }

  private checkAdminRole(): boolean {
    if (this.authService.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}
