const winston = require("winston")

module.exports = function(){
    if(!process.env.JWT_SECRET){
        winston.error("Fata Error: jwt secret key is not defined")
        process.exit(1);
    }
}