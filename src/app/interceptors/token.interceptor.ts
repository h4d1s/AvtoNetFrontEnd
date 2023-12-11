import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService: JwtService = inject(JwtService);
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  const jwtToken = jwtService.getToken();
  
  if(jwtToken) {
    if(jwtService.isTokenExpired()) {
      userService.logout();
      router.navigate(['/login']);
    } else {
      const token = jwtService.getToken();
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
    }
  }
  return next(req);
};