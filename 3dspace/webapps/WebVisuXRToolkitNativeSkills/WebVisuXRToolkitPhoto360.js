/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitPhoto360"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitPhoto360", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/WebVisuXRToolkit"], function (require, exports, THREE, WebVisuXRToolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Teleport360HighLight = exports.Teleport360Hand = exports.Teleport360 = void 0;
    class Teleport360 {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
        }
        onActivateEnd(input, deActivatingAction) {
            const matrixData = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().decompose();
            const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(matrixData[1]);
            (0, WebVisuXRToolkit_1.getViewer)()._viewer360Manager._navigateToRevealedMarkerToCameraCenter(new THREE.Ray(matrixData[0], raycastForward));
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
        }
    }
    exports.Teleport360 = Teleport360;
    class Teleport360Hand extends Teleport360 {
        constructor() {
            super();
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.IndexPinch]);
        }
    }
    exports.Teleport360Hand = Teleport360Hand;
    class Teleport360HighLight {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FullImmersive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivate(input) {
            const matrixData = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().decompose();
            const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(matrixData[1]);
            (0, WebVisuXRToolkit_1.getViewer)()._viewer360Manager._revealNearestMarkerToCameraCenter(new THREE.Ray(matrixData[0], raycastForward));
        }
        onActivateBegin(input, activatingAction) {
            (0, WebVisuXRToolkit_1.getViewer)()._viewer360Manager.runningOp.dontHide = true;
        }
        onActivateEnd(input, deActivatingAction) {
            console.log("OFF"); // NOT CALLED
            (0, WebVisuXRToolkit_1.getViewer)()._viewer360Manager.runningOp.dontHide = undefined;
        }
        onUnregisterInput(input) {
            console.log("OFF"); // CALLED
            (0, WebVisuXRToolkit_1.getViewer)()._viewer360Manager.runningOp.dontHide = undefined;
        }
        onRegisterInput(input) {
        }
    }
    exports.Teleport360HighLight = Teleport360HighLight;
});
