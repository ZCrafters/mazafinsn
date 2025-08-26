"use client"

import { motion } from "framer-motion"
import { FiUserPlus, FiBookOpen, FiTrendingUp } from "react-icons/fi"

const steps = [
  {
    icon: FiUserPlus,
    title: "Sign Up",
    description: "Daftar gratis dan mulai perjalanan finansialmu dalam hitungan menit",
    step: "01",
  },
  {
    icon: FiBookOpen,
    title: "Learn",
    description: "Pelajari konsep keuangan melalui konten interaktif dan game edukatif",
    step: "02",
  },
  {
    icon: FiTrendingUp,
    title: "Achieve",
    description: "Capai tujuan finansialmu dengan panduan personal dan tracking progress",
    step: "03",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Bagaimana Cara Kerjanya?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tiga langkah sederhana untuk mengubah masa depan finansialmu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                {step.step}
              </div>

              {/* Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:bg-gray-800/70 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
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
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
            Mulai Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  )
}
