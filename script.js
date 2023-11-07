// Scroll bar
const body = document.querySelector('main');
const scrollBar = document.querySelector('.scroll');

window.addEventListener('scroll', () => {
    let scroll = window.scrollY / (body.clientHeight - window.innerHeight);
    let scrollPercent = Math.round(scroll * 100);
    scrollBar.style.width = scrollPercent + '%';
})

// ------------------------------------------------------------------------------------------ //

// partager
let butActuOpen = document.querySelector('.box-partage-ouvrir');
let butActuClose = document.querySelector('.box-partage-fermer');
let Actu = document.querySelector('.partager');

window.addEventListener('scroll', () => {
    let scroll = window.scrollY / (body.clientHeight - window.innerHeight);
    if (scroll > 0.01) {
        butActuOpen.style.opacity = 0.25;
    } else {
        butActuOpen.style.opacity = 1;
    }
})

butActuOpen.addEventListener('mouseover', () => {
    butActuOpen.style.opacity = 1;
})

butActuOpen.addEventListener('mouseout', () => {
    butActuOpen.style.opacity = 0.25;
})

butActuOpen.addEventListener("click", () => {
    Actu.classList.add("actif");
})

butActuClose.addEventListener("click", () => {
    Actu.classList.remove("actif");
})

// ------------------------------------------------------------------------------------------ //

//Responsive Navbar
var menu = document.querySelector(".navigation");
var m_open = document.querySelector(".open");
var m_close = document.querySelector(".close");

m_open.addEventListener("click", () => {
    menu.classList.add("active");
})

m_close.addEventListener("click", () => {
    menu.classList.remove("active");
})

// ------------------------------------------------------------------------------------------ //

//Carrousel

var allCarrousel = [];
var allShown = [];

function calculShown() {
    allShown = []
    allCarrousel.forEach(function (item, index, array) {
        var actuelShown = item[0].children[item[4]];
        allShown.push(actuelShown)
    })
    return allShown;
};

function defIntervale(change) {
    let timer = setInterval(() => {
        change[0].children[change[3]].classList.remove('before');
        change[0].children[change[4]].classList.remove('shown');
        change[0].children[change[5]].classList.remove('after');

        change[4] += 1

        if (change[4] < 0) {
            change[4] += change[1]
        } else if (change[4] >= change[1]) {
            change[4] -= change[1]
        }

        change[3] = change[4] - 1
        change[5] = change[4] + 1

        if (change[3] < 0) {
            change[3] += change[1]
        }
        if (change[5] >= change[1]) {
            change[5] -= change[1]
        }

        // Une fois la transition finie
        setTimeout(() => {
            change[0].children[change[3]].classList.add('before');
            change[0].children[change[4]].classList.add('shown');
            change[0].children[change[5]].classList.add('after');
            var allShown = calculShown();
            //Waiting(allshown)
        }, 200);
    }, change[6] * 1000);
    return timer;
}

/*function Waiting(allShown) {
    for(let shown of allShown){

        shown.addEventListener('mouseover', () => {
            console.log('On')
    
            let parentOf = shown.parentNode;
            let section = parentOf.dataset.carrousel
    
            allCarrousel.forEach(function(item, index, array) {
                if (item[2] == section){
                    let change = item;
                    clearInterval(change[7]);
                    console.log('on arrete tout', change[7]);
                }
            })
        })
    
        shown.addEventListener('mouseleave', () => {
            console.log('Off')
    
            let parentOf = shown.parentNode;
            let section = parentOf.dataset.carrousel
    
            allCarrousel.forEach(function(item, index, array) {
                if (item[2] == section){
                    let change = item;
                    change[7] = defIntervale(change)
                    console.log('on relance tout !', change[7]);
                }
            })
        })
    }
}*/

for (let carrousel of document.querySelectorAll('[data-carrousel]')) {
    let section = carrousel.dataset.carrousel;
    let nombre = carrousel.children.length;
    let index = 0
    let before = index - 1
    let after = index + 1
    let tps = carrousel.dataset.time

    if (before < 0) {
        before += nombre
    }
    if (after >= nombre) {
        after -= nombre
    }

    let newCarrousel = [carrousel, nombre, section, before, index, after, tps]
    let timer = defIntervale(newCarrousel)
    newCarrousel.push(timer)
    allCarrousel.push(newCarrousel)

    carrousel.children[before].classList.add('before');
    carrousel.children[index].classList.add('shown');
    carrousel.children[after].classList.add('after');

    var allShown = calculShown();
    //Waiting(allShown);
}

var groupesBoutons = document.querySelectorAll('[data-boutons]');
for (let bouton of groupesBoutons) {

    bouton.addEventListener('click', () => {

        allCarrousel.forEach(function (item, index, array) {
            if (item[2] == bouton.dataset.sections) {
                let change = item;

                change[0].children[change[3]].classList.remove('before');
                change[0].children[change[4]].classList.remove('shown');
                change[0].children[change[5]].classList.remove('after');

                let nom = bouton.dataset.boutons;

                if (nom == "gauche") {
                    change[4] -= 1;
                } else {
                    change[4] += 1;
                }

                if (change[4] < 0) {
                    change[4] += change[1];
                } else if (change[4] >= change[1]) {
                    change[4] -= change[1];
                }

                change[3] = change[4] - 1;
                change[5] = change[4] + 1;

                if (change[3] < 0) {
                    change[3] += change[1];
                }
                if (change[5] >= change[1]) {
                    change[5] -= change[1];
                }

                change[0].children[change[3]].classList.add('before');
                change[0].children[change[4]].classList.add('shown');
                change[0].children[change[5]].classList.add('after');

                var allShown = calculShown();
                //Waiting(allShown);
            }
        })
    })
}

// Copie Presse papier //

document.getElementById('copy').addEventListener('click', function () {
    document.getElementById('link').select();
    if (document.execCommand('copy')) {
        alert("Le lien a été copié dans le presse-papiers ! :D");
    } else {
        alert("Le lien n'a pas pu être copié dans le presse-papiers... :c");
    }
});