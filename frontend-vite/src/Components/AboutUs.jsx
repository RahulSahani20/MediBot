import React from "react";
import Footer from "./Footer";


const AboutUs = () => {
  return (
    <>
    <div className="bg-white py-10 px-6 mb-70 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-700 mb-6">
          🤖 About MediBot
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          {/* <img
            src="/assets/medibot.jpg"
            alt="MediBot Illustration"
            className="w-full md:w-1/2 rounded-xl shadow-lg"
          /> */}

          {/* Text content */}
            <div className="md:w-1/2 mx-auto text-gray-700 space-y-4 text-lg py-5 text-center">
              <p>
                <strong>MediBot</strong> is an AI-powered virtual healthcare assistant designed to
                provide quick, reliable, and accessible medical guidance to everyone.
              </p>
              <p>
                Whether you're facing a minor injury, unsure about symptoms, or just seeking
                health-related advice, MediBot is here to help you 24/7.
              </p>
              <p>
                Our goal is to empower users with safe, first-level medical support, especially in
                emergencies or when professional help isn't immediately available.
              </p>
            </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-base">
          <p>
            <strong>Disclaimer:</strong> MediBot is not a substitute for professional medical
            advice. Always consult a doctor for serious health concerns.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
