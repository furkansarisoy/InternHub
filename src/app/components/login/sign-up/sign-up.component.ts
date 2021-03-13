import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { map, debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'internhub-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  userProfileModal = {
    visible: false,
    data: null
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private notificationService: NzNotificationService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required], [CustomValidator.duplicated(this.afs)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    if (this.signUpForm.valid) {
      this.userProfileModal.visible = true;
      this.userProfileModal.data = this.signUpForm.value;
    } else {
      this.notificationService.error("Hata", "Lütfen girdiğiniz bilgileri kontrol ediniz. Eksik veya hatalı giriş yapıldı.", { nzPlacement: "bottomRight" })
    }
  }

}

export class CustomValidator {
  static duplicated(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const email = control.value.toLowerCase();
      return afs.collection('users', ref => ref.where('email', '==', email))
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? { usernameAvailable: false } : null)
        )
    }
  }
}