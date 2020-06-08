import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(
      map(appUser => AppUser.fromResponse(appUser)),
      map(appUser => appUser.isAdmin)
    )
  }
}
