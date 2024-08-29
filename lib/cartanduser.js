import { useEffect } from "react";
import { useSession } from "lucia"; // assuming you use Lucia for auth
import { useCart } from "./CartContext";
import axios from "axios";

const useSyncCartWithServer = () => {
  const { session } = useSession();
  const { cart, setCart } = useCart();

  useEffect(() => {
    if (session) {
      // Fetch cart from server when user is authenticated
      const fetchCart = async () => {
        try {
          const response = await axios.get("/api/cart");
          setCart(response.data);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      };

      fetchCart();
    }
  }, [session, setCart]);

  useEffect(() => {
    if (session) {
      // Sync cart with server when it changes
      const syncCart = async () => {
        try {
          await axios.post("/api/cart", { cart });
        } catch (error) {
          console.error("Failed to sync cart", error);
        }
      };

      syncCart();
    }
  }, [cart, session]);
};

export default useSyncCartWithServer;
