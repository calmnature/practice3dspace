/// <amd-module name="DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsManager"/>
define("DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsManager", ["require", "exports", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", "DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitUIInteraction", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSystemSkill", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitController", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitTouchscreen", "DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHandMenuInteraction", "DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitQuickMenuInteraction", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController", "DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitCollabSkill", "DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHand3DCursor", "DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHandCancel", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/Skills/SystemSkills/DebugTooltip"], function (require, exports, WebVisuXRToolkitInput_1, WebVisuXRToolkitUIInteraction_1, WebVisuXRToolkitSystemSkill_1, WebVisuXRToolkitSkillsUtils_1, WebVisuXRToolkitConfigManager, WebVisuXRToolkitController_1, WebVisuXRToolkitTouchscreen_1, WebVisuXRToolkitHandMenuInteraction_1, WebVisuXRToolkitQuickMenuInteraction_1, WebVisuXRToolkitUIEventController_1, WebVisuXRToolkitCollabSkill_1, WebVisuXRToolkitHand3DCursor_1, WebVisuXRToolkitHandCancel_1, WebappsUtils_1, DebugTooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitSkillsManager = void 0;
    var InputMode;
    (function (InputMode) {
        InputMode[InputMode["NONE"] = 0] = "NONE";
        InputMode[InputMode["PRIMARY_CONTROLLER"] = 1] = "PRIMARY_CONTROLLER";
        InputMode[InputMode["SECONDARY_CONTROLLER"] = 2] = "SECONDARY_CONTROLLER";
        InputMode[InputMode["PRIMARY_HAND"] = 4] = "PRIMARY_HAND";
        InputMode[InputMode["SECONDARY_HAND"] = 8] = "SECONDARY_HAND";
        InputMode[InputMode["PRIMARY_CONTROLLER_SECONDARY_HAND"] = 9] = "PRIMARY_CONTROLLER_SECONDARY_HAND";
        InputMode[InputMode["PRIMARY_HAND_SECONDARY_CONTROLLER"] = 6] = "PRIMARY_HAND_SECONDARY_CONTROLLER";
        InputMode[InputMode["FULL_CONTROLLER"] = 3] = "FULL_CONTROLLER";
        InputMode[InputMode["FULL_HAND"] = 12] = "FULL_HAND";
        // PRIMARY_PEN = 0b10000,
        // PRIMARY_PEN_SECONDARY_CONTROLLER = PRIMARY_PEN | SECONDARY_CONTROLLER,
        // PRIMARY_PEN_SECONDARY_HAND = PRIMARY_PEN | SECONDARY_HAND,
    })(InputMode || (InputMode = {}));
    ;
    const InputMode_Count = 0b01101; //? to update with new added InputMode !
    /**
     * The Skills Manager has the important of taking care of the life cycle of the different skills taking into account which controllers are available
     * It can activate or deactivate any skills according to which controller is currently connnected and what are its inputs
     */
    class WebVisuXRToolkitSkillsManager {
        constructor(skills, currentState) {
            this._loadedSkills = new Map();
            this._selectedSkills = new Map();
            this._systemSkillList = [];
            this._inputConfigurations = new Array(InputMode_Count);
            this._currentInputMode = InputMode.NONE;
            this._currentState = currentState;
            this._primaryHandedness = WebVisuXRToolkitConfigManager.instance.settings.get("IsRightHanded") ? WebVisuXRToolkitInput_1.InputHandedness.Right : WebVisuXRToolkitInput_1.InputHandedness.Left;
            this._selectedSkills.set(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, new Set());
            this._selectedSkills.set(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary, new Set());
            this._selectedSkills.set(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, new Set());
            if (skills) {
                for (const skill of skills) {
                    this.loadSkill(skill);
                }
            }
            const UIInteractionSkillEvents = new Array();
            UIInteractionSkillEvents.push(new WebVisuXRToolkitUIInteraction_1.ControllerUIInteraction());
            UIInteractionSkillEvents.push(new WebVisuXRToolkitUIInteraction_1.HandUIInteraction());
            UIInteractionSkillEvents.push(new WebVisuXRToolkitUIInteraction_1.ControllerUIInteractionLaser());
            UIInteractionSkillEvents.push(new WebVisuXRToolkitUIInteraction_1.HandUIInteractionLaser());
            if (WebVisuXRToolkitConfigManager.instance.settings.get("EnableQuickMenu")) {
                UIInteractionSkillEvents.push(new WebVisuXRToolkitQuickMenuInteraction_1.QuickMenuInteraction());
                UIInteractionSkillEvents.push(new WebVisuXRToolkitQuickMenuInteraction_1.HandQuickMenuInteraction());
            }
            if (WebVisuXRToolkitConfigManager.instance.settings.get("EnableFunctionMenu")) {
                UIInteractionSkillEvents.push(new WebVisuXRToolkitUIInteraction_1.ToggleFunctionMenuVisiblity());
                UIInteractionSkillEvents.push(new WebVisuXRToolkitUIInteraction_1.HandToggleFunctionMenuVisiblity());
            }
            if (WebVisuXRToolkitConfigManager.instance.settings.get("EnablePinchAndCancelIndicator")) {
                this._systemSkillList.push(new WebVisuXRToolkitSystemSkill_1.SystemSkill("Hand3DCursor", "Pinch Indicator", [new WebVisuXRToolkitHand3DCursor_1.Hand3DCursor()]));
                this._systemSkillList.push(new WebVisuXRToolkitSystemSkill_1.SystemSkill("HandCancel", "Cancel Indicator", [new WebVisuXRToolkitHandCancel_1.HandCancel()]));
            }
            if (WebVisuXRToolkitConfigManager.instance.devMode.options.get("debugTooltip")) {
                this.dev_SysSkillDebugSlider();
            }
            this._systemSkillList.push(new WebVisuXRToolkitSystemSkill_1.SystemSkill("UIInteraction", "UI Interaction", UIInteractionSkillEvents));
            if (WebVisuXRToolkitConfigManager.instance.settings.get("EnableHandMenu")) {
                const hand_menu_skillEvents = new Array(new WebVisuXRToolkitHandMenuInteraction_1.HandMenuActivation(), new WebVisuXRToolkitHandMenuInteraction_1.HandMenuActivationOnHand());
                if (WebVisuXRToolkitConfigManager.instance.settings.get("EnableHandMenuGrabbableWindows")) {
                    hand_menu_skillEvents.push(new WebVisuXRToolkitHandMenuInteraction_1.HandMenuGrabWindow(), new WebVisuXRToolkitHandMenuInteraction_1.HandMenuHoverWindow());
                }
                this._systemSkillList.push(new WebVisuXRToolkitSystemSkill_1.SystemSkill("Hand Menu", "Hand Menu", hand_menu_skillEvents));
            }
            const selectedSkills = new Set();
            for (const sk of this._systemSkillList) {
                selectedSkills.add(sk.name);
            }
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.emit(WebVisuXRToolkitUIEventController_1.QMEvents.QMNewSkillSelected, { selectedSkills });
            this._inputConfigurations[this._currentInputMode] = {
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]: new Set(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]: new Set(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]: new Set()
            }; // currentInputMode = InputMode.NONE
            for (const skill of WebVisuXRToolkitConfigManager.instance.settings.get("DefaultSkills")) {
                this._selectSkill(skill);
            }
            if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                this._systemSkillList.push(new WebVisuXRToolkitSystemSkill_1.SystemSkill("CollabSkill", "Collaboration", [new WebVisuXRToolkitCollabSkill_1.AvatarSync()], WebVisuXRToolkitCollabSkill_1.collabSkillInfo, (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/VXRT_SkillIcon_Collaboration.png")));
            }
        }
        dev_SysSkillDebugSlider() {
            if (DebugTooltip_1.DebugTooltip.isSet)
                return;
            DebugTooltip_1.DebugTooltip.JustAddYourSliderInThisFunction();
            const DebugSkillInfo = { UIComponents: DebugTooltip_1.DebugSliderUI };
            this._systemSkillList.push(new WebVisuXRToolkitSystemSkill_1.SystemSkill("DebugSlider", "DebugSlider", [new DebugTooltip_1.DebugSliderSkill()], DebugSkillInfo, (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_icon_pin_inactive.png")));
        }
        updateCurrentState(currentState) {
            this._currentState = currentState;
        }
        loadSkill(skill) {
            this._loadedSkills.set(skill.name, skill);
        }
        unLoadSkill(skillName) {
            this._loadedSkills.delete(skillName);
        }
        listSkills(inputs) {
            const selectableSkills = new Set();
            if (inputs) {
                for (const input of inputs) {
                    const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                        ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                        : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                    const availableInputs = input.getAvailableInputs();
                    const otherState = this._currentState === WebVisuXRToolkitSkillsUtils_1.InputAction.FullImmersive ? WebVisuXRToolkitSkillsUtils_1.InputAction.MixedReality : WebVisuXRToolkitSkillsUtils_1.InputAction.FullImmersive;
                    availableInputs.delete(otherState);
                    for (const skill of this._loadedSkills.values()) {
                        if (skill.isInputCompatibleWith(availableInputs, abstractHandedness)) {
                            selectableSkills.add(skill.name);
                        }
                    }
                }
            }
            return {
                "primary_handedness": this._selectedSkills.get(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary),
                "secondary_handedness": this._selectedSkills.get(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary),
                "no_handedness": this._selectedSkills.get(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None),
                "skillList": new Set(this._loadedSkills.values()),
                "skillNamesList": new Set(this._loadedSkills.keys()),
                "chosenSkillsName": new Set([...this._inputConfigurations[this._currentInputMode][1], ...this._inputConfigurations[this._currentInputMode][2], ...this._inputConfigurations[this._currentInputMode][3]]),
                "selectableSkills": selectableSkills,
                "systemsSkills": this._systemSkillList
            };
        }
        getPrimaryHandedness() {
            return this._primaryHandedness;
        }
        initializeAllSkillEvents() {
            for (const skill of this._loadedSkills.values()) {
                for (const skillEvent of skill.getSkillEvents()) {
                    if (skillEvent.initialize) {
                        skillEvent.initialize();
                    }
                }
            }
            for (const skill of this._systemSkillList) {
                for (const skillEvent of skill.getSkillEvents()) {
                    if (skillEvent.initialize) {
                        skillEvent.initialize();
                    }
                }
            }
        }
        frameUpdate(time, deltaTime) {
            const skills = new Set([...this._selectedSkills.get(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary), ...this._selectedSkills.get(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary), ...this._selectedSkills.get(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None)]);
            for (const skillName of skills) {
                const skillInfo = WebVisuXRToolkitConfigManager.instance.getSkillInfos(skillName);
                if (skillInfo && skillInfo.frameUpdateCallback) {
                    skillInfo.frameUpdateCallback(time, deltaTime);
                }
            }
            for (const skill of this._systemSkillList) {
                const skillInfo = WebVisuXRToolkitConfigManager.instance.getSkillInfos(skill.name);
                if (skillInfo && skillInfo.frameUpdateCallback) {
                    skillInfo.frameUpdateCallback(time, deltaTime);
                }
            }
        }
        selectSkillsPerHandedness(abstractHandedness, skills) {
            const relevantSelectedSkills = this._selectedSkills.get(abstractHandedness);
            if (!relevantSelectedSkills) {
                console.error("error here, can't get relevant selected skills");
                return;
            }
            relevantSelectedSkills.clear();
            for (const skillName of skills) {
                if (skillName === undefined || skillName === null || skillName === "") {
                    console.error("called selectSkill() with an empty or null string in the array");
                }
                else if (!this._loadedSkills.has(skillName)) {
                    let skillsNameList = "";
                    for (const [skillName, _] of this._loadedSkills) {
                        skillsNameList += skillName + ", ";
                    }
                    console.error("Cannot select the skill " + skillName + " because it is not in the list of available skills: [" + skillsNameList + "]");
                }
                else if (this._loadedSkills.get(skillName).hasSkillEventHandedness(abstractHandedness)) {
                    relevantSelectedSkills.add(skillName);
                }
            }
        }
        _clearSelectedSkills(inputs) {
            for (const handedness of [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]) {
                for (const skill of this._inputConfigurations[this._currentInputMode][handedness]) {
                    this._deSelectSkill(skill, handedness, inputs);
                }
            }
        }
        _selectSkill(skillName, inputs) {
            if (skillName === undefined || skillName === null || skillName == "") {
                console.error("called _selectSkill() with an undefined or null string");
                return;
            }
            const notCompatibleSkills = inputs ? this.computeNotCompatibleSkillsWhenSelectingNew(skillName, inputs) : [];
            //console.log("Selecting skill", skillName, notCompatibleSkills, inputs, this._currentInputMode)
            for (const notCompatible of notCompatibleSkills) {
                //console.log("UnSelecting skill because imcompatibility on", AbstractHandedness[notCompatible.handedness])
                this._deSelectSkill(notCompatible.skill.name, notCompatible.handedness, inputs);
            }
            if (inputs) {
                for (const input of inputs) {
                    const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                        ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                        : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                    this._inputConfigurations[this._currentInputMode][abstractHandedness].add(skillName);
                }
            }
            else {
                for (const handedness of [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]) {
                    this._inputConfigurations[this._currentInputMode][handedness].add(skillName);
                }
            }
            const selectedSkill = this._loadedSkills.get(skillName);
            if (selectedSkill) {
                if (inputs) {
                    for (const input of inputs) {
                        const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                            ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                            : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                        selectedSkill._registerAvailableActions(input.getAvailableInputs(), abstractHandedness, input);
                        for (const action of input.activatedActions) {
                            selectedSkill._onActionActivateBegin(abstractHandedness, input, input.activatedActions, action);
                        }
                    }
                }
            }
            for (const handedness of [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]) {
                this.selectSkillsPerHandedness(handedness, this._inputConfigurations[this._currentInputMode][handedness]);
            }
            const currently_selected_skills = this.listSkills();
            const selectedSkills = new Set([
                ...(currently_selected_skills.no_handedness ?? []),
                ...(currently_selected_skills.primary_handedness ?? []),
                ...(currently_selected_skills.secondary_handedness ?? [])
            ]);
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.emit(WebVisuXRToolkitUIEventController_1.QMEvents.QMNewSkillSelected, { selectedSkills });
        }
        _deSelectSkill(skillName, handedness, inputs, changingConfiguration = false) {
            //console.log("Deselecting", skillName, "on", AbstractHandedness[handedness])
            if (skillName === undefined || skillName === null || skillName == "") {
                console.error("called _deSelectSkill() with an undefined or null string");
                return;
            }
            if (changingConfiguration === false) {
                this._inputConfigurations[this._currentInputMode][handedness].delete(skillName);
                //console.log("Removing", skillName)
            }
            const deSelectedSkill = this._loadedSkills.get(skillName);
            if (deSelectedSkill) {
                if (inputs) {
                    for (const input of inputs) {
                        const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                            ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                            : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                        if (abstractHandedness === handedness) {
                            deSelectedSkill._deregisterAvailableActions(input, abstractHandedness);
                        }
                    }
                }
            }
            else {
                console.log("Deselected " + skillName + " that is non existing");
            }
            for (const handedness of [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]) {
                this.selectSkillsPerHandedness(handedness, this._inputConfigurations[this._currentInputMode][handedness]);
            }
            const currently_selected_skills = this.listSkills();
            const selectedSkills = new Set([
                ...(currently_selected_skills.no_handedness ?? []),
                ...(currently_selected_skills.primary_handedness ?? []),
                ...(currently_selected_skills.secondary_handedness ?? [])
            ]);
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.emit(WebVisuXRToolkitUIEventController_1.QMEvents.QMNewSkillSelected, { selectedSkills });
        }
        pruneSelectedSkills(inputs) {
            const skillsLostCompatibility = new Map();
            for (const input of inputs) {
                const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                    ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                    : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                // Safety check to ensure the set exists
                const selectedSkillsForHandedness = this._selectedSkills.get(abstractHandedness);
                if (!selectedSkillsForHandedness)
                    continue;
                for (const alreadySelectedSkillName of selectedSkillsForHandedness) {
                    const alreadySelectedSkill = this._loadedSkills.get(alreadySelectedSkillName);
                    // If the "priority" skill is still valid (not marked for removal)
                    if (alreadySelectedSkill && !skillsLostCompatibility.has(alreadySelectedSkillName)) {
                        for (const otherSkillName of selectedSkillsForHandedness) {
                            const otherSkill = this._loadedSkills.get(otherSkillName);
                            // Only check if we haven't already marked this other skill for removal (globally)
                            // Note: This logic means if a skill fails on Left hand, we might skip checking it on Right hand here. 
                            // If you want to be thorough across both hands, you might remove the `!skillsLostCompatibility.has` check.
                            if (otherSkill && !skillsLostCompatibility.has(otherSkillName)) {
                                if (otherSkillName !== alreadySelectedSkillName) {
                                    const res = alreadySelectedSkill._isCompatibleWith(otherSkill, { abstractHandedness: abstractHandedness, inputs_actions: input.getAvailableInputs() });
                                    for (const [conflictHandedness, _] of res) {
                                        console.log("removing", otherSkillName, "from", WebVisuXRToolkitSkillsUtils_1.AbstractHandedness[conflictHandedness], "because of", alreadySelectedSkillName);
                                        if (skillsLostCompatibility.has(otherSkillName)) {
                                            skillsLostCompatibility.get(otherSkillName)?.add(conflictHandedness);
                                        }
                                        else {
                                            skillsLostCompatibility.set(otherSkillName, new Set([conflictHandedness]));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (const [skillName, handednesses] of skillsLostCompatibility) {
                for (const handedness of handednesses) {
                    this._deSelectSkill(skillName, handedness, inputs);
                }
            }
            return skillsLostCompatibility;
        }
        computeNotCompatibleSkillsWhenSelectingNew(otherSkill, inputs) {
            const newSkill = this._loadedSkills.get(otherSkill);
            const skillsLostCompatibility = [];
            if (newSkill) {
                if (inputs) {
                    for (const input of inputs) {
                        const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                            ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                            : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                        const currentSkills = this._selectedSkills.get(abstractHandedness);
                        if (currentSkills) {
                            for (const alreadySelectedSkillName of currentSkills) {
                                const alreadySelectedSkill = this._loadedSkills.get(alreadySelectedSkillName);
                                if (otherSkill !== alreadySelectedSkillName && alreadySelectedSkill) {
                                    const res = alreadySelectedSkill._isCompatibleWith(newSkill, { abstractHandedness: abstractHandedness, inputs_actions: input.getAvailableInputs() });
                                    for (const [handedness, actions] of res) {
                                        const firstAction = actions.values().next().value;
                                        if (firstAction !== undefined) {
                                            skillsLostCompatibility.push({ skill: alreadySelectedSkill, handedness: handedness, action: firstAction });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (const handedness of [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]) {
                        for (const alreadySelectedSkillName of this._inputConfigurations[this._currentInputMode][handedness]) {
                            const alreadySelectedSkill = this._loadedSkills.get(alreadySelectedSkillName);
                            if (otherSkill !== alreadySelectedSkillName && alreadySelectedSkill) {
                                const res = alreadySelectedSkill._isCompatibleWith(newSkill);
                                for (const [handedness, actions] of res) {
                                    const firstAction = actions.values().next().value;
                                    if (firstAction !== undefined) {
                                        skillsLostCompatibility.push({ skill: alreadySelectedSkill, handedness: handedness, action: firstAction });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                console.error("you tried to add a non existant skill", otherSkill);
            }
            return skillsLostCompatibility;
        }
        updateInputConfiguration(oldInputs, currentInputs) {
            let newInputMode = InputMode.NONE;
            for (const input of currentInputs) {
                if (input instanceof WebVisuXRToolkitTouchscreen_1.WebVisuXRToolkitTouchscreen)
                    return true;
                if (input.handedness === WebVisuXRToolkitInput_1.InputHandedness.Left) {
                    if (input instanceof WebVisuXRToolkitController_1.WebVisuXRToolkitController) {
                        if (this._primaryHandedness == WebVisuXRToolkitInput_1.InputHandedness.Left)
                            newInputMode |= InputMode.PRIMARY_CONTROLLER;
                        else
                            newInputMode |= InputMode.SECONDARY_CONTROLLER;
                    }
                    else // === WebVisuXRTookitHand
                     {
                        if (this._primaryHandedness == WebVisuXRToolkitInput_1.InputHandedness.Left)
                            newInputMode |= InputMode.PRIMARY_HAND;
                        else
                            newInputMode |= InputMode.SECONDARY_HAND;
                    }
                    const handedness = this._primaryHandedness === WebVisuXRToolkitInput_1.InputHandedness.Left ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary;
                    for (const systemSkill of this._systemSkillList)
                        systemSkill._registerAvailableActions(input.getAvailableInputs(), handedness, input);
                }
                if (input.handedness === WebVisuXRToolkitInput_1.InputHandedness.Right) {
                    if (input instanceof WebVisuXRToolkitController_1.WebVisuXRToolkitController) {
                        if (this._primaryHandedness == WebVisuXRToolkitInput_1.InputHandedness.Right)
                            newInputMode |= InputMode.PRIMARY_CONTROLLER;
                        else
                            newInputMode |= InputMode.SECONDARY_CONTROLLER;
                    }
                    else // === WebVisuXRTookitHand
                     {
                        if (this._primaryHandedness == WebVisuXRToolkitInput_1.InputHandedness.Right)
                            newInputMode |= InputMode.PRIMARY_HAND;
                        else
                            newInputMode |= InputMode.SECONDARY_HAND;
                    }
                    const handedness = this._primaryHandedness === WebVisuXRToolkitInput_1.InputHandedness.Right ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary;
                    for (const systemSkill of this._systemSkillList)
                        systemSkill._registerAvailableActions(input.getAvailableInputs(), handedness, input);
                }
            }
            if (newInputMode === InputMode.NONE) {
                this._currentInputMode = newInputMode;
                return true;
            }
            if (newInputMode === this._currentInputMode)
                return false;
            if (this._inputConfigurations[newInputMode] === undefined) {
                this._inputConfigurations[newInputMode] = {
                    [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]: new Set(this._inputConfigurations[this._currentInputMode][WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]),
                    [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]: new Set(this._inputConfigurations[this._currentInputMode][WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]),
                    [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]: new Set(this._inputConfigurations[this._currentInputMode][WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]),
                };
                this._currentInputMode = newInputMode;
                return true;
            }
            for (const handedness of [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]) {
                const skills_in_configuration_out = this._inputConfigurations[this._currentInputMode][handedness];
                for (const skill of skills_in_configuration_out)
                    this._deSelectSkill(skill, handedness, oldInputs, true);
                this._currentInputMode = newInputMode;
                const skills_in_configuration_in = this._inputConfigurations[newInputMode][handedness];
                for (const skill of skills_in_configuration_in)
                    this._selectSkill(skill, currentInputs); // requires `this._currentInputMode = newInputMode` before
            }
            return false;
        }
        /** @internal */
        _declareAvailableActions(input) {
            const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
            for (const skillName of this._inputConfigurations[this._currentInputMode][abstractHandedness]) {
                const skill = this._loadedSkills.get(skillName);
                if (skill) {
                    skill._registerAvailableActions(input.getAvailableInputs(), abstractHandedness, input);
                }
                else {
                    console.error("error finding", skillName);
                }
            }
            for (const systemSkill of this._systemSkillList) {
                systemSkill._registerAvailableActions(input.getAvailableInputs(), abstractHandedness, input);
            }
        }
        /** @internal */
        _declareUnavailableActions(input) {
            const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
            for (const systemSkill of this._systemSkillList) {
                systemSkill._deregisterAvailableActions(input, abstractHandedness);
            }
            for (const [_, skill] of this._loadedSkills) {
                skill._deregisterAvailableActions(input, abstractHandedness);
            }
        }
        /*  * Function is called once per frame
            * First we update the activated actions with every input that has been deactivated or activated
            * Then we Start and End new SkillEvents
            * Then we handle all curently activated skills */
        /** @internal */
        _updateAction(input) {
            for (const startedAction of input.startedActions) {
                input.activatedActions.add(startedAction);
            }
            for (const endedAction of input.endedActions) {
                input.activatedActions.delete(endedAction);
            }
            this.flushStartedActions(input);
            const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
            const tmpSystemSkillUsedInputs = new Set();
            for (const systemSkill of this._systemSkillList) {
                const tmp = systemSkill._onActionActivate(abstractHandedness, input, input.activatedActions);
                for (const action of tmp.values()) {
                    tmpSystemSkillUsedInputs.add(action);
                }
            }
            const selectedSkills = this._selectedSkills.get(abstractHandedness);
            if (!selectedSkills) {
                console.error("Selected skills handedness failure");
                return;
            }
            for (const tmp of tmpSystemSkillUsedInputs) {
                if (!input.previoustmpSystemSkillUsedInputs.has(tmp)) {
                    // on stop
                    for (const selectedSkill of selectedSkills) {
                        for (const tempUsedInput of tmpSystemSkillUsedInputs) {
                            this._loadedSkills.get(selectedSkill)._onActionPause(abstractHandedness, input, tmpSystemSkillUsedInputs, tempUsedInput);
                        }
                    }
                }
            }
            for (const previous of input.previoustmpSystemSkillUsedInputs) {
                if (!tmpSystemSkillUsedInputs.has(previous)) {
                    // on restarting
                    for (const selectedSkill of selectedSkills) {
                        const intersect = new Set([...input.activatedActions].filter(i => input.previoustmpSystemSkillUsedInputs.has(i)));
                        this._loadedSkills.get(selectedSkill)._onActionResume(abstractHandedness, input, intersect, previous);
                    }
                }
            }
            input.previoustmpSystemSkillUsedInputs = tmpSystemSkillUsedInputs;
            const actions = new Set();
            for (const action of input.activatedActions) {
                if (!tmpSystemSkillUsedInputs.has(action) && !input.systemSkillUsedInputs.has(action)) {
                    actions.add(action);
                }
            }
            for (const selectedSkill of selectedSkills) {
                this._loadedSkills.get(selectedSkill)._onActionActivate(abstractHandedness, input, actions);
            }
            this.flushEndedActions(input);
        }
        flushStartedActions(input) {
            const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
            const selectedSkills = this._selectedSkills.get(abstractHandedness);
            if (!selectedSkills) {
                console.error("Selected skills handedness failure");
                return;
            }
            for (const startedAction of input.startedActions) {
                for (const systemSkill of this._systemSkillList) {
                    const tmp = systemSkill._onActionActivateBegin(abstractHandedness, input, input.activatedActions, startedAction);
                    for (const action of tmp.values()) {
                        input.systemSkillUsedInputs.add(action);
                    }
                }
                const actions = new Set();
                for (const action of input.activatedActions) {
                    if (!input.systemSkillUsedInputs.has(action)) {
                        actions.add(action);
                    }
                }
                for (const selectedSkill of selectedSkills) {
                    this._loadedSkills.get(selectedSkill)._onActionActivateBegin(abstractHandedness, input, actions, startedAction);
                    if (input.previoustmpSystemSkillUsedInputs.has(startedAction)) // Special case where user click the button the start an action, but the system skill is still using the binding and we need to wait for it to finish
                     {
                        this._loadedSkills.get(selectedSkill)._onActionPause(abstractHandedness, input, actions, startedAction);
                    }
                }
            }
            input.startedActions.clear();
        }
        flushEndedActions(input) {
            const abstractHandedness = input.handedness === WebVisuXRToolkitInput_1.InputHandedness.None
                ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None
                : (this._primaryHandedness === input.handedness ? WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary : WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
            const selectedSkills = this._selectedSkills.get(abstractHandedness);
            if (!selectedSkills) {
                console.error("Selected skills handedness failure");
                return;
            }
            for (const endedAction of input.endedActions) {
                const actions = new Set([...input.activatedActions, ...input.endedActions]); // Here it is important to add the endedAction in order to retrieve the currently active skills event as the action has been removed from the activatedActions set.
                const systemSkillUsedInputs = new Set();
                for (const systemSkill of this._systemSkillList) {
                    const tmp = systemSkill._onActionActivateEnd(abstractHandedness, input, actions, endedAction);
                    for (const action of tmp.values()) {
                        systemSkillUsedInputs.add(action);
                    }
                }
                for (const usedAction of systemSkillUsedInputs) {
                    actions.delete(usedAction);
                }
                for (const selectedSkill of selectedSkills) {
                    this._loadedSkills.get(selectedSkill)._onActionActivateEnd(abstractHandedness, input, actions, endedAction);
                }
                for (const usedInput of systemSkillUsedInputs) {
                    input.systemSkillUsedInputs.delete(usedInput);
                }
            }
            input.endedActions.clear();
        }
    }
    exports.WebVisuXRToolkitSkillsManager = WebVisuXRToolkitSkillsManager;
});
