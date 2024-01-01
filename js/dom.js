import { moveToRead, moveToUnread, deleteBook } from "./crud.js";

// buat element
function makeElement(dataBooks) {
    const { id, title, author, year, isComplite } = dataBooks;

    let img = document.createElement("img");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");
    let buttonDelete = document.createElement("button");
    let buttonSave = document.createElement("button");
    let buttonUndo = document.createElement("button");
    let divImg = document.createElement("div");
    let divBtn = document.createElement("div");
    let divText = document.createElement("div");
    let divImgText = document.createElement("div");
    let divContainerAll = document.createElement("div");

    // add data without read condition
    h5.innerHTML = `${title}<span>(${year})</span>`;
    p.innerText = author;
    divText.classList.add("data-item__info__text");
    divText.append(h5, p);
    buttonDelete.innerHTML = `<i class="bi bi-trash3-fill"></i>`;

    // create element depends
    if (isComplite) {
        img.setAttribute("src", "../images/open-book.png");
        img.setAttribute("alt", "book that has been read");
        img.classList.add("img-size");
        divImg.classList.add("data-item__info__img");
        divImg.append(img);
        divImgText.classList.add("data-item__info");
        divImgText.append(divImg, divText);
        buttonUndo.innerHTML = `<i class="bi bi-arrow-counterclockwise"></i>`;
        divBtn.classList.add("data-item__btn");
        divBtn.append(buttonUndo, buttonDelete);
        divContainerAll.classList.add("data-item");
        divContainerAll.append(divImgText, divBtn);
    } else {
        img.setAttribute("src", "../images/book.png");
        img.setAttribute("alt", "unread book");
        img.classList.add("img-size");
        divImg.classList.add("data-item__info__img");
        divImg.append(img);
        divImgText.classList.add("data-item__info");
        divImgText.append(divImg, divText);
        buttonSave.innerHTML = `<i class="bi bi-check-lg"></i>`;
        divBtn.classList.add("data-item__btn");
        divBtn.append(buttonSave, buttonDelete);
        divContainerAll.classList.add("data-item");
        divContainerAll.append(divImgText, divBtn);
    }

    buttonDelete.addEventListener("click", () => {
        deleteBook(id);
    });

    buttonSave.addEventListener("click", () => {
        moveToRead(id);
    });

    buttonUndo.addEventListener("click", () => {
        moveToUnread(id);
    });

    return divContainerAll;
}

// non data
function nonData() {
    let div = document.createElement("div");
    div.classList.add("no-content");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Tidak Ada Data";
    div.append(h1);
    return div;
}

export { makeElement, nonData };
