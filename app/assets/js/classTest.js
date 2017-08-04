class htmlCreator {
	constructor() {
		this.users = [
		{ class: "hp-noncollector", icon: "G" },
		{ class: "hp-collector", icon: "C" }
		];
		this.currencies = [
		{ class: "hp-gbp", icon: "&pound;" },
		{ class: "hp-usd", icon: "&dollar;" },
		{ class: "hp-eur", icon: "&euro;" }
		];
		this.inputDivs = $("<div />");
		this.sectionHeaders = $(".hcContainer h2");
		this.events();
		this.createInputContainers.call(this);
	}

	events() {
		this.sectionHeaders.on("mousedown", function(){
			$(this).toggleClass("headerExpanded");
		});

		this.sectionHeaders.append($('<span class="headerArrow">&#x25BA;</span>')).after($inputDivs);
	}

	createInputContainers() {
		for(var i = 1; i < 4; i++){
			this.inputDivs.append(
				$("<div />").append(
					$("<h3 />")
					.text("Image " + i)
					)
				);
		}
	}
}