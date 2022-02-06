var Session = require('../utils/session');
var Driver = require('../utils/driver');
var passport = require('passport');
var driver = Driver(process.env);
var express = require('express');
var dbObject = Session(driver);
var router = express.Router();

router.get('/:id',async(req,res,next) => {
	try{
	  var session = dbObject.create(
      dbObject.driver
  	)
  	var {records} = await session.run(
      `match(highschool)<-[:highschool]-(u:user{
      id:$id}) return highschool`,req.params
  	)

    var fields = records.map(({_fields}) => {
      return _fields.map(({properties}) => {
        return properties
      })
    })

    var properties = fields.map(([{id,...x}]) => {
      return x
    })

    res.status(200).send(properties) 
	}
	catch({message}){
	  res.status(500).send(
        message
	  )
	}
})

module.exports = router