import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandReviewComponent } from './expand-review.component';

describe('ExpandReviewComponent', () => {
  let component: ExpandReviewComponent;
  let fixture: ComponentFixture<ExpandReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
