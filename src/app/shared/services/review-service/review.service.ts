import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private angularFirestore: AngularFirestore) { }

  getReviewsByCompanyId(companyId: string) {
    return this.angularFirestore.collection<Review>('reviews', ref => ref.where('companyId', '==', companyId)).valueChanges();
  }

}
