import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone 
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 text-white bg-orange-900">
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-4">
        {/* Company Info */}
        <div>
          <h3 className="mb-4 text-2xl font-bold">Afrochow</h3>
          <p className="text-sm text-orange-200">
            Celebrating African cuisine and connecting food lovers across the globe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Restaurants", path: "/restaurants" },
              { name: "Menu", path: "/menu" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" }
            ].map((link) => (
              <li key={link.name}>
                <a 
                  href={link.path} 
                  className="text-orange-200 transition-colors hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-4 font-semibold">Contact Us</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaEnvelope />
              <span>support@afrochow.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone />
              <span>+1-123-456-7890</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="mb-4 font-semibold">Follow Us</h4>
          <div className="flex space-x-4">
            {[
              { Icon: FaFacebook, link: "https://facebook.com/afrochow" },
              { Icon: FaTwitter, link: "https://twitter.com/afrochow" },
              { Icon: FaInstagram, link: "https://instagram.com/afrochow" },
              { Icon: FaLinkedin, link: "https://linkedin.com/company/afrochow" }
            ].map(({ Icon, link }) => (
              <a 
                key={link} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-orange-200 transition-colors hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 mt-8 text-center border-t border-orange-700">
        <p className="text-sm text-orange-200">
          © {currentYear} Afrochow. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;