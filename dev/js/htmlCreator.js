var users = ["g","c"];
var currencies = ["gbp","eur","usd"];
var inputs = [
	{
		icon: "&#xE30C;",
		name: "imgd",
		placeholder: "Desktop Image (https://www...)"
	},
	{
		icon: "&#xE32C;",
		name: "imgm",
		placeholder: "Mobile Image (https://www...)"
	},
	{
		icon: "&#xE157;",
		name: "link",
		placeholder: "Link (https://www...)"
	},
	{
		icon: "&#xE262;",
		name: "text",
		placeholder: "Alt Text"
	}
];

function createInputContainers(){
	var $inputDivs = $("<div />");

	for(var i = 1; i < 4; i++){
		$inputDivs.append(
			$("<div />").append(
				$("<h3 />")
				.text("Image " + i)
			)
		)
	}

	$(".hcContainer h2").append($('<span class="headerArrow">&#x25BA;</span>')).after($inputDivs);

	createFilterIcons(currencies);
	createFilterIcons(users);
	createInputs();
}

function createInputs(){
	var $inputContainer = $('<div class="hcInputs">');

	inputs.forEach(function(input) {
		$inputContainer.append(
			$('<div class="hcInputWrapper" />')
			.append($('<i class="material-icons">'+input.icon+'</i>'))
			.append($('<input type="text" name="mod1-'+input.name+'-1" placeholder="'+input.placeholder+'">'))
		)
	})

	$(".hcContainer h3").after($inputContainer);

	$(".hcFilters").each(function(){
		var containerClass = $(this).parent().attr("data-filter").split(" ");
		$(this).find("input").removeClass("filterSelected");
		for(var i = 0; i< containerClass.length; i++){
			$(this).find("input.hc-filter-"+containerClass[i]).parent().addClass("filterSelected");
		}
	})
}

function hideUnusedContainers() {
	$("h2").each(function(){
		var currentFilters = $(this).attr("data-filter").split(" ");
		if(currentFilters.length < 2){
			$(this).hide();
			$(this).next().hide();
		} else {
			$(this).show();
			$(this).next().show();
		}
	})
}

// create filter icons and append to h2s
function createFilterIcons(filterArray){
	var $filterContainer = $("<div class='hcFilters' />");
	h2total = $(".hcContainer h2").length;

	filterArray.forEach(function(filter){
		var newIcon = $('<label />')
		.append($('<input type="checkbox" class="hc-filter-'+filter+'" value="'+filter+'">'))
		.append($("<span />")
			.html(filter=="gbp"?"&pound;":filter=="usd"?"&dollar;":filter=="eur"?"&euro;":filter)
			)
		.on("mousedown",function(event){
			$(this).toggleClass("filterSelected");
			var $selectedFilters = $(this).parent().parent().find(".filterSelected");
			var parentFilters = "";
			$selectedFilters.each(function(){
				parentFilters += $(this).children().first().attr("value")+" ";
			})
			$(this).parent().parent().attr("data-filter",parentFilters);
			hideUnusedContainers();
			event.stopPropagation();
		});
		$filterContainer.append(newIcon)
	})

	$(".hcContainer h2").append($filterContainer);
}

$(document).ready(function(){
	createInputContainers();

	$(".hcSectionContainer h2").on("mousedown", function(event){
		$(this).toggleClass("headerExpanded");
		event.stopPropagation();
	});
})