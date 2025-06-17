import herobg from "../assets/medibot.jpg";
import { FaHeartbeat, FaUserMd, FaClock, FaSearch, FaPills, FaBookMedical } from "react-icons/fa";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Hero() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-start pt-12">
        <div className="relative w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <img
            src={herobg}
            alt="Health Companion Bot"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
              Your Personal Health Companion
            </h1>
            <p className="text-white text-base sm:text-lg max-w-xl mb-6">
              Get instant health advice and support anytime, anywhere. Our
              AI-powered chatbot is here to help you manage your health and
              well-being.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition">
              Start Chatting
            </button>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">How HealthBot Can Help You</h2>
        <p className="text-gray-600 mb-10">
          Our chatbot offers a range of features to support your health journey.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
            icon={<FaHeartbeat className="text-blue-500 text-3xl" />}
            title="Instant Health Advice"
            description="Get immediate answers to your health questions and concerns."
            />
            <FeatureCard
            icon={<FaUserMd className="text-blue-500 text-3xl" />}
            title="Personalized Wellness Plans"
            description="Receive tailored recommendations for diet, exercise, and mental well-being."
          />
          <FeatureCard
            icon={<FaClock className="text-blue-500 text-3xl" />}
            title="24/7 Availability"
            description="Access support whenever you need it, day or night."
          />
        </div>
      </section>

      {/* Section: Key Features */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <p className="text-gray-600 mb-10">
          Explore the core capabilities of our health chatbot.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<FaSearch className="text-blue-500 text-3xl" />}
            title="Symptom Checking"
            description="Quickly assess your symptoms and receive preliminary guidance."
          />
          <FeatureCard
            icon={<FaPills className="text-blue-500 text-3xl" />}
            title="Medication Reminders"
            description="Stay on track with your medications with timely reminders."
          />
          <FeatureCard
            icon={<FaBookMedical className="text-blue-500 text-3xl" />}
            title="Health Information Access"
            description="Access a wealth of reliable health information and resources."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of users who are already benefiting from HealthBot’s support.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition">
          Start Chatting
        </button>
      </section>
    </div>
    <Footer/>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
