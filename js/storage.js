import {
    RENDER_EVENT,
    SAVE_EVENT,
    DELETE_EVENT,
    MOVE_EVENT,
    STORAGE_KEY,
} from "./variable.js";
import { dataBook } from "./crud.js";


// fungsi check dukungan storage
function isStorageExist() {
    if (typeof Storage === undefined) {
        alert("Browser kamu tidak mendukung web storage");
        return false;
    }
    return true;
}

function saveProgress(EVENT) {
    if (!isStorageExist()) return;

    let parsedDataBook = JSON.stringify(dataBook);
    localStorage.setItem(STORAGE_KEY, parsedDataBook);

    switch (EVENT) {
        case SAVE_EVENT:
            document.dispatchEvent(new Event(SAVE_EVENT));
            break;
        case DELETE_EVENT:
            document.dispatchEvent(new Event(DELETE_EVENT));
            break;
        case MOVE_EVENT:
            document.dispatchEvent(new Event(MOVE_EVENT));
            break;
        default:
            console.log("Please use Event!");
            break;
    }
}

// fungsi untuk mengambil data dari localstorage
function loadData() {
    const dataBookFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (dataBookFromStorage != null) {
        for (const book of dataBookFromStorage) {
            dataBook.push(book);
        }

    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

export { STORAGE_KEY, isStorageExist, loadData, saveProgress };
