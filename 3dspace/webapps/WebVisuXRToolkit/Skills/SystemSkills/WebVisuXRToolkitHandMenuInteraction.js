/// <amd-module name="DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHandMenuInteraction"/>
define("DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitHandMenuInteraction", ["require", "exports", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/Visualization/ThreeJS_DS", "DS/Visualization/Node3D", "DS/WebVisuGLTF/GLTFLoader", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers"], function (require, exports, WebVisuXRToolkitManager_1, THREE, Node3D, GLTFLoader, WebappsUtils_1, WebVisuXRToolkit_1, WebVisuXRToolkitHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandMenuActivationOnHand = exports.HandMenuGrabWindow = exports.HandMenuHoverWindow = exports.HandMenuActivation = void 0;
    let precomputedMatrix_controller;
    let precomputedMatrix_hand;
    class HandMenuActivation {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.ControllerPassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        openMenu() {
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.setVisibility(true);
        }
        closeMenu() {
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.setVisibility(false);
        }
        onActivate(input) {
            const controller_right_vector = new THREE.Vector3(1, 0, 0).applyQuaternion(input.getMatrix().decompose()[1]);
            controller_right_vector.z = 0;
            const controller_to_head_vector = input.getMatrix().decompose()[0].sub((0, WebVisuXRToolkit_1.getHeadMatrix)().decompose()[0]);
            controller_to_head_vector.z = 0;
            const dotProduct = -controller_right_vector.normalize().dot(controller_to_head_vector.normalize());
            const pinned = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.isHandMenuPinned();
            // Only update visibility if needed
            if (!WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.isVisible()) {
                if ((dotProduct > 0.6 || pinned))
                    this.openMenu();
            }
            else {
                if (dotProduct < 0.3 && !pinned)
                    this.closeMenu();
            }
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            return new Set();
        }
        onRegisterInput(input) {
            input.model.addChild(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu);
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.setMatrix(precomputedMatrix_controller);
        }
        onUnregisterInput(input) {
            input.model.removeChild(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu);
        }
        precomputeMatrix() {
            // precomputedMatrix_controller.multiply(new THREE.Matrix4().rotateY(-Math.PI * 0.5).rotateX(-Math.PI * 0.5).rotateZ(-Math.PI / 5).translate(new THREE.Vector3(-30, 30, 45)));
            // // here for translate (palm facing face): positive x is left, y is depth (y > 0 is closer to face), z is height (upper is higher)
            // precomputedMatrix_hand.multiply(new THREE.Matrix4().rotateZ(Math.PI * -0.7).rotateX(Math.PI * 0.3).translate(new THREE.Vector3(-50, 0, 150)));
            precomputedMatrix_controller = new THREE.Matrix4().rotateY(-Math.PI * 0.5).rotateX(-Math.PI * 0.5).rotateZ(-Math.PI / 5).translate(new THREE.Vector3(-30, 30, 45));
        }
        initialize() {
            this.precomputeMatrix();
        }
    }
    exports.HandMenuActivation = HandMenuActivation;
    function checkCollision(boxMin, boxMax, boxCenter, sphereCenter, sphereRadius) {
        // Convert box to world coordinates
        const worldBoxMin = boxMin.clone().add(boxCenter);
        const worldBoxMax = boxMax.clone().add(boxCenter);
        // Find the closest point on the AABB to the sphere center
        const closestPoint = new THREE.Vector3(Math.max(worldBoxMin.x, Math.min(sphereCenter.x, worldBoxMax.x)), Math.max(worldBoxMin.y, Math.min(sphereCenter.y, worldBoxMax.y)), Math.max(worldBoxMin.z, Math.min(sphereCenter.z, worldBoxMax.z)));
        // Check if the squared distance is less than the squared radius
        return closestPoint.distanceToSquared(sphereCenter) < sphereRadius * sphereRadius;
    }
    class HandMenuHoverWindow {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.ControllerPassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this._currently_hovered_window = null;
        }
        onActivate(input) {
            const window = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.currently_shown_window;
            if (window) {
                //window.waitForTextureRefreshed().then(() =>
                //{
                const window_boundingBox = window.getBoundingBox();
                window_boundingBox.min.z = 0;
                window_boundingBox.max.z = 1;
                if (this._inputBoundingSphereWithoutTooltips && checkCollision(window_boundingBox.min, window_boundingBox.max, window.getMatrixWorld().decompose()[0], input.getMatrixWorld().decompose()[0], this._inputBoundingSphereWithoutTooltips.radius)) {
                    if (this._currently_hovered_window === null) {
                        this._currently_hovered_window = window;
                        const winDec = window.getMatrix().decompose();
                        window.setMatrix(new THREE.Matrix4().compose(winDec[0], winDec[1], new THREE.Vector3(1.25, 1.25, 1.25)));
                    }
                }
                else if (this._currently_hovered_window) {
                    const winDec = this._currently_hovered_window.getMatrix().decompose();
                    this._currently_hovered_window.setMatrix(new THREE.Matrix4().compose(winDec[0], winDec[1], new THREE.Vector3(1, 1, 1)));
                    this._currently_hovered_window = null;
                }
                //})
            }
            else {
                this._currently_hovered_window = null;
            }
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            return new Set();
        }
        async onRegisterInput(input) {
            while (input.hasModelLoaded() === false) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            if (input.isDisplayingIndicators()) {
                input.displayIndicators(false);
                this._inputBoundingSphereWithoutTooltips = input.model.getBoundingSphere();
                input.displayIndicators(true);
            }
            else {
                this._inputBoundingSphereWithoutTooltips = input.model.getBoundingSphere();
            }
        }
        onUnregisterInput(input) {
        }
    }
    exports.HandMenuHoverWindow = HandMenuHoverWindow;
    class HandMenuGrabWindow {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.GripPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this._currently_grabbed_window = null;
            this._selectedObjectOffsetMatrix = new THREE.Matrix4();
        }
        getInputCenterRotationMatrix(input) {
            return input.getMatrixWorld();
        }
        onActivate(input) {
            if (this._currently_grabbed_window) {
                const inputWorldMatrix = this.getInputCenterRotationMatrix(input);
                const updated_matrix = inputWorldMatrix.multiply(this._selectedObjectOffsetMatrix);
                this._currently_grabbed_window.setMatrix(updated_matrix);
                return new Set([WebVisuXRToolkit_1.InputAction.GripPress]);
            }
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            const window = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.currently_shown_window;
            if (window && window.isEffectivelyVisible(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.XRObjects)) {
                const window_boundingBox = window.getBoundingBox();
                window_boundingBox.min.z = 1;
                window_boundingBox.max.z = 1;
                if (checkCollision(window_boundingBox.min, window_boundingBox.max, window.getMatrixWorld().decompose()[0], input.getMatrixWorld().decompose()[0], input.model.getBoundingSphere().radius)) {
                    this._currently_grabbed_window = window;
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.reset_currently_shown_window();
                    window.displayHeader(true);
                    window.setVisibility(true);
                    const window_world_matrix = window.getMatrixWorld();
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.handMenuSkillsSelectorBar.removeChild(this._currently_grabbed_window);
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.UIManagerNode.addChild(this._currently_grabbed_window);
                    const matInWorldSpaceDec = new THREE.Matrix4().multiplyMatrices(new THREE.Matrix4().getInverse(input.getMatrixWorld()), window_world_matrix).decompose();
                    this._selectedObjectOffsetMatrix = new THREE.Matrix4().compose(matInWorldSpaceDec[0], matInWorldSpaceDec[1], new THREE.Vector3(2, 2, 2));
                    return new Set([WebVisuXRToolkit_1.InputAction.GripPress]);
                }
            }
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            if (this._currently_grabbed_window) {
                this._currently_grabbed_window = null;
                return new Set([WebVisuXRToolkit_1.InputAction.GripPress]);
            }
            return new Set();
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
        }
    }
    exports.HandMenuGrabWindow = HandMenuGrabWindow;
    //? The classes above are for the Controller, the ones below are for Hand inputs, a renaming refactor round could be nice for convention continuity sake
    var IsInView;
    (function (IsInView) {
        IsInView[IsInView["Outside"] = 0] = "Outside";
        IsInView[IsInView["Crossing"] = 1] = "Crossing";
        IsInView[IsInView["Inside"] = 2] = "Inside";
    })(IsInView || (IsInView = {}));
    class HandMenuActivationOnHand extends HandMenuActivation {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.HandPassive]);
            this._isInViewState = IsInView.Crossing;
            this.indicator = new Node3D();
        }
        indicatorProgression(dotProduct, off, on, override) {
            const progression = override ? override : (0, WebVisuXRToolkitHelpers_1.map_numeric)(dotProduct, off, on, 0, 1);
            this.indicatorAnimation?.updateNormalized(progression);
            if (progression >= 1)
                this.indicator.setVisibility(false);
        }
        closeMenu() {
            super.closeMenu();
            this.indicatorAnimation?.updateNormalized(0);
            this.indicator.setVisibility(true);
        }
        updateIsInViewState(dotProduct) {
            if (dotProduct > 0.8) {
                if (this._isInViewState === IsInView.Crossing) {
                    this.indicator.setVisibility(true);
                    this._isInViewState = IsInView.Inside;
                }
                else if (this._isInViewState === IsInView.Outside)
                    this._isInViewState = IsInView.Crossing;
            }
            else {
                if (this._isInViewState === IsInView.Crossing) {
                    this.indicator.setVisibility(false);
                    this._isInViewState = IsInView.Outside;
                }
                else if (this._isInViewState === IsInView.Inside)
                    this._isInViewState = IsInView.Crossing;
            }
        }
        onActivate(input) {
            const hand_up_vector = new THREE.Vector3(0, 0, 1).applyQuaternion(input.getMatrix().decompose()[1]);
            // hand_up_vector.z = 0;
            const hand_to_head_vector_normalized = input.getMatrix().decompose()[0].sub((0, WebVisuXRToolkit_1.getHeadMatrix)().decompose()[0]).normalize();
            const hand_to_head_vector_normalized_xy = hand_to_head_vector_normalized.clone();
            // hand_to_head_vector_normalized_xy.z = 0;
            const dotProductWrist = -hand_up_vector.normalize().dot(hand_to_head_vector_normalized_xy);
            const pinned = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.isHandMenuPinned();
            // Only update visibility if needed
            if (!WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.isVisible()) {
                // check if user is looking at hand
                const head_forward_vector = new THREE.Vector3(0, 1, 0).applyQuaternion((0, WebVisuXRToolkit_1.getHeadMatrix)().decompose()[1]);
                const dotProductWithHandToHeadVector = head_forward_vector.normalize().dot(hand_to_head_vector_normalized);
                this.updateIsInViewState(dotProductWithHandToHeadVector);
                if (this._isInViewState === IsInView.Inside || pinned) {
                    this.indicatorProgression(dotProductWrist, -0.5, 0.8);
                    if ((dotProductWrist > 0.8 || pinned))
                        this.openMenu();
                }
            }
            else {
                if (dotProductWrist < -0.5 && !pinned)
                    this.closeMenu();
            }
            return new Set();
        }
        precomputeMatrix() {
            precomputedMatrix_hand = new THREE.Matrix4().rotateZ(Math.PI * -0.7).rotateX(Math.PI * 0.3).translate(new THREE.Vector3(-50, 0, 150));
        }
        onRegisterInput(input) {
            input.model.addChild(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu);
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.handMenu.setMatrix(precomputedMatrix_hand);
            input.model.addChild(this.indicator);
            this.indicator.setMatrix(precomputedMatrix_hand);
        }
        onUnregisterInput(input) {
            super.onUnregisterInput(input);
            input.model.removeChild(this.indicator);
        }
        initialize() {
            super.initialize();
            const loader = new GLTFLoader();
            const indicatorPath = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/VXRT_Indicator_HandMenu.glb"); // models/VXRT_Indicator_HandMenu.glb
            loader.load(indicatorPath).then((model) => {
                model.exludeFromBounding(true);
                this.indicator.addChild(model);
                model.setMatrix(new THREE.Matrix4().rotateX(Math.PI * -0.5).translate(new THREE.Vector3(-55, 50, 0)).scale(new THREE.Vector3(1, 1, 1)));
                if (model.getAnimations)
                    this.indicatorAnimation = model.getAnimations()[0];
                else
                    console.warn("WebVisuXRToolkitHandMenuInteraction.ts: No indicator animation found");
            });
        }
    }
    exports.HandMenuActivationOnHand = HandMenuActivationOnHand;
});
