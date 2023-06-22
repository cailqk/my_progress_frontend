export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  dateOfBirth: Date;
  height: number;
}

export interface Measurement {
  _id: string;
  photo: string[];
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  biceps: number;
  date: Date;
  userId: string;
}

export interface Exercise_types {
  _id: string;
  name: string;
  muscleGroups: string[];
}

export interface Param {
  name?: string;
  group?: string;
}

export interface Workout {
  _id: string;
  user: string;
  exer: string[];
  date: Date;
}

export interface Exercise {
  _id: string;
  exerciseType: string;
  series: number;
  repetitions?: number;
  weight?: number;
  time?: number;
  distance?: number;
}

export const groups = [
  "chest",
  "back",
  "biceps",
  "triceps",
  "shoulders",
  "abs",
  "legs",
];
