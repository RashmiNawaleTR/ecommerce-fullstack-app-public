import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { of, catchError, map } from 'rxjs';

/**
 * Auto-login guard that automatically logs in the test user if not authenticated
 * This resolves the 403 access token issue by ensuring users are always authenticated
 */
export const autoLoginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If already authenticated, allow access
  if (authService.isAuthenticated()) {
    return true;
  }

  // Auto-login with test credentials
  console.log('🔐 Auto-login: Logging in with test credentials...');

  return authService.login({
    email: 'customer@test.com',
    password: 'Test123456789!'
  }).pipe(
    map(() => {
      console.log('✅ Auto-login: Successfully logged in!');
      return true;
    }),
    catchError((error) => {
      console.error('❌ Auto-login failed:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
