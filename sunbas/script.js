// Data structure to hold form elements
let formData = [];

// Function to create a form element
function createFormElement(type, label, placeholder = '', options = []) {
    const id = generateUUID();
    let element;

    switch (type) {
        case 'input':
            element = createInputElement(id, label, placeholder);
            break;
        case 'select':
            element = createSelectElement(id, label, options);
            break;
        case 'textarea':
            element = createTextareaElement(id, label, placeholder);
            break;
        case 'checkbox':
            element = createCheckboxElement(id, label);
            break;
    }

    // Store element in formData
    formData.push({ id, type, label, placeholder, options });
    document.getElementById('formContainer').appendChild(element);
}

// Function to generate a unique ID (UUID)
function generateUUID() {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Functions to create specific form elements
function createInputElement(id, label, placeholder) {
    const div = document.createElement('div');
    div.className = 'form-element';
    div.setAttribute('data-id', id);
    div.innerHTML = `<label>${label}</label><input type="text" placeholder="${placeholder}" />`;
    return div;
}

function createSelectElement(id, label, options) {
    const div = document.createElement('div');
    div.className = 'form-element';
    div.setAttribute('data-id', id);
    let optionsHTML = options.map(option => `<option>${option}</option>`).join('');
    div.innerHTML = `<label>${label}</label><select>${optionsHTML}</select>`;
    return div;
}

function createTextareaElement(id, label, placeholder) {
    const div = document.createElement('div');
    div.className = 'form-element';
    div.setAttribute('data-id', id);
    div.innerHTML = `<label>${label}</label><textarea placeholder="${placeholder}"></textarea>`;
    return div;
}

function createCheckboxElement(id, label) {
    const div = document.createElement('div');
    div.className = 'form-element';
    div.setAttribute('data-id', id);
    div.innerHTML = `<label><input type="checkbox" /> ${label}</label>`;
    return div;
}

// Event listeners for adding elements to the form
document.getElementById('addInput').addEventListener('click', () => createFormElement('input', 'New Input', 'Enter text'));
document.getElementById('addSelect').addEventListener('click', () => createFormElement('select', 'New Select', '', ['Option 1', 'Option 2', 'Option 3']));
document.getElementById('addTextarea').addEventListener('click', () => createFormElement('textarea', 'New Textarea', 'Enter text here'));
document.getElementById('addCheckbox').addEventListener('click', () => createFormElement('checkbox', 'New Checkbox'));

// Function to save the form data
document.getElementById('saveForm').addEventListener('click', () => {
    console.log(JSON.stringify(formData, null, 2));
});

// Dark mode toggle
document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});




// Enable drag-and-drop reordering
function enableDragAndDrop() {
    const formElements = document.querySelectorAll('.form-element');
    formElements.forEach(element => {
        element.setAttribute('draggable', true);
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', element.dataset.id);
        });
        element.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        element.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedElementId = event.dataTransfer.getData('text/plain');
            const draggedElement = document.querySelector(`[data-id="${draggedElementId}"]`);
            const targetElement = element;

            // Reorder elements
            formContainer.insertBefore(draggedElement, targetElement);
            // Update formData array accordingly (optional)
        });
    });
}



// Enable editing of labels and placeholders
document.querySelectorAll('.form-element label').forEach(label => {
    label.addEventListener('click', () => {
        const currentLabel = label.textContent;
        const newLabel = prompt('Edit label', currentLabel);
        if (newLabel !== null) {
            label.textContent = newLabel;
        }
    });
});



document.getElementById('previewForm').addEventListener('click', () => {
    const formHTML = document.getElementById('formContainer').innerHTML;
    console.log(formHTML);
});

