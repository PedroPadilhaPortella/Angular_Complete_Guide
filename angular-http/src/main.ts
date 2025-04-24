import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

// Interceptors
const loggingInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const httpRequest = request.clone({
    headers: request.headers.set('x-environment', 'development')
  })
  console.log('[Outgoing Request]', request);
  return next(httpRequest)
    .pipe(
      tap({
        next: event => {
          if (event.type === HttpEventType.Response) {
            console.log('[Incoming Response]', event.status, event.body);
          }
        }
      })
    );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))]
}).catch((err) => console.error(err));
