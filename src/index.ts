import fetch from 'node-fetch';
import querystring from 'querystring';
import { PersonalBest, Response, Stats, LeaderboardEntry, Result } from './interfaces';
import { mode as modeType, mode2 as mode2Type } from './types';

/**
 * MonkeyTypeSDK
 * @class
 * @classdesc MonkeyTypeSDK class
 * @param {string} apeKey - MonkeyTypeSDK API key (required)
 * @param {string} [apiUrl] - MonkeyTypeSDK base URL (default: https://api.monkeytype.com)
 * 
 */
export default class MonkeyTypeSDK {
    users: { personalBests: ({ mode, mode2 }: { mode: modeType; mode2?: mode2Type | undefined; }) => Promise<Array<PersonalBest>>; stats: () => Promise<Stats>; };
    leaderboards: { get: ({ language, mode, mode2, skip, limit }: { language: string; mode: modeType; mode2: mode2Type; skip?: number | undefined; limit?: number | undefined; }) => Promise<Array<LeaderboardEntry>>; getUsersRank: ({ language, mode, mode2 }: { language: string; mode: modeType; mode2: mode2Type; }) => Promise<LeaderboardEntry>; };
    results: { getLastResult: () => Promise<Result>; };
    constructor(private readonly apeKey: string, private readonly apiUrl = 'https://api.monkeytype.com') {
        if (!apeKey || apeKey == "" ) {
            throw Error('APE(API) key is required');
        }

        this.users = {
            personalBests: this.personalBests.bind(this),
            stats: this.stats.bind(this),
        }
        this.leaderboards = {
            get: this.getLeaderboards.bind(this),
            getUsersRank: this.getUsersRank.bind(this),
        }
        this.results = {
            getLastResult: this.getLastResult.bind(this),
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async fetch(path: string, options: any = {}): Promise<Response> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `ApeKey ${this.apeKey}`
        };
        const response = await fetch(this.apiUrl + path, {
            ...options,
            headers
        });

        if (response.status !== 200) {
            throw (await response.text());
        }
        return (await response.json()) as Promise<Response>;
    }
    private jsonToQueryString(json: any): string {
        const filteredJson: any = Object.fromEntries(Object.entries(json).filter(([, value]) => value !== undefined && value !== null));

        return querystring.stringify(filteredJson)
    }

    // Users

    /**
     * 
     * @description Gets a user's personal best data
     * @param {string} mode The primary mode (i.e., time) (required)
     * @param {string} mode2 The secondary mode (i.e., 60)
     * @returns {Promise<PersonalBest>}
     */
    private async personalBests({ mode, mode2 }: { mode: string, mode2?: string }): Promise<Array<PersonalBest>> {
        const params: any = this.jsonToQueryString({
            mode,
            mode2
        })        

        const response = await this.fetch('/users/personalBests/?' + params, {
            method: 'GET',
        });

        return (response.data) as unknown as Array<PersonalBest>;
    }

    /**
     * @description Gets a user's typing stats data
     * @returns {Promise<Stats>}
     */
    private async stats(): Promise<Stats> {
        const response = await this.fetch('/users/stats', {
            method: 'GET'
        });
        return (response.data) as Stats;
    }

    // Leaderboards

    /**
     * @description Gets global leaderboard data
     * @param {string} language The leaderboard's language (i.e., english) (required)
     * @param {string} mode The primary mode (i.e., time) (required)
     * @param {string} mode2 The secondary mode (i.e., 60) (required)
     * @param {number} skip How many leaderboard entries to skip
     * @param {number} limit How many leaderboard entries to request
     * @returns {Promise<LeaderboardEntry>} 
     */
    private async getLeaderboards({ language, mode, mode2, skip, limit }: { language: string, mode: string, mode2: string, skip?: number, limit?: number }): Promise<Array<LeaderboardEntry>> {
        if (!language) {
            throw new Error('"language" is required');
        }
        if (!mode) {
            throw new Error('"mode" is required');
        }
        if (!mode2) {
            throw new Error('"mode2" is required');
        }

        const params: any = this.jsonToQueryString({
            language,
            mode,
            mode2,
            skip,
            limit
        })

        const response = await this.fetch('/leaderboards/?' + params, {
            method: 'GET',
        });
        
        return (response.data) as unknown as Array<LeaderboardEntry>;
    }

    /**
     * @description Gets your qualifying rank from a leaderboard
     * @param {string} language The leaderboard's language (i.e., english) (required)
     * @param {string} mode The primary mode (i.e., time) (required)
     * @param {string} mode2 The secondary mode (i.e., 60) (required)
     * @returns {Promise<LeaderboardEntry>} 
     */
    private async getUsersRank({ language, mode, mode2 }: { language: string, mode: string, mode2: string }): Promise<LeaderboardEntry> {
        if (!language) {
            throw new Error('"language" is required');
        }
        if (!mode) {
            throw new Error('"mode" is required');
        }
        if (!mode2) {
            throw new Error('"mode2" is required');
        }

        const params: any = this.jsonToQueryString({
            language,
            mode,
            mode2
        })

        const response = await this.fetch('/leaderboards/rank/?' + params, {
            method: 'GET',
        });

        return (response.data) as LeaderboardEntry;
    }

    // Results

    /**
     * @description Gets a user's last saved result
     * @returns {Promise<Result>}
     */

    private async getLastResult(): Promise<Result> {
        const response = await this.fetch('/results/last', {
            method: 'GET'
        });
        return (response.data) as Result;
    }
}