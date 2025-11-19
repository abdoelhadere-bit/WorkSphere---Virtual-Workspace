const ajoutBtn = document.querySelector(".ajoutBtn");
const annulBtnForm = document.querySelector("#annulBtnForm");


// Event on the ajout btn to display the form container
ajoutBtn.addEventListener("click", () => {
    formContainerAjout.classList.remove("hidden");
    formContainerAjout.classList.add("flex");
})

// Event on the annul btn to hide and reset the form container
annulBtnForm.addEventListener("click", () => {
    formContainerAjout.classList.add("hidden");
    formContainerAjout.classList.remove("flex");
    cvForm.reset();
})