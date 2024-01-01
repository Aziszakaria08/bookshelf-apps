import {
    NODATA_EVENT,
    RENDER_EVENT,
    DELETE_EVENT,
    MOVE_EVENT,
    SAVE_EVENT,
} from "./variable.js";
import { saveProgress } from "./storage.js";

let dataBook = [];

// fngsi untuk tambah buku
function addBook() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let year = document.querySelector("#year").value;
    let isComplite = document.querySelector("#isComplite");
    let complite = false;
    if (isComplite.checked) {
        complite = true;
    } else {
        complite = false;
    }

    let data = {
        id: +new Date(),
        title: title,
        author: author,
        year: parseInt(year),
        isComplite: complite,
    };

    if (title.length == 0 || author.length == 0 || year.length == 0) {
        document.dispatchEvent(new Event(NODATA_EVENT));
    } else {
        dataBook.push(data);
        saveProgress(SAVE_EVENT);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}

// menghapus form
function clearForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#year").value = "";
    document.querySelector("#isComplite").checked = false;
}

// mencari index buku
function findIndex(bookId) {
    for (const index in dataBook) {
        if (dataBook[index].id == bookId) {
            return index;
        }
    }
    return -1;
}

// mencari buku
function findBook(bookId) {
    for (const bookItem of dataBook) {
        if (bookItem.id == bookId) {
            return bookItem;
        }
    }
    return null;
}

//menghapus buku
const deleteBook = (bookId) => {
    const bookTarget = findIndex(bookId);

    if (bookTarget === -1) return;

    dataBook.splice(bookTarget, 1);
    saveProgress(DELETE_EVENT);
    document.dispatchEvent(new Event(RENDER_EVENT));
};

// menjadi sudah dibaca
function moveToRead(bookId) {
    let tempValue = [...dataBook].map((value) => {
        if (value.id == bookId) {
            value.isComplite = true;
            return value;
        }
        return value;
    });
    dataBook = tempValue;
    saveProgress(MOVE_EVENT);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// pergi ke belum baca
function moveToUnread(bookId) {
    let tempvalue = [...dataBook].map((value) => {
        if (value.id == bookId) {
            value.isComplite = false;
            return value;
        }
        return value;
    });
    dataBook = tempvalue;
    saveProgress(MOVE_EVENT);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

export {
    addBook,
    clearForm,
    deleteBook,
    findBook,
    findIndex,
    moveToRead,
    moveToUnread,
    dataBook,
};
