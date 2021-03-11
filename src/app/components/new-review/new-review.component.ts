import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/shared/services/company-service/company.service';
import { ReviewService } from 'src/app/shared/services/review-service/review.service';
import { UserProfileService } from 'src/app/shared/services/user-profile-service/user-profile.service';
@Component({
  selector: 'internhub-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit {

  reviewForm: FormGroup;
  companies;
  activeUser;
  userCredentials;

  review: { reviewForm: FormGroup, userCredential } = {
    reviewForm: null,
    userCredential: null
  }

  constructor(private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private companyService: CompanyService,
    private userProfileService: UserProfileService,
    private reviewService: ReviewService) {
    this.angularFireAuth.authState.subscribe(user => {
      this.activeUser = user;
      this.getActiveUserCredentials();
    });
  }

  ngOnInit(): void {
    this.getCompanies();
    this.reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      applyType: ['', []],
      rate: ['', [Validators.required]],
      isPay: [''],
      employeeCount: [''],
      extra: ['']
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  getActiveUserCredentials() {
    this.userProfileService.getUserByUserId(this.activeUser.uid).subscribe(credentials => {
      this.userCredentials = { ...credentials };
    });
  }
  onSubmit() {
    if (this.reviewForm.valid) {
      this.review.reviewForm = this.reviewForm.value;
      this.review.userCredential = this.userCredentials[0];
      console.log(this.review);
      this.reviewService.setReview(this.review);
    }
  }


}
