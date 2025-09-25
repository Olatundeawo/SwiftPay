import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Merchant = () => {
  const [user, setUser] = useState("");
  const [code, setCode] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [QRImages, setQRImages] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetch(
          "https://swiftpay-2tot.onrender.com/dashboard",
          {
            method: "GET",

            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const response = await data.json();

        setUser(response.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    getTransaction();
  }, []);

  const generateQR = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const qrCode = await fetch(
        "https://swiftpay-2tot.onrender.com/dashboard/qr",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Number(amount) }),
        }
      );
      const response = await qrCode.json();

      console.log("This is first request", qrCode);
      console.log("This is with json", response);
      console.log(amount);
      if (!qrCode.ok) {
        setError(response.error);
        setAmount("");
      }
      setImage(response.qrcode);
      setAmount("");
    } catch (err) {
      setError(err.error);
    } finally {
      setLoading(false);
    }
  };

  const getAllQR = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const allQR = await fetch(
        "https://swiftpay-2tot.onrender.com/dashboard/qr",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await allQR.json();
      console.log(token);
      if (!allQR.ok) {
        setError(response.error);
      }
      console.log(response);
      setQRImages(response.qrcode);
    } catch (err) {
      setError(err);
    }
  };

  const getTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const transaction = await fetch(
        "https://swiftpay-2tot.onrender.com/transaction/details",
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

      setData(response.receiveTxs);
    } catch (err) {
      setError(err.message);
    }
  };

  const transactions = Array.isArray(data)
    ? [...data]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    : [];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6 md:p-10">
      {/* Welcome + Balance */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* User Info */}
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              Welcome <span className="text-indigo-600">{user?.name}</span>
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Your Balance:
              <span className="ml-2 text-3xl font-extrabold text-green-600">
                ₦{user?.walletBalance?.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Merchant Id: {user?.id}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              onClick={() => setCode(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition w-full sm:w-auto font-medium"
            >
              Generate New QR Code
            </button>
            <button
              onClick={getAllQR}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition w-full sm:w-auto font-medium"
            >
              Get all QR Codes
            </button>
            <button
              onClick={logout}
              className="px-6 py-3 bg-red-50 text-red-600 rounded-xl shadow hover:bg-red-100 transition w-full sm:w-auto font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Generation */}
      {code && (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 mb-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Generate a QR Code
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
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
                  setError("Please enter a valid digit");
                }
              }}
              placeholder="Enter Amount in ₦"
              className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
            <button
              type="submit"
              onClick={generateQR}
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition w-full md:w-auto font-medium"
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
                  <span className="ml-2">Generating...</span>
                </>
              ) : (
                "Generate QR Code"
              )}
            </button>
          </div>

          {image && (
            <div className="flex flex-col items-center mt-6">
              <img
                src={image}
                alt="Generated QR"
                className="w-44 h-44 rounded-lg border shadow-sm"
              />
              <a
                href={image}
                download={`qrcode_${amount}.png`}
                className="mt-3 px-6 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition font-medium"
              >
                Download QR Code
              </a>
            </div>
          )}
        </div>
      )}

      {/* QR Code List */}
      {QRImages && (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Generated QR Codes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...QRImages].reverse().map((images) => (
              <div
                key={images.id}
                className="bg-gray-50 rounded-xl p-4 shadow hover:shadow-md transition flex flex-col items-center border border-gray-200"
              >
                <img
                  src={images.qrConvert}
                  alt="QR"
                  className="w-32 h-32 mb-3 rounded-md border shadow-sm"
                />
                <p className="text-gray-700 font-medium">
                  Amount: ₦{images.amount.toLocaleString()}
                </p>
                <p
                  className={`mt-1 font-semibold ${
                    images.status === "USED" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Status: {images.status}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(images.createdAt).toLocaleString()}
                </p>
                <a
                  href={images.qrConvert}
                  download={`qrcode_${images.amount}.png`}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition font-medium"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => setQRImages("")}
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition font-medium"
          >
            Clear
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
                  <th className="p-3 text-left font-medium">Sender</th>
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
                  <td className="p-3 text-gray-700">{details?.user?.name}</td>
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
  );
};

export default Merchant;
