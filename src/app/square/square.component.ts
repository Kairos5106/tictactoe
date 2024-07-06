import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  template: `
    <button>{{ value }}</button>
  `,
  styles: ``
})
export class SquareComponent {
  constructor() {
    this.value = 'X';
  }
  @Input() value: 'X' | 'O';
}
