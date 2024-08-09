import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PaymentSuccess = ({user}) => {
    const params = useParams();
  return (
    <div className='flex items-center justify-center h-[75vh] bg-gray-50'>
        {user &&(
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-80">
          <h2 className="text-2xl text-cyan-700 mb-4">Payment successful</h2>
          <p className="text-lg text-cyan-700 mb-5">
            Your course subscription has been activated
          </p>
          <p className="text-lg text-cyan-700 mb-5">
            Reference no - {params.id}
          </p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>  
        )}
    </div>
  )
}

export default PaymentSuccess