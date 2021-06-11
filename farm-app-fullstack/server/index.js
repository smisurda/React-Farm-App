const express = require('express');

const db  = require('../farm_data.json');

let app = express();

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next){
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*'
	})
	next();
});

/*let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});*/


/**
 * @ROUTE GET farms/
 * Returns all farms in the "database"
 */
app.get('/api/farms', function(req, res, next){
  res.send(db);
});

/**
 * @param min The minimum value
 * @param max The maximum value
 * @ROUTE GET farms/revenue/?min=0&max=100000
 * Returns all farms between the min and max range
 * If a max is not selected, infinity is used 
 */
app.get('/api/farms/revenue/', function(req, res, next){
  var min = req.query.min;
  var max = req.query.max;

  if(min) {
    min = parseFloat(min);
  }
  else {
    min = -Infinity;
  }

  if(max) {
    max = parseFloat(max);
  }
  else {
    max = Infinity;
  }

  var farmIDs = [];

  // Iterate over the list of farms, returning those in the range
  for(let farm in db) {
  	if(db[farm].revenue >= min && db[farm].revenue <= max) {
  		farmIDs.push(farm)
  	}
  }

  if(farmIDs.length > 0) {
  	res.send({'farmIDs': farmIDs});
  }
  else {
  	res.send({'farmIDs': [], msg: `No farm in range [${min}, ${max}] found`});
  }
});

/**
 * @param name The search string
 * @ROUTE GET farms/search/?name=McDonald
 * Returns all farms matching the search string, case insensitive
 */
app.get('/api/farms/search/:name?', function(req, res, next){
  var query = req.query.name;

  if(!query) {
    next('No name provided');
    return;
  }

  // Multiple farms could have the same name, so we'll return an
  // array of matching ids
  var farmIDs = [];

  for(let farm in db) {
    // Case insensitive search by forcing to lowercase
    if(db[farm].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
      farmIDs.push(farm)
    }
  }

  if(farmIDs.length > 0) {
    res.send({'farmIDs': farmIDs});
  }
  else {
    res.send({'farmIDs': [], 'msg': 'No farm with name '+query+' found'});
  }
});

/**
 * @param id The farm ID
 * @ROUTE GET farm/1
 * Returns the farm matching the specified ID
 */
// localhost:3000/api/farm/1
app.get('/api/farm/:id', function(req, res, next){
  var id = req.params.id;
  if(!id) {
	  next('No id provided');
  	return;
  }
  var farm = db[id];

  if (farm) res.send(farm);
  else next();
});

module.exports = app;