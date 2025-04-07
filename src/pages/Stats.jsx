import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

const apiKey = import.meta.env.VITE_API_KEY;

const Stats = () => {
  const [teamStats, setTeamStats] = useState(null);
  const [teamNames, setTeamNames] = useState({ cavs: "", opponent: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      },
    };

    const fetchLatestGameStats = async () => {
      try {
        // Step 1: Fetch recent games for Cavs
        const gamesRes = await fetch(
          "https://api-nba-v1.p.rapidapi.com/games?team=7&season=2024",
          options
        );
        const gamesData = await gamesRes.json();
        const games = gamesData.response;

        if (!games.length) throw new Error("No recent games found.");

        // Step 2: Get the most recent game
        const latestGame = games[games.length - 1];
        const latestGameId = latestGame.id;

        // Step 3: Fetch stats for that game
        const statsRes = await fetch(
          `https://api-nba-v1.p.rapidapi.com/games/statistics?id=${latestGameId}`,
          options
        );
        const statsData = await statsRes.json();

        const allTeams = statsData.response;
        const cavsData = allTeams.find((entry) => entry.team.id === 7);
        const opponentData = allTeams.find((entry) => entry.team.id !== 7);

        if (!cavsData) throw new Error("Cavs stats not found");

        // Save stats + names
        setTeamStats(cavsData.statistics[0]);
        setTeamNames({
          cavs: cavsData.team.name,
          opponent: opponentData?.team.name || "Opponent",
        });
      } catch (err) {
        setError("Could not load game stats.");
        console.error("Error fetching game stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestGameStats();
  }, []);

  const statLabels = {
    fastBreakPoints: "Fast Break Points",
    pointsInPaint: "Points in Paint",
    secondChancePoints: "Second Chance Points",
    pointsOffTurnovers: "Points Off Turnovers",
    points: "Total Points",
    fgm: "Field Goals Made",
    fga: "Field Goals Attempted",
    fgp: "FG %",
    ftm: "Free Throws Made",
    fta: "Free Throws Attempted",
    ftp: "FT %",
    tpm: "3PT Made",
    tpa: "3PT Attempted",
    tpp: "3PT %",
    offReb: "Offensive Rebounds",
    defReb: "Defensive Rebounds",
    totReb: "Total Rebounds",
    assists: "Assists",
    steals: "Steals",
    turnovers: "Turnovers",
    blocks: "Blocks",
    pFouls: "Personal Fouls",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-2">Most Recent Game Stats</h1>

      {teamNames.cavs && teamNames.opponent && (
        <h2 className="text-2xl font-semibold text-gray-300 mb-8">
          {teamNames.cavs} vs {teamNames.opponent}
        </h2>
      )}

      {loading && <p className="text-gray-400">Loading stats...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {teamStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(statLabels)
            .filter(
              ([key]) => teamStats[key] !== null && teamStats[key] !== "N/A"
            )
            .map(([key, label]) => (
              <div key={key} className="bg-[#860038] p-6 rounded-lg">
                <TrendingUp className="mb-2" size={24} />
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className="text-3xl font-bold">{teamStats[key]}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Stats;
