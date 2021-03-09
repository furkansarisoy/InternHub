import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
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
export class CompanyComponent implements OnInit {

  companyId: string;
  company: Company;
  reviews: Review[] = [];
  user: User;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private reviewService: ReviewService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.getUrl();
    this.getCompany();
    this.getReviews();
  }

  getUrl() {
    this.route.url.subscribe(query => {
      this.companyId = query[1].path;
    });
  }

  getCompany() {
    this.companyService.getCompanyById(this.companyId).subscribe(company => {
      this.company = company;
    });
  }

  getReviews() {
    this.reviewService.getReviewsByCompanyId(this.companyId).subscribe(reviews => {
      reviews.forEach(review => {
        review.uid.get().then(user => {
          review.userData = user.data();
          this.reviews.push(review);
        })
      });
    })
  }

}
