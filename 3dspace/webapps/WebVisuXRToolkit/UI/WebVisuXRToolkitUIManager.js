/// <amd-module name="DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIManager"/>
define("DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIManager", ["require", "exports", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIFunctionMenu", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIQuickMenu", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIWindowManager", "DS/Visualization/Node3D", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIInfoIndicatorFactory", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIHandMenu", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController", "DS/WebVisuXRToolkitUINode/WebVisuXRToolkitUINode", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkitUINode/HTMLIcon", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIQuickMenuFlatMode"], function (require, exports, WebVisuXRToolkitUIFunctionMenu_1, WebVisuXRToolkitUIQuickMenu_1, WebVisuXRToolkitUIWindowManager_1, Node3D, WebVisuXRToolkitUIInfoIndicatorFactory_1, WebVisuXRToolkitUIHandMenu_1, WebappsUtils_1, WebVisuXRToolkitUIEventController_1, WebVisuXRToolkitUINode_1, WebVisuXRToolkit_1, SceneGraphFactoryStatic, HTMLIcon_1, THREE, WebVisuXRToolkitUIQuickMenuFlatMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitUIManager = void 0;
    class WebVisuXRToolkitUIManager {
        get domOverlay() {
            return this._domOverlay;
        }
        get domUI() {
            return this._domUI;
        }
        get quickMenu() {
            return this._quickMenu;
        }
        get flatQuickMenu() {
            return this._flatQuickMenu;
        }
        get functionMenu() {
            return this._functionMenu;
        }
        get handMenu() {
            return this._handMenu;
        }
        get UIManagerNode() {
            return this._UIManagerNode;
        }
        get indicatorFactory() {
            return this._indicatorFactory;
        }
        cleanUI() {
            this._UIManagerNode.parents[0].removeChild(this._UIManagerNode);
            this._functionMenu.dispose();
            this._quickMenu.dispose();
            this._handMenu.dispose();
            this._shadowHost.remove();
            this._domOverlay.remove();
            WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.dispose();
        }
        toggleFunctionMenu(force) {
            if (force !== undefined) {
                this._functionMenu.setVisibility(force);
            }
            else {
                this._functionMenu.setVisibility(!this._functionMenu.isVisible());
            }
            if (this._functionMenu.isVisible()) {
                this._UIManagerNode.addChild(this._functionMenu);
                this._functionMenu.recomputeMatrix();
            }
            else {
                this._UIManagerNode.removeChild(this._functionMenu);
            }
        }
        get Intersectables() {
            return this._intersectables;
        }
        anyIntersectibleVisible() {
            return this.Intersectables.some((node) => node.isVisible());
        }
        toggleQuickMenu(force) {
            if (force !== undefined) {
                this._quickMenu.setVisibility(force);
            }
            else {
                this._quickMenu.setVisibility(!this._quickMenu.isVisible());
            }
            if (this._quickMenu.isVisible()) {
                this._UIManagerNode.addChild(this._quickMenu);
            }
            else {
                this._UIManagerNode.removeChild(this._quickMenu);
            }
        }
        get closingCrossImage() {
            return this._closingCross;
        }
        _update(time, deltaTime, parentNode) {
            parentNode.traverse((node) => {
                if (node instanceof WebVisuXRToolkitUINode_1.UINode) {
                    node.update(time, deltaTime);
                }
            });
        }
        bindLaserNode(input) {
            input.userData.UIlaserNode = new Node3D("LaserNode");
            input.userData.UIlaserNode.addChild(this._laserRay);
            input.userData.UIlaserNode.addChild(this._UIlaserIndicator);
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(input.userData.UIlaserNode);
            return input.userData.UIlaserNode;
        }
        unbindLaseNode(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(input.userData.UIlaserNode);
            input.userData.UIlaserNode.removeChildren();
            input.userData.UIlaserNode = null;
        }
        createLaserCube() {
            const material = new THREE.MeshBasicMaterial({
                color: 0xd6281c,
                force: true
            });
            const cubeRep = SceneGraphFactoryStatic.createCuboidNode({
                cornerPoint: new THREE.Vector3(0.0, 0.0, 0.0),
                firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
                secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
                thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
                material: material
            });
            this._laserRay = cubeRep;
            this._laserRay.setName("LaserRay");
            this._laserRay.setVisibility(true);
            this._UIlaserIndicator = new HTMLIcon_1.HTMLIcon((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/vxrt_pick_indicator.png"), this.domUI, { scale: 0.25 });
            this._UIlaserIndicator.setName("LaserIndicator");
            this._UIlaserIndicator.setVisibility(true); // Will be activated with the laser
            this._UIlaserIndicator.setMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(1, 1, 1)));
            /*
            if (input instanceof WebVisuXRToolkitHand)
            {
                const shoulder_pos = new THREE.Vector3().getPositionFromMatrix(getHeadWorldMatrix()).add(new THREE.Vector3(50, 0, -100));
                const thumb_tip = new THREE.Vector3().getPositionFromMatrix(input.getJoint("thumb-tip")!.getMatrix())
                const index_tip = new THREE.Vector3().getPositionFromMatrix(input.getJoint("index-finger-tip")!.getMatrix())
                const mid_pos = thumb_tip.add(index_tip).multiplyScalar(0.5)
                const dir = mid_pos.clone().sub(shoulder_pos)
                input.userData.UIlaserNode.setMatrix(new THREE.Matrix4().lookAt(mid_pos, shoulder_pos.add(dir), new THREE.Vector3(0, 0, 1)).scale(new THREE.Vector3(1, BASE_LASER_LENGTH, 1)))
            }
            */
        }
        toggleToFlatModeUI() {
            if (!this._hasFlatModeToggled) {
                this._functionMenu.setVisibility(false);
                this._handMenu.setVisibility(false);
                //this._quickMenu.setVisibility(false);
                this._flatQuickMenu.start();
                const inputsArray = new Array;
                const inputs = this._inputManager.getInputs();
                for (const input of inputs.others) {
                    inputsArray.push(input);
                }
                this._flatQuickMenu.updateQmButtons(inputsArray);
                this._hasFlatModeToggled = true;
            }
        }
        constructor(XRObjectsNode, skillsManager, domOverlay, isMixedRealityAvailable, inputManager, isXR) {
            this._intersectables = new Array();
            this._UIManagerNode = new Node3D("WebVisuXRUI");
            this._hasFlatModeToggled = false;
            this._domOverlay = domOverlay;
            this._shadowHost = document.createElement("div");
            this._shadowHost.id = "WebVisuXRToolkit UI";
            this._inputManager = inputManager;
            document.body.appendChild(this._shadowHost);
            this._domUI = this._shadowHost.attachShadow({ mode: "open" });
            XRObjectsNode.addChild(this._UIManagerNode);
            // Function Menu
            this._functionMenu = new WebVisuXRToolkitUIFunctionMenu_1.FunctionMenu(this._domUI, isMixedRealityAvailable);
            this.toggleFunctionMenu(false);
            this._intersectables.push(this._functionMenu);
            // Quick Menu
            this._quickMenu = new WebVisuXRToolkitUIQuickMenu_1.QuickMenu(skillsManager, this._domUI, inputManager);
            this.toggleQuickMenu(false);
            // Hand Menu
            this._handMenu = new WebVisuXRToolkitUIHandMenu_1.HandMenu(this._domUI, skillsManager, this._intersectables);
            //this._intersectables.push(this._handMenu);
            this._indicatorFactory = new WebVisuXRToolkitUIInfoIndicatorFactory_1.WebVisuXRToolkitUIInfoIndicatorFactory(this._domUI);
            this._flatQuickMenu = new WebVisuXRToolkitUIQuickMenuFlatMode_1.WebVisuXRToolkitUIQuickMenuFlatMode(skillsManager, isXR ? this._domOverlay : this._domUI, inputManager);
            // Window
            WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.getWindows().forEach((window) => {
                this._intersectables.push(window);
            });
            this._closingCross = document.createElement("img");
            this._closingCross.crossOrigin = 'anonymous'; // or 'use-credentials' depending on the server
            this._closingCross.src = (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/function_menu_exit_session.png"); // Replace with your image path
            this._closingCross.style.position = "absolute";
            this._closingCross.style.top = "3rem";
            this._closingCross.style.left = "3rem";
            this._closingCross.style.width = "5rem";
            this._closingCross.style.height = "5rem";
            this._closingCross.style.zIndex = "9999";
            if (isXR) {
                domOverlay.appendChild(this._closingCross);
            }
            else {
                this._domUI.appendChild(this._closingCross);
            }
            //Handle default skills
            const currently_selected_skills = skillsManager.listSkills();
            const selectedSkills = new Set([
                ...(currently_selected_skills.no_handedness ?? []),
                ...(currently_selected_skills.primary_handedness ?? []),
                ...(currently_selected_skills.secondary_handedness ?? [])
            ]);
            WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.emit(WebVisuXRToolkitUIEventController_1.QMEvents.QMNewSkillSelected, { selectedSkills });
        }
    }
    exports.WebVisuXRToolkitUIManager = WebVisuXRToolkitUIManager;
});
