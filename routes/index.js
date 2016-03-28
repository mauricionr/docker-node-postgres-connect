var express = require('express'),
	router = express.Router();

// homepage-- get all messages
router.get('/', function(req, res, next) {
	
	req.app.get("models").Message.findAll().then(function(messages) {
		res.render('index', { title: 'My App' , messages: messages});
	});
	
});
//get a single message
router.get('/:id', function(req, res, next) {
	
	req.app.get("models").Message.findById(req.params.id).then(function(message) {
		res.render('index', { title: 'My App' , message: message});
	}).catch(function(err) {
		res.redirect(404,'/');
	});
	
});

//new message
router.post('/', function(req, res, next) { 
    dataobj = req.body;
	
	req.app.get("models")
	.Message.create(dataobj)
	.then(function(newmsg) {
		res.redirect('/');
	}).catch(function(err) {
		res.redirect(500,'/');
	});
});

router.put('/:id', function(req, res, next) { 
    dataobj = req.body;
	
	req.app.get("models")
	.Message.update(dataobj,{where: {id:dataobj.id}})
	.then(function() {
		res.redirect('/' + dataobj.id);
	}).catch(function(err) {
		res.redirect(500,'/');
	});
});

router.delete('/:id', function(req, res, next) { 
    dataobj = req.body;
	
	req.app.get("models")
	.Message.destroy({where: {id:dataobj.id}})
	.then(function() {
		res.redirect('/');
	}).catch(function(err) {
		res.redirect(500,'/');
	});
});


module.exports = router;
