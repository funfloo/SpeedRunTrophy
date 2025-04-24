# 🏁 SpeedRun Trophy - Gestionnaire de Succès Steam

## 📌 Présentation

SpeedRun Trophy est une application web qui permet aux joueurs Steam de :

- Se connecter via Steam
- Synchroniser leurs jeux et trophées
- Suivre leurs progrès par jeu
- Relever des missions journalières, hebdomadaires et mensuelles
- Tirer au sort un jeu et un trophée grâce à une roue interactive

---

## 🛠️ Technologies utilisées

- **Frontend** : PHP, HTML, CSS, Bootstrap
- **Backend** :
  - 🟢 Node.js (synchronisation Steam & API)
  - PHP (pour le frontend dynamique)
- **Serveur API** : Node.js + Express (optionnel)
- **Base de données** : MySQL (via phpMyAdmin avec XAMPP)
- **Authentification** : Steam OpenID (via PHP)
- **API externe** : Steam Web API

---

## 📁 Structure du projet

```
SpeedRunTrophy/
├── frontend/         # Pages PHP
├── backend/          # Styles + config
├── API/              # Scripts Node.js & API Express
│   ├── apps.js       # API serveur (optionnel)
│   └── syncSteam.js  # Script de synchronisation Steam
├── database/
│   └── speedrun_trophees.sql
```

---

## ✅ Fonctionnalités

- 🔐 Connexion via Steam
- 🎮 Synchronisation automatique des jeux Steam
- 🏆 Liste des trophées obtenus avec rareté
- 🎡 Roue aléatoire pour sélectionner jeu + trophée
- 📊 Progression utilisateur
- 🎯 Missions du jour/semaine/mois

---

## 🔧 Installation

### 1. Importer la base de données

- Lancer XAMPP et activer Apache + MySQL
- Aller sur http://localhost/phpmyadmin
- Créer une base : `speedrun_trophees`
- Importer `speedrun_trophees.sql`

### 2. Lancer le backend Node.js (API/Sync)

```bash
cd API
npm install
node syncSteam.js
```

### 3. Configurer votre clé Steam

Dans `syncSteam.js`, remplacer :

```js
const API_KEY = "VOTRE_CLE_API_STEAM";
```

---

## 🚀 Branchement alternatif : `site_node.js` (Version full Node.js + Steam)

Sur la branche nodejs, Le projet est disponible avec une architecture 100% Node.js pour la partie connexion.

### 📦 Fonctionnalités :

- Auth via Steam (OpenID) avec `passport-steam`
- Backend full JavaScript (Express)
- Session utilisateur persistante
- Dashboard personnalisé avec profil Steam

### 📁 Structure :

```
SpeedRunTrophy_REMAKE/
├── frontend/         # HTML statique
├── backend/
│   ├── server.js
│   └── package.json
```

### ▶️ Lancement :

```bash
cd backend
npm install
node server.js
```

Accéder à : `http://localhost:3000/login.html`

### 🔐 Exemple de table MySQL à créer :

```sql
CREATE DATABASE speedrun;
USE speedrun;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  steam_id VARCHAR(100) NOT NULL UNIQUE,
  display_name VARCHAR(100),
  profile_url VARCHAR(255),
  avatar VARCHAR(255)
);
```

---

## 📦 Dépendances utilisées

- `express`
- `mysql2`
- `axios`
- `passport`
- `passport-steam`
- `express-session`



---

## ✨ Auteur

Projet développé par CHERMAIN Maxence et MAZZILLI Florian 

---
