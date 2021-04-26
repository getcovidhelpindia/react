import React, { useState, useEffect } from 'react';

// Libraries
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// CSS
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// Components
import { InfoCellRenderer, CreatedAtCellRenderer } from 'components';

const TableAdmin = ({ darkMode, rowData, setShareArray }) => {
  const [darkThemeClassState, setDarkThemeClassState] = useState('');

  // Helper Functions
  const onSelectionChanged = (event) =>
    setShareArray(event.api.getSelectedNodes());

  useEffect(() => {
    const themeClassName = darkMode.value
      ? 'ag-theme-alpine-dark'
      : 'ag-theme-alpine';
    setDarkThemeClassState(themeClassName);
  }, [darkMode.value]);

  return (
    <div
      style={{ height: '70vh', marginTop: 20 }}
      className={darkThemeClassState}
    >
      <AgGridReact
        rowData={rowData}
        suppressRowClickSelection={true}
        rowSelection={'multiple'}
        onSelectionChanged={onSelectionChanged}
        frameworkComponents={{
          infoCellRenderer: InfoCellRenderer,
          createdAtCellRenderer: CreatedAtCellRenderer,
        }}
        overlayLoadingTemplate={
          '<span className="ag-overlay-loading-center">Please wait while we are fetching the data</span>'
        }
        overlayNoRowsTemplate={
          rowData
            ? '<span >Please select your state and required resource type</span>'
            : '<span className="ag-overlay-loading-center">Please wait while we are fetching the data</span>'
        }
      >
        <AgGridColumn
          field='district'
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
          checkboxSelection={true}
        />
        <AgGridColumn
          field='info'
          wrapText={true}
          minWidth={150}
          flex={1}
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
          autoHeight={true}
        />
        <AgGridColumn
          field='contact'
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
          wrapText={true}
          autoHeight={true}
        />
        <AgGridColumn
          field='createdAt'
          cellRenderer='createdAtCellRenderer'
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
        />
        <AgGridColumn
          field='isApproved'
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
          editable={true}
          cellEditor='agSelectCellEditor'
          cellEditorParams={{
            values: [true, false],
          }}
        />
        <AgGridColumn
          field='verifiedAt'
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
        />
        <AgGridColumn
          field='isHidden'
          filter='agTextColumnFilter'
          floatingFilter={true}
          sortable={true}
        />
      </AgGridReact>
    </div>
  );
};

export default TableAdmin;
