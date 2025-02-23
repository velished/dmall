const config = require('../../config');

module.exports = {
    API: {
        DISCORD: 'https://discordapp.com/api/v9',
        ENDPOINTS: {
            RELATIONSHIPS: '/users/@me/relationships'
        }
    },
    TYPES: {
        FRIEND: 1
    },
    EMOJIS: {
        SUCCESS: '✅',
        ERROR: '❌',
        INFO: 'ℹ️',
        STATS: '📊',
        TIME: '⏱️',
        START: '🚀'
    },
    isBlacklisted: (userId) => {
        return config.blacklist.includes(userId);
    }
}; 