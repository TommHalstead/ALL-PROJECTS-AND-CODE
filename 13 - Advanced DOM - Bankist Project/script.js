'use strict';

///////////////////////////////////////
// Modal window
const h1 = document.querySelector(`h1`);
const nav = document.querySelector(`.nav`);
const section1 = document.querySelector(`#section--1`);
const section2 = document.querySelector(`#section--2`);
const section3 = document.querySelector(`#section--3`);
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
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

// Scroll to a button smoothly by clicking

btnScrollTo.addEventListener(`click`, e => {
  section1.scrollIntoView({ behavior: `smooth` });
});

//////////////////////////////////////////
//////////////////////////////////////////
// Page navigation
// Method for adding event handlers to your page, although not the most effective due to multiple event handlers handing each click event
// document.querySelectorAll(`.nav__link`).forEach(el => {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// }); // HTML anchor tags will automatically move the page to the spot in the page when that anchor or link is located an anchor in HTML is designated by the #

// We grab the href attribute from each element with this forEach, which happens to be the #section--1, #section--2, #section--3. Then we use another querySelector(`#section--1, #section--2, #section--3`) and add the .scrollIntoView() method with the behavior of `smooth`
// e.currentTarget === .this

// Event Delegation
// 1.) Add event listener to common parent element
// 2.) Determine what element orignated the event - Matching
document.querySelector(`.nav`).addEventListener(`click`, function (e) {
  e.preventDefault();

  // Matching stategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
}); // Scrolling to the href attribute itself

//////////////////////////////////////////
//////////////////////////////////////////

// Tabbed components

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);

  // Guard clause - This says if (clicked area doesn't contain a closest parent of .operations__tab) then just RETURN to the function.
  if (!clicked) return;
  // Activate Tab
  tabs.forEach(t => t.classList.remove(`operations__tab--active`)); // Here in order to make this work correctly by adding this class, we must first remove the class from all of these elements first so the correct effect can happen.
  clicked?.classList.add(`operations__tab--active`);
  console.log(clicked.dataset.set);

  // Remove active classes
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Menu fade animation - Passing arguments into eventhandler functions
// We use mouseover because it bubbles, mouseenter does not bubble
// Opposite of mouseenter is mouseleave and the opposite of mouseover is mouseout

const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);
    const overOrOut =
      e.type === `mouseover` ? 0.5 : e.type === `mouseout` ? 1 : 1;
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = overOrOut;
    });
    logo.style.opacity = overOrOut;
  }
};

nav.addEventListener(`mouseover`, handleHover);
nav.addEventListener(`mouseout`, handleHover);

// Sticky Navigation bar - scroll event -- Outdated way, the scrollY is always updating and checking, therefore is very bad for preformance
// const intitialCoords = section1.getBoundingClientRect();
// window.addEventListener(`scroll`, function () {
//   if (window.scrollY >= intitialCoords.top) {
//     nav.classList.add(`sticky`);
//   } else {
//     nav.classList.remove(`sticky`);
//   }
// });

// NEW INTERSECTION OBSERVER API FOR STICKY SCROLLING

// const obsCallback = function (entries, observer) {
// };

// const obsOptions = {
//   root: null, // Null is the viewport by default
//   threshold: [0, 0.2], // Could be an array of thresholds
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(`.header`);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  const intersectTrue = entry.isIntersecting;
  intersectTrue
    ? nav.classList.remove(`sticky`)
    : !intersectTrue
    ? nav.classList.add(`sticky`)
    : nav.classList.remove(`sticky`);
}; // We use the entries here, and destructure them into an array in order to use the properties from this IntersectionObserverEntry which we use to apply the logic to this function.
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // The root margin allows us to add extra or negative margin onto the specified target.
});
headerObserver.observe(header);

// Reveal sections slowly while scrolling
const allSections = document.querySelectorAll(`.section`);

const revealSection = function (entries, observer) {
  const [entry] = entries; // This destructuring allows us to access each individual property within the entries.
  if (!entry.isIntersecting) return; // If no section is intersecting, return back to the function
  entry.target.classList.remove(`section--hidden`);
  sectionObserver.unobserve(entry.target); // Here we unobserve this target in order to stop the function calls.
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.22,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add(`section--hidden`);
});

// Lazy loading images - Great for preformance

const imgTarget = document.querySelectorAll(`img[data-src]`); // Selecting only images that have a data src attribute.

const loadImg = function (entries, observer) {
  const [entry] = entries; // Only 1 threshold, so only one entry

  if (!entry.isIntersecting) return;

  // Replace the src with date-src
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove(`lazy-img`);
  entry.target.addEventListener(`load`, () =>
    entry.target.classList.remove(`lazy-img`)
  );
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTarget.forEach(img => imgObserver.observe(img)); // Here we tell the observer to observe each img with this forEach() method.

// Slider
const sliders = function () {
  const slides = document.querySelectorAll(`.slide`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const dotContainer = document.querySelector(`.dots`);
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`); // Here we add the class onto the element by using the dataset as a reference
  };

  activateDot(0);
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);
  // Move to next slide

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    // createDots();
    activateDot(0);
  };

  init();

  // Event Handlers

  btnRight.addEventListener(`click`, nextSlide);
  // -100%, 0%, 100%, 200%

  btnLeft.addEventListener(`click`, prevSlide);

  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowLeft`) prevSlide();
    if (e.key === `ArrowRight`) nextSlide();
  });

  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

sliders();
// The obeserver API says that whenever our TARGET ELEMENT - `section1` crosses 0.1 or 10% of the viewport(null) threshold, then it will call this callback function, we call

// We can also use the bind keyword in order to change the this keyword within the function to the opacity we would like to use and use that in place of the el.style.opacity value.
// Here we created two seperate functions, one when entering the links and adding a .5 opacity to them by creating a standalone function which takes the event and the opacity as arguments,
// We can use the data set attribute within the HTML attributes to dynamically add a number to a class name. Above, we use a template literal in order to grab the current dataset from the clicked element, and use the dataset.tab value to set the class.
/*
// 
// Selecting elements

console.log(document.documentElement); // This gives you the whole entire html document of tags.
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector(`.header`);
const allSections = document.querySelectorAll(`.section`); // Returns a nodeList of all elements containing that class - A node list does not automatically update
// console.log(allSections);
// Only .querySelectors(`.`) require a selector
// We can use .querySelector() and .querySelectorAll() on ANY element since ALL elements are children of the document object, which has access to these methods

document.getElementById(`section--1`);

const allButtons = document.getElementsByTagName(`button`); // This returns an HTMLCollection, which is different that a nodeList, because it's a live collection, meaning that this list is updated automatically when any button is added or removed
// console.log(allButtons);
document.getElementsByClassName(`btn`);
console.log(document.getElementsByClassName(`btn`)); // This also returns a HTMLcollection as well

// Creating and inserting elements

// .insertAdjacentHTML; - Used to create elements

const message = document.createElement(`div`); // This creates a DOM element `div` and stores this element in message. This element is not yet anywhere in the DOM, we have to manually insert it into the page
// message.classList.add(`cookie-message`); // We add a className to this element that we created already in CSS

console.log(message.classList); // This gives you the classes of any selected DOM element
// message.textContent = `We use cookies for improved functionality and analytics.` - If no button were to be added, we would just use textContent
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`; // This allows us to create a string to be entered into the dom

// header.prepend(message); // The prepend method will insert a set of node objects or string BEFORE the first child of the containing element
// header.append(message); // This makes it the LAST child of the containing element
// We can also use the methods to move already existing DOM elements
// header.append(message.cloneNode(true)); // This will copy or clone an already existing node, we give it a param of true to specify that we do want to copy all of the child elements as well

header.before(message); // This will insert this element BEFORE the element we are calling the method on as a sibling element
// header.after(message);
// This will insert this element AFTER the element we are calling the method on as a sibling element

////////////////////////////////////////
////////////////////////////////////////

// Delete elements

document
  .querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    message.remove();
  }); // This will remove the `Got it!` once the user clicks the button aceepting cookies

// Styles, Classes, and Attributes

message.style.backgroundColor = `#37383d`;
// message.style.width = `120%`; // These are inline styles, styles added directly to the DOM- This style only works for inline styles

console.log(message.style.backgroundColor); // We set this style inline, therefore we can view what we've added inline, through the console. AND only what we've added inline, through this method
console.log(getComputedStyle(message).height); // This gives you the styles of everything related to whatever element we pass in

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`; // This first grabs the getComputedStyle() function and grabs the height from that object and adds 40px to it, since the getComputedStyle() function returns a string, we must use the parseFloat() method on it in order to grab the numbers from the string and return it.

// CSS CUSTOM PROPERTIES

document.documentElement.style.setProperty(`--color-primary`, `cyan`); // This will change multiple styles whose color is set to this `--color-primary`, to the second argument of `cyan`

// Attributes

const logo = document.querySelector(`.nav__logo`);
console.log(logo.alt); // We can simply use the attribute name following the element in order to view the desired attribute, we can only view standard properties that are expected to be on the tag

console.log(logo.className);

logo.alt = `Beautfiul minimalist logo`;
// Non-standard attributes

console.log(logo.getAttribute(`designer`)); // This will allow you to grab non-standard attributes in order to manipulate them - This will override the current alt attribute

logo.setAttribute(`company`, `Bankist`); // This allows you to add new attributes to whatever element you have selected, the first param is the attribute name and the second is the attribute value

console.log(logo.src); // This gives you the absolute URL, absolute SRC, same with HREF on links
console.log(logo.getAttribute(`src`)); // This gives you the relative URL, relative to your html file

const link = document.querySelector(`.nav__link--btn`);
console.log(link.href);
console.log(link.getAttribute(`href`));

// Data attributes
console.log(logo.dataset.versionNumber); // Special dataset data attribute

// Classes

logo.classList.add(`c`, `j`); // You can add multiple classes, seperated by a comma
logo.classList.remove(`c`);
logo.classList.toggle(`c`);
logo.classList.contains(`c`);

// Don't use - can only add one class, and it overrides other class names
logo.className = `thomas`;



// Scroll to a button smoothly by clicking

const btnScrollTo = document.querySelector(`.btn--scroll-to`);

const section1 = document.querySelector(`#section--1`);

btnScrollTo.addEventListener(`click`, e => {
  const s1coords = section1.getBoundingClientRect();
  // console.log(`Section-1 :`, s1coords);

  // console.log(`Button:`, e.target.getBoundingClientRect());
  // console.log(`Current scroll (X,Y)`, window.pageXOffset, window.pageYOffset);

  section1.scrollIntoView({ behavior: `smooth` });
});
*/
/*
// console.log(
//   `height/width viewport`,
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//Scrolling
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.scrollY
// );

// Old school way
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.scrollY,
//   behavior: `smooth`, // We can pass an object into this method in order to give it properties of options to choose from. We must name the properties as specified for the specific method. The `smooth` behavior allows the screen to smmothly scroll down the screen
// });

// The scrollIntoView() is the new way of doing this but only supports more modern browsers.

// We can pass an object into this method in order to give it properties of options to choose from. We must name the properties as specified for the specific method. The `smooth` behavior allows the screen to smmothly scroll down the screen

// We add the coordinates of the rect we would like to scroll to + the current amount that is already scrolled down, this way we get the full pixel distance from the top of the page to the start of this section, we do the left becasue we want no horizontal scroll

// document.documentElement.clientWidth gives you the viewport info

// window.pageXOffset and window pageYOffset gives you the distance from the top of the viewport to the top of the page

// The target points to the event in which the handler was dispatched

// getBoundingClientRect() gives you the coordinates of a wanted element on the page in relation to the current

// DOMRect {x: 30.000001907348633, y: 496.63336181640625, width: 109.95000457763672, height: 29.733335494995117, top: 496.63336181640625,

// X is the distance from the left side of the screen

// Y is the pixels from the top of the screen

// The getBoundingClientRect is in reference to the visisble viewport
// All types of events, clicks, anything that happens on the scrren triggers an event and is recognized



const alertH1 = e => {
  alert(`addEventListener: Great! You are reading the heading! :D`);
};
// Mouse enter fires whenever a mouse enters into a certain element
h1.addEventListener(`mouseenter`, alertH1); // We can export these functions as well

setTimeout(() => h1.removeEventListener(`mouseenter`, alertH1), 3000); // We can remove this event listener like this, so it will only happen one time. This will remove this event after 3 seconds of the page loading

// As an event passes down and up the tree, they pass through all of their parent elements on the way down and all the way back up to the document itself.

// So when an event bubbles through an element, it's as if the eventhandler is attached to each of these parent elements

*/

// EVENTS, EVENT PROPAGATION, EVENT BUBBLING, EVENT CAPTURING
/*

const randomInt = (min, max) => Math.floor(Math.random() * max - min) + 1;

const randomColor = e =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(`.nav__link`).addEventListener(
  `click`,
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(`Link:`, e.target);

    // Stop propagation
    // e.stopPropagation(); // This stops the propagation, therefore this doesn't bubble back up to the parent elements, because it stopped right here at this element after the event happened.
  }
  // true
);
// We use the `.this` keyword to point to the element handling this function


document.querySelector(`.nav__links`).addEventListener(
  `click`,
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(`Container:`, e.target);
  }
  // true
);

document.querySelector(`.nav`).addEventListener(
  `click`,
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(`Whole NAV:`, e.target);
  }
  // true // Use capture set to true, this removes the bubbling phase and instead listens to the event on the way down the element tree - RARELY USED
); // This .nav class is the parent element for both the .nav__link and .nav__links, therefore when we add an event handler to the featuresBtn, the event travels through its parents elements, changing their background color as well, even though we only clicked on the link itself, the event had to propegate through its parents elements in order to record the event

*/

/*
/////////////////////////////////////////////
/////////////////////////////////////////////

// DOM traversing

const h1 = document.querySelector(`h1`);

// Going down the DOM tree : children
console.log(h1.querySelectorAll(`.highlight`)); // We first grab the h1 elment with the querySelector and save it to h1. From there, we grab the child elements classes from that h1 element. We can go as deep as necessary to grab these children elements. Here, we use the querySelectorAll() on the h1 element, therefore grabbing the children classes of this element with the desired class name.
console.log(h1.childNodes); // Since text, comments, and elements are all nodes, this will return all nodes under this parent h1 element
console.log(h1.children); // This will give you ONLY the ELEMENT nodes which are children of the parent h1 ELEMENT. ONLY FOR DIRECT CHILDREN
h1.firstElementChild.style.color = `white`;
h1.lastElementChild.style.color = `black`;

// Traversing up the DOM : Parent elements

console.log(h1.parentNode); // This will give you the direct parent node whatever it may be, text, comment, element.
console.log(h1.parentElement); // This will give you only the direct parent element itself

h1.closest(`.header`).style.background = `var(--gradient-secondary)`;
// You call the closest() method on the element in which you would like to find the closest parent of. Then you pass in the class name as an argument. You can style the element like this as well. .closest() is used to find parent elements, no matter how far up the DOM tree
h1.closest(`h1`).style.background = `var(--gradient-primary)`; // This will style the element itself

// Traversing the DOM sideways : Siblings

console.log(h1.previousElementSibling); // Self explanatory - Elements themselves
console.log(h1.nextElementSibling); // Self explanatory - Elements themselves

console.log(h1.previousSibling); // Shows the previous NODE sibling, text, comment etc.
console.log(h1.nextSibling); // Shows the next NODE sibling, text, comment etc.

console.log(h1.parentElement.children); // If you need to see all siblings of this h1 element, we need to move up to the parent element, and then view the children elements of that parent element.

// [...h1.parentElement.children] // This will turn a HTMLCollection into an array that you can then work with.

const headerTitleChildren = [...h1.parentElement.children];

headerTitleChildren.forEach(function (el) {
  if (el !== h1) el.style.transform = `scale(0.5)`;
}); // This targets every child element of the `.header__title` class except for the h1 and transforms their text size to 50% of the original

*/
// DOM content loaded - event fired as soon as HTML document is completely parsed

document.addEventListener(`DOMContentLoaded`, function (e) {
  console.log(`HTML parsed and DOM tree built`, e);
});
// This event handler, in this case shows when the DOM tree has been created and scripts have been loaded
window.addEventListener(`load`, function (e) {
  console.log(`ALL content loaded`, e);
});
// This event handler shows when all content on the page has finished loading and is ready to view
// window.addEventListener(`beforeunload`, function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = `Message`;
// });
// This event handler is the information right before leaving the page, so upon refreshing we will be asked if we're sure we would like to refresh. ONLY USE WHEN SENSITIVE DATA MAY BE LOST

// DEFER AND ANSYNC SCRIPT LOADING

// Regular: <script src="script.js"> - In the body end, the engine will parse the HTML -> Fetch Script -> Execute Script
// ASYNC:   <script async src="script.js"> - In the HEAD ONLY, the engine will parse the HTML and fetch the script asyncrounsly, and when finished fetching script, will execute, and then go back to parsing HTML. - DOMContentLoaded is fired off as soon as the HTML is parsed, and not after the script is fetched
// DEFER:   <script defer src="script.js"> - In the HEAD ONLY, will parse the HTML and fetch the script asyncrounsly, and then defer the execution of the script until the HTML has finished parsing. - DOMContentLoaded is forced to wait until all HTML content is parsed and all scripts are fetched in order to fire this event
