'use strict';

const blogList = {
  page: { type: 'string', required: true },
  rowNum: { type: 'string', required: true },
}
const blogOne = {
  id: { type: 'string', required: true },
}
const search = {
  value: { type: 'string', required: true },
  page: { type: 'string', required: true },
  rowNum: { type: 'string', required: true },
}
const releaseBlog = {
  title: { type: 'string', required: true },
  content: { type: 'string', required: true },
}
module.exports = {
    blogList,
    blogOne,
    search,
    releaseBlog,
};
