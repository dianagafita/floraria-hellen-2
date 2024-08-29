import Button from "@/components/util/button";

export default function ExtraItemModal({ item, onClose, onAdd }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="m-10 bg-white p-5 rounded-sm ">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <img src={item.image} alt={item.name} className="w-40 h-40 my-3" />
        <p>{item.description}</p>
        <p>
          Produsul se poate comanda doar impreuna cu un buchet de flori sau un
          aranajment!
        </p>
        <p className="font-bold my-2">{item.price} lei</p>
        <div className="flex space-x-3 mt-5">
          <Button onClick={() => onAdd(item)}>Add to Cart</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
