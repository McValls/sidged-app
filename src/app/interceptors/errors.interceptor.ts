import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

export class ErrorIntercept implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error.status == 401) {
                        console.log(error.error.error);
                        console.log(error.error.message);
                        this.router.navigate(['/login']);
                    } else {
                        if (error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            // server-side error
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        }
                        console.log(errorMessage);
                        return throwError(errorMessage);
                    }
                })
            )
    }
}