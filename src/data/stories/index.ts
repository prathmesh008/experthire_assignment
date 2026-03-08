// All Stories for "1 Day As Her" - International Women's Day Experience
import { StoryData } from '@/types/story';

// Story metadata for landing page
export interface StoryPreview {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  character: string;
  role: string;
  theme: string;
  duration: string;
  gradient: string;
  accentColor: string;
  icon: string;
  available: boolean;
  location?: string;
  year?: number;
}

// Preview data for all stories - Original 4 powerful stories
export const storyPreviews: StoryPreview[] = [
  {
    id: 'fatima',
    title: 'Fatima\'s Dream',
    subtitle: 'Right to Education',
    description: 'Experience life as Fatima, a 14-year-old in Kabul who dreams of becoming a doctor. Since the ban on girls\' education, her classroom seat sits empty. But knowledge will find a way.',
    character: 'Fatima',
    role: '14-year-old Student',
    theme: 'Right to Education',
    duration: '8-12 min',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    accentColor: '#f97316',
    icon: '�',
    available: true,
    location: 'Kabul, Afghanistan',
    year: 2023,
  },
  {
    id: 'rose',
    title: 'Rose\'s March',
    subtitle: 'Right to Vote',
    description: 'Step into 1919 New York as Rose, a factory worker and suffragette. The 19th Amendment is one year away. Will you march, or survive? Every choice echoes through history.',
    character: 'Rose',
    role: 'Factory Worker & Suffragette',
    theme: 'Right to Vote',
    duration: '10-15 min',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
    accentColor: '#a78bfa',
    icon: '✊',
    available: true,
    location: 'New York, USA',
    year: 1919,
  },
  {
    id: 'priya',
    title: 'Priya\'s Stand',
    subtitle: 'Workplace Equality',
    description: 'Live a day as Priya, a talented software engineer in Bangalore passed over for promotion while less qualified male colleagues advance. Data doesn\'t lie. Will you?',
    character: 'Priya',
    role: 'Software Engineer',
    theme: 'Workplace Equality',
    duration: '8-10 min',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-600',
    accentColor: '#2dd4bf',
    icon: '💻',
    available: true,
    location: 'Bangalore, India',
    year: 2024,
  },
  {
    id: 'maria',
    title: 'Maria\'s Journey',
    subtitle: 'Single Mother Resilience',
    description: 'Walk in Maria\'s shoes - a single mother of two in Guadalajara, working three jobs while pursuing her nursing degree at night school. Dreams don\'t have deadlines.',
    character: 'Maria',
    role: 'Mother & Nursing Student',
    theme: 'Single Mother Resilience',
    duration: '12-15 min',
    gradient: 'from-rose-500 via-pink-600 to-fuchsia-600',
    accentColor: '#f472b6',
    icon: '�',
    available: true,
    location: 'Guadalajara, Mexico',
    year: 2024,
  },
];

// Statistics for Women's Day messaging
export const womensDayStats = [
  {
    value: '38%',
    label: 'of women report having to provide more evidence of competence',
    source: 'McKinsey 2024',
  },
  {
    value: '50%',
    label: 'of women in tech leave by age 35',
    source: 'Harvard Business Review',
  },
  {
    value: '30%',
    label: 'longer women wait for promotions vs male peers',
    source: 'McKinsey 2024',
  },
  {
    value: '1 in 4',
    label: 'women consider leaving their careers after having children',
    source: 'Deloitte 2024',
  },
];
