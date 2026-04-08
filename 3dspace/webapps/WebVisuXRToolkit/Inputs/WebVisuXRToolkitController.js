/// <amd-module name="DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitController"/>
define("DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitController", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuGLTF/GLTFLoader", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers"], function (require, exports, THREE, WebVisuXRToolkitInput_1, WebappsUtils_1, GLTFLoader, WebVisuXRToolkitSkillsUtils_1, WebVisuXRToolkitHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitController = exports.OculusStandartInputs = void 0;
    function matrixCorrections(mat) {
        mat.rotateX(Math.PI * -0.5);
    }
    var OculusStandartInputs;
    (function (OculusStandartInputs) {
        OculusStandartInputs[OculusStandartInputs["trigger"] = 0] = "trigger";
        OculusStandartInputs[OculusStandartInputs["grip"] = 1] = "grip";
        OculusStandartInputs[OculusStandartInputs["touchscreen_click"] = 2] = "touchscreen_click";
        OculusStandartInputs[OculusStandartInputs["Joystick"] = 3] = "Joystick";
        OculusStandartInputs[OculusStandartInputs["AXButton"] = 4] = "AXButton";
        OculusStandartInputs[OculusStandartInputs["BYButton"] = 5] = "BYButton";
        OculusStandartInputs[OculusStandartInputs["unknown2"] = 6] = "unknown2";
    })(OculusStandartInputs || (exports.OculusStandartInputs = OculusStandartInputs = {}));
    // here for example, AXButton and Joystick don't exist
    var OtherStandartInputs;
    (function (OtherStandartInputs) {
        OtherStandartInputs[OtherStandartInputs["grip"] = 4] = "grip";
        OtherStandartInputs[OtherStandartInputs["trigger"] = 2] = "trigger";
        OtherStandartInputs[OtherStandartInputs["BYButton"] = 3] = "BYButton";
        OtherStandartInputs[OtherStandartInputs["AXButton"] = -1] = "AXButton";
        OtherStandartInputs[OtherStandartInputs["Joystick"] = -1] = "Joystick";
        OtherStandartInputs[OtherStandartInputs["touchscreen_click"] = 0] = "touchscreen_click";
        OtherStandartInputs[OtherStandartInputs["unknown2"] = 1] = "unknown2";
    })(OtherStandartInputs || (OtherStandartInputs = {}));
    const tmp_vec3 = new THREE.Vector3();
    const tmp_quat = new THREE.Quaternion();
    const tmp_mat4 = new THREE.Matrix4();
    const vec3_unit = new THREE.Vector3(1, 1, 1);
    class WebVisuXRToolkitController extends WebVisuXRToolkitInput_1.WebVisuXRToolkit3DInput {
        constructor(mesh_id, XRInputSource, inputType, isMixedRealityActive, isDisplayingIndicators) {
            super(mesh_id, XRInputSource, isMixedRealityActive, isDisplayingIndicators, false);
            this._joystickAxes = [];
            this._animationClips = new Map();
            this._inputStatus = new Map();
            this._modelTargetRayMatrix = new THREE.Matrix4();
            this._modelTargetRayMatrixSet = false;
            this._right_controller_models = new Map([
                ["meta-quest-touch-plus", "models/controller_MetaQuestTouchPlus_Right.gltf"],
                ["oculus-touch-v3", "models/controller_MetaQuest2_right.gltf"],
                ["htc-vive-focus-3", "models/controller_HTCFocus3_Right.gltf"],
                ["htc-vive", "models/controller_HTCViveWand.gltf"],
                ["generic-trigger-squeeze-thumbstick", "models/controller_MetaQuestTouchPlus_Right.gltf"]
            ]);
            this._left_controller_models = new Map([
                ["meta-quest-touch-plus", "models/controller_MetaQuestTouchPlus_Left.gltf"],
                ["oculus-touch-v3", "models/controller_MetaQuest2_left.gltf"],
                ["htc-vive-focus-3", "models/controller_HTCFocus3_Left.gltf"],
                ["htc-vive", "models/controller_HTCViveWand.gltf"],
                ["generic-trigger-squeeze-thumbstick", "models/controller_MetaQuestTouchPlus_Left.gltf"]
            ]);
            this._type = inputType;
            const loader = new GLTFLoader();
            let i = 0;
            for (; i < XRInputSource.profiles.length; i++) {
                if (this._handedness === WebVisuXRToolkitInput_1.InputHandedness.Left ? this._left_controller_models.has(XRInputSource.profiles[i]) : this._right_controller_models.has(XRInputSource.profiles[i])) {
                    break;
                }
            }
            const path = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", this._handedness === WebVisuXRToolkitInput_1.InputHandedness.Left ? this._left_controller_models.get(XRInputSource.profiles[i]) : this._right_controller_models.get(XRInputSource.profiles[i]));
            this.gamepad = XRInputSource.gamepad;
            loader.load(path).then((model) => {
                if (model.getAnimations) {
                    for (const anim of model.getAnimations()) {
                        this._animationClips.set(anim.name, anim);
                    }
                }
                this._model.addChild(model);
                this._hasModelLoaded = true;
                //? if it has tip pose available, use for targetRayMatrix
                const tip = model.getChildByName("indicator_pose/tip");
                if (tip) {
                    (0, WebVisuXRToolkitHelpers_1.getNodeWorldTransform)(tip, model, this._modelTargetRayMatrix);
                    matrixCorrections(this._modelTargetRayMatrix);
                    this._modelTargetRayMatrixSet = true;
                }
            }).catch(e => {
                console.error("Couldn't identify controller", XRInputSource.profiles, path);
                const metaquestpluspath = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", this._handedness === WebVisuXRToolkitInput_1.InputHandedness.Left ? this._left_controller_models.get("meta-quest-touch-plus") : this._right_controller_models.get("meta-quest-touch-plus"));
                loader.load(metaquestpluspath).then((model) => {
                    this._model.addChild(model);
                    this._hasModelLoaded = true;
                    //? if it has tip pose available, use for targetRayMatrix
                    const tip = model.getChildByName("indicator_pose/tip");
                    if (tip) {
                        (0, WebVisuXRToolkitHelpers_1.getNodeWorldTransform)(tip, model, this._modelTargetRayMatrix);
                        matrixCorrections(this._modelTargetRayMatrix);
                        this._modelTargetRayMatrixSet = true;
                    }
                });
            });
        }
        _connect() {
            this.startedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.ControllerPassive);
        }
        _disconnect() {
            this.endedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.ControllerPassive);
        }
        getAvailableInputs() {
            const inputsToRegister = new Set([WebVisuXRToolkitSkillsUtils_1.InputAction.ControllerPassive, WebVisuXRToolkitSkillsUtils_1.InputAction.FullImmersive, WebVisuXRToolkitSkillsUtils_1.InputAction.MixedReality, WebVisuXRToolkitSkillsUtils_1.InputAction.NetworkPassive]);
            if (this.gamepad) {
                const buttons = this.gamepad.buttons;
                Object.assign(this._joystickAxes, this.gamepad.axes);
                if (this._type.grip !== -1 && buttons[this._type.grip]) {
                    if ("pressed" in buttons[this._type.grip]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.GripPress);
                    }
                    if ("touched" in buttons[this._type.grip]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.GripTouch);
                    }
                }
                if (this._type.trigger !== -1 && buttons[this._type.trigger]) {
                    if ("pressed" in buttons[this._type.trigger]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.TriggerPress);
                    }
                    if ("touched" in buttons[this._type.trigger]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.TriggerTouch);
                    }
                }
                if (this._type.AXButton !== -1 && buttons[this._type.AXButton]) {
                    if ("pressed" in buttons[this._type.AXButton]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.FirstButtonPress);
                    }
                    if ("touched" in buttons[this._type.AXButton]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.FirstButtonTouch);
                    }
                }
                if (this._type.BYButton !== -1 && buttons[this._type.BYButton]) {
                    if ("pressed" in buttons[this._type.BYButton]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.SecondButtonPress);
                    }
                    if ("touched" in buttons[this._type.BYButton]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.SecondButtonTouch);
                    }
                }
                if (this._type.Joystick !== -1 && buttons[this._type.Joystick]) {
                    if ("pressed" in buttons[this._type.Joystick]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.JoystickPress);
                    }
                    if ("touched" in buttons[this._type.Joystick]) {
                        inputsToRegister.add(WebVisuXRToolkitSkillsUtils_1.InputAction.JoystickTouch);
                    }
                }
            }
            return inputsToRegister;
        }
        get joystickAxes() {
            return this._joystickAxes;
        }
        /** @internal */
        _update(frame, referenceSpace, XRInputSource, XRNodeMatrix) {
            if (this._modelTargetRayMatrixSet) {
                this._model.getMatrix().multiply(this._modelTargetRayMatrix).decompose(tmp_vec3, tmp_quat, undefined);
                this._targetRayMatrix = tmp_mat4.compose(tmp_vec3, tmp_quat, vec3_unit);
                this._targetRayWorldMatrix = XRNodeMatrix.clone().multiply(this._targetRayMatrix);
            }
            else
                this.setDefaultTargetRayMatrix(frame, referenceSpace, XRInputSource, XRNodeMatrix);
            this.gamepad = XRInputSource.gamepad;
            if (XRInputSource.gamepad) {
                const buttons = XRInputSource.gamepad.buttons;
                this._joystickAxes = Object.assign([], XRInputSource.gamepad.axes);
                let clip = this._animationClips.get("input/thumbstick/y");
                if (clip) {
                    clip.updateNormalized(-this._joystickAxes[3] * 0.5 + 0.5);
                    //clip.update(clip.startTime + (-this._joystickAxes[3] * 0.5 + 0.5) * (clip.endTime - clip.startTime))
                }
                clip = this._animationClips.get("input/thumbstick/x");
                if (clip) {
                    clip.updateNormalized(this._joystickAxes[2] * 0.5 + 0.5);
                    //clip.update(clip.startTime + (this._joystickAxes[2] * 0.5 + 0.5) * (clip.endTime - clip.startTime))
                }
                if (this._type.grip !== -1 && buttons[this._type.grip]) {
                    const clip = this._animationClips.get("input/squeeze/value");
                    if (clip) {
                        clip.updateNormalized(buttons[this._type.grip].value * 0.5 + 0.5);
                        //clip.update(clip.startTime + (buttons[this._type.grip].value * 0.5 + 0.5) * (clip.endTime - clip.startTime))
                    }
                    this._handleInputAction(buttons[this._type.grip], WebVisuXRToolkitSkillsUtils_1.InputAction.GripPress, WebVisuXRToolkitSkillsUtils_1.InputAction.GripTouch);
                }
                if (this._type.trigger !== -1 && buttons[this._type.trigger]) {
                    const clip = this._animationClips.get("input/trigger/value");
                    if (clip) {
                        clip.updateNormalized(buttons[this._type.trigger].value * 0.5 + 0.5);
                        //clip.update(clip.startTime + (buttons[this._type.trigger].value * 0.5 + 0.5) * (clip.endTime - clip.startTime))
                    }
                    this._handleInputAction(buttons[this._type.trigger], WebVisuXRToolkitSkillsUtils_1.InputAction.TriggerPress, WebVisuXRToolkitSkillsUtils_1.InputAction.TriggerTouch);
                }
                if (this._type.AXButton !== -1 && buttons[this._type.AXButton]) {
                    const clip = this._animationClips.get("input/lower_button/click");
                    if (clip) {
                        clip.updateNormalized(buttons[this._type.AXButton].value * 0.5 + 0.5);
                        //clip.update(clip.startTime + (buttons[this._type.AXButton].value * 0.5 + 0.5) * (clip.endTime - clip.startTime))
                    }
                    this._handleInputAction(buttons[this._type.AXButton], WebVisuXRToolkitSkillsUtils_1.InputAction.FirstButtonPress, WebVisuXRToolkitSkillsUtils_1.InputAction.FirstButtonTouch);
                }
                if (this._type.BYButton !== -1 && buttons[this._type.BYButton]) {
                    const clip = this._animationClips.get("input/upper_button/click");
                    if (clip) {
                        clip.updateNormalized(buttons[this._type.BYButton].value * 0.5 + 0.5);
                        //clip.update(clip.startTime + (buttons[this._type.BYButton].value * 0.5 + 0.5) * (clip.endTime - clip.startTime))
                    }
                    this._handleInputAction(buttons[this._type.BYButton], WebVisuXRToolkitSkillsUtils_1.InputAction.SecondButtonPress, WebVisuXRToolkitSkillsUtils_1.InputAction.SecondButtonTouch);
                }
                if (this._type.Joystick !== -1 && buttons[this._type.Joystick]) {
                    this._handleInputAction(buttons[this._type.Joystick], WebVisuXRToolkitSkillsUtils_1.InputAction.JoystickPress, WebVisuXRToolkitSkillsUtils_1.InputAction.JoystickTouch);
                }
            }
        }
        _handleInputAction(button, inputActionPress, inputActionTouch) {
            if (button.pressed) {
                if (!this._inputStatus.get(inputActionPress)) {
                    this.startedActions.add(inputActionPress);
                }
                this._inputStatus.set(inputActionPress, true);
            }
            else {
                if (this._inputStatus.get(inputActionPress)) {
                    this.endedActions.add(inputActionPress);
                }
                this._inputStatus.set(inputActionPress, false);
            }
            if (button.touched) {
                if (!this._inputStatus.get(inputActionTouch)) {
                    this.startedActions.add(inputActionTouch);
                }
                this._inputStatus.set(inputActionTouch, true);
            }
            else {
                if (this._inputStatus.get(inputActionTouch)) {
                    this.endedActions.add(inputActionTouch);
                }
                this._inputStatus.set(inputActionTouch, false);
            }
        }
    }
    exports.WebVisuXRToolkitController = WebVisuXRToolkitController;
});
