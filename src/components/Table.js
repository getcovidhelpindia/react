import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Table = () => {
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);

	const [rowData, setRowData] = useState([]);

	useEffect(() => {
		fetch('https://www.ag-grid.com/example-assets/row-data.json')
			.then((result) => result.json())
			.then((rowData) => setRowData(rowData));
	}, []);
	return (
		<div
			className="ag-theme-alpine"
			style={{ height: '20rem', width: '80%', marginLeft: '10%', marginTop: '2%', marginRight: '5%' }}
		>
			<AgGridReact rowData={rowData}>
				<AgGridColumn field="make" filter={true} sortable={true}></AgGridColumn>
				<AgGridColumn field="model"></AgGridColumn>
				<AgGridColumn field="price" sortable={true}></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="make"></AgGridColumn>
				<AgGridColumn field="model"></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
			</AgGridReact>
		</div>
	);
};

export default Table;
