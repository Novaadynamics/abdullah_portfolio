import { motion } from "framer-motion";
import Link from "next/link";
import project from '../projects'

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const ProjectLink = motion(Link);
const ProjectLayout = ({ id, name, description, date, demoLink }) => {
  return (
    <ProjectLink
      variants={item}
      href={`/projects/${id}`}
      className=" text-sm md:text-base flex items-center justify-between w-full relative rounded-lg overflow-hidden p-4 md:p-6 custom-bg-abt"
    >
      <div className="flex items-center justify-center space-x-2">
        <h2 className=" text-shadow-neon-orange">{name}</h2>
        <p className="text-shadow-neon-light-orange hidden sm:inline-block">{description}</p>
      </div>
      <div className="self-end flex-1 mx-2 mb-1 bg-transparent border-b border-dashed border-muted" />
      <p id="date" className=" text-shadow-neon-light-orange ">
        {new Date(date).toDateString()}
      </p>
    </ProjectLink>
  );
};

export default ProjectLayout;
