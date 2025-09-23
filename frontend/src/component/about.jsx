export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white text-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          About <span className="text-indigo-600">SwiftPay</span>
        </h2>

        {/* Intro */}
        <p className="text-lg text-gray-600 text-center mb-10">
          SwiftPay is your trusted digital payment solution, designed to make
          transactions{" "}
          <span className="font-semibold text-indigo-600">fast</span>,{" "}
          <span className="font-semibold text-indigo-600">secure</span>, and{" "}
          <span className="font-semibold text-indigo-600">seamless</span>.
          Whether you’re sending money, receiving payments, or making purchases,
          SwiftPay empowers you to manage your finances with ease.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Secure Transactions
            </h3>
            <p className="text-gray-600 text-sm">
              Your safety is our priority. All payments are encrypted and
              protected with industry-leading security.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Instant Payments
            </h3>
            <p className="text-gray-600 text-sm">
              Send and receive money in seconds with our lightning-fast
              technology, anytime and anywhere.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600 text-sm">
              Join thousands of users who trust SwiftPay for everyday payments
              and business transactions.
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Our Mission
          </h4>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At SwiftPay, our mission is simple: to create a world where money
            moves freely and effortlessly. We believe in empowering individuals
            and businesses with tools that make financial management stress-free
            and reliable.
          </p>
        </div>
      </div>
    </section>
  );
}
