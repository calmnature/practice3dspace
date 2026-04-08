/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitPicking"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitPicking", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/Selection/CSOManager", "DS/Selection/HSOManager", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "i18n!DS/WebVisuXRToolkit/assets/nls/WebVisuXRToolkitNativeSkills"], function (require, exports, THREE, CSOManager, HSOManager, SceneGraphFactoryStatic, WebVisuXRToolkit_1, NLS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandPicking = exports.ControllerPicking = exports.ControllerPickingLaser = exports.PickingUI = void 0;
    exports.PickingUI = new WebVisuXRToolkit_1.HandMenuUIComponents();
    exports.PickingUI.insertAtRow(0, new WebVisuXRToolkit_1.Container('start', "row", [new WebVisuXRToolkit_1.Label({ text: NLS.PickingMode }, 2)]));
    const pickingOptions = new Map();
    pickingOptions.set("mesh", { text: "mesh" });
    pickingOptions.set("prim", { text: "prim" });
    const pickingModeRadio = new WebVisuXRToolkit_1.Radio(pickingOptions, "mesh");
    exports.PickingUI.insertAtRow(1, new WebVisuXRToolkit_1.Container('default', "row", [pickingModeRadio]));
    const BASE_LASER_LENGTH = 1000;
    class ControllerPickingLaser {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerTouch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        createLaserCube(input) {
            const material = new THREE.MeshBasicMaterial({
                color: 0x88bdd5,
                force: true
            });
            const cubeRep = SceneGraphFactoryStatic.createCuboidNode({
                cornerPoint: new THREE.Vector3(0.0, 0.0, 0.0),
                firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
                secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
                thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
                material: material
            });
            cubeRep.name = "Picking laser";
            input.userData.laserNode = cubeRep;
            input.userData.laserNode.setVisibility(false);
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(input.userData.laserNode);
        }
        //private _highlightedPart: any | null = null;
        onActivate(input) {
            if (input.targetRayMatrix) {
                const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, pickingModeRadio.value);
                const target = input.targetRayMatrix.decompose();
                input.userData.laserNode.setMatrix(new THREE.Matrix4().compose(target[0], target[1], new THREE.Vector3(1, intersection.length > 0 ? intersection[0].distance : BASE_LASER_LENGTH, 1)));
            }
        }
        onActivateBegin(input, activatingAction) {
            input.userData.laserNode.setVisibility(true);
        }
        onActivateEnd(input, deActivatingAction) {
            input.userData.laserNode.setVisibility(false);
        }
        onUnregisterInput(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(input.userData.laserNode);
            input.userData.laserNode = null;
        }
        onRegisterInput(input) {
            this.createLaserCube(input);
        }
    }
    exports.ControllerPickingLaser = ControllerPickingLaser;
    class ControllerPicking {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
        }
        onActivateEnd(input, deActivatingAction) {
            if (input.userData.laserNode) {
                const granularity = pickingModeRadio.value;
                const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, granularity); //XR3DPicking(matrixWorldData[0], raycastForward, skillInfo?.settings?.getRadioValue(NLS.PickingMode) || "mesh")
                console.log("Picking", granularity, intersection);
                CSOManager.empty();
                HSOManager.empty();
                if (intersection.length > 0 && !!intersection[0].pathElement) {
                    const elem = { pathElement: intersection[0].pathElement };
                    if (!CSOManager.isIn(elem)) {
                        CSOManager.add(elem);
                    }
                    if (!HSOManager.isIn(elem)) {
                        HSOManager.add(elem);
                    }
                }
            }
        }
        onUnregisterInput(input) {
            if (input.handedness === WebVisuXRToolkit_1.InputHandedness.Right) {
                input.removeLabelIndicator("trigger/center");
            }
            else if (input.handedness === WebVisuXRToolkit_1.InputHandedness.Left) {
                input.removeLabelIndicator("trigger/center");
            }
        }
        onRegisterInput(input) {
            if (input.handedness === WebVisuXRToolkit_1.InputHandedness.Right) {
                input.addLabelIndicator(this._rightindicator, "trigger/center");
            }
            else if (input.handedness === WebVisuXRToolkit_1.InputHandedness.Left) {
                input.addLabelIndicator(this._leftindicator, "trigger/center");
            }
        }
        initialize() {
            this._rightindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.PickingLabel);
            this._leftindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.PickingLabel);
        }
    }
    exports.ControllerPicking = ControllerPicking;
    class HandPicking extends ControllerPickingLaser {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.IndexPinch]);
        }
        onActivateEnd(input, deActivatingAction) {
            super.onActivateEnd(input, deActivatingAction);
            if (input.userData.laserNode) {
                const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, pickingModeRadio.value); //XR3DPicking(matrixWorldData[0], raycastForward, skillInfo?.settings?.getRadioValue(NLS.PickingMode) || "mesh")
                CSOManager.empty();
                HSOManager.empty();
                if (intersection.length > 0 && !!intersection[0].pathElement) {
                    const elem = { pathElement: intersection[0].pathElement };
                    if (!CSOManager.isIn(elem)) {
                        CSOManager.add(elem);
                    }
                    if (!HSOManager.isIn(elem)) {
                        HSOManager.add(elem);
                    }
                }
            }
        }
    }
    exports.HandPicking = HandPicking;
});
