export interface RPPMFormData {
  schoolName: string;
  teacherName: string;
  teacherNip: string;
  principalName: string;
  principalNip: string;
  educationLevel: 'SD' | 'SMP';
  className: string;
  semester: string;
  subject: string;
  learningOutcomes: string; // CP
  learningObjectives: string; // TP
  material: string;
  meetingCount: number;
  duration: string;
  pedagogy: string;
  graduateDimensions: string[];
}

export interface GeneratedContent {
  html: string;
}

export enum PedagogyType {
  INQUIRY = 'Inkuiri-Discovery Learning',
  PJBL = 'Project Based Learning (PjBL)',
  PBL = 'Problem Based Learning',
  GAME_BASED = 'Game Based Learning',
  STATION = 'Station Learning',
  TEACHING_GAMES = 'Teaching Games for Understanding (TGfU)'
}

export enum GraduateDimension {
  FAITH = 'Keimanan & Ketakwaan',
  CITIZENSHIP = 'Kewargaan',
  CRITICAL = 'Penalaran Kritis',
  CREATIVITY = 'Kreativitas',
  COLLABORATION = 'Kolaborasi',
  INDEPENDENCE = 'Kemandirian',
  HEALTH = 'Kesehatan',
  COMMUNICATION = 'Komunikasi'
}