interface iErrorComponent {
  error: iError
  setError: React.Dispatch<React.SetStateAction<iError>>
}

const Error:React.FC<iErrorComponent> = ({error, setError}) => {
  console.log(error)
  return (
    <div style={{background: 'red'}}>
      <h2>ERROR</h2>
      <h3>{error.reason}</h3>
      <p>{error.message}</p>
      <button onClick={() => setError(null)}>CLEAR</button>
    </div>
  )
}

export default Error