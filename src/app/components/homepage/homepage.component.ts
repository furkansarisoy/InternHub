import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'internhub-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.body.className = "";
  }

  ngOnDestroy(): void {
    document.body.className = "background"
  }

}
