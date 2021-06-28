var express = require('express');
var router = express.Router();
var getIP = require('ipware')().get_ip;
var log = require('log4js').getLogger("personal");
const data = require("../db")

router.use(function(req, res, next) {
    let name = req.params.name
    var ip_info = getIP(req);
    res.ip_info = ip_info
    log.debug(JSON.stringify({request : name  ,ip : res.ip_info}))
    next();
})
 
router.get('/', function(req, res) {
log.debug(res.ip_info)
  res.send({data})
});

router.get("/:name" , (req,res)=>{
    let name = req.params.name
    let person = data.filter(per => per.first_name.toLowerCase().match(name.toLowerCase()))
    log.debug(JSON.stringify({ response : person}))
    res.status(200).json({data : person})
})

module.exports = router;
