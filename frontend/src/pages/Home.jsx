import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')"
      }}
    >

      {/* Dark Grey Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-4xl text-center text-white">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          📦 Warehouse Management System
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
          Simplify inventory tracking, manage warehouses efficiently, and
          optimize logistics with a smart and modern platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">

          <button
            onClick={() => navigate("/product")}
            className="bg-gray-200 text-gray-900 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-white hover:scale-105 transition duration-300"
          >
            🛒 Explore Products
          </button>

          <button
            onClick={() => navigate("/about")}
            className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-white hover:text-gray-900 transition duration-300"
          >
            📖 Learn More
          </button>

        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

          <div className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition">
            <h3 className="font-bold text-lg">📦 Smart Inventory</h3>
            <p className="text-sm text-gray-300 mt-1">
              Real-time stock monitoring
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition">
            <h3 className="font-bold text-lg">⚡ Fast Orders</h3>
            <p className="text-sm text-gray-300 mt-1">
              Quick and smooth booking
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition">
            <h3 className="font-bold text-lg">🌍 Smart Location</h3>
            <p className="text-sm text-gray-300 mt-1">
              Auto warehouse selection
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;