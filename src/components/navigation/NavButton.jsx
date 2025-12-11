'use client';

import React from 'react';
import Link from 'next/link';
import {
  Github,
  Home,
  Linkedin,
  Notebook,
  Palette,
  Phone,
  User,
  Briefcase,
  Clock,
} from 'lucide-react';

const getIcon = (icon) => {
  switch (icon) {
    case 'about':
      return <User className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'projects':
      return <Palette className=" h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'qualifications':
      return <Briefcase className=" h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'contact':
      return <Phone className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'github':
      return <Github className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'linkedin':
      return <Linkedin className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'resume':
      return <Notebook className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    case 'past':
      return <Clock className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
    default:
      return <Home className="h-auto w-full md:w-[2.5rem] lg:w-[2.2rem] " strokeWidth={1.5} />;
  }
};

const NavButton = ({ x, y, label, link, icon, newTab, setHovered, hovered }) => {

  return (
    <div
      className="absolute z-50 cursor-pointer mx-auto"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <Link
        href={link}
        target={newTab ? "_blank" : "_self"}
        aria-label={label}
        name={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group nav-button custom-bg flex items-center justify-center rounded-full text-foreground transition-colors duration-300 bg-[ember-neon]/20 group-hover:behind-glow"
      >
        <span className="relative flex flex-col items-center h-10 sm:h-12 md:h-[3rem] lg:h-[4rem] w-10 sm:w-12 md:w-[3rem] lg:w-[4rem] sm:p-4 p-2.5 text-ember-neon">
          {/* Icon */}
          <span className="text-lg hover:shadow-lg group-hover:text-[#ff6d05] text-white transition-colors duration-300">
            {getIcon(icon)}
          </span>

          <span className="peer absolute left-0 top-0 h-full w-full bg-transparent" />

          {/* Label (hidden until hover) */}
          <span className="mt-4 whitespace-nowrap rounded-md px-2 py-1 text-sm md:text-md text-[#ff6d05] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </span>
        </span>
      </Link>

    </div>
  );
};

export default NavButton;
