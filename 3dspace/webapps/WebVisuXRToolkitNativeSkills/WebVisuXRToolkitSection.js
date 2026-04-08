/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitSection"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitSection", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "i18n!DS/WebVisuXRToolkit/assets/nls/WebVisuXRToolkitNativeSkills", "DS/Visualization/Node3D", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/WebappsUtils/WebappsUtils"], function (require, exports, THREE, WebVisuXRToolkit_1, NLS, Node3D, SceneGraphFactoryStatic, WebVisuXRToolkitManager_1, WebVisuXRToolkitConfigManager, WebappsUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ControllerSectionNudge = exports.HandSectionLock = exports.ControllerSectionLock = exports.HandSection = exports.ControllerSectionInvert = exports.SectionSkill = exports.SectionUI = void 0;
    const collabLeaderPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
    let iscollabLeaderPlaneActive = false;
    WebVisuXRToolkitConfigManager.instance.addEventListener("WebVisuXRToolkitSessionStarted", () => {
        if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
            (0, WebVisuXRToolkit_1.collab_subscribeToMsgChannel)("setSectionPlaneActivate", onActivate);
            (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("updateLeaderPlaneMatrix", onUpdateLeaderPlaneMatrix);
            (0, WebVisuXRToolkit_1.collab_addOnLeaderChangeCallback)((_, __) => {
                setSectionPlaneActive(collabLeaderPlane, false);
                iscollabLeaderPlaneActive = false;
            });
        }
    });
    function onActivate(from, msg) {
        const data = JSON.parse(msg);
        if (data.visible) {
            setSectionPlaneActive(collabLeaderPlane, true);
            iscollabLeaderPlaneActive = true;
        }
        else {
            setSectionPlaneActive(collabLeaderPlane, false);
            iscollabLeaderPlaneActive = false;
        }
    }
    function onUpdateLeaderPlaneMatrix(from, msg) {
        const elements = new Float32Array(msg, 0, 6);
        const point = new THREE.Vector3(elements[0], elements[1], elements[2]);
        const normal = new THREE.Vector3(elements[3], elements[4], elements[5]);
        collabLeaderPlane.setFromNormalAndCoplanarPoint(normal, point);
        if (iscollabLeaderPlaneActive === false) {
            setSectionPlaneActive(collabLeaderPlane, true);
            iscollabLeaderPlaneActive = true;
        }
    }
    exports.SectionUI = new WebVisuXRToolkit_1.HandMenuUIComponents();
    const cappingToggle = new WebVisuXRToolkit_1.Toggle(NLS.SectionCappingEnabeled, true);
    const lockAnimationToggle = new WebVisuXRToolkit_1.Toggle(NLS.SectionLockAnimationEnabeled, true);
    exports.SectionUI.insertAtRow(0, new WebVisuXRToolkit_1.Container("default", "row", [cappingToggle]));
    exports.SectionUI.insertAtRow(1, new WebVisuXRToolkit_1.Container("default", "row", [lockAnimationToggle]));
    exports.SectionUI.insertAtRow(2, new WebVisuXRToolkit_1.Container("default", "row", [new WebVisuXRToolkit_1.Button(() => { InvertPlaneNormal(); }, { text: "Invert plane Direction" })]));
    function createPlane() {
        const material = new THREE.MeshBasicMaterial({
            color: "aqua",
            force: true
        });
        const planeNode = SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREE.Vector3(-50, -50, 0.0),
            firstAxis: new THREE.Vector3(100, 0.0, 0.0),
            secondAxis: new THREE.Vector3(0.0, 100, 0.0),
            thirdAxis: new THREE.Vector3(0.0, 0.0, 0.1),
            material: material,
            fill: false
        });
        planeNode.setName("sectionVisiblePlane");
        return planeNode;
    }
    function createLaserCube() {
        const material = new THREE.MeshBasicMaterial({
            color: "aqua",
            force: true
        });
        const cubeRep = SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREE.Vector3(-0.5, 0.0, -0.5),
            firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
            secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
            thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
            material: material
        });
        cubeRep.name = "Section laser";
        laser = cubeRep;
        if (!anchorVisiblePlane) {
            console.warn("Section: anchorVisiblePlane undefined on laser generation");
            return;
        }
        anchorVisiblePlane.addChild(laser);
        cubeRep.setMatrix(new THREE.Matrix4().compose(new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), new THREE.Vector3(1, 1000000, 1)));
    }
    function createDirectionCone() {
        const material = new THREE.MeshBasicMaterial({
            color: "aqua",
            force: true
        });
        const coneRep = SceneGraphFactoryStatic.createConeNode({
            bottomCenterPoint: new THREE.Vector3(0.0, 0.0, -10.0),
            topCenterPoint: new THREE.Vector3(0.0, 0.0, -30.0),
            bottomRadius: 5,
            topRadius: 0,
            sag: 4,
            material: material
        });
        coneRep.name = "Section Direction Laser";
        directionCone = coneRep;
        if (!visiblePlane) {
            console.warn("Section: visiblePlane undefined on Direction Cone generation");
            return;
        }
        visiblePlane.addChild(directionCone);
    }
    let sectionPlane;
    let anchorVisiblePlane;
    let visiblePlane;
    let laser;
    let directionCone;
    let sectionLocked = false;
    let sectionNormalInverted = false;
    const _iconindicators = new Map();
    function cleanupIcons(input) {
        for (const el of _iconindicators) {
            if (el[1][1] !== undefined)
                input.removeIconIndicator(el[1][1]);
        }
    }
    function setSectionPlaneActive(thisSectionPlane, active) {
        const root = (0, WebVisuXRToolkit_1.getViewer)().getRootNode();
        root.removeChild((0, WebVisuXRToolkit_1.getXRObjects)());
        const childrens = root.getChildren();
        root.addChild((0, WebVisuXRToolkit_1.getXRObjects)());
        childrens.forEach(Node => {
            if (Node === root)
                return; // recursive root to ignore
            Node.enableClippingPlane(thisSectionPlane, active);
        });
    }
    function InvertPlaneNormal() {
        if (sectionLocked)
            sectionPlane?.negate();
        if (directionCone)
            directionCone.setMatrix(directionCone.getMatrix().rotateY(Math.PI));
        sectionNormalInverted = !sectionNormalInverted;
    }
    function setSectionPlane() {
        if (!visiblePlane || !sectionPlane)
            return;
        const matDec = visiblePlane.getMatrixWorld().decompose();
        const handOrientation = matDec[1];
        const handDownVector = new THREE.Vector3(0, 0, sectionNormalInverted ? 1 : -1).applyQuaternion(handOrientation).normalize();
        sectionPlane.setFromNormalAndCoplanarPoint(handDownVector, matDec[0]);
        if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
            if ((0, WebVisuXRToolkit_1.collab_getSessionLeaderID)() === (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id) {
                const buffer = new Uint8Array(6 * 4);
                buffer.set(new Uint8Array(new Float32Array([matDec[0].x, matDec[0].y, matDec[0].z]).buffer), 0);
                buffer.set(new Uint8Array(new Float32Array([handDownVector.x, handDownVector.y, handDownVector.z]).buffer), 12);
                (0, WebVisuXRToolkit_1.collab_updateChannelData)("updateLeaderPlaneMatrix", buffer.buffer);
            }
        }
    }
    /**
     *
     * @param position increment by which position should be shiften along normal axis, positive follows normal direction and negative the oppposite
     */
    function NudgePlane(position) {
        if (!sectionPlane)
            return;
        // if section plane normal is facing down, multip position by -1
        const facing_down = sectionPlane.normal.dot(new THREE.Vector3(0, 0, -1)) > 0.2 ? -1 : 1;
        const normal_direction = sectionNormalInverted ? -1 : 1;
        visiblePlane?.translateZ(position * normal_direction * facing_down);
        setSectionPlane();
    }
    const VISIBLE_PLANE_BASE_X_ROTATION = 1.7; // in rad
    const VISIBLE_PLANE_ANCHOR_OFFSET = new THREE.Vector3(0, 100, -100);
    // Visible Section Plane rescale coeff
    const RATIO_BOUND_SCALE = 0.015;
    const MIN_SCALE = 1;
    const MAX_SCALE = 15;
    const CONTROLLER_NUDGE_SPEED = 10;
    const TRANSITION_DURATION = 1; // in seconds
    class SectionSkill extends EventTarget {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.ControllerPassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivate(input) {
            if (!visiblePlane || !sectionPlane || !anchorVisiblePlane || !laser)
                return;
            if (!sectionLocked)
                setSectionPlane();
        }
        onActivateBegin(input) {
            (0, WebVisuXRToolkit_1.getViewer)().setSectionCapping(cappingToggle.value);
            if (sectionLocked)
                return;
            visiblePlane?.setVisibility(true);
            laser?.setVisibility(true);
        }
        onActivateEnd(input) {
            if (sectionLocked)
                return;
            visiblePlane?.setVisibility(false);
            laser?.setVisibility(false);
        }
        onRegisterInput(input) {
            if (!visiblePlane)
                visiblePlane = createPlane();
            if (!anchorVisiblePlane)
                anchorVisiblePlane = new Node3D("anchorVisiblePlane");
            input.model.addChild(anchorVisiblePlane);
            const rota = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * VISIBLE_PLANE_BASE_X_ROTATION);
            anchorVisiblePlane.setMatrix(new THREE.Matrix4().compose(VISIBLE_PLANE_ANCHOR_OFFSET, rota, new THREE.Vector3(1, 1, 1)));
            if (sectionLocked) {
                WebVisuXRToolkitConfigManager.instance.removeEventListener("XRSessionEnded", this.ResetSkill);
                return;
            }
            // else
            createLaserCube();
            createDirectionCone();
            anchorVisiblePlane.addChild(visiblePlane);
            if (!sectionPlane)
                sectionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
            (0, WebVisuXRToolkit_1.getViewer)().setSectionCappingMaterial(sectionPlane, "#00f2ffff");
            setSectionPlaneActive(sectionPlane, true);
            if (WebVisuXRToolkitConfigManager.instance.clientInstance && (0, WebVisuXRToolkit_1.collab_getSessionLeaderID)() === (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setSectionPlaneActivate", JSON.stringify({ "visible": true }));
            }
        }
        ResetSkill() {
            if (sectionPlane)
                setSectionPlaneActive(sectionPlane, false);
            sectionLocked = false;
            sectionPlane = undefined;
            visiblePlane = undefined;
            laser = undefined;
            anchorVisiblePlane = undefined;
        }
        onUnregisterInput(input) {
            if (!visiblePlane || !sectionPlane)
                return;
            if (anchorVisiblePlane)
                input.model.removeChild(anchorVisiblePlane);
            laser?.setVisibility(false);
            if (sectionLocked) {
                WebVisuXRToolkitConfigManager.instance.addEventListener("XRSessionEnded", this.ResetSkill);
                return;
            }
            setSectionPlaneActive(sectionPlane, false);
            if (WebVisuXRToolkitConfigManager.instance.clientInstance && (0, WebVisuXRToolkit_1.collab_getSessionLeaderID)() === (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setSectionPlaneActivate", JSON.stringify({ "visible": false }));
            }
            this.ResetSkill();
        }
    }
    exports.SectionSkill = SectionSkill;
    class ControllerSectionInvert extends EventTarget {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FirstButtonPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
            InvertPlaneNormal();
        }
        onActivateEnd(input, deActivatingAction) {
        }
        onRegisterInput(input) {
            input.addLabelIndicator(this._firstbuttonindicator, "lower_button/center");
        }
        onUnregisterInput(input) {
            input.removeLabelIndicator("lower_button/center");
        }
        initialize() {
            this._firstbuttonindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.SectionInvertLabel);
        }
    }
    exports.ControllerSectionInvert = ControllerSectionInvert;
    class HandSection extends SectionSkill {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.HandPassive]);
            this.baseXRotation = 1; // in rad
        }
    }
    exports.HandSection = HandSection;
    class SectionLockSkill extends EventTarget {
        constructor() {
            super(...arguments);
            this.bindings = new Set();
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this.isTransitioning = false;
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
        }
        async transition(startTransform, endTransform) {
            if (!visiblePlane)
                return;
            const startPosition = new THREE.Vector3();
            const startQuaternion = new THREE.Quaternion();
            const startScale = new THREE.Vector3();
            const endPosition = new THREE.Vector3();
            const endQuaternion = new THREE.Quaternion();
            const endScale = new THREE.Vector3();
            startTransform.decompose(startPosition, startQuaternion, startScale);
            endTransform.decompose(endPosition, endQuaternion, endScale);
            let currentTime = 0;
            const interval = 16; // Approximately 60 frames per second
            const animate = () => {
                currentTime += (0, WebVisuXRToolkit_1.getDeltaTime)();
                const t = Math.min(currentTime / TRANSITION_DURATION, 1);
                const position = startPosition.lerp(endPosition, t);
                const quaternion = startQuaternion.slerp(endQuaternion, t);
                const scale = startScale.lerp(endScale, t);
                // Apply the interpolated position and rotation to the plane object
                visiblePlane?.setMatrix(new THREE.Matrix4().compose(position, quaternion, scale));
                if (t < 1)
                    setTimeout(animate, interval);
                else
                    this.isTransitioning = false;
            };
            setTimeout(animate, interval);
        }
        async transitionNodeToNode(startTransform, endTransform) {
            if (!visiblePlane)
                return;
            const startPosition = new THREE.Vector3();
            const startQuaternion = new THREE.Quaternion();
            const startScale = new THREE.Vector3();
            const endPosition = new THREE.Vector3();
            const endQuaternion = new THREE.Quaternion();
            const endScale = new THREE.Vector3();
            startTransform.decompose(startPosition, startQuaternion, startScale);
            endTransform.decompose(endPosition, endQuaternion, endScale);
            let currentTime = 0;
            const animate = () => {
                currentTime += (0, WebVisuXRToolkit_1.getDeltaTime)();
                const t = Math.min(currentTime / TRANSITION_DURATION, 1);
                const position = startPosition.lerp(endPosition, t);
                const quaternion = startQuaternion.slerp(endQuaternion, t);
                const scale = startScale.lerp(endScale, t);
                // Apply the interpolated position and rotation to the plane object
                visiblePlane?.setMatrix(new THREE.Matrix4().compose(position, quaternion, scale));
                if (t < 1)
                    requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            this.isTransitioning = false;
        }
        onActivateEnd(input, deActivatingAction) {
            if (this.isTransitioning)
                return;
            if (!visiblePlane || !anchorVisiblePlane || !laser || !sectionPlane)
                return;
            sectionLocked = !sectionLocked;
            if (sectionLocked) {
                laser.setVisibility(false);
                visiblePlane.setMaterial(new THREE.MeshBasicMaterial({ color: "red", force: true }));
                const visiblePlane_matWorld = visiblePlane.getMatrixWorld();
                anchorVisiblePlane.removeChild(visiblePlane);
                visiblePlane.setMatrix(visiblePlane_matWorld);
                (0, WebVisuXRToolkit_1.getXRObjects)().addChild(visiblePlane);
                if (lockAnimationToggle.value === false)
                    return;
                const boundingSphere = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.getBoundingSphere();
                const projectionOnPlane = sectionPlane.projectPoint(boundingSphere.center);
                const scale = THREE.Math.clamp(boundingSphere.radius * RATIO_BOUND_SCALE, MIN_SCALE, MAX_SCALE);
                this.isTransitioning = true;
                this.transition(visiblePlane_matWorld, new THREE.Matrix4().compose(projectionOnPlane, visiblePlane_matWorld.decompose()[1], new THREE.Vector3(scale, scale, scale)))
                    .catch((error) => { console.error("Section Skill: Transition failed:", error); });
            }
            else // sectionLocked === false
             {
                visiblePlane.setMaterial(new THREE.MeshBasicMaterial({ color: "aqua", force: true, }));
                (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(visiblePlane);
                anchorVisiblePlane.addChild(visiblePlane); //? check threejs 'attach' function
                visiblePlane.setMatrix(new THREE.Matrix4().compose(new THREE.Vector3(), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1)));
                laser.setMatrix(new THREE.Matrix4().compose(new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), new THREE.Vector3(1, 1000000, 1)));
                laser.setVisibility(true);
            }
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
        }
        initialize() {
        }
    }
    class ControllerSectionLock extends SectionLockSkill {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerPress]);
        }
        updateIndicatorLabel() {
            if (sectionLocked)
                this._righttriggerindicator.updateText(NLS.SectionUnlockLabel);
            else
                this._righttriggerindicator.updateText(NLS.SectionLockLabel);
        }
        onActivateEnd(input, deActivatingAction) {
            super.onActivateEnd(input, deActivatingAction);
            this.updateIndicatorLabel();
            if (sectionLocked === false)
                cleanupIcons(input);
            else {
                const section_nudge_overview = _iconindicators.get("section_nudge_overview");
                input.addIconIndicator(section_nudge_overview[0], "thumbstick/center");
                section_nudge_overview[1] = "thumbstick/center";
                _iconindicators.set("section_nudge_overview", section_nudge_overview);
            }
        }
        onRegisterInput(input) {
            super.onRegisterInput(input);
            input.addLabelIndicator(this._righttriggerindicator, "trigger/center");
            this.updateIndicatorLabel();
        }
        onUnregisterInput(input) {
            super.onUnregisterInput(input);
            input.removeLabelIndicator("trigger/center");
        }
        initialize() {
            this._righttriggerindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.SectionLockLabel, true, true);
        }
    }
    exports.ControllerSectionLock = ControllerSectionLock;
    const TIME_FOR_HOLD = 0.3; //in sec, min amount of time before the click is seen as a hold input
    const HAND_NUDGE_SPEED = 1;
    class HandSectionLock extends SectionLockSkill // Also manage the section nudging
     {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.IndexPinch]);
            this.accumulatedTime = 0;
            this.currentElevation = 0;
        }
        onActivateBegin(input, activatingAction) {
            if (!sectionLocked)
                return;
            super.onActivateBegin(input, activatingAction);
            this.accumulatedTime = 0;
            this.currentElevation = input.getMatrixWorld().decompose()[0].z;
        }
        onActivate(input) {
            if (!sectionLocked)
                return;
            this.accumulatedTime += (0, WebVisuXRToolkit_1.getDeltaTime)();
            if (this.accumulatedTime < TIME_FOR_HOLD)
                return;
            const newElevation = input.getMatrixWorld().decompose()[0].z;
            const delta = newElevation - this.currentElevation;
            NudgePlane(-1 * delta * HAND_NUDGE_SPEED); // delta is negated to match 'up movement' -> 'joystick up'
            this.currentElevation = newElevation;
        }
        onActivateEnd(input, deActivatingAction) {
            if (!sectionLocked) {
                super.onActivateEnd(input, deActivatingAction);
                return;
            }
            if (this.accumulatedTime > TIME_FOR_HOLD)
                return;
            super.onActivateEnd(input, deActivatingAction);
        }
    }
    exports.HandSectionLock = HandSectionLock;
    class ControllerSectionNudge extends EventTarget {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.JoystickTouch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this._lastIconKey = ""; // Stores the last applied icon
        }
        updateIndicatorArrows(delta, input) {
            let direction = "center";
            let iconKey = "";
            if (delta > -0.1) {
                direction = "south";
                if (delta >= 0.9)
                    iconKey = "skill_fly_navigation_backwards_speed3";
                else if (delta >= 0.6)
                    iconKey = "skill_fly_navigation_backwards_speed2";
                else if (delta >= 0.3)
                    iconKey = "skill_fly_navigation_backwards_speed1";
                else
                    iconKey = "skill_fly_navigation_backwards_idle";
            }
            else if (delta < 0.1) {
                direction = "north";
                if (delta <= -0.9)
                    iconKey = "skill_fly_navigation_forward_speed3";
                else if (delta <= -0.6)
                    iconKey = "skill_fly_navigation_forward_speed2";
                else if (delta <= -0.3)
                    iconKey = "skill_fly_navigation_forward_speed1";
                else
                    iconKey = "skill_fly_navigation_forward_idle";
            }
            // Only update the icon if it actually changed
            if (iconKey === this._lastIconKey)
                return;
            this._lastIconKey = iconKey; // Store new state
            cleanupIcons(input);
            if (iconKey !== "") {
                const skillIcon = _iconindicators.get(iconKey);
                input.addIconIndicator(skillIcon[0], `thumbstick/${direction}`);
                skillIcon[1] = `thumbstick/${direction}`;
                _iconindicators.set(iconKey, skillIcon);
                const directions = ["south", "north"];
                // Map each direction to its idle icon key
                const idleIcons = {
                    north: "skill_fly_navigation_forward_idle",
                    south: "skill_fly_navigation_backwards_idle",
                };
                for (const other of directions) {
                    if (other === direction)
                        continue;
                    const idleIconKey = idleIcons[other];
                    if (!idleIconKey)
                        continue;
                    const skillIcon = _iconindicators.get(idleIconKey);
                    if (!skillIcon)
                        continue;
                    input.addIconIndicator(skillIcon[0], `thumbstick/${other}`);
                    skillIcon[1] = `thumbstick/${other}`;
                    _iconindicators.set(idleIconKey, skillIcon);
                }
            }
            else {
                const section_nudge_overview = _iconindicators.get("section_nudge_overview");
                input.addIconIndicator(section_nudge_overview[0], "thumbstick/center");
                section_nudge_overview[1] = "thumbstick/center";
                _iconindicators.set("section_nudge_overview", section_nudge_overview);
            }
        }
        onActivate(input) {
            if (sectionLocked === false)
                return;
            const delta = input.joystickAxes[3];
            NudgePlane(delta * CONTROLLER_NUDGE_SPEED);
            this.updateIndicatorArrows(delta, input);
        }
        onActivateBegin(input, activatingAction) {
        }
        onActivateEnd(input, deActivatingAction) {
            cleanupIcons(input);
            if (sectionLocked === false)
                return;
            const section_nudge_overview = _iconindicators.get("section_nudge_overview");
            input.addIconIndicator(section_nudge_overview[0], "thumbstick/center");
            section_nudge_overview[1] = "thumbstick/center";
            _iconindicators.set("section_nudge_overview", section_nudge_overview);
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
            cleanupIcons(input);
        }
        initialize() {
            _iconindicators.set("section_nudge_overview", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "section_nudge_overview.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_forward_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_forward_idle.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_forward_speed1", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_forward_speed1.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_forward_speed2", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_forward_speed2.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_forward_speed3", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_forward_speed3.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_backwards_idle", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_backwards_idle.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_backwards_speed1", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_backwards_speed1.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_backwards_speed2", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_backwards_speed2.png")), undefined]);
            _iconindicators.set("skill_fly_navigation_backwards_speed3", [(0, WebVisuXRToolkit_1.createIconIndicator)((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "skill_fly_navigation_backwards_speed3.png")), undefined]);
        }
    }
    exports.ControllerSectionNudge = ControllerSectionNudge;
});
