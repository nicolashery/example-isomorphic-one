module.exports = function() {
  var _router = null;

  return {
    name: 'RouterPlugin',

    plugContext: function() {
      return {
        plugActionContext: function(actionContext) {
          actionContext.getRouter = function() {
            return _router;
          };
        }
      };
    },

    setRouter: function(router) {
      _router = router;
    }
  };
};
