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

    async function populateCountryList() {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        
        const countryList = document.getElementById('edit_countryList');
        countryList.innerHTML = ''; // Clear existing options
    
        data.data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.country;
            countryList.appendChild(option);
        });

        const editCountryList = document.getElementById('edit_countryList');
const newEditCountryList = editCountryList.cloneNode(true);
editCountryList.parentNode.replaceChild(newEditCountryList, editCountryList);

    }

            populateCountryList()

});