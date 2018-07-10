'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class LoginService extends Service {
  async login(query) {
    const result = await this.app.mysql.query(
      'SELECT * FROM users WHERE account = ?',
      [query.account]
    );
    if (result.length == 0) {
      return {
        success: false,
        toast: '账号错误'
      }
    }
    let password = result[0].password,
			 expires = moment().format('X');
    if(query.password == password) {
      return {
        success: true,
        result: {
          token: this.app.jwt.sign({
            iss: result[0].id,
            name: result[0].name,
            exp: Math.floor(Date.now() / 1000) + (7* 24* 60* 60),
          }, this.app.config.jwt.secret),
          id: result[0].id,
          name: result[0].name,
          avatar: result[0].avatar,
        },
        toast: '登录成功'
      }
    } else {
      return {
        success: false,
        toast: '密码错误'
      }
    }
  }
  async register(query) {
    const result = await this.app.mysql.query(
      'SELECT COUNT(*) FROM users WHERE account = ?',
      [query.account]
    );
    let count = result[0]['COUNT(*)'];
    if(count == 0) {
      const _result = await this.app.mysql.query(
        'INSERT IGNORE INTO users (name, account, password) VALUES (?, ?, ?)',
        [query.name, query.account, query.password]
      );
      if(_result.affectedRows == 1) {
        return {
          success: true,
          toast: '注册成功'
        }
      } else {
        return {
          success: false,
          toast: '注册失败'
        }
      }
    } else {
      return {
        success: false,
        toast: '账号已存在'
      }
    }
  }
}

module.exports = LoginService;
