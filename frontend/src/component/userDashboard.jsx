import { useState, useEffect, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import logo from "../swiftpay-wordmark.svg";

const User = () => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [dataQR, setDataQR] = useState("");
  const [scanner, setScanner] = useState(null);
  const [load, setLoad] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetch("https://swiftpay-2tot.onrender.com/dashboard", {
        method: "GET",

        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await data.json();
      console.log(token);
      setUser(response.user);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
    getTransaction();
  }, []);

  useEffect(() => {
    if (status || error) {
      const timer = setTimeout(() => {
        setStatus("");
        setError("");
      }, 5000); // hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [status, error]);

  const addFund = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const fund = await fetch("https://swiftpay-2tot.onrender.com/api/fund", {
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
    } finally {
      setLoading(false);
    }
  };

  const startScanner = () => {
    if (scanner) return; // prevent multiple instances

    const onScanSuccess = (decodedText, decodedResult) => {
      const parseData = JSON.parse(decodedText);
      setDataQR(parseData);
    };

    const onScanFailure = (error) => {
      console.warn("QR Scan error:", error);
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 150, height: 150 } },
      false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    setScanner(html5QrcodeScanner);
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.clear().then(() => {
        console.log("Scanner stopped");
        setScanner(null);
      });
    }
  };

  const qrResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const result = await fetch(
        "https://swiftpay-2tot.onrender.com/api/payment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merchantId: dataQR.merchantId,
            qrId: dataQR.qrId,
            amount: dataQR.amount,
          }),
        }
      );

      const response = await result.json();
      console.log(response);
      if (!result.ok) {
        setError(response.error);
        console.log(response.error);
      } else {
        setStatus(response.message);
        fetchData();
      }

      // console.log(response.message);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTransaction = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const transaction = await fetch(
        "https://swiftpay-2tot.onrender.com/details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await transaction.json();

      if (!transaction.ok) {
        setError(response.error);
      }

      setStatus(response.message);
      setData(response.sentTxs);
    } catch (err) {
      setError(err.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const transactions = Array.isArray(data)
    ? [...data]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {user ? (
        <div className="relative w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
          <button
            onClick={logOut}
            className="absolute top-4 right-4 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition active:scale-95"
          >
            Logout
          </button>

          {/* Welcome */}
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome,{" "}
              <span className="text-indigo-600 font-bold">{user.name}</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              This is your user dashboard
            </p>
            <p className="text-gray-400 text-xs">User ID: {user.id}</p>
          </div>

          {/* Balance */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-5 shadow-md flex justify-between items-center">
            <span className="text-base font-medium opacity-90">
              Your Balance
            </span>
            <span className="text-2xl font-extrabold tracking-wide">
              ₦{user.walletBalance?.toLocaleString()}
            </span>
          </div>

          {/* Add Fund Button */}
          <button
            onClick={() => setOpen(true)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition active:scale-95"
          >
            Add fund
          </button>

          {/* Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
                  placeholder="Enter amount"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={addFund}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition active:scale-95"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ClipLoader
                          color={color}
                          loading={load}
                          size={20}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                        <span className="ml-2">Funding...</span>
                      </>
                    ) : (
                      "Add Fund"
                    )}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QR Code Scanner */}
          <div className="p-4 border rounded-xl bg-gray-50 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              QR Code Scanner
            </h2>

            <div
              id="reader"
              className="w-full max-w-xs mx-auto border rounded-lg shadow-md bg-white"
              style={{ minHeight: "200px" }}
            ></div>

            <div className="mt-4 flex gap-2 justify-center">
              <button
                onClick={startScanner}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition active:scale-95"
              >
                Start
              </button>
              <button
                onClick={stopScanner}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition active:scale-95"
              >
                Stop
              </button>
            </div>
          </div>

          {/* QR Result */}
          {dataQR !== "" && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl shadow-sm space-y-3">
              {status ? (
                <p className="text-sm text-green-600 font-medium text-center">
                  {status}
                </p>
              ) : error ? (
                <p className="text-sm text-red-600 font-medium text-center">
                  {error}
                </p>
              ) : null}

              <h1 className="text-base font-semibold text-gray-800">
                Information
              </h1>
              <p className="text-sm text-gray-600">
                You are about to pay{" "}
                <span className="font-bold text-indigo-600">
                  ₦{dataQR.amount.toLocaleString()}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-800">
                  {dataQR.merchantName}
                </span>
                . Press pay to proceed.
              </p>
              <button
                onClick={qrResult}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition active:scale-95"
              >
                {loading ? (
                  <>
                    <ClipLoader
                      color={color}
                      loading={load}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    <p>Processing.....</p>
                  </>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          )}

          <div className="bg-white shadow-md rounded-xl p-4 mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Transactions
            </h4>
            {transactions.map((details, index) => (
              <div className="overflow-x-auto" key={details.id}>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-sm text-gray-600">
                      <th className="p-3 text-left font-medium">No</th>
                      <th className="p-3 text-left font-medium">Amount</th>
                      <th className="p-3 text-left font-medium">Receiver</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    <tr>
                      <td className="p-3 text-gray-600">{index + 1}</td>
                      <td className="p-3 font-semibold text-gray-800">
                        ₦{details.amount?.toLocaleString()}
                      </td>
                      <td className="p-3 text-gray-700">
                        {details?.merchant?.name}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            details?.status === "Success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {details?.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(details?.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={logo}
            alt="Loading..."
            className="w-32 h-32 animate-pulse"
          />
          <p className="text-gray-600 font-medium">Loading, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default User;
