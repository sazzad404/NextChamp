import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            each: 0.15,
            from: "start",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Hover effect on each card
      cardsRef.current.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            scale: 1.05,
            backgroundColor: "rgba(39, 39, 42, 0.9)", // zinc-800
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(24, 24, 27, 0.6)", // zinc-900/60
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "24/7 Support",
      desc: "Our dedicated team is always here to help you with any questions or issues during your contest journey.",
    },
    {
      title: "Big Prize Pools",
      desc: "Compete for massive cash prizes, sponsorships, and exclusive rewards that make winning truly worthwhile.",
    },
    {
      title: "Easy Registration",
      desc: "Quick and seamless onboarding process – sign up, verify, and start participating in contests in minutes.",
    },
    {
      title: "Creative Freedom",
      desc: "Express your skills in design, photo, video, writing, and more – no limits to your creativity.",
    },
    {
      title: "Premium Quality",
      desc: "Professional judging by industry experts ensures fair, transparent, and high-standard evaluation.",
    },
    {
      title: "Real Results",
      desc: "Winners get featured, gain exposure, build portfolios, and open doors to career opportunities.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-gray-950 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Headline */}
        <div ref={titleRef} className="text-center">
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl font-sans">
            Why Choose Our Contest Platform?
          </h2>
          <p className="mt-6 text-lg leading-7 text-zinc-400 max-w-3xl mx-auto">
            Join thousands of creators competing fairly, growing skills, and winning big rewards every day.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 mt-12 text-center  sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-10 xl:mt-24">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="md:p-8 lg:p-14 flex flex-col items-center backdrop-blur-sm bg-zinc-900/60 rounded-2xl border border-zinc-800/50 transition-all duration-300"
            >
              {/* Icon placeholder with indigo accent for dark mode */}
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-500/40 transition-colors duration-300">
                <span className="text-3xl font-bold text-indigo-400">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">{feature.title}</h3>
              <p className="mt-6 text-base leading-7 text-zinc-400 max-w-xs">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;