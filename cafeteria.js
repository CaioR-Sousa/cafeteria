const btToggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".menu")
const menuLinks = document.querySelectorAll(".menu a")
const btVoltar = document.querySelector(".back-to-top")
const animarSecao = document.querySelectorAll(".animar");
const secoes = document.querySelectorAll("main section")
const depoimentosContainer = document.querySelector(".depoimentos-container")
const slides = document.querySelectorAll(".depoimento-card");
const indicadores = document.querySelectorAll(".indicador")

let slideAtual = 0;

function moverSlide() {
    depoimentosContainer.style.transform = `translateX(${-(slideAtual * 100)}%)`

    atualizarIndicadores()
}

function avancarSlide() {
    slideAtual++

    if (slideAtual >= slides.length) {
        slideAtual = 0
    }
    moverSlide()
}

function iniciarCarrossel() {
    intervalo = setInterval(() => {
        avancarSlide();
    }, 3000);
}

depoimentosContainer.addEventListener("mouseenter", () => {
    clearInterval(intervalo)
});

depoimentosContainer.addEventListener("mouseleave", () => {
    iniciarCarrossel()
});

function atualizarIndicadores() {
    indicadores.forEach((indicador) => {
        indicador.classList.remove("ativo")
    })

    indicadores[slideAtual].classList.add("ativo")

}


    indicadores.forEach((indicador, id) => {
        indicador.addEventListener("click", () => {
            slideAtual = id
            moverSlide()
        })
    })

    iniciarCarrossel()




const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("ativo")

            observer.unobserve(entry.target)
        }
    })
});

animarSecao.forEach((secao) => {
    observer.observe(secao)
})

window.addEventListener("scroll", () => {
    secoes.forEach((secao) => {
        const topo = secao.getBoundingClientRect().top
        const alturaDaSecao = secao.offsetHeight

        if (topo <= 150 && topo > -alturaDaSecao) {
            menuLinks.forEach((link) => {
                link.classList.remove("active")

                if (link.getAttribute("href") === "#" + secao.id) {
                    link.classList.add("active")
                }
            })
        }
    })
})

fecharMenu()

btToggle.addEventListener("click", () => {
    menu.classList.toggle("active")
    btToggle.classList.toggle("active")
})

function fecharMenu() {
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("active")
        })
    })
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btVoltar.classList.add("active")
    } else {
        btVoltar.classList.remove("active")
    }
})

btVoltar.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})