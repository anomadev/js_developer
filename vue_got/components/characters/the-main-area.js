const TheMainArea = {
    template:
    `<div class="container-fluid">
        <h1 class="main-title">Valar Morghulis..</h1>
        <h2 class="main-subtitle">Who's next?</h2>
        <div class="row">
            <div v-show="isAboutOpen" class="text-center text-md-left" :class="quotesClass" id="quote-area"> <!-- quote area -->
                <div v-if="apiCalled" class="spinner-container">
                    <div class="spinner-grow red-spinner" role="status">
                        <span class="sr-only"Loading...></span>
                    </div>
                </div>
                <ul class="quote-list">
                    <li v-for="quote in selectedChar.quotes">{{ quote }}</li>
                </ul>
            </div> <!-- ends quote area -->

            <div :class="figureClass"> <!-- figure -->
                <div class="ch-body d-flex flex-column"> <!-- row bodies -->
                    <div class="body-row head-row d-flex justify-content-center"> <!-- head -->
                        <PartSelector :parts="fileParts.heads" 
                            :rand="randomHead" 
                            @randomInvoked="invoked => randomHead = !invoked"
                            @partSelected="part => partSelected(part)">
                        </PartSelector>
                    </div> <!-- ends head -->

                    <div class="body-row middle-row d-flex justify-content-center"> <!-- body --->
                        <PartSelector :parts="fileParts.middles" 
                            :rand="randomMiddle" 
                            @randomInvoked="invoked => randomMiddle = !invoked"
                            @partSelected="part => partSelected(part)">
                        </PartSelector>
                    </div> <!-- ends body -->

                    <div class="body-row foot-row d-flex justify-content-center"> <!-- foot -->
                        <PartSelector :parts="fileParts.foots" 
                            :rand="randomFoot" 
                            @randomInvoked="invoked => randomFoot = !invoked"
                            @partSelected="part => partSelected(part)">
                        </PartSelector>
                    </div> <!-- ends foot -->
                </div> <!-- ends row bodies -->

                <div class="btn-area d-flex justify-content-center">
                    <div v-if="!takingScreenshot" class="btn-container d-flex justify-content-between">
                        <button class="btn btn-light" @click="randomAll">Random</button>
                        <button id="about-btn" class="btn btn-light" @click="aboutToggle" ref="btnAbout">About</button>
                        <button class="btn btn-light" @click="takeScreenshot">Download</button>
                    </div>
                </div>
            </div> <!-- ends figure -->

            <div v-show="isAboutOpen" id="about-area" :class="aboutClass"> <!-- about area -->
                <div v-if="apiCalled" class="spinner-container">
                    <div class="spinner-grow red-spinner" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <div class="text-center text-md-left" v-else="!apiCalled">
                    <p class="about-p"><b>Name: </b>{{ selectedChar.name }}</p>
                    <p class="about-p"><b>Born: </b>{{ selectedChar.born }}</p>
                    <p class="about-p"><b>Culture: </b>{{ selectedChar.culture }}</p>
                    <p class="about-p"><b>Titles: </b></p>
                    <ul class="about-titles">
                        <li v-for="title in selectedChar.titles">{{ title }}</li>
                    </ul>
                </div>
            </div> <!-- ends about area-->
        </div>
    </div>`,

    components: { 
        PartSelector 
    },

    data: function() {
        return {
            fileParts: bodies,
            randomHead: false,
            randomMiddle: false,
            randomFoot: false,
            selectedCharId: 1,
            selectedParts: {
                head: {},
                middle: {},
                foot: {}
            },

            isAboutOpen: false,
            isAboutSelected: false,
            quotesClass: 'col-12 col-md-4 quotes',
            aboutClass: 'col-12 col-md-4',
            figureClass: 'col-12',
            selectedChar: {
                id: 0,
                name: "",
                born: "",
                culture: "",
                titles: [],
                quotes: []
            },
            apiCalled: false,
            takingScreenshot: false,
            message: 'Close'
        }
    },

    methods: {
        randomAll: function() {
            this.randomHead = true;
            this.randomMiddle = true;
            this.randomFoot = true;
        },

        partSelected: function(part) {
            if(part.type == 'heads') {
                this.selectedParts.head = part;
                this.selectedCharId = part.id;
                this.aboutCharacter();
            }

            if(part.type == 'middles') {
                this.selectedParts.middle = part;
            }

            if(part.type == "foots") {
                this.selectedParts.foot = part;
            }
        },

        aboutToggle: function() {
            if(this.isAboutOpen) {
                this.closeAbout();
            } else {
                this.isAboutSelected = true;
                this.aboutCharacter();
                this.$refs.btnAbout.innerText = this.message;
            }
        },

        closeAbout: function() {
            this.isAboutOpen = false;
            this.isAboutSelected = false;
            this.quotesClass = 'col-12 col-md-4 quotes';
            this.aboutClass = 'col-12 col-md-4';
            this.figureClass = 'col-12';
        },

        aboutCharacter: function() {
            if(this.isAboutSelected) {
                this.apiCalled = true;
                this.isAboutOpen = true;
                this.aboutClass = "col-12 order-1 col-md-4 order-md-3 about area-active";
                this.aboutClass = "col-12 order-3 col-md-4 order-md-1 about area-active";
                this.figureClass = "col-12 order-2 col-md-4 order-md-2";
            }

            if(this.isAboutOpen && this.selectedParts.head.id != undefined) {
                let charApiId = this.selectedParts.head.apiId;
                if(charApiId != null) {
                    let apiUrl = 'https://www.anapioficeandfire.com/api/characters/' + charApiId;
                    axios.get(apiUrl).then((response) => {
                        this.selectedChar.id = this.selectedCharId;
                        this.selectedChar.name = response.data.name;
                        this.selectedChar.born = response.data.born;
                        this.selectedChar.culture = response.data.culture;
                        this.selectedChar.titles = response.data.titles;
                        this.selectedChar.quotes = this.selectedParts.head.quotes;
                        this.apiCalled = false;
                    }).catch(error => {
                        console.log(error);
                        this.apiCalled = false;
                    })
                } else {
                    this.selectedChar.id = this.selectedCharId;
                    this.selectedChar.name = " ?? ";
                    this.selectedChar.born = " ";
                    this.selectedChar.culture = " ";
                    this.selectedChar.titles = this.selectedParts.head.name;
                    this.selectedChar.quotes = ["++"];
                    this.apiCalled = false;
                }
            }
        },

        takeScreenshot: function() {
            this.takingScreenshot = true;
            let selector = document.querySelector('main');
            html2canvas(selector).then(canvas => {
                let croppedCanvas = document.createElement('canvas');
                croppedCanvasContext = croppedCanvas.getContext('2d');

                croppedCanvas.width = selector.clientWidth;
                croppedCanvas.height = selector.clientHeight;

                croppedCanvasContext.drawImage(canvas,
                    0, 0, selector.clientWidth, selector.clientHeight,
                    0, 0, selector.clientWidth, selector.clientHeight);

                return croppedCanvas;
            }).then(canvas => {
                let imageUrl = canvas.toDataURL("image/png", 1.0);
                let link = document.createElement('a');
                link.download = "screenshot.png";
                link.href = imageUrl;
                link.click();
                this.takingScreenshot = false;
            })
        }
    }
}