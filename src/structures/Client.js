const { Client } = require('discord.js-selfbot-v13');
const config = require('../../config');
const Constants = require('../utils/Constants');

class DiscordClient extends Client {
    constructor() {
        super({ 
            checkUpdate: false,
            autoRedeemNitro: false,
            patchVoice: false
        });

        this.token = config.token;
    }

    async connexion() {
        try {
            await this.login(this.token);
            console.log(`${Constants.COLORS.SUCCESS} Connecté sur ${this.user.tag}`);
            return true;
        } catch (erreur) {
            console.error(`${Constants.COLORS.ERROR} Erreur de connexion:`, erreur.message);
            return false;
        }
    }
}

module.exports = DiscordClient; 