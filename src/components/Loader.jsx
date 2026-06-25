import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-10 w-10 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default Loader;
