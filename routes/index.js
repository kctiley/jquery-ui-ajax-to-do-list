var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/jquery-ui-ajax-to-do-list');
var taskCollection = db.get('taskCollection')


/* GET home page. */
router.get('/', function(req, res, next) {
  taskCollection.find({}, function(err, record){
    res.render('index', { title: 'To Do List', allTasks: record });
  })
});

router.get('/tasks', function(req, res) {
    taskCollection.find({},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;
