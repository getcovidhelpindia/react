import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
});

const InfoCellRenderer = (props) => {
	const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
	// 	const markdown = `
	// ##### Name
	// ~~~
	// aadssadsa
	// ~~~
	// ## Contact
	// ${cellValue.contact}
	// ## Info
	// ${cellValue.description}
	// https://ac.om
	// ## Location
	// ${cellValue.location}
	// `;

	// 	return <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />;
};

const customValueSetter = (params) => {
	console.log(params);
	return 5;
};

const CreatedAtCellRenderer = (props) => {
	const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
	return moment(cellValue).fromNow();
};

export { InfoCellRenderer, CreatedAtCellRenderer, customValueSetter };
