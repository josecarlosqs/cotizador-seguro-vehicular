import PropTypes from 'prop-types';

import {
  useScreenBreakpoint,
  ScreenModes
} from '../hooks'

import {
  useState
} from 'react'

import { ReactComponent as ChevronLeft } from '../assets/ic-chevron-left.svg'

function ListStepper (props) {
  return (
    <div className='list-stepper'>
    </div>)
}

function BarStepper (props) {
  return (
    <div className='bar-stepper'>
      <button className='bar-stepper__goback-button'>
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