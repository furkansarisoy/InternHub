import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'internhub-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = false;
  constructor(private angularFireAuth: AngularFireAuth,
    private AuthService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  isUserLogin() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.user = true;
      } else {
        this.user = false;
      }
    });
  }
  onClickNewReview() {
    this.router.navigate(['/new-review']);
  }

  signOut() {
    this.AuthService.signOut();
  }

}
