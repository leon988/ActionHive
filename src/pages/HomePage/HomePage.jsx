import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome to our Volunteer Connection Platform!</h1>
        <p>Find meaningful volunteer opportunities in your community.</p>
        <Link to="/about" className="cta-button">
          Learn More
        </Link>
      </header>

      <section>
        <h2>Discover Opportunities</h2>
        <p>Explore a wide range of volunteer opportunities.</p>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>Find, apply, and contribute to volunteer projects easily.</p>
      </section>
    </div>
  );
}
