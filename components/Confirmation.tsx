import Layout from "./Layout"

const Confirmation = ({ confirmation }) => {
  return (
    <Layout title='Order Confirmation'>
      <h2>Congratulations, your order is on its way.</h2>
      <h3>Order details:</h3>
      <p>Confirmation ID: {confirmation.info}</p>
    </Layout>
  )
}

export default Confirmation