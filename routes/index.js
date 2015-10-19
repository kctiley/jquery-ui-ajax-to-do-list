var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/jquery-ui-ajax-to-do-list');
var taskCollection = db.get('taskCollection')


/* GET home page. */
router.get('/', function(req, res, next) {
  taskCollection.find({}, function(err, record){
    res.render('index', { title: 'To Do List'});
  })
});

router.get('/tasks', function(req, res) {
    taskCollection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/tasks', function(req, res){
  taskCollection.insert(req.body, function(err, result){
    res.send(
            (err === null) ? { msg: '' } : { msg: err }
    );
  })
})

router.delete('/tasks/delete/:_id', function(req, res){
  console.log("Delete id ...." + req.params._id)
  taskCollection.remove({_id: req.params._id}, function(err, record){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  })
})  

module.exports = router;
