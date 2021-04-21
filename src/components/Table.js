import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import InfoCellRenderer from './InfoCellRenderer';
const Table = () => {
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
	const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

`;

	const [rowData, setRowData] = useState([]);

	let storageKey = 'darkMode';
	let localStorageTheme = null;
	try {
		localStorageTheme = localStorage.getItem(storageKey);
	} catch (err) {}

	useEffect(() => {
		const payload = {
			type: '3',
			prefix: 'bihar',
		};
		const requestOptions = {
			method: 'POST',
			body: JSON.stringify(payload),
		};
		fetch('https://api.getcovidhelp.in/getData', requestOptions)
			.then((res) => res.json())
			.then((result) => setRowData(result.data));
	}, []);
	function AgGridTab() {
		return (
			<AgGridReact
				rowData={rowData}
				rowHeight={300}
				frameworkComponents={{
					infoCellRenderer: InfoCellRenderer,
				}}
			>
				<AgGridColumn field="state" filter={true} sortable={true}></AgGridColumn>
				<AgGridColumn field="info" wrapText={true} cellRenderer="infoCellRenderer"></AgGridColumn>
				<AgGridColumn field="type" sortable={true}></AgGridColumn>
				<AgGridColumn field="createdAt"></AgGridColumn>
				<AgGridColumn field="district"></AgGridColumn>
			</AgGridReact>
		);
	}
	return localStorageTheme ? (
		<div
			className="ag-theme-alpine-dark"
			style={{ height: '40rem', width: '85%', marginLeft: '10%', marginTop: '2%', marginRight: '3%' }}
		>
			<AgGridTab />
		</div>
	) : (
		<div
			className="ag-theme-alpine"
			style={{ height: '40rem', width: '85%', marginLeft: '10%', marginTop: '2%', marginRight: '3%' }}
		>
			<agGrid />
		</div>
	);
};

export default Table;
