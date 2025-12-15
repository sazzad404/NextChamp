import React from "react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "Step 1",
      title: "Browse Contests",
      desc: "Explore hundreds of active contests across categories like design, photography, writing, video, and more. Filter by prize, deadline, or skill level.",
      icon: (
        <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      step: "Step 2",
      title: "Join & Submit",
      desc: "Click 'Participate', upload your creative work following the brief, and submit before the deadline. Edit anytime until closure.",
      icon: (
        <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      step: "Step 3",
      title: "Get Ranked & Win",
      desc: "Expert judges review all entries. Top winners get cash prizes, exposure, and badges. Results announced via email & dashboard.",
      icon: (
        <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gray-950 sm:py-20 lg:py-28">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-3xl mx-auto">
            Turn your creativity into rewards in just three simple steps. 
            No complicated rules—just compete, create, and win.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:mt-24">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-indigo-500/50 transition-all duration-300 group"
            >
              {/* Connecting Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent -z-10 group-hover:from-indigo-400" />
              )}

              {/* Step Number Circle */}
              <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-500/40 transition-colors duration-300">
                {item.icon}
              </div>

              {/* Step Label */}
              <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
                {item.step}
              </span>

              {/* Title */}
              <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>

              {/* Description */}
              <p className="mt-6 text-base leading-7 text-zinc-400">
                {item.desc}
              </p>

              {/* Arrow Indicator (for flow) */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-8">
                  <svg className="w-6 h-6 mx-auto text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;