'use strict';

var request = require("request");
var cheerio = require("cheerio");

var Adaptor = require('./adaptor');
class RemoteOK extends Adaptor {
  list(done) {
    request('https://remoteok.io/remote-reactjs-jobs', function(err, response, html){
      var $ = cheerio.load(html);
      var jobs = $('tr.job').map(function(){
        var el = $(this);
        return {
          source: 'remoteok',
          title: el.find('.company h2').text(),
          company: el.find('.company h3').text(),
          url: 'https://remoteok.io' + el.find('.company a').attr('href'),
          follow: '', // figure out how to get the link's redirect, use that for id
          description: '',
          location: '',
          budget: '',
          tags: el.find('.tags').find('h3').map(function() {
            return $(this).text();
          }).toArray()
        }
      }).toArray();
      Adaptor.prototype.list(done, err, jobs);
    })
  }
  expand(job, done){
    request(job.url, function(error, response, html){
      done(error, cheerio.load(html)('.expandContents').html());
    })
  }
}

module.exports = RemoteOK;
