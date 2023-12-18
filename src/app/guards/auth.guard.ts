import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const currentRoles = userService.getUserRoles();

  if(!userService.isAuthenticated()) {
    return false;
  }

  const allowedRoles: string[] = route.data["roles"];
  if(!allowedRoles) {
    return false;
  }

  let authorized = false;
  currentRoles.forEach(role => {
    if(allowedRoles.includes(role.toLocaleLowerCase())) {
      authorized = true;
    }
  });

  return !authorized;
};
