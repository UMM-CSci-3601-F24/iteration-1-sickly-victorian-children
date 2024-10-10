import { Edges } from './edges';

export class GridCell {
  editable: boolean = true;
  value: string = '';
  edges: Edges = { top: false, right: false, bottom: false, left: false };
  // Each boolean coresponds to an edge, true means it is bolded.


  toggleTopEdge() {
    this.edges.top = !this.edges.top;
  }

  toggleRightEdge() {
    this.edges.right = !this.edges.right;
  }

  toggleBottomEdge() {
    this.edges.bottom = !this.edges.bottom;
  }

  toggleLeftEdge() {
    this.edges.left = !this.edges.left;
  }
}
