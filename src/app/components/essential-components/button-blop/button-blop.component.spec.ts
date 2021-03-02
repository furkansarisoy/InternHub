import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBlopComponent } from './button-blop.component';

describe('ButtonBlopComponent', () => {
  let component: ButtonBlopComponent;
  let fixture: ComponentFixture<ButtonBlopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonBlopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
