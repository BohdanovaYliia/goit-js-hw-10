import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryWrap: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function makeMarkupOfListEl(countries) {       

    return countries.map(contry => {
        const flag = contry.flags.svg;
        const name = contry.name.official;

        return `
        <li class="country-list__item">
        <img src="${flag}" alt="flag of ${name}" width="20" class="country-list__img">
        <p>${name}<p>
        </li>`
    }).join(' ');    
}

function makeMarkupOfCountry(countries) {
    const { capital, population, languages } = countries[0];

    return `
    <ul class="country-about">
     <li class="country-about__item">
        <p>
            <span class="country-about__pharagraf">Capital:</span> ${capital}
        </p>
     </li>
     <li class="country-about__item">
        <p>
            <span class="country-about__pharagraf">Population:</span> ${population}
        </p>
     </li>
     <li class="country-about__item">
        <p>
            <span class="country-about__pharagraf">Languages:</span> ${Object.values(languages).join(", ")}
        </p>
      </li>
    </ul>`
}

function renderMarkup(countries) {
    if (countries === undefined) {
        return;
    }

    if (countries.length === 1) {
        refs.countryList.innerHTML = makeMarkupOfListEl(countries);
        refs.countryWrap.innerHTML = makeMarkupOfCountry(countries);

        const countryName = document.querySelector('p');
        countryName.style.fontWeight = 700;
        countryName.style.fontSize = '24px';
    }

    if (countries.length >= 2 && countries.length <= 10) {
        refs.countryList.innerHTML = makeMarkupOfListEl(countries);
        refs.countryWrap.innerHTML = " ";
    }

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryList.innerHTML = " ";
        refs.countryWrap.innerHTML = " ";
    }

}

function onInput (evt) {
    const name = evt.target.value.trim();

    if (name.length === 0) {
        refs.countryList.innerHTML = "";
        refs.countryWrap.innerHTML = "";
        return
    }

    fetchCountries(name).then(renderMarkup);
}
