import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Review } from '../../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private angularFirestore: AngularFirestore,
    private nzNotificationService: NzNotificationService,
    private router: Router) { }

  setReview(review) {
    const id = this.angularFirestore.createId();
    const form = review.reviewForm;
    const credential = review.userCredential;
    const reviewRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`reviews/${id}`);
    const reviewData: Review = {
      reviewId: id,
      companyData: form.company,
      uid: credential.uid,
      title: form.title,
      applyType: form.applyType,
      rate: form.rate,
      isPay: form.isPay,
      employeeCount: form.employeeCount,
      extra: form.extra,
      userData: credential
    }
    return reviewRef.set(reviewData, {
      merge: true
    }).then(() => {
      this.nzNotificationService.success("Başarılı!", "Yorumunuz başarı ile eklendi. Şirketin sayfasına yönlendiriliyorsunuz...")
      setTimeout(() => {
        this.router.navigate([`/company/${form.company.companyId}`])
      }, 2000)
    })
      .catch(error => this.nzNotificationService.error("Hata!", "Yorumunuz eklenirken bir hata ile karşılaşıldı:" + error))
  }

  getReviewsByCompanyId(companyId: string) {
    return this.angularFirestore.collection<Review>('reviews', ref => ref.where('companyData.companyId', '==', companyId)).valueChanges();
  }

  getReviewsByUserId(userId: string) {
    return this.angularFirestore.collection<Review>('reviews', ref => ref.where('userData.uid', '==', userId)).valueChanges();
  }

}
