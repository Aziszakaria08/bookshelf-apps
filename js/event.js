import { DELETE_EVENT, LOAD_EVENT, MOVE_EVENT, NODATA_EVENT, RENDER_EVENT, SAVE_EVENT, TEST_EVENT } from "./variable.js";
import { nonData, makeElement } from "./dom.js";
import { dataBook } from "./crud.js";

document.addEventListener(RENDER_EVENT, () => {
    let finishedBook = document.querySelector("#sudahDibaca");
    finishedBook.innerHTML = "";

    let unfinishedBook = document.querySelector("#belumDibaca");
    unfinishedBook.innerHTML = "";

    let findDataRead = dataBook.find((value) => value.isComplite == true);
    let findDataNotRead = dataBook.find((value) => value.isComplite == false);

    //Check While non data submitted
    if (dataBook.length == 0 || findDataRead == undefined) {
        finishedBook.append(nonData());
    }
    if (dataBook.length == 0 || findDataNotRead == undefined) {
        unfinishedBook.append(nonData());
    }

    for (const book of dataBook) {
        let element = makeElement(book);
        if (book.isComplite) {
            finishedBook.append(element);
        } else {
            unfinishedBook.append(element);
        }
    }
});

document.addEventListener(SAVE_EVENT, () => {
    Swal.fire({
        icon: "success",
        title: "Data Berhasil Disimpan!",
        showConfirmButton: true,
        timer: 1500,
    });
});

document.addEventListener(DELETE_EVENT, () => {
    Swal.fire({
        icon: "success",
        title: "Data Berhasil Dihapus!",
        showConfirmButton: true,
        timer: 1500,
    });
});

document.addEventListener(MOVE_EVENT, () => {
    Swal.fire({
        icon: "success",
        title: "Data Berhasil Dipindahkan!",
        showConfirmButton: true,
        timer: 1500,
    });
});

document.addEventListener(LOAD_EVENT, () => {
    Swal.fire({
        icon: "success",
        title: "Data Berhasil Dimuat!",
        showConfirmButton: true,
        timer: 1500,
    });
});
document.addEventListener(NODATA_EVENT, () => {
    Swal.fire({
        icon: "error",
        title: "Data Kosong!",
        text: "Silahkan Isi Semua Input Form!",
        showConfirmButton: true,
        timer: 1500,
    });
});


