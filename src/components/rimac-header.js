/* eslint-disable jsx-a11y/alt-text */
function RimacHeader () {
  return (
    <header className="rimac-header">
      <img className="rimac-header__logo" src="img/logo.svg" alt="Rimac Seguros" />
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/arma-tu-plan">Arma tu plan</Link>
        <Link to="/gracias">Gracias</Link>
      </nav> */}
      <a className="rimac-header__call-us" href="tel:014116001">
        <img src="img/icon/phone.svg" />
        <span className="show-only-mobile">Llámanos</span>
        <span className="show-only-desktop">(01) 411 6001</span>
      </a>
    </header>
  );
}

export default RimacHeader;