export const table: Table = {
  caption: '',
  thead: [],
  tbody: [[1, '$100', '2019'],[2,'$200','2019'],]
}

export interface Table {
  caption: string;
  thead: string[];
  tbody: (string | number)[][];
}