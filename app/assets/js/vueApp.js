var htmlCreator = new Vue({
	el: "container",
	data: {
		mainStructure,
		views: [
			{ currency: [gbp], collector: [cc] },
			{ currency: [gbp], collector: [nc] },
			{ currency: [eur, usd], collector: [cc] },
			{ currency: [eur, usd], collector: [nc] }
		]
	},
	methods: {
		
	}
})
