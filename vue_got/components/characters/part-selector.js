const PartSelector = {
    template: 
    `
    <div class="body-part position-relative">
        <div class="prev-area" @mouseover="hoverPrev = true" @mouseleave="hoverPrev = false">
            <button class="prev-btn" v-show="hoverPrev" @click="selectPrevPart">&#10094;</button>
        </div>
        
        <img :src="selectedPart.src" class="body-img heads-img about-selected">
        
        <div class="next-area" @mouseover="hoverNext = true" @mouseleave="hoverNext = false">
            <button class="next-btn" v-show="hoverNext" @click="selectNextPart">&#10095;</button>
        </div>
    </div>
    `,

    props: {
        parts: {
            type: Array,
            required: true,

        },
        rand: {
            type: Boolean
        }
    },

    data: function() {
        return {
            hoverPrev: false,
            hoverNext: false,
            selectedPartIndex: 0,
            minIndex: 0,
            maxIndex: this.parts.length -1
        }
    },

    watch: {
        rand: function(value) {
            if(value)
                this.selectedPartIndex = getRandom(this.minIndex, this.maxIndex);
                this.$emit('randomInvoked', true);
                this.emitSelected();
        }
    },

    computed: {
        selectedPart: function() {
            return this.parts[this.selectedPartIndex];
        }
    },

    methods: {
        selectPrevPart: function() {
            this.selectedPartIndex = this.selectedPartIndex > this.minIndex ? this.selectedPartIndex - 1 : this.maxIndex;
            this.emitSelected();
        },

        selectNextPart: function() {
            this.selectedPartIndex = this.selectedPartIndex < this.maxIndex ? this.selectedPartIndex + 1 : this.minIndex;
            this.emitSelected();
        },

        emitSelected: function() {
            this.$emit('partSelected', this.selectedPart);
        }
    },

    created() {
        this.emitSelected();
    }
}