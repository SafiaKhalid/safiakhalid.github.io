const inputColourBox = document.getElementById('input-colour');
const compColourBox = document.getElementById('comp-colour');
const form = document.querySelector('form');

let complementaryColour = document.getElementById('display-comp');
let inputColour = document.getElementById('colour').value.substring(1);
let documentBackground = document.querySelector('html');

let compColour;

const generateColour = (colour) => {
    inputColourBox.style.backgroundColor = `#${colour}`;

    const decInputArray = [];
    for (let i = 0; i < colour.length; i += 2) {
        decInputArray.push(parseInt(colour.substring(i, i + 2), 16));
    }

    let background = [...decInputArray];
    background = background.map((num) => (255 - num) * (3 / 5) + num);

    const hexCompArray = [];
    decInputArray.forEach((num) => {
        num = (255 - num).toString(16);
        if (num.length == 1) {
            num = '0' + num;
        }
        hexCompArray.push(num);
    });

    compColour = '#' + hexCompArray.join('');

    complementaryColour.innerText = compColour;
    compColourBox.style.backgroundColor = compColour;
    documentBackground.style.backgroundColor = `rgb(${background[0]},${background[1]},${background[2]})`;
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('colour').value = '#ffc0cb';
    const inputColour = document.getElementById('colour').value.substring(1);

    generateColour(inputColour);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputColour = document.getElementById('colour').value.substring(1);
    const hexTest = /^[0-9A-F]{6}$/i;
    if (
        inputColour.length == 6 &&
        hexTest.test(inputColour) &&
        document.getElementById('colour').value.slice(0, 1) == '#'
    ) {
        document.getElementById('alert').innerText = '';
        generateColour(inputColour);
    } else {
        document.getElementById('alert').innerText = 'Invalid hex code';
        setTimeout(() => {
            document.getElementById('alert').innerText = '';
        }, 2000);
    }
});
