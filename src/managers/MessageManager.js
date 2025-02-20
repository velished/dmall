const axios = require('axios');
const config = require('../../config');
const Constants = require('../utils/Constants');

class MessageManager {
    constructor(client) {
        this.client = client;
        this.message = config.message;
        this.delai = config.delai;
    }

    async recupererAmis() {
        try {
            const reponse = await axios({
                url: `${Constants.API.DISCORD}${Constants.API.ENDPOINTS.RELATIONSHIPS}`,
                method: 'GET',
                headers: { authorization: this.client.token }
            });
            const amis = reponse.data.filter(ami => ami.type === Constants.TYPES.FRIEND);
            console.log(`${Constants.EMOJIS.INFO} Nombre d'amis trouvés: ${amis.length}`);
            return amis;
        } catch (erreur) {
            console.error(`${Constants.EMOJIS.ERROR} Erreur lors de la récupération des amis:`, erreur.message);
            return [];
        }
    }

    async envoyerMessage(utilisateur) {
        try {
            await utilisateur.send(this.message);
            return true;
        } catch {
            return false;
        }
    }

    async envoyerMessagesEnMasse() {
        try {
            console.log(`${Constants.EMOJIS.START} Démarrage de l'envoi des messages...`);
            const amis = await this.recupererAmis();
            const stats = { total: amis.length, succes: 0, echecs: 0 };

            for (const ami of amis) {
                try {
                    const utilisateur = await this.client.users.fetch(ami.user.id);
                    const resultat = await this.envoyerMessage(utilisateur);

                    if (resultat) {
                        console.log(`${Constants.EMOJIS.SUCCESS} Message envoyé à ${ami.user.username}`);
                        stats.succes++;
                    } else {
                        console.log(`${Constants.EMOJIS.ERROR} Échec de l'envoi à ${ami.user.username}`);
                        stats.echecs++;
                    }

                    await this.pause();
                } catch (erreur) {
                    console.log(`${Constants.EMOJIS.ERROR} Erreur avec ${ami.user.username}`);
                    stats.echecs++;
                }
            }

            this.afficherResultats(stats);
            return stats;
        } catch (erreur) {
            console.error(`${Constants.EMOJIS.ERROR} Erreur:`, erreur.message);
            return null;
        }
    }

    afficherResultats(stats) {
        console.log(`\n${Constants.EMOJIS.STATS} Résultats:`);
        console.log(`${Constants.EMOJIS.SUCCESS} Messages réussis: ${stats.succes}`);
        console.log(`${Constants.EMOJIS.ERROR} Messages échoués: ${stats.echecs}`);
        console.log(`${Constants.EMOJIS.INFO} Total: ${stats.total}`);
        console.log(`${Constants.EMOJIS.TIME} Temps estimé: ${this.calculerTemps(stats.total)} minutes\n`);
    }

    calculerTemps(nombreMessages) {
        return Math.round((nombreMessages * this.delai) / 60000 * 100) / 100;
    }

    pause() {
        return new Promise(resolve => setTimeout(resolve, this.delai));
    }
}

module.exports = MessageManager; 