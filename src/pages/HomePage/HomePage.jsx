import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-neutral min-h-screen text-dark">
      <header className="text-center p-8">
        <h1 className="text-5xl font-bold text-primary mb-6 mt-12">Welcome to Action Hive 🐝</h1>
        <p className="text-dark-grey text-xl mb-8">Find meaningful volunteer opportunities in your community.</p>
        <Link to="/about" className="bg-accent hover:bg-primary text-white font-medium py-2 px-4 rounded-lg transition duration-300">
          Learn More
        </Link>

        {/* <img src="https://imgur.com/gallery/d2C8U7U" alt="Volunteer Work" className="mt-8 max-w-full h-auto"/> */}
      </header>

      <section className="py-8 px-4">
        <h2 className="text-2xl text-primary mb-3">Discover Opportunities</h2>
        <p className="text-dark-grey text-xl">Explore a wide range of volunteer opportunities.</p>
      </section>

      <section className="py-8 px-4">
        <h2 className="text-2xl text-primary mb-3">How It Works</h2>
        <p className="text-dark-grey text-xl">Find, apply, and contribute to volunteer projects easily.</p>
      </section>
    </div>
  );
}