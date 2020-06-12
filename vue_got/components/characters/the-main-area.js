const TheMainArea = {
    template:
    `<div class="container-fluid">
        <h1 class="main-title">Valar Morghulis..</h1>
        <h2 class="main-subtitle">Who's next?</h2>
        <div class="row">

            <div class="col-12"> <!-- figure -->
                <div class="ch-body d-flex flex-column"> <!-- row bodies -->
                    <div class="body-row head-row d-flex justify-content-center"> <!-- head -->
                        <div class="body-part position-relative">
                            <div class="prev-area" @mouseover="hoverPrev = true" @mouseleave="hoverPrev = false">
                                <button class="prev-btn" v-show="hoverPrev" @click="selectPrevHead">&#10094;</button>
                            </div>
                            <img :src="fileParts.heads[selectedHeadIndex].src" class="body-img heads-img about-selected">
                            <div class="next-area" @mouseover="hoverNext = true" @mouseleave="hoverNext = false">
                                <button class="next-btn" v-show="hoverNext" @click="selectNextHead">&#10095;</button>
                            </div>
                        </div>
                    </div> <!-- ends head -->

                    <div class="body-row middle-row d-flex justify-content-center"> <!-- body --->
                        <div class="body-part position-relative">
                            <div class="prev-area" @mouseover="hoverPrev = true" @mouseleave="hoverPrev = false">
                                <button class="prev-btn" v-show="hoverPrev" @click="selectPrevBody>&#10094;</button>
                            </div>
                            <img :src="fileParts.middles[selectedBodyIndex].src" class="body-img heads-img about-selected">
                            <div class="next-area" @mouseover="hoverNext = true" @mouseleave="hoverNext = false">
                                <button class="next-btn" v-show="hoverNext" @click="selectNextBody">&#10095;</button>
                            </div>
                        </div>
                    </div> <!-- ends body -->

                    <div class="body-row foot-row d-flex justify-content-center"> <!-- foot -->
                        <div class="body-part position-relative">
                            <div class="prev-area" @mouseover="hoverPrev = true" @mouseleave="hoverPrev = false">
                                <button class="prev-btn" v-show="hoverPrev" @click="selectPrevFoot>&#10094;</button>
                            </div>
                            <img :src="fileParts.foots[selectedFootIndex].src" class="body-img heads-img about-selected">
                            <div class="next-area" @mouseover="hoverNext = true" @mouseleave="hoverNext = false">
                                <button class="next-btn" v-show="hoverNext" @click="selectNextFoot">&#10095;</button>
                            </div>
                        </div>
                    </div> <!-- ends foot -->
                </div> <!-- ends row bodies -->
            </div> <!-- ends figure -->

            <div class="btn-area d-flex justify-content-center">
                <div class="btn-container d-flex justify-content-between">
                    <button class="btn btn-light">Random</button>
                    <button id="about-btn" class="btn btn-light">About</button>
                    <button class="btn btn-light">Download</button>
                </div>
            </div>
        </div>
    </div>`,

    data: function() {
        return {
            fileParts: bodies,
            hoverPrev: false,
            hoverNext: false,
            selectedHeadIndex: 0,
            selectedBodyIndex: 0,
            selectedFootIndex: 0,
            minIndex: 0,
            maxIndex: bodies.heads.length -1
        }
    },

    methods: {
        selectPrevHead: function() {
            this.selectedHeadIndex = this.selectedHeadIndex > this.minIndex ? this.selectedHeadIndex - 1 : this.maxIndex;
        },

        selectNextHead: function() {
            this.selectedHeadIndex = this.selectedHeadIndex < this.maxIndex ? this.selectedHeadIndex + 1 : this.minIndex;
        },

        selectPrevBody: function() {
            this.selectedBodyIndex = this.selectedBodyIndex > this.minIndex ? this.selectedBodyIndex - 1 : this.maxIndex;
        },

        selectNextBody: function() {
            this.selectedBodyIndex = this.selectedBodyIndex < this.maxIndex ? this.selectedBodyIndex + 1 : this.minIndex;
        },

        selectPrevFoot: function() {
            this.selectedFootIndex = this.selectedFootIndex > this.minIndex ? this.selectedFootIndex - 1 : this.maxIndex;
        },

        selectNextFoot: function() {
            this.selectedFootIndex = this.selectedFootIndex < this.maxIndex ? this.selectedFootIndex + 1 : this.minIndex;
        },
    }
}