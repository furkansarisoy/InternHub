import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CompanyService } from 'src/app/shared/services/company-service/company.service';

@Component({
  selector: 'internhub-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

  @Input() modalData;

  url;
  downloadURL: Observable<string>;
  companyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private companyService: CompanyService,
    private nzNotificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      district: [''],
      email: [''],
      phone: [''],
      logoUrl: ['']
    });
  }


  upload(event) {
    var id = this.angularFirestore.createId()
    const file = event.target.files[0];
    const filePath = `assets/company-photos/${id}`;
    const fileRef = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(`assets/company-photos/${id}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.url = url;
              this.companyForm.value.logoUrl = this.url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  handleCancel() {
    this.modalData.visible = false;
  }
  onSubmit() {
    if (this.companyForm.valid) {
      this.companyService.createCompany(this.companyForm.value)
        .then(() => {
          this.nzNotificationService.success("Şirket Oluşturuldu!", `${this.companyForm.value.name} isimli şirket başarı ile oluşturuldu.`);
          this.modalData.visible = false;
        }).catch(error => {
          this.nzNotificationService.error("Hata!", "Şirket oluşturulken bir hata meydana geldi : " + error);
          this.modalData.visible = false;
        });
    }
  }
}
