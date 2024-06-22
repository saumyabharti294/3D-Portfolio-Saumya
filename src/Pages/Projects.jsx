import { Link } from "react-router-dom";

import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My{" "}
        <span className='font-semibold blue-gradient_text drop-shadow'>
          Projects
        </span>
      </h1>

      <p className='mt-2 leading-relaxed text-slate-500'>
        I've embarked on numerous projects throughout my 4 year B.Tech Journey, but these are
        the ones I hold closest to my heart. Some are related to 3D Frontend Development, Machine learning, Augmented Reality and Blockchain Development. I also Contributed to an open-source, and gained a decent amount of learning in every recent technologies. 
        I wanted to explore the latest technologies and i am still learning and exploring new things. 
        You can go through my projects.
      </p>

      <div className='flex flex-wrap gap-16 my-20'>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='w-12 h-12 block-container'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='flex items-center justify-center btn-front rounded-xl'>
                <img
                  src={project.iconUrl}
                  alt='threads'
                  className='object-contain w-1/2 h-1/2'
                />
              </div>
            </div>

            <div className='flex flex-col mt-5'>
              <h4 className='text-2xl font-semibold font-poppins'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.tools}</p>
              <p className='mt-2 text-slate-500'>{project.description}</p>
              <div className='flex items-center gap-2 mt-5 font-poppins'>
                <Link
                  to={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600'
                >
                  Link
                </Link>
                <img
                  src={arrow}
                  alt='arrow'
                  className='object-contain w-4 h-4'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;