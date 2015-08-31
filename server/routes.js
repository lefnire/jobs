'use strict';

var _ = require('lodash'),
  router = require('express').Router(),
  ensureAuth = require('./passport').ensureAuth,
  jobs = require('./controllers/jobs'),
  user = require('./controllers/user');

router.get('/', function(req, res){
  res.sendStatus(200);
})

router.get('/user', ensureAuth, user.get);
router.post('/user/lock/:table/:id', ensureAuth, user.lock);
router.put('/user/preferences', ensureAuth, user.setPref);

router.get('/jobs/mine', ensureAuth, jobs.mine);
router.get('/jobs/:filter?', ensureAuth, jobs.list);
router.post('/jobs', ensureAuth, jobs.create);
router.get('/jobs/:id', ensureAuth, jobs.expand);
router.post('/jobs/:id/add-note', ensureAuth, jobs.addNote); //before :status, cascades
router.post('/jobs/:id/:status', ensureAuth, jobs.setStatus);

module.exports = router;


