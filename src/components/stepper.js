import PropTypes from 'prop-types';

import {
  useScreenBreakpoint,
  ScreenModes
} from '../hooks'

import {
  useNavigate
} from 'react-router-dom'

import {
  useState
} from 'react'

import { ReactComponent as ChevronLeft } from '../assets/ic-chevron-left.svg'

function ListStepper (props) {
  const navigate = useNavigate();

  const goTo = path => e => {
    e.preventDefault();
    e.stopPropagation();

    navigate(path);
  }
  return (
    <div className='list-stepper'>
      <div className='list-stepper__wrapper'>
        {props.stepsArr.map((step, stepIx) => (
          <div key={`stepper_item_${stepIx}`} className='list-stepper__button-wrapper'>
            <button onClick={ goTo(step.path) } className={'list-stepper__button' + (stepIx === props.currentStepIndex ? ' list-stepper__button--current' : '')}>
              <span className='list-stepper__number'>{ stepIx + 1 }</span>
              <span className='list-stepper__label'>{ step.name }</span>
            </button>
          </div>
        ))}
      </div>
    </div>)
}

function BarStepper (props) {
  const navigate = useNavigate();

  const goBack = e => {
    e.preventDefault();
    e.stopPropagation();

    if (props.currentStepIndex === 0) {
      return;
    }

    navigate(props.stepsArr[props.currentStepIndex - 1].path);
  }

  return (
    <div className='bar-stepper'>
      <button onClick={goBack} className='bar-stepper__goback-button'>
        <ChevronLeft />
      </button>
      <p className="bar-stepper__label">PASO {props.currentStepIndex + 1} DE {props.stepsArr.length}</p>
      <div className='bar-stepper__progress--wrapper'>
        <div className='bar-stepper__progress--current' style={{ width: (((props.currentStepIndex + 1) / props.stepsArr.length) * 100) + '%' }}></div>
      </div>
    </div>
  )
}

const Stepper = props => {
  const [screenMode, setScreenMode] = useState(null)

  useScreenBreakpoint (currentScreenMode => {
    setScreenMode(currentScreenMode);
  });

  switch (screenMode) {
    case ScreenModes.mobile: return <div className='stepper'><BarStepper {...props} /></div>;
    case ScreenModes.desktop: return <div className='stepper'><ListStepper {...props} /></div>;
    default: return null;
  }
}

Stepper.propTypes = {
  stepsArr: PropTypes.array.isRequired,
  currentStepIndex: PropTypes.number.isRequired
}

export default Stepper;