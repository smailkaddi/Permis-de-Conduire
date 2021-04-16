const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/Admin.controller');


router.post('/authentication', AdminController.addAdmin)
router.post('/loginAdmin', AdminController.loginAdmin)
router.post('/updateConducteur/:id', AdminController.updateConducteur)
router.post('/getConducteurById/:id', AdminController.getConductorById)
router.get('/logout', AdminController.logout);




module.exports = router;