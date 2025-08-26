"use client"

import { motion } from "framer-motion"
import { FiPlay, FiAward, FiTarget, FiStar } from "react-icons/fi"

const games = [
  {
    title: "Budget Master Challenge",
    description: "Kelola budget bulanan dan raih skor tertinggi",
    image: "/budget-management-game-interface-with-charts-and-c.png",
    difficulty: "Beginner",
    points: "500 pts",
    players: "2.1k",
  },
  {
    title: "Investment Simulator",
    description: "Belajar investasi tanpa risiko kehilangan uang",
    image: "/stock-market-investment-game-with-graphs-and-portf.png",
    difficulty: "Intermediate",
    points: "1000 pts",
    players: "1.8k",
  },
  {
    title: "Debt Destroyer",
    description: "Strategi melunasi hutang dengan game seru",
    image: "/debt-payoff-game-with-progress-bars-and-financial-.png",
    difficulty: "Advanced",
    points: "1500 pts",
    players: "950",
  },
]

export default function GamificationPreview() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Belajar Sambil Bermain</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Game edukatif yang membuat belajar keuangan jadi menyenangkan dan mudah dipahami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                {/* Game Screenshot */}
                <div className="relative overflow-hidden">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <FiPlay className="w-5 h-5 text-white" />
                  </div>

                  {/* Difficulty badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      game.difficulty === "Beginner"
                        ? "bg-green-500/80 text-white"
                        : game.difficulty === "Intermediate"
                          ? "bg-yellow-500/80 text-white"
                          : "bg-red-500/80 text-white"
                    }`}
                  >
                    {game.difficulty}
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{game.description}</p>

                  {/* Game Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FiStar className="w-4 h-4" />
                        <span>{game.points}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400">
                        <FiTarget className="w-4 h-4" />
                        <span>{game.players}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <FiAward className="w-4 h-4" />
                      <span>Play</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
            Lihat Semua Game
          </button>
        </motion.div>
      </div>
    </section>
  )
}
