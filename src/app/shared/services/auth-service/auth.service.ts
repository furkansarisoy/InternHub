import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private notificationService: NzNotificationService, private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private router: Router, private ngZone: NgZone) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signUp(userCredential: User, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(userCredential.email, password)
      .then(res => {
        this.notificationService.success("Başarılı", "Kayıt olma işleminiz başarı ile tamamladı.", { nzPlacement: "bottomRight" });
        this.SetUserData(res.user, userCredential);
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch(error => {
        this.notificationService.error("Hata", "Kayıt olma işlemi sırasında bir hata oluştu:" + error.message, { nzPlacement: "bottomRight" });
      });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.notificationService.success("Başarılı", "Başarıyla giriş yapıldı. Yönlendiriliyorsunuz...", { nzPlacement: "bottomRight" });
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch(error => {
        this.notificationService.error("Hata", "Giriş yapma işlemi sırasında bir hata oluştu:" + error.message, { nzPlacement: "bottomRight" });

      })
  }

  resetPassword(email: string) {
    this.angularFireAuth.sendPasswordResetEmail(email)
      .then(res => {
        this.notificationService.success("Başarılı!", "Şifre sıfırlama linkiniz mail adresinize gönderilmiştir.", { nzPlacement: "bottomRight" })

      })
      .catch(error => {
        this.notificationService.error("Hata!", "Bir hata oluştu: " + error.message, { nzPlacement: "bottomRight" })
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  SetUserData(user, userCredential: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      emailVerified: user.emailVerified,
      email: userCredential.email,
      firstName: userCredential.firstName,
      lastName: userCredential.lastName,
      photoURL: userCredential.photoURL ? userCredential.photoURL : "",
      school: userCredential.school,
      faculty: userCredential.faculty,
      department: userCredential.department,
      city: userCredential.city
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.ngZone.run(() => {
        this.router.navigate(['/homepage']);
      });
      this.notificationService.success('Oturum Kapatıldı', 'Oturumunuz güvenli bir şekilde sonlandırıldı.');
    })
  }

}