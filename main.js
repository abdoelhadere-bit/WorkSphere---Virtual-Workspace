const ajoutBtn = document.querySelector(".ajoutBtn");
const annulBtnForm = document.querySelector("#annulBtnForm");
const detailsModal = document.querySelector("#details");
const employesChooseModal = document.querySelector("#employesChoose");
const photoUrlInput = document.getElementById('photoUrl');
const imagePreview = document.getElementById('imagePreview');
const experienceTemplate = document.querySelector("#experienceTemplate");
const addExperienceBtn = document.querySelector("#addExperienceBtn");


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

// Event input url to display the image when it provided
photoUrlInput.addEventListener('input', function() {
    const url = this.value.trim();
    if (url) {
        imagePreview.innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
    } else {
        imagePreview.innerHTML = '<span class="text-gray-400 text-xs">Aperçu</span>';
    }
})

// function to clone template experience and adding click event to remove this experiene
function addExperience() {
    let clone = experienceTemplate.content.cloneNode(true);
    let container = clone.querySelector("div");
    container.querySelector(".removeExpBtn").addEventListener("click", () => {
        container.remove();
    });
    experiencesList.append(container);
}
// executing the function when the page is loaded 
addExperience();
// Event on addExpBtn to keep adding experiences when it needed
addExperienceBtn.addEventListener("click", () => addExperience())

// Create and employee div whith tailwind style  
function createEmployee(element) {
    element.className = "employe flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer";
    element.dataset.id = employe.id;
    element.innerHTML = `
        <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
            <img class="w-full h-full object-cover" src="${employe.url}" alt="${employe.nom}">
        </div>
        <div class="flex-1 min-w-0">
            <h5 class="text-sm font-semibold text-gray-900 truncate">${employe.nom}</h5>
            <p class="text-xs text-gray-500 truncate">${employe.role}</p>
            <p class="text-xs text-gray-500 truncate">${employe.localisation}</p>
        </div>
    `;
    return element;
}

