export const generateOrderLines = () => {
  const orderLineSelectOptions = [];
  for (let i = 1; i <= 14; i++) {
    let obj = {
      value: `${i}`,
      label: `Order Line ${i}`,
    };
    orderLineSelectOptions.push(obj);
  }
  return orderLineSelectOptions;
};
