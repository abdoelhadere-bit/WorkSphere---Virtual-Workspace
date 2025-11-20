const ajoutBtn = document.querySelector(".ajoutBtn");
const annulBtnForm = document.querySelector("#annulBtnForm");
const detailsModal = document.querySelector("#details");
const employesChooseModal = document.querySelector("#employesChoose");
const photoUrlInput = document.getElementById('photoUrl');
const imagePreview = document.getElementById('imagePreview');
const experienceTemplate = document.querySelector("#experienceTemplate");
const addExperienceBtn = document.querySelector("#addExperienceBtn");

let employes = [];
let employe

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

// Create a details modal 
// loop on the exepriences and add it to details modal
function employeeDetails(experience) {
    detailsEmployee.innerHTML = `
        <div class="flex flex-col items-center text-center pb-6 border-b border-gray-200">
            <div class="w-26 h-26 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-500 mb-4">
                <img src="${employe.url}" alt="${employe.nom}" class="w-full h-full object-cover">
            </div>
            <h3 class="text-xl font-semibold text-gray-900">${employe.nom}</h3>
            <p class="text-sm text-gray-500 mb-4">${employe.role}</p>
            <div class="space-y-1 text-sm text-gray-600">
                <p><span class="font-medium">Email:</span> ${employe.email}</p>
                <p><span class="font-medium">Tél:</span> ${employe.telephone}</p>
                <p><span class="font-medium">Localisation:</span> ${employe.localisation}</p>
            </div>
        </div>
        
        ${experience.length > 0 ? `
        <div class="mt-6">
            <h4 class="text-base font-semibold text-gray-900 mb-4">Expériences professionnelles</h4>
            <div class="space-y-3" id="experienceList"></div>
        </div>
        ` : ''}
    `
    if (experience.length > 0) {
        const expList = detailsEmployee.querySelector("#experienceList");
        experience.forEach((exp) => {
            const divExp = document.createElement("div");
            divExp.className = "p-4 bg-gray-50 rounded-lg border border-gray-200 text-center w-full";
            divExp.innerHTML = `
                <p class="font-semibold text-gray-900 text-sm">${exp.poste}</p>
                <p class="text-gray-600 text-sm mt-1">${exp.entreprise}</p>
                <p class="text-gray-500 text-xs mt-2">${exp.debut} - ${exp.fin}</p>
                <p class="text-gray-600 text-sm mt-2">${exp.description}</p>
            `;
            expList.appendChild(divExp);
        });
    }
}


cvForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let experience = []
    
    const nom = document.querySelector('input[name="nom"]').value.trim();
    const role = document.querySelector("select[name='role']").value.trim();
    const url = document.querySelector('input[name="url"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const telephone = document.querySelector('input[name="telephone"]').value.trim()
    
    document.querySelectorAll(".experiencedata").forEach((exp) => {
        let poste = exp.querySelector('input[name="poste"]').value.trim().trim();
        let entreprise = exp.querySelector('input[name="entreprise"]').value.trim().trim();
        let debut = exp.querySelector('input[name="debut"]').value.trim();
        let fin = exp.querySelector('input[name="fin"]').value.trim();
        let description = exp.querySelector("textarea").value.trim()
        
        if (poste || entreprise) {
            experience.push({ poste, entreprise, debut, fin, description });
        }
    })
    
    // Put the input values into employe object
    employe = { id: Date.now(), nom, role, url, telephone, localisation: 'Unsigned',experience }

    const employee = document.createElement("div");
    createEmployee(employee)

    // push the employe object to employes array
    employes.push(employe);
    employesContainer.appendChild(employee);

    showToast("L'Employé à été enregistrer avec succées")

    // Reset Form
    cvForm.reset();
    // reset the image container
    document.getElementById('imagePreview').innerHTML = '<span class="text-gray-400 text-xs">Aperçu</span>';

    // hide the form container after submiting
    formContainerAjout.classList.add("hidden");
    formContainerAjout.classList.remove("flex");
})

// Filtring employees by their role
function filterByRole(employees, role){
    return employees.filter(emp => emp.role === role)
}

// Controling the employees who should acces to some room
function chooseList(employees, loc='', index, role){
    chooseEmployee.innerHTML = ''

    // Check the role of employees & filter the employes based on this role and add the managers the cleners
    if(role === 'Techniciens IT' || role === 'Agents de sécurité' || role === 'Réceptionnistes'){
        let managers = filterByRole(employees, 'Manager')
        let cleaners = filterByRole(employees, 'Nettoyage')
        employees = filterByRole(employees, role)
        employees.push(...managers)
        employees.push(...cleaners)
        
    }

 
}



function showToast(message, type = "info") {
    const container = document.getElementById("toast-container")

    const colors = {
        info: "bg-indigo-600",
        success: "bg-emerald-600",
        warning: "bg-amber-600",
        error: "bg-red-600"
    };

    const toast = document.createElement("div")
    toast.className = `toast text-white px-4 py-3 rounded-lg shadow-2xl ${colors[type]} border border-white/20`
    toast.textContent = message

    container.appendChild(toast)

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
    