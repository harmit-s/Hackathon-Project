let obj1;
let obj2;
let obj3 = [];
const main = document.querySelector(".main");
const layout = document.createElement("div");
layout.classList.add("main__layout");
main.appendChild(layout);
const makePoison = async (key) => {
    try {
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`);
        const drinkList = res.data.drinks;
        console.log(drinkList);
        drinkList.forEach((el) => {
            if (el.strDrink === key) {
                obj1 = el;
                return;
            }
        })
    } catch (error) {
        console.log(error)
    }
}
const findIngre = async (key) => {
    try {
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${key}`);
        const drinkList = res.data.drinks;
        for (let i = 0; i<4; i++) {
            console.log(drinkList[i]);
            obj3[i] = drinkList[i];
        }
    } catch (error) {
        console.log(error)
    }
}
const getRandom = async () => {
    try {
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        obj2 = res.data.drinks;
    } catch (error) {
        console.log(error);
    }
}
const makeDrinks = (drink, a) => {
    console.log(drink);
    const drinkContainer = document.createElement("article");
    const drinkName = document.createElement("h2");
    const drinkImg = document.createElement("img");
    const drinkInstr = document.createElement("p");
    drinkContainer.classList.add("main__article");
    drinkName.classList.add("main__title");
    drinkImg.classList.add("main__img");
    drinkName.innerText = `${a}: ${drink.strDrink}`;
    drinkContainer.appendChild(drinkImg); 
    drinkContainer.appendChild(drinkName);  
    drinkImg.setAttribute("src", drink.strDrinkThumb);
    drinkImg.setAttribute("alt", drink.strDrink);
    drinkInstr.classList.add("main__description");
    const drinkArr= Array.from(Object.entries(drink));
    const ingreList = drinkArr.filter((el) => el[0].startsWith("strIngredient") && el[1])
    const measureList = drinkArr.filter((el) => el[0].startsWith("strMeasure") && el[1])
    ingreList.forEach((el) => {
        const drinkIngre = document.createElement("p");
        drinkIngre.innerText = `${el[1]}: ${measureList[ingreList.indexOf(el)][1]}`;
        drinkContainer.appendChild(drinkIngre);
        drinkIngre.classList.add("main__ing");
    })
    drinkInstr.innerText = drink.strInstructions;
    drinkContainer.appendChild(drinkInstr);
    layout.appendChild(drinkContainer); 
}
const drinkRec = (drink) => {
    console.log(drink);
    const drinkContainer = document.createElement("article");
    const drinkName = document.createElement("h2");
    const drinkImg = document.createElement("img");
    drinkContainer.classList.add("main__article");
    drinkName.classList.add("main__title");
    drinkImg.classList.add("main__img");
    drinkName.innerText = `Poison with ${localStorage.selectedIngredient}: ${drink.strDrink}`;
    drinkImg.setAttribute("src", drink.strDrinkThumb);
    drinkContainer.appendChild(drinkImg); 
    drinkContainer.appendChild(drinkName);  
    layout.appendChild(drinkContainer);   
}
if (localStorage.selectedPoison) {
    await makePoison(localStorage.selectedPoison);
    makeDrinks(obj1, "Choose Your Poison");
    await getRandom();
    makeDrinks(obj2[0], "Poison of the Day");
}
if (localStorage.selectedIngredient) {
    await findIngre(localStorage.selectedIngredient);
    for (let i=0; i<obj3.length; i++) {
        drinkRec(obj3[i]);
    }
}