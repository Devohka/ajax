var $ltMAx$pnotifycore = require("@pnotify/core");
var $ltMAx$pnotifymobile = require("@pnotify/mobile");



(0, $ltMAx$pnotifycore.defaultModules).set($ltMAx$pnotifymobile, {});
const $4fa36e821943b400$var$countryInputEl = document.querySelector(".country__input");
const $4fa36e821943b400$var$countryTitleEl = document.querySelector(".country__title");
const $4fa36e821943b400$var$countryCapitalEl = document.querySelector(".country-capital");
const $4fa36e821943b400$var$countryPopulationEl = document.querySelector(".country-population");
const $4fa36e821943b400$var$countryLanguagesListEl = document.querySelector(".languages__list");
const $4fa36e821943b400$var$countryImgEl = document.querySelector(".country__img");
const $4fa36e821943b400$var$buttonsListEl = document.querySelector(".buttons__list");
const $4fa36e821943b400$var$fetchCountries = _.debounce((searchQuery)=>{
    fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then((res)=>{
        if (res !== true) console.log("res !== true");
        return res.json();
    }).then((data)=>{
        const dataLang = data[0].languages;
        if (data.length > 10) (0, $ltMAx$pnotifycore.error)({
            text: "Too many matches found. Please enter a more specific query!"
        });
        $4fa36e821943b400$var$buttonsListEl.innerHTML = ``;
        if (data.length >= 2 && data.length <= 10) {
            $4fa36e821943b400$var$buttonsListEl.style.display = "block";
            data.forEach((country)=>{
                $4fa36e821943b400$var$buttonsListEl.insertAdjacentHTML("beforeend", `<li><button class=country__button>${country.name.common}</button></li>`);
            });
            $4fa36e821943b400$var$buttonsListEl.addEventListener("click", (e)=>{
                if (e.target.nodeName === "LI" || e.target.nodeName === "UL") return;
                $4fa36e821943b400$var$buttonsListEl.style.display = "none";
                const index = data.findIndex((country)=>country.name.common === e.target.textContent);
                $4fa36e821943b400$var$countryTitleEl.textContent = data[index].name.common;
                $4fa36e821943b400$var$countryCapitalEl.textContent = data[index].capital;
                $4fa36e821943b400$var$countryPopulationEl.textContent = data[index].population;
                $4fa36e821943b400$var$countryImgEl.innerHTML = `<img src=${data[index].flags.png} alt=${data[index].alt}/>`;
                $4fa36e821943b400$var$countryLanguagesListEl.innerHTML = ``;
                if (Object.keys(dataLang).length > 1) {
                    let languagesContent = ``;
                    Object.values(dataLang).forEach((language)=>{
                        languagesContent += `<li class=languages__item>${language}</li>`;
                    });
                    $4fa36e821943b400$var$countryLanguagesListEl.innerHTML = ``;
                    return $4fa36e821943b400$var$countryLanguagesListEl.innerHTML = languagesContent;
                }
                $4fa36e821943b400$var$countryLanguagesListEl.insertAdjacentHTML("beforeend", `<li class=languages__item>${Object.values(dataLang)}</li>`);
            });
        }
        if (data.length === 1) {
            $4fa36e821943b400$var$countryTitleEl.textContent = data[0].name.common;
            $4fa36e821943b400$var$countryCapitalEl.textContent = data[0].capital;
            $4fa36e821943b400$var$countryPopulationEl.textContent = data[0].population;
            $4fa36e821943b400$var$countryImgEl.innerHTML = `<img src=${data[0].flags.png} alt=${data[0].alt}/>`;
            $4fa36e821943b400$var$countryLanguagesListEl.innerHTML = ``;
            if (Object.keys(data[0].languages).length > 1) {
                let languagesContent = ``;
                Object.values(data[0].languages).forEach((language)=>{
                    languagesContent += `<li class=languages__item>${language}</li>`;
                });
                $4fa36e821943b400$var$countryLanguagesListEl.innerHTML = ``;
                return $4fa36e821943b400$var$countryLanguagesListEl.innerHTML = languagesContent;
            }
            $4fa36e821943b400$var$countryLanguagesListEl.insertAdjacentHTML("beforeend", `<li class=languages__item>${Object.values(data[0].languages)}</li>`);
        }
    }).catch((err)=>{
        console.log(err);
    });
}, 1000);
$4fa36e821943b400$var$countryInputEl.addEventListener("input", (element)=>{
    $4fa36e821943b400$var$fetchCountries(element.target.value);
});


//# sourceMappingURL=index.js.map
