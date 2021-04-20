const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const Admin = require('../models/Admin.model');
const Conducteur = require('../models/Conducteur.model');

const { inputValidationSchema  } = require("./XssValidation");

//_______________________  Admin authentication________________________

const addAdmin = (req, res) => {

    let error = [];
  
          
    const { err } = inputValidationSchema.validate(req.body)
    if (err) {
  
            
  
            error.push(err.details[0].message);
            return res.json({
  
                    error : error
            }) 
  
    };
         
          bcrypt.hash(req.body.password, 10, function(err, hashPassword) {
              if (err) {
                res.json({error : err})    
              }
          const fullName = req.body.fullName;
          const email = req.body.email;
          const login = req.body.login;
          const password = hashPassword;
          const AdminPush = new Admin({
            fullName,
            email,
            login,
            password,  
          });
          AdminPush
            .save()
            .then(() => res.json("Admin authentication successfully"))
            .catch((err) => res.status(400).json("Error :" + err));
        });
        }
        
        //-------------------------login  Admin-----------------------------
        
        const loginAdmin = (req, res) => {
        
          let error = [];
  
          
          const { err } = inputValidationSchema.validate(req.body)
          if (err) {
        
                  
        
                  error.push(err.details[0].message);
                  return res.json({
        
                          error : error
                  }) 
        
          };
  
          let login=req.body.login;
          let password=req.body.password;
        
          Admin.findOne({login : login})
        .then(admin => {
        
        if(admin){
          bcrypt.compare(password, admin.password, function(err, result){
              if (err) {
                  res.json({
                    error : err
                  })
                }
             if(result){
                let token=jwt.sign({login :login},'tokenkey',(err,token) => {
                  res.cookie("token", token)  
                  res.json({
                      token : token
                  })
                })
             }
             
          })
        }else{
          res.json({
              message : 'Admin not found'
          })
        }
        }).catch((err) => res.status(400).json("Error :" + err));
        }
  
   //-------------------------logout  Admin and remove token-----------------------------   
       const logout = (req, res) => {
          const deconnect = res.clearCookie("token")
        
          res.json({
              message: 'Admin is Signout !!'
          })
        }
  //________________________updating Conducteur____________________
const updateConducteur = async(req, res) => {
    // Find Product By ID and update it
    Conducteur.updateOne({
        _id: req.params.id
      }, {
        nombre_de_Point: req.body.nombre_de_Point,
        infraction:req.body.infraction
      })
      .then(() => res.status(201))
      .catch((err) => res.status(400).json("Error :" + err));

        Conducteur.findById(req.params.id)
            .then(Conducteur => {
              res.status(200).json(Conducteur.email);
              email = Conducteur.email;
             
          // send notification in email
      const transport = nodemailer.createTransport({
 
        service: "gmail",
            auth: {
                user: 'elhanchaoui.emailtest@gmail.com',//email
                pass: 'Taoufiq@2020'//password
            }
        })
        // email = Conducteur.email;
        transport.sendMail({
            from: 'elhanchaoui.emailtest@gmail.com',
            to:email ,
            subject: "Nombre de Point",
            html: `<div className="email" style="
            border: 1px solid red;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
            text-align: center; 
            color:red;
            ">
            <h2>We sorry to know that</h2>
            <h4>Your Point changed to ${req.body.nombre_de_Point}</h4>
            <h4>Because of ${req.body.infraction}</h4>
            <p>Please pay attention<p>
             </div>
        `
        })
      })
  };
  
      //-------------------------get All Conducteur-----------------------------   
  
      const getAllConducteur = (req, res) => {
        Conducteur.find()
          .then(ConducteurInfos => {
            res.status(200).json(ConducteurInfos);
          }).catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
          });
      }; 
        //-------------------------get All Admin-----------------------------   
  
        const getAdmin = (req, res) => {
          Admin.find()
            .then(Admin => {
              res.status(200).json(Admin);
            }).catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
        }; 
    
  // ______________________get conductor by id__________________
  const getConductorById = (req, res) => {
    Conducteur.findById(req.params.id)
        .then(Conducteur => {
          res.status(200).json(Conducteur);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Conducteur not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Category with id " + req.params.id,
                error: err
            });
        });
  };  
   
module.exports={
        addAdmin,loginAdmin,logout,updateConducteur,getConductorById,getAllConducteur,getAdmin
};