var htmlCreator = new Vue({
    el: ".container",
    data: {
        inputExpanded: false,
        outputExpanded: false,
        input: "",
        currentMod: "mod1",
        headerExpanded: true,
        mod1: {
            header: "Carousel",
            category: {
                gbp: true,
                eur: true,
                usd: true,
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
                { desktopImg: "", mobileImg: "", link: "", altText: "" },
                { desktopImg: "", mobileImg: "", link: "", altText: "" }
            ]
        },
        mod2: {
            header: "Heroes",
            category: {
                gbp: true,
                eur: true,
                usd: true,
                collector: true,
                noncollector: true
            },
            content: [
                { desktopImg: "", mobileImg: "", link: "", altText: "" },
                { desktopImg: "", mobileImg: "", link: "", altText: "" },
                { desktopImg: "", mobileImg: "", link: "", altText: "" }
            ]
        }
    },
    computed: {
        moduleContent: function() {
            return this[this.currentMod]
        },
        inputIcon: function() {
            if (this.inputExpanded) {
                return "done"
            } else {
                return "vertical_align_bottom"
            }
        },
        output: function() {
            var text = ""
            var collectors = [
                this[this.currentMod].category.collector ? "hp-collector " : "",
                this[this.currentMod].category.noncollector ? "hp-noncollector " : ""
            ]
                .join("")
                .trim()

            var currencies = [
                this[this.currentMod].category.gbp ? "hp-gbp " : "",
                this[this.currentMod].category.eur ? "hp-eur " : "",
                this[this.currentMod].category.usd ? "hp-usd " : ""
            ].join("")

            text +=
                "<div class='" +
                collectors +
                "'>" +
                "\n  <div class='" +
                currencies +
                "hp-slick'>"

            this[this.currentMod].content.forEach(function(details) {
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
        inputHTML: function() {
            this.inputExpanded = !this.inputExpanded
            this.headerExpanded = !this.inputExpanded
            this.outputExpanded = false
            if (!this.inputExpanded) {
                this.processInputHTML(this[this.currentMod])
            }
        },
        processInputHTML: function() {
            var currentModule = this[this.currentMod]
            var inputData = this.input.replace(/"/g, "'")
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
                Object.keys(currentModule.category).forEach(function(key) {
                    currentModule.category[key] = false
                })
                // ...then add in categories from input
                categories.forEach(function(cat) {
                    currentModule.category[cat] = true
                })

                // image handling
                var images = inputData
                    .match(/(?:srcset=').*(?='>)/g)
                    .map(function(e) {
                        return e.replace(/srcset='/, "")
                    })
                // replace image inputs
                var counter = 0
                currentModule.content.forEach(function(slide) {
                    slide.desktopImg = images[counter + 1]
                    slide.mobileImg = images[counter]
                    counter += 2
                })

                // link handling
                var links = inputData
                    .match(/(?:a href=').*(?='>)/g)
                    .map(function(e) {
                        return e.replace(/a href='/, "")
                    })

                currentModule.content.forEach(function(slide, index) {
                    slide.link = links[index]
                })

                // alt text handling
                var alt = inputData
                    .match(/(?:alt=').*(?='>)/g)
                    .map(function(e) {
                        return e.replace(/alt='/, "")
                    })

                currentModule.content.forEach(function(slide, index) {
                    slide.altText = alt[index]
                })
            }
        },
        setCurrentMod: function(mod) {
            this.currentMod = mod
        },
        expandHeader: function() {
            this.headerExpanded = !this.headerExpanded
        },
        selectFilter: function(filter, module) {
            this[this.currentMod].category[filter] = !this[this.currentMod].category[filter]
        },
        outputHTML: function() {
            this.outputExpanded = !this.outputExpanded
            this.headerExpanded = !this.outputExpanded
            this.inputExpanded ? this.inputHTML() : null
        }
    }
})
