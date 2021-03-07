import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'internhub-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private notificationService: NzNotificationService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]]
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onSubmit() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    if (this.signUpForm.valid) {
      this.authService.signUp(email, password);
    } else {
      this.notificationService.error("Hata", "Lütfen girdiğiniz bilgileri kontrol ediniz. Eksik veya hatalı giriş yapıldı.", { nzPlacement: "bottomRight" })
    }

  }

}
