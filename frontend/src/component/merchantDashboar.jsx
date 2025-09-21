import { useState, useEffect } from "react";

const Merchant = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetch("http://localhost:3000/dashboard", {
          method: "GET",

          headers: { Authorization: `Bearer ${token}` },
        });
        const response = await data.json();

        setUser(response.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <p>This is the Merchant Dashboard, welcome {user.name}</p>
      <p> your balance is {user.walletBalance}</p>
    </div>
  );
};

export default Merchant;
