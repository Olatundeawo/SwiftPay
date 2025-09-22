import { useState, useEffect } from "react";

const User = () => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetch("http://localhost:3000/dashboard", {
        method: "GET",

        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await data.json();

      console.log("Token", token);
      setUser(response.user);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addFund = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const fund = await fetch("http://localhost:3000/api/fund", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });
      const response = await fund.json();
      if (!fund.ok) {
        console.log(response.error);
      }
      setAmount("");
      setOpen(false);
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {user ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome, <span className="text-indigo-600">{user.name}</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              This is your user dashboard
            </p>
          </div>

          {/* Balance */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex justify-between items-center">
            <span className="text-gray-700 font-medium">Your Balance</span>
            <span className="text-2xl font-bold text-indigo-600">
              ₦{user.walletBalance}
            </span>
          </div>

          {/* Add Fund Button */}
          <button
            onClick={() => setOpen(true)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Add Fund
          </button>

          {/* Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Enter the amount to add
                </h2>
                <input
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    let va = parseFloat(e.target.value);
                    if (Number.isInteger(va)) {
                      setAmount(va);
                    } else {
                      setAmount("");
                    }
                  }}
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter amount"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={addFund}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Id */}
          <p className="text-gray-500 text-sm">User ID: {user.id}</p>
        </div>
      ) : (
        <p className="text-red-500 font-medium">
          You are not authorized to visit this page.
        </p>
      )}
    </div>
  );
};

export default User;
