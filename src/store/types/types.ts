export interface InitialUser {
    loading: boolean;
}
export interface UserObj {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: any;
}

export interface IMovie {
    id: number;
    title: string;
    image_desc: string;
    image: string;
    grade: number;
    date: Date;
    author: string;
    description: string;
    Age_limit: number;
    time: number;
}
export interface Iseries {
    id: number;
    title: string;
    description: string;
    date: Date;
    series_image: string;
}
export interface ISeries {
    id: number;
    title: string;
    image: string;
    grade: number;
    series: Iseries[];
    description: string;
    Age_limit: number;
}
export interface IUser {
    login: string;
    fullName: string;
    password: number;
    roleId: number;
}
export interface Tokens {
    access: string;
    refresh: string;
}
export interface Read {
    read(url: string): void;
}
