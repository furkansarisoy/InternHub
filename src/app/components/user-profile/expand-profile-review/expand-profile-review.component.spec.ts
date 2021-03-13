import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandProfileReviewComponent } from './expand-profile-review.component';

describe('ExpandProfileReviewComponent', () => {
  let component: ExpandProfileReviewComponent;
  let fixture: ComponentFixture<ExpandProfileReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandProfileReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandProfileReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
