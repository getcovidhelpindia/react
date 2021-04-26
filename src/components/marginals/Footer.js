import { memo } from 'react';

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faInstagram,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <div className='link'>
        <a href='/'>getcovidhelpindia</a>
      </div>

      <h5>Let us collaborate to help each other in this pandemic</h5>

      <div className='links'>
        <a
          href='https://github.com/getcovidhelpindia'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <a
          href='https://twitter.com/indiacovidhelp'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a
          href='https://www.instagram.com/india.covidhelp/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a
          href='http://discord.getcovidhelp.in/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </div>
      <br />
      <h5>
        Based on the works of{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://covid19india.org'
        >
          covid19india.org
        </a>
      </h5>
    </footer>
  );
}

export default memo(Footer);
