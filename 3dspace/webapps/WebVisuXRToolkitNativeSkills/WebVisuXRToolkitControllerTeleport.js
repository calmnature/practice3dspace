/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitControllerTeleport"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitControllerTeleport", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/Visualization/Node3D", "DS/WebVisuGLTF/GLTFLoader", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "i18n!DS/WebVisuXRToolkit/assets/nls/WebVisuXRToolkitNativeSkills"], function (require, exports, THREE, Node3D, GLTFLoader, WebappsUtils_1, WebVisuXRToolkit_1, NLS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Teleport = exports.TeleportLineCollisionsToggle = exports.TeleportModeRadio = exports.TeleportUI = void 0;
    exports.TeleportUI = new WebVisuXRToolkit_1.HandMenuUIComponents();
    const radioTitleContainer = new WebVisuXRToolkit_1.Container("start", "row");
    radioTitleContainer.addElement(new WebVisuXRToolkit_1.Label({ text: NLS.TeleportMode }, 2));
    exports.TeleportUI.insertAtRow(0, radioTitleContainer);
    const radioContainer = new WebVisuXRToolkit_1.Container("default", "row");
    const teleportModeOptions = new Map();
    teleportModeOptions.set("Arc", { text: "Arc" });
    teleportModeOptions.set("Line", { text: "Line" });
    exports.TeleportModeRadio = new WebVisuXRToolkit_1.Radio(teleportModeOptions, "Arc");
    radioContainer.addElement(exports.TeleportModeRadio);
    exports.TeleportUI.insertAtRow(1, radioContainer);
    exports.TeleportLineCollisionsToggle = new WebVisuXRToolkit_1.Toggle("LineTeleportCollisions", true);
    const toggleContainer = new WebVisuXRToolkit_1.Container("default", "row");
    toggleContainer.addElement(exports.TeleportLineCollisionsToggle);
    exports.TeleportUI.insertAtRow(2, toggleContainer);
    function getParabolicIntersection(origin, direction) {
        const speed = 500;
        const gravity = 9.8;
        const a = -0.5 * gravity;
        const b = direction.z * speed;
        const c = origin.z - (0, WebVisuXRToolkit_1.getXRNode)().getMatrix().decompose()[0].z;
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return null;
        }
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const t1 = (-b + sqrtDiscriminant) / (2 * a);
        const t2 = (-b - sqrtDiscriminant) / (2 * a);
        const t = t1 > t2 ? t1 : t2;
        if (t < 0) {
            return null;
        }
        /*const x = origin.x + direction.x * speed * t;
        const y = origin.y + direction.y * speed * t;
        const z = origin.z + direction.z * speed * t + 0.5 * gravity * t * t;
        return new THREE.Vector3(x, y, z);*/
        //return new THREE.Vector3().addVectors(origin, direction.clone().multiplyScalar(t))
        return new THREE.Vector3(origin.x + direction.x * t * speed, origin.y + direction.y * t * speed, (0, WebVisuXRToolkit_1.getXRNode)().getMatrix().decompose()[0].z);
    }
    function ComputeFixedUpPoseFromPosAndForward(pos, forward) {
        let up = new THREE.Vector3(0.0, 0.0, 1.0);
        // for numerical stability we can't use (0,0,1) when the forward direction is close to looking into this direction; so in this case we flip the up axis to (0,1,0)
        if (Math.abs(forward.z) > 0.9)
            up = new THREE.Vector3(0.0, 1.0, 0.0);
        const right = forward.clone().cross(up);
        right.normalize();
        return new THREE.Matrix4().makeBasis(right, up.clone().cross(right), up).setPosition(pos);
    }
    function ComputePoseFromPosAndForward(pos, forward) {
        let up = new THREE.Vector3(0.0, 0.0, 1.0);
        // for numerical stability we can't use (0,0,1) when the forward direction is close to looking into this direction; so in this case we flip the up axis to (0,1,0)
        if (Math.abs(forward.z) > 0.9)
            up = new THREE.Vector3(0.0, 1.0, 0.0);
        const right = forward.clone().cross(up);
        right.normalize();
        up = right.clone().cross(forward);
        up.normalize();
        return new THREE.Matrix4().makeBasis(right, forward, up).setPosition(pos);
    }
    class Teleport extends EventTarget {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FullImmersive, WebVisuXRToolkit_1.InputAction.JoystickTouch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this.onPinchHandRotationY = 0;
            this._teleportationMarker = new Node3D();
            this._teleportLaserNode = null;
            this._laserMaterial = new THREE.MeshBasicMaterial({ force: true, color: 0xff0000 });
            this._iconindicators = new Map();
            this._timeCounter = 0.0;
            this._rotateAngle = 0;
            this._isTiltingForward = false;
            this._hasCompletedSnapping = false;
            this._hasStartedTeleporting = false;
            this._hasStartedSnapping = false;
        }
        initLaserRay() {
            const loader = new GLTFLoader();
            loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/TeleportTargetMarker.glb")).then(marker => {
                this._teleportationMarker.addChild(marker);
                this._teleportationMarker.setVisibility(false);
            });
            this._laserMaterial.activatePDSFX("LaserRay");
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(this._teleportationMarker);
            const myUniforms = {
                "end_position": { type: "v3", value: new THREE.Vector3() },
                "mode": { type: "f", value: 0.0 },
                "time": { type: "f", value: 0.5 },
            };
            this._laserMaterial.setPDSFXUniforms(myUniforms);
            const myVaryings = {
                "v_x": { type: "f" },
                "v_local_dist": { type: "f" }
            };
            this._laserMaterial.setPDSFXVaryings(myVaryings);
            const overridenFunctions_VS = {
                ComputeObjectPosition: function (pdsfxSB, args) {
                    const getU = (name) => pdsfxSB.getUniform(name);
                    const getV = (name) => pdsfxSB.getVarying(name);
                    const vH = pdsfxSB.variableHandler;
                    const float = (name = null) => vH.float(name);
                    const vec3 = (name = null) => vH.vec3(name);
                    const pc = '1.0';
                    // JBN10: No global declarations in entry points! Use setPDSFXGlobalShaderCode for those
                    return `
                    ${vec3('pos')}  = ${pdsfxSB.vGetAttribPosition()};
                    ${getV('v_x')} = pos.x;
                    ${float('t')} = pos.z; // interpolation parameter in local coordinates
                    if(${getU('mode')} == 0.0)
                    {
                        // Standard Quadratic Bézier Curve but p0 == 0.0 as we always start from the aim pose in local coordinates
                        pos.y = 2.0*(1.0-t)*t*${pc} + t*t*${getU('end_position')}.z;
                    }

                    pos.z = t * ${getU('end_position')}.y;

                    ${getV('v_local_dist')} = 2.0 * (1.0 - t) * ${pc} + 2.0 * t * (${getU('end_position')}.z - ${pc});

                    return pos;
                `;
                },
            };
            const overridenFunctions_FS = {
                ProcessFinalColor: function (pdsfxSB, args) {
                    const vH = pdsfxSB.variableHandler;
                    const getU = (name) => pdsfxSB.getUniform(name);
                    const getV = (name) => pdsfxSB.getVarying(name);
                    const ioFinalColor = vH.dereference(args[0]);
                    const float = (name = null) => vH.float(name);
                    const vec4 = (name = null) => vH.vec4(name);
                    return `
                    ${float('t')} = 1.0 - fract(${getV('v_local_dist')} * 8.0 + ${getU('time')});
                    
                    // Note: for some reason at the moment the range of v_x is always between -0.015 and 0.015
                    // It might be broken if something which does affect the vGetAttribPosition is changed
                    ${float('xMin')}  = -0.015;
                    ${float('xMax')}  =  0.015;
                    ${float('length')}  = xMax - xMin; 
                    ${float('normalizedX')}   = (${getV('v_x')} - xMin) / length;
                    if(!(normalizedX  > t && normalizedX  < (1.0 - t))) 
                    {
                        discard;
                    }
                    //finalColor = vec4(t, t, t, 1.0);
                    ${ioFinalColor} = ${vec4()}(0.0, 0.6235, 0.8706, 1.0);
                `;
                },
            };
            this._laserMaterial.setPDSFXOverridableFunctions(overridenFunctions_VS, overridenFunctions_FS);
            loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/TeleportLaser.glb")).then(laser => {
                this._teleportLaserNode = laser;
                this._teleportLaserNode.setMaterial(this._laserMaterial);
                (0, WebVisuXRToolkit_1.getXRObjects)().addChild(this._teleportLaserNode);
                this._teleportLaserNode.setVisibility(false);
                this._teleportLaserNode.forceBoundingElements(true, { sphere: new THREE.Sphere(undefined, 2000) }, {});
            });
        }
        updateLaserRay(input, targetRayWorldMatrix, dt) {
            const teleportMode = exports.TeleportModeRadio.value;
            const origin = new THREE.Vector3();
            const orientation = new THREE.Quaternion();
            targetRayWorldMatrix.decompose(origin, orientation, undefined);
            const forward = new THREE.Vector3(0, 1, 0).applyQuaternion(orientation);
            const pose = teleportMode === NLS.TeleportArc ? ComputePoseFromPosAndForward(origin, forward) /* align to ground */ : targetRayWorldMatrix;
            this._teleportLaserNode.setMatrix(pose);
            const matData = pose.decompose();
            let targetPos = null;
            if (teleportMode === 'Line') {
                (0, WebVisuXRToolkit_1.getViewer)().getRootNode().removeChild((0, WebVisuXRToolkit_1.getXRObjects)());
                const sceneBoundingSphere = (0, WebVisuXRToolkit_1.getViewer)().getRootNode().getBoundingSphere();
                (0, WebVisuXRToolkit_1.getViewer)().getRootNode().addChild((0, WebVisuXRToolkit_1.getXRObjects)());
                const tfar = sceneBoundingSphere.distanceToPoint(origin) + sceneBoundingSphere.radius;
                targetPos = origin.clone().add(forward.clone().multiplyScalar(tfar));
                if (exports.TeleportLineCollisionsToggle.value) {
                    const raycast_results = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, "prim");
                    if (raycast_results.length > 0) {
                        targetPos = raycast_results[0].point;
                        input.userData.hasHitanObject = raycast_results[0];
                    }
                }
            }
            else {
                targetPos = getParabolicIntersection(matData[0], new THREE.Vector3(0, 1, 0).applyQuaternion(matData[1]));
            }
            if (targetPos) {
                const fixedForward = Math.abs(forward.z) > 0.899 ? new THREE.Vector3(0, 0, -1).applyQuaternion(matData[1]) : forward;
                const targetMatrix = ComputeFixedUpPoseFromPosAndForward(targetPos, fixedForward);
                if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitController) {
                    if (input.joystickAxes[2] !== 0 && input.joystickAxes[3] !== 0) {
                        this._rotateAngle = Math.atan2(-input.joystickAxes[2], -input.joystickAxes[3]);
                    }
                    targetMatrix.rotateZ(this._rotateAngle);
                }
                else {
                    const mul = 3;
                    let angle = 0;
                    if (this.currentPinchHandRotationY !== undefined)
                        angle = (this.currentPinchHandRotationY - this.onPinchHandRotationY) * mul;
                    targetMatrix.rotateZ(angle);
                }
                this._teleportationMarker.setMatrix(targetMatrix);
                this._timeCounter += dt;
                this._laserMaterial.updatePDSFXUniform("time", this._timeCounter);
                const end_position_in_controller_space = targetPos.clone().applyMatrix4(new THREE.Matrix4().getInverse(pose)).multiplyScalar(1.0 / 1000);
                this._laserMaterial.updatePDSFXUniform("end_position", end_position_in_controller_space);
                this._laserMaterial.updatePDSFXUniform("mode", teleportMode === NLS.TeleportArc ? 0.0 : 1.0);
            }
        }
        onHandTeleportingBegin(input) {
            // this one value express the local rotation of Y in a convenient way
            const localY = new THREE.Matrix4().extractRotation(input.getMatrix()).elements[2];
            this.onPinchHandRotationY = localY;
        }
        handleTeleportAction(input) {
            if (input.targetRayWorldMatrix) {
                if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitHand) {
                    const localY = new THREE.Matrix4().extractRotation(input.getMatrix()).elements[2];
                    this.currentPinchHandRotationY = localY;
                }
                else {
                    const joystickX = input.joystickAxes[2];
                    const joystickY = input.joystickAxes[3];
                    const angle = angleDirection(joystickX, joystickY);
                    if (angle > 260 && angle < 280) {
                        // tilt forward
                        if (this._isTiltingForward === false) {
                            this._isTiltingForward = true;
                            this.cleanupIcons(input);
                            this.activateIcon(input, "skill_teleport_active", "thumbstick/north");
                            this.activateIcon(input, "skill_teleport_rotate_target_left_idle", "thumbstick/west");
                            this.activateIcon(input, "skill_teleport_rotate_target_back_idle", "thumbstick/south");
                            this.activateIcon(input, "skill_teleport_rotate_target_right_idle", "thumbstick/east");
                        }
                    }
                    else if (this._isTiltingForward) {
                        //rotating
                        this._isTiltingForward = false;
                        this.cleanupIcons(input);
                        this.activateIcon(input, "skill_teleport_active", "thumbstick/north");
                        this.activateIcon(input, "skill_teleport_rotate_target_left_active", "thumbstick/west");
                        this.activateIcon(input, "skill_teleport_rotate_target_back_active", "thumbstick/south");
                        this.activateIcon(input, "skill_teleport_rotate_target_right_active", "thumbstick/east");
                    }
                }
                this._teleportationMarker.setVisibility(true);
                this._teleportLaserNode.setVisibility(true);
                this.updateLaserRay(input, input.targetRayWorldMatrix, (0, WebVisuXRToolkit_1.getDeltaTime)());
            }
        }
        handleSnapRotationAction(input) {
            const joystickX = input.joystickAxes[2];
            if (joystickX > -0.5 && joystickX < 0.5) {
                if (joystickX > -0.1 && joystickX < 0.1) {
                    this._hasStartedSnapping = false;
                    this.cleanupIcons(input);
                    this.activateIcon(input, "skill_teleport_stepturn_navigation_overview", "thumbstick/center");
                }
                this._hasCompletedSnapping = false;
            }
            if (!this._hasCompletedSnapping) {
                if (joystickX > 0.5) {
                    this._hasCompletedSnapping = true;
                    const XRMatrix = (0, WebVisuXRToolkit_1.getXRNode)().getMatrix();
                    XRMatrix.rotateZ(-15 * Math.PI / 180);
                    (0, WebVisuXRToolkit_1.getXRNode)().setMatrix(XRMatrix);
                }
                else if (joystickX < -0.5) {
                    this._hasCompletedSnapping = true;
                    const XRMatrix = (0, WebVisuXRToolkit_1.getXRNode)().getMatrix();
                    XRMatrix.rotateZ(15 * Math.PI / 180);
                    (0, WebVisuXRToolkit_1.getXRNode)().setMatrix(XRMatrix);
                }
            }
        }
        onActivate(input) {
            if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitHand) {
                this.handleTeleportAction(input);
                this._teleportationMarker.setVisibility(true);
                this._teleportLaserNode.setVisibility(true);
            }
            else {
                if (this._hasStartedTeleporting) {
                    this.handleTeleportAction(input);
                    if (input.targetRayWorldMatrix) {
                        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(input.targetRayWorldMatrix.decompose()[1]);
                        if (up.z > 0.9) {
                            this._teleportationMarker.setVisibility(false);
                            this._teleportLaserNode.setVisibility(false);
                            this._hasStartedTeleporting = false;
                        }
                    }
                }
                else if (this._hasStartedSnapping) {
                    this.handleSnapRotationAction(input);
                }
                else {
                    const joystickX = input.joystickAxes[2];
                    const joystickY = input.joystickAxes[3];
                    const absX = Math.abs(joystickX);
                    const absY = Math.abs(joystickY);
                    // Determine the dominant movement direction
                    if (absX > absY) {
                        if (joystickX < -0.1) {
                            this._hasStartedSnapping = true;
                            this.cleanupIcons(input);
                            this.activateIcon(input, "skill_teleport_idle", "thumbstick/north");
                            this.activateIcon(input, "skill_fly_navigation_turn_left_active", "thumbstick/west");
                            this.activateIcon(input, "skill_fly_navigation_turn_right_idle", "thumbstick/east");
                        }
                        else if (joystickX > 0.1) {
                            this._hasStartedSnapping = true;
                            this.cleanupIcons(input);
                            this.activateIcon(input, "skill_teleport_idle", "thumbstick/north");
                            this.activateIcon(input, "skill_fly_navigation_turn_left_idle", "thumbstick/west");
                            this.activateIcon(input, "skill_fly_navigation_turn_right_active", "thumbstick/east");
                        }
                    }
                    else if (absY > absX) {
                        if (joystickY < -0.1) {
                            this._hasStartedTeleporting = true;
                            this._teleportationMarker.setVisibility(true);
                            this._teleportLaserNode.setVisibility(true);
                        }
                    }
                }
            }
        }
        onActivateBegin(input) {
            if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitController) {
                this.cleanupIcons(input);
                this.activateIcon(input, "skill_teleport_stepturn_navigation_overview", "thumbstick/center");
            }
        }
        onActivateEnd(input, deActivatingAction) {
            if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitController) {
                this.cleanupIcons(input);
                this.activateIcon(input, "skill_teleport_stepturn_navigation_overview", "thumbstick/center");
                this._hasStartedSnapping = false;
                this._hasStartedTeleporting = false;
                this._hasCompletedSnapping = false;
            }
            if (this._teleportationMarker.isVisible() && deActivatingAction !== WebVisuXRToolkit_1.InputAction.FullImmersive && deActivatingAction !== WebVisuXRToolkit_1.InputAction.HandPalmUp) {
                const teleportMode = exports.TeleportModeRadio.value;
                //const markerDec = this._teleportationMarker.getMatrixWorld().decompose();
                const markerDec = this._teleportationMarker.getMatrix().decompose();
                const aimedPos = markerDec[0];
                const rot = markerDec[1];
                if (teleportMode === "Line" && input.userData.hasHitanObject) {
                    const normal = input.userData.hasHitanObject.normal.clone().normalize();
                    // Define reference directions
                    const up = new THREE.Vector3(0, 0, 1); // World up
                    const down = new THREE.Vector3(0, 0, -1); // World down
                    // Compute alignment with world axes
                    const dotUp = normal.dot(up);
                    const dotDown = normal.dot(down);
                    // Tolerance thresholds
                    const FLOOR_THRESHOLD = 0.7; // cos(45°)
                    const CEILING_THRESHOLD = 0.7; // cos(45°)
                    // Determine surface type
                    if (dotUp > FLOOR_THRESHOLD) {
                        // Surface is facing upward → floor
                        (0, WebVisuXRToolkit_1.buildXRNodeMatrix)(aimedPos, rot, true);
                    }
                    else if (dotDown > CEILING_THRESHOLD) {
                        (0, WebVisuXRToolkit_1.buildXRNodeMatrix)(aimedPos.add(new THREE.Vector3(0, 0, -(0, WebVisuXRToolkit_1.getHeadMatrix)().decompose()[0].z - 50)), rot, true);
                    }
                    else { // wall
                        const inputPos = input.getMatrix().decompose()[0].setZ(0);
                        const headsetPos = (0, WebVisuXRToolkit_1.getHeadMatrix)().decompose()[0].setZ(0);
                        const distance = inputPos.distanceTo(headsetPos);
                        const vec = (0, WebVisuXRToolkit_1.getXRNode)().getMatrixWorld().decompose()[0].setZ(0).sub(aimedPos.clone().setZ(0)).normalize().multiplyScalar(distance * 1.25);
                        (0, WebVisuXRToolkit_1.buildXRNodeMatrix)(aimedPos.add(vec).add(new THREE.Vector3(0, 0, -(0, WebVisuXRToolkit_1.getHeadMatrix)().decompose()[0].z)), rot, true);
                    }
                }
                else {
                    (0, WebVisuXRToolkit_1.buildXRNodeMatrix)(aimedPos, rot, true);
                }
                this.dispatchEvent(new CustomEvent("TeleportationDone", { detail: { position: aimedPos } }));
            }
            this._teleportationMarker.setVisibility(false);
            this._teleportLaserNode.setVisibility(false);
        }
        onUnregisterInput(input) {
            this._teleportationMarker.removeChildren();
            if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitController) {
                input.removeLabelIndicator("thumbstick/center");
                input.removeIconIndicator("thumbstick/center");
                this.cleanupIcons(input);
            }
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(this._teleportationMarker);
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(this._teleportLaserNode);
        }
        activateIcon(input, icon, attachment) {
            const _icon = this._iconindicators.get(icon);
            input.addIconIndicator(_icon[0], attachment);
            _icon[1] = attachment;
            this._iconindicators.set(icon, _icon);
        }
        cleanupIcons(input) {
            for (const el of this._iconindicators) {
                if (el[1][1] !== undefined) {
                    input.removeIconIndicator(el[1][1]);
                }
            }
        }
        onRegisterInput(input) {
            this.initLaserRay();
            if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitController) {
                input.addLabelIndicator(this._labelIndicator, "thumbstick/center");
                this.activateIcon(input, "skill_teleport_stepturn_navigation_overview", "thumbstick/center");
            }
        }
        initialize() {
            this._labelIndicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.TeleportName);
            this._iconindicators.set("skill_teleport_stepturn_navigation_overview", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_stepturn_navigation_overview.png")), undefined]);
            this._iconindicators.set("skill_teleport_active", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_active.png")), undefined]);
            this._iconindicators.set("skill_teleport_rotate_target_left_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_rotate_target_left_idle.png")), undefined]);
            this._iconindicators.set("skill_teleport_rotate_target_back_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_rotate_target_back_idle.png")), undefined]);
            this._iconindicators.set("skill_teleport_rotate_target_right_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_rotate_target_right_idle.png")), undefined]);
            this._iconindicators.set("skill_teleport_rotate_target_left_active", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_rotate_target_left_active.png")), undefined]);
            this._iconindicators.set("skill_teleport_rotate_target_back_active", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_rotate_target_back_active.png")), undefined]);
            this._iconindicators.set("skill_teleport_rotate_target_right_active", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_rotate_target_right_active.png")), undefined]);
            this._iconindicators.set("skill_teleport_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_teleport_idle.png")), undefined]);
            this._iconindicators.set("skill_fly_navigation_turn_left_active", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_turn_left_active.png")), undefined]);
            this._iconindicators.set("skill_fly_navigation_turn_left_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_turn_left_idle.png")), undefined]);
            this._iconindicators.set("skill_fly_navigation_turn_right_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_turn_right_idle.png")), undefined]);
            this._iconindicators.set("skill_fly_navigation_turn_right_active", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_turn_right_active.png")), undefined]);
        }
    }
    exports.Teleport = Teleport;
    function angleDirection(x, y) {
        // Calculate angle in radians using arctangent
        const angleRadians = Math.atan2(y, x);
        // Convert radians to degrees
        let angleDegrees = (angleRadians * 180) / Math.PI;
        // Adjust angle to be positive (in range [0, 360))
        if (angleDegrees < 0) {
            angleDegrees += 360;
        }
        return angleDegrees;
    }
});
