import React, { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const Roster = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://api-nba-v1.p.rapidapi.com/players?team=7&season=2024";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      },
    };

    const fetchPlayers = async () => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("API response not ok");

        const data = await res.json();
        const playerList = data.response.map((p) => ({
          name: `${p.firstname} ${p.lastname}`,
          number: p.leagues?.standard?.jersey || "N/A",
          position: p.leagues?.standard?.pos || "N/A",
          height:
            p.height.feets && p.height.inches
              ? `${p.height.feets}'${p.height.inches}"`
              : "N/A",
          weight: p.weight.pounds || "N/A",
          age: p.birth?.date
            ? new Date().getFullYear() - parseInt(p.birth.date.slice(0, 4))
            : "N/A",
          college: p.college || "N/A",
        }));
        setPlayers(playerList);
      } catch (err) {
        setError("Failed to load player data. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8">Team Roster</h1>

      {loading && <p className="text-gray-400">Loading players...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && players.length === 0 && (
        <p className="text-gray-400">No players found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <div key={index} className="bg-[#860038] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{player.name}</h2>
              <span className="text-2xl font-bold">#{player.number}</span>
            </div>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">Position:</span>{" "}
                {player.position}
              </p>
              <p>
                <span className="font-semibold">Height:</span> {player.height}
              </p>
              <p>
                <span className="font-semibold">Weight:</span> {player.weight}{" "}
                lbs
              </p>
              <p>
                <span className="font-semibold">Age:</span> {player.age}
              </p>
              <p>
                <span className="font-semibold">College:</span> {player.college}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roster;
