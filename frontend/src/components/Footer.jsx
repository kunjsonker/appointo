import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            {/* Left Section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Connecting patients with top-rated healthcare professionals through seamless scheduling. Experience trusted medical care at your fingertips. Your health is our priority, ensuring secure, reliable, and effortless doctor appointments every day.</p>
            </div>

            {/* Center Section */}
            <div>
                <p className='text-xl font-medium mb-5'>
                    Company
                </p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/* Right Section */}
            <div>
                <p className='text-xl font-medium mb-5'>
                    Get in Touch
                </p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>999999999</li>
                    <li>hello@hello.com</li>
                </ul>
            </div>


        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>© 2025 Appointo. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer