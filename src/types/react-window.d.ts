declare module 'react-window' {
  export const FixedSizeGrid: any;
  export interface GridChildComponentProps {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: any;
  }
}
