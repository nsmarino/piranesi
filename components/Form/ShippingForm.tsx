import { useFormContext } from 'react-hook-form';
import Input from './Input'
import AddressInputs from './AddressInputs'
import Select from './Select';

const US_STATES = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

const ShippingForm:React.FC<{loading:boolean}> = ({ loading }) => {
  const { register } = useFormContext()
  return (
    <div>  
      <h3>shipping</h3>
      <Input 
        name={'name'} 
        label={'*First and last name'}
        register={register({required: `Name is required.`})}
      />
      
      <AddressInputs />

      <Input 
        name={'city'} 
        label={'*City'}
        register={register({required: `City is required.`})}      
      />

      <Input 
        name={'zip'} 
        label={'*Zip code'}
        register={register({required: `Zip code is required.`})}
      />

      <Select
        name={'state_code'}
        label={'*State (US only)'}
        register={register({required: `State is required.`})}
        options={US_STATES} 
      />
      
      <input 
        name="country_code" 
        ref={register} 
        defaultValue="US" 
        readOnly 
      />

      <Input 
        name={'email'} 
        label={'Email for shipping notifications'}
        register={register}
      />

      <button
          type="submit"
        >{loading ? 'LOADING' : 'Calculate shipping fees'}</button>
    </div>
  )
}

export default ShippingForm