import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'internhub-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private notificationService: NzNotificationService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    const email = this.resetPasswordForm.value.email;

    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(email)
      this.resetPasswordForm.reset();
    } else {
      this.notificationService.error("Hata", "Lütfen girdiğiniz bilgileri kontrol ediniz. Eksik veya hatalı giriş yapıldı.", { nzPlacement: "bottomRight" })

    }

  }
}
