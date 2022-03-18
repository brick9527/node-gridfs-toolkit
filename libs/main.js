const checkShowHelp = require('./check_show_help'); 
const checkArgv = require('./check_argv');

module.exports = async function(cli) {
  // 任何参数都不传, 显示帮助菜单
  const isShowHelp = checkShowHelp(cli.flags);
  if (isShowHelp) {
    cli.showHelp();
    return;
  }

  // 检查参数, 给默认值
  const argvs = await checkArgv(cli.flags);
  console.log(argvs);
};
