/// <amd-module name="DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHand3DCursor"/>
define("DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHand3DCursor", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuGLTF/GLTFLoader", "DS/WebappsUtils/WebappsUtils"], function (require, exports, THREE, WebVisuXRToolkit_1, GLTFLoader, WebappsUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hand3DCursor = void 0;
    class Hand3DCursor {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.IndexAboutToPinch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivate(input) {
            if (this._cursorAnimation && input.targetRayMatrix) {
                this._cursorModel?.setMatrix(input.targetRayMatrix.translate(new THREE.Vector3(0, 20, 0)));
                const animation_value = 1 - input.IndexThumbDistance;
                this._cursorAnimation.updateNormalized(animation_value);
            }
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            this._cursorModel?.setVisibility(true);
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            this._cursorModel?.setVisibility(false);
            return new Set();
        }
        onRegisterInput(input) {
            if (!this._cursorModel)
                return;
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(this._cursorModel);
            if (input.targetRayMatrix)
                this._cursorModel.setMatrix(input.targetRayMatrix);
        }
        onUnregisterInput(input) {
            if (!this._cursorModel)
                return;
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(this._cursorModel);
        }
        initialize() {
            const loader = new GLTFLoader();
            const cursorPath = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/pinch_click.glb");
            loader.load(cursorPath).then((model) => {
                model.exludeFromBounding(true);
                this._cursorModel = model;
                if (model.getAnimations)
                    this._cursorAnimation = model.getAnimations()[0];
                else
                    console.warn("WebVisuXRToolkitHand.ts: No cursor animation found");
            });
        }
    }
    exports.Hand3DCursor = Hand3DCursor;
});
