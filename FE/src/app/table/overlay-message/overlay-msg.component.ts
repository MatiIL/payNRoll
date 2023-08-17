import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-msg',
  templateUrl: './overlay-msg.component.html',
  styleUrls: ['./overlay-msg.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class OverlayMsgComponent {
  @Input() showOverlay: boolean = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

