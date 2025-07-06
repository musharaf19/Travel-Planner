import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className='mt-16 mb-10'>
      <h2 className="font-mono text-xl text-gray-600 dark:text-gray-300 text-center">
        Created By Musharaf Aejaz
      </h2>
      
      <div className='flex justify-center gap-10 mt-10'>
        <a href='https://www.instagram.com/musharaff.__' target='_blank' rel='noopener noreferrer'>
          <FaInstagram className='h-10 w-10 hover:text-pink-600 transition-colors duration-300' />
        </a>
        <a href='https://www.facebook.com/musharaf.aejaz.91' target='_blank' rel='noopener noreferrer'>
          <FaFacebook className='h-10 w-10 hover:text-blue-600 transition-colors duration-300' />
        </a>
        <a href='https://www.twitter.com/musharaf__aejaz' target='_blank' rel='noopener noreferrer'>
          <FaTwitter className='h-10 w-10 hover:text-sky-500 transition-colors duration-300' />
        </a>
      </div>
    </div>
  )
}

export default Footer
