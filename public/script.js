class DesignGallery {
    constructor(id) {
        this.container = document.getElementById(id)
        this.nextButton = this.container.querySelector(".next")
        this.prevButton = this.container.querySelector(".prev")
        this.designImages = this.container.querySelectorAll(".dsgn-image")

        this.currentlySelected = 0
        let that = this

        this.nextButton.addEventListener("click", function () {
            that.prevButton.disabled = false
            that.designImages[that.currentlySelected].classList.remove("active")
            that.currentlySelected++
            that.designImages[that.currentlySelected].classList.add("active")
            if (that.currentlySelected == that.designImages.length - 1) {
                that.nextButton.disabled = true
            }
        })

        this.prevButton.addEventListener("click", function () {
            that.nextButton.disabled = false
            that.designImages[that.currentlySelected].classList.remove("active")
            that.currentlySelected--
            that.designImages[that.currentlySelected].classList.add("active")
            if (that.currentlySelected == 0) {
                that.prevButton.disabled = true
            }
        })
    }
}

let firstImageGallery = new DesignGallery("first-gallery")
let secondImageGallery = new DesignGallery("second-gallery")
let thirdImageGallery = new DesignGallery("third-gallery")
let fourthImageGallery = new DesignGallery("fourth-gallery")

