import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'internhub-button-blop',
  templateUrl: './button-blop.component.html',
  styleUrls: ['./button-blop.component.scss']
})
export class ButtonBlopComponent implements OnInit {

  @Input() title;
  @HostBinding("style.--color")
  @Input() color = "#ffffff";
  @HostBinding("style.--blop-color")
  @Input() blopcolor = "#ff4f5a";
  @HostBinding("style.--bg-color")
  @Input() bgColor = "#ffffff";

  @Input() type;

  @Output() clickButton = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(event) {
    this.clickButton.emit(event);
  }

}
