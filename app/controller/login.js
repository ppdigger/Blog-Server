'use strict';

const Controller = require('egg').Controller;
const ValidatorRule = require('../utils/ValidatorRule');

class LoginController extends Controller {
  async login() {
    this.ctx.validate(ValidatorRule.login, this.ctx.request.body)
    let query = {
      account: this.ctx.request.body.account,
      password: this.ctx.request.body.password
    }
    this.ctx.body = await this.service.login.login(query)
    this.ctx.status = 201;
  }
  async register() {
    this.ctx.validate(ValidatorRule.register, this.ctx.request.body)
    let query = {
      name: this.ctx.request.body.name,
      account: this.ctx.request.body.account,
      password: this.ctx.request.body.password
    }
    console.log(query);
    this.ctx.body = await this.service.login.register(query)
    this.ctx.status = 201;
  }
}

module.exports = LoginController;
