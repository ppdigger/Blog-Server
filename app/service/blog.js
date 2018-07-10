'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  async findAll(query) {
    const result = await this.app.mysql.query(
      'SELECT blogs.id,blogs.title,blogs.summary,users.avatar,users.name FROM blogs INNER JOIN users ON (blogs.author = users.id) ORDER BY release_time DESC LIMIT ? OFFSET ?',
      [parseInt(query.rowNum), query.page* query.rowNum]
    );
    return {
      success: true,
      result: result,
      toast: ''
    }
  }
  async findOne(query) {
    const result = await this.app.mysql.query(
      'SELECT blogs.id,blogs.title,blogs.content,users.avatar,users.name FROM blogs INNER JOIN users ON (blogs.author = users.id) WHERE blogs.id = ?',
      [parseInt(query.id)]
    );
    return {
      success: true,
      result: result,
      toast: ''
    }
  }
  async search(query) {
    const result = await this.app.mysql.query(
      'SELECT blogs.id,blogs.title,blogs.summary,users.avatar,users.name FROM blogs INNER JOIN users ON (blogs.author = users.id) WHERE blogs.title LIKE ? LIMIT ? OFFSET ?',
      ['%'+query.value+'%', parseInt(query.rowNum), query.page* query.rowNum]
    );
    return {
      success: true,
      result: result,
      toast: ''
    }
  }
  async releaseBlog(query, id) {
    const result = await this.app.mysql.query(
      'INSERT INTO blogs (author, title, summary, content, release_time) VALUES (?, ?, ?, ?, now())',
      [id, query.title, query.summary, query.content]
    );
    if(result.affectedRows == 1) {
      return {
        success: true,
        toast: '发布成功'
      }
    } else {
      return {
        success: false,
        message: '发布失败'
      }
    }
  }
}

module.exports = BlogService;
