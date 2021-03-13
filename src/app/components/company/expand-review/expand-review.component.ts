import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'internhub-expand-review',
  templateUrl: './expand-review.component.html',
  styleUrls: ['./expand-review.component.scss']
})
export class ExpandReviewComponent implements OnInit {

  @Input() config;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleOkMiddle() {
    this.config.visible = false;
    this.config.data = null;
  }

  onClickUserProfile(uid: string) {
    if (uid) {
      this.router.navigate([`/profile/${uid}`]);
    }
  }
}
