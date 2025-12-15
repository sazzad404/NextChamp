import { motion } from "framer-motion";

const UpcomingContestDark = () => {
  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 blur-[120px]" />
        <div className="absolute top-40 -right-40 w-96 h-96 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          Something Big is Coming 🚀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-xl mx-auto mb-14"
        >
          Get ready for an exciting contest experience like never before.
        </motion.p>

        {/* Animated Upcoming Button */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 40px rgba(99,102,241,0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                     text-white text-lg font-semibold tracking-wide"
        >
          <span className="relative z-10">Upcoming</span>

          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full border border-indigo-400"
            animate={{
              scale: [1, 1.4],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>
      </div>
    </section>
  );
};

export default UpcomingContestDark;
