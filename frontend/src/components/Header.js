import logo from '../images/logo/logo_white.svg';
import { useLocation, Link } from 'react-router-dom';
import burger from '../images/logo/hamburger.svg'
import close from '../images/logo/сlose_btn.svg'
import { useState } from 'react';

function Header({ loggedIn, handleSignOut, userEmail }) {

  let location = useLocation();
  const [isPressed, setPressed] = useState(false)

  const handleSwitchButton = (locate) => {
    switch (locate.pathname) {
      case '/sign-in':
        return <Link to="/sign-up" className="header__link">Регистрация</Link>
      case '/sign-up':
        return <Link to="/sign-in" className="header__link">Войти</Link>
      default:
    }
  }

  return (
    <header className="header">
      <img
        src={logo}
        alt="место"
        className="header__logo"
      />
      <div id="navbar" className='header__navigate'>
        {loggedIn ?
          <>
            <span className="header__user-info">{`${userEmail}`}</span>
            <span onClick={handleSignOut} className="header__link">Выход</span>
          </> :
          handleSwitchButton(location)
        }
      </div>
      {isPressed && <a href="#close" className="header__menu" onClick={() => setPressed(!isPressed)}>
        <img
          className="header__menu"
          src={close}
          alt="menu"
        />
      </a>}
      {!isPressed && <a href="#navbar" className="header__menu" onClick={() => setPressed(!isPressed)}>
        <img
          className="header__menu"
          src={burger}
          alt="menu"
        />
      </a>}
    </header >
  );
}

export default Header;
