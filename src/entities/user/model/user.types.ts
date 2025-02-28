export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: Gender;
}

export type Gender = 'male' | 'female';
