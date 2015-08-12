#����ģ��
fs = require "fs"
packages = JSON.parse(fs.readFileSync("./package.json","utf-8"))


# ��������Ҫ��ģ��
mods={}
for name of packages.devDependencies
  temp=name.replace /[-]*/ig,""
  mods[temp]= require name


#ģ������
mods.argv = mods.yargs.argv
mods.historyback=mods.connecthistoryapifallback
gulp = mods.gulp
runSequence=mods.runsequence


# ��ȡ�������Ƿ�debug mode���Ƿ�ѹ�����룩
isDebug = !(mods.argv.r || false)
isFrameworkDev = mods.argv.f || false
env = mods.argv.env || 'gdev'
if env isnt 'gqc' && env isnt 'prd' && env isnt 'prdtesting'
  env = 'gdev'
isDev = mods.argv.d


# �������
params = {
  env: env
  isFrameworkDev: isFrameworkDev
  isDebug: isDebug
  isDev: isDev
  assets: JSON.parse(fs.readFileSync('./assets.json', 'utf8'))
}


# ��ʼ������
tasks = fs.readdirSync("tasks")
tasks.forEach (name) ->
  taskname=name.match(/[^\.]+/)[0]
  require("./tasks/"+taskname).init(gulp,mods,params)


# ����Ĭ��������ڵ�����
gulp.task 'default', (back)->
  runSequence(
    "framework"
    "modules"
    "watch"
    back
  )

