import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.checkLoggedInUser()
  }

  login() {
    this.authService.login()
    // load spiner to wait for firebase login
    this.loading = true
  }

  /**
   * Check whether a user is logged in or not
   * - If user is not logged in: show the login button
   * - If user is logged in: save user info back to firebase database
   * and ridirect the user to the return url or homepage
   */
  private checkLoggedInUser() {
    // show loading to wait for user checking
    this.loading = true
    // get current user info from firebase authentication
    this.authService.user$.pipe(take(1))
      .subscribe(user => {
        // if user have not logged in
        if (!user) {
          this.loading = false
          return 
        }
        // if user logged in
        this.userService.save(user)
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
        this.router.navigate([returnUrl])
      })
  }
}
