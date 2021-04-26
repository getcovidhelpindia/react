import React from 'react';

// Libraries
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import moment from 'moment';
import rehypeRaw from 'rehype-raw';

export const InfoCellRenderer = (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div style={{ height: '100' }}>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
        children={cellValue}
        skipHtml={true}
      />
    </div>
  );
};

export const customValueSetter = (params) => {
  console.log(params);
  return 5;
};

export const CreatedAtCellRenderer = (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  return moment(cellValue).fromNow();
};
