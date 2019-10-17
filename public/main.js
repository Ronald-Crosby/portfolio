const blue = '#283CDA'
const purple = '#6B08DC'
const mainTag = document.getElementById('mainTag')
const $$sections = document.querySelectorAll('.section')

// find out the position of the top of the window on the Y axis

function updateBackground() {
    let windowTopPosition = window.pageYOffset

    // find out the position of the top of each section along the Y axis
    $$sections.forEach($section => {
        const sectionTop = $section.offsetTop

        if(windowTopPosition + 500 >= sectionTop) {
            const dataColor = $section.getAttribute('data-color')
            mainTag.className = "transitionBackground overflow-hidden " + dataColor
        }

    })
}

document.addEventListener('scroll', updateBackground)
updateBackground()

// parallax effect on SVGs

const $$scrollEffectImages = document.querySelectorAll('.scroll-effect-image')
console.log($$scrollEffectImages)
const $$SVGTags = document.querySelectorAll(`[data-scroll]`)
console.log($$SVGTags)
const windowHeight = window.innerHeight

document.addEventListener('scroll', () => {
    const scrolledDistance = window.pageYOffset
    const viewportMiddle = window.pageYOffset + (window.innerHeight / 2)

    $$scrollEffectImages.forEach($image => {
        const imageMiddle = $image.offsetTop + ($image.offsetHeight / 2)
        const distanceToImageMiddle = viewportMiddle - imageMiddle

        $$SVGTags.forEach($SVG => {
            const speed = parseFloat($SVG.getAttribute('data-scroll'))
            if($SVG.classList.contains('js-translateY')) {
                $SVG.style.transform = `translateY(${distanceToImageMiddle * speed}px)`
            } else if ($SVG.classList.contains('js-translateX')) {
                $SVG.style.transform = `translateX(${distanceToImageMiddle * speed}px)`
            }
        })


    })
})
