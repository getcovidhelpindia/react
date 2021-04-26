const fabClick = (shareArray) => {
  let shareString = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const row of shareArray) {
    shareString += `${row.data.info} at ${row.data.district} \n`;
  }
  const shareStringEncoded = encodeURIComponent(
    // eslint-disable-next-line max-len
    `Sharing useful resource info about COVID19 from https://getcovidhelp.in/ \n ${shareString}`,
  );

  if (navigator.share) {
    navigator
      .share({
        title: 'Get COVID Help India',
        text: `Sharing useful resource info about COVID19 \n ${shareString}`,
        url: 'https://getcovidhelp.in/',
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${shareStringEncoded}`);
  }
};

export default fabClick;
