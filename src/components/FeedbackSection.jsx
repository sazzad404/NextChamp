import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const feedbacks = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=12",
    message:
      "This platform completely changed the way I participate in online contests. Clean UI, smooth experience, and real rewards!",
  },
  {
    name: "Sarah Ahmed",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=32",
    message:
      "The contest system is very transparent and motivating. Winning feels real and exciting. Highly recommended!",
  },
  {
    name: "Rahim Khan",
    role: "MERN Stack Developer",
    image: "https://i.pravatar.cc/150?img=54",
    message:
      "Amazing experience! The animations, performance, and contest quality are top-notch.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const FeedbackSection = () => {
  return (
    <section className="bg-gray-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          What Our Users Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          Real feedback from real users who are winning and growing with us.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {feedbacks.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Quote icon */}
              <FaQuoteLeft className="text-blue-600 text-3xl absolute -top-4 -left-4 bg-gray-950 p-2 rounded-full" />

              {/* Message */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {item.message}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full border-2 border-blue-700"
                />
                <div>
                  <h4 className="text-white font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
