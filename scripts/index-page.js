const searchInput = document.querySelector(".search-bar__input"); 
const searchAuto = document.querySelector(".search-bar__autocomplete");
const formSubmit = document.querySelector(".form__submit");
const formButton = document.querySelector(".form__button");
const form = document.querySelector(".form");
const warning = document.createElement("p");
warning.style.color = "red";
formSubmit.appendChild(warning);
let filled = false;
alert("You have to be 19 years old or older to enter this website!!");
searchInput.addEventListener('input', (e) => {
    warning.innerText = "";
    const keyword = e.target.value.toLowerCase();
    searchAuto.replaceChildren();
    filled = false;
    getCocktails(keyword);
})
const getCocktails = async (key) => {
    try {
        if (key === "") return;
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`);
        const drinksList = res.data.drinks;
        let i = 0;
        drinksList.forEach((el) => {
            if (i < 12) {
                const searchResult = document.createElement("li");
                const resultClick = document.createElement("button");
                searchResult.append(resultClick);
                resultClick.classList.add("search-bar__btn");
                resultClick.innerText = el.strDrink;
                resultClick.addEventListener("click",(e) => cocktailsSelect(e));
                searchAuto.appendChild(searchResult);
                i++;
            }  
        })
    } catch (error) {
        console.log(error);
    }
}
const cocktailsSelect = (e) => {
    e.preventDefault();
    warning.innerText= "";
    searchInput.value = e.target.innerText;
    filled = true;
    searchAuto.replaceChildren();
}
formButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!filled) {
        warning.innerText = "You must pick a poison. If alcohol can't solve problem, you're not drinking enough!";
    }
    else {
        localStorage.clear();
        localStorage.setItem("selectedPoison", searchInput.value);
        window.location.href = "./pages/cocktails.html"
    }
})
const mainDrinks = document.querySelectorAll(".main__drinks");
mainDrinks.forEach((el) => 
    el.addEventListener("click", (e) => {
        e.preventDefault();
        selectIngredient(e.target.alt);
}))
const selectIngredient = (e) => {
    localStorage.clear();
    localStorage.setItem("selectedIngredient", e);
    window.location.href = "./pages/cocktails.html";
}