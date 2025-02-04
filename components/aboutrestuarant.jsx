import React from "react";
import { Clock, MapPin, Phone } from "lucide-react";

const AboutSection = ({ description, openingHour, closingHour,location, phone }) => {
  return (
    <section id="about" className="py-12 bg-gray-100">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">About Us</h2>
        <div className="max-w-4xl mx-auto">
          <p className="mb-8 text-lg text-center text-gray-700">{description}</p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <Clock className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <h3 className="font-semibold">Opening Hours</h3>
                <p className="text-sm text-gray-600">{openingHour}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <Clock className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <h3 className="font-semibold">Closing Hours</h3>
                <p className="text-sm text-gray-600">{closingHour}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <MapPin className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm text-gray-600">{location}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <Phone className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <h3 className="font-semibold">Contact</h3>
                <p className="text-sm text-gray-600">{phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
