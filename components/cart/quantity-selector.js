import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function QuantitySelector({
  initialQuantity = 1,
  onQuantityChange,
  size,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="flex items-center space-x-2 border border-gray-300 rounded-sm font-[100] px-1 text-sm">
      <button
        onClick={handleDecrement}
        className="p-1 "
        aria-label="Decrease quantity"
      >
        <Minus size={size} strokeWidth={1} />
      </button>
      <span className="text-m">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="p-1 "
        aria-label="Increase quantity"
      >
        <Plus size={size} strokeWidth={1} />
      </button>
    </div>
  );
}
