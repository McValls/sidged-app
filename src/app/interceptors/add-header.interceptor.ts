import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SharingDataService } from '../services/local-storage/sharing-data.service';

export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private sharingDataService: SharingDataService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let jwtToken = this.sharingDataService.getJwtToken() || "";
    const clonedRequest = req.clone({ headers: req.headers.set('Authorization', jwtToken) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
