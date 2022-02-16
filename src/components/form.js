import PropTypes from 'prop-types';

/**
 * 
 * @param function validationFn Executed when the form is submitted. Receives as argument the values serialized as JSON of the form. It can be an asynchronous function.
 * @param function onError Executed when validationFn returns a object with false or string entries.
 * @param function onSuccess Executed when validationFn only returns a true entries.
 * @returns ReactElement
 */
const Form = ({validationFn, onError = () => {}, onSuccess, children}) => {

  const getFormJSON = formNode => {
    return Object.fromEntries(new FormData(formNode));
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = getFormJSON(e.target)

    const invalidFields = await validationFn(data);

    if (typeof invalidFields !== 'object' ||  invalidFields === null) {
      throw new Error('Invalid validationFn response, it must be a object using the schema: { "field_name_1": "Field error message or false if is a invalid field, set to true if is a valid field", ... }');
    }

    const invalidFieldValue = Object
      .values(invalidFields)
      .find(el => (typeof el === 'string' || el === false));

    if (typeof invalidFieldValue === 'undefined') {
      onSuccess(data)
    } else {
      onError(invalidFields, data)
    }

    return false;
  }

  return (<form onSubmit={handleSubmit}>
    { children }
  </form>)
}

Form.propTypes = {
  validationFn: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
}

const FormGroup = ({children, ...props}) => {
  return (<div className='form__group'>
    {children}
  </div>)
}

const FormInput = ({children, type = 'text', ...props}) => {

  return (
    <div className='form__input'>
      <input type={type} {...props} />
    </div>
  )
}

const FormSelect = ({children, ...props}) => {
  return (
    <div className='form__select'>
      <select {...props}>
        { children }
      </select>
    </div>)
}

const FormCheckbox = ({children, ...props}) => {
  return (
    <div className='form__checkbox'>
      <span className='form__checkbox--icon'>
        <input type="checkbox" {...props} />
      </span>
      {children}
    </div>
  )
}

const FormButton = ({children, type = 'button', ...props}) => {
  return (
    <button type={type} {...props}>
      { children }
    </button>
  )
}

Form.Group = FormGroup;
Form.Input = FormInput;
Form.Select = FormSelect;
Form.Checkbox = FormCheckbox;
Form.Button = FormButton;

export default Form;