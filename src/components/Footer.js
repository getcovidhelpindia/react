import { memo } from 'react';
import { Twitter, GitHub, Instagram } from 'react-feather';

function Footer() {
	return (
		<footer>
			<div className="link">
				<a href="/">getcovidhelpindia</a>
			</div>

			<h5>{'Let us collaborate to help each other in this pandemic'}</h5>

			<div className="links">
				<a href="https://github.com/getcovidhelpindia" className="github" target="_blank" rel="noopener noreferrer">
					<GitHub />
				</a>

				<a href="https://twitter.com/indiacovidhelp" target="_blank" rel="noopener noreferrer" className="twitter">
					<Twitter />
				</a>

				<a
					href="https://www.instagram.com/india.covidhelp/"
					target="_blank"
					rel="noopener noreferrer"
					className="instagram"
				>
					<Instagram />
				</a>
			</div>
		</footer>
	);
}

export default memo(Footer);
