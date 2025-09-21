import { useState, useEffect } from "react";

const User = () => {
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
      {user ? (
        <diV>
          <p>This is the User Dashboard, welcome {user.name}</p>;
          <p> your balance is {user.walletBalance}</p>
        </diV>
      ) : (
        <p>You are not Authorization to visit this page.</p>
      )}
    </div>
  );
};

export default User;
