
import { WorldwideStatsData, UserProfile } from '../types';

const STATS_KEY = 'typex_worldwide_stats';
const PROFILE_KEY = 'typex_user_profile';

/**
 * Loads the worldwide stats from local storage.
 * @returns {WorldwideStatsData | null} The stats, or null if not found.
 */
export const loadWorldwideStats = (): WorldwideStatsData | null => {
    try {
        const statsJson = localStorage.getItem(STATS_KEY);
        if (statsJson) {
            return JSON.parse(statsJson);
        }
    } catch (error) {
        console.error("Failed to load worldwide stats from local storage:", error);
    }
    return null;
};

/**
 * Saves the worldwide stats to local storage.
 * @param {WorldwideStatsData} stats The stats object to save.
 */
export const saveWorldwideStats = (stats: WorldwideStatsData): void => {
    try {
        const statsJson = JSON.stringify(stats);
        localStorage.setItem(STATS_KEY, statsJson);
    } catch (error) {
        console.error("Failed to save worldwide stats to local storage:", error);
    }
};

/**
 * Loads the user profile from local storage.
 * @returns {UserProfile | null} The profile, or null if not found.
 */
export const loadUserProfile = (): UserProfile | null => {
    try {
        const profileJson = localStorage.getItem(PROFILE_KEY);
        if (profileJson) {
            return JSON.parse(profileJson);
        }
    } catch (error) {
        console.error("Failed to load user profile from local storage:", error);
    }
    return null;
};

/**
 * Saves the user profile to local storage.
 * @param {UserProfile} profile The profile object to save.
 */
export const saveUserProfile = (profile: UserProfile): void => {
    try {
        const profileJson = JSON.stringify(profile);
        localStorage.setItem(PROFILE_KEY, profileJson);
    } catch (error) {
        console.error("Failed to save user profile to local storage:", error);
    }
};
