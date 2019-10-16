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
            console.log(dataColor)

            mainTag.className = "transitionBackground " + dataColor
        }

    })
}

document.addEventListener('scroll', updateBackground)
updateBackground()
