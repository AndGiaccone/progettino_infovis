class Stickyman {

	constructor(xa, attributi, dimension = 20) {
		this.width = document.body.clientWidth/dimension -5
		this.y = 20
		this.attributi = attributi
		this.xa = xa


		var scaleGambe = d3.scaleLinear(); 
		scaleGambe.domain([0, 200]); // Set the input domainscale
		scaleGambe.range([30, 60]); // Set the output range

		var scaleTesta = d3.scaleLinear(); 
		scaleTesta.domain([0, 200]); // Set the input domainscale
		scaleTesta.range([8, 17]); // Set the output range

		var scaleBraccia = d3.scaleLinear(); 
		scaleBraccia.domain([0, 200]); // Set the input domainscale
		scaleBraccia.range([30, 100]); // Set the output range
		
		var scaleBusto = d3.scaleLinear(); 
		scaleBusto.domain([0, 10]); // Set the input domainscale
		scaleBusto.range([40, 60]); // Set the output range

		var scaleSpessore = d3.scaleLinear(); 
		scaleSpessore.domain([0, 70]); // Set the input domainscale
		scaleSpessore.range([1, 5]); // Set the output range


		this.x_offset = xa*this.width//document.body.clientWidth*(dimension/100)+(document.body.clientWidth*(dimension/200))//xa*(this.width)+(this.width/2)
		//this.y_offset = document.body.clientWidth*(this.width/2)

		this.svg = d3.select('body')
			.append('svg')
			.attr('width', this.width)
			.attr('viewBox', '0 0 '+this.width+ ','+this.width+'')
			.attr('transform', 'translate('+this.width*xa+', '+this.width*xa+')')
			.attr('id',xa)

		//Left wing
		this.testa = this.svg.append('g')
		this.testa.append('circle')
			.attr("cx", this.width/2)
			.attr("cy", this.y)
			.attr("r", scaleTesta(attributi.testa))
			.attr("fill", "#222222");


		this.busto = this.svg.append('g')
		this.busto.append('line')
			.style("stroke", "#222222")
			.style("stroke-width", scaleSpessore(scaleBusto(attributi.busto))+2)
       		.attr("x1", this.width/2)
      		.attr("y1", this.y-scaleTesta(attributi.testa)/2)
      		.attr("x2", this.width/2)
      		.attr("y2", this.y+scaleTesta(attributi.testa)/2+scaleBusto(attributi.busto));

		this.braccia = this.svg.append('g')
		this.braccia.append('line')
			.style("stroke", "#222222")
			.style("stroke-width", scaleSpessore(scaleBraccia(attributi.braccia)/2)-1)
       		.attr("x1", this.width/2-scaleBraccia(attributi.braccia)/2)
      		.attr("y1", this.y+scaleTesta(attributi.testa)+2)
      		.attr("x2", this.width/2+scaleBraccia(attributi.braccia)/2)
      		.attr("y2", this.y+scaleTesta(attributi.testa)+2);

      	this.gambaS = this.svg.append('g')
      	this.gambaS.append("line") 
    		.style("stroke", "#222222")
			.style("stroke-width", scaleSpessore(scaleGambe(attributi.gambe)))
    		.attr("x1", this.width/2-scaleBraccia(attributi.braccia)/4)
    		.attr("y1", this.y+scaleTesta(attributi.testa)+scaleBusto(attributi.busto)+scaleGambe(attributi.gambe))
      		.attr("x2", this.width/2-1)
      		.attr("y2", this.y+scaleTesta(attributi.testa)/2+scaleBusto(attributi.busto));


      	this.gambaD = this.svg.append('g')
      	this.gambaD.append("line") 
    		.style("stroke", "#222222")
			.style("stroke-width", scaleSpessore(scaleGambe(attributi.gambe)))
    		.attr("x1", this.width/2+scaleBraccia(attributi.braccia)/4)
    		.attr("y1", this.y+scaleTesta(attributi.testa)+scaleBusto(attributi.busto)+scaleGambe(attributi.gambe))
      		.attr("x2", this.width/2+1)
      		.attr("y2", this.y+scaleTesta(attributi.testa)/2+scaleBusto(attributi.busto));



	}


	headListener(func){
		this.testa.on('mouseup', func)
	}


	moveTo(x, duration = 4000) {
		let x1 = x-this.x_offset
		let xN =  x*this.width

		let delay_duration = Math.floor(Math.random()*500)
		let turn_duration = Math.floor(Math.random()*duration/2)-delay_duration
		if(turn_duration < 0) turn_duration = 0
		let asseY = parseInt(Math.random()*5)
		let a = this.width*asseY
		if (parseInt(a)%2 == 0) a = -a
		console.log(asseY,a,xN)

		let move_duration = duration-turn_duration

		setTimeout(() => {
			this.svg
				.transition()
				.delay(delay_duration)
				.duration(turn_duration)
				.ease(d3.easeQuadOut)
				.attr('transform', 'translate('+this.x1+', '+this.x1 +')')
			this.svg
				.transition()
				.delay(turn_duration)
				.duration(move_duration)
				.attr('transform', 'translate('+xN+', '+xN+')')
				.on('end', () => {
					this.xa = x
				})
		}, delay_duration)
	}


	

}