import {
  useSelector
} from 'react-redux'

/* eslint-disable jsx-a11y/alt-text */
function RimacHeader () {
  const extraClassName = useSelector(state => state.ui.header_extra_className)
  return (
    <header className={"rimac-header" + (extraClassName !== '' ? ` ${extraClassName}` : '')}>
      <div className="rimac-header__container">
        <img className="rimac-header__logo" src="img/logo.svg" alt="Rimac Seguros" />
        <span className='rimac-header__call-us-wrapper'>
          <span className="show-only-desktop">¿Tienes alguna duda?</span>
          <a className="rimac-header__call-us" href="tel:014116001">
            <img src="img/icon/phone.svg" />
            <span className="show-only-mobile">Llámanos</span>
            <span className="show-only-desktop">(01) 411 6001</span>
          </a>
        </span>
      </div>
    </header>
  );
}

export default RimacHeader;