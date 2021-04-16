const express = require('express');
const router = express.Router();
const ConducteurController = require('../controllers/Conducteur.controller');


router.post('/authentication', ConducteurController.addConducteur)
router.put('/activateCompte/:token', ConducteurController.activateCompteConducteur)
router.post('/loginConducteur', ConducteurController.loginConducteur)
router.get('/logout', ConducteurController.logout);




module.exports = router;