import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    console.log('🔍 HTTP Interceptor:', {
      url: req.url,
      hasToken: !!token,
      token: token ? token.substring(0, 20) + '...' : 'NO TOKEN'
    });

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('✅ Token added to request:', req.url);
    } else {
      console.warn('⚠️ No token available for request:', req.url);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ HTTP Error:', {
          url: req.url,
          status: error.status,
          message: error.message
        });
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
