
interface iShippingInfo {
  recipient:iRecipient
  loading: boolean 
  setReadyForCheckout: React.Dispatch<React.SetStateAction<boolean>>
}

const ShippingInfo:React.FC<iShippingInfo> = ({
  recipient, 
  loading,
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
      <button onClick={handleClick} disabled={loading}>Edit</button>
    </div>
  )
}

export default ShippingInfo