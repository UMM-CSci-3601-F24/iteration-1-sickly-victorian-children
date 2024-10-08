import { Component, ElementRef, Renderer2 } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GridCell } from '../grid-cell/grid-cell';
import { GridCellComponent } from '../grid-cell/grid-cell.component';


@Component({
  selector: 'app-grid-component',
  templateUrl: 'grid.component.html',
  styleUrls: ['./grid.component.scss'],
  standalone: true,
  providers: [],
  imports: [
    AsyncPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
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


  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.initializeGrid();
  }

  // defaultGridCell(): GridCell {
  //   return {
  //     editable: true,
  //     value: '',
  //     edges: { top: false, right: false, bottom: false, left: false },
  //   };
  // }

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




  onClick(event: MouseEvent, rowIndex: number, colIndex: number) {
    this.moveFocus(rowIndex, colIndex);
  }

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

  onKeydown(event: KeyboardEvent, colIndex: number, rowIndex: number) {
    if (!event.ctrlKey) {
      switch (event.key) {
          case 'ArrowUp':
            this.moveFocus(rowIndex, colIndex - 1);
            break;
          case 'ArrowDown':
            this.moveFocus(rowIndex, colIndex + 1);
            break;
          case 'ArrowLeft':
            this.moveFocus(rowIndex - 1, colIndex);
            break;
          case 'ArrowRight':
            this.moveFocus(rowIndex + 1, colIndex);
            break;
        }
      }
  }

  moveFocus(col: number, row: number) {
    if (col >= 0 && col < this.grid.length && row >= 0 && row < this.grid[col].length) {
      this.currentCol = col;
      this.currentRow = row;

      console.log(col, row);

      const cell = document.querySelector(`app-grid-cell[data-row="${col}"][data-col="${row}"] input`);
      console.log(cell);

      if (cell) {
        (cell as HTMLElement).focus();
      }
    }
  }
}
