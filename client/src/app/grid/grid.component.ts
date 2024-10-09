import { Component, ElementRef, Renderer2 } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { GridCell } from '../grid-cell/grid-cell';
import { GridCellComponent } from '../grid-cell/grid-cell.component';

@Component({
  selector: 'app-grid-component',
  templateUrl: 'grid.component.html',
  styleUrls: ['./grid.component.scss'],
  standalone: true,
  providers: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    GridCellComponent,
    MatGridListModule,
  ],
})
export class GridComponent {

  n: number = 10;
  grid: GridCell[][] = [];
  currentRow: number = 0;
  currentCol: number = 0;
  typeDirection: string = "right";
  typingDirections: string[] = ["right", "left", "up", "down"];
  currentDirectionIndex: number = 0;

  constructor(private renderer: Renderer2, public elRef: ElementRef) {
    this.initializeGrid();
  }

  onSizeInput() {
    console.log(this.n);
    this.initializeGrid();
  }

  initializeGrid() {
    this.grid=[];
      for(let row=0; row<this.n; ++row) {
        this.grid.push([]);
        for(let col=0; col<this.n; ++col) {
          this.grid[row].push(new GridCell());
    }
   }
  }

  onClick(event: MouseEvent, col: number, row: number) {
    this.moveFocus(col, row);
  }

  onKeydown(event: KeyboardEvent, row: number, col: number) {
    const cell = this.grid[col][row];
    const inputElement = this.elRef.nativeElement.querySelector(`app-grid-cell[data-col="${col}"][data-row="${row}"] input`);

    console.log('keydown', event.key, col, row);


// BOLDING CELLS WALLS DEPENDING ON POSITION
  // onCrtlKeyDown(event: KeyboardEvent, colIndex: number, rowIndex: number) {
  //   if (event.ctrlKey) {
  //     event.preventDefault();
  //     switch (event.key) {
  //       case 'ArrowUp':
  //         this.(rowIndex, colIndex - 1).setBoldBottom()
  //         break;
  //       case 'ArrowRight':
  //         this.(rowIndex + 1, colIndex).setBoldLeft()
  //         break;
  //       case 'ArrowDown':
  //         this.(rowIndex, colIndex + 1).setBoldTop()
  //         break;
  //       case 'ArrowLeft':
  //         this.(rowIndex - 1, colIndex).setBoldRight()
  //         break;
  //       default:
  //         break;
  //     }
  //     }
  //   }

    if (!event.ctrlKey) {
      switch (event.key) {
          case 'ArrowUp':
            this.moveFocus(col, row - 1);
            break;
          case 'ArrowDown':
            this.moveFocus(col, row + 1);
            break;
          case 'ArrowLeft':
            this.moveFocus(col - 1, row);
            break;
          case 'ArrowRight':
            this.moveFocus(col + 1, row);
            break;
          case 'Backspace':
            if (inputElement) {
              // this.renderer.setProperty(inputElement, 'value', '');
              cell.value = '';
            }
            if (this.typeDirection === "right") {
              // setTimeout(() => this.moveFocus(col - 1, row), 0);
              this.moveFocus(col - 1, row)
            }
            if (this.typeDirection === "left") {
              // setTimeout(() => this.moveFocus(col + 1, row), 0);
              this.moveFocus(col + 1, row)
            }
            if (this.typeDirection === "up") {
              // setTimeout(() => this.moveFocus(col, row + 1), 0);
              this.moveFocus(col, row + 1)
            }
            if (this.typeDirection === "down") {
              // setTimeout(() => this.moveFocus(col, row - 1), 0);
              this.moveFocus(col, row - 1)
            }
            break;
          default:
            if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
              console.log('old cell value = ', cell.value);
              cell.value = event.key;
              console.log('new cell value = ', cell.value);
              // if (inputElement) {
              //   // this.renderer.setProperty(inputElement, 'value', event.key);
              //   console.log(cell, ' at ', col, row);
              //   cell.value = event.key;
              // }
              if (this.typeDirection === "right") {
                // setTimeout(() => this.moveFocus(col + 1, row), 0);
                console.log('moving focus to ', col + 1, row);
                this.moveFocus(col + 1, row)
              }
              if (this.typeDirection === "left") {
                // setTimeout(() => this.moveFocus(col - 1, row), 0);
                this.moveFocus(col - 1, row)
              }
              if (this.typeDirection === "up") {
                // setTimeout(() => this.moveFocus(col, row - 1), 0);
                this.moveFocus(col, row - 1)

              }
              if (this.typeDirection === "down") {
                // setTimeout(() => this.moveFocus(col, row + 1), 0);
                this.moveFocus(col, row + 1)
              }
            }
            break;
        }
      } else{
          switch (event.key) {
            case 'Backspace':
            if (inputElement) {
              console.log(inputElement.value);
              this.renderer.setProperty(inputElement, 'value', '');
              setTimeout(() => this.moveFocus(col, row), 0);
              console.log(inputElement.value);

            }
        }
      }
  }

  moveFocus(col: number, row: number) {
    if (col >= 0 && col < this.grid.length && row >= 0 && row < this.grid[col].length) {
      this.currentCol = col;
      this.currentRow = row;

      console.log(col, row);

      const cellInput = document.querySelector(`app-grid-cell[data-col="${col}"][data-row="${row}"] input`);
      console.log(cellInput);

      if (cellInput) {
        setTimeout(() => (cellInput as HTMLElement).focus());
      }
    }
  }

  cycleTypingDirection() {
    this.currentDirectionIndex = (this.currentDirectionIndex + 1) % this.typingDirections.length;
    this.typeDirection = this.typingDirections[this.currentDirectionIndex];
    console.log(`Typing direction changed to: ${this.typeDirection}`);
  }
}
