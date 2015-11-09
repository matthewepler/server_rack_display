var exec = require('child_process').exec;

var x = 0;
var y = 100;
var timer = 500; // default = 500 ms.

if (process.argv.length == 3) {
	timer = process.argv[2];
	console.log("timer set to " + timer + "ms");
} else {
	console.log("timer set to 500ms");
}

setInterval( function() {
	var cmd = "curl -X GET 'http://localhost:3000/update?";
	x = x + 1;
	cmd +='x=' + x + '&y=' + y + "'";
	console.log(cmd);
	exec(cmd, function(error, stdout, stderr) {
	//	console.log(stdout.toString('utf8'));
	//	console.log(stderr.toString('utf8'));
		if (error) {
	//		console.log("ERROR: ");
	//		console.log(error);
		}
	});
}, timer);
