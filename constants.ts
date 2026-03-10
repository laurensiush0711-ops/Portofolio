import { Experience, Project, Skill, Education, NavItem } from './types';
import content from './content.json';

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
// UI Text (from content.json)
// ==========================================
export const HERO_SUBTITLE = content.hero.subtitle;
export const CONTACT_TITLE = content.contact.title;
export const CONTACT_DESCRIPTION = content.contact.description;

// ==========================================
// CV Data (from content.json)
// ==========================================
export const CV_DATA = content.cv;

// ==========================================
// Skills Data (from content.json)
// ==========================================
export const SKILLS: Skill[] = content.skills as Skill[];

// ==========================================
// Education Data (from content.json)
// ==========================================
export const EDUCATION: Education[] = content.education as Education[];

// ==========================================
// Experience Data (from content.json)
// ==========================================
export const EXPERIENCES: Experience[] = content.experience as Experience[];

// ==========================================
// Projects Data (from content.json)
// ==========================================
export const PROJECTS: Project[] = content.projects as Project[];

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
