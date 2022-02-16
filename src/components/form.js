import PropTypes from 'prop-types';
import {
  useState,
  useRef
} from 'react'

import {ReactComponent as CheckIcon} from '../assets/ic_check.svg'
import {ReactComponent as ChevronIcon} from '../assets/ic_chevron.svg'

/**
 * 
 * @param function validationFn Executed when the form is submitted. Receives as argument the values serialized as JSON of the form. It can be an asynchronous function.
 * @param function onError Executed when validationFn returns a object with false.
 * @param function onSuccess Executed when validationFn only returns a true entries.
 * @returns ReactElement
 */
const Form = ({validationFn, onError = () => {}, onSuccess, children}) => {

  const formNode = useRef(null);

  const getFormJSON = () => {
    return Object.fromEntries(new FormData(formNode.current));
  }

  const resetInputErrors = () => {
    const controls = formNode.current.querySelectorAll('.form__control');
    [...controls].forEach(control => {
      control.classList.remove('form__error');
    });
  }

  const setInputError = inputName => {
    formNode.current.querySelector(`[data-inputname=${inputName}]`).classList.add('form__error');
  }

  const markErrorOnFields = fieldsValidity => {
    Object.keys(fieldsValidity).forEach(field => {
      if (fieldsValidity[field] === false) {
        setInputError(field);
      }
    })
  }

  const isInvalidForm = responseValidationFn => {
    const invalidField = Object
      .values(responseValidationFn)
      .find(el => el === false);

    return typeof invalidField === 'undefined';
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (formNode.current === null) { return; }

    resetInputErrors();

    const data = getFormJSON()

    const invalidFields = await validationFn(data);

    if (typeof invalidFields !== 'object' ||  invalidFields === null) {
      throw new Error('Invalid validationFn response, it must be a object using the schema: { "field_name_1": "FALSE if is a invalid field, TRUE otherwise", ... }');
    }

    if (isInvalidForm(invalidFields)) {
      onSuccess(data);
    } else {
      markErrorOnFields(invalidFields);
      onError(invalidFields, data)
    }

    return false;
  }

  return (<form ref={formNode} className='form' onSubmit={handleSubmit}>
    { children }
  </form>)
}

Form.propTypes = {
  validationFn: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
}

const FormGroup = ({children}) => {
  return (<div className='form__group'>
    {children}
  </div>)
}

const FormInput = ({children, type = 'text', className, ...props}) => {

  return (
    <div data-inputname={props.name} className={'form__control form__input' + (className ? ' ' + className : '')}>
      <input type={type} {...props} />
    </div>
  )
}

const FormSelect = ({children, className, ...props}) => {
  return (
    <label data-inputname={props.name} className={'form__control form__select' + (className ? ' ' + className : '')}>
      <select {...props}>
        { children }
      </select>
      <ChevronIcon />
    </label>)
}

const FormCheckbox = ({children, className, name, ...props}) => {

  const [value, setValue] = useState('off');

  const toggleValue = e => {
    e.preventDefault();
    e.stopPropagation();

    if (value === 'off') {
      setValue('on');
    } else {
      setValue('off');
    }
  }

  return (
    <div data-inputname={name} className={'form__control form__checkbox' + (className ? ' ' + className : '')}>
      <label className='form__checkbox-icon'>
        <input type="hidden" value={value} name={name} />
        <button onClick={toggleValue} {...props} className={"form__checkbox-icon--icon"  + (value === 'on' ? ' checked' : '')}>
          <CheckIcon />
        </button>
      </label>
      <div className='form__checkbox-content'>
        {children}
      </div>
    </div>
  )
}

const FormButton = ({children, className, loading = false, type = 'button', ...props}) => {
  return (
    <button className={'form__button' + (className ? ' ' + className : '')} type={type} {...props}>
      {!loading && <span>{ children }</span>}
      {loading && <span className='form__button-loading-icon'></span>}
    </button>
  )
}

FormButton.propTypes = {
  loading: PropTypes.bool,
}

Form.Group = FormGroup;
Form.Input = FormInput;
Form.Select = FormSelect;
Form.Checkbox = FormCheckbox;
Form.Button = FormButton;

export default Form;