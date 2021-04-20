const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt_decode = require('jwt-decode');
const { inputValidationSchema  } = require("./XssValidation");

const Conducteur = require('../models/Conducteur.model');


//------------------------Conducteur authentication---------------------
const addConducteur = async (req, res) => {

    let error = [];
  
          
    const { err } = inputValidationSchema.validate(req.body)
    if (err) {
  
            
  
            error.push(err.details[0].message);
            return res.json({
  
                    error : error
            }) 
  
    };
  
      bcrypt.hash(req.body.password, 10, function (err, hashPassword) {
          if (err) {
              res.json({
                  error: err
              })
          }
          const matricule = req.body.matricule;
          const fullName = req.body.fullName;
          const email = req.body.email;
          const password = hashPassword;
          const telephone = req.body.telephone;         
          const adresse = req.body.adresse;
          const numero_de_Permis = req.body.numero_de_Permis; 
          const nombre_de_Point = "30";
          const validateCompte = false;
          const infraction = "NO infraction yet"
         
          const ConducteurPush = new Conducteur({
              matricule,
              fullName,
              email,
              password,
              telephone,
              adresse,
              numero_de_Permis,
              nombre_de_Point,                 
              validateCompte,
              infraction
          });
           ConducteurPush
          
              .save()
              .then(() => res.json("Conducteur ADDED!!!!!"))
              .catch((err) => res.status(400).json("Error :" + err));
      });
  // ----------------------send email validation -------------------------------   
      const token = jwt.sign({matricule: req.body.matricule, email : req.body.email}, 'tokenkey');
  
      const transport = nodemailer.createTransport({
        service: "gmail",
            auth: {
              user: 'elhanchaoui.emailtest@gmail.com',//email
              pass: 'Taoufiq@2020'//password
            }
        })
      
        await transport.sendMail({
            from: 'elhanchaoui.emailtest@gmail.com',
            to: req.body.email,
            subject: "Email Activated Account",
            html: `
            <h2>Please click on below link to activate your account</h2>
            <p>http://localhost:3030/Conducteur/activateCompte/${token}</p>
        `
        })
    
      
  }
  //------------------------Conducteur authentication---------------------
  const activateCompteConducteur =  async(req, res) => {
      const token = req.params.token;
    
      jwt.verify(token, 'tokenkey');
    
      let decoded = await jwt_decode(token);
      let matricule = decoded.matricule;
    
       await Conducteur.findOneAndUpdate({ matricule: matricule },{validateCompte : true});
    
       res.json({
               message : "your account validated succeffully"
       });
    }
    
  //-------------------------login Conducteur-----------------------------
  const loginConducteur= (req, res) => {
    let error = [];
  
          
    const { err } = inputValidationSchema.validate(req.body)
    if (err) {
  
            
  
            error.push(err.details[0].message);
            return res.json({
  
                    error : error
            }) 
  
    };
  
      let matricule = req.body.matricule;
      let password = req.body.password;
    
      Conducteur.findOne({
        matricule: matricule
        })
        .then(Conducteur => {
    
          if (Conducteur) {
            bcrypt.compare(password, Conducteur.password, function (err, result) {
              if (err) {
                res.json({
                  error: err
                })
              }
              if (result) {
  
                if(Conducteur.validateCompte == false){
                  res.json({
                         validateCompte
                    })
              // }if(Conducteur.role != "Conducteur"){
              //   res.json({
              //     role: Conducteur.role
              //     })
            }else{
  
              let token = jwt.sign({
                matricule: matricule
                }, 'tokenkey', (err, token) => {
                  res.cookie("token", token),
                  // res.cookie("role", role)
                  res.json({
                    token: token,
                    _id: Conducteur._id
                  })
                })
              }
  
  
  
              } 
              
            })
          } else {
            res.json({
              message: 'Conducteur not found'
            })
          }
        }).catch((err) => res.status(400).json("Error :" + err));
    }


   //-------------------------logout Customer and remove token-----------------------------   
   const logout = (req, res) => {
      const deconnect = res.clearCookie("token")
    
      res.json({
          message: 'Conducteur is Signout !!'
      })
    }
  
  module.exports={
      addConducteur,activateCompteConducteur,loginConducteur,logout
    };



