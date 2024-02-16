'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to'); //Getting button that starts smooth scroll
const section1 = document.querySelector('#section--1'); // getting element we want to scroll to
const nav = document.querySelector('.nav'); // Nav bar element
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////

// Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  //--Modern method
  section1.scrollIntoView({ behavior: 'smooth' });
  /*
  //--Old method
  const s1coords = section1.getBoundingClientRect(); // This returns a DOM rectangle which is the postion and dimensions of the element in relation to viewport
  console.log(s1coords);
  /* Extras regarding scroll postion and viewport size
  console.log(`Current scroll position (X/Y)`, window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  )
   //Scrolling
  window.scrollTo(
    s1coords.left + window.pageXOffset, // You have to work it out in relation to current postion and current scroll
    s1coords.top + window.pageYOffset
  );
   
  //Smooth Scrolling
  //To modify the scroll behavior you have to pass in an object
    window.scrollTo({
    left: s1coords.left + window.pageXOffset, // You have to work it out in relation to current postion and current scroll
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
    });
  */
});

////////////////////////////////////////////////////

// Event Delegation - Implimenting page navigation with smooth scrolling

/* Less efficient method
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault(); // Used to prevent anchor elements navigation
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  });
});
*/

//Above code is fine when there is only a couple of links but if you have a lot of elements you are
//Adding the function n number of times, which would eventually impact performance. This is where
//delegation comes in.

//Event delegation
//1. Add event listener to common parent element
//2. Determine which of the elements the event orginated.

document.querySelector(`.nav__links`).addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy - Making sure target is a link element
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

////////////////////////////////////////////////////

//-- Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Returns a node list doesn't automatically update with DOM changes
console.log(allSections);

document.getElementById('section--1'); // Get a specific element by unique Id

const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // Returns a HTML Collection which will automatically update with any changes in the DOM

document.getElementsByClassName('btn'); // Also returns HTML Collection

// -- Creating and inserting elements
// .insertAdjacentHTML, set bankist app in section 12

const message = document.createElement('div'); //Creates and DOM element and stores in  message variable
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
/*
header.prepend(message); // Inserted the message element as the first child of header element
header.append(message); // Inserted the message element as the last child of header element
//The message element can only exist in one place so it is appended as thats the last line
header.append(message.cloneNode(true)); // To make a copy you can clone. True means all child elements will also be cloned
*/ //The before and after insert the new element as a sibling either before or after
header.after(message);
header.before(message);

//Delete an element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

////////////////////////////////////////////////////
//-- Building tabbed component
tabsContainer.addEventListener('click', e => {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  //Guard clause, if user clicks an area of the tab container which is not a tab
  if (!clicked) return;

  //Remove active classes from all elements
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // Removes active tabs
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  //Acitvate selected tab
  clicked.classList.add('operations__tab--active'); // Adds active tab

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
////////////////////////////////////////////////////
//--Adding menu fade animation to links to highlight the one user hovers on

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this; //opacity;
      }
      logo.style.opacity = this; //opacity;
    });
  }
};

/*
nav.addEventListener('mouseover', e => handleHover(e, 0.5));
//Reset opacity when mouse moves off link
nav.addEventListener('mouseout', e => handleHover(e, 1));
*/

//You can refactor by passing "arguement" in with the bind(), which will set the this keyword
//(will not work with arrow functions!!!)
nav.addEventListener('mouseover', handleHover.bind(0.5));
//Reset opacity when mouse moves off link
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////////////
//-- Sticky Navigation - fixing nav bar to top of viewport when section 1 is reached
const intialCoords = section1.getBoundingClientRect();

// Not ideal solution as scroll event fires constantly
/*
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if (window.scrollY > intialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
//----Intersection Observer API - More efficient solution to above

/* //EXAMPLE
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null, // Can set this to the root element, if null its the viewport
  threshold: [0, 0.2], //Amount of target required in root element before Observer is fired
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

//Using API to fire when header scrolls out of viewport
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //sets boundary for header as the height of the nav bar.
});

headerObserver.observe(header);

/////////////////////////////////////
//-- Reveal Section elements as you approach them using Intersection Obs API

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //Remove observation once the sections have been revealed
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////
//-- Lazy Loading - website optimization only loads full size images when required
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace src with data-src image
  entry.target.src = entry.target.dataset.src;

  //entry.target.classList.remove('lazy-img'); // Not ideal as on slow connections image load is visible
  //Instead add 'load' event listener that will remove blur once image is loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgTargets = document.querySelectorAll('img[data-src]'); // Only gets images with data-src
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // Will start loading images before they are reached
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

/////////////////////////////////////////
//-- Building a slider

//Slider
// Good practice to wrap all of this in its own function so not to pollute the namespace
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const maxSlide = slides.length - 1;
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  // //Reduce size of slider
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  //-- FUNCTIONS
  //Function to create dot elements
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //Function to highlight dot relating to curSlide
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //Function to move slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  //Next slide function
  const nextSlide = () => {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    //activateDot(curSlide);
  };
  //Prev slide function
  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide;
    else curSlide--;
    goToSlide(curSlide);
    //activateDot(curSlide);
  };

  //Initalize Function
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  //-- Event Listeners
  //Add event listeners to slider buttons
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === ArrowLeft) prevSlide();
    if (e.key === ArrowRight) nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  init();
};
slider();

/////////////////////////////////////
//////////////////////////////////////////////////////////
//--------- LECTURES --------------------
/*
//-------- Styles, Attributes and Classes ---------
//--Styles
//Setting inline styles to an element
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color); // Get styles of an element defined by default or within style sheets

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//Modifying CSS variables using JS
document.documentElement.style.setProperty('--color-primary', 'orangered');

//--Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // You can get the alt attribute attached to the .nav__logo element
console.log(logo.src); // Same with the source attribute
console.log(logo.className); // To get the class you have to use className
console.log(logo.designer); // Non standard attributes cannot be fetched this way

//To get non-standard
console.log(logo.getAttribute('designer'));

//You can use this to modify any of the attributes on an element
logo.alt = 'Changing alt name for fun';

//You can add new attributes with setAttribute
logo.setAttribute('attFun', 'Learning JS');

//Data attributes
console.log(logo.dataset.versionNumber); // Gets the data-version-number attribute

//-- Classes
logo.classList.remove('c', 'g'); // You can do multiple classes at once
logo.classList.add('c', 'f');
logo.classList.toggle('c');
logo.classList.contains('c');

//-- Events
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: You are reading the heading!');
  h1.removeEventListener('mouseenter', alertH1);
};
//New method
h1.addEventListener('mouseenter', alertH1);

//Old method
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: You are reading the heading!');
// };


//-- --- Capture and Bubbling  -----------------------

// Generate a random color
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

// Adding event listeners to nav items to assign random colors on click
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link:', e.target);

  //Stop event propagation - prevents the click events bubbling back up the parent elements not usually recommended
  //e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container:', e.target);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav:', e.target);
});

//--------- Traversing the DOM

const h1 = document.querySelector('h1');

//Going downwards - Selecting Child element
console.log(h1.querySelectorAll(`.highlight`)); // Will go down as deep as required into DOM tree (don't need to be direct child)
console.log(h1.childNodes); // Only gets direct child nodes (all nodes: elements, text, comments )
console.log(h1.children); // Only gets direct child elements as HTML collection
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'blue';

//Going upwards - selecting parent elements
console.log(h1.parentNode); // Returns direct parent node
console.log(h1.parentElement); // In this case it is identical to parent node
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // Selects the closest element with 'header' class and applied style

// Going sideways - Selecting siblings you can only select either side of current element
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children); // Gets all of the siblings (inc its self)

//Applying a function to all siblings but the one intially selected
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = `scale(0.5)`;
  }
});
*/

//--------- Lifecycle DOM events

// You can add an eventListener to the DOM which fires once the DOM tree is loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded!', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
