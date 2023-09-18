document.addEventListener('DOMContentLoaded', function(){
    // const countryInput = document.getElementById('countryInput');
    const countryList = document.getElementById('countryList');


    async function populateCountries(){
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();

        data.data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.country;
            countryList.appendChild(option);
        });
    }

    populateCountries()

});