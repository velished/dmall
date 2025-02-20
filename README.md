# Discord Mass DM

Un script simple et efficace pour envoyer des messages privés à tous vos amis

## 🚀 Installation

1. Clonez le repository
```bash
git clone https://github.com/velished/dm-all.git
cd dm-all
```

2. Installez les dépendances
```bash
npm i
```

3. Configurez votre token dans `config.js`
```js
module.exports = {
    token: "VOTRE_TOKEN_ICI",
    message: "Votre message",
    delai: 500
}
```

## 📝 Configuration

Le fichier `config.js` contient trois paramètres :
- `token` : Votre token Discord
- `message` : Le message à envoyer
- `delai` : Délai entre chaque message en millisecondes

## 💻 Utilisation

```bash
npm start
```

## 📊 Fonctionnalités

- ✨ Interface claire
- 📝 Envoi automatisé
- ⏱️ Délai configurable entre les messages
- 📊 Statistiques détaillées
- ❌ Gestion des erreurs

## ⚠️ Avertissement

Ce script est à utiliser de manière responsable. L'envoi massif de messages peut être considéré comme du spam par Discord. Utilisez des délais raisonnables entre les messages.