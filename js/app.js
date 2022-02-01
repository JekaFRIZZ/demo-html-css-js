document.body.onload = showGifts;
let myDiv = newDiv = null;

function showGifts() {
    let i = 0;
    while (i < 10) {
        addElement(i);
        i++;
    }
}

function addElement(number) {
    let newDiv = document.createElement("div");
    newDiv.className = "col-3";
    newDiv.innerHTML = "<div class=\"card\">\n" +
        "                <img class=\"card-img-top\" src=\"../image/shopping_cart_black_24dp.svg\" alt=\"Card image cap\">\n" +
        "                <div class=\"card-body\">\n" +
        "                    <div class=\"title_section\">\n" +
        "                        <h5 class=\"card-title\">Coupon name " + number + "</h5>\n" +
        "                        <img id=\"heart-img\" src=\"../image/favorite_black_24dp.svg\" alt=\"heart\">\n" +
        "                    </div>\n" +
        "                    <div class=\"descr_section\">\n" +
        "                        <p class=\"card-text\">Some brief descr. " + (number + 1) + "</p>\n" +
        "                        <p class=\"expired\">Expired in 7 days</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"payment_section\">\n" +
        "                        <p class=\"price\">235$</p>\n" +
        "                        <button class=\"add\">Add to cart</button>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>";

    document.getElementById("sdf").appendChild(newDiv);
}

showGifts()

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        showGifts();
    }
})

function searchByName() {
    console.log(document.getElementById("sdf"));
}

window.onload = () => {
    let input = document.querySelector("#search");
    input.oninput = function () {
        let value = this.value.trim();
        let list = document.querySelectorAll(".card");
        if (value) {
            list.forEach(gift => {
                if (gift.getElementsByClassName("card-title").item(0).innerText.search(value) === -1 &&
                    gift.getElementsByClassName("card-text").item(0).innerText.search(value) === -1) {
                    gift.classList.replace("card", "hide");
                } /*else {
                    if (gift.getElementsByClassName("card-text").item(0).innerText.search(value) === -1) {
                        gift.classList.replace("card", "hide");
                    }
                }*/
            });
        } else {
            let newList = document.querySelectorAll(".hide");
            newList.forEach(gift => {
                gift.classList.replace("hide", "card");
            });
        }
    }
    ;
}
