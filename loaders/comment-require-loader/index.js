
const loaderUtils = require('loader-utils');
const path = require('path')
 
module.exports = function (content) {
  
      content = content.replace(/\$oxt.+\)/gi,'"haha"')
      // const options = loaderUtils.getOptions(this);
      
     

    return content;
};
