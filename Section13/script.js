'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
////////////////////////////////////////////////////

//-- Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // Returns a node list doesn't automatically update with DOM changes
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

//---- Adding Smooth Scrolling ----------

const btnScrollTo = document.querySelector('.btn--scroll-to'); //Getting button that starts smooth scroll
const section1 = document.querySelector('#section--1'); // getting element we want to scroll to

btnScrollTo.addEventListener('click', function (e) {
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
  //--Modern method
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////
//////////////////////////////////////////////////////////
//--------- LECTURES --------------------

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

//-- Capture and Bubbling

