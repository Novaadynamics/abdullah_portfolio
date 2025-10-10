import Image from "next/image";
import bg from "../../../../public/background/project-bg.png";
import ProjectList from "@/components/projects";
import { projectsData } from "../../data";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Project() {
  return (
    <main>
        <FullScreenLoader />
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-70 blur-[0.4px]"
      />

      <ProjectList projects={projectsData} />
    </main>
  );
}
