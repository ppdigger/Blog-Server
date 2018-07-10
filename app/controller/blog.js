'use strict';

const Controller = require('egg').Controller;
const ValidatorRule = require('../utils/ValidatorRule');
const qiniu = require('qiniu');

class BlogController extends Controller {
  async list() {
    this.ctx.validate(ValidatorRule.blogList, this.ctx.query)
    let query = {
      page: this.ctx.query.page,
      rowNum: this.ctx.query.rowNum
    }
    this.ctx.body =  await this.service.blog.findAll(query)
    this.ctx.status = 201;
  }
  async one() {
    this.ctx.validate(ValidatorRule.blogOne, this.ctx.query)
    let query = {
      id: this.ctx.query.id
    }
    this.ctx.body =  await this.service.blog.findOne(query)
    this.ctx.status = 201;
  }
  async search() {
    this.ctx.validate(ValidatorRule.search, this.ctx.query)
    this.ctx.body =  await this.service.blog.search(this.ctx.query)
    this.ctx.status = 201;
  }
  // 生成七牛token
  async qiniuToken() {
    let accessKey = 'qVNAmc2zGUIgj-U0mmtkTj-WCKEihzTfD-txjQer';
    let secretKey = 'WZJZMSEj3IU_itJVURJ_F_oAKDwZlS_telNe5GaU';
    // console.log(qiniu);
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let options = {
      scope: 'blog-app',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken);
    this.ctx.body = {
      'uploadToken': uploadToken
    }
    this.ctx.status = 201;
  }
  async releaseBlog() {
    this.ctx.validate(ValidatorRule.releaseBlog, this.ctx.request.body)
    let id = this.ctx.state.user.iss;
    this.ctx.body = await this.service.blog.releaseBlog(this.ctx.request.body, id)
    this.ctx.status = 201;
  }
}

module.exports = BlogController;
