const DiscordClient = require('./src/structures/Client');
const MessageManager = require('./src/managers/MessageManager');

async function demarrer() {
    const client = new DiscordClient();
    const messageManager = new MessageManager(client);

    if (await client.connexion()) {
        await messageManager.envoyerMessagesEnMasse();
        process.exit(0);
    } else {
        process.exit(1);
    }
}

demarrer();