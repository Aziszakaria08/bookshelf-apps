import { isStorageExist, loadData } from "./storage.js";
import { addBook, clearForm } from "./crud.js";

// fungsi ketika pertama load halaman
document.addEventListener("DOMContentLoaded", () => {
    // manggil tag
    let submitForm = document.querySelector(".form-btn");
    let searchBar = document.querySelector("#cari");

    // check storage
    if (isStorageExist()) {
        // load data dari strage
        loadData();
    }

    // ketika klik form
    submitForm.addEventListener("click", (event) => {
        event.preventDefault();
        addBook(); // fungsi tambah buku
        clearForm(); // menghapus nilai dari input
    });

    // cari buku
    searchBar.addEventListener("keyup", (e) => {
        const valueSearch = e.target.value.toLowerCase();
        let dataItem = document.querySelectorAll(".data-item");

        for (const book of dataItem) {
            let dataItemInfo = book.firstChild;
            let dataItemInfoText = dataItemInfo.lastChild;
            let dataItemInfoTextStr = dataItemInfoText.firstChild.textContent;

            // searching buku
            if (String(dataItemInfoTextStr).toLowerCase().includes(valueSearch)) {
                book.setAttribute("style", "display:flex;");
            } else {
                book.setAttribute("style", "display:none;");
            }
        }
    });
});
