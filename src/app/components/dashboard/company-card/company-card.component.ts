import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'internhub-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() name: string;
  @Input() city: string;
  @Input() rate: number;
  @Input() logoUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
