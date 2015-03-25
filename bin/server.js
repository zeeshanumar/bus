// START THE SERVER
// =============================================================================

var app = require('../app/app'); //Require our app

app.set('port', process.env.PORT || 8080);
 
var server = app.listen(app.get('port'), function() {
  console.log('News API server listening on port ' + server.address().port);
});