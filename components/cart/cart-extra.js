const CartExtra = ({ extraInfo }) => {
  const extraData = extraInfo.product.formData;
  return (
    <div className="text-sm font-[100]">
      <div>Orasul livrarii: {extraData.deliveryCity}</div>
      <div>Data livrarii: {extraData.deliveryDate}</div>
      <div>Intervalul livrarii: {extraData.deliveryInterval}</div>
      <div>Mesaj felicitare: {extraData.deliveryMessage}</div>
      <div>Livrare anonima: {extraData.deliveryType ? "Da" : "Nu"}</div>
    </div>
  );
};

export default CartExtra;
