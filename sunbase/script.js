
let formElements = [];

function addElement(type) {
    const id = Date.now().toString();
    let elementHTML = `<div class="form-element" draggable="true" ondragstart="drag(event)" id="${id}">
        <label contenteditable="true"> ${type}</label>`;

    if (type === 'Input' || type === 'Textarea') {
        elementHTML += `<input type="${type}" placeholder="Enter text" contenteditable="true" />`;
    } else if (type === 'Select') {
        elementHTML += `<select contenteditable="true"><option>Option 1</option><option>Option 2</option></select>
                        <button onclick="addOption('${id}')">Add Option</button>
                        <button onclick="removeOption('${id}')">Remove Option</button>`;
    } else if (type === 'Checkbox') {
        elementHTML += `<input type="checkbox" contenteditable="true" />`;
    }

    elementHTML += `<button class="delete-btn" onclick="removeElement('${id}')">Delete</button></div>`;
    document.getElementById("form").innerHTML += elementHTML;
    formElements.push({ id, type });
}

function removeElement(id) {
    const element = document.getElementById(id);
    element.remove();
    formElements = formElements.filter(e => e.id !== id);
}

function addOption(id) {
    const selectElement = document.getElementById(id).querySelector('select');
    const optionText = prompt("Enter option text:");
    if (optionText) {
        const newOption = document.createElement("option");
        newOption.textContent = optionText;
        selectElement.appendChild(newOption);
    }
}

function removeOption(id) {
    const selectElement = document.getElementById(id).querySelector('select');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    if (selectedOption) {
        selectElement.removeChild(selectedOption);
    } else {
        alert("Please select an option to delete");
    }
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const target = event.target.closest('.form-element');
    if (target && target !== draggedElement) {
        document.getElementById("form").insertBefore(draggedElement, target);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function saveForm() {
    const formJSON = [];
    document.querySelectorAll(".form-element").forEach(el => {
        const elementType = el.querySelector('input') ? 'input' :
            el.querySelector('textarea') ? 'textarea' :
                el.querySelector('select') ? 'select' :
                    'checkbox';

        let elementData = { id: el.id, type: elementType, label: el.querySelector('label').innerText };

        if (elementType === 'input' || elementType === 'textarea') {
            elementData.placeholder = el.querySelector('input').placeholder;
        }

        if (elementType === 'select') {
            elementData.options = [...el.querySelector('select').options].map(option => option.text);
        }

        formJSON.push(elementData);
    });
    console.log(JSON.stringify(formJSON, null, 2));
}

function previewForm() {
    const previewWindow = window.open("", "Preview", "width=400,height=600");
    let formHTML = "<form>";
    document.querySelectorAll(".form-element").forEach(el => {
        formHTML += `<div><label>${el.querySelector('label').innerText}</label>${el.querySelector('input') ? el.querySelector('input').outerHTML :
            el.querySelector('textarea') ? el.querySelector('textarea').outerHTML :
                el.querySelector('select') ? el.querySelector('select').outerHTML :
                    el.querySelector('input[type=checkbox]').outerHTML}</div>`;
    });
    formHTML += "</form><button onclick='copyHTML()'>Copy HTML</button>";
    previewWindow.document.write(formHTML + "<script>function copyHTML() { navigator.clipboard.writeText(document.querySelector('form').outerHTML); alert('Copied!'); }<\/script>");
}
