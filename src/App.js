import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // 1. Add state and error handling
  const [pokemonImages, setPokemonImages] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000); // Reset message after 3 seconds
  };

  // 2. useEffect to fetch Pokémon
  useEffect(() => {
    const fetchRandomPokemon = async () => {
      const getRandomId = () => Math.floor(Math.random() * 898) + 1;

      try {
        const promises = Array(3)
          .fill(null)
          .map(async () => {
            const id = getRandomId();
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            if (!res.ok)
              throw new Error(`Failed to fetch Pokémon ID ${id}`);
            const data = await res.json();
            const image =
              data.sprites.other["official-artwork"].front_default;
            if (!image)
              throw new Error(`Missing artwork for ID ${id}`);
            return image;
          });

        const results = await Promise.all(promises);
        setPokemonImages(results);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load Pokémon images. Please try again.");
      }
    };

    fetchRandomPokemon();
  }, []);

  // 3. If error, show message
  if (error) {
    return <div className="error">{error}</div>;
  }

  // 4. If not loaded yet, don't show images
  const [heroImg, packagesImg, bookingImg] = pokemonImages;

  return (
    <div className="App">
      <section className="title">
        <h1>Pokemon Birthday Party!</h1>
      </section>

      {/* 1. Hero Section */}
      <section className="section hero">
        <div className="text">
          <h2>Plan Your Perfect Birthday Party!</h2>
          <p>Make your child's day unforgettable with us 🎈</p>
        </div>
        {heroImg && (
          <img
            src={heroImg}
            alt="Party Hero"
            className="section-img"
          />
        )}
      </section>

      {/* 2. Packages Section */}
      <section className="section packages">
        <div className="text">
          <h2>Our Party Packages</h2>
          <ul>
            <li>
              <strong>Venue:</strong> Colorful indoor play area
            </li>
            <li>
              <strong>Packages:</strong> Basic, Deluxe, and VIP
            </li>
            <li>
              <strong>Includes:</strong> Games, snacks, decorations,
              and cake
            </li>
            <li>
              <strong>Pricing:</strong> Starting from $199
            </li>
          </ul>
        </div>
        {packagesImg && (
          <img
            src={packagesImg}
            alt="Packages"
            className="section-img"
          />
        )}
      </section>

      {/* 3. Booking Section */}
      <section className="section booking">
        <div className="text">
          <h2>Book Your Party Now</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Parent's Name" required />
            <input
              type="email"
              placeholder="Email Address"
              required
            />
            <input type="tel" placeholder="Phone Number" required />
            <input type="number" placeholder="Child's Age" required />
            <input
              type="number"
              placeholder="Number of Guests"
              required
            />
            <input type="datetime-local" required />
            <textarea
              placeholder="Any special requests?"
              rows="4"
            ></textarea>
            <button type="submit">Submit</button>
            {submitted && (
              <p className="success-msg">
                🎉 Booking submitted successfully!
              </p>
            )}
          </form>
        </div>
        {bookingImg && (
          <img
            src={bookingImg}
            alt="Booking"
            className="section-img"
          />
        )}
      </section>
    </div>
  );
}

export default App;
