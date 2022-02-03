const dropList = document.querySelectorAll(".currency-section select");
const fromCurrency = document.querySelector(".from-currency select"),
    toCurrency = document.querySelector(".to-currency select"),
    getButton = document.querySelector(".convert-section button");
const exchangeIcon = document.querySelector(".currency-section .icon");
const amount = document.querySelector(".convert-section .input-amount input");

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

function loadFlag(element) {
    for (let currencyCode in countryList) {
        if (currencyCode == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${countryList[currencyCode].toLowerCase()}.png`;
        }
    }
}

function getExchangeRate() {
    const exchangeRateTxt = document.querySelector(".convert-section .exchange-rate");
    let amountVal = amount.value;

    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/0ae5560ee7661b1824520e41/latest/${fromCurrency.value}`; // EDIT YOUR-API-KEY (ex: 0ae5560ee7661b1824520e41)

    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    });
}

// events
window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

fromCurrency.addEventListener("change", () => {
    setTimeout(function () {
        loadFlag(fromCurrency);
        getExchangeRate();
    }, 300);
})

toCurrency.addEventListener("change", () => {
    setTimeout(function () {
        loadFlag(toCurrency);
        getExchangeRate();
    }, 300);
})

amount.addEventListener("change", () => {
    setTimeout(function () {
        getExchangeRate();
    }, 500);
})

amount.addEventListener("input", () => {
    setTimeout(function () {
        getExchangeRate();
    }, 500);
})