import { PedagogyType, GraduateDimension } from './types';

export const PEDAGOGY_OPTIONS = [
  { value: PedagogyType.INQUIRY, label: 'Inkuiri-Discovery Learning' },
  { value: PedagogyType.PJBL, label: 'Project Based Learning (PjBL)' },
  { value: PedagogyType.PBL, label: 'Problem Based Learning' },
  { value: PedagogyType.GAME_BASED, label: 'Game Based Learning' },
  { value: PedagogyType.STATION, label: 'Station Learning' },
  { value: PedagogyType.TEACHING_GAMES, label: 'Teaching Games for Understanding (TGfU)' },
];

export const DIMENSION_OPTIONS = [
  { value: GraduateDimension.FAITH, label: 'Keimanan & Ketakwaan' },
  { value: GraduateDimension.CITIZENSHIP, label: 'Kewargaan' },
  { value: GraduateDimension.CRITICAL, label: 'Penalaran Kritis' },
  { value: GraduateDimension.CREATIVITY, label: 'Kreativitas' },
  { value: GraduateDimension.COLLABORATION, label: 'Kolaborasi' },
  { value: GraduateDimension.INDEPENDENCE, label: 'Kemandirian' },
  { value: GraduateDimension.HEALTH, label: 'Kesehatan' },
  { value: GraduateDimension.COMMUNICATION, label: 'Komunikasi' },
];

export const INITIAL_FORM_STATE = {
  schoolName: '',
  teacherName: '',
  teacherNip: '',
  principalName: '',
  principalNip: '',
  educationLevel: 'SD' as const,
  className: '',
  semester: '1',
  subject: 'PJOK',
  learningOutcomes: '',
  learningObjectives: '',
  material: '',
  meetingCount: 1,
  duration: '3 x 35 Menit',
  pedagogy: PedagogyType.GAME_BASED,
  graduateDimensions: [],
};