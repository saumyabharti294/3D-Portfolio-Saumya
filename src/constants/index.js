import { meta, shopify, starbucks, Timechain, tesla,  accretive } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    SparkAR,
    unity,
    C,
    Cpp,
    rust,
    blender,
    mixamo,
    camera
} from "../assets/icons";

export const skills = [
    {
        imageUrl: Cpp,
        name: "C++",
        type: "Frontend",
    },
    {
        imageUrl: C,
        name: "C#",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: blender,
        name: "Blender",
        type: "Animation",
    },
    {
        imageUrl: SparkAR,
        name: "SparkAR",
        type: "AR Filter",
    },
    {
        imageUrl: mixamo,
        name: "Mixamo",
        type: "Animation",
    },
    {
        imageUrl: rust,
        name: "Rust",
        type: "Backend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: unity,
        name: "Unity",
        type: "Game Development",
    }
];

export const experiences = [
    {
        title: "SDE Intern",
        company_name: "Accretive Technologies Pvt Ltd",
        icon: accretive,
        iconBg: "#accbe1",
        date: "June 2024 - Aug 2024",
        tools : "Skills : React, Three.js, HTML, TypeScript, Tailwind CSS, VSCode, Git & Github, MongoDB",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies including Three.js component.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Ensure smooth user experiences with responsive design principles and robust cross-browser compatibility within the system.",
            "Participate actively in code reviews, constructive feedback to maintain high standards of code quality and functionality.",
        ],
    },
    {
        title: "Summer Intern",
        company_name: "Ransh Innovation Pvt Ltd",
        icon: tesla,
        iconBg: "#fbc3bc",
        date: "June 2022 - Nov 2022",
        tools : "Skills : Unity, C#, VSCode, Git & Github, Blender, Netcode, Multiplayer, Single Player, Game Development",
        points: [
            "Collaborated with founders to renovate tic-tac-toe into 8 exciting variations like wild, gobblet, and 3D.",
            "Implemented netcode for multiplayer functionality across different game versions from scratch.",
            "Developed diverse modes including single player and multiplayer using an incremental prototyping approach in the SDLC model.",
        ],
    },
    {
        title: "Contributer",
        company_name: "TimeChain Labs",
        icon: Timechain,
        iconBg: "#a2d2ff",
        date: "May 2022 - Aug 2023",
        tools : "Skills : Rust, Bash, MySQL, API, Git, GitHub, Research, Bitcoin",
        points: [
            "Contributed on Open Source project 'Bitcoin Virtual Machine (BVM) with team accross the globe.",
            "Developed and Enhanced the Bitcoin Virtual Machine (BVM) for Bitcoin SV, focusing on interoperability and versatility.",
            "Seamlessly integrated cross-chain functionality, a modular architecture, Web Assembly support, BSV-specific APIs.",
        ],
    },
    {
        title: "Content Designer",
        company_name: "MoneyyApp",
        icon: meta,
        iconBg: "#00000",
        date: "May-2022 - July-2022",
        tools : "Skills : Unity, C#, 3D Objects, Git, GitHub, AR, WebXR, WebAR.com",
        points: [
            "Developed AR projects using Unity, some components of Three.js and WebAR.com",
            "Projects where business cards, website tutorials came to life with captivating Augmented Reality",
            "ontent triggered by QR codes, while image recognition technology enhanced interactivity and immersion.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/saumyabharti294',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/saumya-bharti-0b1b2a233',
    }
];

export const projects = [
    {
        iconUrl: camera,
        theme: 'btn-back-red',
        name: 'AI-powered Surveliiance System',
        tools: 'Python, OpenCV, YOLOv8, LLM',
        description: ' Engineered an intelligent camera system using open-source technologies for real-time video analysis, featuring object detection, activity recognition, anomaly detection, and Large Language Model-based Vision Assistance. Integrated seamlessly with CCTV cameras, enhancing security in police lockups while ensuring privacy compliance.',
        link: 'https://www.youtube.com/watch?v=YhjpYY2Lp6g',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: '3D Portfolio Website',
        description: 'Welcome to my 3D web portfolio! This site showcases my work using cutting-edge web technologies, including React and Three.js. By incorporating 3D components from Sketchfab and leveraging Material-UI for sleek, responsive design, I have created an immersive experience that highlights my projects and skills. Explore and enjoy the dynamic visuals and interactivity that bring my portfolio to life!',
        link: './',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Campus Of Secret, AR Game on Image Recognition',
        description: 'Developed a AR-based game using Unity Engine where people would search images through hints provided in game and then scan those images using AR Camera. A Box in real world would pop up seen only through AR Camera which contained the reward for every levels.',
        link: 'https://drive.google.com/file/d/1NHLNWq3O4UU8Jw1_l8gnltE3FJruV-TU/view',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Bitcoin Virtual Machine (BVM)',
        description: 'Developed and Enhanced the Bitcoin Virtual Machine (BVM) for Bitcoin SV, focusing on interoperability and versatility. Seamlessly integrated cross-chain functionality, a modular architecture, Web Assembly support, BSV-specific APIs.',
        link: 'https://drive.google.com/file/d/1Ph0uSFct8T5XQvvRscKHpDj-pzu6tnTh/view',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-black',
        name: 'AR Filter for Instagram',
        description: 'Developed an AR filter for Instagram using SparkAR and Sketchfab, integrating high-quality 3D models to create realistic elements. The project focused on designing and deploying interactive AR effects with precise facial tracking, enhancing user experience through an intuitive and visually appealing filter. Extensive testing ensured platform compatibility, adhering to Instagram AR filter guidelines for seamless deployment.',
        link: 'https://www.instagram.com/ar/680411540386795',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'Hair Haulers',
        description: 'Developed a website, bridging the gap between salons and industries for efficient transport of hair raw materials. Implemented live location tracking using Google Maps and utilized Google Forms instead of internal APIs. Streamlined the process for industries reliant on waste hair, such as wig making, manure making, fabric making, etc.',
        link: 'https://github.com/saumyabharti294/Hair-Haulers.github.io',
    }
];