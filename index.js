var scripts;
var expscripts = {};

module.exports = function (data) {
	var scriptNames = Object.keys(data.scripts);
	scripts = data.scripts;
	for(var i=0; i<scriptNames.length; i++)
		expscripts[scriptNames[i]] = expandCommand(scripts[scriptNames[i]]);
	data.scripts = expscripts;
	return data;
}

function expandCommand(cmd) {
  var scmd;
	while( (scmd = /~([\w:-_#@]+)/g.exec(cmd)) !== null) {
    cmd = cmd.replace(scmd[0], expandCommand(scripts[scmd[1]]));
  }
  return cmd;
}
