import express from 'express';
import axios from 'axios';
import querystring from 'querystring';

const router = express.Router();

const API_KEY = '9B79456AE2422A57C047F6FAD331C21B'; // ← remplace avec ta clé
const REALM = 'http://localhost:3000';
const RETURN_TO = `${REALM}/api/auth/verify`;

// Étape 1 : redirection vers Steam
router.get('/login', (req, res) => {
  const params = {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': RETURN_TO,
    'openid.realm': REALM,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  };

  const steamURL = 'https://steamcommunity.com/openid/login?' + querystring.stringify(params);
  res.redirect(steamURL);
});

// Étape 2 : retour de Steam → valider la réponse
router.get('/verify', async (req, res) => {
  const params = {
    ...req.query,
    'openid.mode': 'check_authentication',
  };

  try {
    const { data } = await axios.post(
      'https://steamcommunity.com/openid/login',
      querystring.stringify(params),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    if (data.includes('is_valid:true')) {
      const steamID = req.query['openid.identity'].split('/').pop();

      // 🔁 Appel API Steam pour récupérer nom / avatar
      const profileRes = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${steamID}`);
      const player = profileRes.data.response.players[0];

      // 💾 Enregistrer dans la session
      req.session.steam_id = steamID;
      req.session.username = player.personaname;
      req.session.avatar = player.avatarfull;

      console.log('✅ Connexion Steam réussie:', player.personaname);
      return res.redirect('/dashboard.html');
    }

    res.redirect('/login.html');
  } catch (error) {
    console.error('Erreur lors de la vérification Steam:', error.message);
    res.redirect('/login.html');
  }
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login.html'));
});

export default router;
