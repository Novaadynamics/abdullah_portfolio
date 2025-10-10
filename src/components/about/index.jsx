import React, { useEffect, useRef, useState } from "react";
import ItemLayout from "./ItemsLayout";
import Link from "next/link";
import { animate } from "framer-motion";

const AboutDetails = () => {

  //
  //
  // Get Public Repo Counts By Username Method...
  async function getPublicReposCount(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      console.error("GitHub API error", response.status);
      return null;
    }
    const data = await response.json();
    return data.public_repos; // number of public repos
  }

  //
  //
  // Repo Counts...
  const [count, setCount] = useState(0);
  // Github Username...
  const username = "MA1002643";

  // Get Repo Counts...
  useEffect(() => {
    getPublicReposCount(username).then((num) => {
      setCount(num);
    });
  }, [username]);

  //
  //
  // Counter Animation...
  function Counter({ from, to }) {
    const nodeRef = useRef();

    useEffect(() => {
      const node = nodeRef.current;

      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          node.textContent = value.toFixed(0);
        },
      });

      return () => controls.stop();
    }, [from, to]);

    return <p ref={nodeRef} />;
  }

  //
  //
  // Calculate Years of Exp
  const [years, setYears] = useState(0);
  // Set your desired start date here
  const startDate = '2021-01-01T00:00:00';

  useEffect(() => {
    const calculateYears = () => {
      const start = new Date(startDate);
      const now = new Date();
      const differenceInMs = now.getTime() - start.getTime();
      // 1000ms/s * 60s/min * 60min/hr * 24hr/day * 365.25 days/year (for leap years)
      const yearsElapsed = differenceInMs / (1000 * 60 * 60 * 24 * 365.25);

      setYears(Math.floor(yearsElapsed));
    };

    calculateYears();

    const intervalId = setInterval(calculateYears, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]);

  //
  //
  // Icons...
  const icons = [
    "appwrite", "aws", "babel", "bootstrap", "cloudflare", "css", "d3", "docker",
    "figma", "firebase", "gatsby", "git", "github", "graphql", "html", "ipfs",
    "js", "jquery", "kubernetes", "linux", "mongodb", "mysql", "netlify", "nextjs",
    "nodejs", "npm", "postgres", "react", "redux", "replit", "sass", "supabase",
    "tailwind", "threejs", "vercel", "vite", "vscode", "yarn"
  ];

  return (
    <section className="py-20 px-16 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6 md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="text-xl md:text-3xl text-left w-full capitalize text-shadow-neon-orange">
            Architect of Enchantment
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base text-shadow-neon-light-orange">
            My journey in web development is powered by an array of mystical tools and
            languages, with JavaScript casting the core of my enchantments. I wield frameworks like
            React.js and Next.js with precision, crafting seamless portals (websites) that connect realms
            (users) across the digital universe. The ancient arts of the Jamstack empower me to create
            fast, secure, and dynamic experiences, while my design skills ensure every creation is not
            only functional but visually captivating. Join me as I continue to explore new spells and
            technologies to shape the future of the web.
          </p>
        </ItemLayout>

        {/* <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl text-shadow-neon-orange">
            25+ <sub className="font-semibold text-base text-shadow-neon-light-orange">clients</sub>
          </p>
        </ItemLayout> */}

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <h1 className="flex items-center gap-2 font-semibold w-full text-left text-2xl sm:text-5xl text-shadow-neon-orange">
            <Counter from={0} to={count}></Counter><p style={{ transform: "translateX(-10px)" }}>+</p>
            <p className="font-semibold text-base text-shadow-neon-light-orange">completed projects</p>
          </h1>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <h1 className="flex items-center gap-2  font-semibold w-full text-left text-2xl sm:text-5xl text-shadow-neon-orange">
            <Counter from={0} to={years}></Counter><p style={{ transform: "translateX(-10px)" }}>+</p>
            <p className="font-semibold text-base text-shadow-neon-light-orange">years of experience</p>
          </h1>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-6 row-span-2 !p-0"}
        >
          <img
            className="w-full h-auto"
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=MA1002643&theme=dark&show_icons=true&hide_border=true&bg_color=00000000&title_color=ffb03a`}
            alt="CodeBucks"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full sm:col-span-6 md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src={`https://github-readme-streak-stats.herokuapp.com?user=MA1002643&theme=dark&hide_border=true&background=EB545400`}
            // src={`https://github-readme-stats.vercel.app/api/top-langs/?username=MA1002643&theme=gruvbox&show_icons=true&hide_border=true&layout=compact`}
            // src={`https://github-readme-stats.vercel.app/api?username=MA1002643`}
            alt="CodeBucks"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={" col-span-full sm:col-span-6 md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src={`https://github-readme-stats.vercel.app/api?username=MA1002643&theme=gruvbox&show_icons=true&hide_border=true&count_private=true&bg_color=00000000&title_color=ffb03a`}
            alt="CodeBucks"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className="col-span-full grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-">
          {icons.map((icon) => (
            <div
              key={icon}
              className="relative group w-24 h-24 transition-transform duration-300 ease-in-out hover:animate-lift-shake"
            >
              <img
                src={`https://skillicons.dev/icons?i=${icon}`}
                alt={icon}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300  text-shadow-neon-orange text-md rounded px-2 py-1 pointer-events-none whitespace-nowrap z-10">
                {icon}
              </div>
            </div>
          ))}
        </ItemLayout>

        {/* <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=appwrite,aws,babel,bootstrap,cloudflare,css,d3,docker,figma,firebase,gatsby,git,github,graphql,html,ipfs,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,supabase,tailwind,threejs,vercel,vite,vscode,yarn`}
            alt="CodeBucks"
            loading="lazy"
          />
        </ItemLayout> */}

        {/* <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src={`https://github-readme-streak-stats.herokuapp.com?user=MA1002643&theme=dark&hide_border=true&background=EB545400`}
            // src={`https://github-readme-stats.vercel.app/api/top-langs/?username=MA1002643&theme=gruvbox&show_icons=true&hide_border=true&layout=compact`}
            // src={`https://github-readme-stats.vercel.app/api?username=MA1002643`}
            alt="CodeBucks"
            loading="lazy"
          />
        </ItemLayout> */}

        {/* <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/codebucks27/Nextjs-contentlayer-blog"
            target="_blank"
            className="w-full"
          >
            <img
              className="w-full h-auto"
              src={`https://github-readme-streak-stats.herokuapp.com?user=MA1002643&theme=dark&hide_border=true&background=EB545400`}
              alt="CodeBucks"
              loading="lazy"
            />
          </Link>
        </ItemLayout> */}
      </div>
    </section>
  );
};

export default AboutDetails;
