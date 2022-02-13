import {ReactComponent as CharacterSvg} from '../assets/home-character.svg';

function Home() {
  return (
    <div className="home-screen">
      <aside className="aside">
        <CharacterSvg className="aside__character" />
        <p className="aside__text-new">¡Nuevo!</p>
        <h1 className="aside__title">Seguro <span className="text-red-desktop">Vehicular</span><br /><span className="text-red">Tracking</span></h1>
        <p className="aside__text-description">Cuentanos donde le haras<br />seguimiento a tu seguro</p>
      </aside>
      <main className="main">

      </main>
    </div>
  );
}

export default Home;