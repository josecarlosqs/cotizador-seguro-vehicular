/* eslint-disable jsx-a11y/anchor-is-valid */
import {ReactComponent as CharacterSvg} from '../assets/home-character.svg';

import Form from '../components/form'

function Home() {

  const validateField = (fieldName, fieldValue, formData) => {
    switch (fieldName) {
      case 'tipo_documento': return ['DNI', 'RUC'].indexOf(fieldValue) > -1;
      case 'nro_documento': {
        if (formData.tipo_documento === 'DNI') {
          return /^[0-9]{8}$/.test(fieldValue);
        } else {
          return /^[0-9]{11}$/.test(fieldValue);
        }
      }
      case 'celular': return /^9[0-9]{8}$/.test(fieldValue);
      case 'placa': return /^[a-z0-9]{6}$/.test(fieldValue);
      case 'tyc': return fieldValue === 'on';
      default:
    }
  }

  const validateForm = formData => {
    const errors = {};

    const keys = Object.keys(formData);

    keys.forEach(key => {
      errors[key] = validateField(key, formData[key], formData)
    });

    return errors;
  }

  const handleFormSubmit = formData => {
    console.log('enviar', formData)
  }

  return (
    <div className="home-screen">
      <aside className="aside">
        <CharacterSvg className="aside__character" />
        <p className="aside__text-new">¡Nuevo!</p>
        <h1 className="aside__title">Seguro <span className="text-red-desktop">Vehicular</span><br /><span className="text-red">Tracking</span></h1>
        <p className="aside__text-description">Cuentanos donde le haras<br />seguimiento a tu seguro</p>
      </aside>
      <main className="main">
        <h2 class="main__title">Déjanos tus datos</h2>

        <Form validationFn={validateForm} onSuccess={handleFormSubmit}>
          <Form.Group>

            <Form.Select name="tipo_documento">
              <option>DNI</option>
              <option>RUC</option>
            </Form.Select>

            <Form.Input name="nro_documento" placeholder="Nro. de doc" type="number" />

          </Form.Group>
          
          <Form.Input name="celular" type="number" placeholder="Celular" />
        
          <Form.Input name="placa" placeholder="Placa" />
          
          <Form.Checkbox name="tyc">
            <p className='form__tyc-copy'>Acepto la <a href="#">Política de Protección de Datos Personales</a> y los <a href="#">Términos y Condiciones</a>.</p>
          </Form.Checkbox>

          <Form.Button type="submit" className='fw-mobile form__send-button' loading={false}>
            COTÍZALO
          </Form.Button>

        </Form>

      </main>
    </div>
  );
}

export default Home;