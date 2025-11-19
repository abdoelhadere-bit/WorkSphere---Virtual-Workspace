const ajoutBtn = document.querySelector(".ajoutBtn");
const annulBtnForm = document.querySelector("#annulBtnForm");
const detailsModal = document.querySelector("#details");
const employesChooseModal = document.querySelector("#employesChoose");


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

//Add an event to document to close details and employeeChoose Modal
document.addEventListener("click", (e) => {
    // console.log(e.target)
    if (e.target.classList.contains("closeDetails")) {
        detailsModal.classList.add("hidden");
        detailsModal.classList.remove("flex");
    }
    if (e.target.classList.contains("closeChoose")) {
        employesChooseModal.classList.add("hidden");
        employesChooseModal.classList.remove("flex");
    }
})