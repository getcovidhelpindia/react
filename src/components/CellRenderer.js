import React from 'react';

// Libraries
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import moment from 'moment';
import rehypeRaw from 'rehype-raw';

export const InfoCellRenderer = ({ valueFormatted, value }) => {
  const cellValue = valueFormatted || value;

  return (
    <div style={{ height: '100' }}>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
        // eslint-disable-next-line react/no-children-prop
        children={cellValue}
        skipHtml
      />
    </div>
  );
};

export const customValueSetter = () => 5;

export const CreatedAtCellRenderer = (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  return moment(cellValue).fromNow();
};
