import { Component, Input } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GridCell } from './grid-cell';
import { Edges } from './edges';


@Component({
  selector: 'app-grid-cell',
  templateUrl: 'grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss'],
  providers: [],
  standalone: true,
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
  ],
})
export class GridCellComponent {


  @Input({ required: true }) gridCell: GridCell;

  constructor() {
    if (!this.gridCell) {
      this.gridCell = new GridCell;
    }
  }

  onInput(value: string) {
    if (this.validateInput(value)) {
      this.gridCell.value = value;
    } else {
      this.gridCell.value = '';
    }
  }

  validateInput(value: string): boolean {
    const regex = /^[A-Za-z]$/;
    return regex.test(value);
  }

  setEdges(edges: Edges) {
    this.gridCell.edges = edges;
  }

  setEditable(state: boolean) {
    this.gridCell.editable = state;
  }

  toggleTopEdge() {
    this.gridCell.edges.top = !this.gridCell.edges.top;
  }

  toggleRightEdge() {
    this.gridCell.edges.right = !this.gridCell.edges.right;
  }

  toggleBottomEdge() {
    this.gridCell.edges.bottom = !this.gridCell.edges.bottom;
  }

  toggleLeftEdge() {
    this.gridCell.edges.left = !this.gridCell.edges.left;
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.gridCell.editable && event.ctrlKey) {
      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
          this.toggleTopEdge();
          break;
        case 'ArrowRight':
          this.toggleRightEdge();
          break;
        case 'ArrowDown':
          this.toggleBottomEdge();
          break;
        case 'ArrowLeft':
          this.toggleLeftEdge();
          break;
        default:
          break;
      }
    }
  }
}

