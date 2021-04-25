import { useState, useCallback, useRef } from 'react';

// Libraries
import { FilePlus, HelpCircle, Home, Moon, Sun } from 'react-feather';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { useLockBodyScroll, useWindowSize } from 'react-use';

// Utilies
import { animations } from 'utils';

// Constants
const { SLIDE_IN, SLIDE_OUT, SLIDE_IN_MOBILE, SLIDE_OUT_MOBILE } = animations;

function Navbar({ pages, darkMode }) {
  const [expand, setExpand] = useState(false);

  useLockBodyScroll(expand);
  const windowSize = useWindowSize();

  const navbarTransition = useTransition(true, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  const expandTransition = useTransition(expand, {
    from: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    enter: windowSize.width < 769 ? SLIDE_OUT_MOBILE : SLIDE_OUT,
    leave: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    config: { mass: 1, tension: 210, friction: 26 },
  });

  const handleMouseEnter = useCallback(() => {
    if (windowSize.width > 769) {
      setExpand(true);
    }
  }, [windowSize.width]);

  return navbarTransition((style, item) => (
    <animated.div className='Navbar' {...{ style }}>
      <div
        className='navbar-middle'
        style={{ paddingTop: '1rem', paddingLeft: '0.5rem' }}
      >
        <Link to='/' onClick={setExpand.bind(this, false)}>
          Get COVIDHelp
          <br />
          <span>India</span>
        </Link>
      </div>

      <div
        className='navbar-right'
        onMouseEnter={handleMouseEnter}
        {...(windowSize.width < 769 && {
          onClick: setExpand.bind(this, !expand),
        })}
      >
        {windowSize.width < 769 && <span>{expand ? 'Close' : 'Menu'}</span>}

        {windowSize.width > 769 && (
          <>
            <Link to='/'>
              <span>
                <Home {...activeNavIcon('/')} />
              </span>
            </Link>
            <Link to='/addInfo'>
              <span>
                <FilePlus {...activeNavIcon('/addInfo')} />
              </span>
            </Link>
            <Link to='/about'>
              <span>
                <HelpCircle {...activeNavIcon('/about')} />
              </span>
            </Link>
            <span>
              <SunMoon {...{ darkMode }} />
            </span>
          </>
        )}
      </div>

      {expandTransition(
        (style, item) =>
          item && (
            <animated.div {...{ style }}>
              <Expand {...{ pages, setExpand, darkMode, windowSize }} />
            </animated.div>
          )
      )}
    </animated.div>
  ));
}

function Expand({ pages, setExpand, darkMode, windowSize }) {
  const expandElement = useRef(null);

  const handleMouseLeave = useCallback(() => {
    windowSize.width > 768 && setExpand(false);
  }, [setExpand, windowSize.width]);

  return (
    <div className='expand' ref={expandElement} onMouseLeave={handleMouseLeave}>
      {pages.map((page, i) => {
        if (page.showInNavbar === true) {
          return (
            <Link
              to={page.pageLink}
              key={i}
              {...(windowSize.width < 769 && {
                onClick: setExpand.bind(this, false),
              })}
            >
              <span
                {...navLinkProps(page.pageLink, page.animationDelayForNavbar)}
              >
                {page.displayName}
              </span>
            </Link>
          );
        }
        return null;
      })}

      {windowSize.width < 768 && <SunMoon {...{ darkMode }} />}

      <div className='expand-bottom'>
        <h5>
          {
            'A volunteer aggregation initiative to aid in combating COVID-19 in India.'
          }
        </h5>
      </div>
    </div>
  );
}

export default Navbar;

const navLinkProps = (path, animationDelay) => ({
  className: `${window.location.pathname === path ? 'focused' : ''}`,
});

const activeNavIcon = (path) => ({
  style: {
    stroke: window.location.pathname === path ? '#4c75f2' : '',
  },
});

const SunMoon = ({ darkMode }) => {
  return (
    <div className='SunMoon' onClick={darkMode.toggle}>
      <div>{darkMode.value ? <Sun color={'#ffc107'} /> : <Moon />}</div>
    </div>
  );
};
