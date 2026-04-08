/// <amd-module name="DS/WebVisuXRToolkit/UI/WebVisuXRToolkitHandMenuUIElements"/>
define("DS/WebVisuXRToolkit/UI/WebVisuXRToolkitHandMenuUIElements", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandMenuUIComponents = exports.Button = exports.Label = exports.Toggle = exports.Radio = exports.Slider = exports.Container = void 0;
    function camelToTitleCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
            .replace(/^./, match => match.toUpperCase()); // Capitalize first letter
    }
    class Container {
        constructor(layout, direction, elements) {
            this.container = document.createElement("div");
            if (layout !== "start" && layout !== "end") {
                layout = "default";
            }
            if (direction !== "row") {
                direction = "column";
            }
            this.container.id = "container";
            this.container.className = "HandMenuUIContainer";
            switch (layout) {
                case "default":
                    this.container.style.justifyContent = "space-between";
                    break;
                case "start":
                    this.container.style.justifyContent = "flex-start";
                    break;
                case "end":
                    this.container.style.justifyContent = "flex-end";
                    break;
            }
            if (direction === "column") {
                this.container.classList.add("HandMenuContainerColumn");
            }
            this.elements = elements || [];
            for (const el of this.elements) {
                this.container.appendChild(el.getHTMLElement());
            }
        }
        clear() {
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            this.elements = [];
        }
        getHTMLElement() {
            return this.container;
        }
        addElement(element) {
            this.container.appendChild(element.getHTMLElement());
            this.elements.push(element);
        }
        removeElement(element) {
            this.container.removeChild(element.getHTMLElement());
            const index = this.elements.indexOf(element);
            if (index !== -1) {
                this.elements.splice(index, 1);
            }
        }
        get value() {
            return this.elements;
        }
        set value(val) {
            this.elements = val;
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            for (const el of this.elements) {
                this.container.appendChild(el.getHTMLElement());
            }
        }
    }
    exports.Container = Container;
    class Slider {
        constructor(name, max, min, step, currenValue, unit = "") {
            this.listItem = document.createElement("div");
            // sanity check (max > min, is current value between min and max, does the step fit in the range)
            if (!(max > min && currenValue >= min && currenValue <= max && (max - min) % step === 0))
                console.warn(`Slider ${name} is initiated with conflicting value ( check max > min, step/currenValue in range )`);
            this.value = currenValue;
            this.listItem.style.display = "flex";
            this.listItem.style.flexDirection = "column";
            this.listItem.style.alignItems = "stretch"; // Changed from flex-start to stretch so children take full width
            this.listItem.style.gap = "5mm";
            // 1. Main Label (Top)
            const label = document.createElement("h3");
            label.style.margin = "0";
            label.textContent = `${camelToTitleCase(name)}: ${currenValue}${unit}`;
            // 2. The Slider Input
            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = min.toString();
            slider.max = max.toString();
            slider.step = step.toString();
            slider.value = this.value.toString();
            // Base Styles
            slider.style.width = "100%";
            slider.style.minWidth = "100mm";
            slider.style.padding = "0";
            slider.style.margin = "0";
            slider.style.height = "22mm"; // Total height (and Thumb height)
            slider.style.cursor = "pointer";
            // --- Set Track Height via CSS Variable ---
            slider.style.setProperty('--track-height', '14mm');
            // Initial accentColor
            slider.style.accentColor = "#00A0FF";
            // Hover effect logic
            slider.addEventListener("mouseenter", () => {
                slider.style.accentColor = "#00B4FF";
            });
            slider.addEventListener("mouseleave", () => {
                slider.style.accentColor = "#00A0FF";
            });
            // 3. Min/Max Labels Container (Bottom)
            const footer = document.createElement("div");
            footer.style.display = "flex";
            footer.style.justifyContent = "space-between";
            footer.style.width = "100%";
            const minLabel = document.createElement("h3");
            minLabel.style.margin = "0";
            minLabel.textContent = `${min}${unit}`;
            const maxLabel = document.createElement("h3");
            maxLabel.style.textAlign = "right";
            maxLabel.style.margin = "0";
            maxLabel.textContent = `${max}${unit}`;
            footer.appendChild(minLabel);
            footer.appendChild(maxLabel);
            // Update logic
            slider.addEventListener("input", () => {
                this.value = Number(slider.value);
                label.textContent = `${camelToTitleCase(name)}: ${slider.value}${unit}`;
            });
            // Assemble
            this.listItem.appendChild(label);
            this.listItem.appendChild(slider);
            this.listItem.appendChild(footer);
        }
        getHTMLElement() {
            return this.listItem;
        }
    }
    exports.Slider = Slider;
    class Radio {
        get value() {
            return this._value;
        }
        set value(val) {
            if (this._value !== val) {
                this._value = val;
                this.updateUI();
                if (this.onElementSelected) {
                    this.onElementSelected(this._value);
                }
            }
        }
        constructor(values, current /* | Set<string>*/) {
            this.optionsContainer = document.createElement("div");
            //for special case of hand menu selector;
            this._makeiconsSmall = false;
            this.values = values;
            this._value = current;
            this.updateUI();
        }
        addValue(name, val) {
            this.values.set(name, val);
            this.updateUI();
            if (this._value === null) {
                this._value = name;
            }
            if (this.onElementSelected && name === this._value) {
                this.onElementSelected(name);
            }
        }
        removeValue(name) {
            if (this.values.delete(name)) {
                if (this.values.size === 0) {
                    this._value = null;
                    if (this.onElementSelected) {
                        this.onElementSelected(this._value);
                    }
                    return;
                }
                if (this._value === name) {
                    this._value = this.values.keys().next().value;
                    if (this.onElementSelected) {
                        this.onElementSelected(this._value);
                    }
                }
                this.updateUI();
            }
        }
        updateUI() {
            this.optionsContainer.style.display = "flex";
            this.optionsContainer.style.flexWrap = "wrap";
            this.optionsContainer.style.gap = "5mm";
            // We use stretch to ensure items in a row are consistent
            this.optionsContainer.style.alignItems = "stretch";
            while (this.optionsContainer.firstChild) {
                this.optionsContainer.removeChild(this.optionsContainer.firstChild);
            }
            for (const [name, option] of this.values) {
                const optionLabel = document.createElement("label");
                optionLabel.style.flex = "1 1 50mm";
                optionLabel.style.boxSizing = "border-box"; // Ensures padding doesn't add to width
                if (this._makeiconsSmall) {
                    optionLabel.style.height = "22mm";
                    optionLabel.style.minWidth = "22mm";
                    optionLabel.style.flex = "0 0 22mm"; // Fixed size for small mode
                }
                else {
                    optionLabel.style.height = "35mm";
                    optionLabel.style.minWidth = "50mm"; // Minimum width as requested
                }
                optionLabel.style.backgroundColor = "#2a2a2a";
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "optionsGroup";
                if (name === this._value) {
                    radio.checked = true;
                    optionLabel.classList.add("selected");
                }
                radio.addEventListener("change", () => {
                    const allLabels = this.optionsContainer.querySelectorAll('input[type="radio"]');
                    allLabels.forEach(input => input.parentElement.classList.remove("selected"));
                    optionLabel.classList.add("selected");
                    this._value = name;
                    if (this.onElementSelected) {
                        this.onElementSelected(name);
                    }
                });
                optionLabel.style.display = "flex";
                optionLabel.style.alignItems = "center";
                optionLabel.style.flexDirection = "column";
                optionLabel.style.justifyContent = "center";
                optionLabel.style.borderRadius = "11mm";
                optionLabel.onmouseenter = (e => {
                    if (!optionLabel.classList.contains("hover")) {
                        optionLabel.classList.add("hover");
                    }
                });
                optionLabel.onmouseleave = (e => {
                    if (optionLabel.classList.contains("hover")) {
                        optionLabel.classList.remove("hover");
                    }
                });
                if (option.icon !== undefined) {
                    const img = document.createElement("img");
                    img.crossOrigin = "anonymous";
                    img.src = option.icon;
                    img.alt = option.text ?? ""; // fallback alt
                    if (this._makeiconsSmall) {
                        img.className = "hand-menu-button-icon";
                    }
                    //If not defined icon size is 14x14mms
                    img.style.width = "14mm";
                    img.style.height = "14mm";
                    optionLabel.appendChild(img);
                }
                if (option.text !== undefined) {
                    const textSpan = document.createElement("h3");
                    textSpan.style.textAlign = "center";
                    if (option.icon) {
                        textSpan.style.lineHeight = "normal";
                    }
                    textSpan.textContent = option.text;
                    optionLabel.appendChild(textSpan);
                }
                if (optionLabel.childNodes.length === 0) {
                    console.warn("No text and no icons were given to ", name);
                }
                optionLabel.appendChild(radio);
                this.optionsContainer.appendChild(optionLabel);
            }
        }
        getHTMLElement() {
            return this.optionsContainer;
        }
    }
    exports.Radio = Radio;
    class Toggle {
        constructor(name, value) {
            this.listItem = document.createElement("div");
            this._value = value;
            const label = document.createElement("label");
            label.classList.add("toggle-container");
            const nameDisplay = document.createElement("h3");
            nameDisplay.innerText = name;
            this._checkbox = document.createElement("input");
            this._checkbox.type = "checkbox";
            this._checkbox.checked = this._value;
            this._checkbox.addEventListener("change", () => {
                this._value = this._checkbox.checked;
                // FORCE an attribute change to wake up the MutationObserver
                // This is a "hacky" but effective way to trigger the observer
                this._checkbox.setAttribute("data-checked", this._value.toString());
                if (this.onValueChange) {
                    this.onValueChange(this._value);
                }
            });
            const slider = document.createElement("span");
            slider.classList.add("toggle-slider");
            slider.onmouseenter = (e => {
                if (!slider.classList.contains("hover")) {
                    slider.classList.add("hover");
                }
            });
            slider.onmouseleave = (e => {
                if (slider.classList.contains("hover")) {
                    slider.classList.remove("hover");
                }
            });
            const knob = document.createElement("span");
            knob.classList.add("toggle-knob");
            slider.appendChild(knob);
            label.appendChild(nameDisplay);
            label.appendChild(this._checkbox);
            label.appendChild(slider);
            this.listItem.appendChild(label);
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
            this._checkbox.checked = val;
            if (this.onValueChange) {
                this.onValueChange(this._value);
            }
        }
        getHTMLElement() {
            return this.listItem;
        }
    }
    exports.Toggle = Toggle;
    class Label {
        constructor(display, size) {
            this.listItem = document.createElement("div");
            this._value = display;
            this._size = size;
            this._elements = {};
            this.listItem.style.height = "22mm";
            this.listItem.style.display = "flex";
            this.listItem.style.alignItems = "center";
            this.listItem.style.justifyContent = "center";
            this.listItem.style.minWidth = "22mm";
            this.listItem.style.borderRadius = "11mm";
            this.updateDisplay(display);
        }
        updateDisplay(display) {
            if (display.icon !== undefined) {
                const img = this._elements.icon || document.createElement("img");
                img.crossOrigin = "anonymous";
                img.src = display.icon;
                img.alt = display.text ?? ""; // fallback alt
                img.style.width = "14mm"; // adjust to match font-size
                img.style.height = "14mm";
                if (this._elements.icon === undefined) {
                    this.listItem.appendChild(img);
                }
                this._elements.icon = img;
            }
            else if (this._elements.icon) {
                this._elements.icon.remove();
            }
            if (display.text !== undefined) {
                const text = this._elements.text || document.createElement("h" + String(this._size));
                if (display.icon) {
                    text.style.lineHeight = "normal";
                }
                text.textContent = display.text;
                if (this._elements.text === undefined) {
                    this.listItem.appendChild(text);
                }
                this._elements.text = text;
            }
            else if (this._elements.text) {
                this._elements.text.remove();
            }
            this.listItem.style.backgroundColor = display.color || "";
            this.listItem.style.color = display.textColor || "";
            if (this.listItem.childNodes.length === 0) {
                console.warn("No text and no icons were given to the button");
            }
            this._value = display;
        }
        getHTMLElement() {
            return this.listItem;
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this.updateDisplay(val);
        }
    }
    exports.Label = Label;
    class Button {
        constructor(callback, display) {
            this.button = document.createElement("button");
            this._value = display;
            this._elements = {};
            this._callback = callback;
            this.button.onclick = () => callback();
            this.updateDisplay(display);
            this.button.onmouseenter = (e => {
                if (!this.button.classList.contains("hover")) {
                    this.button.classList.add("hover");
                }
            });
            this.button.onmouseleave = (e => {
                if (this.button.classList.contains("hover")) {
                    this.button.classList.remove("hover");
                }
            });
        }
        get callback() {
            return this._callback;
        }
        updateDisplay(display) {
            if (display.icon !== undefined) {
                const img = this._elements.icon || document.createElement("img");
                img.crossOrigin = "anonymous";
                img.src = display.icon;
                img.alt = display.text ?? ""; // fallback alt
                img.style.width = "14mm"; // adjust to match font-size
                img.style.height = "14mm";
                if (this._elements.icon === undefined) {
                    this.button.appendChild(img);
                }
                this._elements.icon = img;
            }
            else if (this._elements.icon) {
                this._elements.icon.remove();
            }
            if (display.text !== undefined) {
                const text = this._elements.text || document.createElement("h3");
                text.style.textAlign = "center";
                if (display.icon) {
                    text.style.lineHeight = "normal";
                }
                text.textContent = display.text;
                if (this._elements.text === undefined) {
                    this.button.appendChild(text);
                }
                this._elements.text = text;
            }
            else if (this._elements.text) {
                this._elements.text.remove();
            }
            if (this.button.childNodes.length === 0) {
                console.warn("No text and no icons were given to the button");
            }
            this._value = display;
        }
        getHTMLElement() {
            return this.button;
        }
        get value() {
            return this._value;
        }
        set value(display) {
            this.updateDisplay(display);
        }
    }
    exports.Button = Button;
    class HandMenuUIComponents {
        constructor() {
            this.UIPlacementChart = new Array;
        }
        insertAtRow(rowNumber, element) {
            const existing = this.UIPlacementChart.find(r => r.index === rowNumber);
            if (existing) {
                existing.elements.push(element);
            }
            else {
                // Insert new row
                this.UIPlacementChart.push({
                    index: rowNumber,
                    elements: [element]
                });
                // Keep rows sorted by index
                this.UIPlacementChart.sort((a, b) => a.index - b.index);
            }
        }
        getRow(row) {
            return this.UIPlacementChart[row];
        }
        listElements() {
            return this.UIPlacementChart
                //.sort((a, b) => a.index - b.index) // ensure sorted
                .map(row => row.elements);
        }
    }
    exports.HandMenuUIComponents = HandMenuUIComponents;
});
