var osc, fft;

function setup() {
	createCanvas(720, 256);
	
	osc = new p5.Oscillator();
	osc.setType('sine');
	osc.amp(0.5);

	fft = new p5.FFT();
	osc.start();
}

function draw() {
	background(255);

	var waveform = fft.waveform();
	beginShape();
	strokeWeight(5);
	for (var i=0; i<waveform.length; i++) {
		var x = map(i, 0, waveform.length, 0, width);
		var y = map(waveform[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();
	
	var freq = map(mouseX, 0, width, 40, 880);
	osc.freq(freq);

	var amp = map(mouseY, 0, height, 1, 0.1);
	osc.amp(amp);
}
