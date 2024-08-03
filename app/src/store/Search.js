import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchResults: [],
    }),
    actions: {
        setSearchResults(results) {
            this.searchResults = results;
        },
    },
});

export const useDataStore = defineStore('fetchData', {
    state: () => ({
        dataResults: [],
    }),
    actions: {
        setDataResults(results) {
            this.dataResults = results;
        },
    }
})

