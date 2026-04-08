define("DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIQuickMenuFlatMode", ["require", "exports", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIWindowManager"], function (require, exports, WebVisuXRToolkitUIEventController_1, WebVisuXRToolkit_1, WebVisuXRToolkitUIWindowManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitUIQuickMenuFlatMode = void 0;
    class WebVisuXRToolkitUIQuickMenuFlatMode {
        constructor(skillsManager, domParent, inputManager) {
            this._currently_shown_window = null;
            this._active = false;
            const quickMenuStyles = `
        .flat-quick-menu {
            width: auto;             
            height: auto;            
            display: flex;
            overflow: visible;       
            align-items: flex-start;
            justify-content: flex-end;
            gap: 5mm;
        }

        /* Style for buttons in quick-menu */
        .flat-quick-menu button.qm-button {
            width: 26.5mm;
            height: 26.5mm;
            background-color: #3c414c;
            border: none;
            cursor: pointer;
            padding: 0;
            border-radius: 50%;
            overflow: hidden;
        }

        .flat-quick-menu .qm-button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            width: 26.5mm;
        }

        .flat-quick-menu .qm-button-container.invisible {
            display: none;
        }

        .flat-quick-menu button.qm-remove-button {
            width: 10mm;
            height: 10mm;
            background-color: #3c414c;
            border: none;
            border-radius: 5mm;
            cursor: pointer;
            padding: 0;
        }

        /* Hover state */
        .flat-quick-menu button.hover {
            background-color: #51565E;
        }
        
        /* Activated state */
        .flat-quick-menu button.active {
            background-color: #009FDE;
        }

        .flat-quick-menu button.active.hover {
            transform: scale(1.2);
            background-color: #01A9EC;
        }

        .flat-quick-menu button.critical{
            background-color: #AA0A1E;
        }

        .flat-quick-menu button.critical.hover{
            background-color: #B22234;
        }

        .flat-quick-menu button.off{
            background-color: #2F363C
        }

        .flat-quick-menu button.hide{
            visibility: hidden
        }

        /* Style for icons inside buttons */
        .flat-quick-menu button img {
            width: 80%; 
            height: 80%;
        }
        `;
            const buttons = new Map();
            const buttonContainers = new Map();
            // Create a <style> element to hold the CSS
            const styleElement = document.createElement("style");
            styleElement.appendChild(document.createTextNode(quickMenuStyles));
            domParent.appendChild(styleElement);
            // Create the main div for the function menu
            this._dom = document.createElement("div");
            this._dom.style.right = "5mm";
            this._quickmenu = document.createElement("div");
            this._dom.appendChild(this._quickmenu);
            this._quickmenu.className = "flat-quick-menu";
            const skills = skillsManager.listSkills();
            for (const systemSkill of skills.systemsSkills) {
                const window = WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.getWindow(systemSkill.name);
                if (window) {
                    const qmButtonContainer = document.createElement("div");
                    qmButtonContainer.className = "qm-button-container";
                    const qmButton = document.createElement("button");
                    qmButton.className = "qm-button";
                    qmButton.classList.add("active");
                    qmButton.id = systemSkill.displayedName;
                    const imgElement = document.createElement("img");
                    imgElement.crossOrigin = 'anonymous'; // or 'use-credentials' depending on the server
                    imgElement.src = systemSkill.icon;
                    qmButton.appendChild(imgElement);
                    qmButtonContainer.addEventListener("mouseenter", () => {
                        if (this._currently_shown_window === null || this._currently_shown_window.skillID !== systemSkill.name) {
                            if (this._currently_shown_window) {
                                this._currently_shown_window.htmlEl.remove();
                            }
                            if (window) {
                                this._currently_shown_window = { htmlEl: window.dom, skillID: systemSkill.name };
                                this._currently_shown_window.htmlEl.style.position = "relative";
                                this._currently_shown_window.htmlEl.style.top = "5mm";
                                this._currently_shown_window.htmlEl.style.left = "50%";
                                this._currently_shown_window.htmlEl.style.right = "0";
                                this._currently_shown_window.htmlEl.style.visibility = "visible";
                                this._currently_shown_window.htmlEl.style.display = "block";
                                this._currently_shown_window.htmlEl.style.transform = "translateX(-50%)";
                                qmButtonContainer.appendChild(this._currently_shown_window.htmlEl);
                            }
                            else {
                                this._currently_shown_window = null;
                            }
                        }
                    });
                    qmButtonContainer.addEventListener("mouseleave", () => {
                        if (this._currently_shown_window && this._currently_shown_window.skillID === systemSkill.name) {
                            this._currently_shown_window.htmlEl.remove();
                            this._currently_shown_window = null;
                        }
                    });
                    qmButtonContainer.appendChild(qmButton);
                    this._quickmenu.appendChild(qmButtonContainer);
                }
            }
            for (const skill of skills.skillList) {
                const qmButtonContainer = document.createElement("div");
                qmButtonContainer.className = "qm-button-container";
                const qmButton = document.createElement("button");
                qmButton.className = "qm-button";
                qmButton.id = skill.displayedName;
                const imgElement = document.createElement("img");
                imgElement.crossOrigin = 'anonymous'; // or 'use-credentials' depending on the server
                imgElement.src = skill.icon;
                qmButton.appendChild(imgElement);
                //const imgElement = document.createElement("img");
                qmButtonContainer.appendChild(qmButton);
                qmButton.addEventListener("click", () => {
                    const inputsArray = new Array();
                    const inputs = inputManager.getInputs();
                    for (const input of inputs.others) {
                        inputsArray.push(input);
                    }
                    if (!qmButton.classList.contains("active")) {
                        //skillsManager._clearSelectedSkills(inputsArray)
                        skillsManager._selectSkill(skill.name, inputsArray);
                    }
                    else {
                        for (const handedness of [WebVisuXRToolkit_1.AbstractHandedness.None, WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]) {
                            skillsManager._deSelectSkill(skill.name, handedness, inputsArray);
                        }
                        if (this._currently_shown_window && this._currently_shown_window.skillID === skill.name) {
                            this._currently_shown_window.htmlEl.remove();
                            this._currently_shown_window = null;
                        }
                    }
                });
                qmButtonContainer.addEventListener("mouseenter", () => {
                    if (!qmButton.classList.contains("hover")) {
                        qmButton.classList.add("hover");
                        this.resetCriticalStateButtons();
                        const inputs = inputManager.getInputs();
                        const inputsArray = new Array();
                        for (const other of inputs.others) {
                            inputsArray.push(other);
                        }
                        const incompatibleSkills = skillsManager.computeNotCompatibleSkillsWhenSelectingNew(skill.name, inputsArray);
                        for (const sk of incompatibleSkills) {
                            const butt = buttons.get(sk.skill.name);
                            if (butt) {
                                butt.classList.add("critical");
                            }
                        }
                        if (this._currently_shown_window === null || this._currently_shown_window.skillID !== skill.name) {
                            if (this._currently_shown_window) {
                                this._currently_shown_window.htmlEl.remove();
                            }
                            const window = WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.getWindow(skill.name);
                            if (window) {
                                this._currently_shown_window = { htmlEl: window.dom, skillID: skill.name };
                                this._currently_shown_window.htmlEl.style.position = "relative";
                                this._currently_shown_window.htmlEl.style.top = "5mm";
                                this._currently_shown_window.htmlEl.style.left = "50%";
                                this._currently_shown_window.htmlEl.style.right = "0";
                                this._currently_shown_window.htmlEl.style.transform = "translateX(-50%)";
                                qmButtonContainer.appendChild(this._currently_shown_window.htmlEl);
                            }
                            else {
                                this._currently_shown_window = null;
                            }
                        }
                    }
                });
                qmButtonContainer.addEventListener("mouseleave", () => {
                    if (qmButton.classList.contains("hover")) {
                        qmButton.classList.remove("hover");
                        if (this._currently_shown_window && this._currently_shown_window.skillID === skill.name) {
                            this._currently_shown_window.htmlEl.remove();
                            this._currently_shown_window = null;
                        }
                    }
                });
                this._quickmenu.appendChild(qmButtonContainer);
                buttons.set(skill.name, qmButton);
                buttonContainers.set(skill.name, qmButtonContainer);
            }
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.on(WebVisuXRToolkitUIEventController_1.QMEvents.QMNewSkillSelected, (activeSkills) => {
                if (this._active) {
                    const data = activeSkills.detail.selectedSkills;
                    if (data instanceof Set) {
                        for (const [skillName, qmButton] of buttons) {
                            if (data.has(skillName)) {
                                if (!qmButton.classList.contains("active")) {
                                    qmButton.classList.add("active");
                                }
                            }
                            else {
                                if (qmButton.classList.contains("active")) {
                                    qmButton.classList.remove("active");
                                }
                            }
                        }
                    }
                    this.resetCriticalStateButtons();
                }
            });
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.on(WebVisuXRToolkitUIEventController_1.QMEvents.QMUpdated, (event) => {
                if (this._active) {
                    const skills = skillsManager.listSkills(event.detail.inputs);
                    const selectableSkills = skills.selectableSkills;
                    for (const [skillName, qmButton] of buttonContainers) {
                        if (!selectableSkills.has(skillName)) {
                            qmButton.classList.add("invisible");
                        }
                        else if (qmButton.classList.contains("invisible")) {
                            qmButton.classList.remove("invisible");
                        }
                    }
                }
            });
            domParent.appendChild(this._dom);
            this._dom.style.display = "none";
            this._qm_buttons = buttons;
        }
        start() {
            this._dom.style.display = "flex";
            this._dom.style.zIndex = "99999";
            this._dom.style.position = "absolute";
            this._active = true;
            //console.log("Starting flat mode Quick Menu", this._dom)
        }
        updateQmButtons(inputs) {
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.emit(WebVisuXRToolkitUIEventController_1.QMEvents.QMUpdated, { inputs });
        }
        resetCriticalStateButtons() {
            for (const butt of this._qm_buttons.values()) {
                butt.classList.remove("critical");
            }
        }
    }
    exports.WebVisuXRToolkitUIQuickMenuFlatMode = WebVisuXRToolkitUIQuickMenuFlatMode;
});
