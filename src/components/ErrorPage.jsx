// ErrorPage.jsx
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-300">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404 Not Found</h1>
      <p className="mb-6">Oops! The page you are looking for does not exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
