import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'internhub-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  credentialForm: FormGroup;
  @Input() modalData;

  constructor(private formBuilder: FormBuilder, private router: Router, private notificationService: NzNotificationService) { }

  ngOnInit(): void {
    this.credentialForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    });
  }

  handleCancel() {
    this.modalData.visible = false;
  }

  onSubmit() {
    const name = this.credentialForm.value.name;
    const surname = this.credentialForm.value.surname;

    if (this.credentialForm.valid) {
      console.log(this.credentialForm.value);
      this.modalData.visible = false;
    } else {
      this.notificationService.error("Hata", "Lütfen girdiğiniz bilgileri kontrol ediniz. Eksik veya hatalı giriş yapıldı.", { nzPlacement: "bottomRight" })
    }

  }

}
