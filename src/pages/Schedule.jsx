import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

const apiKey = import.meta.env.VITE_API_KEY;

const Schedule = () => {
  // Define state to store games
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const url = "https://api-nba-v1.p.rapidapi.com/games?season=2024&team=7"; // Use team ID 7 for Cleveland Cavaliers
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Log the result to check the response structure
        console.log("API Response:", result);

        // Check if response contains games
        if (result.response && result.response.length > 0) {
          // Filter future games and limit to the next 5
          const futureGames = result.response
            .filter((game) => new Date(game.date.start) > new Date()) // Only future games
            .slice(0, 5); // Limit to 5 games

          setGames(futureGames);
        } else {
          setError("No upcoming games found");
        }
      } catch (err) {
        setError("Error fetching games");
        console.error(err); // Log any errors
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <p>Loading games...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8">Cleveland Cavaliers Schedule</h1>

      <div className="grid gap-6">
        {games.map((game, index) => (
          <div key={index} className="bg-[#860038] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Calendar size={24} />
                <div>
                  <p className="text-lg font-semibold">
                    {new Date(game.date.start).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {/* Show the opponent's name, not Cleveland Cavaliers */}
                  <p className="text-gray-300">
                    vs{" "}
                    {game.teams.home.id === 7
                      ? game.teams.visitors.name
                      : game.teams.home.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin size={20} />
                <p>
                  {game.arena.name}, {game.arena.city}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Clock size={20} />
                <p>{new Date(game.date.start).toLocaleTimeString("en-US")}</p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  game.teams.home.id === 7 ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {/* Show whether the Cavaliers are playing at home or away */}
                {game.teams.home.id === 7 ? "Home" : "Away"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar View */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Monthly Calendar</h2>
        <div className="bg-[#860038] rounded-lg p-6">
          <p className="text-center text-gray-300">
            Full calendar view coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
