import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'internhub-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  url;
  downloadURL: Observable<string>;

  selectedUniversity;
  selectedFaculty;
  selectedDepartment;

  universities;
  cities;
  userCredential: User = {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    department: "",
    emailVerified: false,
    photoURL: "",
    school: "",

  };
  credentialForm: FormGroup;
  @Input() modalData;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NzNotificationService,
    private authService: AuthService,
    private dataService: DataService,
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore) {
    this.dataService.getUniversitesJSON().subscribe(data => {
      this.universities = data;
    });
    this.dataService.getCitiesJSON().subscribe(data => {
      this.cities = data;
    });
  }

  ngOnInit(): void {
    this.credentialForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      school: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]],
      photoURL: ['']
    });
  }

  ngOnChanges(): void {

  }

  onSchoolChange() {
    this.selectedFaculty = null;
    this.selectedDepartment = null;
  }

  onFacultyChange() {
    this.selectedDepartment = null;
  }

  handleCancel() {
    this.modalData.visible = false;
  }

  upload(event) {
    var id = this.angularFirestore.createId()
    const file = event.target.files[0];
    const filePath = `assets/profile-photos/${id}`;
    const fileRef = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(`assets/profile-photos/${id}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.url = url;
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

  onSubmit() {
    const password = this.modalData.data.password;
    this.userCredential.email = this.modalData.data.email;
    this.userCredential.firstName = this.credentialForm.value.name;
    this.userCredential.lastName = this.credentialForm.value.lastName;
    this.userCredential.school = this.credentialForm.value.school.name;
    this.userCredential.faculty = this.credentialForm.value.faculty.name;
    this.userCredential.department = this.credentialForm.value.department;
    this.userCredential.city = this.credentialForm.value.city;
    this.userCredential.photoURL = this.url;

    if (this.credentialForm.valid) {
      this.authService.signUp(this.userCredential, password);
      this.modalData.visible = false;
    } else {
      this.notificationService.error("Hata", "Lütfen girdiğiniz bilgileri kontrol ediniz. Eksik veya hatalı giriş yapıldı.", { nzPlacement: "bottomRight" })
    }

  }

}
