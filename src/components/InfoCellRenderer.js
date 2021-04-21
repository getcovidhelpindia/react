import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const InfoCellRenderer = (props) => {
	const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
	console.log(cellValue, 'ab');

	const markdown = `
## Name
${cellValue.name}

## Contact
${cellValue.contact}

## Info
${cellValue.description}

## Location
${cellValue.location}
`;

	return <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />;
};

export default InfoCellRenderer;
