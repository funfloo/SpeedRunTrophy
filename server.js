// 📦 INSTALLER LES DÉPENDANCES AVANT :
// npm install express express-session passport passport-steam mysql2

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// === CONNEXION MYSQL ===
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "speedrun"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connecté à MySQL");
});

// === SESSION & PASSPORT ===
app.use(session({
  secret: "super-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Utile en local HTTP
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new SteamStrategy({
  returnURL: "http://localhost:3000/auth/steam/return",
  realm: "http://localhost:3000/",
  apiKey: "9B79456AE2422A57C047F6FAD331C21B"
}, (identifier, profile, done) => {
  const steamID = profile.id;
  const displayName = profile.displayName;
  const profileURL = profile._json.profileurl;
  const avatar = profile._json.avatarfull;

  db.query("SELECT * FROM users WHERE steam_id = ?", [steamID], (err, results) => {
    if (err) return done(err);
    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      db.query(
        "INSERT INTO users (steam_id, display_name, profile_url, avatar) VALUES (?, ?, ?, ?)",
        [steamID, displayName, profileURL, avatar],
        (err, result) => {
          if (err) return done(err);
          return done(null, {
            id: result.insertId,
            steam_id: steamID,
            display_name: displayName,
            profile_url: profileURL,
            avatar: avatar
          });
        });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.steam_id);
});

passport.deserializeUser((steamID, done) => {
  db.query("SELECT * FROM users WHERE steam_id = ?", [steamID], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

// === ROUTES D'AUTHENTIFICATION ===
app.get("/auth/steam", passport.authenticate("steam"));

app.get("/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/login.html" }),
  (req, res) => {
    res.redirect("/dashboard.html");
  });

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login.html");
  });
});

// === ROUTE POUR RÉCUPÉRER L'UTILISATEUR CONNECTÉ ===
app.get("/api/user", (req, res) => {
  console.log("🧠 /api/user demandé");
  if (!req.isAuthenticated?.() || !req.user) {
    console.log("⚠️ Utilisateur non connecté.");
    return res.status(401).json({ error: "Non connecté" });
  }
  console.log("✅ Utilisateur connecté :", req.user.display_name);
  res.json(req.user);
});

// === FICHIERS STATIQUES ===
app.use(express.static("../frontend"));

// === DÉMARRAGE DU SERVEUR ===
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
