import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  return (
    <div className="flex items-center justify-center h-[75vh] bg-gradient-to-b from-slate-50 to-teal-100">
      {user && (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl text-cyan-700 mb-4">Payment Successful</h2>
          <p className="text-lg text-gray-800 mb-5">
            Your course subscription has been activated!
          </p>
          <p className="text-lg text-gray-800 mb-5">
            Reference no: <span className="font-semibold">{params.id}</span>
          </p>
          <Link
            to={`/${user._id}/dashboard`}
            className="common-btn py-3 px-6 bg-cyan-700 text-white rounded-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
