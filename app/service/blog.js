'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  async findAll(query) {
    const blogs = await this.app.mysql.query(
      'select blogs.id,blogs.title,blogs.summary,users.avatar,users.name from blogs inner join users on (blogs.author = users.id) limit ? offset ?',
      [parseInt(query.rowNum), query.page* query.rowNum]
    );
    return { blogs }
  }
  async findOne(query) {
    const blog = await this.app.mysql.query(
      'select blogs.id,blogs.title,blogs.content,users.avatar,users.name from blogs inner join users on (blogs.author = users.id) where blogs.id = ?',
      [parseInt(query.id)]
    );
    return { blog }
  }
  async search(query) {
    const blog = await this.app.mysql.query(
      'select blogs.id,blogs.title,blogs.summary,users.avatar,users.name from blogs inner join users on (blogs.author = users.id) where blogs.title like ? limit ? offset ?',
      ['%'+query.value+'%', parseInt(query.rowNum), query.page* query.rowNum]
    );
    return { blog }
  }
}

module.exports = BlogService;
