/// <amd-module name="DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput"/>
define("DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/Visualization/Node3D", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkit/WebVisuXRToolkit"], function (require, exports, THREE, Node3D, WebVisuXRToolkitSkillsUtils_1, WebVisuXRToolkitHelpers_1, WebVisuXRToolkitConfigManager, SceneGraphFactoryStatic, WebVisuXRToolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkit3DInput = exports.WebVisuXRToolkitInput = exports.WebVisuXRToolkitNonXRInput = exports.InputHandedness = void 0;
    var InputHandedness;
    (function (InputHandedness) {
        InputHandedness[InputHandedness["None"] = 1] = "None";
        InputHandedness[InputHandedness["Left"] = 2] = "Left";
        InputHandedness[InputHandedness["Right"] = 3] = "Right";
    })(InputHandedness || (exports.InputHandedness = InputHandedness = {}));
    class WebVisuXRToolkitNonXRInput {
        constructor(handedness) {
            this.userData = {};
            this._activatedActions = new Set();
            this._startedActions = new Set();
            this._endedActions = new Set();
            this._systemSkillUsedInputs = new Set();
            this._previoustmpSystemSkillUsedInputs = new Set();
            this._pausedSkillEvents = new Set();
            this._handedness = handedness;
        }
        get handedness() {
            return this._handedness;
        }
        /** @internal */
        get activatedActions() {
            return this._activatedActions;
        }
        /** @internal */
        get startedActions() {
            return this._startedActions;
        }
        /** @internal */
        get endedActions() {
            return this._endedActions;
        }
        /** @internal */
        get previoustmpSystemSkillUsedInputs() {
            return this._previoustmpSystemSkillUsedInputs;
        }
        /** @internal */
        set previoustmpSystemSkillUsedInputs(val) {
            this._previoustmpSystemSkillUsedInputs = val;
        }
        /** @internal */
        get pausedSkillEvents() {
            return this._pausedSkillEvents;
        }
        /** @internal */
        get systemSkillUsedInputs() {
            return this._systemSkillUsedInputs;
        }
    }
    exports.WebVisuXRToolkitNonXRInput = WebVisuXRToolkitNonXRInput;
    /**
     * This is the asbtract class to represent any XR Inputs
     */
    class WebVisuXRToolkitInput extends WebVisuXRToolkitNonXRInput {
        constructor(XRInputSource, isMixedRealityActive) {
            let handedness = InputHandedness.None;
            switch (XRInputSource.handedness) {
                case "left":
                    handedness = InputHandedness.Left;
                    break;
                case "right":
                    handedness = InputHandedness.Right;
                    break;
            }
            super(handedness);
            this.raycastForward = new THREE.Vector3();
            this.ray = new THREE.Ray();
            this._XRInputSource = XRInputSource;
            this._mixedRealityMode = isMixedRealityActive;
            this.setMixedRealityMode(isMixedRealityActive);
        }
        get targetRayMatrix() {
            return this._targetRayMatrix?.clone();
        }
        get targetRayWorldMatrix() {
            return this._targetRayWorldMatrix?.clone();
        }
        castRayIntoRealWorldPlanes(objects) {
            const res = new Array();
            if (this._targetRayMatrix) {
                const matrixWorldData = this._targetRayMatrix.decompose();
                const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(matrixWorldData[1]);
                const ray = new THREE.Ray(matrixWorldData[0], raycastForward);
                for (const obj of objects) {
                    const rectMatrixDec = obj.decompose();
                    const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(rectMatrixDec[1]);
                    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, rectMatrixDec[0]);
                    // Intersect ray with the plane
                    const intersectionPoint = new THREE.Vector3();
                    if (!ray.intersectPlaneInDir(plane, intersectionPoint)) {
                        continue; // No intersection with the plane
                    }
                    res.push({ matrix: new THREE.Matrix4().compose(intersectionPoint, rectMatrixDec[1], new THREE.Vector3(1, 1, 1)), distance: intersectionPoint.distanceTo(ray.origin) });
                }
            }
            return res.sort((a, b) => a.distance - b.distance);
        }
        castRayIntoRealWorldMesh(viewer, XRMesh) {
            let res = new Array();
            if (this.targetRayWorldMatrix) {
                const matrixWorldData = this.targetRayWorldMatrix.decompose();
                const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(matrixWorldData[1]);
                const ray = new THREE.Ray(matrixWorldData[0], raycastForward);
                const intersects = viewer.castRay(ray, XRMesh, "prim");
                if (intersects.length > 0) {
                    for (let k = 0; k < intersects.length; k++) {
                        const intersection = intersects[k];
                        res.push(intersection);
                    }
                }
            }
            return res;
        }
        castRayIntoScenegraph(viewer, excludedNode, granularity) {
            if (excludedNode) //! DEPRECATED
             {
                console.warn("DEPRECATED: Please don't use 'excluded node' anymore, if you want to exclude a node, use node.setPickable(Mesh.PICKTHROUGH) (Note that it is already applied to XRObjects)");
            }
            let res;
            if (this.targetRayWorldMatrix) {
                //const matrixWorldData = excludedNode && excludedNode.getName() === "XR_Components" ? excludedNode.getMatrix().multiply(this.targetRayWorldMatrix).decompose() : this.targetRayWorldMatrix.decompose()
                const matrixWorldData = (0, WebVisuXRToolkit_1.getXRObjects)().getMatrix().multiply(this.targetRayWorldMatrix).decompose();
                this.raycastForward.set(0, 1, 0).applyQuaternion(matrixWorldData[1]);
                this.ray.origin = matrixWorldData[0];
                this.ray.direction = this.raycastForward;
                res = viewer.castRay(this.ray, undefined, granularity, { usePickingRules: true });
                return res;
            }
            return [];
        }
        vibrate(value, duration) {
            const gamepad = this._XRInputSource.gamepad;
            if (!gamepad)
                return false;
            const vibrator = gamepad?.vibrationActuator;
            vibrator?.pulse(value, duration);
            return true;
        }
        /** @internal */
        setMixedRealityMode(iOnOFF) {
            this._mixedRealityMode = iOnOFF;
            this.endedActions.add(iOnOFF ? WebVisuXRToolkitSkillsUtils_1.InputAction.FullImmersive : WebVisuXRToolkitSkillsUtils_1.InputAction.MixedReality);
            this.startedActions.add(iOnOFF ? WebVisuXRToolkitSkillsUtils_1.InputAction.MixedReality : WebVisuXRToolkitSkillsUtils_1.InputAction.FullImmersive);
        }
        /** @interal */
        get XRInputSource() {
            return this._XRInputSource;
        }
        setDefaultTargetRayMatrix(frame, referenceSpace, XRInputSource, XRNodeMatrix, offset = undefined) {
            const targetRayPose = frame.getPose(XRInputSource.targetRaySpace, referenceSpace);
            if (targetRayPose) {
                if (this._targetRayMatrix)
                    (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(targetRayPose.transform, this._targetRayMatrix);
                else
                    this._targetRayMatrix = (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(targetRayPose.transform);
                if (offset)
                    this._targetRayMatrix.translate(offset);
                if (this._targetRayWorldMatrix)
                    this._targetRayWorldMatrix.multiplyMatrices(XRNodeMatrix, this._targetRayMatrix);
                else
                    this._targetRayWorldMatrix = XRNodeMatrix.clone().multiply(this._targetRayMatrix);
            }
            else {
                this._targetRayMatrix = undefined;
                this._targetRayWorldMatrix = undefined;
            }
        }
        /** @internal */
        update(frame, referenceSpace, XRInputSource, XRNodeMatrix) {
            this._update(frame, referenceSpace, XRInputSource, XRNodeMatrix);
        }
    }
    exports.WebVisuXRToolkitInput = WebVisuXRToolkitInput;
    class WebVisuXRToolkit3DInput extends WebVisuXRToolkitInput {
        constructor(mesh_id, XRInputSource, isMixedRealityActive, isDisplayingIndicators, isHand) {
            super(XRInputSource, isMixedRealityActive);
            this._hasModelLoaded = false;
            this.inverseConversion = new THREE.Matrix4().rotateZ(Math.PI) //.rotateY(-Math.PI).rotateX(-0.5 * Math.PI)
                .scale(new THREE.Vector3(0.001, 0.001, 0.001));
            this._controllerPosOffset = new THREE.Vector3(5, -27.5, 0);
            this._controllerScaleOffset = new THREE.Vector3(1.1, 1.1, 1.1);
            this._isHand = isHand;
            this._isDisplayingIndicators = isDisplayingIndicators;
            this._model = new Node3D(mesh_id);
            if (WebVisuXRToolkitConfigManager.instance.settings.get("DisplayInputs") === false) {
                this._model.setVisibility(false);
            }
            switch (XRInputSource.handedness) {
                case "left":
                    this._handedness = InputHandedness.Left;
                    break;
                case "right":
                    this._handedness = InputHandedness.Right;
                    break;
                case "none":
                    this._handedness = InputHandedness.None;
                    break;
            }
        }
        get model() {
            return this._model;
        }
        hasModelLoaded() {
            return this._hasModelLoaded;
        }
        isDisplayingIndicators() {
            return this._isDisplayingIndicators;
        }
        getMatrix() {
            return this._model.getMatrix();
        }
        getMatrixWorld() {
            return (0, WebVisuXRToolkit_1.getXRNode)().getMatrix().multiply(this._model.getMatrix());
            //return this._model.getMatrixWorld();
        }
        setModelVisibility(display) {
            this._model.setVisibility(display);
        }
        async addLabelIndicator(tooltip, attachment) {
            return this.getAttachmentNode(attachment, "label_pose/").then(async (node) => {
                if (node) {
                    node.addChild(tooltip);
                    //console.log("adding", tooltip.name, InputHandedness[this.handedness])
                    // Line Indicator
                    const buttonAttachment = await this.getAttachmentNode(attachment, "icon_pose/");
                    if (buttonAttachment) {
                        const buttonPosWorld = buttonAttachment.getMatrixWorld().decompose()[0];
                        // Tooltip corners in local space
                        const halfWidth = tooltip.width * 0.5;
                        const halfHeight = tooltip.height * 0.5;
                        const cornersLocal = [
                            new THREE.Vector3(halfWidth, 0, halfHeight), // topRight
                            new THREE.Vector3(-halfWidth, 0, halfHeight), // topLeft
                            new THREE.Vector3(halfWidth, 0, -halfHeight), // bottomRight
                            new THREE.Vector3(-halfWidth, 0, -halfHeight) // bottomLeft
                        ];
                        // Transform corners to world space
                        const tooltipMatrixWorld = tooltip.getMatrixWorld();
                        const cornersWorld = cornersLocal.map(corner => corner.clone().applyMatrix4(tooltipMatrixWorld));
                        // Find closest corner
                        let closestCorner = cornersLocal[0];
                        let minDist = buttonPosWorld.distanceTo(cornersWorld[0]);
                        for (let i = 1; i < cornersWorld.length; i++) {
                            const dist = buttonPosWorld.distanceTo(cornersWorld[i]);
                            if (dist < minDist) {
                                minDist = dist;
                                closestCorner = cornersLocal[i];
                            }
                        }
                        // Convert node position to buttonAttachment's local space
                        const buttonPosInTooltipSpace = buttonPosWorld.clone().applyMatrix4(new THREE.Matrix4().getInverse(tooltip.getMatrixWorld()));
                        const p0 = closestCorner.clone();
                        const p1 = buttonPosInTooltipSpace.clone();
                        const direction = new THREE.Vector3().subVectors(p1, p0);
                        const length = direction.length();
                        const offset = 2;
                        if (length > offset) {
                            p0.add(direction.normalize().multiplyScalar(offset));
                        }
                        const lineNode = createLineIndicator(p0, p1, 0xA6A6A6);
                        tooltip.addChild(lineNode);
                        return tooltip;
                    }
                }
            });
        }
        async removeLabelIndicator(attachment) {
            return this.getAttachmentNode(attachment, "label_pose/").then(node => node?.removeChildren());
        }
        async addIconIndicator(icon, attachment) {
            return this.getAttachmentNode(attachment, "icon_pose/").then(node => node?.addChild(icon));
        }
        async removeIconIndicator(attachment) {
            return this.getAttachmentNode(attachment, "icon_pose/").then(node => node?.removeChildren());
        }
        /** @internal */
        setMixedRealityMode(iOnOFF) {
            super.setMixedRealityMode(iOnOFF);
            if (WebVisuXRToolkitConfigManager.instance.settings.get("DisplayInputsInMixedRealityMode") === false) {
                this._model.setVisibility(!iOnOFF);
            }
        }
        async displayIndicators(iOnOFF) {
            this._isDisplayingIndicators = iOnOFF;
            while (this.hasModelLoaded() === false) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            const queue = this.model.getChildren();
            let node;
            while (node = queue.pop()) {
                if (node.getName() === "Indicator Attachment") {
                    node.setVisibility(iOnOFF);
                    for (const child of node.getChildren()) {
                        child.setVisibility(iOnOFF);
                    }
                }
                for (const child of node.getChildren()) {
                    queue.push(child);
                }
            }
        }
        async getAttachmentNode(attachmentPoseName, prefix) {
            while (this.hasModelLoaded() === false) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            const queue = this.model.getChildren();
            let node;
            while (node = queue.pop()) {
                if (node.getName() === prefix + attachmentPoseName) {
                    if (node.children.length === 1) {
                        return node.children[0];
                    }
                    else if (node.children.length === 0) {
                        const conversionNode = new Node3D("Indicator Attachment");
                        conversionNode.setVisibility(this._isDisplayingIndicators);
                        conversionNode.setMatrix(this.inverseConversion);
                        node.addChild(conversionNode);
                        return conversionNode;
                    }
                    else {
                        console.error("We should not have more than one child here");
                        return node.children[0];
                    }
                }
                for (const child of node.getChildren()) {
                    queue.push(child);
                }
            }
            //throw new Error("could not find attachment Node " + prefix + attachmentPoseName)
            console.error("could not find attachment Node " + prefix + attachmentPoseName, new Error().stack);
        }
        /** @internal */
        update(frame, referenceSpace, XRInputSource, XRNodeMatrix) {
            if (XRInputSource.gripSpace && this._isHand === false) {
                const pose = frame.getPose(XRInputSource.gripSpace, referenceSpace);
                if (pose) {
                    if (this._model._matrix === null) {
                        this._model._matrix = (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(pose.transform).rotateX(Math.PI * 0.08).translate(this._controllerPosOffset).scale(this._controllerScaleOffset);
                    }
                    else {
                        (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(pose.transform, this._model._matrix);
                        this._model._matrix.rotateX(Math.PI * 0.08).translate(this._controllerPosOffset).scale(this._controllerScaleOffset);
                    }
                    this._model._updateMatrix();
                }
            }
            super.update(frame, referenceSpace, XRInputSource, XRNodeMatrix);
        }
    }
    exports.WebVisuXRToolkit3DInput = WebVisuXRToolkit3DInput;
    function createLineIndicator(from, to, color) {
        const lineDir = to.clone().sub(from);
        const linePose = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(from, to);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            force: true
        });
        const lineNode = SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREE.Vector3(-0.5, 0.0, -0.5),
            firstAxis: new THREE.Vector3(0.35, 0.0, 0.0),
            secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
            thirdAxis: new THREE.Vector3(0.0, 0.0, 0.35),
            material: material
        });
        lineNode.setName("Line");
        lineNode.setMatrix(linePose.scale(new THREE.Vector3(1.0, lineDir.length(), 1.0)).setPosition(from));
        return lineNode;
    }
});
