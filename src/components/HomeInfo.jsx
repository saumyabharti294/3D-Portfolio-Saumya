import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";


const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <div className='text-center'>
        <h1 className='px-8 py-4 mx-5 text-center text-white sm:text-xl sm:leading-snug neo-brutalism-blue'>
          Hi, I'm
          <span className='mx-2 font-semibold text-white'>Saumya</span>
          👋
          <br />
          I am a final year Computer Science Engineering student,<br />
          pursuing B.Tech from Indira Gandhi Delhi Technical University For Women.
        </h1>
      </div>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
        Gained valuable experience and developed a diverse skill <br/>
        set through internships at various companies.
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='object-contain w-4 h-4' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
        Over four years, I've led multiple projects, <br/> turning ideas into impactful solutions. Curious to see my work?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Contact
          <img src={arrow} alt='arrow' className='object-contain w-4 h-4' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium text-center sm:text-xl'>
        Want to connect or drop a message? <br/> Lets Connect : 
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Contact
        <img src={arrow} alt='arrow' className='object-contain w-4 h-4' />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;