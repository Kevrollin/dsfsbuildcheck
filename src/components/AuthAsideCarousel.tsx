import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Welcome to DSFS!",
    message: "Empowering students and donors through decentralized funding.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" // campus/education
  },
  {
    title: "For Students",
    message: "Create your profile, connect your Stellar wallet, and unlock new opportunities.",
    img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80" // students
  },
  {
    title: "For Donors",
    message: "Support students directly and transparently with blockchain technology.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" // giving/donors
  },
  {
    title: "Secure & Transparent",
    message: "All transactions are secured on the Stellar blockchain.",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80" // security/tech
  }
];

const AuthAsideCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-indigo-700 text-white overflow-hidden">
      <img
        src={slide.img}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
        <p className="text-lg mb-8 drop-shadow-lg">{slide.message}</p>
        <div className="flex gap-2 justify-center mt-4">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-indigo-900/40" style={{ zIndex: 1 }} />
    </div>
  );
};

export default AuthAsideCarousel; 