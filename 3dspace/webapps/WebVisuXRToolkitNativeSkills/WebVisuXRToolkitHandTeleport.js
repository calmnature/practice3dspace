/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitHandTeleport"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitHandTeleport", ["require", "exports", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitControllerTeleport"], function (require, exports, WebVisuXRToolkit_1, WebVisuXRToolkitControllerTeleport_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandTeleportCancel = exports.HandTeleportRay = exports.HandTeleport = void 0;
    var HandTeleportState;
    (function (HandTeleportState) {
        HandTeleportState[HandTeleportState["Idle"] = 0] = "Idle";
        HandTeleportState[HandTeleportState["Teleporting"] = 1] = "Teleporting";
        HandTeleportState[HandTeleportState["Cancelling"] = 2] = "Cancelling";
    })(HandTeleportState || (HandTeleportState = {}));
    let HandTeleportStatus = HandTeleportState.Idle;
    let CurrentHand = WebVisuXRToolkit_1.InputHandedness.Right;
    class HandTeleport extends WebVisuXRToolkitControllerTeleport_1.Teleport {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FullImmersive, WebVisuXRToolkit_1.InputAction.IndexPinch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
        }
        activate(input) {
            if (HandTeleportStatus === HandTeleportState.Teleporting)
                super.onActivate(input);
        }
        activateEnd(input) {
            super.onActivateEnd(input, WebVisuXRToolkit_1.InputAction.HandPalmUp);
        }
        onActivateBegin(input) {
            if (HandTeleportStatus !== HandTeleportState.Teleporting)
                return;
            super.onActivateBegin(input);
        }
        onActivateEnd(input, activatingAction) {
            if (input.handedness !== CurrentHand) {
                CurrentHand = input.handedness;
                return;
            }
            switch (HandTeleportStatus) {
                case HandTeleportState.Idle:
                    super.onHandTeleportingBegin(input);
                    HandTeleportStatus = HandTeleportState.Teleporting;
                    break;
                case HandTeleportState.Teleporting:
                    super.onActivateEnd(input, WebVisuXRToolkit_1.InputAction.IndexPinch);
                    super.onActivateBegin(input);
                    break;
                case HandTeleportState.Cancelling:
                    this.activateEnd(input);
                    break;
                default:
                    throw new Error('HandTeleport Skill - OnActivateEnd: unknown state');
            }
        }
    }
    exports.HandTeleport = HandTeleport;
    class HandTeleportRay {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FullImmersive, WebVisuXRToolkit_1.InputAction.HandPassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        set HandTeleportSkill(value) {
            this._handTeleportSkill = value;
        }
        onActivate(input) {
            if (input.handedness !== CurrentHand)
                return;
            if (HandTeleportStatus === HandTeleportState.Teleporting)
                this._handTeleportSkill?.activate(input);
        }
        onActivateBegin(input, activatingAction) {
        }
        onActivateEnd(input, deActivatingAction) {
            if (HandTeleportStatus === HandTeleportState.Teleporting) {
                this._handTeleportSkill?.activateEnd(input);
                HandTeleportStatus = HandTeleportState.Idle;
            }
        }
        onRegisterInput(input) {
            HandTeleportStatus = HandTeleportState.Idle;
        }
        onUnregisterInput(input) {
        }
    }
    exports.HandTeleportRay = HandTeleportRay;
    // export class HandTeleportSnap implements SkillEvent<WebVisuXRToolkitHand>
    // {
    //     public bindings: Set<InputAction> = new Set([InputAction.FullImmersive, InputAction.IndexPinch]);
    //     public desiredHandedness = new Set([AbstractHandedness.Primary, AbstractHandedness.Secondary]);
    //     public onActivate(input: WebVisuXRToolkitHand): void
    //     {
    //         //angle to current targetraypose direction with z to 0 and current targertraypose with z 0 to display hints to show snap direction
    //         //Use right vector aswell in order to decide which direction the angle is going
    //         //const hand_pose = convertXRRigidTransform(input.targetRayPose.transform).translate(this.offset_cube)
    //         const thumb_tip = new THREE.Vector3().getPositionFromMatrix(input.getJoint("thumb-tip")!.getMatrixWorld())
    //         const index_tip = new THREE.Vector3().getPositionFromMatrix(input.getJoint("index-finger-tip")!.getMatrixWorld())
    //         const mid_finger_pos = thumb_tip.clone().add(index_tip).multiplyScalar(0.5)
    //         const vec = mid_finger_pos.sub(input.userData.init_mid_finger_pos)
    //         if (vec.lengthSq() > 100)
    //         {
    //             if (vec.lengthSq() > 800)
    //             {
    //                 input.userData.init_mid_finger_pos.add(vec.clone().multiplyScalar(0.01))
    //                 //const cube_mat: THREE.Matrix4 = new THREE.Matrix4().setPosition(input.userData.init_mid_finger_pos)
    //                 const headsetQuaternion = getHeadWorldMatrix().decompose()[1];
    //                 const forwardHeadset = new THREE.Vector3(0, 1, 0);
    //                 forwardHeadset.applyQuaternion(headsetQuaternion);  // Rotate the forward vector by the headset's orientation
    //                 const cube_mat: THREE.Matrix4 = makeRotationMatrix(new THREE.Vector3(0, 0, 0), forwardHeadset).setPosition(input.userData.init_mid_finger_pos)
    //                 input.userData.leftCube.setMatrix(cube_mat)
    //                 input.userData.rightCube.setMatrix(cube_mat)
    //             }
    //             const eyePos = new THREE.Vector3().getPositionFromMatrix(getHeadWorldMatrix());
    //             const forwardVec = (input.userData.init_mid_finger_pos as THREE.Vector3).clone().sub(eyePos).normalize()
    //             const rightVec = new THREE.Vector3(0, 0, 1).cross(forwardVec).normalize()
    //             const dot = rightVec.dot(vec)
    //             if (dot > 0)
    //             {
    //                 if (input.userData.isActivatingRightSnap)
    //                 {
    //                     const rightMatrixData = input.userData.rightCube.getMatrix().decompose()
    //                     input.userData.rightCube.setMatrix(new THREE.Matrix4().compose(rightMatrixData[0], rightMatrixData[1], new THREE.Vector3(1, 1, 1)))
    //                     input.userData.isActivatingRightSnap = false
    //                 }
    //                 const leftMatrixData = input.userData.leftCube.getMatrix().decompose()
    //                 input.userData.leftCube.setMatrix(new THREE.Matrix4().compose(leftMatrixData[0], leftMatrixData[1], new THREE.Vector3(2, 2, 2)))
    //                 input.userData.isActivatingLeftSnap = true
    //             }
    //             else
    //             {
    //                 if (input.userData.isActivatingLeftSnap)
    //                 {
    //                     const leftMatrixData = input.userData.leftCube.getMatrix().decompose()
    //                     input.userData.leftCube.setMatrix(new THREE.Matrix4().compose(leftMatrixData[0], leftMatrixData[1], new THREE.Vector3(1, 1, 1)))
    //                     input.userData.isActivatingLeftSnap = false
    //                 }
    //                 const rightMatrixData = input.userData.rightCube.getMatrix().decompose()
    //                 input.userData.rightCube.setMatrix(new THREE.Matrix4().compose(rightMatrixData[0], rightMatrixData[1], new THREE.Vector3(2, 2, 2)))
    //                 input.userData.isActivatingRightSnap = true
    //             }
    //         }
    //         else
    //         {
    //             if (input.userData.isActivatingLeftSnap)
    //             {
    //                 const leftMatrixData = input.userData.leftCube.getMatrix().decompose()
    //                 input.userData.leftCube.setMatrix(new THREE.Matrix4().compose(leftMatrixData[0], leftMatrixData[1], new THREE.Vector3(1, 1, 1)))
    //                 input.userData.isActivatingLeftSnap = false
    //             }
    //             if (input.userData.isActivatingRightSnap)
    //             {
    //                 const rightMatrixData = input.userData.rightCube.getMatrix().decompose()
    //                 input.userData.rightCube.setMatrix(new THREE.Matrix4().compose(rightMatrixData[0], rightMatrixData[1], new THREE.Vector3(1, 1, 1)))
    //                 input.userData.isActivatingRightSnap = false
    //             }
    //         }
    //     }
    //     public onActivateBegin(input: WebVisuXRToolkitHand, activatingAction: InputAction): void
    //     {
    //         const thumb_tip = new THREE.Vector3().getPositionFromMatrix(input.getJoint("thumb-tip")!.getMatrixWorld())
    //         const index_tip = new THREE.Vector3().getPositionFromMatrix(input.getJoint("index-finger-tip")!.getMatrixWorld())
    //         input.userData.init_mid_finger_pos = thumb_tip.clone().add(index_tip).multiplyScalar(0.5)
    //         //save init direction of targetraypose and put z to 0
    //         input.userData.rightCube.setVisibility(true);
    //         input.userData.leftCube.setVisibility(true);
    //         //const cube_mat: THREE.Matrix4 = new THREE.Matrix4().setPosition(input.userData.init_mid_finger_pos)
    //         const headsetQuaternion = getHeadWorldMatrix().decompose()[1];
    //         const backwardHeadset = new THREE.Vector3(0, 1, 0);
    //         backwardHeadset.applyQuaternion(headsetQuaternion);  // Rotate the forward vector by the headset's orientation
    //         const cube_mat: THREE.Matrix4 = makeRotationMatrix(new THREE.Vector3(0, 0, 0), backwardHeadset).setPosition(input.userData.init_mid_finger_pos)
    //         input.userData.leftCube.setMatrix(cube_mat)
    //         input.userData.rightCube.setMatrix(cube_mat)
    //     }
    //     public onActivateEnd(input: WebVisuXRToolkitHand, deActivatingAction: InputAction): void
    //     {
    //         if (deActivatingAction === InputAction.IndexPinch)
    //         {
    //             if (input.userData.isActivatingLeftSnap)
    //             {
    //                 const XRMatrix = getXRNode().getMatrix()
    //                 XRMatrix.rotateZ(15 * Math.PI / 180)
    //                 getXRNode().setMatrix(XRMatrix)
    //             }
    //             else if (input.userData.isActivatingRightSnap)
    //             {
    //                 const XRMatrix = getXRNode().getMatrix()
    //                 XRMatrix.rotateZ(-15 * Math.PI / 180)
    //                 getXRNode().setMatrix(XRMatrix)
    //             }
    //         }
    //         input.userData.rightCube.setVisibility(false);
    //         input.userData.leftCube.setVisibility(false);
    //     }
    //     public onUnregisterInput(input: WebVisuXRToolkitHand): void
    //     {
    //         getXRObjects().removeChild(input.userData.rightCube)
    //         getXRObjects().removeChild(input.userData.leftCube)
    //     }
    //     public onRegisterInput(input: WebVisuXRToolkitHand): void
    //     {
    //         const leftCubeRep = SceneGraphFactoryStatic.createCuboidNode({
    //             cornerPoint: new THREE.Vector3(-20.0, 0.0, 0.0),
    //             firstAxis: new THREE.Vector3(-50.0, 0.0, 0.0),
    //             secondAxis: new THREE.Vector3(0.0, 5.0, 0.0),
    //             thirdAxis: new THREE.Vector3(0.0, 0.0, 5.0),
    //             material: new THREE.MeshBasicMaterial({
    //                 color: 0x88bdd5
    //                 , force: true
    //             })
    //         });
    //         const rightCubeRep = SceneGraphFactoryStatic.createCuboidNode({
    //             cornerPoint: new THREE.Vector3(20.0, 0.0, 0.0),
    //             firstAxis: new THREE.Vector3(50.0, 0.0, 0.0),
    //             secondAxis: new THREE.Vector3(0.0, 5.0, 0.0),
    //             thirdAxis: new THREE.Vector3(0.0, 0.0, 5.0),
    //             material: new THREE.MeshBasicMaterial({
    //                 color: 0xc435c2
    //                 , force: true
    //             })
    //         });
    //         getXRObjects().addChild(leftCubeRep);
    //         getXRObjects().addChild(rightCubeRep);
    //         input.userData.leftCube = leftCubeRep;
    //         input.userData.rightCube = rightCubeRep;
    //         input.userData.leftCube.setVisibility(false);
    //         input.userData.rightCube.setVisibility(false);
    //     }
    // }
    class HandTeleportCancel {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FullImmersive, WebVisuXRToolkit_1.InputAction.HandPalmUp]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        set HandTeleportSkill(value) {
            this._handTeleportSkill = value;
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
            if (HandTeleportStatus === HandTeleportState.Teleporting)
                this._handTeleportSkill?.activateEnd(input);
            HandTeleportStatus = HandTeleportState.Cancelling;
        }
        onActivateEnd(input, deActivatingAction) {
            HandTeleportStatus = HandTeleportState.Idle;
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
        }
    }
    exports.HandTeleportCancel = HandTeleportCancel;
});
