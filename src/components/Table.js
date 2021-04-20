import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import useDarkMode from 'use-dark-mode';

const Table = () => {
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);

	const [rowData, setRowData] = useState([]);

	let storageKey = 'darkMode';
	let localStorageTheme = null;
	try {
		localStorageTheme = localStorage.getItem(storageKey);
	} catch (err) {}

	useEffect(() => {
		fetch('https://www.ag-grid.com/example-assets/row-data.json')
			.then((result) => result.json())
			.then((rowData) => setRowData(rowData));
	}, []);
	function AgGridTab() {
		return (
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
		);
	}
	return localStorageTheme ? (
		<div
			className="ag-theme-alpine-dark"
			style={{ height: '20rem', width: '80%', marginLeft: '10%', marginTop: '2%', marginRight: '5%' }}
		>
			<AgGridTab />
		</div>
	) : (
		<div
			className="ag-theme-alpine"
			style={{ height: '20rem', width: '80%', marginLeft: '10%', marginTop: '2%', marginRight: '5%' }}
		>
			<agGrid />
		</div>
	);
};

export default Table;
