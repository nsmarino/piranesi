import cms from '../../../../datasources/cms/cms'

const getRetailTotal = (itemsInOrder) => {
  
  const retailPrices = itemsInOrder
    .map(item => {
      const product = cms.find(product=>product.id===item.id)
      const price = product.price * item.quantity
      return price
    })
    
  const totalReducer = (total:number, nextPrice:number) => total + nextPrice
  
  const retailTotal:number = retailPrices.reduce(totalReducer) 
  
  return retailTotal
}

export default getRetailTotal