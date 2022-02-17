import {
  useSelector
} from 'react-redux'

import {
  useEffect
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import Form from '../components/form'

import character_mobile from '../assets/thankyou-character.svg';

function Gracias() {
  const navigate = useNavigate()

  const userState = useSelector(store => store.user);
  const insuranceRegistrationState = useSelector(store => store.seguro.registration);

  useEffect(() => {
    if (userState.data === null) {
      navigate('/');
      return;
    } else if (insuranceRegistrationState.data === null || insuranceRegistrationState.formData === null) {
      navigate('/arma-tu-plan');
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    console.log('As required', insuranceRegistrationState.formData.get('amount'))
  }, [insuranceRegistrationState]);

  return (
    <div className='thankyou-screen'>
      <aside className='aside'>
        <img alt='Gracias' src={character_mobile} />
      </aside>
      <main className='main'>
        <h1 className='main__title'>¡Te damos la bienvenida!</h1>
        <h2 className='main__subtitle'>Cuenta con nosotros para proteger tu vehículo</h2>
        <p className='main__description'>Enviaremos la confirmación de compra de tu Plan Vehícular Tracking a tu correo:<br /><strong>{userState.data.email}</strong></p>

        <Form.Button className='main__button'>CÓMO USAR MI SEGURO</Form.Button>
      </main>
    </div>
  );
}

export default Gracias;