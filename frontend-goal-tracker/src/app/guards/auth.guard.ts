import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated || !sessionStorage.getItem('loggedIn')) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
