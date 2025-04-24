module.exports = (app, models) => {
  const {
    Utilisateur,
    Jeu,
    Trophee,
    JeuxUtilisateur,
    LiaisonSteam,
    ProgressionUtilisateur,
  } = models;

  // ================================
  // Endpoints pour Utilisateurs
  // ================================
  app.get('/utilisateurs', async (req, res) => {
    try {
      const utilisateurs = await Utilisateur.findAll();
      res.json(utilisateurs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
    }
  });

  app.post('/utilisateurs', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUtilisateur = await Utilisateur.create({ username, email, password });
      res.status(201).json(newUtilisateur);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
    }
  });

  app.put('/utilisateurs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Utilisateur.update(req.body, { where: { id } });
      if (updated) {
        const updatedUtilisateur = await Utilisateur.findByPk(id);
        res.status(200).json(updatedUtilisateur);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
    }
  });

  app.patch('/utilisateurs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Utilisateur.update(req.body, { where: { id } });
      if (updated) {
        const updatedUtilisateur = await Utilisateur.findByPk(id);
        res.status(200).json(updatedUtilisateur);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour partielle de l'utilisateur." });
    }
  });

  app.delete('/utilisateurs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Utilisateur.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
  });

  app.head('/utilisateurs', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/utilisateurs', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ================================
  // Endpoints pour Jeux
  // ================================
  app.get('/jeux', async (req, res) => {
    try {
      const jeux = await Jeu.findAll();
      res.json(jeux);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des jeux." });
    }
  });

  app.post('/jeux', async (req, res) => {
    try {
      const { nom } = req.body;
      const newJeu = await Jeu.create({ nom });
      res.status(201).json(newJeu);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la création du jeu." });
    }
  });

  app.put('/jeux/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Jeu.update(req.body, { where: { id } });
      if (updated) {
        const updatedJeu = await Jeu.findByPk(id);
        res.status(200).json(updatedJeu);
      } else {
        res.status(404).json({ error: "Jeu non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour du jeu." });
    }
  });

  app.patch('/jeux/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Jeu.update(req.body, { where: { id } });
      if (updated) {
        const updatedJeu = await Jeu.findByPk(id);
        res.status(200).json(updatedJeu);
      } else {
        res.status(404).json({ error: "Jeu non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour partielle du jeu." });
    }
  });

  app.delete('/jeux/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Jeu.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Jeu non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la suppression du jeu." });
    }
  });

  app.head('/jeux', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/jeux', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ================================
  // Endpoints pour Trophees
  // ================================
  app.get('/trophees', async (req, res) => {
    try {
      const trophees = await Trophee.findAll();
      res.json(trophees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des trophées." });
    }
  });

  app.post('/trophees', async (req, res) => {
    try {
      const { nom, jeu_id } = req.body;
      const newTrophee = await Trophee.create({ nom, jeu_id });
      res.status(201).json(newTrophee);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la création du trophée." });
    }
  });

  app.put('/trophees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Trophee.update(req.body, { where: { id } });
      if (updated) {
        const updatedTrophee = await Trophee.findByPk(id);
        res.status(200).json(updatedTrophee);
      } else {
        res.status(404).json({ error: "Trophée non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour du trophée." });
    }
  });

  app.patch('/trophees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Trophee.update(req.body, { where: { id } });
      if (updated) {
        const updatedTrophee = await Trophee.findByPk(id);
        res.status(200).json(updatedTrophee);
      } else {
        res.status(404).json({ error: "Trophée non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour partielle du trophée." });
    }
  });

  app.delete('/trophees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Trophee.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Trophée non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la suppression du trophée." });
    }
  });

  app.head('/trophees', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/trophees', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ================================
  // Endpoints pour JeuxUtilisateur
  // ================================
  app.get('/jeux-utilisateur', async (req, res) => {
    try {
      const relations = await JeuxUtilisateur.findAll();
      res.json(relations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des relations jeux-utilisateur." });
    }
  });

  app.post('/jeux-utilisateur', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.body;
      const newRelation = await JeuxUtilisateur.create({ utilisateur_id, jeu_id });
      res.status(201).json(newRelation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la création de la relation jeux-utilisateur." });
    }
  });

  app.put('/jeux-utilisateur/:utilisateur_id/:jeu_id', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.params;
      const [updated] = await JeuxUtilisateur.update(req.body, { where: { utilisateur_id, jeu_id } });
      if (updated) {
        const updatedRelation = await JeuxUtilisateur.findOne({ where: { utilisateur_id, jeu_id } });
        res.status(200).json(updatedRelation);
      } else {
        res.status(404).json({ error: "Relation jeux-utilisateur non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour de la relation jeux-utilisateur." });
    }
  });

  app.patch('/jeux-utilisateur/:utilisateur_id/:jeu_id', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.params;
      const [updated] = await JeuxUtilisateur.update(req.body, { where: { utilisateur_id, jeu_id } });
      if (updated) {
        const updatedRelation = await JeuxUtilisateur.findOne({ where: { utilisateur_id, jeu_id } });
        res.status(200).json(updatedRelation);
      } else {
        res.status(404).json({ error: "Relation jeux-utilisateur non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour partielle de la relation jeux-utilisateur." });
    }
  });

  app.delete('/jeux-utilisateur/:utilisateur_id/:jeu_id', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.params;
      const deleted = await JeuxUtilisateur.destroy({ where: { utilisateur_id, jeu_id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Relation jeux-utilisateur non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la suppression de la relation jeux-utilisateur." });
    }
  });

  app.head('/jeux-utilisateur', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/jeux-utilisateur', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ================================
  // Endpoints pour LiaisonSteam
  // ================================
  app.get('/liaison-steam', async (req, res) => {
    try {
      const liaisons = await LiaisonSteam.findAll();
      res.json(liaisons);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des liaisons Steam." });
    }
  });

  app.post('/liaison-steam', async (req, res) => {
    try {
      const { utilisateur_id, steam_id } = req.body;
      const newLiaison = await LiaisonSteam.create({ utilisateur_id, steam_id });
      res.status(201).json(newLiaison);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la création de la liaison Steam." });
    }
  });

  app.put('/liaison-steam/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await LiaisonSteam.update(req.body, { where: { id } });
      if (updated) {
        const updatedLiaison = await LiaisonSteam.findByPk(id);
        res.status(200).json(updatedLiaison);
      } else {
        res.status(404).json({ error: "Liaison Steam non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour de la liaison Steam." });
    }
  });

  app.patch('/liaison-steam/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await LiaisonSteam.update(req.body, { where: { id } });
      if (updated) {
        const updatedLiaison = await LiaisonSteam.findByPk(id);
        res.status(200).json(updatedLiaison);
      } else {
        res.status(404).json({ error: "Liaison Steam non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour partielle de la liaison Steam." });
    }
  });

  app.delete('/liaison-steam/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await LiaisonSteam.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Liaison Steam non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la suppression de la liaison Steam." });
    }
  });

  app.head('/liaison-steam', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/liaison-steam', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ================================
  // Endpoints pour ProgressionUtilisateur
  // ================================
  app.get('/progression-utilisateur', async (req, res) => {
    try {
      const progressions = await ProgressionUtilisateur.findAll();
      res.json(progressions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des progressions utilisateur." });
    }
  });

  app.post('/progression-utilisateur', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id, progression, derniere_mise_a_jour } = req.body;
      const newProgression = await ProgressionUtilisateur.create({ utilisateur_id, jeu_id, progression, derniere_mise_a_jour });
      res.status(201).json(newProgression);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la création de la progression utilisateur." });
    }
  });

  app.put('/progression-utilisateur/:utilisateur_id/:jeu_id', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.params;
      const [updated] = await ProgressionUtilisateur.update(req.body, { where: { utilisateur_id, jeu_id } });
      if (updated) {
        const updatedProgression = await ProgressionUtilisateur.findOne({ where: { utilisateur_id, jeu_id } });
        res.status(200).json(updatedProgression);
      } else {
        res.status(404).json({ error: "Progression non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour de la progression utilisateur." });
    }
  });

  app.patch('/progression-utilisateur/:utilisateur_id/:jeu_id', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.params;
      const [updated] = await ProgressionUtilisateur.update(req.body, { where: { utilisateur_id, jeu_id } });
      if (updated) {
        const updatedProgression = await ProgressionUtilisateur.findOne({ where: { utilisateur_id, jeu_id } });
        res.status(200).json(updatedProgression);
      } else {
        res.status(404).json({ error: "Progression non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la mise à jour partielle de la progression utilisateur." });
    }
  });

  app.delete('/progression-utilisateur/:utilisateur_id/:jeu_id', async (req, res) => {
    try {
      const { utilisateur_id, jeu_id } = req.params;
      const deleted = await ProgressionUtilisateur.destroy({ where: { utilisateur_id, jeu_id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Progression non trouvée" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la suppression de la progression utilisateur." });
    }
  });

  app.head('/progression-utilisateur', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/progression-utilisateur', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });
};