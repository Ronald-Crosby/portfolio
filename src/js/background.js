const mainTag = document.getElementById('mainTag')
const $$sections = document.querySelectorAll('.section')

function updateBackground() {
    let windowTopPosition = window.pageYOffset

    $$sections.forEach($section => {
        const sectionTop = $section.offsetTop

        if(windowTopPosition + 500 >= sectionTop) {
            const dataColor = $section.getAttribute('data-color')
            mainTag.className = "transition-background overflow-hidden " + dataColor
        }

    })
}

document.addEventListener('scroll', updateBackground)
updateBackground()
