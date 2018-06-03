'use strict';

const Controller = require('egg').Controller;
const ValidatorRule = require('../utils/ValidatorRule');

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
}

module.exports = BlogController;
