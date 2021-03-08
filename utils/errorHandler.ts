const errorHandler = (err, res) => {
  console.log('handler is being triggered', err)
  if (err.response) {
    res.status(400).json({ error: err.response.data.error})
  } else if (err.request) {
    res.status(500).json({ error: err.response.data.error})
  } else if (err.raw) {
    res.status(500).json({ error: {reason: err.type, message: err.raw.message}})
  } else res.status(500).json({error: {reason: 'Unknown Error', message: 'An unknown error has occurred. Please contact the developer for assistance.'}})
}

export default errorHandler