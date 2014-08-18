var express = require('express');
var multiViews = require('../../');
var expect = require('chai').expect;
var request = require('supertest');
var path = require('path');
var exists = require('fs').existsSync;
describe('multi-views',function(){
  var setupApp=function() {
    var app=express();
    viewDirs = [];
    app.set('views',viewDirs);
    app.set('view engine','jade');
    viewDirs.push(path.resolve(__dirname,'../views1'));
    viewDirs.push(path.resolve(__dirname,'../views2'));
    multiViews.setupMultiViews(app);
    app.get('/view1',function(req,res){
      res.render('view1');
    });
    app.get('/view2',function(req,res){
      res.render('view2');
    });
    return app;
  }
  it("should render view1 from views1",function(done){
    var expApp = setupApp();
    request(expApp).get('/view1').end(function(err,res){
      expect(res.text).to.equal('<h1>From Views1 view1</h1>');
      done();
    });
  });
  it("should render view2 from views2",function(done){
    var expApp = setupApp();
    request(expApp).get('/view2').end(function(err,res){
      expect(res.text).to.equal('<h1>From Views2 view2</h1>');
      done();
    });
  });
});
