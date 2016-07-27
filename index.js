var scripts;
var expscripts = {};

module.exports = function (s) {
	var scriptNames = Object.keys(s);
	scripts = s;
	for(var i=0; i<scriptNames.length; i++)
		expscripts[scriptNames[i]] = expandCommand(scripts[scriptNames[i]]);
	return expscripts;
}

function expandCommand(cmd) {
  var scmd;
  while( (scmd = /~([\w:-_#@]+)/g.exec(cmd)) !== null) {
    cmd = cmd.replace(scmd[0], expandCommand(scripts[scmd[1]]));
  }
  return cmd;
}
