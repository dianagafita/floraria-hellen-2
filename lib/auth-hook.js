import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "./CartContext";

const useAuthSync = () => {
  const router = useRouter();
  const { syncCartWithServer } = useCart();

  useEffect(() => {
    const verifyAndSync = async () => {
      try {
        const response = await verifyAuth(); // Assuming this makes a server-side request
        if (response.isAuthenticated) {
          await syncCartWithServer();
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Authentication verification failed", error);
      }
    };

    verifyAndSync();
  }, [router, syncCartWithServer]);
};

export default useAuthSync;
