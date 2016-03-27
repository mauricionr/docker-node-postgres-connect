var express = require('express'),
	router = express.Router();

/* GET entries listings. */
router.get('/list', function(req, res, next) { //query all entries
	req.app.get("models").Entry.findAll()
	.then(function(allEntries) {
		res.status(200).json(allEntries);
	});
}).get("/list/:username", function(req,res,next) { //query for a users entries
	//TODO: check if this is the user requesting this
	req.app.get("models").Entry.findAll({
		where: {owner : req.params.username}
	}).then(function(userEntries) {
		res.status(200).json(userEntries);
	}).catch(function(err) {
		res.status(500);
	});
})

router.post('/', function(req, res, next) { // create a new entry
    dataobj = req.body;
    dataobj.owner = req.user.username;
	req.app.get("models").Entry.create(dataobj).then(function(newEntry) {
		res.status(200).json(newEntry);
	}).catch(function(err) {
		res.status(500);
	});
})

router.get('/:id', function(req, res, next) { //get a single entry
	req.app.get("models").Entry.findById(req.params.id).then(function(entry) {
		res.send(entry);
	});
}).put('/:id', function(req, res, next) { // update a single entry
  res.send('respond with a resource');
}).post('/:id', function(req, res, next) { // duplicate a single entry 
  res.send('respond with a resource');
}).delete('/:id', function(req, res, next) { // delete a single entry
  res.send('respond with a resource');
});



module.exports = router;