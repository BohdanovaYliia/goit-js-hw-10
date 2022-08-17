import Notiflix from 'notiflix';

export default function fetchCountries(name) {
    const properties = 'fields=name,capital,population,flags,languages';
    
    return fetch(`https://restcountries.com/v3.1/name/${name}?${properties}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name.'))
    }).catch(error => error);
}