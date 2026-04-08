"use strict";
/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitHandFlyNav"/>
// import THREE = require('DS/Visualization/ThreeJS_DS')
// import * as WebVisuXRToolkit from "DS/WebVisuXRToolkit/WebVisuXRToolkit";
// import { FlySpeedSlider } from './WebVisuXRToolkitControllerFlyNav';
// export class HandFlyNavLocomotion implements WebVisuXRToolkit.SkillEvent<WebVisuXRToolkit.WebVisuXRToolkitHand>
// {
//     public bindings: Set<WebVisuXRToolkit.InputAction> = new Set([WebVisuXRToolkit.InputAction.GunHand]);
//     public desiredHandedness: Set<WebVisuXRToolkit.AbstractHandedness> = new Set([WebVisuXRToolkit.AbstractHandedness.Primary, WebVisuXRToolkit.AbstractHandedness.Secondary]);
//     public onActivate(input: WebVisuXRToolkit.WebVisuXRToolkitHand): void
//     {
//         const raycastForward = new THREE.Vector3().getPositionFromMatrix(input.getJoint("index-finger-tip")!.getMatrix())
//             .sub(new THREE.Vector3().getPositionFromMatrix(input.getJoint("index-finger-phalanx-proximal")!.getMatrix()))
//             .normalize()
//         const thumbVector = new THREE.Vector3().getPositionFromMatrix(input.getJoint("thumb-tip")!.getMatrix())
//             .sub(new THREE.Vector3().getPositionFromMatrix(input.getJoint("thumb-phalanx-proximal")!.getMatrix()))
//             .normalize()
//         const speed = raycastForward.dot(thumbVector) * FlySpeedSlider.value;
//         const XRNodeOrientation = new THREE.Quaternion().setFromRotationMatrix(WebVisuXRToolkit.getXRNode().getMatrix())
//         raycastForward.applyQuaternion(XRNodeOrientation).normalize();
//         const dot = raycastForward.dot(new THREE.Vector3(0, 0, 1))
//         if (dot > 0.8 || dot < -0.8)
//         {
//             raycastForward.set(0, 0, dot).normalize();
//         }
//         else
//         {
//             raycastForward.z = 0;
//             raycastForward.normalize();
//         }
//         const movementVector = raycastForward.multiplyScalar(speed)
//         const position = new THREE.Vector3().getPositionFromMatrix(WebVisuXRToolkit.getXRNode().getMatrix()).add(movementVector);
//         WebVisuXRToolkit.getXRNode().setMatrix(WebVisuXRToolkit.getXRNode().getMatrix().setPosition(position))
//     }
//     public onActivateBegin(input: WebVisuXRToolkit.WebVisuXRToolkitHand, activatingAction: WebVisuXRToolkit.InputAction): void
//     {
//     }
//     public onActivateEnd(input: WebVisuXRToolkit.WebVisuXRToolkitHand, deActivatingAction: WebVisuXRToolkit.InputAction): void
//     {
//     }
//     public onUnregisterInput(input: WebVisuXRToolkit.WebVisuXRToolkitHand): void
//     {
//     }
//     public onRegisterInput(input: WebVisuXRToolkit.WebVisuXRToolkitHand): void
//     {
//     }
// }
// export class HandFlyNavSnap implements WebVisuXRToolkit.SkillEvent<WebVisuXRToolkit.WebVisuXRToolkitHand>
// {
//     public bindings: Set<WebVisuXRToolkit.InputAction> = new Set([WebVisuXRToolkit.InputAction.IndexPinch]);
//     public desiredHandedness: Set<WebVisuXRToolkit.AbstractHandedness> = new Set([WebVisuXRToolkit.AbstractHandedness.Primary, WebVisuXRToolkit.AbstractHandedness.Secondary]);
//     public onActivate(input: WebVisuXRToolkit.WebVisuXRToolkitHand): void { }
//     public onActivateBegin(input: WebVisuXRToolkit.WebVisuXRToolkitHand, activatingAction: WebVisuXRToolkit.InputAction): void { }
//     public onActivateEnd(input: WebVisuXRToolkit.WebVisuXRToolkitHand, deActivatingAction: WebVisuXRToolkit.InputAction): void
//     {
//         const XRMatrix = WebVisuXRToolkit.getXRNode().getMatrix()
//         if (input.handedness === WebVisuXRToolkit.InputHandedness.Left)
//         {
//             XRMatrix.rotateZ(15 * Math.PI / 180)
//         }
//         else if (input.handedness === WebVisuXRToolkit.InputHandedness.Right)
//         {
//             XRMatrix.rotateZ(-15 * Math.PI / 180)
//         }
//         WebVisuXRToolkit.getXRNode().setMatrix(XRMatrix)
//     }
//     public onUnregisterInput(input: WebVisuXRToolkit.WebVisuXRToolkitHand): void { }
//     public onRegisterInput(input: WebVisuXRToolkit.WebVisuXRToolkitHand): void { }
// }
