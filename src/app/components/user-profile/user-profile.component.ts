import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/shared/interfaces/company.interface';
import { Review } from 'src/app/shared/interfaces/review.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { CompanyService } from 'src/app/shared/services/company-service/company.service';
import { ReviewService } from 'src/app/shared/services/review-service/review.service';
import { UserProfileService } from 'src/app/shared/services/user-profile-service/user-profile.service';

@Component({
  selector: 'internhub-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];
  reviews: Review[] = [];
  userId: string;
  userCredential: User;
  loadedReviewIds: string[] = [];
  reviewModal = {
    visible: false,
    data: null
  }

  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.getUrl()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.reviews = [];
  }

  getUrl() {
    return this.route.url.subscribe(query => {
      this.userId = query[1].path;
      this.getUserCredential();
      this.getReviews();
    });
  }

  getUserCredential() {
    return this.userProfileService.getUserByUserId(this.userId).subscribe(credentials => {
      this.userCredential = credentials[0];
    });
  }

  getReviews() {
    return this.reviewService.getReviewsByUserId(this.userId).subscribe(reviews => {
      reviews.forEach(review => {
        const isLoadedBefore = this.loadedReviewIds.includes(review.reviewId);
        if (!isLoadedBefore) {
          this.reviews.push(review);
          this.loadedReviewIds.push(review.reviewId);
        }
      });
    });
  }

  onClickReview(event) {
    console.log(event);
    this.reviewModal.data = event;
    this.reviewModal.visible = true;
  }


}
