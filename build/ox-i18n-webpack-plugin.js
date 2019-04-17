class EndWebpackPlugin {
  constructor(options) {
    this.cnPath=options.cnPath
  }

  apply(compiler) { 
    let fs = require("fs"); 
    // 源文件的转换和组装已经完成
    compiler.plugin("emit", (compilation, callback)=> { 
      console.time('ox-i18n-webpack-plugin生成国际化文档耗时')
      let filelist=[] 
      // 0. 获取所有打包后的文件
      compilation.chunks.forEach(chunk=>{
        chunk.files.forEach(filename=>{ 
          if(filename.indexOf('.js')>-1){
            filelist.push(filename) 
          }
        })
      }) 
     // 1. 拿到$t的数组内容   $t(\"order\", \"abc12\")) + \"\\n  \") [["order","订单"]]
    let matchResultArr=[] 
    filelist.forEach(filename=>{
        let fileStr =compilation.assets[filename].source()
        let matchArr = fileStr.match(/\$t\s*\(\s*\\['|"]\w+\\['|"]\s*,\s*\\['|""][\u4e00-\u9fa5|0123456789|a-zA-Z]+\\['|""]\s*\)/gi)
       
        matchArr&&matchArr.forEach(str=>{
          let r =str.match(/['|"]\S+['|"]/gi)
          r && matchResultArr.push(r) 
        })
     })

    // 2. 生成对象
    let configObj={}
    matchResultArr.forEach(item=>{
       let moduleName =item[0]
       let keyValue =item[1]
       if(configObj[moduleName]){
           if(!configObj[moduleName][keyValue]){
            configObj[moduleName][keyValue] = keyValue
           }  
       }else{
        configObj[moduleName]={}
        configObj[moduleName][keyValue]=keyValue
       }
    })
     
      // 3. 生成字符串
      let str1='export default ' +JSON.stringify(configObj,null,'\t') 
      str1 = str1.replace(/\\/g,'').replace(/\"\"/g,'"')
      
      let str2 = fs.readFileSync(this.cnPath ,"utf-8");
      // 4. 写到data.js中
      if(str1 !== str2){
        fs.writeFileSync(this.cnPath , str1);
      }
      console.timeEnd('ox-i18n-webpack-plugin生成国际化文档耗时')
      callback();
    });
  }
}
// 导出插件
module.exports = EndWebpackPlugin;
