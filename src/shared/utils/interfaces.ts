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