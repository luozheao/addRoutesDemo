class EndWebpackPlugin {
  constructor(doneCallback, failCallback) {
    // 存下在构造函数中传入的回调函数
    this.doneCallback = doneCallback;
    this.failCallback = failCallback;
  }

  getFullTemplatePath(template, context) {
    // If the template doesn't use a loader use the lodash template loader
    if (template.indexOf("!") === -1) {
      template =
        require.resolve("./lib/loader.js") +
        "!" +
        path.resolve(context, template);
    }
    // Resolve template path
    return template.replace(
      /([!])([^/\\][^!?]+|[^/\\!?])($|\?[^!?\n]+$)/,
      function(match, prefix, filepath, postfix) {
        return prefix + path.resolve(filepath) + postfix;
      }
    );
  }

  apply(compiler) {
    // 1.  compilation.chunks  所有的代码块chunk
    // 2.  chunk.forEachModule 所有的模块module
    // 3.  module.fileDependencies 模块的依赖文件路径
    // 4.  chunk.files 代码块chunk的文件信息,包含filename
    // 5.  compilation.assets[filename].source()  编译后的源文件,可对它转换
    console.log(compiler.context);

    var fs = require("fs");
    compiler.plugin("environment", (compilation, callback) => {
      console.log("environment");
    });
    compiler.plugin("entry-option", (compilation, callback) => {
      console.log("entryoption");
    });
    compiler.plugin("after-plugins", (compilation, callback) => {
      console.log("afterPlugins");
    });
    compiler.plugin("after-resolvers", (compilation, callback) => {
      
      console.log("afterResolvers");
    });

    compiler.plugin("watch-run", (compilation, callback) => {
      console.log("watchRun");
    
    //   let ddd = 123;
    //   let str = `
    //   export default {
    //    a:1,
    //    b:222222,
    //    c:232323,
    //    d:${ddd}
    //  } 
    //   `;
    //   let str2 = fs.readFileSync(
    //     process.cwd() + "/src/components/b.js",
    //     "utf-8"
    //   );
    //   if (str !== str2) {
    //     fs.writeFileSync(process.cwd() + "/src/components/b.js", str);
    //   }
      callback();
    });
    // 当依赖的文件发生变化时会触发 watch-run 事件
    // compiler.plugin("watch-run", (watching, callback) => {
    //   console.log("watch-run");
    //   // // 获取发生变化的文件列表
    //   // const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
    //   // // changedFiles 格式为键值对，键为发生变化的文件路径。
    //   // let filePath = "test";
    //   // if (changedFiles[filePath] !== undefined) {
    //   //   // filePath 对应的文件发生了变化
    //   // }
    //   callback();
    // });
    compiler.plugin("before-compile", (compilation, callback) => {
      console.log("before-compile");  
      callback();
    });
    compiler.plugin("compilation", function(compilation) {
      console.log("compilation");
      var filelist=`export default {a:1}`
      compilation.assets["b.js"] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };
    });

    compiler.plugin("after-compile", (compilation, callback) => {
      console.log("after-compile"); 
      // 把 HTML 文件添加到文件依赖列表，好让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译
      //   compilation.fileDependencies.push(filePath);
      callback();
    });

    // 源文件的转换和组装已经完成
    compiler.plugin("emit", function(compilation, callback) {
      console.log("emit");
      
      callback();
    });

    compiler.plugin("done", stats => {
      this.doneCallback(stats);
    });
    compiler.plugin("failed", err => {
      this.failCallback(err);
    });
  }
}
// 导出插件
module.exports = EndWebpackPlugin;
