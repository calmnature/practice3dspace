/// <amd-module name="DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHandCancel"/>
define("DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHandCancel", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/Visualization/Node3D", "DS/WebVisuGLTF/GLTFLoader", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager"], function (require, exports, THREE, WebVisuXRToolkit_1, Node3D, GLTFLoader, WebappsUtils_1, WebVisuXRToolkitConfigManager) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandCancel = void 0;
    const CANCEL_ICON_OFFSET_AVP = new THREE.Vector3(-28, -12, 86);
    const CANCEL_ICON_OFFSET = new THREE.Vector3(65, 0, 73);
    const precomputedMatrix_avp = new THREE.Matrix4();
    const precomputedMatrix = new THREE.Matrix4();
    const tmp_matrix4 = new THREE.Matrix4();
    const tmp_vec3 = new THREE.Vector3();
    function precomputeMatrix() {
        precomputedMatrix_avp.makeTranslation(CANCEL_ICON_OFFSET_AVP.x, CANCEL_ICON_OFFSET_AVP.y, CANCEL_ICON_OFFSET_AVP.z);
        precomputedMatrix.makeTranslation(CANCEL_ICON_OFFSET.x, CANCEL_ICON_OFFSET.y, CANCEL_ICON_OFFSET.z);
        tmp_vec3.set(10, 10, 10);
        precomputedMatrix_avp.scale(tmp_vec3);
        precomputedMatrix.scale(tmp_vec3);
        tmp_matrix4.makeRotationX(Math.PI * 0.5);
        precomputedMatrix_avp.multiply(tmp_matrix4);
        precomputedMatrix.multiply(tmp_matrix4);
        precomputedMatrix_avp.multiply(tmp_matrix4.makeRotationY(Math.PI * 0.9));
    }
    class HandCancel {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.HandAboutToPalmUp]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this._cancelModel = new Node3D();
        }
        onActivate(input) {
            if (!this._cancelAnimation || !input.targetRayMatrix)
                return new Set();
            if (WebVisuXRToolkitConfigManager.instance.settings.get("AVProDetected"))
                this._cancelModel?.setMatrix(input.targetRayMatrix.multiply(precomputedMatrix_avp));
            else {
                tmp_vec3.getPositionFromMatrix(input.targetRayMatrix);
                const mat = (0, WebVisuXRToolkit_1.getHeadMatrix)();
                tmp_matrix4.extractRotation(mat);
                mat.setPosition(tmp_vec3).multiply(tmp_matrix4).multiply(precomputedMatrix);
                this._cancelModel?.setMatrix(mat);
            }
            const animation_value = 1 - input.PalmDownScore;
            this._cancelAnimation.updateNormalized(animation_value);
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            this._cancelModel?.setVisibility(true);
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            this._cancelModel.setVisibility(false);
            return new Set();
        }
        onRegisterInput(input) {
            this._cancelModel.setVisibility(false);
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(this._cancelModel);
            if (input.targetRayMatrix)
                this._cancelModel.setMatrix(input.targetRayMatrix.rotateZ(Math.PI));
        }
        onUnregisterInput(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(this._cancelModel);
        }
        initialize() {
            const loader = new GLTFLoader();
            const cursorPath = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/VXRT_Indicator_Cancel_v2.glb");
            loader.load(cursorPath).then((model) => {
                model.exludeFromBounding(true);
                this._cancelModel.addChild(model);
                if (model.getAnimations)
                    this._cancelAnimation = model.getAnimations()[0];
                else
                    console.warn("WebVisuXRToolkitHandCancel.ts: No cancel animation found");
            });
            precomputeMatrix();
        }
    }
    exports.HandCancel = HandCancel;
});
