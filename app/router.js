'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/blog', controller.blog.list);
  router.get('/blogOne', controller.blog.one);
  router.get('/search', controller.blog.search);
  router.get('/qiniuToken', controller.blog.qiniuToken);
  router.post('/releaseBlog', app.jwt, controller.blog.releaseBlog);
  router.post('/login', controller.login.login);
  router.post('/register', controller.login.register);
};
