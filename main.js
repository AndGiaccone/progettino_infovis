

const width = (document.body.clientWidth);
const height = (document.body.clientHeight);

let stickymen = [];
//let tmpSm = [];

function drawCharacter() {
	d3.json('stickymen.json').then(function(data) {

		for(let i=0; i<data.length; i++) {

			/*check if there are enough butterflies to complete the letter
			(Yes i know, there are exactly 10 butterflies, but never say never, the json could be wrong!)*/
			stickymen[i] = new Stickyman(i,data[i]);
			stickymen[i].headListener(function() {sortAndDraw('testa')})
			//console.log(stickymen[i].attributi)
		//	stickymen[i].headListener(function() {sortAndDraw('braccia')})
		//	stickymen[i].headListener(function() {sortAndDraw('gambe')})
		//	stickymen[i].headListener(function() {sortAndDraw('busto')})
			//butterflies[i].moveTo(data[i].x*width, data[i].y*height, 5000+Math.floor(Math.random()*3000));

		}

	}).catch(function(error) {
		console.log(error)
	});
};


function sortAndDraw(chiave) {

	stickymen.sort((a, b) => (a.attributi[chiave]) - (b.attributi[chiave]));
	console.log(stickymen);
	for (var i = 0; i < stickymen.length; i++) {
		stickymen[i].moveTo(i, 5000+Math.floor(Math.random()*3000))
	}
}

//save();
//sortAndDraw();


drawCharacter();

d3.select('svg')
	.on('click', function(event) {
		sortAndDraw(event.key);
	});
//drawCharacter();