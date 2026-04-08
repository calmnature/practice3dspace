/// <amd-module name="DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIHandMenu"/>
define("DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIHandMenu", ["require", "exports", "DS/WebVisuXRToolkitUINode/HTMLNode", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIWindowManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkitUINode/HTMLWindow", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/Visualization/Node3D"], function (require, exports, HTMLNode_1, WebVisuXRToolkitUIWindowManager_1, WebVisuXRToolkitManager_1, WebVisuXRToolkitConfigManager, THREE, HTMLWindow_1, WebappsUtils_1, WebVisuXRToolkitUIEventController_1, WebVisuXRToolkit_1, Node3D) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandMenu = void 0;
    const GAP_WINDOWS = 4;
    class HandMenuHeader extends HTMLNode_1.HTMLNode {
        get hand_menu_pinned() {
            return this._hand_menu_pinned;
        }
        constructor(domParent) {
            const styles = `.hand-menu-title {
            /* Auto layout */
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10mm;

            width: fit-content;

            background: #464646;
            border-radius: 8mm;

            /* Inside auto layout */
            flex: none;
            order: 0;
            align-self: stretch;
            flex-grow: 0;
        }
        /* Icon on the far left */
        .loaded-img {
            display: none;
        }

        /* Label container fills remaining space and centers content */
        .hand-menu-title label {
            flex: 1;
            text-align: left;
            color: #F5F5F5;
            font-size: 14mm
        }`;
            const styleElement = document.createElement("style");
            styleElement.appendChild(document.createTextNode(styles));
            domParent.appendChild(styleElement);
            const pinDiv = document.createElement("button");
            pinDiv.classList.add("hand-menu-button");
            pinDiv.style.display = "inline-block";
            const pinActive = document.createElement("img");
            pinActive.className = "loaded-img";
            pinActive.crossOrigin = 'anonymous';
            pinActive.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_active_colored.png");
            const pinPassive = document.createElement("img");
            pinPassive.className = "loaded-img";
            pinPassive.crossOrigin = 'anonymous';
            pinPassive.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_active.png");
            // Currently not used 
            const pinInactive = document.createElement("img");
            pinInactive.className = "loaded-img";
            pinInactive.crossOrigin = 'anonymous';
            pinInactive.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_inactive.png");
            const headerDiv = document.createElement("div");
            headerDiv.className = "hand-menu-title";
            pinDiv.appendChild(pinActive);
            pinDiv.appendChild(pinPassive);
            pinDiv.appendChild(pinInactive);
            headerDiv.appendChild(pinDiv);
            pinDiv.onmouseenter = (e => {
                if (!pinDiv.classList.contains("hover")) {
                    pinDiv.classList.add("hover");
                }
            });
            pinDiv.onmouseleave = (e => {
                if (pinDiv.classList.contains("hover")) {
                    pinDiv.classList.remove("hover");
                }
            });
            const pinIcon = document.createElement("img");
            pinIcon.crossOrigin = 'anonymous';
            pinIcon.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_active.png");
            pinIcon.classList.add("hand-menu-button-icon");
            pinDiv.onclick = (e => {
                if (this._hand_menu_pinned) {
                    pinIcon.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_active.png");
                    this._hand_menu_pinned = false;
                }
                else {
                    pinIcon.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_active_colored.png");
                    this._hand_menu_pinned = true;
                }
            });
            pinDiv.appendChild(pinIcon);
            domParent.appendChild(headerDiv);
            super(headerDiv, "HandMenuHeader", WebVisuXRToolkitConfigManager.instance.devMode.active, true);
            this._hand_menu_pinned = false;
            this.headerLabel = document.createElement("label");
            headerDiv.appendChild(this.headerLabel);
        }
        updateTitle(text, windowWidth, selectorWidth) {
            this.headerLabel.innerText = text;
            // 1. Calculate the total span: [Window] + [Gap] + [Selector]
            const totalWidth = windowWidth > 0
                ? windowWidth + GAP_WINDOWS + selectorWidth
                : selectorWidth;
            this._dom.style.width = totalWidth + "mm";
            // 2. Calculate translation to center the header over the combined width of components.
            const xTranslation = windowWidth > 0
                ? -(windowWidth + GAP_WINDOWS) * 0.5
                : 0;
            // Apply translation to the X axis
            this.setMatrix(new THREE.Matrix4().makeTranslation(xTranslation, 0, 0));
        }
    }
    class HandMenuSkillsSelectorBar extends HTMLWindow_1.HTMLWindow {
        constructor(domParent, handMenu, skillsWithHandMenu, systemSkillsWithHandMenu) {
            const htmlDiv = document.createElement("div");
            htmlDiv.style.width = "fit-content";
            domParent.appendChild(htmlDiv);
            const radio = new WebVisuXRToolkit_1.Radio(new Map(), null);
            radio._makeiconsSmall = true;
            const htmlel = radio.getHTMLElement();
            htmlel.style.flexDirection = "column";
            htmlDiv.appendChild(radio.getHTMLElement());
            super(domParent, "handMenuSelectorBar", WebVisuXRToolkitConfigManager.instance.devMode.active, htmlDiv);
            this._currently_shown_window = null;
            this._any_settings_to_display = false;
            this._radio = radio;
            this.displayHeader(false);
            radio.onElementSelected = (elem) => {
                if (elem) {
                    if (this._currently_shown_window === null || this._currently_shown_window.skillID !== elem) {
                        if (this._currently_shown_window) {
                            const { window: prevWindow } = this._currently_shown_window;
                            prevWindow.setVisibility(false);
                        }
                        const window = WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.getWindow(elem);
                        // Check to ensure 'window' actually exists
                        if (window) {
                            if (window.parents && window.parents.length > 0) {
                                window.parents[0].removeChild(window);
                            }
                            this.addChild(window);
                            window.displayHeader(false);
                            window.setVisibility(true);
                        }
                        else {
                            console.warn(`HandMenu: Window for element "${elem}" not found.`);
                            return;
                        }
                        let skill = skillsWithHandMenu.get(elem);
                        if (skill === undefined) {
                            skill = systemSkillsWithHandMenu.get(elem);
                        }
                        const currentWindow = { window, skillID: skill.name };
                        this._currently_shown_window = currentWindow;
                        handMenu.updateLayout(skill.displayedName);
                        window.onResize(() => {
                            if (this._currently_shown_window?.window == window) {
                                handMenu.updateLayout();
                            }
                        });
                    }
                }
                else {
                    if (this._currently_shown_window) {
                        this._currently_shown_window.window.setVisibility(false);
                        this._currently_shown_window = null;
                        handMenu.updateLayout();
                    }
                }
            };
            let first = true;
            for (const skill of systemSkillsWithHandMenu.values()) {
                if (first) {
                    first = false;
                    radio.value = skill.name;
                }
                radio.addValue(skill.name, { icon: skill.icon });
            }
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.on(WebVisuXRToolkitUIEventController_1.QMEvents.QMNewSkillSelected, (e) => {
                for (const selectedSkill of e.detail.selectedSkills) {
                    if (skillsWithHandMenu.has(selectedSkill)) {
                        if (radio.values.has(selectedSkill) === false) {
                            if (first) {
                                first = false;
                                radio.value = selectedSkill;
                            }
                            radio.addValue(selectedSkill, { icon: skillsWithHandMenu.get(selectedSkill).icon });
                        }
                    }
                }
                for (const skill of radio.values.keys()) {
                    // if its a system skill we continue
                    if (systemSkillsWithHandMenu.has(skill))
                        continue;
                    if (e.detail.selectedSkills.has(skill) === false) {
                        radio.removeValue(skill);
                    }
                }
                handMenu.updateLayout();
            }, 0); //Less priority than the handMenuSettingsBar Buttons so that this would be called later
        }
        anySettingsToDisplay() {
            return this._any_settings_to_display;
        }
        get currently_shown_window() {
            return this._currently_shown_window?.window;
        }
        reset_currently_shown_window() {
            for (const val of this._radio.values) {
                if (val[0] !== this._radio.value) {
                    this._radio.value = val[0];
                    return;
                }
            }
        }
    }
    class HandMenuSettingsBar extends HTMLNode_1.HTMLNode {
        constructor(domParent) {
            const styles = `
        .hand-menu {
            display: flex;
            justify-content: space-evenly;  
            flex-direction: column;
            align-items: center;
            background-color: #464646;
            width: fit-content;
            border-radius: 8mm; /* added for rounded corners */
        }
        `;
            const styleElement = document.createElement("style");
            styleElement.appendChild(document.createTextNode(styles));
            domParent.appendChild(styleElement);
            const tooltipIconOn = document.createElement("img");
            tooltipIconOn.className = "loaded-img";
            tooltipIconOn.crossOrigin = 'anonymous';
            tooltipIconOn.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/visibility_on.png");
            const tooltipIconOff = document.createElement("img");
            tooltipIconOff.className = "loaded-img";
            tooltipIconOff.crossOrigin = 'anonymous';
            tooltipIconOff.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/visibility_off.png");
            // Secondary Settings Bar
            const handMenuSettingsBar2 = document.createElement("div");
            handMenuSettingsBar2.className = "hand-menu";
            domParent.appendChild(handMenuSettingsBar2);
            const tooltipButton = document.createElement("button");
            tooltipButton.className = "hand-menu-button";
            const tooltipImg = document.createElement("img");
            tooltipImg.className = "hand-menu-button-icon";
            tooltipImg.crossOrigin = 'anonymous';
            const isDisplayTooltips = WebVisuXRToolkitConfigManager.instance.settings.get("DisplayControllerIndicatorsOnStart");
            tooltipImg.src = (isDisplayTooltips) ? (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", 'UI_icons/visibility_on.png') : (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", 'UI_icons/visibility_off.png');
            tooltipButton.appendChild(tooltipIconOn);
            tooltipButton.appendChild(tooltipIconOff);
            tooltipButton.appendChild(tooltipImg);
            tooltipButton.style.display = "inline-block";
            handMenuSettingsBar2.appendChild(tooltipButton);
            tooltipButton.onmouseenter = (e => {
                if (!tooltipButton.classList.contains("hover")) {
                    tooltipButton.classList.add("hover");
                }
            });
            tooltipButton.onmouseleave = (e => {
                if (tooltipButton.classList.contains("hover")) {
                    tooltipButton.classList.remove("hover");
                }
            });
            tooltipButton.onclick = (e => {
                WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.displayIndicators(!WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.isDisplayingIndicators());
                const isDisplayTooltips = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.isDisplayingIndicators();
                tooltipImg.src = isDisplayTooltips ? (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", 'UI_icons/visibility_on.png') : (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", 'UI_icons/visibility_off.png');
            });
            super(handMenuSettingsBar2, "handMenuSettingsBar", WebVisuXRToolkitConfigManager.instance.devMode.active, true);
        }
    }
    class HandMenu extends Node3D {
        get handMenuSkillsSelectorBar() {
            return this._handMenuSkillsSelectorBar;
        }
        constructor(domParent, skillsManager, intersectables) {
            const skills = skillsManager.listSkills();
            const handMenuStyles = `
        .hand-menu-button {
            background-color: #2a2a2a;
            border: none;
            border-radius: 11mm;
            width: 22mm;
            height: 22mm;
            display: none;
            margin: 5mm;
        }
        /* Hover state */
        .hand-menu-button.hover {
            background-color: #3e3e3e;
        }
       
        /* Activated state */
        .hand-menu-button.active {
            background-color: #00A0FF;
        }

        .hand-menu-button.active.hover {
            background-color: #00B4FF;
        }

        .hand-menu-button-icon{
            width: 100%;
            height 100%;
        }
        `;
            // Create a <style> element to hold the CSS
            const styleElement = document.createElement("style");
            styleElement.appendChild(document.createTextNode(handMenuStyles));
            domParent.appendChild(styleElement);
            // Header
            const header = new HandMenuHeader(domParent);
            const handMenuSettingsBar = new HandMenuSettingsBar(domParent);
            const skillsWithHandMenu = new Map();
            const systemSkillsWithHandMenu = new Map();
            const setupSkillWindow = (skill) => {
                const infos = WebVisuXRToolkitConfigManager.instance.getSkillInfos(skill.name);
                let hasSomethingToDisplay = false;
                if (infos && infos.UIComponents) {
                    const content = document.createElement("div");
                    content.id = "nameList";
                    const rows = infos.UIComponents.listElements();
                    for (const row of rows) {
                        if (row.length > 0) {
                            for (const el of row) {
                                const htmlEl = el.getHTMLElement();
                                content.appendChild(htmlEl);
                            }
                            hasSomethingToDisplay = true;
                        }
                    }
                    if (hasSomethingToDisplay) {
                        const dialogWindow = document.createElement("div");
                        dialogWindow.id = skill.name + "_DialogWindow";
                        dialogWindow.appendChild(content);
                        WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.createWindow(domParent, skill.name, skill.displayedName, intersectables, dialogWindow).setVisibility(false);
                    }
                }
                return hasSomethingToDisplay;
            };
            for (const skill of skills.skillList) {
                if (setupSkillWindow(skill)) {
                    skillsWithHandMenu.set(skill.name, skill);
                }
            }
            for (const skill of skills.systemsSkills) {
                if (setupSkillWindow(skill)) {
                    systemSkillsWithHandMenu.set(skill.name, skill);
                }
            }
            //super(headerDiv, "handMenu", true, true);
            super("handMenu");
            this._currentTitle = "";
            const handMenuSkillsSelectorBar = new HandMenuSkillsSelectorBar(domParent, this, skillsWithHandMenu, systemSkillsWithHandMenu);
            this.header = header;
            this.addChild(header);
            this._handMenuSkillsSelectorBar = handMenuSkillsSelectorBar;
            this.addChild(handMenuSkillsSelectorBar);
            this.handMenuSettingsBar = handMenuSettingsBar;
            this.addChild(handMenuSettingsBar);
            this.setVisibility(false);
            this.updateLayout();
            intersectables.push(header);
            intersectables.push(handMenuSkillsSelectorBar);
            intersectables.push(handMenuSettingsBar);
        }
        updateLayout(title) {
            // 1. Guard: If the selector bar isn't assigned yet, skip this cycle.
            // This happens during the constructor's initial radio value assignment.
            if (!this._handMenuSkillsSelectorBar) {
                if (title !== undefined)
                    this._currentTitle = title;
                return;
            }
            if (title !== undefined) {
                this._currentTitle = title;
            }
            this._handMenuSkillsSelectorBar.waitForTextureRefreshed().then(() => {
                const selectorWidth = this._handMenuSkillsSelectorBar.width;
                const selectorHeight = this._handMenuSkillsSelectorBar.height;
                const currentWindow = this._handMenuSkillsSelectorBar.currently_shown_window;
                // 2. Wrap the window-dependent logic in a promise that handles the null case
                const windowPromise = currentWindow
                    ? currentWindow.waitForTextureRefreshed()
                    : Promise.resolve();
                windowPromise.then(() => {
                    const windowWidth = currentWindow ? currentWindow.width : 0;
                    // Update Header
                    this.header.updateTitle(this._currentTitle, windowWidth, selectorWidth);
                    // Position Selector Bar
                    const selectorYOffset = -(selectorHeight + this.header.height) * 0.5 - GAP_WINDOWS;
                    this._handMenuSkillsSelectorBar.setMatrix(new THREE.Matrix4().translate(new THREE.Vector3(0, 0, selectorYOffset)));
                    // Position Settings Bar
                    const settingsYOffset = selectorYOffset - (selectorHeight + this.handMenuSettingsBar.height) * 0.5 - GAP_WINDOWS;
                    this.handMenuSettingsBar.setMatrix(new THREE.Matrix4().translate(new THREE.Vector3(0, 0, settingsYOffset)));
                    // Position active skill window
                    if (currentWindow) {
                        const windowWidthOffset = (selectorWidth + currentWindow.width) * -0.5 - GAP_WINDOWS;
                        const windowHeightOffset = (-selectorHeight + currentWindow.height) * -0.5;
                        currentWindow.setMatrix(new THREE.Matrix4().translate(new THREE.Vector3(windowWidthOffset, 0, windowHeightOffset)));
                    }
                });
            });
        }
        anySettingsToDisplay() {
            return this._handMenuSkillsSelectorBar.anySettingsToDisplay;
        }
        get currently_shown_window() {
            return this._handMenuSkillsSelectorBar.currently_shown_window;
        }
        reset_currently_shown_window() {
            this._handMenuSkillsSelectorBar.reset_currently_shown_window();
        }
        isHandMenuPinned() {
            return this.header.hand_menu_pinned;
        }
        dispose() {
            this.header.dispose();
            this.handMenuSettingsBar.dispose();
            this._handMenuSkillsSelectorBar.dispose();
        }
    }
    exports.HandMenu = HandMenu;
});
