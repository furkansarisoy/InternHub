import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'internhub-expand-review',
  templateUrl: './expand-review.component.html',
  styleUrls: ['./expand-review.component.scss']
})
export class ExpandReviewComponent implements OnInit {

  @Input() config;
  constructor() { }

  ngOnInit(): void {
  }

  handleOkMiddle() {
    this.config.visible = false;
    this.config.data = null;
  }

}
