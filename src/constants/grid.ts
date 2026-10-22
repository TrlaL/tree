import type { AutoGroupColumnDef, ColDef } from 'ag-grid-community';
import type { TreeRow } from '../types/tree';

export const DEFAULT_COL_DEF: ColDef = {
  flex: 1,
  minWidth: 150,
  resizable: false,
  sortable: false,
  suppressHeaderMenuButton: true,
};

export const COL_DEFS: ColDef<TreeRow>[] = [
  {
    colId: 'number',
    headerName: '№',
    valueGetter: ({ node }) => (node?.rowIndex ?? 0) + 1,
    lockPosition: 'left',
    flex: 0,
    width: 90,
    minWidth: 90,
  },
  { 
    field: 'label',
    headerName: 'Наименование'
  },
];

export const AUTO_GROUP_COLUMN_DEF: AutoGroupColumnDef<TreeRow> = {
  headerName: 'Категория',
  field: 'category',
  minWidth: 150,
  cellRendererParams: {
    suppressCount: true,
  },
};