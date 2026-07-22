export function multiplyValues(value1, value2) {
  const num1 = parseFloat(value1);
  const num2 = parseFloat(value2);

  console.log(num1, num2);
  if (isNaN(num1) || isNaN(num2)) {
    return 0;
  }

  const result = num1 * num2;

  return result;
}

export const calculateTotalPrice = (data) => {
  // Use reduce to sum up the subtotal for each item
  const total = data.reduce((acc, item) => {
    const subtotal = parseFloat(item.quantity) * parseFloat(item.item_price);
    return acc + subtotal;
  }, 0);

  // If the result is NaN, return 0
  return isNaN(total) ? 0 : total;
};

export const calculateTotalPricePPP = (data) => {
  // Use reduce to sum up the subtotal for each item
  const total = data.reduce((acc, item) => {
    const subtotal = parseFloat(item.volume) * parseFloat(item.item_price);
    return acc + subtotal;
  }, 0);

  // If the result is NaN, return 0
  return isNaN(total) ? 0 : total;
};
