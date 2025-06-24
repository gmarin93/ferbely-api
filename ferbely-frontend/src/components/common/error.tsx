const Error = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Connection Error
        </h1>
        <p className="text-gray-600 mb-4">
          Unable to connect to the backend. Please make sure the Django server
          is running.
        </p>
        <p className="text-sm text-gray-500">
          Expected backend URL:{" "}
          {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v0"}
        </p>
      </div>
    </div>
  );
};

export default Error;
