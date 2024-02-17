export const worker = () => {
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener("message", (e) => {
    const orderLine = e.data[0];
    const quantity = e.data[1];
    const getData = async () => {
      try {
        const req = await fetch(
          `https://minizuba-fn.azurewebsites.net/api/orderlines?type_id=${orderLine}${
            quantity ? `&quantity=${quantity}` : ""
          }`
        );
        const res = await req.json();
        postMessage(res);
      } catch (err) {
        console.log(err);
        postMessage(err.message);
      }
    };
    getData();
  });
};
