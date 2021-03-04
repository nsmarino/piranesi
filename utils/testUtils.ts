const average = (array:number[]) => {
  const reducer = (sum:number, item:number) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

export default average