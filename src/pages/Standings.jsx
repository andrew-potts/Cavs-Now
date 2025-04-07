import React, { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

const apiKey = import.meta.env.VITE_API_KEY;

const Standings = () => {
  const [easternConference, setEasternConference] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      "https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2024";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      },
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const east = data.response.filter(
          (team) => team.conference.name === "east"
        );

        const formatted = east.map((team) => ({
          rank: team.conference.rank,
          team: team.team.name,
          wins: team.win.total,
          losses: team.loss.total,
          pct: team.win.percentage,
          gb: team.gamesBehind,
          l10: `${team.win.lastTen}-${team.loss.lastTen}`,
          streak: `${team.winStreak ? "W" : "L"}${team.streak}`,
        }));

        setEasternConference(formatted.sort((a, b) => a.rank - b.rank));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching standings:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <div className="flex items-center gap-4 mb-8">
        <Trophy size={32} />
        <h1 className="text-4xl font-bold">Eastern Conference Standings</h1>
      </div>

      <div className="bg-[#860038] rounded-lg p-6 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-4">W</th>
              <th className="py-3 px-4">L</th>
              <th className="py-3 px-4">PCT</th>
              <th className="py-3 px-4">GB</th>
              <th className="py-3 px-4">L10</th>
              <th className="py-3 px-4">STREAK</th>
            </tr>
          </thead>
          <tbody>
            {easternConference.map((team) => (
              <tr
                key={team.rank}
                className={`border-b border-gray-700 ${
                  team.team === "Cleveland Cavaliers"
                    ? "bg-[#041E42] bg-opacity-40"
                    : ""
                }`}
              >
                <td className="py-4 px-4">{team.rank}</td>
                <td className="py-4 px-4 font-semibold">{team.team}</td>
                <td className="py-4 px-4">{team.wins}</td>
                <td className="py-4 px-4">{team.losses}</td>
                <td className="py-4 px-4">{team.pct}</td>
                <td className="py-4 px-4">{team.gb}</td>
                <td className="py-4 px-4">{team.l10}</td>
                <td className="py-4 px-4">{team.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#860038] p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Playoff Picture</h3>
          <p className="text-gray-300">
            Top 6 teams qualify directly for playoffs
          </p>
          <p className="text-gray-300">
            Teams 7-10 compete in play-in tournament
          </p>
        </div>

        <div className="bg-[#860038] p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Current Position</h3>
          <p className="text-gray-300">Cavs are currently 3rd in the East</p>
          <p className="text-gray-300">14.0 games behind 1st place</p>
        </div>

        <div className="bg-[#860038] p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Recent Form</h3>
          <p className="text-gray-300">Last 10 games: 4-6</p>
          <p className="text-gray-300">Current streak: Lost 2</p>
        </div>
      </div>
    </div>
  );
};

export default Standings;
