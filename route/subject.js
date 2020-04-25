var express = require('express');
var router = express.Router();
var Subject = require('../models/subject');
var mid  = require('../middleware/requiresLogin.js');

//view subject list

router.get('/subject',mid, function(req,res){
    Subject.find({},function(err,subject){
      if (err) throw err;
      res.render('admin_content/subject',{'subject':subject});
    });
});

router.get('/subject_add',mid, function(req, res) {
  res.render('admin_content/subject_add', { });
});


//Add New Subject

router.post('/subject_add', function (req, res, next) {
    if (
      req.body.subject_name &&
      req.body.subject_darjah
      
        
      ) {
  
      var userData = {
        subject_name: req.body.subject_name,
        subject_darjah: req.body.subject_darjah
        
      
      }
  
      //use schema.create to insert data into the db
      Subject.create(userData, function (err, user) {
        if (err) {
          return next(err)
        } else {
          console.log('Add New Subject');
          return res.redirect('/subject');
        }
      });
  
    } else {
      var err = new Error('All fields have to be filled out');
      err.status = 400;
      return next(err);
    }
  
  });

//subject edit

router.get('/subject/edit/:id',mid, function(req,res){
  Subject.findOne({subject_id:req.params.id},function(err,users){
      res.render('admin_content/edit_subject',{'users':users});
  });
});

router.post('/subject/edit/:id', function(req,res){
  var updateData={

      title:req.body.title,
      description:req.body.description
  }
  Subject.update({classroom_id:req.params.id},updateData,function(err,numrows){
    if(!err){
        res.redirect('/subject'+req.params.id);
    }
});
})

//classroom delete

router.get('/subject/delete/:id',function(req,res){
  Subject.deleteOne({classroom_id:req.params.id},function(err){
    if(!err){
        res.redirect('/subject');
    }
});
});


module.exports = router;