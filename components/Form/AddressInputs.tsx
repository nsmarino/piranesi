import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const AddressInputs:React.FC = () => {
  const { register, errors } = useFormContext()

  return (
    <label>
      <ErrorMessage 
        as={<p style={{color: 'red', margin: '0'}}/>}
        errors={errors} 
        name="address1" 
      />
      Street address
      <input 
        type="text" 
        name="address1"
        ref={register({required: 'Street address line 1 is required.'})}
        placeholder="*Street and number, P.O. box, c/o"
      />
      <input 
        type="text" 
        name="address2"
        ref={register} 
        placeholder="Apartment, suite, unit, building, floor, etc." 
      />
    </label>
  )
}

export default AddressInputs