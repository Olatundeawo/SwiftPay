function Notfound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-gray-600 mb-6">
          Hmm...this page doesn’t exist. Try searching for something else.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default Notfound;
