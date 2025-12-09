import React from "react";


const HeroBanner = () => {
  return (
    <div>
      <div class="relative pt-48 pb-12 bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">

        <div class="absolute inset-0">
          <img
            class="object-cover w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/hero/3/background.png"
            alt=""
          />
        </div>

        <div class="relative">
          <div class="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <div class="w-full lg:w-2/3 xl:w-1/2">
              <h1 class="font-sans text-base font-normal tracking-tight text-white text-opacity-70">
                Discover. Compete. Win Big.
              </h1>

              <p class="mt-6 tracking-tighter text-white">
                <span class="font-sans font-normal text-7xl">
                  Find the best
                </span>
                <br />
                <span class="font-serif italic font-normal text-8xl">
                  online contests
                </span>
              </p>

              <p class="mt-12 font-sans text-base font-normal leading-7 text-white text-opacity-70">
                Join thousands of creators competing in design, coding,
                photography, writing and many more categories. Take part,
                showcase your skills, and win exciting rewards!
              </p>

              {/* Search Bar */}
              <div class="mt-10">
                <div class="flex items-center bg-white rounded-full px-5 py-3 shadow-lg">
                  <svg
                    class="w-6 h-6 text-gray-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.1-5.4A7 7 0 1110 3a7 7 0 017.75 7.25z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search contests…"
                    class="w-full text-black focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div class="flex items-center mt-8 space-x-3 sm:space-x-4">
                <a
                  href="#"
                  class="
                    inline-flex items-center justify-center
                    px-5 py-2 font-sans text-base font-semibold
                    transition-all duration-200 border-2 border-transparent
                    rounded-full sm:leading-8 bg-orange-500 hover:bg-orange-600 
                    hover:bg-opacity-90 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
                  "
                >
                  Explore Contests
                </a>

                <a
                  href="#"
                  class="
                    inline-flex items-center justify-center px-5 py-2
                    font-sans text-base font-semibold transition-all duration-200
                    bg-transparent border-2 rounded-full sm:leading-8 text-white
                    border-primary hover:bg-white focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-primary
                    hover:text-black sm:text-lg focus:ring-offset-secondary
                  "
                >
                  <svg
                    class="w-6 h-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z"
                    />
                  </svg>
                  Watch Promo
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;
