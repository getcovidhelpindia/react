import Footer from './Footer';
import { useState, useEffect } from 'react';
import { FAQ } from '../utils/faq';
// TODO(slightlyoff): factor out common JSON parsing & caching of this file

function About() {
	const [faq, setFaq] = useState([]);

	useEffect(() => {
		setFaq(FAQ.faq);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// const getFAQs = () => {
	// 	fetch(DATA_URL)
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setFaq(data.faq);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	return (
		<>
			<div className="About">
				{faq.map((faq, index) => {
					return (
						<div key={index} className="faq fadeInUp" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
							<h2 className="question">{faq.question}</h2>
							<h2 className="answer" dangerouslySetInnerHTML={{ __html: faq.answer }}></h2>
						</div>
					);
				})}
			</div>

			<Footer />
		</>
	);
}

export default About;
