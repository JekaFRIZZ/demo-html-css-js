const data = [{
    "image": "../image/shopping_cart_black_24dp.svg",
    "title": "First",
    "description": "This is comp",
    "expired": "7",
    "price": 123,
    "tag": "Automobiles"
},
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Second",
        "description": "Description",
        "expired": "7",
        "price": 123,
        "tag": "Film Animation"
    },
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Third",
        "description": "Description",
        "expired": "7",
        "price": 123,
        "tag": "Automobiles"
    },
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Fourth",
        "description": "Description",
        "expired": "7",
        "price": 123,
        "tag": "Film Animation"
    },
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Fifth",
        "description": "Description",
        "expired": "7",
        "price": 123,
        "tag": "Automobiles"
    },
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Sixth",
        "description": "Description",
        "expired": "7",
        "price": 123,
        "tag": "Film Animation"
    },
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Seventh",
        "description": "Description",
        "expired": "7",
        "price": 123,
        "tag": "Automobiles"
    },
    ,
    {
        "image": "../image/shopping_cart_black_24dp.svg",
        "title": "Eighth",
        "description": "Description",
        "expired": "17",
        "price": 322,
        "tag": "Art"
    }
];

let inner;
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options__container");
const searchBox = document.querySelector(".search__box input");
const input = document.querySelector("#search");

const optionList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
        searchBox.focus();
    }
});

optionList.forEach(option => {
    option.addEventListener("click", () => {
        selected.innerHTML = option.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
        let sortedByTag;
        if (inner) {
            const sortedByTitle = search(inner);
            sortedByTag = searchByTag(selected.innerText, sortedByTitle);
        } else {
            sortedByTag = searchByTag(selected.innerText, data);
        }
        const giftsContainer = document.querySelectorAll(".col-3");
        giftsContainer.forEach(gift => {
            gift.remove();
        });

        if (sortedByTag.length === 0) {
            printNotFound();
        } else {
            existNotFound();

            sortedByTag.forEach(gift => {
                addElement(gift);
            });
        }
    });
});

searchBox.addEventListener("keyup", function (e) {
    filterList(e.target.value);
});

const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    optionList.forEach(option => {
        let label = option.firstElementChild.nextElementSibling.innerHTML.toLowerCase();
        if (label.indexOf(searchTerm) !== -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
};

function addElement(gift) {
    let newDiv = document.createElement("div");
    newDiv.className = "col-3";
    newDiv.innerHTML = "<div class=\"card\">\n" +
        "                <img class=\"card-img-top\" src=\"" + gift.image + "\" alt=\"Card image cap\">\n" +
        "                <div class=\"card-body\">\n" +
        "                    <div class=\"title_section\">\n" +
        "                        <h5 class=\"card-title\">" + gift.title + "</h5>\n" +
        "                        <img id=\"heart-img\" src=\"../image/favorite_black_24dp.svg\" alt=\"heart\">\n" +
        "                    </div>\n" +
        "                    <div class=\"descr_section\">\n" +
        "                        <p class=\"card-text\">" + gift.description + "</p>\n" +
        "                        <p class=\"expired\">Expired in " + gift.expired + " days</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"payment_section\">\n" +
        "                        <p class=\"price\">" + gift.price + "$" + "</p>\n" +
        "                        <button class=\"add\">Add to cart</button>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>";

    document.getElementById("sdf").appendChild(newDiv);
}

input.addEventListener("input", (e) => {
    let title = e.target.value.toLowerCase();
    inner = title;
    if (title) {
        if (selected.innerText !== "All Categories") {
            existNotFound();
            const giftsContainer = document.querySelectorAll(".col-3");
            giftsContainer.forEach(gift => {
                gift.remove();
            });
            const sortedByTitle = search(title);
            const result = searchByTag(selected.innerText, sortedByTitle);

            if (result.length === 0) {
                printNotFound();
            } else {
                result.forEach(gift => {
                    addElement(gift);
                });
            }
        } else {
            existNotFound();
            const filteredData = search(title);
            const giftsContainer = document.querySelectorAll(".col-3");
            giftsContainer.forEach(gift => {
                gift.remove();
            });

            if (filteredData.length === 0) {
                printNotFound();
            } else {
                filteredData.forEach(gift => {
                    addElement(gift);
                });
            }
        }
    } else {
        const giftsContainer = document.querySelectorAll(".col-3");
        giftsContainer.forEach(gift => {
            gift.remove();
        });
        existNotFound()
        show();
    }

});

function printNotFound() {
    const sdf = document.getElementById("sdf");
    sdf.innerHTML = "<div class=\"notFound\">Nothing found for your request</div>";
}

function existNotFound() {
    const notFound = document.querySelector(".notFound");
    if (notFound) {
        notFound.remove();
    }
}

function search(title) {
    return data.filter(gift => {
        return gift.title.toLowerCase().includes(title) ||
            gift.description.toLowerCase().includes(title)
    });
}

const searchByTag = (tag, data) => {
    return data.filter(gift => {
        return gift.tag.includes(tag);
    });
}

function show() {
    data.forEach(gift => {
        addElement(gift);
    })
}

window.onload = function () {
    let myButton = document.getElementById("topButton");
    myButton.style.display = "none";
    show();
};

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        show();
    }
});