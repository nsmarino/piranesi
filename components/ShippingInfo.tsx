
interface iShippingInfo {
  recipient:iRecipient, 
  setReadyForCheckout: React.Dispatch<React.SetStateAction<boolean>>
}

const ShippingInfo:React.FC<iShippingInfo> = ({
  recipient, 
  setReadyForCheckout
}) => {

  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault()
    setReadyForCheckout(false)
  }

  return (
    <div>
      <h3>Shipping Info!</h3>
      {      
        Object.entries(recipient).map(([key, value]) => <p key={key}>{value}</p>)
      }
      <button onClick={handleClick}>Edit</button>
    </div>
  )
}

export default ShippingInfo