
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
    <div className="shippingInfo">
      <header>
        <h3>Shipping Info</h3>
        <button className="edit" onClick={handleClick} disabled={loading}>Edit</button>
        </header>
      {      
        Object.entries(recipient).map(([key, value]) => <p key={key}>{value}</p>)
      }
    </div>
  )
}

export default ShippingInfo