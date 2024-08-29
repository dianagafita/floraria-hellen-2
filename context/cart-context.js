"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartTotal: 0,
  cartCount: 0,
  toogleOpenCart: () => {},
  isCartOpen: false,
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toogleOpenCart() {
    setIsCartOpen((prev) => !prev);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error("Failed to parse cart JSON:", error);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const { deliveryCity, deliveryDate, deliveryInterval } = product.formData;
    const extras = product.extras;

    const existingCartItemIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.product.formData.deliveryCity === deliveryCity &&
        item.product.formData.deliveryDate === deliveryDate &&
        item.product.formData.deliveryInterval === deliveryInterval
    );

    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      let updatedExtras = [...existingCartItem.product.extras];

      if (extras.length > 0) {
        extras.forEach((extra) => {
          const existingExtraIndex = updatedExtras.findIndex(
            (existingExtra) => existingExtra.id === extra.id
          );

          if (existingExtraIndex !== -1) {
            updatedExtras[existingExtraIndex] = {
              ...updatedExtras[existingExtraIndex],
              quantity: updatedExtras[existingExtraIndex].quantity + 1,
            };
          } else {
            updatedExtras.push({ ...extra, quantity: 1 });
          }
        });
        const updatedCartItem = {
          ...existingCartItem,
          product: {
            ...existingCartItem.product,
            extras: updatedExtras,
          },
          quantity: existingCartItem.quantity + 1,
        };

        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
          product: {
            ...existingCartItem.product,
            extras: [],
          },
        };

        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
        setCartItems(updatedCartItems);
      }
    } else {
      const newProduct = {
        product,
        quantity: 1,
        ...(extras.length > 0
          ? { extras: extras.map((extra) => ({ ...extra, quantity: 1 })) }
          : {}),
      };

      setCartItems([...cartItems, newProduct]);
    }
  };

  const removeFromCart = (
    productId,
    formData = {},
    isExtra = false,
    extraId = null
  ) => {
    if (isExtra && extraId) {
      const updatedCartItems = cartItems.map((item) => {
        if (
          item.product.id === productId &&
          (!formData.deliveryCity ||
            item.product.formData?.deliveryCity === formData.deliveryCity) &&
          (!formData.deliveryDate ||
            item.product.formData?.deliveryDate === formData.deliveryDate) &&
          (!formData.deliveryInterval ||
            item.product.formData?.deliveryInterval ===
              formData.deliveryInterval)
        ) {
          const updatedExtras = item.product.extras.filter(
            (extra) => extra.id !== extraId
          );

          return {
            ...item,
            product: {
              ...item.product,
              extras: updatedExtras,
            },
          };
        }

        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.filter((item) => {
        return !(
          item.product.id === productId &&
          (!formData.deliveryCity ||
            item.product.formData?.deliveryCity === formData.deliveryCity) &&
          (!formData.deliveryDate ||
            item.product.formData?.deliveryDate === formData.deliveryDate) &&
          (!formData.deliveryInterval ||
            item.product.formData?.deliveryInterval ===
              formData.deliveryInterval)
        );
      });
      setCartItems(updatedCartItems);
    }
  };

  const updateCartItemQuantity = (
    productId,
    quantity,
    isExtra = false,
    extraId = null,
    formData = {}
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      const matchesProductAndFormData =
        item.product.id === productId &&
        (!formData.deliveryCity ||
          item.product.formData?.deliveryCity === formData.deliveryCity) &&
        (!formData.deliveryDate ||
          item.product.formData?.deliveryDate === formData.deliveryDate) &&
        (!formData.deliveryInterval ||
          item.product.formData?.deliveryInterval ===
            formData.deliveryInterval);

      if (isExtra && extraId) {
        if (matchesProductAndFormData) {
          const updatedExtras = item.product.extras.map((extra) => {
            if (extra.id === extraId) {
              return { ...extra, quantity };
            }
            return extra;
          });

          return {
            ...item,
            product: {
              ...item.product,
              extras: updatedExtras,
            },
          };
        }
      } else {
        if (matchesProductAndFormData) {
          return {
            ...item,
            quantity,
          };
        }
      }

      return item;
    });
    setCartItems(updatedCartItems);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    let itemTotal = item.product.price * item.quantity;
    if (item.product.extras && item.product.extras.length > 0) {
      item.product.extras.forEach((extra) => {
        itemTotal += extra.price * extra.quantity;
      });
    }
    return total + itemTotal;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => {
    let totalItemCount = item.quantity;
    if (item.product.extras && item.product.extras.length > 0) {
      item.product.extras.forEach((extra) => {
        totalItemCount += extra.quantity;
      });
    }
    return count + totalItemCount;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartCount,
        toogleOpenCart,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
