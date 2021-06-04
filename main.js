

const width = (document.body.clientWidth);
const height = (document.body.clientHeight);

let stickymen = [];

function drawStickyman() {
	d3.json('stickymen.json').then(function(data) {

		for(let i=0; i<data.length; i++) {

			stickymen[i] = new Stickyman(i,data[i],data.length);
			stickymen[i].headListener(function() {sortAndDraw('testa')})
			stickymen[i].armListener(function() {sortAndDraw('braccia')})
			stickymen[i].legDListener(function() {sortAndDraw('gambe')})
			stickymen[i].legSListener(function() {sortAndDraw('gambe')})
			stickymen[i].bodyListener(function() {sortAndDraw('busto')})

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

drawStickyman();

d3.select('svg')
	.on('click', function(event) {
		sortAndDraw(event.key);
	});