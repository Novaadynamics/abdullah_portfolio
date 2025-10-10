"use client";
import { motion } from "framer-motion";
import ProjectLayout from "./ProjectLayout";
import { useMemo, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
};

const ProjectList = ({ projects }) => {
  const categories = ["All", "Web", "System", "App"];
  const [active, setActive] = useState("All");

  // Filtering logic
  const filteredProjects =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-full  xl:max-w-4xl px-4 mx-auto lg:px-16 space-y-6 md:space-y-8 flex flex-col items-center"
    >
      {/* <div className="z-50 pt-12 text-center">
        <h1 className="text-transparent text-[3rem] font-extrabold uppercase leading-tight md:text-[5rem] text-stroke-neon">
          PROJECTS
        </h1>
        <h2 className="text-amethyst-neon mt-2 text-[1.25rem] font-semibold uppercase leading-snug md:text-[1.875rem]">
          My  Work
        </h2>
      </div> */}
      {/* HEADLINE */}
      <div id="about" className="z-50 pt-8 text-center">
        <h1
          className="text-transparent text-[3rem] font-extrabold uppercase leading-tight md:text-[3.5rem] text-glow-stroke-neon"
          style={{
            // textShadow: "0 0 10px #fcf699, 0 0 20px #fcf699, 0 0 40px #fcf699"
          }}
        >
          PROJECTS
        </h1>
        <h2 className="glitter-text mt-1 text-[1rem] font-semibold uppercase leading-snug md:text-[1.6rem]">
          - My Work -
        </h2>
        {/* project categories   */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          {categories.map((cat) => {
            const isDisabled = cat !== "All" && categoryCounts[cat] === 0;
            return (
              <span
                key={cat}
                onClick={() => !isDisabled && setActive(cat)}
                className={`transition text-[1rem] md:text-[1.2rem] font-semibold uppercase 
                ${isDisabled
                    ? "text-gray-500 cursor-not-allowed opacity-40"
                    : active === cat
                      ? "cursor-pointer text-glow-stroke-neon"
                      : "cursor-pointer text-amethyst-neon/70 hover:text-amethyst-neon"
                  }`}
              >
                {cat}
              </span>
            );
          })}
        </div>

      </div>
      {/* {projects.map((project, index) => {
        return <ProjectLayout key={index} {...project} />;
      })} */}
      {filteredProjects.length >= 1 ? filteredProjects.map((project, index) => (
        <ProjectLayout key={index} {...project} />
      )) :
        <div className="custom-bg-abt rounded-md p-3">
          <h3 className="text-center text-lg font-semibold text-[#FFB627] tracking-wide relative z-10 
      drop-shadow-[0_0_5px_#ffb627]">
            No Projects Found !
          </h3>
        </div>
      }
    </motion.div>
  );
};

export default ProjectList;
