var htmlCreator = new Vue({
    el: ".container",
    data: {
        inputIcon: "get_app",
        inputExpanded: false,
        outputExpanded: false,
        input: "",
        headerExpanded: true,
        mod1: {
            category: {
                gbp: true,
                eur: false,
                usd: false,
                collector: true,
                noncollector: true
            },
            content: [
                {
                    desktopImg:
                        "https://www.emmabridgewater.co.uk/content/ebiz/eb/resources/images/homepages/170810_cherries_desktop.jpg",
                    mobileImg:
                        "https://www.emmabridgewater.co.uk/content/ebiz/eb/resources/images/homepages/170810_cherries_mobile.jpg",
                    link: "https://www.emmabridgewater.co.uk/icat/patcherries",
                    altText: "50% off Summer Cherries"
                },
                { desktopImg: "xx", mobileImg: "", link: "", altText: "" },
                { desktopImg: "", mobileImg: "", link: "", altText: "" }
            ]
        }
    },
    computed: {
        output: function() {
            var text = ""
            var collectors = [
                this.mod1.category.collector ? "hp-collector " : "",
                this.mod1.category.noncollector ? "hp-noncollector " : ""
            ].join("")

            var currencies = [
                this.mod1.category.gbp ? "hp-gbp " : "",
                this.mod1.category.eur ? "hp-eur " : "",
                this.mod1.category.usd ? "hp-usd " : ""
            ].join("")

            text +=
                "<div class='" +
                collectors.trim() +
                "'>" +
                "\n  <div class='" +
                currencies +
                "hp-slick'>"

            this.mod1.content.forEach(function(details) {
                text +=
                    "\n    <div>" +
                    "\n      <a href='" +
                    details.link +
                    "'>" +
                    "\n        <picture>" +
                    "\n          <source media='(max-width: 600px)' srcset='" +
                    details.mobileImg +
                    "'>" +
                    "\n          <source media='(min-width: 600px)' srcset='" +
                    details.desktopImg +
                    "'>" +
                    "\n          <img src='" +
                    details.desktopImg +
                    "' alt='" +
                    details.altText +
                    "'>" +
                    "\n        </picture>" +
                    "\n      </a>" +
                    "\n    </div>"
            })

            text += "\n  </div>" + "\n</div>\n"

            return text
        }
    },
    methods: {
        inputHTML: function(section) {
            this.inputExpanded = !this.inputExpanded
            this.headerExpanded = !this.inputExpanded
            this.outputExpanded = false
            if (this.inputExpanded) {
                this.inputIcon = "done"
            } else {
                this.inputIcon = "get_app"
                this.processInputHTML(section)
            }
        },
        processInputHTML: function(section) {
            var inputData = this.input
            if (inputData.search(/hp-/) > 0) {
                // category handling
                var categories = inputData
                    .match(/hp-.*\b/g)
                    .join(" ")
                    .replace(/hp-/g, "")
                    .split(" ")
                    .filter(function(e) {
                        return e !== "slick"
                    })
                // reset categories...
                Object.keys(section.category).forEach(function(key) {
                    section.category[key] = false
                })
                // ...then add in categories from input
                categories.forEach(function(cat) {
                    section.category[cat] = true
                })

                // image handling
                var images = inputData
                    .match(/(?:srcset=').*(?='>)/g)
                    .map(function(e) {
                        return e.replace(/srcset='/, "")
                    })
                // replace image inputs
                var counter = 0
                section.content.forEach(function(slide){
                    slide.desktopImg = images[counter+1]
                    slide.mobileImg = images[counter]
                    counter += 2
                })

                // link handling
                var links = inputData
                    .match(/(?:a href=').*(?='>)/g)
                    .map(function(e) {
                        return e.replace(/a href='/, "")
                    })

                section.content.forEach(function(slide, index){
                    slide.link = links[index]
                })

                // alt text handling
                var alt = inputData
                    .match(/(?:alt=').*(?='>)/g)
                    .map(function(e) {
                        return e.replace(/alt='/, "")
                    })

                section.content.forEach(function(slide, index){
                    slide.altText = alt[index]
                })
            }
        },
        expandHeader: function() {
            this.headerExpanded = !this.headerExpanded
        },
        selectFilter: function(filter, item) {
            item.category[filter] = !item.category[filter]
        },
        outputHTML: function() {
            this.outputExpanded = !this.outputExpanded
            this.headerExpanded = !this.outputExpanded
            this.inputExpanded ? this.inputHTML() : null
        }
    }
})
