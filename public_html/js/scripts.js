const dropList = document.querySelectorAll(".currency-section select");

for (let i = 0; i < dropList.length; i++) {
    for (let currencyCode in countryList) {

        let selected = i == 0 ? currencyCode == "USD" ? "selected" : "" : currencyCode == "VND" ? "selected" : "";

        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); 
    });
}

function loadFlag(element){
    for(let currencyCode in countryList){
        if(currencyCode == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${countryList[currencyCode].toLowerCase()}.png`;
        }
    }
}