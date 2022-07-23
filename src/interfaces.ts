import { mode, mode2 } from "./types";

// create interface for the user
export interface Response {
    message: string;
    data: PersonalBest | Stats | LeaderboardEntry | Result;
}

export interface PersonalBest {
    acc: number;
    consistency: number;
    difficulty: string;
    lazyMode: boolean;
    language: string;
    punctation: boolean;
    raw: number;
    wpm: number;
    timestamp: number;
}

export interface Stats {
    startedTests: number;
    completedTests: number;
    timeTyping: number
}

export interface LeaderboardEntry {
    uid: string;
    acc: number;
    consistency: number;
    lazyMode: boolean;
    name: string;
    punctuation: boolean;
    rank: number;
    raw: number;
    wpm: number;
    timestamp: number;
    discordId: string;
    discordAvatar: string;
    badgeIds: Array<number>;
}

export interface Result {
    _id: string
    wpm: number
    rawWpm: number
    charStats: Array<number>
    acc: number
    mode: mode
    mode2: mode2
    quoteLength: number
    timestamp: number
    restartCount: number
    incompleteTestSeconds: number
    tags: Array<string>
    consistency: number
    keyConsistency: number
    chartData: {
        wpm: Array<number>
        raw: Array<number>
        err: Array<number>
    }
    testDuration: number
    afkDuration: number
    keySpacingStats: {
        average: number
        sd: number
    }
    keyDurationStats: {
        average: number
        sd: number
    }
}