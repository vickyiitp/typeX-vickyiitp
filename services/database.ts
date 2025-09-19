
import { WorldwideStatsData } from '../types';
import { fetchApi } from './apiService';

/**
 * Fetches the worldwide stats from the backend server.
 * @returns {Promise<WorldwideStatsData | null>} The stats, or null on error.
 */
export const getWorldwideStats = async (): Promise<WorldwideStatsData | null> => {
    console.log("Fetching data from backend API...");
    try {
        const stats = await fetchApi<WorldwideStatsData>('/api/stats', 'GET');
        return stats;
    } catch (error) {
        console.error("Failed to retrieve stats from backend:", error);
        return null;
    }
};

/**
 * Saves the worldwide stats by sending them to the backend server.
 * @param {WorldwideStatsData} stats The stats object to save.
 * @returns {Promise<void>}
 */
export const saveWorldwideStats = async (stats: WorldwideStatsData): Promise<void> => {
    console.log("Saving data to backend API...", stats);
    try {
        await fetchApi('/api/stats', 'POST', { stats });
    } catch (error) {
        console.error("Failed to save stats to backend:", error);
    }
};
