import { Experience, Project, Skill, Education, NavItem } from './types';

// ==========================================
// Navigation Constants
// ==========================================
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', number: '01.' },
  { id: 'skills', label: 'Skills', number: '02.' },
  { id: 'experience', label: 'Experience', number: '03.' },
  { id: 'projects', label: 'Projects', number: '04.' },
  { id: 'education', label: 'Education', number: '05.' },
];

// ==========================================
// Z-Index Constants
// ==========================================
export const Z_INDEX = {
  NAVBAR: 60,
  MOBILE_MENU: 65,
  NAVBAR_TOGGLE: 70,
  CAREER_BOT: 100,
  MODAL_OVERLAY: 90,      // Backdrop below content
  PROJECT_MODAL: 100,     // Container
  PROJECT_CONTENT: 101,   // Modal content above backdrop
} as const;

// ==========================================
// Scroll & Animation Constants
// ==========================================
export const SCROLL_OFFSET = 80;
export const SCROLLspy_OFFSET = 150;
export const ANIMATION_DELAY_INCREMENT = 0.05;

// ==========================================
// CV Data
// ==========================================
export const CV_DATA = {
  name: "Laurensius Haryo Radyobaskoro",
  targetRole: "Data-Driven QA Professional",
  currentRole: "QA Tester transitioning to Data-Driven QA",
  profileImage: "profile.jpg",
  bio: "I am a data-driven Quality Assurance professional with over two years of experience in game development. I documented 120+ bugs in Unity using Notion and conducted root cause analysis by categorizing issues based on urgency, frequency, and impact on project goals, reducing investigation time by 30% and improving team efficiency. This experience developed my structured, detail-oriented approach to problem-solving. To enhance my skill in data, I join RevoU Data Analytics program, building hands-on skills in data cleaning, exploratory data analysis (EDA), and data visualization using Tableau and Google Colab (Python), with a focus on transforming data into actionable insights that support product, business, and operational decisions.",
  heroBio: "Detail-oriented QA professional with a background in game design. Skilled in data-driven testing, bug analysis, and quality assurance using analytical approaches.",
  email: "Laurensiush.0711@gmail.com",
  linkedin: "linkedin.com/in/laurensius-haryo-radyobaskoro-p-373146177",
  github: "github.com/Parad5050",
  location: "Jakarta, Indonesia",
  phone: "+6285161787119",
  discord: "Parad5050",
  hobbies: ["Data Visualization", "Market Trends", "Python Scripting", "Game Theory"]
};

// ==========================================
// Skills Data
// ==========================================
export const SKILLS: Skill[] = [
  // Technical - Data
  { id: 'skill-python', name: "Python", level: 80, category: 'Data' },
  { id: 'skill-sql', name: "SQL", level: 85, category: 'Data' },
  { id: 'skill-spreadsheets', name: "Spreadsheets", level: 90, category: 'Data' },
  { id: 'skill-tableau', name: "Tableau", level: 85, category: 'Data' },
  { id: 'skill-powerbi', name: "Power BI", level: 75, category: 'Data' },
  { id: 'skill-data-analytics', name: "Data-Driven QA", level: 80, category: 'Data' },
  
  // Technical - QA
  { id: 'skill-manual-testing', name: "Manual Testing", level: 90, category: 'QA' },
  { id: 'skill-postman', name: "Postman", level: 80, category: 'QA' },
  { id: 'skill-javascript', name: "JavaScript", level: 70, category: 'QA' },
  { id: 'skill-unity', name: "Unity", level: 75, category: 'QA' },
  
  // Tools
  { id: 'skill-git', name: "Git/GitHub", level: 75, category: 'Tools' },
  { id: 'skill-vscode', name: "VS Code", level: 85, category: 'Tools' },
  { id: 'skill-jira', name: "Jira", level: 80, category: 'Tools' },
  
  // Soft Skills
  { id: 'skill-analytical', name: "Analytical Thinking", level: 90, category: 'Soft Skill' },
  { id: 'skill-problem-solving', name: "Problem Solving", level: 90, category: 'Soft Skill' },
  { id: 'skill-adaptability', name: "Adaptability", level: 90, category: 'Soft Skill' },
  { id: 'skill-communication', name: "Communication", level: 85, category: 'Soft Skill' },
  { id: 'skill-critical-thinking', name: "Critical Thinking", level: 85, category: 'Soft Skill' },
  { id: 'skill-negotiation', name: "Negotiation", level: 75, category: 'Soft Skill' },
];

// ==========================================
// Education Data
// ==========================================
export const EDUCATION: Education[] = [
  {
    id: 'edu-revou',
    institution: "RevoU",
    degree: "Data-Driven QA Certification",
    period: "October, 2024 – Present",
    location: "Jakarta, Indonesia",
    highlights: [
      "Covered the end-to-end analytics workflow, from defining business problems and hypotheses to data collection, cleaning, and analysis using spreadsheets, SQL, and Python.",
      "Visualized insights with Tableau and Power BI, effectively communicating actionable recommendations to stakeholders."
    ]
  },
  {
    id: 'edu-binus',
    institution: "Binus University",
    degree: "Computer Science",
    period: "August, 2017 – December, 2021",
    location: "Jakarta, Indonesia",
    highlights: [
      "GPA: 3.07 / 4.00"
    ]
  }
];

// ==========================================
// Experience Data
// ==========================================
export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-riseup',
    company: "Rise Up Studio",
    role: "Co-Founder & Game Designer",
    period: "July, 2020 – May, 2022",
    location: "Jakarta, Indonesia",
    isQA: false,
    description: [
      "Co-founded a game studio focused on developing competitive mobile games.",
      "Led game design for a team of 5 developers, creating engaging gameplay mechanics.",
      "Managed project timelines and coordinated between design and development teams.",
      "Conducted market research to identify player preferences and trending genres."
    ]
  },
  {
    id: 'exp-forgefun',
    company: "Forgefun",
    role: "QA Tester",
    period: "August, 2023 – November, 2024",
    location: "Jakarta, Indonesia",
    isQA: true,
    description: [
      "Tested game features across 5 projects, identifying and documenting 120+ bugs to enhance overall game stability and quality.",
      "Validated API responses and AI chat behaviors, enhancing system reliability by resolving over 50 issues during feature development.",
      "Employed data-driven approaches to detect patterns in bugs and inconsistencies, facilitating informed decision-making."
    ]
  },
  {
    id: 'exp-wisgame',
    company: "Wisgame",
    role: "Game Designer",
    period: "June, 2022 – June, 2023",
    location: "Jakarta, Indonesia",
    isQA: false,
    description: [
      "Designed over 30 character stats and abilities, along with comprehensive level layouts, enhancing player experience and balance.",
      "Balanced game mechanics for 12 unique characters, improving game fairness and leading to a 20% increase in user satisfaction based on feedback.",
      "Documented over 50 entries for game design processes, establishing a structured reference that improved team communication by 30%.",
      "Created and assigned tasks aligned with project goals, resulting in timely completion of milestones and improved workflow.",
      "Formulated balancing formulas for character abilities, leading to a 25% improvement in overall player balance.",
      "Mocked-Up UI/UX layouts for 3 major game interfaces, improving user navigation and reducing confusion by 20%."
    ]
  }
];

// ==========================================
// Projects Data
// ==========================================
export const PROJECTS: Project[] = [
  {
    id: 'proj-steam',
    title: "Steam Market Analysis",
    period: "January, 2026 - February, 2026",
    description: "Analyzed 65,751 total games across 58 genres on Steam to identify variables that increase the likelihood of achieving a Metacritic score of 75 or higher.",
    summary: "Analyzed 65,751 total games across 58 genres on Steam to identify variables that increase the likelihood of achieving a Metacritic score of 75 or higher. Evaluated five years of market data using Python and Tableau to inform game development decisions for strategic three-year planning cycles.",
    goals: "Identify variables that increase the likelihood of achieving a Metacritic score of 75 or higher.",
    process: "Utilized data cleaning and exploratory analysis techniques in Google Colab. Evaluated five years of market data using Python and Tableau.",
    output: "Derived strategic insights focusing on genre growth rates and feature adoption. Identified that 70.84% of competitors are indie studios, recommending a 'Premium Indie' strategy.",
    achievements: [
      "Analyzed 65,751 total games across 58 genres on Steam to identify variables that increase the likelihood of achieving a Metacritic score of 75 or higher.",
      "Evaluated five years of market data using Python and Tableau to inform game development decisions for strategic three-year planning cycles.",
      "Identified that 70.84% of competitors are indie studios, recommending a \"Premium Indie\" strategy for optimal algorithmic visibility.",
      "Advised on multiplatform deployment for 99.84% of titles, maximizing market reach and preventing visibility penalties on Steam.",
      "Derived strategic insights focusing on genre growth rates and feature adoption, aiding in early-stage planning and market positioning for future game development.",
      "Utilized data cleaning and exploratory analysis techniques in Google Colab, ensuring high-quality data for comprehensive evaluation."
    ],
    tags: ["Python", "Tableau", "Market Analysis", "Google Colab", "Data Cleaning"],
    metricLabel: "Dataset Size",
    metricValue: 65751,
    link: "https://github.com/Parad5050/steam-market-analysis",
    note: "Recommended a 'Premium Indie' strategy for optimal algorithmic visibility."
  },
  {
    id: 'proj-thaumaturgy',
    title: "Thaumaturgy: Cast and Clash",
    period: "Sept, 2019 - Oct, 2021",
    description: "Created and edited 3 iterations of the Game Design Document (GDD), establishing a clear project vision that enhanced team alignment.",
    summary: "A competitive mage combat game where I led game design. I created and edited 3 iterations of the Game Design Document (GDD), establishing a clear project vision that enhanced team alignment.",
    goals: "Improve player engagement and game fairness through balanced mechanics and intuitive UI.",
    process: "Conducted 6 playtesting sessions with over 50 participants, identifying key areas for refinement.",
    output: "A refined MVP release with balanced character skills and improved UI/UX wireframes.",
    achievements: [
        "Created and edited 3 iterations of the Game Design Document (GDD), establishing a clear project vision that enhanced team alignment.",
        "Designed core gameplay mechanics centered on combo creation, defining 5 unique mechanics that improved player engagement and received positive feedback from 90% of playtesters.",
        "Crafted level designs for 5 distinct environments, enhancing gameplay variety and player interest during testing phases.",
        "Developed 4 wireframes for UI/UX, streamlining user experience and reducing navigational issues by 25% based on player feedback.",
        "Balanced character skills for 8 unique mages, increasing overall game fairness and improving player satisfaction scores by 20%.",
        "Conducted 6 playtesting sessions with over 50 participants, identifying key areas for refinement and enhancing gameplay before MVP release."
    ],
    tags: ["GDD", "Unity", "UI/UX Wireframes", "Playtesting", "Mechanic Design"],
    metricLabel: "Playtester Rating",
    metricValue: 90,
    link: "https://www.notion.so/afa815ade0684865a331e6b64d0889b9",
    note: "Conducted 6 playtesting sessions with over 50 participants."
  },
  {
    id: 'proj-red-convent',
    title: "Red Convent",
    period: "Jan, 2020 - Aug, 2021",
    description: "A Turn-based RPG Mobile Game where I served as Lead Game Designer.",
    summary: "Developed a turn-based RPG game with 12 unique characters and 20+ levels. Created a comprehensive 50-page Game Design Document (GDD) covering all game mechanics, characters, story, and progression systems.",
    goals: "Create an engaging turn-based RPG with balanced mechanics and intuitive UI.",
    process: "Designed and wrote a comprehensive 50-page GDD. Created UI/UX designs for 7 major interfaces. Balanced game mechanics for 12 characters.",
    output: "A polished turn-based RPG with 12 unique characters and 20+ levels, featuring balanced mechanics and improved user experience.",
    achievements: [
      "Developed a turn-based RPG game with 12 unique characters and 20+ levels.",
      "Designed and wrote a comprehensive 50-page GDD covering all game mechanics, characters, story, and progression systems.",
      "Created UI/UX designs for 7 major interfaces, improving user experience by 25%.",
      "Balanced game mechanics for 12 characters to ensure fairness and engaging gameplay."
    ],
    tags: ["Unity", "GDD", "UI/UX Design", "Turn-based RPG", "Character Design"],
    metricLabel: "Characters",
    metricValue: 12,
    link: "",
    note: "Turn-based RPG with 12 unique characters and 20+ levels."
  }
];

// ==========================================
// Chat Storage Keys
// ==========================================
export const STORAGE_KEYS = {
  CHAT_MESSAGES: 'cvport_chat_messages',
  CHAT_LAST_ACCESS: 'cvport_chat_last_access',
} as const;

// ==========================================
// Rate Limiting Constants
// ==========================================
export const CHAT_CONFIG = {
  MESSAGE_COOLDOWN_MS: 1500, // 1.5 seconds between messages
  MAX_MESSAGE_LENGTH: 500,
  MAX_MESSAGES_IN_STORAGE: 50,
} as const;
