import { useState, useEffect } from 'react';

// Components
import { Layout } from '../components/marginals';

// Utilities
import { FAQ } from '../assets';
// TODO(slightlyoff): factor out common JSON parsing & caching of this file

function About() {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    setFaq(FAQ.faq);
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className='About'>
        {faq.map((faq, index) => (
          <div
            key={index}
            className='faq fadeInUp'
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <h2 className='question'>{faq.question}</h2>
            <h2
              className='answer'
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            ></h2>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default About;
