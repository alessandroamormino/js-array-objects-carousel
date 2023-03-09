// Consegna:
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
// Buon lavoro e buon divertimento! :sunglasses:


// PSEUDO CODE: 

/*
- creo array con la definizione delle immagini
- leggere elementi del DOM che formano il carousel
- creo un carousel 
- reperisco la src delle immagini dall'array di oggetti
- creo una variabile di indice e la inizializzo a 0
AL CLICK DELLA FRECCIA IN BASSO
    - aumento l'indice di 1
    ? SE mi trovo nell'ultima immagine
        - azzero il mio indice 
        - cambio la src leggendola dalla proprietà image dell'oggetto all'interno dell'array in posizione indice
        - assegno la classe active 
        - rimuovo la classe active dall'indice precedente
    : ALTRIMENTI
        - cambio la src leggendola dalla proprietà image dell'oggetto all'interno dell'array in posizione indice
        - assegno la classe active 
        - rimuovo la classe active dall'indice precedente
AL CLICK DELLA FRECCIA IN ALTO
    - diminuisco l'indice di 1
    ? SE mi trovo nella prima immagine
        - azzero il mio indice 
        - cambio la src leggendola dalla proprietà image dell'oggetto all'interno dell'array in posizione indice
        - assegno la classe active 
        - rimuovo la classe active dall'indice successivo
    : ALTRIMENTI
        - cambio la src leggendola dalla proprietà image dell'oggetto all'interno dell'array in posizione indice
        - assegno la classe active 
        - rimuovo la classe active dall'indice successivo

BONUS: 
AL CLICK DELL'IMMAGINE THUMBNAIL
    - Cambio la src dell'immagine principale espansa (carousel) sulla base della proprietà image dell'oggetto
    - rimuovo la classe active dalle immagini
    - assegno la classe active all'immagine thumbnail selezionata
*/

// CODE: 

// - creo array con la definizione delle immagini
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, 
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];



// creo un carousel 


// - leggere elementi del DOM che formano il carousel
const carouselImgEl = document.getElementById('carousel-img');
const arrowTopEl = document.getElementById('arrow-top');
const arrowBottomEl = document.getElementById('arrow-bottom');
const thumbContainerEl = document.getElementById('thumbnails-container');
let imgSelectedEl;

// - creo una variabile indice
let index = 0;

// - inserire l'ìmmagine di partenza nel carousel
// parto da quella centrale per styling
carouselImgEl.src = images[0].image;

// - reperisco la src delle immagini dall'array di oggetti
images.forEach((element, i) => {
    for(let key in element){
        if(key == 'image'){
            // - creo n div quante sono le immagini (5) nell'array
            const newThumbnailEl = document.createElement('div');
            thumbContainerEl.append(newThumbnailEl);
            newThumbnailEl.classList.add('thumbnail');
            
            // - creo n img tag quante sono le immagini (5) nell'array
            const newImgThumbEl = document.createElement('img');
            newThumbnailEl.append(newImgThumbEl);

            // - inserire le immagini nella thumbnail sulla base delle src dell'array
            newImgThumbEl.src = element[key];

            // Assegno variabile active all'immagine di partenza
            imgSelectedEl = document.querySelectorAll('.thumbnail img');
            imgSelectedEl[0].classList.add('active');

            // BONUS 1
            // AL CLICK DELL'IMMAGINE THUMBNAIL
            newImgThumbEl.addEventListener('click', function() {
                // - Cambio la src dell'immagine principale espansa (carousel) sulla base della proprietà image dell'oggetto
                carouselImgEl.src = element[key];

                // - rimuovo la classe active dalle immagini
                imgSelectedEl.forEach((element) => {
                    element.classList.remove('active');
                });

                // - assegno la classe active all'immagine thumbnail selezionata
                this.classList.add('active');

                // setto l'indice corrente
                index = i;
            });
        }
    }
});

// Assegno variabile active all'immagine di partenza
// imgSelectedEl = document.querySelectorAll('.thumbnail img');
// imgSelectedEl[0].classList.add('active');



// // - AL CLICK della freccia in basso 
arrowBottomEl.addEventListener('click', () => {
    // aumento l'indice
    index++;

    if(index>images.length-1){
        // azzero l'indice se ho raggiunto ultima posizione
        index=0;
        carouselImgEl.src = images[index].image;
        imgSelectedEl[index].classList.add('active');
        imgSelectedEl[images.length-1].classList.remove('active');
    } else {
        // vado avanti
        carouselImgEl.src = images[index].image;
        imgSelectedEl[index].classList.add('active');
        imgSelectedEl[index-1].classList.remove('active');
    }
});



// - AL CLICK della freccia in alto 
arrowTopEl.addEventListener('click', () => {

    // ? SE l'indice raggiunge la prima immagine disponibile nell'array

    // diminuisco l'indice
    index--;

    if(index<0){
        // porto l'indice all'ultima posizione e vado indietro
        index=images.length-1;
        carouselImgEl.src = images[index].image;
        imgSelectedEl[index].classList.add('active');
        imgSelectedEl[0].classList.remove('active');
    } else {
        // vado indietro
        carouselImgEl.src = images[index].image;
        imgSelectedEl[index].classList.add('active');
        imgSelectedEl[index+1].classList.remove('active');
    }

});