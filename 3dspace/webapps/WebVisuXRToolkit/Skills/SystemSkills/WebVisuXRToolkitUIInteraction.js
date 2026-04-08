/// <amd-module name="DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitUIInteraction"/>
define("DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitUIInteraction", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "i18n!DS/WebVisuXRToolkit/assets/nls/WebVisuXRToolkit"], function (require, exports, THREE, WebVisuXRToolkitHelpers_1, WebVisuXRToolkitManager_1, WebVisuXRToolkit_1, NLS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandUIInteraction = exports.HandUIInteractionLaser = exports.HandToggleFunctionMenuVisiblity = exports.ToggleFunctionMenuVisiblity = exports.ControllerUIInteraction = exports.ControllerUIInteractionLaser = void 0;
    const INTERACTIVE_TAGS = new Set(['BUTTON', 'INPUT']); // , 'SELECT', 'TEXTAREA' to add ?
    class ControllerUIInteractionLaser {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.ControllerPassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
            this._currentlyInteractingInput = null;
            this._currentlyInteractingElement = null;
            this._UILaserRay = null;
            this._UILaserIndicator = null;
        }
        findInteractable(elements) {
            const skip_len = elements.size - 2; // only checking on the last three layers 
            let i = 0;
            for (const element of elements) {
                i++;
                if (i < skip_len)
                    continue; // tedious, but a set does not have indexer or reverse iterator
                const is_disabled = 'disabled' in element.attributes;
                if (is_disabled)
                    continue;
                if (element.onclick || INTERACTIVE_TAGS.has(element.tagName)) // using a Set for hash comparison
                    return element;
                const child = element.lastElementChild;
                if (child && child.tagName === 'INPUT')
                    return element;
            }
            return null;
        }
        onActivate(input) {
            if (this._currentlyInteractingInput === null) {
                this._currentlyInteractingInput = input;
            }
            if (this._currentlyInteractingInput === input && this._UILaserRay && this._UILaserIndicator) {
                if (input.targetRayMatrix && input.targetRayWorldMatrix && WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.anyIntersectibleVisible()) {
                    const worldMatrixData = input.targetRayWorldMatrix.decompose();
                    const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(worldMatrixData[1]);
                    const intersection = (0, WebVisuXRToolkitHelpers_1.intersectHTMLNode)(new THREE.Ray(worldMatrixData[0], raycastForward), WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.Intersectables);
                    if (intersection) {
                        if (intersection !== input.userData.LastIntersection) {
                            input.userData.LastIntersection = intersection;
                            intersection.node.htmlevent('mouseenter', intersection.uv.x, intersection.uv.y);
                            const htmlElements = intersection.node.intersectionCache;
                            const interactable = htmlElements ? this.findInteractable(htmlElements) : null;
                            if (interactable != this._currentlyInteractingElement) {
                                this._currentlyInteractingElement = interactable;
                                if (this._currentlyInteractingElement !== null)
                                    input.vibrate(0.3, 1);
                            }
                        }
                        intersection.node.htmlevent("mousemove", intersection.uv.x, intersection.uv.y); // Trigger mousemove in case of intersection with the UI
                        const laserRay = this._UILaserRay;
                        const target = input.targetRayMatrix.decompose();
                        const laserMatrix = new THREE.Matrix4().compose(target[0], target[1], new THREE.Vector3(1, intersection.distance - 1, 1)); //1mm gap between target and ray
                        laserRay.setMatrix(laserMatrix);
                        const laserIndicator = this._UILaserIndicator;
                        const laserIndicatorPosition = new THREE.Vector3(0, intersection.distance, 0).applyMatrix4(input.targetRayMatrix);
                        const toXRNodeSpace = new THREE.Matrix4().getInverse(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.XRNode.getMatrixWorld()); //Should it be world or normal matrix?
                        const laserIndicatorOrientation = (toXRNodeSpace.multiply(intersection.node.getMatrixWorld())).decompose()[1];
                        const indicatorGap = new THREE.Vector3(0, 1, 0).applyQuaternion(laserIndicatorOrientation);
                        const laserIndicatorMatrix = new THREE.Matrix4().compose(laserIndicatorPosition.add(indicatorGap), laserIndicatorOrientation, new THREE.Vector3(1, 1, 1));
                        laserIndicator.setMatrix(laserIndicatorMatrix);
                        input.userData.UIlaserNode.setVisibility(true);
                        return new Set([WebVisuXRToolkit_1.InputAction.TriggerTouch, WebVisuXRToolkit_1.InputAction.ControllerPassive]); // We want to stop all skills using this
                    }
                    else {
                        const lastIntersection = input.userData.LastIntersection;
                        if (lastIntersection) {
                            lastIntersection.node.htmlevent('mouseleave', -1, -1);
                            input.userData.LastIntersection = null;
                        }
                        this._currentlyInteractingInput = null;
                        input.userData.UIlaserNode.setVisibility(false);
                        this._currentlyInteractingElement = null;
                    }
                }
                else {
                    const intersection = input.userData.LastIntersection;
                    if (intersection) {
                        intersection.node.htmlevent('mouseleave', -1, -1);
                        input.userData.LastIntersection = null;
                    }
                    this._currentlyInteractingInput = null;
                    input.userData.UIlaserNode.setVisibility(false);
                    this._currentlyInteractingElement = null;
                }
            }
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            return new Set();
        }
        onUnregisterInput(input) {
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.unbindLaseNode(input);
            this._UILaserRay = null;
            this._UILaserIndicator = null;
            this._currentlyInteractingInput = null;
        }
        onRegisterInput(input) {
            const UILaserNode = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.bindLaserNode(input);
            this._UILaserRay = UILaserNode.getChildByName("LaserRay");
            this._UILaserIndicator = UILaserNode.getChildByName("LaserIndicator");
        }
        initialize() {
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.createLaserCube();
        }
    }
    exports.ControllerUIInteractionLaser = ControllerUIInteractionLaser;
    class ControllerUIInteraction {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            //console.log("mouse down", input.userData.LastIntersection)
            if (input.userData.LastIntersection) {
                const intersection = input.userData.LastIntersection;
                intersection.node.htmlevent('mousedown', intersection.uv.x, intersection.uv.y);
                return this.bindings;
            }
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            //console.log("mouse up", input.userData.LastIntersection)
            if (input.userData.LastIntersection) {
                const intersection = input.userData.LastIntersection;
                intersection.node.htmlevent('mouseup', intersection.uv.x, intersection.uv.y);
                input.userData.LastIntersection = null;
                return this.bindings;
            }
            return new Set();
        }
        onUnregisterInput(input) {
        }
        onRegisterInput(input) {
        }
    }
    exports.ControllerUIInteraction = ControllerUIInteraction;
    class ToggleFunctionMenuVisiblity {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.SecondButtonPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.toggleFunctionMenu();
            return this.bindings;
        }
        onActivateEnd(input, deActivatingAction) {
            return new Set();
        }
        onRegisterInput(input) {
            input.addLabelIndicator(this._indicator, "upper_button/center");
        }
        onUnregisterInput(input) {
            input.removeLabelIndicator("upper_button/center");
        }
        initialize() {
            this._indicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.FunctionMenuName);
        }
    }
    exports.ToggleFunctionMenuVisiblity = ToggleFunctionMenuVisiblity;
    class HandToggleFunctionMenuVisiblity {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.MiddlePinch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            console.log("recevied middle pinch");
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.toggleFunctionMenu();
            return this.bindings;
        }
        onActivateEnd(input, deActivatingAction) {
            return new Set();
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
        }
    }
    exports.HandToggleFunctionMenuVisiblity = HandToggleFunctionMenuVisiblity;
    class HandUIInteractionLaser extends ControllerUIInteractionLaser {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.HandPassive]);
        }
        onActivate(input) {
            if (this._currentlyInteractingInput === null) {
                this._currentlyInteractingInput = input;
            }
            if (this._currentlyInteractingInput === input && this._UILaserRay && this._UILaserIndicator) {
                if (input.targetRayMatrix && input.targetRayWorldMatrix && WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.anyIntersectibleVisible()) {
                    // const list = WebVisuXRToolkitManager.instance.UIManager.Intersectables.map(node => ({
                    //     node,
                    //     visible: node.isVisible()
                    // }));
                    // console.log(list);
                    const worldMatrixData = input.targetRayWorldMatrix.decompose();
                    const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(worldMatrixData[1]);
                    const intersection = (0, WebVisuXRToolkitHelpers_1.intersectHTMLNode)(new THREE.Ray(worldMatrixData[0], raycastForward), WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.Intersectables);
                    if (intersection) {
                        if (intersection !== input.userData.LastIntersection) {
                            input.userData.LastIntersection = intersection;
                            intersection.node.htmlevent('mouseenter', intersection.uv.x, intersection.uv.y);
                            const htmlElements = intersection.node.intersectionCache;
                            const interactable = htmlElements ? this.findInteractable(htmlElements) : null;
                            if (interactable != this._currentlyInteractingElement) {
                                this._currentlyInteractingElement = interactable;
                                if (this._currentlyInteractingElement !== null)
                                    input.vibrate(0.3, 1);
                            }
                        }
                        intersection.node.htmlevent("mousemove", intersection.uv.x, intersection.uv.y); // Trigger mousemove in case of intersection with the UI
                        const laserRay = this._UILaserRay;
                        const target = input.targetRayMatrix.decompose();
                        const laserMatrix = new THREE.Matrix4().compose(target[0], target[1], new THREE.Vector3(1, intersection.distance - 1, 1)); //1mm gap between target and ray
                        laserRay.setMatrix(laserMatrix);
                        const laserIndicator = this._UILaserIndicator;
                        const laserIndicatorPosition = new THREE.Vector3(0, intersection.distance, 0).applyMatrix4(input.targetRayMatrix);
                        const toXRNodeSpace = new THREE.Matrix4().getInverse(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.XRNode.getMatrixWorld()); //Should it be world or normal matrix?
                        const laserIndicatorOrientation = (toXRNodeSpace.multiply(intersection.node.getMatrixWorld())).decompose()[1];
                        const indicatorGap = new THREE.Vector3(0, 1, 0).applyQuaternion(laserIndicatorOrientation);
                        const laserIndicatorMatrix = new THREE.Matrix4().compose(laserIndicatorPosition.add(indicatorGap), laserIndicatorOrientation, new THREE.Vector3(1, 1, 1));
                        laserIndicator.setMatrix(laserIndicatorMatrix);
                        input.userData.UIlaserNode.setVisibility(true);
                        return new Set([WebVisuXRToolkit_1.InputAction.HandPassive]); // We want to stop all skills using this
                    }
                    else {
                        const lastIntersection = input.userData.LastIntersection;
                        if (lastIntersection) {
                            lastIntersection.node.htmlevent('mouseleave', -1, -1);
                            input.userData.LastIntersection = null;
                        }
                        this._currentlyInteractingInput = null;
                        input.userData.UIlaserNode.setVisibility(false);
                        this._currentlyInteractingElement = null;
                    }
                }
                else {
                    const intersection = input.userData.LastIntersection;
                    if (intersection) {
                        intersection.node.htmlevent('mouseleave', -1, -1);
                        input.userData.LastIntersection = null;
                    }
                    this._currentlyInteractingInput = null;
                    input.userData.UIlaserNode.setVisibility(false);
                    this._currentlyInteractingElement = null;
                }
            }
            return new Set();
        }
    }
    exports.HandUIInteractionLaser = HandUIInteractionLaser;
    class HandUIInteraction extends ControllerUIInteraction {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.IndexPinch]);
        }
    }
    exports.HandUIInteraction = HandUIInteraction;
});
