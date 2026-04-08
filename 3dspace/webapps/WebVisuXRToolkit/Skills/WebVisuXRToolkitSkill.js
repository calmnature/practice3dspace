define("DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkill", ["require", "exports", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils"], function (require, exports, WebVisuXRToolkitConfigManager, WebVisuXRToolkitSkillsUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Skill = void 0;
    /**
     * The Skill class holds a list of SkillEvents
     */
    class Skill {
        constructor(id, icon_src, SkillEventList, skillInfo) {
            this._display_name = skillInfo?.displayed_name || id;
            this._id_name = id;
            this._icon_src = icon_src;
            this._skillEventList = SkillEventList;
            WebVisuXRToolkitConfigManager.instance.setSkillInfos(id, skillInfo);
            this._tutorialSteps = skillInfo?.tutorialSteps || [];
            const PrimarySkillEventList = [];
            const SecondarySkillEventList = [];
            const NoHandednessSkillEventList = [];
            this._inputActionHandedness = {
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]: new Set(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]: new Set(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]: new Set()
            };
            for (const skillEvent of SkillEventList) {
                if (skillEvent.desiredHandedness.size === 0) {
                    NoHandednessSkillEventList.push(skillEvent);
                    for (const binding of skillEvent.bindings) {
                        this._inputActionHandedness[WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None].add(binding);
                    }
                }
                else {
                    for (const desiredHandedness of skillEvent.desiredHandedness) {
                        switch (desiredHandedness) {
                            case WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary:
                                PrimarySkillEventList.push(skillEvent);
                                for (const binding of skillEvent.bindings) {
                                    this._inputActionHandedness[WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary].add(binding);
                                }
                                break;
                            case WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary:
                                SecondarySkillEventList.push(skillEvent);
                                for (const binding of skillEvent.bindings) {
                                    this._inputActionHandedness[WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary].add(binding);
                                }
                                break;
                            case WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None:
                                NoHandednessSkillEventList.push(skillEvent);
                                for (const binding of skillEvent.bindings) {
                                    this._inputActionHandedness[WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None].add(binding);
                                }
                                break;
                        }
                    }
                }
            }
            this._unattributedSkillEvents = {
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]: PrimarySkillEventList,
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]: SecondarySkillEventList,
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]: NoHandednessSkillEventList
            };
            this._inputHandednessToSkillEventMap = {
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]: new WebVisuXRToolkitSkillsUtils_1.CompositeMap(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]: new WebVisuXRToolkitSkillsUtils_1.CompositeMap(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]: new WebVisuXRToolkitSkillsUtils_1.CompositeMap()
            };
            this._activeSkillEventMap = {
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary]: new WebVisuXRToolkitSkillsUtils_1.CompositeMap(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]: new WebVisuXRToolkitSkillsUtils_1.CompositeMap(),
                [WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None]: new WebVisuXRToolkitSkillsUtils_1.CompositeMap()
            };
        }
        getTutorialSteps() {
            return this._tutorialSteps;
        }
        getSkillEvents() {
            return this._skillEventList;
        }
        hasSkillEventHandedness(handedness) {
            const res = this._inputActionHandedness[handedness].size > 0;
            return res;
        }
        get icon() {
            return this._icon_src;
        }
        get displayedName() {
            return this._display_name;
        }
        get name() {
            return this._id_name;
        }
        isInputCompatibleWith(actions, handedness) {
            for (const skillEvent of this._skillEventList) {
                let compa = false;
                for (const binding of skillEvent.bindings) {
                    if (actions.has(binding) && skillEvent.desiredHandedness.has(handedness)) {
                        compa = true;
                    }
                    else {
                        compa = false;
                        break;
                    }
                }
                if (compa) {
                    return compa;
                }
            }
            return this._skillEventList.length === 0;
        }
        /** @internal */
        _isCompatibleWith(other, inputData) {
            const handednessesToTest = new Set();
            const incompatibility = new Map();
            if (inputData !== undefined) {
                handednessesToTest.add(inputData.abstractHandedness);
                if (other.isInputCompatibleWith(inputData.inputs_actions, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary)) {
                    handednessesToTest.add(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary);
                }
                if (other.isInputCompatibleWith(inputData.inputs_actions, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary)) {
                    handednessesToTest.add(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
                }
            }
            else {
                handednessesToTest.add(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.None);
                handednessesToTest.add(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary);
                handednessesToTest.add(WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary);
            }
            for (const abstractHandedness of handednessesToTest) {
                const actions = this._inputActionHandedness[abstractHandedness];
                const otherActions = other._inputActionHandedness[abstractHandedness];
                if (actions && otherActions) {
                    const input_specific_actions = inputData ? new Set([...inputData.inputs_actions].filter(i => actions.has(i))) : actions;
                    const other_input_specific_actions = inputData ? new Set([...inputData.inputs_actions].filter(i => otherActions.has(i))) : otherActions;
                    for (const AInputAction of input_specific_actions) {
                        if (other_input_specific_actions.has(AInputAction)) {
                            console.log(this.name, other.name, "not compatible because of", WebVisuXRToolkitSkillsUtils_1.InputAction[AInputAction], "on", WebVisuXRToolkitSkillsUtils_1.AbstractHandedness[abstractHandedness]);
                            if (incompatibility.has(abstractHandedness)) {
                                incompatibility.get(abstractHandedness)?.add(AInputAction);
                            }
                            else {
                                incompatibility.set(abstractHandedness, new Set([AInputAction]));
                            }
                        }
                    }
                }
            }
            return incompatibility;
        }
        /** @internal */
        _onActionActivate(abstractHandedness, input, actions) {
            const skillEvents = this._activeSkillEventMap[abstractHandedness].get(actions);
            for (const skillEvent of skillEvents) {
                skillEvent.onActivate(input);
            }
        }
        /** @internal */
        _onActionActivateBegin(abstractHandedness, input, actions, startedAction) {
            const relevantHandedness = this._inputHandednessToSkillEventMap[abstractHandedness];
            const skillEvents = relevantHandedness.get(actions);
            for (const skillEvent of skillEvents) {
                const currently_active_skillEvents = this._activeSkillEventMap[abstractHandedness].get(skillEvent.bindings);
                for (const currently_active of currently_active_skillEvents) // Check if the new input combination cancels a previous skillEvent that used only part of the inputs
                 {
                    if (skillEvent.bindings.size > currently_active.bindings.size) {
                        for (const skillEventInput of currently_active.bindings) {
                            if (skillEventInput != startedAction) {
                                currently_active.onActivateEnd(input, startedAction);
                                this._activeSkillEventMap[abstractHandedness].delete(skillEvent.bindings);
                                break;
                            }
                        }
                    }
                }
                for (const skillEventInput of skillEvent.bindings) {
                    if (skillEventInput === startedAction) {
                        skillEvent.onActivateBegin(input, startedAction);
                        this._activeSkillEventMap[abstractHandedness].addSkillEvent(skillEvent.bindings, skillEvent);
                        break;
                    }
                }
            }
        }
        /** @internal */
        _onActionActivateEnd(abstractHandedness, input, actions, terminatedAction) {
            const skillEvents = this._activeSkillEventMap[abstractHandedness].get(actions);
            for (const skillEvent of skillEvents) {
                for (const skillEventInput of skillEvent.bindings) {
                    if (skillEventInput === terminatedAction) {
                        skillEvent.onActivateEnd(input, terminatedAction);
                        // Remove skillEvent from the list of currently activated skillevents after onActivatedEnd called
                        this._activeSkillEventMap[abstractHandedness].delete(skillEvent.bindings);
                        break;
                    }
                }
            }
            for (const skillEvent of input.pausedSkillEvents) {
                for (const skillEventInput of skillEvent.bindings) {
                    if (skillEventInput === terminatedAction) {
                        skillEvent.onActivateEnd(input, terminatedAction);
                        input.pausedSkillEvents.delete(skillEvent);
                        break;
                    }
                }
            }
        }
        /** @internal */
        _onActionPause(abstractHandedness, input, actions, terminatedAction) {
            //const skillEvents = this._activeSkillEventMap[abstractHandedness].get(actions)
            const skillEvents = this._activeSkillEventMap[abstractHandedness].getAll();
            for (const skillEvent of skillEvents) {
                for (const skillEventInput of skillEvent.bindings) {
                    if (skillEventInput === terminatedAction) {
                        skillEvent.onActivateEnd(input, terminatedAction);
                        // Remove skillEvent from the list of curretrnyl activated skillevents after onActivatedEnd called
                        this._activeSkillEventMap[abstractHandedness].delete(skillEvent.bindings);
                        input.pausedSkillEvents.add(skillEvent);
                        break;
                    }
                }
            }
        }
        /** @internal */
        _onActionResume(abstractHandedness, input, actions, startedAction) {
            const skillEvents = this._inputHandednessToSkillEventMap[abstractHandedness].getAll();
            for (const skillEvent of skillEvents) {
                for (const skillEventInput of skillEvent.bindings) {
                    if (skillEventInput === startedAction) {
                        if (input.pausedSkillEvents.has(skillEvent)) {
                            skillEvent.onActivateBegin(input, startedAction);
                            this._activeSkillEventMap[abstractHandedness].addSkillEvent(skillEvent.bindings, skillEvent);
                            input.pausedSkillEvents.delete(skillEvent);
                        }
                        break;
                    }
                }
            }
        }
        /** @internal */
        _registerAvailableActions(inputActions, abstractHandedness, input) {
            this._inputHandednessToSkillEventMap[abstractHandedness].registerActions(inputActions);
            const unassigned = [];
            for (const skillEvent of this._unattributedSkillEvents[abstractHandedness]) {
                if (this._inputHandednessToSkillEventMap[abstractHandedness].AreActionsAvailable(skillEvent.bindings)) {
                    this._inputHandednessToSkillEventMap[abstractHandedness].addSkillEvent(skillEvent.bindings, skillEvent);
                    skillEvent.onRegisterInput(input);
                }
                else {
                    //console.warn("Cannot Select SkillEvent because asked bindings are not available", skillEvent, input)
                    unassigned.push(skillEvent);
                }
            }
            this._unattributedSkillEvents[abstractHandedness] = unassigned;
        }
        /** @internal */
        _deregisterAvailableActions(input, handedness) {
            const a = this._inputHandednessToSkillEventMap[handedness].deRegisterActions(input);
            const b = this._unattributedSkillEvents[handedness].concat(a);
            this._unattributedSkillEvents[handedness] = b;
        }
    }
    exports.Skill = Skill;
});
