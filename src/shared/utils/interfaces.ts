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
    _id: string,
    name: string,
    muscleGroups: string[]
  }

  export interface Param {
    name?: string,
    group?: string
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