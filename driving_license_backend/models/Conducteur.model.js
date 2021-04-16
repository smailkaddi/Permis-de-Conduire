const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Conducteur = new Schema(
    {
       matricule : {
           type : String,
           required : true,
           trim : true,
    },
        fullName : {
            type : String,
            required : true,
            trim : true,
    },
        email : {
            type : String,
            required : true,
            trim : true,
    },
        password : {
            type : String,
            required : true,
            trim : true,
    },
        telephone : {
            type : String,
            required : true,
            trim : true,
    },
        adresse : {
            type : String,
            required : true,
            trim : true,
    },
        numero_de_Permis : {
            type : String,
            required : true,
            trim : true,
    },
        nombre_de_Point : {
            type : Number,
            default:30,
     
    },
        validateCompte : {
            type : Boolean,
            default:false,
            required : true,
            trim : true,
    },
        role : {
            type : String,
            default:"Conducteur",
            required : true,
            trim : true,
    },     
  }
);
const ConducteurList = mongoose.model("Conducteur", Conducteur);
module.exports = ConducteurList;