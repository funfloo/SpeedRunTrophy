// fonctions.js
module.exports = (app, models) => {
  const { User, Game, Trophy, UserTrophy } = models;

  // ======================================
  // Endpoints pour les Users
  // ======================================
  
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll({ include: Trophy });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  });

  app.post('/users', async (req, res) => {
    try {
      const { username, email, password, steam_id } = req.body;
      const newUser = await User.create({ username, email, password, steam_id });
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
    }
  });

  app.put('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await User.update(req.body, { where: { id } });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur.' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await User.update(req.body, { where: { id } });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour partielle de l’utilisateur.' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await User.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur.' });
    }
  });

  app.head('/users', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/users', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ======================================
  // Endpoints pour les Games
  // ======================================

  app.get('/games', async (req, res) => {
    try {
      const games = await Game.findAll();
      res.json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des jeux.' });
    }
  });

  app.post('/games', async (req, res) => {
    try {
      const { name } = req.body;
      const newGame = await Game.create({ name });
      res.status(201).json(newGame);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création du jeu.' });
    }
  });

  app.put('/games/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Game.update(req.body, { where: { id } });
      if (updated) {
        const updatedGame = await Game.findByPk(id);
        res.status(200).json(updatedGame);
      } else {
        res.status(404).json({ error: 'Jeu non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du jeu.' });
    }
  });

  app.patch('/games/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Game.update(req.body, { where: { id } });
      if (updated) {
        const updatedGame = await Game.findByPk(id);
        res.status(200).json(updatedGame);
      } else {
        res.status(404).json({ error: 'Jeu non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour partielle du jeu.' });
    }
  });

  app.delete('/games/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Game.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Jeu non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression du jeu.' });
    }
  });

  app.head('/games', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/games', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });

  // ======================================
  // Endpoints pour les Trophies (maintenant "trophees")
  // ======================================

  app.get('/trophees', async (req, res) => {
    try {
      const trophees = await Trophy.findAll();
      res.json(trophees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des trophées.' });
    }
  });

  app.post('/trophees', async (req, res) => {
    try {
      const { name, game_id } = req.body;
      const newTrophy = await Trophy.create({ name, game_id });
      res.status(201).json(newTrophy);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création du trophée.' });
    }
  });

  app.put('/trophees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Trophy.update(req.body, { where: { id } });
      if (updated) {
        const updatedTrophy = await Trophy.findByPk(id);
        res.status(200).json(updatedTrophy);
      } else {
        res.status(404).json({ error: 'Trophée non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du trophée.' });
    }
  });

  app.patch('/trophees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Trophy.update(req.body, { where: { id } });
      if (updated) {
        const updatedTrophy = await Trophy.findByPk(id);
        res.status(200).json(updatedTrophy);
      } else {
        res.status(404).json({ error: 'Trophée non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour partielle du trophée.' });
    }
  });

  app.delete('/trophees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Trophy.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Trophée non trouvé' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression du trophée.' });
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

  // ======================================
  // Endpoints pour la table de liaison UserTrophy (maintenant "user_trophees")
  // ======================================

  app.get('/user-trophees', async (req, res) => {
    try {
      const userTrophees = await UserTrophy.findAll();
      res.json(userTrophees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des relations user-trophees.' });
    }
  });

  app.post('/user-trophees', async (req, res) => {
    try {
      const { user_id, trophee_id, obtained_date } = req.body;
      const newRelation = await UserTrophy.create({ user_id, trophee_id, obtained_date });
      res.status(201).json(newRelation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création de la relation user-trophees.' });
    }
  });

  app.put('/user-trophees/:user_id/:trophee_id', async (req, res) => {
    try {
      const { user_id, trophee_id } = req.params;
      const [updated] = await UserTrophy.update(req.body, { where: { user_id, trophee_id } });
      if (updated) {
        const updatedRelation = await UserTrophy.findOne({ where: { user_id, trophee_id } });
        res.status(200).json(updatedRelation);
      } else {
        res.status(404).json({ error: 'Relation user-trophees non trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la relation user-trophees.' });
    }
  });

  app.patch('/user-trophees/:user_id/:trophee_id', async (req, res) => {
    try {
      const { user_id, trophee_id } = req.params;
      const [updated] = await UserTrophy.update(req.body, { where: { user_id, trophee_id } });
      if (updated) {
        const updatedRelation = await UserTrophy.findOne({ where: { user_id, trophee_id } });
        res.status(200).json(updatedRelation);
      } else {
        res.status(404).json({ error: 'Relation user-trophees non trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour partielle de la relation user-trophees.' });
    }
  });

  app.delete('/user-trophees/:user_id/:trophee_id', async (req, res) => {
    try {
      const { user_id, trophee_id } = req.params;
      const deleted = await UserTrophy.destroy({ where: { user_id, trophee_id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Relation user-trophees non trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression de la relation user-trophees.' });
    }
  });

  app.head('/user-trophees', async (req, res) => {
    try {
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.options('/user-trophees', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
  });
};