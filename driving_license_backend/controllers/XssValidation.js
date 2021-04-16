const xss = require("joi");

exports.inputValidationSchema = xss.object({ 
    matricule: xss.string().min(5).required(),
    fullName: xss.string().min(3).required(),
    email: xss.string().email().required(),
    adress: xss.string().min(3).required(),
    telephone: xss.string().min(10).max(14).required(),
    password: xss.string().min(3).required(),
    numero_de_Permis:xss.string().min(6).required(),
})