const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Admin = new Schema(
    { 
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
        login : {
            type : String,
            required : true,
            trim : true,
    },
        password : {
            type : String,
            required : true,
            trim : true,
    },
        role : {
            type : String,
            default:"Admin",
            required : true,
            trim : true,
    }
    },
    {
        versionKey : false
    }
);

const adminList = mongoose.model("Admin",Admin);
module.exports = adminList;