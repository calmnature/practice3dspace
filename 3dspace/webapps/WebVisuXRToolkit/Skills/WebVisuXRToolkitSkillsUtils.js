define("DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositeMap = exports.InputAction = exports.AbstractHandedness = void 0;
    var AbstractHandedness;
    (function (AbstractHandedness) {
        AbstractHandedness[AbstractHandedness["None"] = 1] = "None";
        AbstractHandedness[AbstractHandedness["Primary"] = 2] = "Primary";
        AbstractHandedness[AbstractHandedness["Secondary"] = 3] = "Secondary";
    })(AbstractHandedness || (exports.AbstractHandedness = AbstractHandedness = {}));
    /**
     * If more InputAction are to add, they also need to be added to the
     * getAvailableInputs() command of the different input sources (controller, hand)
     */
    var InputAction;
    (function (InputAction) {
        InputAction[InputAction["ControllerPassive"] = 1] = "ControllerPassive";
        InputAction[InputAction["TouchScreenPassive"] = 2] = "TouchScreenPassive";
        InputAction[InputAction["HandPassive"] = 3] = "HandPassive";
        InputAction[InputAction["NetworkPassive"] = 4] = "NetworkPassive";
        InputAction[InputAction["MixedReality"] = 5] = "MixedReality";
        InputAction[InputAction["FullImmersive"] = 6] = "FullImmersive";
        InputAction[InputAction["GripPress"] = 7] = "GripPress";
        InputAction[InputAction["GripTouch"] = 8] = "GripTouch";
        InputAction[InputAction["TriggerPress"] = 9] = "TriggerPress";
        InputAction[InputAction["TriggerTouch"] = 10] = "TriggerTouch";
        InputAction[InputAction["FirstButtonPress"] = 11] = "FirstButtonPress";
        InputAction[InputAction["FirstButtonTouch"] = 12] = "FirstButtonTouch";
        InputAction[InputAction["SecondButtonPress"] = 13] = "SecondButtonPress";
        InputAction[InputAction["SecondButtonTouch"] = 14] = "SecondButtonTouch";
        InputAction[InputAction["JoystickPress"] = 15] = "JoystickPress";
        InputAction[InputAction["JoystickTouch"] = 16] = "JoystickTouch";
        InputAction[InputAction["IndexPinch"] = 17] = "IndexPinch";
        InputAction[InputAction["MiddlePinch"] = 18] = "MiddlePinch";
        InputAction[InputAction["Point"] = 19] = "Point";
        InputAction[InputAction["FlatHand"] = 20] = "FlatHand";
        InputAction[InputAction["GunHand"] = 21] = "GunHand";
        InputAction[InputAction["HandPalmUp"] = 22] = "HandPalmUp";
        InputAction[InputAction["HandAboutToPalmUp"] = 23] = "HandAboutToPalmUp";
        InputAction[InputAction["IndexAboutToPinch"] = 24] = "IndexAboutToPinch";
        InputAction[InputAction["MiddleAboutToPinch"] = 25] = "MiddleAboutToPinch";
        InputAction[InputAction["MousePassive"] = 26] = "MousePassive";
        InputAction[InputAction["MouseClick"] = 27] = "MouseClick";
    })(InputAction || (exports.InputAction = InputAction = {}));
    function hashEnumList(inputActionList) {
        const list = inputActionList.sort();
        const prime = 31; // Choose a prime number for hashing
        let hash = 0;
        for (const enumValue of list) {
            hash = (hash * prime) + enumValue;
        }
        return hash;
    }
    // This is a classic map, but it takes lists of elements as keys, and stores the values in multi-level maps according to the length of the keys
    class CompositeMap {
        constructor() {
            this._availableInputs = new Set();
            this._inUseInputs = new Map();
            this._multiInputsSkillEventMap = new Map(); // clasify each map of skillevents by length of InputAction list
        }
        // This function return all possible combinations of size combosize in an array
        getCombinations(arr, comboSize) {
            const result = [];
            function helper(start, currentCombo) {
                if (currentCombo.length === comboSize) {
                    result.push([...currentCombo]);
                    return;
                }
                for (let i = start; i < arr.length; i++) {
                    currentCombo.push(arr[i]);
                    helper(i + 1, currentCombo);
                    currentCombo.pop();
                }
            }
            helper(0, []);
            return result;
        }
        /*
            This function will look through a specific level of the multi-level map for corresponding skillEvents
        */
        getSkillEventFromInputsListLength(actions, indexMap) {
            const used_inputs = new Set();
            const skillEvents = [];
            const actionsList = Array.from(actions);
            const relevantInputSkillEventMap = this._multiInputsSkillEventMap.get(indexMap);
            if (relevantInputSkillEventMap) {
                const combinationList = this.getCombinations(actionsList, indexMap);
                for (const combination of combinationList) {
                    const hash = hashEnumList(combination);
                    const res = relevantInputSkillEventMap.get(hash);
                    if (res) {
                        for (const skillEvent of res) {
                            skillEvents.push(skillEvent);
                            for (const input of skillEvent.bindings) {
                                used_inputs.add(input);
                            }
                        }
                    }
                }
            }
            return { "used_inputs": used_inputs, "skillEvents": skillEvents };
        }
        /*
             This is a critical funtion
             Its role is from a set of actions and a indexMap corresponding to the length of the InputActions used,
             to return all skillEvents that have the bindings corresponding to it.
             It will look through all SkillEvents that have bindings length of size indexMap and recursively go down and keep in memory which inputs have been used.
             Eg: We have 3 SkilEvents : A with bindings [pinching, handpalmUp], B with [pinching] and C with [ClosedFist]
             If we call with actions [Passive, handpalmup, pinching] and 3, it returns A
             IF we call the same actions with 1, it returns B
             If we call with actions [Passive, HandPalmUp, pinching, ClosedFist] and 2, 3 or 4: it returns A and C
             If we call the same actions with 1, it returns B and C
         */
        get(inputActions) {
            const actions = Array.from(inputActions).sort();
            const len = actions.length;
            let skillEvents = [];
            const already_used_inputs = new Set();
            for (let indexMap = len; indexMap > 0; indexMap--) {
                const availableActions = new Set();
                for (const action of actions) {
                    if (!already_used_inputs.has(action)) {
                        availableActions.add(action);
                    }
                }
                const tmp = this.getSkillEventFromInputsListLength(availableActions, indexMap);
                for (const usedInput of tmp.used_inputs) {
                    already_used_inputs.add(usedInput);
                }
                skillEvents = skillEvents.concat(tmp.skillEvents);
            }
            return skillEvents;
        }
        /*
            Like function get above
            but returns every skillEvents that has the inputActions
        */
        getAll() {
            let skillEvents = new Set();
            for (const relevantInputSkillEventMap of this._multiInputsSkillEventMap.values()) {
                for (const tmp of relevantInputSkillEventMap.values()) {
                    skillEvents = new Set([...skillEvents, ...tmp]);
                }
            }
            return skillEvents;
        }
        delete(inputActions) {
            const actions = Array.from(inputActions);
            const relevantInputSkillEventMap = this._multiInputsSkillEventMap.get(actions.length);
            if (relevantInputSkillEventMap) {
                return relevantInputSkillEventMap.delete(hashEnumList(actions));
            }
            return false;
        }
        addSkillEvent(inputActions, skillEvent) {
            const actions = Array.from(inputActions);
            const len = actions.length;
            const hash = hashEnumList(actions);
            if (!this._multiInputsSkillEventMap.has(len)) {
                this._multiInputsSkillEventMap.set(len, new Map());
            }
            this._inUseInputs.set(inputActions, hash);
            const relevantInputSkillEventMap = this._multiInputsSkillEventMap.get(len);
            if (relevantInputSkillEventMap) {
                if (relevantInputSkillEventMap.has(hash)) {
                    relevantInputSkillEventMap.get(hash).add(skillEvent);
                }
                else {
                    relevantInputSkillEventMap.set(hash, new Set([skillEvent]));
                }
            }
        }
        keys() {
            return this._inUseInputs.keys();
        }
        registerActions(actions) {
            for (const action of actions) {
                this._availableInputs.add(action);
            }
        }
        deRegisterActions(input) {
            const unattributedSkillEvents = [];
            for (const action of input.getAvailableInputs()) {
                for (const [inputActions, skillEventsHash] of this._inUseInputs) {
                    for (const inputAction of inputActions) {
                        if (action === inputAction) {
                            const relevantInputSkillEventMap = this._multiInputsSkillEventMap.get(inputActions.size);
                            if (relevantInputSkillEventMap) {
                                const skillEvents = relevantInputSkillEventMap.get(skillEventsHash);
                                if (skillEvents) {
                                    for (const skillEvent of skillEvents) {
                                        skillEvent.onUnregisterInput(input);
                                        unattributedSkillEvents.push(skillEvent);
                                    }
                                    relevantInputSkillEventMap.delete(skillEventsHash);
                                    this._inUseInputs.delete(inputActions);
                                }
                            }
                        }
                    }
                }
                this._availableInputs.delete(action);
            }
            return unattributedSkillEvents;
        }
        AreActionsAvailable(actions) {
            for (const action of actions) {
                if (!this._availableInputs.has(action)) {
                    return false;
                }
            }
            return true;
        }
    }
    exports.CompositeMap = CompositeMap;
});
