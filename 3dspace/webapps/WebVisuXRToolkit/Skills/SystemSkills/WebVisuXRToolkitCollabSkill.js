/// <amd-module name="DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitCollabSkill"/>
define("DS/WebVisuXRToolkit/Skills/SystemSkills/WebVisuXRToolkitCollabSkill", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/Visualization/Node3D", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuGLTF/GLTFLoader", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers"], function (require, exports, THREE, Node3D, WebVisuXRToolkit_1, WebVisuXRToolkitSkillsUtils_1, GLTFLoader, WebappsUtils_1, WebVisuXRToolkitConfigManager, WebVisuXRToolkitManager_1, SceneGraphFactoryStatic, WebVisuXRToolkitHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AvatarSync = exports.collabSkillInfo = void 0;
    let _collab_follow_user;
    const _connectedUsersButton = new Map();
    const _UIContainer = new WebVisuXRToolkit_1.Container("start", "column");
    const collabUI = new WebVisuXRToolkit_1.HandMenuUIComponents();
    collabUI.insertAtRow(0, _UIContainer);
    exports.collabSkillInfo = {
        frameUpdateCallback: collabLoop,
        UIComponents: collabUI
        //handMenuFunctions: new Map().set("Active Collaboration", span)
    };
    const _UIPlayerNumber = new WebVisuXRToolkit_1.Label({ text: "1" }, 3);
    function buildUIHandMenu() {
        _UIContainer.clear();
        const users = (0, WebVisuXRToolkit_1.collab_listConnectedUsers)();
        _UIPlayerNumber.value = { text: users.length.toString() };
        const playersNumberContainer = new WebVisuXRToolkit_1.Container('end', 'row', [_UIPlayerNumber, new WebVisuXRToolkit_1.Label({ icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/VXRT_SkillIcon_Collaboration.png") }, 3)]);
        const mainLabel = new WebVisuXRToolkit_1.Label({ text: "Participants" }, 1);
        const mainLabelContainer = new WebVisuXRToolkit_1.Container('default', 'row', [mainLabel, playersNumberContainer]);
        _UIContainer.addElement(mainLabelContainer);
        const OwnButton = createHandMenuButton((0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id, (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id, (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().name, (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().color, (0, WebVisuXRToolkit_1.collab_getSessionLeaderID)(), () => (0, WebVisuXRToolkit_1.collab_setSessionLeader)((0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id), (id, iOnOff) => (0, WebVisuXRToolkit_1.collab_toggleMute)(id, iOnOff));
        _UIContainer.addElement(OwnButton.container);
        for (const id of users) {
            if (id !== (0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id) {
                const data = (0, WebVisuXRToolkit_1.collab_getUserInfo)(id);
                const button = createHandMenuButton((0, WebVisuXRToolkit_1.collab_getCurrentUserInfo)().id, id, data.name, data.color, (0, WebVisuXRToolkit_1.collab_getSessionLeaderID)(), () => (0, WebVisuXRToolkit_1.collab_setSessionLeader)(id), (id, iOnOff) => (0, WebVisuXRToolkit_1.collab_toggleMute)(id, iOnOff));
                _UIContainer.addElement(button.container);
                _connectedUsersButton.set(id, button);
            }
        }
    }
    function createHandMenuButton(userID, buttonUserID, username, userColor, leaderID, crownOnClick, muteOnClick) {
        const container = new WebVisuXRToolkit_1.Container("default", "row");
        const leftContainer = new WebVisuXRToolkit_1.Container("default", "row");
        const rightContainer = new WebVisuXRToolkit_1.Container("default", "row");
        const picture = new WebVisuXRToolkit_1.Label({ text: " ", color: "#" + userColor }, 3);
        const text = new WebVisuXRToolkit_1.Label({ text: username, textColor: userID === buttonUserID ? "#00A0FF" : undefined }, 3);
        leftContainer.addElement(picture);
        leftContainer.addElement(text);
        if (userID === leaderID) {
            if (userID === buttonUserID) {
                const crownLabel = new WebVisuXRToolkit_1.Label({ icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/VXRT_SkillIcon_Collaboration_Crown.png") }, 3);
                rightContainer.addElement(crownLabel);
            }
            else {
                const crownBtn = new WebVisuXRToolkit_1.Button(crownOnClick, { icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/VXRT_SkillIcon_Collaboration_Crown.png") });
                rightContainer.addElement(crownBtn);
            }
        }
        else {
            if (leaderID === buttonUserID) {
                const crownLabel = new WebVisuXRToolkit_1.Label({ icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/VXRT_SkillIcon_Collaboration_Crown.png") }, 3);
                rightContainer.addElement(crownLabel);
            }
            else {
                const crownLabel = new WebVisuXRToolkit_1.Label({ text: " " }, 3);
                rightContainer.addElement(crownLabel);
            }
        }
        let followUserView;
        if (userID === buttonUserID) {
            const moveToLabel = new WebVisuXRToolkit_1.Label({ text: " " }, 3);
            rightContainer.addElement(moveToLabel);
        }
        else {
            const moveToBtnCallback = () => {
                if (WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.isXRActive()) {
                    const userMatDec = (0, WebVisuXRToolkit_1.collab_getUserInfo)(buttonUserID).headMat.decompose();
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.viewer.currentViewpoint.moveTo({ eyePosition: userMatDec[0], orientation: userMatDec[1], duration: 0 });
                }
                else {
                    const userMatDec = (0, WebVisuXRToolkit_1.collab_getUserInfo)(buttonUserID).headMat.clone().rotateX(Math.PI * 0.5).decompose();
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.viewer.currentViewpoint.moveTo({ eyePosition: userMatDec[0], orientation: userMatDec[1], duration: 0 });
                }
            };
            const moveToBtn = new WebVisuXRToolkit_1.Button(moveToBtnCallback, { icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/VXRT_SkillIcon_Collaboration_Jump.png") });
            rightContainer.addElement(moveToBtn);
            if (WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.isXRActive() === false) {
                followUserView = new WebVisuXRToolkit_1.Toggle("FollowUserView", false);
                followUserView.onValueChange = (value) => {
                    if (value) {
                        for (const val of _connectedUsersButton) {
                            if (val[0] !== buttonUserID && val[1].followUserToggle?.value) {
                                val[1].followUserToggle.value = false;
                            }
                        }
                        _collab_follow_user = buttonUserID;
                    }
                    else {
                        _collab_follow_user = undefined;
                    }
                };
                rightContainer.addElement(followUserView);
            }
        }
        /*const kickBtn = new Button(() => { }, { text: "✖" });
        rightContainer.addElement(kickBtn);*/
        let muted = false;
        const muteCallback = () => {
            console.log("toggle");
            muted = !muted;
            micBtn.value = { text: muted ? "🔇" : "🔊" };
            muteOnClick(userID, muted);
        };
        const micBtn = new WebVisuXRToolkit_1.Button(muteCallback, { text: "🔊" });
        rightContainer.addElement(micBtn);
        container.addElement(leftContainer);
        container.addElement(rightContainer);
        return { container: container, followUserToggle: followUserView };
    }
    let init = true;
    function collabLoop(time, deltaTime) {
        if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
            if (init) {
                init = false;
                (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("AvatarUpdate", onAvatarHeadUpdateBinaryMsg);
                (0, WebVisuXRToolkit_1.collab_addOnSelfDisconectionCallback)(onSelfDisconnection);
                (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("AvatarRightInputUpdate", onAvatarRightInputUpdateBinaryMsg);
                (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("AvatarLeftInputUpdate", onAvatarLeftInputUpdateBinaryMsg);
                (0, WebVisuXRToolkit_1.collab_subscribeToMsgChannel)("InputDisconnect", onPlayerDisconnectMsg);
                (0, WebVisuXRToolkit_1.collab_addOnOtherDisconnectionCallback)((id) => { onPlayerDisconnectMsg(id, "disconnected"); });
                (0, WebVisuXRToolkit_1.collab_addOnLeaderChangeCallback)((_, __) => {
                    buildUIHandMenu();
                });
                (0, WebVisuXRToolkit_1.collab_addOnOtherDisconnectionCallback)((_) => {
                    buildUIHandMenu();
                });
                (0, WebVisuXRToolkit_1.collab_addOnOtherConnectionCallback)((_) => {
                    buildUIHandMenu();
                });
                buildUIHandMenu();
            }
            for (const avatar of networkedHeadAvatar.values()) {
                const avatarPosition = avatar.head.getMatrixWorld().decompose()[0];
                const headPosition = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().decompose()[0];
                const distance = avatarPosition.distanceToSquared(headPosition);
                const rot = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(avatarPosition, headPosition).decompose()[1];
                const scale = new THREE.Vector3(2.5, 1, 2.5);
                const pos = avatarPosition.add(new THREE.Vector3(0, 0, 150));
                if (avatar.type === 0) {
                    const headDec = avatar.head.getMatrix().decompose();
                    pos.z += headDec[2].z * 0.5 - 75;
                }
                avatar.name.setMatrix(new THREE.Matrix4().compose(pos, rot, scale));
                // Map distance to opacity
                // Example: invisible when < 600 mm, fully visible after 1200mm
                const minDistance = 600 * 600;
                const maxDistance = 1200 * 1200;
                let opacity = THREE.Math.clamp((distance - minDistance) / (maxDistance - minDistance), 0, 1);
                avatar.material.transparent = opacity < 1;
                avatar.material.opacity = opacity;
            }
            if (_collab_follow_user) {
                const mat = (0, WebVisuXRToolkit_1.collab_getUserInfo)(_collab_follow_user)?.headMat;
                if (mat) {
                    if ((0, WebVisuXRToolkit_1.isXRActive)()) {
                        const userMatDec = mat.decompose();
                        WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.viewer.currentViewpoint.moveTo({ eyePosition: userMatDec[0], orientation: userMatDec[1], duration: 0 });
                    }
                    else {
                        const userMatDec = mat.clone().rotateX(Math.PI * 0.5).decompose();
                        WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.viewer.currentViewpoint.moveTo({ eyePosition: userMatDec[0], orientation: userMatDec[1], duration: 0 });
                    }
                }
            }
            (0, WebVisuXRToolkit_1.collab_updateChannelData)("AvatarUpdate", encodeHeadMatrix((0, WebVisuXRToolkit_1.getHeadWorldMatrix)()));
        }
    }
    const networkedHeadAvatar = new Map();
    function encodeHeadMatrix(head) {
        const isFlat = (0, WebVisuXRToolkit_1.isStereoRendering)() === false;
        const result = new Float32Array(16);
        result.set(head.elements);
        const floatBuffer = result.buffer;
        // Create new buffer with space for original data + string
        const newBuffer = new Uint8Array(floatBuffer.byteLength + 1);
        // Copy original float buffer
        newBuffer.set(new Uint8Array(floatBuffer), 0);
        newBuffer.set([isFlat ? 0 : 1], floatBuffer.byteLength);
        // Return final buffer
        return newBuffer.buffer;
    }
    const onAvatarHeadUpdateBinaryMsg = (from, msg) => {
        if (!networkedHeadAvatar.has(from)) {
            const loader = new GLTFLoader();
            let material;
            const head = new Node3D();
            const data = applyHeadMatrixChanges(msg, head);
            if (data.type === 1) {
                material = new THREE.DSPBR25xMaterial({
                    force: true,
                    forceSide: true,
                    side: THREE.FrontSide
                });
                loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/Avatar.glb")).then((avatar) => {
                    avatar.setMaterial(material);
                    head.addChild(avatar);
                });
            }
            else {
                material = new THREE.MeshBasicMaterial({
                    force: true,
                    forceSide: true,
                    side: THREE.FrontSide
                });
                head.addChild(SceneGraphFactoryStatic.createCuboidNode({
                    cornerPoint: new THREE.Vector3(-0.5, -0.5, -0.5),
                    firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
                    secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
                    thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
                    material: material
                }));
            }
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(head);
            const userInfo = (0, WebVisuXRToolkit_1.collab_getUserInfo)(from);
            const name = (0, WebVisuXRToolkit_1.createLabelIndicator)(userInfo.name);
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(name);
            networkedHeadAvatar.set(from, { head: head, name: name, material: material, type: data.type });
            material.color = new THREE.Color("#" + userInfo.color);
            //WebVisuXRToolkitManager.instance.collabManager.initUserInfo(from, userInfo.name, userInfo.color);
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setUserInfo(from, "headMat", data.mat);
            name.setMatrix(name.getMatrix().scale(new THREE.Vector3(2.5, 2.5, 2.5)).translate(new THREE.Vector3(0, 0, 60)));
        }
        else {
            const avatar = networkedHeadAvatar.get(from);
            const data = applyHeadMatrixChanges(msg, avatar.head);
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setUserInfo(from, "headMat", data.mat);
        }
    };
    function applyHeadMatrixChanges(data, targetHead) {
        const mat = new THREE.Matrix4().setFromArray(Array.from(new Float32Array(data, 0, 16)));
        targetHead.setMatrix(mat);
        const type = new Uint8Array(data, 16 * 4, 1)[0];
        return { type, mat };
    }
    const onSelfDisconnection = () => {
        for (const [userId, avatar] of networkedHeadAvatar) {
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.head);
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.name);
            networkedHeadAvatar.delete(userId);
        }
        for (const [userId, avatar] of networkedLeftInputAvatar) {
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.root);
            networkedLeftInputAvatar.delete(userId);
        }
        for (const [userId, avatar] of networkedRightInputAvatar) {
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.root);
            networkedRightInputAvatar.delete(userId);
        }
    };
    function applyHandMatrixChanges(data, root, skeleton) {
        skeleton.setBonesMatrices(new Float32Array(data.slice(0, 25 * 12 * 4)));
        const mat = new THREE.Matrix4().setFromArray(Array.from(new Float32Array(data, 25 * 12 * 4, 16)));
        root.setMatrix(mat);
        return mat;
    }
    function applyControllerMatrixChanges(data, controller) {
        const mat = new THREE.Matrix4().setFromArray(Array.from(new Float32Array(data, 0, 16)));
        controller.setMatrix(mat);
        return mat;
    }
    const networkedLeftInputAvatar = new Map();
    const networkedRightInputAvatar = new Map();
    const onAvatarRightInputUpdateBinaryMsg = (from, msg) => {
        if (networkedHeadAvatar.has(from)) {
            if (!networkedRightInputAvatar.has(from)) {
                const loader = new GLTFLoader();
                const root = new Node3D();
                (0, WebVisuXRToolkit_1.getXRObjects)().addChild(root);
                const view = new Uint8Array(msg);
                const id = view[view.length - 1];
                switch (id) {
                    case 0:
                        loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/SimpleHand_Right.gltf")).then((hand) => {
                            root.addChild(hand);
                            hand.setMaterial(networkedHeadAvatar.get(from).material);
                            networkedRightInputAvatar.get(from).skeleton = hand.getSkeletons()[0];
                        });
                        break;
                    case 1:
                        loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/controller_MetaQuestTouchPlus_Right.gltf")).then((controller) => {
                            controller.setMaterial(networkedHeadAvatar.get(from).material);
                            root.addChild(controller);
                        });
                        break;
                }
                networkedRightInputAvatar.set(from, { root: root, skeleton: undefined, inputID: id });
            }
            else {
                const avatar = networkedRightInputAvatar.get(from);
                const view = new Uint8Array(msg);
                const id = view[view.length - 1];
                if (id !== avatar.inputID) {
                    (0, WebVisuXRToolkit_1.getXRObjects)().remove(avatar.root);
                    networkedRightInputAvatar.delete(from);
                    onAvatarRightInputUpdateBinaryMsg(from, msg);
                    return;
                }
                let mat;
                if (id === 0 && avatar.skeleton) {
                    mat = applyHandMatrixChanges(msg, avatar.root, avatar.skeleton);
                }
                else {
                    mat = applyControllerMatrixChanges(msg, avatar.root);
                }
                WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setUserInfo(from, "rightInputMat", mat);
            }
        }
    };
    const onAvatarLeftInputUpdateBinaryMsg = (from, msg) => {
        if (networkedHeadAvatar.has(from)) {
            if (!networkedLeftInputAvatar.has(from)) {
                const loader = new GLTFLoader();
                const root = new Node3D();
                (0, WebVisuXRToolkit_1.getXRObjects)().addChild(root);
                const view = new Uint8Array(msg);
                const id = view[view.length - 1];
                switch (id) {
                    case 0:
                        loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/SimpleHand_Left.gltf")).then((hand) => {
                            root.addChild(hand);
                            hand.setMaterial(networkedHeadAvatar.get(from).material);
                            networkedLeftInputAvatar.get(from).skeleton = hand.getSkeletons()[0];
                        });
                        break;
                    case 1:
                        loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "models/controller_MetaQuestTouchPlus_Left.gltf")).then((controller) => {
                            controller.setMaterial(networkedHeadAvatar.get(from).material);
                            root.addChild(controller);
                        });
                        break;
                }
                networkedLeftInputAvatar.set(from, { root: root, skeleton: undefined, inputID: id });
            }
            else {
                const avatar = networkedLeftInputAvatar.get(from);
                const view = new Uint8Array(msg);
                const id = view[view.length - 1];
                if (id !== avatar.inputID) {
                    (0, WebVisuXRToolkit_1.getXRObjects)().remove(avatar.root);
                    networkedLeftInputAvatar.delete(from);
                    onAvatarLeftInputUpdateBinaryMsg(from, msg);
                    return;
                }
                let mat;
                if (id === 0 && avatar.skeleton) {
                    mat = applyHandMatrixChanges(msg, avatar.root, avatar.skeleton);
                }
                else {
                    mat = applyControllerMatrixChanges(msg, avatar.root);
                }
                WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setUserInfo(from, "leftInputMat", mat);
            }
        }
    };
    const onPlayerDisconnectMsg = (from, msg) => {
        switch (msg) {
            case "disconnected":
                if (networkedHeadAvatar.has(from)) {
                    const avatar = networkedHeadAvatar.get(from);
                    (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.head);
                    (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.name);
                    networkedHeadAvatar.delete(from);
                }
                if (networkedLeftInputAvatar.has(from)) {
                    const avatar = networkedLeftInputAvatar.get(from);
                    (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.root);
                    networkedLeftInputAvatar.delete(from);
                }
                if (networkedRightInputAvatar.has(from)) {
                    const avatar = networkedRightInputAvatar.get(from);
                    (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.root);
                    networkedRightInputAvatar.delete(from);
                }
                break;
            case "left":
                if (networkedLeftInputAvatar.has(from)) {
                    const avatar = networkedLeftInputAvatar.get(from);
                    (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.root);
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setUserInfo(from, "leftInputMat", null);
                }
                break;
            case "right":
                if (networkedRightInputAvatar.has(from)) {
                    const avatar = networkedRightInputAvatar.get(from);
                    (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(avatar.root);
                    WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setUserInfo(from, "rightInputMat", null);
                }
                break;
        }
    };
    class AvatarSync {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkitSkillsUtils_1.InputAction.NetworkPassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Primary, WebVisuXRToolkitSkillsUtils_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
            if (input instanceof WebVisuXRToolkit_1.WebVisuXRToolkitController) {
                (0, WebVisuXRToolkit_1.collab_updateChannelData)(input.handedness === WebVisuXRToolkit_1.InputHandedness.Right ? "AvatarRightInputUpdate" : "AvatarLeftInputUpdate", this.encodeControllerMatrix(input.getMatrixWorld()));
            }
            else {
                if (input.skeleton) {
                    (0, WebVisuXRToolkit_1.collab_updateChannelData)(input.handedness === WebVisuXRToolkit_1.InputHandedness.Right ? "AvatarRightInputUpdate" : "AvatarLeftInputUpdate", this.encodeHandMatrix(input.getMatrixWorld(), input.skeleton.getBonesMatrices()));
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
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
            if (input.handedness === WebVisuXRToolkit_1.InputHandedness.Left) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("InputDisconnect", "left");
            }
            else {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("InputDisconnect", "right");
            }
        }
        encodeHandMatrix(rightRoot, rightJoints) {
            const result = new Float32Array(16 + rightJoints.length);
            result.set(rightJoints);
            result.set(rightRoot.elements, rightJoints.length);
            const floatBuffer = result.buffer;
            const newBuffer = new Uint8Array(floatBuffer.byteLength + 1);
            // Copy original float buffer
            newBuffer.set(new Uint8Array(floatBuffer), 0);
            // Append string bytes
            newBuffer.set([0], floatBuffer.byteLength);
            // Return final buffer
            return newBuffer.buffer;
        }
        encodeControllerMatrix(controller) {
            const result = new Float32Array(16);
            result.set(controller.elements, 0);
            const floatBuffer = result.buffer;
            // Create new buffer with space for original data + string
            const newBuffer = new Uint8Array(floatBuffer.byteLength + 1);
            // Copy original float buffer
            newBuffer.set(new Uint8Array(floatBuffer), 0);
            // Append string bytes
            newBuffer.set([1], floatBuffer.byteLength);
            // Return final buffer
            return newBuffer.buffer;
        }
    }
    exports.AvatarSync = AvatarSync;
});
