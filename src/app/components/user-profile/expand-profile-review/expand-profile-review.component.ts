import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'internhub-expand-profile-review',
  templateUrl: './expand-profile-review.component.html',
  styleUrls: ['./expand-profile-review.component.scss']
})
export class ExpandProfileReviewComponent implements OnInit {

  @Input() config;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleOkMiddle() {
    this.config.visible = false;
    this.config.data = null;
  }

  onClickCompanyProfile(id: string) {
    if (id) {
      this.router.navigate([`/company/${id}`]);
    }
  }
}
