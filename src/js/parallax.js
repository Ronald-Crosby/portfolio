const $$elements = document.querySelectorAll('.js-parallax')
let bodyTop = document.querySelector('body').getBoundingClientRect().top

function parallaxEffect() {
    $$elements.forEach($element => {
        const elTopFromVP = $element.getBoundingClientRect().top
        const elementTopFromBody = elTopFromVP - bodyTop
        const elementBottomFromBody = elementTopFromBody + $element.getBoundingClientRect().height
        // console.log(`top: ${elementTopFromBody}, bottom: ${elementBottomFromBody}`)

        window.addEventListener('scroll', () => {
            const windowBottom = window.pageYOffset + window.innerHeight

            if (windowBottom >= elementTopFromBody && elementBottomFromBody >= window.pageYOffset) {
                // console.log('the element should be in view')
                const speed = parseFloat($element.getAttribute('data-parallax'))
                if ($element.classList.contains('parallax-rotate')) {
                    $element.style.transform = `rotate(${ (elementTopFromBody - windowBottom) * speed }deg)`
                } else if ($element.classList.contains('parallax-scroll')) {
                    $element.style.transform = `translateY(${ ((elementTopFromBody - windowBottom) * speed) }px)`
                }
            }
        })

    })
}

function checkScreen() {
    if(window.innerWidth > 768) {
        parallaxEffect()
    }
}

checkScreen()
window.addEventListener('resize', checkScreen())
