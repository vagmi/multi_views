[![Build Status](https://travis-ci.org/vagmi/multi_views.svg)](https://travis-ci.org/vagmi/multi_views)

This module adds support for rendering views from multiple directories. To use the module, do the following.


    var express = require('express');
    var multiViews = require('multi-views');

    var app = express();

    multiViews.setupMultiViews(app);

    app.set('views',['views1']);
    
    // later in your code

    var viewDirs = app.get('views');
    viewDirs.push('views2');


View is searched in each of the view directories and is served from the first directory that it is found. If you would like to override view from a plugin, you can unshift your directory to the views array and it will be looked up from that directory.
