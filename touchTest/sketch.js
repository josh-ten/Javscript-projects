var value = 0;
function draw() {
	fill(value);
	rect(25, 25, 50, 50);
}
function touchStarted() {
	if (value == 0) {
	value = 255;
	} else {
	value = 0;
	}
	console.log(touches);
}