import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-neutral min-h-screen text-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">About Us 🌟</h1>
        <p className="text-xl mb-6">
          Welcome to our Volunteer Connection Platform, where every handshake makes a difference and every smile counts! 🤝😊
        </p>
        <p className="text-xl mb-6">
          Born out of a desire to bridge gaps in our community, our platform serves as a bustling hub for volunteers eager to lend their time and skills to causes that matter. From tree planting to tutoring, we've got something for everyone. 🌳📚
        </p>
        <h2 className="text-3xl font-bold text-secondary mb-4">Why Join Us?</h2>
        <ul className="list-disc list-inside text-xl mb-6">
          <li>Access to a wide range of volunteering opportunities.</li>
          <li>Network with like-minded changemakers.</li>
          <li>Develop new skills and grow personally and professionally.</li>
          <li>Experience the joy and fulfillment of making a real difference.</li>
        </ul>
        <p className="text-xl mb-6">
          So, if you're ready to roll up your sleeves and dive into new adventures, our platform is just the right place to start. Sign up today, and let's make the world a better place, one volunteer project at a time! 💪🌍
        </p>
      </div>
    </div>
  );
}
