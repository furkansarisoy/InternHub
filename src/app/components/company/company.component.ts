import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'internhub-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  companyId: string;
  company: Company;
  reviews: Review[] = [];
  user: User;
  loadedReviewIds: string[] = [];
  reviewModal = {
    visible: false,
    data: null
  }

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private reviewService: ReviewService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.getUrl(),
      this.getCompany(),
      this.getReviews()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.reviews = [];
  }

  getUrl() {
    return this.route.url.subscribe(query => {
      this.companyId = query[1].path;
    });
  }

  getCompany() {
    return this.companyService.getCompanyById(this.companyId).subscribe(company => {
      this.company = company;
    });
  }

  getReviews() {
    return this.reviewService.getReviewsByCompanyId(this.companyId).subscribe(reviews => {
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
