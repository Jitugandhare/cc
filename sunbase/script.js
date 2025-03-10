
        function addElement(type) {
            const id = Date.now().toString();
            let elementHTML = `<div class="form-element" draggable="true" ondragstart="drag(event)" id="${id}">
                <label contenteditable="true">${type}</label>`;

            if (type === 'Input') {
                elementHTML += `<input type="text" placeholder="Enter text" oninput="updatePlaceholder(this)" contenteditable="true" />`;
            } else if (type === 'Textarea') {
                elementHTML += `<textarea placeholder="Enter text" oninput="updatePlaceholder(this)" contenteditable="true"></textarea>`;
            } else if (type === 'Select') {
                elementHTML += `<select id="select-${id}">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                                <button onclick="addOption('${id}')">Add Option</button>
                                <button onclick="removeOption('${id}')">Remove Option</button>`;
            } else if (type === 'Checkbox') {
                elementHTML += `<input type="checkbox" />`;
            }

            elementHTML += `<button class="delete-btn" onclick="removeElement('${id}')">X</button></div>`;
            document.getElementById("form").innerHTML += elementHTML;
        }

        function removeElement(id) {
            document.getElementById(id).remove();
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
            document.getElementById("form").appendChild(draggedElement);
        }

        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
        }

        function saveForm() {
            const formJSON = [];
            document.querySelectorAll(".form-element").forEach(el => {
                formJSON.push({
                    id: el.id,
                    type: el.children[1].tagName.toLowerCase(),
                    label: el.children[0].innerText
                });
            });
            console.log(JSON.stringify(formJSON, null, 2));
        }

        function previewForm() {
            const previewWindow = window.open("", "Preview", "width=400,height=600");
            let formHTML = "<form>";
            document.querySelectorAll(".form-element").forEach(el => {
                formHTML += `<div><label>${el.querySelector('label').innerText}</label>` + el.innerHTML + "</div>";
            });
            formHTML += "</form>";
            previewWindow.document.write(formHTML);
        }

        function addOption(id) {
            const select = document.getElementById(`select-${id}`);
            const option = document.createElement("option");
            option.text = `Option ${select.options.length + 1}`;
            select.add(option);
        }

        function removeOption(id) {
            const select = document.getElementById(`select-${id}`);
            if (select.options.length > 0) {
                select.remove(select.options.length - 1);
            }
        }
   