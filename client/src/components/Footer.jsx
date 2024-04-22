import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ marginTop: '5rem' }}>
      <div className='bg-blue-100'>
        <div className='footer-content-container max-w-6xl mx-auto'>
          <div className='first-child-of-footer-content'>
            <h1 className='font-bold text-lg sm:text-xl'>
              <span className='text-blue-500'>Property</span>
              <span className='text-blue-700'>Pulse</span>
            </h1>
          </div>

          <div className='second-child-of-footer-content'>
            <div className='nested-row-of-footer'>
              <div className='col-of-footer-content'>
                <h6 className='text-blue-700 font-medium'>About</h6>
                <p className='text-blue-600'>Contact Us</p>
                <p className='text-blue-600'>FAQs</p>
              </div>
              <div className='col-of-footer-content'>
                <h6 className='text-blue-700 font-medium'>Follow Us</h6>
                <p className='text-blue-600' onClick={() => window.open('//www.linkedin.com/in/syed-moazzam', '_blank')}>Linkedin</p>
                <p className='text-blue-600' onClick={() => window.open('//www.github.com/Syed-Moazzam', '_blank')}>GitHub</p>
              </div>
              <div className='col-of-footer-content'>
                <h6 className='text-blue-700 font-medium'>Legal</h6>
                <p className='text-blue-600'>Privacy Policy</p>
                <p className='text-blue-600'>Terms Of Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-blue-200'>
        <div className='copyright-container max-w-6xl mx-auto'>
          <p className='text-blue-700 font-medium'>&copy; Copyright {currentYear} PropertyPulse. All Rights Reserved</p>
          <div className='social-links'>
            <Link className='text-blue-700' to={'//www.linkedin.com/in/syed-moazzam'} target={'_blank'}><FaLinkedin /></Link>
            <Link className='text-blue-700' to={'//www.github.com/Syed-Moazzam'} target={'_blank'}><FaGithub /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;