import Button from "@/components/util/button";

export default function ExtraItemModal({ item, onClose, onAdd }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="m-10 bg-white p-10 rounded-sm ">
        <h2
          className="text-xl md:text-2xl xl:text-3xl font-bold"
          translate="no"
        >
          {item.name}
        </h2>
        <img src={item.image} alt={item.name} className="h-40 my-3" />
        <p className="md:text-lg xl:text-2xl">{item.description}</p>
        <p className="md:text-lg xl:text-xl my-2">
          Produsul se poate comanda doar impreuna cu un buchet de flori sau un
          aranajment!
        </p>
        <p className="font-bold text-end text-base md:text-lg xl:text-2xl  my-5">
          {item.price} lei
        </p>
        <div className="flex space-x-3 mt-10 mb-5 justify-between">
          <Button
            moreStyle="px-6 md:text-lg xl:text-2xl"
            onClick={() => onAdd(item)}
          >
            Adauga
          </Button>
          <Button moreStyle="px-6 md:text-lg xl:text-2xl" onClick={onClose}>
            Inchide
          </Button>
        </div>
      </div>
    </div>
  );
}
