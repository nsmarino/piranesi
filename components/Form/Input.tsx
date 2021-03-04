import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Input = ({name, label, register}) => {
  const { errors } = useFormContext()
  return (
    <>
    <ErrorMessage 
      as={<p style={{color: 'red', margin: '0'}}/>}
      errors={errors} 
      name={name} 
    />
    <label style={{display:'block'}}>
    {label}
    <input 
      type="text"
      name={name}
      ref={register}
    />
    </label>
    </>
  )
}

export default Input