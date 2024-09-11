let toggleSetting = document.querySelector(".toggle-setting")
let settingBox = document.querySelector(".setting-box")
let spinIcon = document.querySelector(".toggle-setting i")
let landingPage = document.querySelector(".landing-page")
let landingArr = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]
let backgroundOption = true;
let backgroundInterval;
let colors = document.querySelectorAll(".colors-list li")
let colorsList = Array.from(colors)
let mainColors = localStorage.getItem("colors_option")
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    colorsList.forEach(color => {
        color.classList.remove("active")
        if(color.dataset.color === mainColors) {
            color.classList.add("active")
        }
    })
}
toggleSetting.addEventListener("click", function() {
    settingBox.classList.toggle("open")
    spinIcon.classList.toggle("fa-spin")
})
colorsList.forEach(color => {
    color.addEventListener("click", function (current) {
        colorsList.forEach(color => {
            color.classList.remove("active")
        })
        current.currentTarget.classList.add("active")
        document.documentElement.style.setProperty('--main-color', current.currentTarget.dataset.color);
        localStorage.setItem("colors_option",current.currentTarget.dataset.color)
    })
})
let background = document.querySelectorAll(".random-bg span")
let mainBackground = localStorage.getItem("random_background")
if (mainBackground !== null) {
    if(mainBackground === "true") {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    background.forEach(e => {
        e.classList.remove("active")
    })
    if (mainBackground === "true") {
        document.querySelector(".yes").classList.add("active")
    } else {
        document.querySelector(".no").classList.add("active")
    }
    
}
background.forEach(e => {
    e.addEventListener("click", ele => {
        background.forEach(e => {
            e.classList.remove("active")
        })
        ele.currentTarget.classList.add("active")
        if(ele.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs()
            localStorage.setItem("random_background",true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("random_background",false)
        }
    })
})
function randomizeImgs() {
    if(backgroundOption === true) {
        backgroundInterval= setInterval(() => {
            let randomBackground = landingArr[Math.floor(Math.random() * landingArr.length)]
            landingPage.style.backgroundImage = `url("imgs/${randomBackground}")`
        }, 5000);
    }
}
randomizeImgs()
// Start Skills
let skillsSection = document.querySelector(".skills")
let spans = document.querySelectorAll(".progress > span")
window.onscroll = function () {
    let skillsOffsetTop = skillsSection.offsetTop
    let skillsOuterHeight = skillsSection.offsetHeight
    let windowHeight = this.innerHeight
    if(scrollY > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        spans.forEach(span => {
            span.style.width = span.dataset.width
        })
    } else {
        spans.forEach(span => {
            span.style.width = 0
        })
    }
}
// End Skills
// Start Gallery
let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener("click",function(e) {
        let overlayDiv = document.createElement("div")
        overlayDiv.className = "overlay-box"
        document.body.appendChild(overlayDiv)
        let popupDiv = document.createElement("div")
        popupDiv.className = "popup-box"
        let imgBox = document.createElement("img")
        imgBox.src = img.src
        popupDiv.appendChild(imgBox)
        document.body.appendChild(popupDiv)
        let close = document.createElement("div")
        close.className = "close"
        close.textContent = "X"
        popupDiv.appendChild(close)
        close.addEventListener("click", function() {
            overlayDiv.remove()
            popupDiv.remove()
        })
        if(img.alt !== null) {
            let heading = document.createElement("h3")
            heading.className = "heading-popup"
            let headingText = document.createTextNode(img.alt)
            heading.appendChild(headingText)
            popupDiv.prepend(heading)
        }
    })
})
// End Gallery
// Start Bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet")
bullets.forEach(bullet => {
    bullet.addEventListener("click", e => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        })
    })
})
let bulletsspan = document.querySelectorAll(".show-bullets span")
let bulletsContainer = document.querySelector(".nav-bullets")
let localBullets = localStorage.getItem("bullets_option")
console.log(localBullets)
if (localBullets !== null) {
    bulletsspan.forEach(span => {
        span.classList.remove("active")
    })
    if(localBullets === "block") {
        bulletsContainer.style.display = "block"
        document.querySelector(".show-bullets .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = "none"
        document.querySelector(".show-bullets .no").classList.add("active")
    }
}
bulletsspan.forEach(span => {
    span.addEventListener("click",(e) => {
        bulletsspan.forEach(span => {
            span.classList.remove("active")
        })
        e.target.classList.add("active")
        if(span.dataset.display === "show") {
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option","block")
        } else {
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option","none")
        }
})})
// End Bullets
// Start Reset Options
document.querySelector(".reset-options").onclick = function() {
    localStorage.clear()
    window.location.reload()
}
// End Reset Options
// Toggle
let toggleMenu = document.querySelector(".toggle-menu")
let ulLinks = document.querySelector(".links-container ul")
toggleMenu.onclick = function(e) {
    e.stopPropagation()
    ulLinks.classList.toggle("open")
    if(ulLinks.classList.contains("open")) {
        toggleMenu.classList.add("menu-active")
    } else {
        toggleMenu.classList.remove("menu-active")
    }
}
document.addEventListener("click", e => {
    if(e.target !== toggleMenu && e.target !== ulLinks) {
        if(ulLinks.classList.contains("open")) {
            ulLinks.classList.remove("open")
            toggleMenu.classList.remove("menu-active")
        }
    }
})
ulLinks.onclick = function(e) {
    e.stopPropagation()
}