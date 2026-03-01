import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <Link to="/client-onboarding/signup"><button className='bg-blue-600 rounded-lg p-2 text-white ml-5'>Client Signup</button></Link>
        <Link to="/auth/signin"><button className='bg-blue-600 rounded-lg p-2 text-white ml-5'>General Login</button></Link>
        <Link to="/auth/admin-onboarding"><button className='bg-blue-600 rounded-lg p-2 text-white ml-5'>Business Signup</button></Link> 

    </div>
  )
}

export default LandingPage