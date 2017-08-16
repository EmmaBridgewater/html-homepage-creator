var htmlCreator = new Vue({
    el: ".container",
    data: {
        mainStructure: "",
        outputExpanded: false,
        mod1: {
            headerExpanded: true,
            currency: { gbp: true, eur: false, usd: false },
            collector: { collector: true, noncollector: true },
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
        }
    },
    computed: {
        output: function() {
            var text = ""
            var collectors = [
                this.mod1.collector.collector ? "hp-collector " : "",
                this.mod1.collector.noncollector ? "hp-noncollector " : ""
            ].join("")

            var currencies = [
                this.mod1.currency.gbp ? "hp-gbp " : "",
                this.mod1.currency.eur ? "hp-eur " : "",
                this.mod1.currency.usd ? "hp-usd " : ""
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
        expandHeader: function(element) {
            element.headerExpanded = !element.headerExpanded
        },
        selectFilter: function(filter, subfilter, item) {
            item[filter][subfilter] = !item[filter][subfilter]
        },
        returnHTML: function() {
            this.outputExpanded = !this.outputExpanded
            this.mod1.headerExpanded = !this.outputExpanded
        }
    }
})
