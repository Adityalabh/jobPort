import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-7">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h5 className="text-lg font-bold">JobPort</h5>
          <p>&copy; 2024 JobPort. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-gray-400 hover:underline">About</a>
          <a href="/" className="hover:text-gray-400 hover:underline">Services</a>
          <a href="/" className="hover:text-gray-400 hover:underline">Contact</a>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-facebook  text-2xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-x-twitter text-2xl"></i>          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-instagram text-2xl"></i>          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
