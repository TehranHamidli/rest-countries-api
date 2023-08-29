
const mode = document.querySelector(".light-mode");
const body = document.querySelector("body");
const modeIcon = document.querySelector(".modeIcon");
const modeText = document.querySelector(".modeText");
const logo = document.querySelector(".logo");
const countryName = document.querySelector(".countryName");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const capital = document.querySelector(".capital");
const search = document.querySelector(".search")
const searchIcon = document.querySelector(".search-icon")
const country = document.querySelector(".country");
const input = document.querySelector("input");
const detailContainer = document.querySelector(".detailContainer");
let array = [];

//Dark Mode
mode.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (modeIcon.getAttribute("src") == './assets/image/dark-mode.png') {
        modeText.innerHTML = "Light Mode";
        modeIcon.src = "./assets/image/light-icon2.png";
        modeIcon.style.background = "#fff"
        modeIcon.style.borderRadius = "15px";
        search.style.background = "#202C37";
        search.style.color = "#fff";
        logo.style.color = "white";
        searchIcon.style.background = "#202C37";
    

    } else {
        modeIcon.src = './assets/image/dark-mode.png';
        modeText.innerHTML = "Light Mode";
        logo.style.color = "hsl(209, 23%, 22%)";
        search.style.background = "white";
        searchIcon.style.background = "white";
        search.style.color = "black";
    }
})

// Get Data Api
async function getDataApi() {
    fetch("https://restcountries.com/v3.1/all").then(response => {
        return response.json()
    }).then((data) => {
        detail(data)
        data.map((x) => {
            let card = `<div class="country-card")>
        <img src="${x.flags.png}" height="200px" width="100%">
        <div class="card-info">
            <h3 class="countryName">${x.name.common}</h3>

            <div class="info">
                <h4 class="populationName">Population:</h4>
                <p class="population">${x.population}</p>
            </div>

            <div class="info">
                <h4>Region:</h4>
                <p class="region">${x.region}</p>
            </div>

            <div class="info">
                <h4>Capital:</h4>
                <p class="capital">${x.capital}</p>
            </div>

        </div>
    </div>
     `

     
            country.innerHTML += card

        })

    })

}

getDataApi();

// input read value
function readValue() {
    input.addEventListener("input", function (event) {
        const inputValue = event.target.value.toLowerCase();
        console.log(inputValue);

        const countryCards = document.querySelectorAll(".country-card");

        countryCards.forEach(card => {

            const countryName = card.querySelector(".countryName").textContent.toLowerCase()

            if (countryName.includes(inputValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }


        });

    });

}
readValue()

// card detail

function detail(city) {
    country.addEventListener("click", function (event) {
        const countryCards = document.querySelectorAll(".country-card");
        countryCards.forEach((card, index) => {
            card.onclick = function () {
                show(city[index])

            }
        })
    });
}

function show(detailShow) {
    console.log("detailShow", detailShow);

    for (const native in detailShow.name.nativeName) {
        if (native) {
            var nativeName = detailShow.name.nativeName[native].official;
            console.log(nativeName);
            break;
          }
        }

        for (const native in detailShow.currencies) {
            if (native) {
                var currencies = detailShow.currencies[native].name;
                break;
              }
            }

            for (const native in detailShow.languages) {
                if (native) {
                    var language = detailShow.languages[native];
                    break;
                  }
                }

    const detailCard = `  
        <div class="countryImg">
            <img src="${detailShow.flags.png}" alt="">
        </div>
        <div class="countryDetail">

            <div class="detail-1">
            <h1>${detailShow.name.common}</h1>
                <div class="nativeName dtl">
                    <h4>Native Name:</h4>
                <p class="native">${nativeName}</p>
                </div>
                <div class="population dtl">
                    <h4>Population:</h4>
                    <p class="populations">${detailShow.population}</p>
                </div>
                <div class="region dtl">
                    <h4>Region:</h4>
                    <p class ="regions">${detailShow.region}</p>
                </div>
                <div class="subRegion dtl">
                    <h4>Sub Region:</h4>
                    <p class="subregions">${detailShow.subregion}</p>
                </div>
                <div class="capital dtl">
                    <h4>Capital:</h4>
                    <p class="capitals">${detailShow.capital}</p>
                </div>
            </div>
            <div class="detail-2">
                <div class="domain dtl">
                    <h4>Top Level Domain:</h4>
                    <p class="topDomain">${detailShow.tld[0]}</p>
                </div>

                <div class="currencies dtl">
                    <h4>Currencies:</h4>
                    <p class="dtlCurrencies">${currencies}</p>
                </div>

                <div class="language dtl">
                    <h4>Language:</h4>
                    <p class="lang">${language}</p>
                </div>
            </div>
        </div>

   `
    console.log(detailShow);

    const detail = document.querySelector(".detail");
    const countries = document.querySelector(".countries");

    detail.innerHTML = detailCard;
    country.style.display = "block";

    if (country.style.display === "block") {
        country.style.display = "none";
        countries.style.display = "none"
        detailContainer.style.display = "block"
    }

}

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", function () {
    window.location.href = "index.html"
})
// ***********************
const regionSelect = document.querySelector("select");

regionSelect.addEventListener("change", function () {
    const selectedRegion = regionSelect.value;

    console.log(selectedRegion);
    country.innerHTML = "";

    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then((data) => {
            data.forEach((countryData) => {
                if (selectedRegion === "none" || selectedRegion === countryData.region.toLowerCase()) {
                    let card = `
                        <div class="country-card">
                            <img src="${countryData.flags.png}" height="200px" width="100%">
                            <div class="card-info">
                                <h3 class="countryName">${countryData.name.common}</h3>

                                <div class="info">
                                    <h4 class="populationName">Population:</h4>
                                    <p class="population">${countryData.population}</p>
                                </div>

                                <div class="info">
                                    <h4>Region:</h4>
                                    <p class="region">${countryData.region}</p>
                                </div>

                                <div class="info">
                                    <h4>Capital:</h4>
                                    <p class="capital">${countryData.capital}</p>
                                </div>

                            </div>
                        </div>
                    `;
                    country.innerHTML += card;
                }
            });
        });
});