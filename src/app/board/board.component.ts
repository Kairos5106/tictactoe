import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, SquareComponent],
  template: `
    <h1>Current Player: {{ player }}</h1>
    
    <button (click)="newGame()">Start New Game</button>

    <h2 *ngIf="winner">
      Winner: {{ winner }}
    </h2>

    <main>
      <app-square 
        *ngFor="let val of squares; let i = index"
        [value]="val"
        (click)="makeMove(i)">
        
      </app-square>
    </main>
  `,
  styles: `
    main {
      display: grid;
      grid-template-columns: 40px 40px 40px;
      grid-gap: 0px;
    }

    app-square {
      border: 1px gray solid;
      height: 40px;
      width: 40px;
    }
  `
})
export class BoardComponent {
  squares: any[] = Array(9).fill(null);
  xIsNext: boolean = true;
  winner: string = '';

  constructor() {} // mostly used for dependency injection

  // used for initial setup (if required)
  ngOnInit() {
    this.newGame();
  } 

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number) {
    if(!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
