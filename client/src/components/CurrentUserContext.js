import { createContext, useState, useEffect } from "react";
const _id = "user1";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [refetch, setRefetch] = useState(false);
  const [cartItemsSubtotal, setCartItemsSubtotal] = useState(0); // Summary subtotal

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  // Automatically logs in dummy User1
  useEffect(() => {
    fetch(`/user/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;
        let dataSubTotal = 0;

        if (data) {
          setUser(data);
          setStatus("idle");
        }

        // Set the subTotal of the cartItems
        if (data?.cartItems) {
          data.cartItems.forEach((item) => {
            dataSubTotal += Math.round(item.price * 100 * item.quantity) / 100;
          });
          setCartItemsSubtotal(dataSubTotal);
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [refetch]);

  return (
    <CurrentUserContext.Provider
      value={{ user, cartItemsSubtotal, status, setStatus, handleRefetch }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
