import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'internhub-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private notificationService: NzNotificationService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  onSubmit() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    if (this.signInForm.valid) {
      this.authService.signIn(email, password);
      this.signInForm.reset();
    } else {
      this.notificationService.error("Hata", "Lütfen girdiğiniz bilgileri kontrol ediniz. Eksik veya hatalı giriş yapıldı.", { nzPlacement: "bottomRight" })

    }

  }
}
