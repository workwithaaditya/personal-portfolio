/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Menu show
if(navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu')
   })
}

// Menu hidden
if(navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu')
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
   const header = document.getElementById('header')
   this.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== HOME SPLIT TEXT ===============*/
const homeProfession = document.querySelectorAll('.home__profession-1, .home__profession-2')

homeProfession.forEach((text) => {
   const textContent = text.textContent
   const textSplit = textContent.split('')
   let textHTML = ''

   textSplit.forEach((letter) => {
      textHTML += `<span>${letter}</span>`
   })

   text.innerHTML = textHTML

   // Anime.js animation
   anime({
      targets: text.querySelectorAll('span'),
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50),
      duration: 1000,
      easing: 'easeOutExpo',
      loop: false
   })
})

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper('.projects__swiper', {
   loop: true,
   spaceBetween: 32,
   grabCursor: true,
   
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
   },

   breakpoints: {
      1150: {
         slidesPerView: 2,
         spaceBetween: 48,
      }
   }
})

/*=============== WORK TABS ===============*/
const workTabs = document.querySelectorAll('.work__button'),
      workSections = document.querySelectorAll('.work__content')

workTabs.forEach(button => {
   button.addEventListener('click', () => {
      const target = button.dataset.target

      workSections.forEach(section => {
         if(section.getAttribute('id') === target.substring(1)) {
            section.classList.add('work__content-active')
         } else {
            section.classList.remove('work__content-active')
         }
      })

      workTabs.forEach(btn => {
         if(btn === button) {
            btn.classList.add('work__button-active')
         } else {
            btn.classList.remove('work__button-active')
         }
      })
   })
})

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card')

servicesCards.forEach((card) => {
   const button = card.querySelector('.services__button')
   
   button.addEventListener('click', () => {
      // Remove active class from all cards
      servicesCards.forEach((item) => {
         if(item !== card) {
            item.classList.remove('services__card-show')
         }
      })
      
      // Toggle current card
      card.classList.toggle('services__card-show')
   })
})

/*=============== COPY EMAIL IN CONTACT ===============*/
const contactButton = document.getElementById('contact-button')

contactButton.addEventListener('click', () => {
   const email = 'anid123@email.com'
   
   // Copy email to clipboard
   navigator.clipboard.writeText(email).then(() => {
      // Change button text temporarily
      const originalHTML = contactButton.innerHTML
      contactButton.innerHTML = 'Copied! <i class="ri-check-line"></i>'
      
      setTimeout(() => {
         contactButton.innerHTML = originalHTML
      }, 2000)
   })
})

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const footerYear = document.getElementById('footer-year')
const currentYear = new Date().getFullYear()
footerYear.innerHTML = `&#169; ${currentYear}`

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
   const scrollDown = window.scrollY

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

      if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
         sectionsClass?.classList.add('active-link')
      } else {
         sectionsClass?.classList.remove('active-link')
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.getElementById('cursor')

window.addEventListener('mousemove', (e) => {
   cursor.style.left = e.pageX + 'px'
   cursor.style.top = e.pageY + 'px'
})

/* Hide custom cursor on links */
const links = document.querySelectorAll('a, button')

links.forEach(link => {
   link.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)'
      cursor.style.borderColor = 'var(--first-color-alt)'
   })
   
   link.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)'
      cursor.style.borderColor = 'var(--first-color)'
   })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 400,
   reset: false
})

sr.reveal('.home__data, .home__social, .home__button')
sr.reveal('.home__blob', {origin: 'bottom', delay: 800})
sr.reveal('.about__perfil', {origin: 'left'})
sr.reveal('.about__data', {origin: 'right'})
sr.reveal('.section__title, .projects__container', {delay: 600})
sr.reveal('.work__tabs', {origin: 'left'})
sr.reveal('.work__content', {origin: 'right'})
sr.reveal('.services__card', {interval: 100})
sr.reveal('.testimonials__container', {delay: 600})
sr.reveal('.contact__data', {origin: 'left'})
sr.reveal('.contact__info', {origin: 'right'})
sr.reveal('.footer__container', {delay: 400})
