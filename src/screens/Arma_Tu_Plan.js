import React, {
  useEffect,
  useState,
  Component
} from 'react'

import PropTypes from 'prop-types';

import {
  useSelector,
  useDispatch
} from 'react-redux'

import {
  useNavigate
} from 'react-router-dom';

import Stepper from '../components/stepper'

import Form from '../components/form'
import Tabs from '../components/tabs'

import {
  getBaseData,
  getCoberturas
} from '../store/modules/coberturas.actions'

import clone from 'lodash/clone'

import {
  registerSolicitudSeguro
} from '../store/modules/seguro.actions'

import { ReactComponent as CharacterSvg } from '../assets/vehicle-details-character.svg';
class CoberturaListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      className: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.isSelected);
      }
    }
  }

  handleCheckboxClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      isSelected: !this.state.isSelected
    });
  }

  setOff = () => {
    this.setState({
      isSelected: false
    });
  }

  setOn = () => {
    this.setState({
      isSelected: true
    });
  }

  hide = () => {
    this.setState({
      className: 'insurance-list-item--hidden'
    });
  }

  show = () => {
    this.setState({
      className: ''
    });
  }

  render () {
    return (
      <div className={'insurance-list-item' + (this.state.className ? ` ${this.state.className}` : '')}>
        <div className='insurance-list-item__icon'>
          <img src={`/img/coberturas/cobertura_${this.props.itemData.id}.png`} alt={this.props.itemData.name} />
        </div>
        <div className='insurance-list-item__content'>
          <input type='hidden' name={`insurance_item[${this.props.itemData.id}]`} value={ this.state.isSelected ? 'on' : 'off' } />
          <p className='insurance-list-item__title'>{ this.props.itemData.name }</p>
          <button onClick={this.handleCheckboxClick} className={'insurance-list-item__checkbox' + (this.state.isSelected ? ' insurance-list-item__checkbox--active' : '')}>
            <span className='insurance-list-item__checkbox-icon'></span>
            <p className='insurance-list-item__checkbox-label'>{ this.state.isSelected ? 'QUITAR' : 'AGREGAR' }</p>
          </button>
          <p className='insurance-list-item__description'>{ this.props.itemData.description }</p>
          {/* toggle description */}
        </div>
      </div>
    )
  }
}

CoberturaListItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

function Arma_Tu_Plan() {
  const [coberturaItemsStatus, setCoberturaItemsStatus] = useState({});
  const [amount, setAmount] = useState(0);

  const userState = useSelector(store => store.user);
  const seguroRegistrationState = useSelector(store => store.seguro.registration);
  const coberturasList = useSelector(store => store.coberturas.list);
  const baseData = useSelector(store => store.coberturas.baseData);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const dispatch_2 = useDispatch();

  const intl = new Intl.NumberFormat("en-EN", {minimumFractionDigits: 0, currency: 'USD', style: 'currency'});
  const intl_decimals = new Intl.NumberFormat("en-EN", {minimumFractionDigits: 2, currency: 'USD', style: 'currency'});

  const formatPlate = plate => {
    plate = plate.toUpperCase();
    return plate.substring(0, 3) + '-' + plate.substring(3);
  }

  const stepsArr = [
    {
      name: 'Datos',
      path: '/'
    },
    {
      name: 'Arma tu plan',
      path: '/arma-tu-plan'
    }
  ]

  const validateFn = () => {
    return {}
  }

  const handleSubmit = (dataJSON, formData) => {
    formData.append('user_id', userState.data.id);
    dispatch_2(registerSolicitudSeguro(formData));
  }

  const coberturaFormItems = {};
  
  useEffect(() => {
    if (coberturasList.data !== null) {
      const coberturaFormItemsStatus = {};

      Object.keys(coberturasList.data).forEach(type => {
        coberturaFormItemsStatus[type] = [];

        coberturasList.data[type].forEach(cobertura => {
          coberturaFormItemsStatus[type].push(false)
          if (typeof coberturaFormItems[`ci_${cobertura.id}`] === 'undefined') {
            coberturaFormItems[`ci_${cobertura.id}`] = null;
          }
        })
      });

      setCoberturaItemsStatus(coberturaFormItemsStatus)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coberturasList])

  

  const handleCoberturaItemChange = (type, ix) => value => {
    const nextState = clone(coberturaItemsStatus);
    nextState[type][ix] = value

    setCoberturaItemsStatus(nextState);
  }

  useEffect(() => {
    if (coberturasList.data === null) {
      setAmount(0);
      return;
    }

    if (baseData.data === null) {
      setAmount(0);
      return;
    }

    let nextAmount = baseData.data.baseAmount;

    Object.keys(coberturaItemsStatus).forEach(type => {
      coberturaItemsStatus[type].forEach((isSelected, ix) => {
        if (isSelected) {
          nextAmount += coberturasList.data[type][ix].amount
        }
      })
    });

    setAmount(nextAmount);
  }, [ coberturaItemsStatus, baseData, coberturasList ])

  const handleMontoAseguradoChange = (value, prevValue) => {
    if (value >= 16000 && prevValue < 16000) {
      coberturaFormItems['ci_2'].setOff()
      coberturaFormItems['ci_2'].hide()
    }
    
    if (value < 16000 && prevValue >= 16000) {
      coberturaFormItems['ci_2'].setOn()
      coberturaFormItems['ci_2'].show()
    }
  }

  let tabs = (<div>Cargando coberturas ...</div>)
  if (coberturasList.fetched) {
    const tabElements = [
      {
        title: 'Protege a tu auto',
        component: <div className='insurance-list__wrapper'>
          { coberturasList.data.personal.length > 0 ? coberturasList.data.personal.map( (item, itemIx) => (
            <CoberturaListItem onChange={handleCoberturaItemChange('personal', itemIx)} ref={el => coberturaFormItems[`ci_${item.id}`] = el} key={`list_item_${item.id}`} itemData={item} />
          )) : <p className='insurance-list__empty-list'>No hay coberturas</p> }
        </div>
      },
      {
        title: 'Protege a los que te rodean',
        component: <div className='insurance-list__wrapper'>
        { coberturasList.data.terceros.length > 0 ? coberturasList.data.terceros.map( (item, itemIx) => (
          <CoberturaListItem onChange={handleCoberturaItemChange('terceros', itemIx)} ref={el => coberturaFormItems[`ci_${item.id}`] = el} key={`list_item_${item.id}`} itemData={item} />
        )) : <p className='insurance-list__empty-list'>No hay coberturas</p> }
      </div>
      },
      {
        title: 'Mejora tu plan',
        component: <div className='insurance-list__wrapper'>
        { coberturasList.data.extras.length > 0 ? coberturasList.data.extras.map( (item, itemIx) => (
          <CoberturaListItem onChange={handleCoberturaItemChange('extras', itemIx)} ref={coberturaFormItems[`ci_${item.id}`]} key={`list_item_${item.id}`} itemData={item} />
        )) : <p className='insurance-list__empty-list'>No hay coberturas</p> }
      </div>
      }
    ];

    tabs = <Tabs tabs={tabElements} />
  }

  let main = (<div>Cargando ...</div>);
  if (baseData.data !== null) {
    main = ( <main className='main'>
      <Form validationFn={validateFn} onSuccess={handleSubmit}>
        <h2 className='main__title'>Mira las coberturas</h2>
        <p className='main__description'>Conoce las coberturas para tu plan</p>

        <section className='form-insurance'>
          <section className='form-insurance__main'>
            <div className='main__card-vehicle-details'>
              <p className='main__card-plate'>Placa: {formatPlate(userState.data.vehicle.car.plate)}</p>
              <p className='main__vehicle-model'>{userState.data.vehicle.car.model} {userState.data.vehicle.car.year}</p>
              <CharacterSvg />
            </div>

            <div className='insurance-form'>

              <div className='insured-amount'>
                <div className='insured-amount--wrapper'>
                  <p className='insured-amount__title'>Indica la suma asegurada</p>
                  <div className='insured-amount__min-max'>
                    <p>MIN {intl.format(baseData.data.minInsuredAmount)}</p>
                    <span className='separator' />
                    <p>MAX {intl.format(baseData.data.maxInsuredAmount)}</p>
                  </div>
                  <Form.InputMoney onChange={handleMontoAseguradoChange} name='insured_amount' max={baseData.data.maxInsuredAmount} min={baseData.data.minInsuredAmount} step={100} />
                </div>
              </div>

              <h3 className='insurance-form__customize-coverages-title'>Agrega o quita coberturas</h3>

              { tabs }
            </div>
          </section>
          <aside className='form-insurance__aside'>
            <div className='form-insurance__amount'>
              <p className='form-insurance__amount-title'>MONTO</p>
              <p className='form-insurance__amount-number'>{ intl_decimals.format(amount) }</p>
              <p className='form-insurance__amount-recurrency'>
                <span className='show-only-mobile'>MENSUAL</span>
                <span className='show-only-desktop'>MENSUALES</span>
              </p>
            </div>
            <div className='form-insurance__includes'>
              <p className='form-insurance__includes-title'>El precio incluye</p>
              <ul className='form-insurance__includes-list'>
                <li>Llanta de repuesto</li>
                <li>Análisis de motor</li>
                <li>Aros gratis</li>
              </ul>
            </div>

            <div className='form-insurance__submit text-right'>
              <Form.Button loading={seguroRegistrationState.loading} type='submit'>LO QUIERO</Form.Button>
            </div>
          </aside>
        </section>


      </Form>
    </main>);
  }

  useEffect(() => {
    if (userState.data === null) {
      navigate('/');
      return;
    }

    dispatch(getBaseData())
    dispatch(getCoberturas())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='arma-tu-plan-screen'>
      <aside className='aside'>
        <Stepper stepsArr={stepsArr} currentStepIndex={1} />
      </aside>

      { main }
      
    </div>
  );
}

export default Arma_Tu_Plan;