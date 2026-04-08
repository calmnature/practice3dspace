/// <amd-module name="DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitHand"/>
define("DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitHand", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuGLTF/GLTFLoader", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager"], function (require, exports, THREE, WebVisuXRToolkitInput_1, WebVisuXRToolkitSkillsUtils_1, GLTFLoader, WebappsUtils_1, WebVisuXRToolkitHelpers_1, WebVisuXRToolkit_1, WebVisuXRToolkitConfigManager) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitHand = void 0;
    const WebXRJointToGLTFJoint = {
        "wrist": "",
        "thumb-metacarpal": "ThumbMetacarpal",
        "thumb-phalanx-proximal": "ThumbProximal",
        "thumb-phalanx-distal": "ThumbDistal",
        "thumb-tip": "ThumbTip",
        "index-finger-metacarpal": "IndexMetacarpal",
        "index-finger-phalanx-proximal": "IndexProximal",
        "index-finger-phalanx-intermediate": "IndexIntermediate",
        "index-finger-phalanx-distal": "IndexDistal",
        "index-finger-tip": "IndexTip",
        "middle-finger-metacarpal": "MiddleMetacarpal",
        "middle-finger-phalanx-proximal": "MiddleProximal",
        "middle-finger-phalanx-intermediate": "MiddleIntermediate",
        "middle-finger-phalanx-distal": "MiddleDistal",
        "middle-finger-tip": "MiddleTip",
        "ring-finger-metacarpal": "RingMetacarpal",
        "ring-finger-phalanx-proximal": "RingProximal",
        "ring-finger-phalanx-intermediate": "RingIntermediate",
        "ring-finger-phalanx-distal": "RingDistal",
        "ring-finger-tip": "RingTip",
        "pinky-finger-metacarpal": "LittleMetacarpal",
        "pinky-finger-phalanx-proximal": "LittleProximal",
        "pinky-finger-phalanx-intermediate": "LittleIntermediate",
        "pinky-finger-phalanx-distal": "LittleDistal",
        "pinky-finger-tip": "LittleTip",
    };
    const GLTFJointToWebXRJoint = Object.fromEntries(Object.entries(WebXRJointToGLTFJoint)
        .filter(([_, v]) => v !== "")
        .map(([key, value]) => [value, key]));
    var HandStandardFingers;
    (function (HandStandardFingers) {
        HandStandardFingers["thumb"] = "thumb";
        HandStandardFingers["index"] = "index";
        HandStandardFingers["middle"] = "middle";
        HandStandardFingers["ring"] = "ring";
        HandStandardFingers["pinky"] = "pinky";
    })(HandStandardFingers || (HandStandardFingers = {}));
    var FingerState;
    (function (FingerState) {
        FingerState["straight"] = "straight";
        FingerState["bent"] = "bent";
        FingerState["in_between"] = "in_between";
    })(FingerState || (FingerState = {}));
    const PINCH_START_DISTANCE = 0.05;
    const PINCH_TRIGGER_DISTANCE = 0.02;
    const REBOUND_THRESHOLD = 0.005;
    const HANDABOUTTOPALMUP_THRESHOLD = 0.3;
    const HANDPALMUP_THRESHOLD = 0.1;
    const TARGETRAY_OFFSET = new THREE.Vector3(-13, 17, -2);
    class WebVisuXRToolkitHand extends WebVisuXRToolkitInput_1.WebVisuXRToolkit3DInput {
        get targetRayMatrix() {
            return this._handRayMatrix.clone();
        }
        get targetRayWorldMatrix() {
            return this._handRayMatrixWorld.clone();
        }
        get realTargetRayMatrix() {
            return this._targetRayMatrix?.clone();
        }
        get realTargetRayWorldMatrix() {
            return this._targetRayWorldMatrix?.clone();
        }
        get skeleton() {
            return this._skeleton;
        }
        /**
         * Range from 0 (onPinchBegin) to 1 (end of PinchAboutToStart)
         */
        get IndexThumbDistance() {
            return (0, WebVisuXRToolkitHelpers_1.map_numeric)(this._indexThumbDistance, PINCH_TRIGGER_DISTANCE - REBOUND_THRESHOLD, PINCH_START_DISTANCE + REBOUND_THRESHOLD, 0, 1);
        }
        /**
         * Range from 0 (onPinchBegin) to 1 (end of PinchAboutToStart)
         */
        get MiddleThumbDistance() {
            return (0, WebVisuXRToolkitHelpers_1.map_numeric)(this._middleThumbDistance, PINCH_TRIGGER_DISTANCE - REBOUND_THRESHOLD, PINCH_START_DISTANCE + REBOUND_THRESHOLD, 0, 1);
        }
        /**
         * Range from 0 (handPalmUp) to 1 (end of handAboutToPalmUp)
         */
        get PalmDownScore() {
            return (0, WebVisuXRToolkitHelpers_1.map_numeric)(this._palmDownScore, HANDPALMUP_THRESHOLD - REBOUND_THRESHOLD, HANDABOUTTOPALMUP_THRESHOLD + REBOUND_THRESHOLD, 0, 1);
        }
        constructor(mesh_id, XRInputSource, isMixedRealityActive, isDisplayingIndicators) {
            super(mesh_id, XRInputSource, isMixedRealityActive, isDisplayingIndicators, true);
            this._joints = new Map();
            this._fingerStates = new Map();
            this._gestureStates = new Map();
            this._indexThumbDistance = 1;
            this._middleThumbDistance = 1;
            this._palmDownScore = 1;
            this._rightShouldVecOffset = new THREE.Vector3(200, 0, -150);
            this._leftShouldVecOffset = new THREE.Vector3(-200, 0, -150);
            this._shoulder_pos = new THREE.Vector3();
            this._wristPos = new THREE.Vector3();
            this._wristQuat = new THREE.Quaternion();
            this._identityVec = new THREE.Vector3(1, 1, 1);
            this._rot = new THREE.Quaternion();
            this.wristOffset = new THREE.Vector3();
            this._fingerOffset = new THREE.Vector3(0, 40, 0);
            this._jointMat = new THREE.Matrix4();
            // 1. PRE-CALCULATE CONSTANTS (Module Scope)
            // Create the rotation matrix once.
            this._correctionMat = new THREE.Matrix4()
                .makeRotationX(0.5 * Math.PI)
                .rotateZ(Math.PI);
            this._posProx = new THREE.Vector3();
            this._posInter = new THREE.Vector3();
            this._posDist = new THREE.Vector3();
            this._posTip = new THREE.Vector3();
            this._vecProx = new THREE.Vector3(); // Vector of proximal bone
            this._vecDist = new THREE.Vector3(); // Vector of distal bone
            this.FINGER_NAMES = ["index", "middle", "ring", "pinky"];
            this.wristMat = new THREE.Matrix4();
            this.wristInvMat = new THREE.Matrix4();
            this._gIndexPos = new THREE.Vector3();
            this._gMiddlePos = new THREE.Vector3();
            this._gThumbPos = new THREE.Vector3();
            this._gWristMat = new THREE.Matrix4(); // Helper for wrist math
            const loader = new GLTFLoader();
            const path = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", this.handedness === WebVisuXRToolkitInput_1.InputHandedness.Left ? "models/SimpleHand_Left.gltf" : "models/SimpleHand_Right.gltf");
            //const debugAxis = getDebugAxis();
            //debugAxis.setMatrix(new THREE.Matrix4().scale(new THREE.Vector3(10, 10, 10)))
            //this._model.addChild(debugAxis)
            loader.load(path).then((model) => {
                model.exludeFromBounding(true);
                this._model.addChild(model);
                this._hasModelLoaded = true;
                this._skeleton = model.getSkeletons()[0];
                const root = this._skeleton.getSkeletonRootNode();
                this._joints.set("wrist", root);
                // const label = createLabelIndicator("wrist");
                // label.setMatrix(label.getMatrix().scale(new THREE.Vector3(0.001, 0.001, 0.001)))
                // this.debugWristNode.addChild(label)
                //WebVisuXRToolkitManager.instance.sceneManager.XRNode.add(this.debugWristNode);
                for (const child of root.children) {
                    if (GLTFJointToWebXRJoint[child.name]) {
                        this._joints.set(GLTFJointToWebXRJoint[child.name], child);
                        // const label = createLabelIndicator(GLTFJointToWebXRJoint[child.name]);
                        // label.setMatrix(label.getMatrix().scale(new THREE.Vector3(0.001, 0.001, 0.001)))
                        // child.addChild(label)
                    }
                }
                ;
            });
            this._handRayMatrix = this._targetRayMatrix ? this._targetRayMatrix : new THREE.Matrix4();
            this._handRayMatrixWorld = new THREE.Matrix4();
        }
        setHandMatrixFromShoulderThroughWrist(XRNodeMatrix) {
            const shoulderMat = (0, WebVisuXRToolkit_1.getHeadMatrix)().translate(this.handedness === WebVisuXRToolkitInput_1.InputHandedness.Right ? this._rightShouldVecOffset : this._leftShouldVecOffset);
            this._shoulder_pos.getPositionFromMatrix(shoulderMat);
            this.wristMat.decompose(this._wristPos, this._wristQuat, undefined);
            if (this.handedness === WebVisuXRToolkitInput_1.InputHandedness.Right)
                this.wristOffset.set(-21, 129, -72).applyQuaternion(this._wristQuat);
            else
                this.wristOffset.set(21, 129, -72).applyQuaternion(this._wristQuat);
            this._wristPos.add(this.wristOffset);
            this._rot.setFromRotationMatrix((0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(this._shoulder_pos, this._wristPos));
            if (!this._handRayMatrix)
                this._handRayMatrix = new THREE.Matrix4().compose(this._wristPos, this._rot, this._identityVec);
            else
                this._handRayMatrix.compose(this._wristPos, this._rot, this._identityVec);
            this._handRayMatrixWorld.copy(XRNodeMatrix).multiply(this._handRayMatrix);
        }
        updateHandJoint(node, jointPose) {
            this._jointMat.setFromArray(Array.from(jointPose.transform.matrix));
            node._matrix.multiplyMatrices(this.wristInvMat, this._jointMat);
            node._matrix.multiplyMatrices(this._correctionMat, node._matrix);
            node._matrix.multiply(this._correctionMat);
        }
        updateThumb() {
            const nMeta = this._joints.get("thumb-metacarpal");
            const nProx = this._joints.get("thumb-phalanx-proximal");
            const nDist = this._joints.get("thumb-phalanx-distal");
            const nTip = this._joints.get("thumb-tip");
            if (!nMeta || !nProx || !nDist || !nTip)
                return;
            this._posInter.getPositionFromMatrix(nMeta.getMatrix());
            this._posProx.getPositionFromMatrix(nProx.getMatrix());
            this._posDist.getPositionFromMatrix(nDist.getMatrix());
            this._posTip.getPositionFromMatrix(nTip.getMatrix());
            this._vecProx.subVectors(this._posProx, this._posInter).normalize();
            this._vecDist.subVectors(this._posTip, this._posDist).normalize();
            const dot = this._vecProx.dot(this._vecDist);
            if (dot < 0.2) {
                this._fingerStates.set(HandStandardFingers.thumb, FingerState.bent);
            }
            else {
                this._fingerStates.set(HandStandardFingers.thumb, FingerState.straight);
            }
        }
        updateFingerStates() {
            for (const finger of this.FINGER_NAMES) {
                const nodeProx = this._joints.get(`${finger}-finger-phalanx-proximal`);
                const nodeInter = this._joints.get(`${finger}-finger-phalanx-intermediate`);
                const nodeDist = this._joints.get(`${finger}-finger-phalanx-distal`);
                const nodeTip = this._joints.get(`${finger}-finger-tip`);
                if (!nodeProx || !nodeInter || !nodeDist || !nodeTip)
                    continue;
                this._posProx.getPositionFromMatrix(nodeProx.getMatrix());
                this._posInter.getPositionFromMatrix(nodeInter.getMatrix());
                this._posDist.getPositionFromMatrix(nodeDist.getMatrix());
                this._posTip.getPositionFromMatrix(nodeTip.getMatrix());
                this._vecProx.subVectors(this._posInter, this._posProx).normalize();
                this._vecDist.subVectors(this._posTip, this._posDist).normalize();
                const dot = this._vecProx.dot(this._vecDist);
                if (dot < 0) {
                    this._fingerStates.set(HandStandardFingers[finger], FingerState.bent);
                }
                else {
                    this._fingerStates.set(HandStandardFingers[finger], FingerState.straight);
                }
            }
        }
        /** @internal */
        _update(frame, referenceSpace, XRInputSource, XRNodeMatrix) {
            if (!this._hasModelLoaded || !frame.getJointPose)
                return;
            this.setDefaultTargetRayMatrix(frame, referenceSpace, XRInputSource, XRNodeMatrix, TARGETRAY_OFFSET);
            if (!XRInputSource.hand) {
                console.log("Strange behaviour, we are supposed to have XRInputSource.hand, we have : ", XRInputSource.hand);
            }
            else {
                for (const jointSpace of XRInputSource.hand.values()) {
                    const jointPose = frame.getJointPose(jointSpace, referenceSpace);
                    if (jointPose) {
                        const node = this._joints.get(jointSpace.jointName);
                        if (node) {
                            if (jointSpace.jointName === "wrist") {
                                this.wristInvMat.setFromArray(Array.from(jointPose.transform.inverse.matrix));
                                if (this._model._matrix === null) {
                                    this._model._matrix = ((0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(jointPose.transform).translate(this._fingerOffset));
                                }
                                else {
                                    (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(jointPose.transform, this._model._matrix);
                                    this._model._matrix.translate(this._fingerOffset);
                                }
                                (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransform)(jointPose.transform, this.wristMat); // used in setHandMatrixFromShoulderThroughWrist
                            }
                            else {
                                const node = this._joints.get(jointSpace.jointName);
                                if (node) {
                                    this.updateHandJoint(node, jointPose);
                                }
                                else {
                                    console.error("Couldn't find", jointSpace.jointName);
                                }
                            }
                        }
                        else {
                            console.error("Couldn't find", jointSpace.jointName);
                        }
                    }
                }
                this._model._updateMatrix();
            }
            //Update Skinning
            if (this._skeleton !== undefined) {
                this._skeleton.updateBonesPoses();
            }
            if (WebVisuXRToolkitConfigManager.instance.settings.get("AVProDetected"))
                this.setHandMatrixFromShoulderThroughWrist(XRNodeMatrix);
            else {
                if (this._targetRayMatrix)
                    this._handRayMatrix.copy(this._targetRayMatrix);
                if (this._targetRayWorldMatrix)
                    this._handRayMatrixWorld.copy(this._targetRayWorldMatrix);
            }
            // Thumb has less joints
            this.updateThumb();
            this.updateFingerStates();
            this._updateGestures();
        }
        _updateGestures() {
            const nIndex = this._joints.get("index-finger-tip");
            const nMiddle = this._joints.get("middle-finger-tip");
            const nThumb = this._joints.get("thumb-tip");
            const nWrist = this.getJoint('wrist');
            if (!nIndex || !nMiddle || !nThumb || !nWrist)
                return;
            this._gIndexPos.getPositionFromMatrix(nIndex.getMatrix());
            this._gMiddlePos.getPositionFromMatrix(nMiddle.getMatrix());
            this._gThumbPos.getPositionFromMatrix(nThumb.getMatrix());
            this._indexThumbDistance = this._gIndexPos.distanceTo(this._gThumbPos);
            this._middleThumbDistance = this._gMiddlePos.distanceTo(this._gThumbPos);
            this._handleThresholdInputAction(this._indexThumbDistance, PINCH_START_DISTANCE, REBOUND_THRESHOLD, WebVisuXRToolkitSkillsUtils_1.InputAction.IndexAboutToPinch);
            this._handleThresholdInputAction(this._indexThumbDistance, PINCH_TRIGGER_DISTANCE, REBOUND_THRESHOLD, WebVisuXRToolkitSkillsUtils_1.InputAction.IndexPinch);
            const isIndexPinching = this._gestureStates.get(WebVisuXRToolkitSkillsUtils_1.InputAction.IndexPinch);
            if (isIndexPinching !== true) {
                this._handleThresholdInputAction(this._middleThumbDistance, PINCH_START_DISTANCE, REBOUND_THRESHOLD, WebVisuXRToolkitSkillsUtils_1.InputAction.MiddleAboutToPinch);
                this._handleThresholdInputAction(this._middleThumbDistance, PINCH_TRIGGER_DISTANCE, REBOUND_THRESHOLD, WebVisuXRToolkitSkillsUtils_1.InputAction.MiddlePinch);
            }
            const sIndex = this._fingerStates.get(HandStandardFingers.index);
            const sThumb = this._fingerStates.get(HandStandardFingers.thumb);
            const sMiddle = this._fingerStates.get(HandStandardFingers.middle);
            const sRing = this._fingerStates.get(HandStandardFingers.ring);
            const sPinky = this._fingerStates.get(HandStandardFingers.pinky);
            const isIndexStraight = sIndex === FingerState.straight;
            const isMiddleStraight = sMiddle === FingerState.straight;
            // const isRingStraight = sRing === FingerState.straight; // Unused in current logic but good practice
            // const isPinkyStraight = sPinky === FingerState.straight; // Unused
            // 1. Flat Hand
            if (isIndexPinching) {
                this._handleInputAction(false, WebVisuXRToolkitSkillsUtils_1.InputAction.FlatHand);
            }
            else {
                // All straight
                const isFlat = isIndexStraight &&
                    sThumb === FingerState.straight &&
                    isMiddleStraight &&
                    sRing === FingerState.straight &&
                    sPinky === FingerState.straight;
                this._handleInputAction(isFlat, WebVisuXRToolkitSkillsUtils_1.InputAction.FlatHand);
            }
            // 2. Point (Index Straight, others Bent)
            // Note: You checked Thumb == Bent, but usually Point allows Thumb straight or bent.
            const isPoint = isIndexStraight &&
                sThumb === FingerState.bent &&
                sMiddle === FingerState.bent &&
                sRing === FingerState.bent &&
                sPinky === FingerState.bent;
            this._handleInputAction(isPoint, WebVisuXRToolkitSkillsUtils_1.InputAction.Point);
            // 3. Gun Hand (Index+Middle Straight, Ring+Pinky Bent)
            const isGun = isIndexStraight &&
                isMiddleStraight &&
                sRing === FingerState.bent &&
                sPinky === FingerState.bent;
            this._handleInputAction(isGun, WebVisuXRToolkitSkillsUtils_1.InputAction.GunHand);
            // --- PART F: PALM ORIENTATION (Direct Matrix Access) ---
            // Original Math: 
            // 1. Multiply Matrices -> 2. Create Quaternion -> 3. Rotate (0,1,0) -> 4. Dot with (0,0,1)
            // Optimized Math:
            // The result of rotating (0,1,0) by a matrix is simply the Y-Column of that matrix.
            // The Y-Column corresponds to array indices [4, 5, 6, 7].
            // The Dot Product of Vector(x,y,z) and (0,0,1) is simply 'z'.
            // Therefore, we just need matrix element #6.
            // 1. Combine Hand Matrix * Wrist Matrix
            this._gWristMat.multiplyMatrices(this.getMatrix(), nWrist.getMatrix());
            // 2. Extract Z component of the Y-axis column (Index 6)
            // This is mathematically identical to your quaternion code but runs ~10x faster.
            let dotScore = this._gWristMat.elements[6];
            // 3. Normalize vector? 
            // If your matrices include Scaling, the column vector is not normalized. 
            // If scale is always 1, you can skip this. If scale varies, we must normalize.
            // To be safe, we normalize manually:
            // dotScore = dotScore / length of Y column
            const me = this._gWristMat.elements;
            const yLenSq = me[4] * me[4] + me[5] * me[5] + me[6] * me[6];
            // Fast inverse square root approximation or standard sqrt
            const yLen = Math.sqrt(yLenSq);
            if (yLen > 0)
                dotScore /= yLen;
            this._palmDownScore = (dotScore + 1) / 2;
            this._handleThresholdInputAction(this._palmDownScore, HANDABOUTTOPALMUP_THRESHOLD, REBOUND_THRESHOLD, WebVisuXRToolkitSkillsUtils_1.InputAction.HandAboutToPalmUp);
            this._handleThresholdInputAction(this._palmDownScore, HANDPALMUP_THRESHOLD, REBOUND_THRESHOLD, WebVisuXRToolkitSkillsUtils_1.InputAction.HandPalmUp);
        }
        _handleThresholdInputAction(left_value, right_value, threshold, inputAction) {
            if (this._gestureStates.get(inputAction)) {
                if (left_value > right_value + threshold) {
                    //action end
                    this.endedActions.add(inputAction);
                    this._gestureStates.set(inputAction, false);
                }
            }
            else {
                if (left_value <= right_value - threshold) {
                    //action start
                    this.startedActions.add(inputAction);
                    this._gestureStates.set(inputAction, true);
                }
            }
        }
        _handleInputAction(activation_condition, inputAction) {
            if (activation_condition) {
                if (!this._gestureStates.get(inputAction)) {
                    this.startedActions.add(inputAction);
                    this._gestureStates.set(inputAction, true);
                }
            }
            else {
                if (this._gestureStates.get(inputAction)) {
                    this.endedActions.add(inputAction);
                }
                this._gestureStates.set(inputAction, false);
            }
        }
        getJoint(name) {
            return this._joints.get(name);
        }
        _connect() {
            this.startedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.HandPassive);
        }
        _disconnect() {
            this.endedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.HandPassive);
        }
        getAvailableInputs() {
            return new Set([WebVisuXRToolkitSkillsUtils_1.InputAction.NetworkPassive, WebVisuXRToolkitSkillsUtils_1.InputAction.HandPassive, WebVisuXRToolkitSkillsUtils_1.InputAction.FullImmersive, WebVisuXRToolkitSkillsUtils_1.InputAction.MixedReality, WebVisuXRToolkitSkillsUtils_1.InputAction.IndexPinch, WebVisuXRToolkitSkillsUtils_1.InputAction.IndexAboutToPinch, WebVisuXRToolkitSkillsUtils_1.InputAction.MiddlePinch, WebVisuXRToolkitSkillsUtils_1.InputAction.MiddleAboutToPinch, WebVisuXRToolkitSkillsUtils_1.InputAction.FlatHand, WebVisuXRToolkitSkillsUtils_1.InputAction.Point, WebVisuXRToolkitSkillsUtils_1.InputAction.GunHand, WebVisuXRToolkitSkillsUtils_1.InputAction.HandPalmUp, WebVisuXRToolkitSkillsUtils_1.InputAction.HandAboutToPalmUp]);
        }
    }
    exports.WebVisuXRToolkitHand = WebVisuXRToolkitHand;
});
