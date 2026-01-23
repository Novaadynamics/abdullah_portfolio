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
      return <User className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'projects':
      return <Palette className=" h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'qualifications':
      return <Briefcase className=" h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'contact':
      return <Phone className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'github':
      return <Github className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'linkedin':
      return <Linkedin className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'resume':
      return <Notebook className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    case 'past':
      return <Clock className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
    default:
      return <Home className="h-auto w-full md:w-[3.5rem] lg:w-[4rem] " strokeWidth={1.5} />;
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
      <a
        href={link}
        target={newTab ? "_blank" : "_self"}
        aria-label={label}
        name={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group nav-button custom-bg flex items-center justify-center rounded-full transition-all duration-300"
      >
        <span className="relative flex flex-col items-center h-16 sm:h-20 md:h-[5.5rem] lg:h-[6rem] w-16 sm:w-20 md:w-[5.5rem] lg:w-[6rem] sm:p-5 md:p-[0.85rem] lg:p-5 p-4">
          {/* Icon */}
          <span className="text-lg text-white group-hover:text-[#ff6d05] transition-colors duration-300">
            {getIcon(icon)}
          </span>

          <span className="peer absolute left-0 top-0 h-full w-full bg-transparent" />

          {/* Label (hidden until hover) */}
          <span className="sm:mt-4 mt-2 whitespace-nowrap rounded-md px-2 py-1 text-sm md:text-md text-[#ff6d05] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
            {label}
          </span>
        </span>
      </a>

    </div>
  );
};

export default NavButton;
