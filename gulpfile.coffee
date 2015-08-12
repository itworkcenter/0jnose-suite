#引入模块
fs = require "fs"
packages = JSON.parse(fs.readFileSync("./package.json","utf-8"))


# 定义所需要的模块
mods={}
for name of packages.devDependencies
  temp=name.replace /[-]*/ig,""
  mods[temp]= require name


#模块修正
mods.argv = mods.yargs.argv
mods.historyback=mods.connecthistoryapifallback
gulp = mods.gulp
runSequence=mods.runsequence


# 获取变量（是否debug mode，是否压缩代码）
isDebug = !(mods.argv.r || false)
isFrameworkDev = mods.argv.f || false
env = mods.argv.env || 'gdev'
if env isnt 'gqc' && env isnt 'prd' && env isnt 'prdtesting'
  env = 'gdev'
isDev = mods.argv.d


# 定义参数
params = {
  env: env
  isFrameworkDev: isFrameworkDev
  isDebug: isDebug
  isDev: isDev
  assets: JSON.parse(fs.readFileSync('./assets.json', 'utf8'))
}


# 初始化任务
tasks = fs.readdirSync("tasks")
tasks.forEach (name) ->
  taskname=name.match(/[^\.]+/)[0]
  require("./tasks/"+taskname).init(gulp,mods,params)


# 设置默认任务，入口点任务
gulp.task 'default', (back)->
  runSequence(
    "framework"
    "modules"
    "watch"
    back
  )

