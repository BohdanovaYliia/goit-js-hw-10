import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryWrap: document.querySelector('.country-info'),
};

export default function fetchCountries(name) {
    const properties = 'fields=name,capital,population,flags,languages';
    
    return fetch(`https://restcountries.com/v3.1/name/${name}?${properties}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            Notiflix.Notify.failure('Oops, there is no country with that name.');
            refs.countryList.innerHTML = "";
            refs.countryWrap.innerHTML = "";
        }
    }).catch(error => error);
}