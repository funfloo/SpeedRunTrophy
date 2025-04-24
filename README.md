# 🏆 Speedrun Trophy - Remake (Node.js + Steam Auth)

## 🚀 Description
Speedrun Trophy est une application web qui permet aux utilisateurs de se connecter via Steam pour suivre leurs trophées, accéder à un dashboard personnalisé, et à terme, consulter leur classement ou d'autres stats de speedrun. Cette version est un **remake 100% Node.js**, remplaçant XAMPP/PHP par un serveur Express moderne.

---

## 🧰 Technologies utilisées
- **Node.js** : environnement JavaScript backend
- **Express** : framework web pour créer le serveur
- **Passport** : gestion de l'authentification
- **passport-steam** : stratégie d'authentification via Steam OpenID
- **MySQL** : base de données utilisée (via XAMPP ou autre)
- **express-session** : gestion des sessions utilisateur
- **HTML/CSS** : frontend statique

---

## 📂 Structure du projet
```
SpeedRunTrophy_REMAKE/
├── frontend/         # Fichiers HTML/CSS du site
│   ├── login.html
│   ├── dashboard.html
│   ├── index.html
│   └── header.html
├── backend/          # Serveur Node.js + gestion MySQL/Steam
│   ├── server.js
│   └── package.json
```

---

## ✅ Fonctionnalités principales
- Connexion via Steam
- Session persistante avec express-session
- Dashboard personnalisé affichant avatar et pseudo Steam
- Bouton de déconnexion fonctionnel
- Redirection automatique en cas de déconnexion


---

## 🔧 Installation & lancement
1. **Cloner le repo et installer les dépendances**
```bash
cd backend
npm install
```

2. **Configurer la base de données MySQL (via phpMyAdmin ou CLI)**
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

3. **Ajouter votre clé Steam Web API dans `server.js`**
👉 Obtenez-la ici : https://steamcommunity.com/dev/apikey

```js
apiKey: "YOUR_STEAM_API_KEY"  // à remplacer dans server.js
```

4. **Lancer le serveur**
```bash
npm start
```

5. **Accéder à l'app**
Ouvrez votre navigateur :
```
http://localhost:3000/login.html
```

---

## 📦 Dépendances principales
- express
- express-session
- passport
- passport-steam
- mysql2

---



