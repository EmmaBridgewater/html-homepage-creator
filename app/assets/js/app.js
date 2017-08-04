function createInputContainers(){
	var users = [
		{ class: "hp-noncollector", icon: "G" },
		{ class: "hp-collector", icon: "C" }
	];
	var currencies = [
		{ class: "hp-gbp", icon: "&pound;" },
		{ class: "hp-usd", icon: "&dollar;" },
		{ class: "hp-eur", icon: "&euro;" }
	];
	var $inputDivs = $("<div />");

	for(var i = 1; i < 4; i++){
		$inputDivs.append(
			$("<div />").append(
				$("<h3 />")
				.text("Image " + i)
				)
			);
	}

	$(".hcContainer h2").on("mousedown", function(){
		$(this).toggleClass("headerExpanded");
	});

	$(".hcContainer h2").append($('<span class="headerArrow">&#x25BA;</span>')).after($inputDivs);

	createFilterIcons(currencies);
	createFilterIcons(users);
	createInputs();
}

function createInputs(){
	var inputs = [
		{ icon: "&#xE30C;", name: "imgd", placeholder: "Desktop Image (.jpg)" },
		{ icon: "&#xE32C;", name: "imgm", placeholder: "Mobile Image (.jpg)" },
		{ icon: "&#xE157;", name: "link", placeholder: "Link (https://www...)" },
		{ icon: "&#xE262;", name: "alt", placeholder: "Alt Text" }
	]

	var $inputContainer = $('<form class="hcInputs">')

	inputs.forEach(function(input) {
		$inputContainer.append(
			$('<div class="hcInputWrapper" />')
			.append($('<i class="material-icons">'+input.icon+'</i>'))
			.append($('<input type="text" class="text-'+input.name+'" placeholder="'+input.placeholder+'">'))
			);
	})

	$(".hcContainer h3").after($inputContainer);

	$(".hcFilters").each(function(){
		var containerClass = $(this).parent().attr("data-filter").split(" ");
		$(this).find("input").removeClass("filterSelected");
		for(var i = 0; i< containerClass.length; i++){
			$(this).find("input."+containerClass[i]).parent().addClass("filterSelected");
		}
	})
}

// function hideUnusedContainers() {
// 	$("h2").each(function(){
// 		var currentFilters = $(this).attr("data-filter").split(" ")
// 		if(currentFilters.length < 2){
// 			$(this).hide()
// 			$(this).next().hide()
// 		} else {
// 			$(this).show()
// 			$(this).next().show()
// 		}
// 	})
// }

// create filter icons and append to h2s
function createFilterIcons(filterArray){
	var $filterContainer = $("<div class='hcFilters' />");
	var h2total = $(".hcContainer h2").length;

	filterArray.forEach(function(filter){
		var newIcon = $('<label />')
		.append($('<input type="checkbox" class="'+filter.class+'" value="'+filter.icon+'">'))
		.append($("<span>"+filter.icon+"</span>"))
		.on("mousedown",function(e){
			$(this).toggleClass("filterSelected")
			var $selectedFilters = $(this).parent().parent().find(".filterSelected")
			var parentFilters = ""
			$selectedFilters.each(function(){
				parentFilters += $(this).children().first().attr("class")+" "
			})
			$(this).parent().parent().attr("data-filter",parentFilters)
			// hideUnusedContainers()
			e.stopPropagation()
		});
		$filterContainer.append(newIcon);
	})

	$(".hcContainer h2").append($filterContainer);
}

function createHTML() {
	if (checkBlanks() < 1) {
		var imgURL = "https://www.emmabridgewater.co.uk/content/ebiz/eb/resources/images/homepages/";
		
		var text = 	"<div class='hp-collector hp-noncollector'>"
		+ "\n  <div class='hp-gbp hp-eur hp-usd hp-slick'>";

		$('.hcInputs').each(function(){
			var imgd = $(this).find($('.text-imgd')).val();
			var imgm = $(this).find($('.text-imgm')).val();
			var link = $(this).find($('.text-link')).val();
			var alt = $(this).find($('.text-alt')).val();

			text +=	"\n    <div>"
			+	"\n      <a href='"+link+"'>"
			+	"\n        <picture>"
			+	"\n          <source media='(max-width: 600px)' srcset='"+imgURL+imgm+"'>"
			+	"\n          <source media='(min-width: 600px)' srcset='"+imgURL+imgd+"'>"
			+	"\n          <img src='"+imgURL+imgd+"' alt='"+alt+"'>"
			+	"\n        </picture>"
			+	"\n      </a>"
			+	"\n    </div>";
		});


		text +=	"\n  </div>"
		+ 	"\n</div>";

		$("#htmlOutput").text(text).addClass("outputExpanded");

		$(".headerExpanded").removeClass("headerExpanded");
	}
}

function selectAll() {
	$(this).select();
}

function checkBlanks() {
	var errors = 0;
	$("input[type=text").each(function(){
		if ($(this).val().length < 1) {
			$(this).addClass("blankInput")
			.on("keypress",removeBorder);
			errors++;
		} else {
			removeBorder();
		}
	})
	return errors
}

function removeBorder() {
	$(this).removeClass("blankInput")
	.off();
}

$(document).ready(function(){
	createInputContainers();
	$('#hcSubmit').click(createHTML);
	$('#htmlOutput').on("mouseup", selectAll);
})