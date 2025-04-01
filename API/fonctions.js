module.exports = (app, models) => {
  const {
    Utilisateur,
    Jeu,
    Trophee,
    JeuxUtilisateur,
    LiaisonSteam,
    ProgressionUtilisateur,
  } = models;

  // ========== UTILISATEURS ==========
  app.get('/utilisateurs', async (req, res) => {
    try {
      const utilisateurs = await Utilisateur.findAll();
      res.json(utilisateurs);
    } catch (err) {
      console.error("❌ Erreur récupération utilisateurs :", err);
      res.status(500).json({ error: "Erreur récupération utilisateurs." });
    }
  });

  app.post('/utilisateurs', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await Utilisateur.create({ username, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      console.error("❌ Erreur création utilisateur :", err);
      res.status(500).json({ error: "Erreur création utilisateur." });
    }
  });

  // ========== JEUX ==========
  app.get('/jeux', async (req, res) => {
    try {
      const jeux = await Jeu.findAll();
      res.json(jeux);
    } catch (err) {
      console.error("❌ Erreur récupération jeux :", err);
      res.status(500).json({ error: "Erreur récupération jeux." });
    }
  });

  app.post('/jeux', async (req, res) => {
    try {
      const { nom } = req.body;
      const jeu = await Jeu.create({ nom });
      res.status(201).json(jeu);
    } catch (err) {
      console.error("❌ Erreur création jeu :", err);
      res.status(500).json({ error: "Erreur création jeu." });
    }
  });

  // ========== TROPHEES ==========
  app.get('/trophees', async (req, res) => {
    try {
      const trophees = await Trophee.findAll();
      res.json(trophees);
    } catch (err) {
      console.error("❌ Erreur récupération trophées :", err);
      res.status(500).json({ error: "Erreur récupération trophées." });
    }
  });

  app.post('/trophees', async (req, res) => {
    try {
      const { nom, jeu_id } = req.body;
      const trophee = await Trophee.create({ nom, jeu_id });
      res.status(201).json(trophee);
    } catch (err) {
      console.error("❌ Erreur création trophée :", err);
      res.status(500).json({ error: "Erreur création trophée." });
    }
  });

  // ========== LIAISON STEAM ==========
  app.get('/liaison-steam', async (req, res) => {
    try {
      const liaisons = await LiaisonSteam.findAll();
      res.json(liaisons);
    } catch (err) {
      console.error("❌ Erreur récupération liaison Steam :", err);
      res.status(500).json({ error: "Erreur récupération liaison Steam." });
    }
  });

  app.post('/liaison-steam', async (req, res) => {
    try {
      const { utilisateur_id, steam_id } = req.body;
      const liaison = await LiaisonSteam.create({ utilisateur_id, steam_id });
      res.status(201).json(liaison);
    } catch (err) {
      console.error("❌ Erreur création liaison Steam :", err);
      res.status(500).json({ error: "Erreur création liaison Steam." });
    }
  });

  // ========== JEUX UTILISATEUR ==========
  app.get('/jeux-utilisateur', async (req, res) => {
    try {
      const relations = await JeuxUtilisateur.findAll();
      res.json(relations);
    } catch (err) {
      console.error("❌ Erreur récupération jeux-utilisateur :", err);
      res.status(500).json({ error: "Erreur récupération jeux-utilisateur." });
    }
  });

  app.post('/jeux-utilisateur', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.body;
      const relation = await JeuxUtilisateur.create({ utilisateur_id, jeu_id });
      res.status(201).json(relation);
    } catch (err) {
      console.error("❌ Erreur création relation jeux-utilisateur :", err);
      res.status(500).json({ error: "Erreur création relation jeux-utilisateur." });
    }
  });

  // ========== PROGRESSION UTILISATEUR ==========
  app.get('/progression-utilisateur', async (req, res) => {
    try {
      const progressions = await ProgressionUtilisateur.findAll();
      res.json(progressions);
    } catch (err) {
      console.error("❌ Erreur récupération progression utilisateur :", err);
      res.status(500).json({ error: "Erreur récupération progression utilisateur." });
    }
  });

  app.post('/progression-utilisateur', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id, progression, derniere_mise_a_jour } = req.body;
      const progress = await ProgressionUtilisateur.create({
        utilisateur_id, jeu_id, progression, derniere_mise_a_jour
      });
      res.status(201).json(progress);
    } catch (err) {
      console.error("❌ Erreur création progression utilisateur :", err);
      res.status(500).json({ error: "Erreur création progression utilisateur." });
    }
  });
};
