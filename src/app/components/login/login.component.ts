import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'internhub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.className = "";
  }

  ngOnDestroy(): void {
    document.body.className = "background";
  }

}
