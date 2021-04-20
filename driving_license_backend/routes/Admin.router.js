const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/Admin.controller');


router.post('/authentication', AdminController.addAdmin)
router.post('/loginAdmin', AdminController.loginAdmin)
router.put('/updateConducteur/:id', AdminController.updateConducteur)
router.get('/getConducteurById/:id', AdminController.getConductorById)
router.get('/getAllConducteur', AdminController.getAllConducteur);
router.get('/', AdminController.getAdmin);
router.get('/logout', AdminController.logout);




module.exports = router;