const MINIMUM_ADDITIONAL_ITERATION_COUNT = 2;

const config = {
  additionalIterationCount: Math.max(MINIMUM_ADDITIONAL_ITERATION_COUNT, 5),
  transitionDuration: 12000,
  prize: Math.floor(Math.random() * 900000) + 100000, // Get Random 6 Digit Number
  digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const USD = new Intl.NumberFormat('en-us', {
  useGrouping:false
});

const getPrizeText = () => document.getElementById("prize-text"),
  getTracks = () => document.querySelectorAll(".digit > .digit-track");

const getFormattedPrize = () => USD.format(123456),
  getPrizeDigitByIndex = (index) => parseInt(config.prize.toString()[index]),
  determineIterations = (index) => index + config.additionalIterationCount;

const createElement = (type, className, text) => {
  const element = document.createElement(type);
  element.className = className;
  if (text !== undefined) element.innerText = text;
  return element;
};

const createCharacter = (character) => createElement("span", "character", character);

const createDigit = (digit, trackIndex) => {
  const digitElement = createElement("span", "digit"),
    trackElement = createElement("span", "digit-track");

  let digits = [],
    iterations = determineIterations(trackIndex);

  for (let i = 0; i < iterations; i++) {
    digits = [...digits, ...config.digits];
  }

  trackElement.innerText = digits.join(" ");

  trackElement.style.transitionDuration = `${config.transitionDuration}ms`;

  digitElement.appendChild(trackElement);

  return digitElement;
};

const setup = () => {
  let index = 0;

  const prizeText = getPrizeText();

  for (const character of getFormattedPrize()) {
    const element = isNaN(character) ? createCharacter(character) : createDigit(character, index++);

    prizeText.appendChild(element);
  }
};

const animate = () => {
  getTracks().forEach((track, index) => {
    const digit = getPrizeDigitByIndex(index),
      iterations = determineIterations(index),
      activeDigit = ((iterations - 1) * 10) + digit;

    track.style.translate = `0rem ${activeDigit * -10}rem`;
  });
};

const resetTrackPosition = (track) => {
  track.style.transitionDuration = "0ms";
  track.style.translate = "0rem 0rem";
  track.offsetHeight;
  track.style.transitionDuration = `${config.transitionDuration}ms`;
};

const resetAnimation = () => {
  for (const track of getTracks()) resetTrackPosition(track);
};

window.onload = () => {
  setup();

  // Add keyboard event listener to the document
  document.addEventListener("keydown", (e) => {
    // Check if the pressed key is the space key (keyCode 32)
    if (e.keyCode === 32) {
      handleRedo();
    }
  });

  setTimeout(animate);
};

const handleRedo = () => {
  resetAnimation();

  animate();
};

const updateTheme = (theme) => {
  document.documentElement.style.setProperty("--theme-rgb", `var(--${theme})`);

  for (const button of document.querySelectorAll(".theme-button")) {
    button.dataset.selected = theme === button.dataset.theme;
  }
};

const handleChangeTheme = (e) => updateTheme(e.currentTarget.dataset.theme);

updateTheme("green");

document.getElementById('shapes').classList.remove('hidden');
document.getElementById('actions-wrapper').classList.remove('hidden');
document.querySelector('.container-lottery').classList.remove('hidden');

document.getElementById('shapes').classList.add('hidden');
document.getElementById('actions-wrapper').classList.add('hidden');
document.querySelector('.container-lottery').classList.add('hidden');
