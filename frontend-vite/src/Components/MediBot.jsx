import herobg from "../assets/medibot.jpg";

export default function MediBot() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-12">
      <div className="relative w-full max-w-7xl rounded-xl overflow-hidden shadow-lg">
        <img
          src={herobg}
          alt="Health Companion Bot"
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">
            Your Personal Health Companion
          </h1>
          <p className="text-white text-sm sm:text-base max-w-xl mb-6">
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
  );
}
