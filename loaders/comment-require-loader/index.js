
const loaderUtils = require('loader-utils');
const path = require('path')

module.exports = function (content) {

    // console.log('hello world ! haha',typeof content,this.resource,this.resourcePath)
    //   this.cacheable(false)
      content = content.replace("HelloWorld123",'hhhh')
     // const options = loaderUtils.getOptions(this);
     //  let abc =path.join(__dirname, '../src/components/b.js')
     //   abc =require(abc)

  console.log('123')


    return content;
};
