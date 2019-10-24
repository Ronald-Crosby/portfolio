const $$elements = document.querySelectorAll('.js-parallax')
let bodyTop = document.querySelector('body').getBoundingClientRect().top

let parallaxData = []

function getData() {
    $$elements.forEach($element => {
        // the position of the top of the element from the top of the viewport
        const elTopFromVP = $element.getBoundingClientRect().top
        // top of the element from the top of the body tag
        const elementTopFromBody = elTopFromVP - bodyTop
        // bottom of the element from the top of the body tag
        const elementBottomFromBody = elementTopFromBody + $element.getBoundingClientRect().height

        parallaxData.push({
            elem: $element,
            elTop: parseInt(elementTopFromBody),
            elBottom: parseInt(elementBottomFromBody),
            speed: parseFloat($element.getAttribute('data-parallax')),
            isRotate: $element.classList.contains('parallax-rotate'),
            isScroll: $element.classList.contains('parallax-scroll')
        })
    })
}

console.log(parallaxData)

const updateParallax = () => {
  const windowBottom = window.pageYOffset + window.innerHeight

    parallaxData.forEach((data) => {
        if (windowBottom >= data.elTop && data.elBottom >= window.pageYOffset) {
            // console.log('the element should be in view')
            if (data.isRotate) {
                data.elem.style.transform = `rotate(${ (data.elBottom - windowBottom) * data.speed }deg)`
            } else if (data.isScroll) {
                data.elem.style.transform = `translate3d(0, ${ ((data.elTop - windowBottom) * data.speed) }px, 0)`
            }
        }
    })
}

window.addEventListener('scroll', updateParallax)
getData()

function checkScreen() {
    if(window.innerWidth > 768) {
        updateParallax()
    }
}

checkScreen()
window.addEventListener('resize', checkScreen())
