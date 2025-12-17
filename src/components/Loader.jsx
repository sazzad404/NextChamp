import { motion } from "framer-motion";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center p-6 rounded-lg">
      <div className="flex flex-col items-center gap-6">
        {/* Outer Glow Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full border-4 border-transparent 
          border-t-blue-600 border-r-cyan-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]"
        />

        {/* Inner Pulse Dot */}
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        />

        {/* Text */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
          }}
          className="text-xs tracking-widest uppercase text-gray-300"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;
