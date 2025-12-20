import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // subtle animation er jonno (optional, but joss lagbe)

const SupportSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const faqs = [
    {
      q: "How do I submit my entry to a contest?",
      a: "After registering, go to the contest page, click 'Participate', upload your work according to guidelines, and submit before the deadline.",
    },
    {
      q: "When will winners be announced?",
      a: "Winners are announced within 7-14 days after the contest ends. You'll get an email notification and see results on the contest page.",
    },
    {
      q: "What file formats are accepted?",
      a: "We support JPG, PNG, PDF, MP4, ZIP (for multiple files). Max file size: 100MB per upload.",
    },
    {
      q: "Can I edit my submission after uploading?",
      a: "Yes! You can update your entry anytime before the contest deadline.",
    },
    {
      q: "How are contests judged?",
      a: "All entries are reviewed by industry experts based on creativity, originality, technical skill, and adherence to the brief.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 bg-zinc-950 sm:py-20 lg:py-28">
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
            We're Here to Help
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-3xl mx-auto">
            Got questions about contests, submissions, prizes, or anything else?
            Our support team is ready to assist you 24/7.
          </p>
        </motion.div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:mt-24">
          {/* Live Chat */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L3 12V6a2 2 0 012-2h14a2 2 0 012 2v6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Live Chat</h3>
            <p className="mt-4 text-zinc-400">Instant help from our team</p>
            <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Start Chat
            </button>
          </motion.div>

          {/* Email Support */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Email Us</h3>
            <p className="mt-4 text-zinc-400">Response within 24 hours</p>
            <a
              href="mailto:sazzadhasan313@gmail.com"
              className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              sazzadhasan313@gmail.com
            </a>
          </motion.div>

          {/* Help Center */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Help Center</h3>
            <p className="mt-4 text-zinc-400">Browse guides & FAQs</p>
            <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Visit Help Center
            </button>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 lg:mt-32 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-zinc-800/50 transition"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.q}
                  </span>
                  <span
                    className={`text-indigo-400 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
