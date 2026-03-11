// ==========================================
// Type Definitions - IMPROVED VERSION
// ==========================================

export interface Experience {
  id: string; // ADDED: Unique identifier
  company: string;
  role: string;
  period: string;
  location: string; // Changed from optional to required for consistency
  description: string[];
  isQA: boolean;
}

export interface Education {
  id: string; // ADDED: Unique identifier
  institution: string;
  degree: string;
  period: string;
  location: string;
  highlights?: string[];
}

export interface Project {
  id: string; // ADDED: Unique identifier
  title: string;
  period: string;
  description: string; // Short version for cards
  summary?: string;    // Long version for case study
  goals?: string;
  process?: string;
  output?: string;
  achievements?: string[];
  tags: string[];
  link?: string;
  links?: { label: string; url: string }[];
  image?: string;
  images?: string[];
  metricLabel: string;
  metricValue: number;
  note?: string;
}

export type SkillCategory = 'QA' | 'Data' | 'Tools' | 'Soft Skill';

export interface Skill {
  id: string; // ADDED: Unique identifier
  name: string;
  level: number; // 0 to 100
  category: SkillCategory;
}

export interface ChatMessage {
  id: string; // ADDED: Unique identifier for React keys
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number; // ADDED: For sorting/persistence
}

// ADDED: Tooltip types for SkillsChart
export interface TooltipPayloadItem {
  payload: {
    subject: string;
    A: number;
    fullMark: number;
  };
  value: number;
}

export interface SkillChartData {
  subject: string;
  A: number;
  fullMark: number;
}

// ADDED: Navigation item type
export interface NavItem {
  id: string;
  label: string;
  number: string;
}

// ADDED: API Error types
export type ApiErrorType = 
  | 'missing_key' 
  | 'invalid_key' 
  | 'timeout' 
  | 'rate_limit' 
  | 'network' 
  | 'unknown';

export interface ApiError {
  type: ApiErrorType;
  message: string;
  recoverable: boolean;
}
