var request = require('superagent');
var Q       = require('q');
var config  = require('./config.js');
var fs      = require('fs');

var deferred = Q.defer();

function getList() {
  request
    .post(config.apiBase + 'campaigns/list.json')
    .send({'apikey': config.token})
    .set('Accept', 'application/json')
    .end(function(res) {
      if (res.ok) {
        deferred.resolve(res.body.data.map(function(d) {
          return {
            id: d.id,
            title: d.title
          };
        }));
      }
    });

  return deferred.promise;
};

function getHTML(mc) {
  request
    .post(config.apiBase + 'campaigns/content.json')
    .send('apikey=' + config.token)
    .send('cid=' + mc.id)
    .set('Accept', 'application/json')
    .end(function(res) {
      deferred.resolve(res.body);
      fs.writeFile(mc.title + '.html', res.body.html, function(err) {
        if (err) console.error(error)
        console.log(mc.title + '.html writed');
      });
    });

    return deferred.promise;
}

getList().then(function(list) {
  list.forEach(function(l) {
    getHTML(l);
  });
});