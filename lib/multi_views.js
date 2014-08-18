var exists = require('fs').existsSync;
exports.resetMultiViews = function(app) {
  var eView= app.get('view');
  var lookupProxy = eView.prototype.lookupProxy;
  if(lookupProxy) {
    eView.prototype.lookup=lookupProxy;
    delete eView.prototype.lookupProxy;
  }
}
exports.setupMultiViews = function(app) {
  exports.resetMultiViews(app);
  var eView= app.get('view');
  var lookupProxy = eView.prototype.lookup;
  eView.prototype.lookupProxy = lookupProxy;
 
  eView.prototype.lookup = function (view) {
      if (this.root instanceof Array) {
          var opts = {};
 
          var matchedView = null,
              roots = this.root;
              
          for (var i=0; i<roots.length; i++) {
              this.root = roots[i];
              matchedView = lookupProxy.call(this, view);
              if (exists(matchedView)) break;
              
          }
          return matchedView;
      }
 
      return lookupProxy.call(eView, view)
  };  
}
