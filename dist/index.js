"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const querystring_1 = __importDefault(require("querystring"));
/**
 * MonkeyTypeSDK
 * @class
 * @classdesc MonkeyTypeSDK class
 * @param {string} apeKey - MonkeyTypeSDK API key (required)
 * @param {string} [apiUrl] - MonkeyTypeSDK base URL (default: https://api.monkeytype.com)
 *
 */
class MonkeyTypeSDK {
    constructor(apeKey, apiUrl = 'https://api.monkeytype.com') {
        this.apeKey = apeKey;
        this.apiUrl = apiUrl;
        if (!apeKey || apeKey == "") {
            throw Error('APE(API) key is required');
        }
        this.users = {
            personalBests: this.personalBests.bind(this),
            stats: this.stats.bind(this),
        };
        this.leaderboards = {
            get: this.getLeaderboards.bind(this),
            getUsersRank: this.getUsersRank.bind(this),
        };
        this.results = {
            getLastResult: this.getLastResult.bind(this),
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch(path, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `ApeKey ${this.apeKey}`
            };
            const response = yield (0, node_fetch_1.default)(this.apiUrl + path, Object.assign(Object.assign({}, options), { headers }));
            if (response.status !== 200) {
                throw (yield response.json());
            }
            return (yield response.json());
        });
    }
    jsonToQueryString(json) {
        const filteredJson = Object.fromEntries(Object.entries(json).filter(([, value]) => value !== undefined && value !== null));
        return querystring_1.default.stringify(filteredJson);
    }
    // Users
    /**
     *
     * @description Gets a user's personal best data
     * @param {string} mode The primary mode (i.e., time) (required)
     * @param {string} mode2 The secondary mode (i.e., 60)
     * @returns {Promise<PersonalBest>}
     */
    personalBests({ mode, mode2 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.jsonToQueryString({
                mode,
                mode2
            });
            const response = yield this.fetch('/users/personalBests/?' + params, {
                method: 'GET',
            });
            return (response.data);
        });
    }
    /**
     * @description Gets a user's typing stats data
     * @returns {Promise<Stats>}
     */
    stats() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetch('/users/stats', {
                method: 'GET'
            });
            return (response.data);
        });
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
    getLeaderboards({ language, mode, mode2, skip, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!language) {
                throw new Error('"language" is required');
            }
            if (!mode) {
                throw new Error('"mode" is required');
            }
            if (!mode2) {
                throw new Error('"mode2" is required');
            }
            const params = this.jsonToQueryString({
                language,
                mode,
                mode2,
                skip,
                limit
            });
            const response = yield this.fetch('/leaderboards/?' + params, {
                method: 'GET',
            });
            return (response.data);
        });
    }
    /**
     * @description Gets your qualifying rank from a leaderboard
     * @param {string} language The leaderboard's language (i.e., english) (required)
     * @param {string} mode The primary mode (i.e., time) (required)
     * @param {string} mode2 The secondary mode (i.e., 60) (required)
     * @returns {Promise<LeaderboardEntry>}
     */
    getUsersRank({ language, mode, mode2 }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!language) {
                throw new Error('"language" is required');
            }
            if (!mode) {
                throw new Error('"mode" is required');
            }
            if (!mode2) {
                throw new Error('"mode2" is required');
            }
            const params = this.jsonToQueryString({
                language,
                mode,
                mode2
            });
            const response = yield this.fetch('/leaderboards/rank/?' + params, {
                method: 'GET',
            });
            return (response.data);
        });
    }
    // Results
    /**
     * @description Gets a user's last saved result
     * @returns {Promise<Result>}
     */
    getLastResult() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetch('/results/last', {
                method: 'GET'
            });
            return (response.data);
        });
    }
}
exports.default = MonkeyTypeSDK;
