
const express = require('express')
const app = express()
const path = require('path')
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '.', 'dist/index.html'))
})

// 其它请求路径返回对应的本地文件
app.use(express.static(path.join(__dirname, '.', 'dist')))

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
