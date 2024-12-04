import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const currentUser = loginService.getUser();
  const requiredRoles = route.data['role'];

  if (currentUser && currentUser.rol != null) {
    if (Array.isArray(requiredRoles)) {
      if (requiredRoles.includes(currentUser.rol)) {
        return true;
      }
    } else {
      if (currentUser.rol === requiredRoles) {
        return true;
      }
    }
  }

  router.navigate(['/home']);
  return false;
};
