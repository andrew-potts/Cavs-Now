import React from "react";
import { Trophy, Award } from "lucide-react";

const Home = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <div
        className="h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Cleveland Cavaliers</h1>
            <p className="text-xl">Witness Greatness</p>
          </div>
        </div>
      </div>

      {/* Team Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Team History</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Cleveland Cavaliers, often referred to as the Cavs, are an
              American professional basketball team based in Cleveland. The Cavs
              compete in the National Basketball Association (NBA) as a member
              of the league's Eastern Conference Central Division.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Founded in 1970, the Cavaliers have a rich history of success,
              including multiple conference championships and an NBA
              championship in 2016. The team plays its home games at Rocket
              Mortgage FieldHouse, located in downtown Cleveland.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-[#860038] p-4 rounded-lg">
                <Trophy className="mb-2" size={24} />
                <h3 className="font-bold">NBA Championships</h3>
                <p>2016</p>
              </div>
              <div className="bg-[#860038] p-4 rounded-lg">
                <Award className="mb-2" size={24} />
                <h3 className="font-bold">Conference Titles</h3>
                <p>5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
