class Stickyman {

	constructor(xa, attributi, dimension = 10) {
		this.width = document.body.clientWidth/dimension -1
		this.y = this.width*2/6
		this.attributi = attributi
		this.xa = xa

		let scaleTi = this.width*2/17
		let scaleTf = this.width*2/8 

		let scaleGi = this.width*2/4 
		let scaleGf = this.width*2/2 

		let scaleBri = this.width*2/4 
		let scaleBrf = this.width*1.5 

		let scaleBui = this.width*2/3
		let scaleBuf = this.width*2/2 

		let scaleS = this.width*2/25

		var scaleGambe = d3.scaleLinear(); 
		scaleGambe.domain([0, 200]); 
		scaleGambe.range([scaleGi, scaleGf]); 

		var scaleTesta = d3.scaleLinear(); 
		scaleTesta.domain([0, 200]); 
		scaleTesta.range([scaleTi, scaleTf]); 

		var scaleBraccia = d3.scaleLinear(); 
		scaleBraccia.domain([0, 200]); 
		scaleBraccia.range([scaleBri, scaleBrf]); 
		
		var scaleBusto = d3.scaleLinear(); 
		scaleBusto.domain([0, 10]); 
		scaleBusto.range([scaleBui, scaleBuf]); 

		var scaleSpessore = d3.scaleLinear(); 
		scaleSpessore.domain([0, 70]); 
		scaleSpessore.range([1, scaleS]); 

		this.c = xa
		if (this.c == 10) this.c = 'A'
		if (this.c == 11) this.c = 'B'
		if (this.c == 12) this.c = 'C'
		if (this.c == 13) this.c = 'D'
		if (this.c == 14) this.c = 'E'
		if (this.c >= 15) this.c = 'F'


		this.x_offset = xa*this.width

		this.svg = d3.select('body')
			.append('svg')
			.attr('width', this.width)
			.attr('viewBox', '0 0 '+this.width+ ','+this.width*2+'')
			.attr('transform', 'translate('+(this.width-document.body.clientWidth/dimension)+', '+this.width+')')
			.attr('id',xa)

		this.testa = this.svg.append('g')
		this.testa.append('circle')
			.attr("cx", this.width/2)
			.attr("cy", this.y)
			.attr("r", scaleTesta(attributi.testa))
			.attr("fill", "#"+this.c+this.c+this.c+this.c+this.c+this.c);

		this.busto = this.svg.append('g')
		this.busto.append('line')
			.style("stroke", "#"+this.c+this.c+this.c+this.c+this.c+this.c)
			.style("stroke-width", scaleSpessore(scaleBusto(attributi.busto))+2)
       		.attr("x1", this.width/2)
      		.attr("y1", this.y+scaleTesta(attributi.testa))
      		.attr("x2", this.width/2)
      		.attr("y2", this.y+scaleTesta(attributi.testa)/2+scaleBusto(attributi.busto));

		this.braccia = this.svg.append('g')
		this.braccia.append('line')
			.style("stroke", "#"+this.c+this.c+this.c+this.c+this.c+this.c)
			.style("stroke-width", scaleSpessore(scaleBraccia(attributi.braccia)/2)-1)
       		.attr("x1", this.width/2-scaleBraccia(attributi.braccia)/2)
      		.attr("y1", this.y+scaleTesta(attributi.testa)+2)
      		.attr("x2", this.width/2+scaleBraccia(attributi.braccia)/2)
      		.attr("y2", this.y+scaleTesta(attributi.testa)+2);

      	this.gambaS = this.svg.append('g')
      	this.gambaS.append("line") 
    		.style("stroke", "#"+this.c+this.c+this.c+this.c+this.c+this.c)
			.style("stroke-width", scaleSpessore(scaleGambe(attributi.gambe)))
    		.attr("x1", this.width/2-scaleBraccia(attributi.braccia)/4)
    		.attr("y1", this.y+scaleTesta(attributi.testa)+scaleBusto(attributi.busto)+scaleGambe(attributi.gambe))
      		.attr("x2", this.width/2-scaleSpessore(attributi.busto*3))
      		.attr("y2", this.y+scaleTesta(attributi.testa)/2+scaleBusto(attributi.busto)-2);

      	this.gambaD = this.svg.append('g')
      	this.gambaD.append("line") 
    		.style("stroke", "#"+this.c+this.c+this.c+this.c+this.c+this.c)
			.style("stroke-width", scaleSpessore(scaleGambe(attributi.gambe)))
    		.attr("x1", this.width/2+scaleBraccia(attributi.braccia)/4)
    		.attr("y1", this.y+scaleTesta(attributi.testa)+scaleBusto(attributi.busto)+scaleGambe(attributi.gambe))
      		.attr("x2", this.width/2+scaleSpessore(attributi.busto*3))
      		.attr("y2", this.y+scaleTesta(attributi.testa)/2+scaleBusto(attributi.busto)-2);



	}


	headListener(func){
		this.testa.on('mouseup', func)
	}

	bodyListener(func){
		this.busto.on('mouseup', func)
	}

	armListener(func){
		this.braccia.on('mouseup', func)
	}

	legDListener(func){
		this.gambaD.on('mouseup', func)
	}

	legSListener(func){
		this.gambaS.on('mouseup', func)
	}


	moveTo(x, duration = 4000) {
		let x1 = x*this.width-this.x_offset

		let delay_duration = Math.floor(Math.random()*500)
		let turn_duration = Math.floor(Math.random()*duration/2)-delay_duration
		if(turn_duration < 0) turn_duration = 0
		let asseY = parseInt(Math.random()*5)
		let a = this.width*asseY
		if (parseInt(a)%2 == 0) a = -a

		let move_duration = duration-turn_duration

		setTimeout(() => {
			this.svg
				.transition()
				.delay(delay_duration)
				.duration(turn_duration)
				.ease(d3.easeQuadOut)
				.attr('transform', 'translate('+x1+', '+ a +')')
			this.svg
				.transition()
				.delay(turn_duration)
				.duration(move_duration)
				.attr('transform', 'translate('+x1+', '+this.width+')')
				.on('end', () => {
					//this.xa = x
				})
		}, delay_duration)

	}


}