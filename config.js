var token = '57f91932f1b31b63b7488f48b242f843-us4';
var apiBase = function(token) {
  var dc = token.split('-')[1];
  return 'https://' + dc + '.api.mailchimp.com/2.0/';
};

exports.token = token;
exports.apiBase = apiBase(token);
