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

interface belongs_to_collection {
    id: number;
    backdrop_path: string;
    name: string;
    poster_path: string;
}
interface company {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: any[];
    id: number;
    original_language: string;
    imdb_id?: string;
    generes: any[];
    belongs_to_collection?: belongs_to_collection;
    budget?: number;
    production_companies?: company[];
    production_countries?: any;
    revenue?: number;

    runtime?: number | undefined;
    spoken_languages: any;
    status: string;
    tagline?: string;

    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface created_by_Obj {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
}

export interface ISeries {
    adult: boolean;
    backdrop_path: string;
    created_by: created_by_Obj[];
    episode_run_time?: number[];
    genres?: any[];
    homepage?: string;
    in_production: boolean;
    languages?: any[];
    last_air_date?: Date;
    last_episode_to_air?: any;
    networks?: any[];
    next_episode_to_air?: any;
    number_of_episodes?: number;
    number_of_seasons?: number;
    production_companies?: any[];
    production_countries?: any[];
    seasons?: any[];
    spoken_languages?: any[];
    status?: string;
    tagline?: string;
    first_air_date?: Date;
    genre_ids?: any[];
    id: number;
    name: string;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    vote_average: number;
    vote_count: number;
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
export interface IActors {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface ISeriesDetails {
    adult: boolean;
    backdrop_path: string;
    created_by: created_by_Obj[];
    episode_run_time: number[];
    first_air_date: string;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string;
        vote_average: number;
        vote_count: number;
    };
    name: string;
    next_episode_to_air: null | {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string;
        vote_average: number;
        vote_count: number;
    };
    networks: {
        name: string;
        id: number;
        logo_path: string;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export interface Iguest_stars {
    adult: boolean;
    character: number;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface ISeasonDesc {
    id: number;
    air_date: string;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
    _id: string;
    episodes: {
        air_date: string;
        crew: {
            adult: boolean;
            credit_id: string;
            department: string;
            gender: number;
            id: number;
            job: string;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
        }[];
        episode_number: number;
        episode_type: string;
        guest_stars: Iguest_stars[];
        id: number;
        name: string;
        overview: string;
        production_code: string;
        runtime: number;
        season_number: number;
        show_id: number;
        still_path: string;
        vote_average: number;
        vote_count: number;
    }[];
}
