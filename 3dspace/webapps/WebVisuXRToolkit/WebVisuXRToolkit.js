/// <amd-module name="DS/WebVisuXRToolkit/WebVisuXRToolkit"/>
define("DS/WebVisuXRToolkit/WebVisuXRToolkit", ["require", "exports", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitHandMenuUIElements", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkill", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitController", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitHand", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitTouchscreen", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitComputerMouse", "DS/WebVisuXRToolkitUINode/HTMLTooltip"], function (require, exports, WebVisuXRToolkitManager_1, WebVisuXRToolkitHandMenuUIElements_1, WebVisuXRToolkitSkill_1, WebVisuXRToolkitSkillsUtils_1, WebVisuXRToolkitInput_1, WebVisuXRToolkitController_1, WebVisuXRToolkitHand_1, WebVisuXRToolkitTouchscreen_1, WebVisuXRToolkitComputerMouse_1, HTMLTooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HTMLTooltip = exports.WebVisuXRToolkitComputerMouse = exports.WebVisuXRToolkitTouchscreen = exports.WebVisuXRToolkitHand = exports.WebVisuXRToolkitController = exports.InputHandedness = exports.InputAction = exports.AbstractHandedness = exports.Skill = exports.Container = exports.Slider = exports.Radio = exports.Label = exports.Toggle = exports.Button = exports.HandMenuUIComponents = void 0;
    exports.getXRNode = getXRNode;
    exports.getXRObjects = getXRObjects;
    exports.getHeadWorldMatrix = getHeadWorldMatrix;
    exports.getHeadMatrix = getHeadMatrix;
    exports.getViewer = getViewer;
    exports.getDomOverlay = getDomOverlay;
    exports.getDeltaTime = getDeltaTime;
    exports.resetInitialXRNodeMatrix = resetInitialXRNodeMatrix;
    exports.endXRSession = endXRSession;
    exports.getXRPlanesMatrices = getXRPlanesMatrices;
    exports.getXRMesh = getXRMesh;
    exports.createLabelIndicator = createLabelIndicator;
    exports.createIconIndicator = createIconIndicator;
    exports.buildXRNodeMatrix = buildXRNodeMatrix;
    exports.getCameraProperties = getCameraProperties;
    exports.reframe = reframe;
    exports.isStereoRendering = isStereoRendering;
    exports.isXRActive = isXRActive;
    exports.collab_updateChannelData = collab_updateChannelData;
    exports.collab_broadcastMsg = collab_broadcastMsg;
    exports.collab_subscribeToDataChannel = collab_subscribeToDataChannel;
    exports.collab_subscribeToMsgChannel = collab_subscribeToMsgChannel;
    exports.collab_listConnectedUsers = collab_listConnectedUsers;
    exports.collab_getUserInfo = collab_getUserInfo;
    exports.collab_addOnSelfDisconectionCallback = collab_addOnSelfDisconectionCallback;
    exports.collab_addOnOtherDisconnectionCallback = collab_addOnOtherDisconnectionCallback;
    exports.collab_addOnOtherConnectionCallback = collab_addOnOtherConnectionCallback;
    exports.collab_addOnLeaderChangeCallback = collab_addOnLeaderChangeCallback;
    exports.collab_getCurrentUserInfo = collab_getCurrentUserInfo;
    exports.collab_getSessionLeaderID = collab_getSessionLeaderID;
    exports.collab_setSessionLeader = collab_setSessionLeader;
    exports.collab_toggleMute = collab_toggleMute;
    Object.defineProperty(exports, "HandMenuUIComponents", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.HandMenuUIComponents; } });
    Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.Button; } });
    Object.defineProperty(exports, "Toggle", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.Toggle; } });
    Object.defineProperty(exports, "Label", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.Label; } });
    Object.defineProperty(exports, "Radio", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.Radio; } });
    Object.defineProperty(exports, "Slider", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.Slider; } });
    Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return WebVisuXRToolkitHandMenuUIElements_1.Container; } });
    Object.defineProperty(exports, "Skill", { enumerable: true, get: function () { return WebVisuXRToolkitSkill_1.Skill; } });
    Object.defineProperty(exports, "AbstractHandedness", { enumerable: true, get: function () { return WebVisuXRToolkitSkillsUtils_1.AbstractHandedness; } });
    Object.defineProperty(exports, "InputAction", { enumerable: true, get: function () { return WebVisuXRToolkitSkillsUtils_1.InputAction; } });
    Object.defineProperty(exports, "InputHandedness", { enumerable: true, get: function () { return WebVisuXRToolkitInput_1.InputHandedness; } });
    Object.defineProperty(exports, "WebVisuXRToolkitController", { enumerable: true, get: function () { return WebVisuXRToolkitController_1.WebVisuXRToolkitController; } });
    Object.defineProperty(exports, "WebVisuXRToolkitHand", { enumerable: true, get: function () { return WebVisuXRToolkitHand_1.WebVisuXRToolkitHand; } });
    Object.defineProperty(exports, "WebVisuXRToolkitTouchscreen", { enumerable: true, get: function () { return WebVisuXRToolkitTouchscreen_1.WebVisuXRToolkitTouchscreen; } });
    Object.defineProperty(exports, "WebVisuXRToolkitComputerMouse", { enumerable: true, get: function () { return WebVisuXRToolkitComputerMouse_1.WebVisuXRToolkitComputerMouse; } });
    Object.defineProperty(exports, "HTMLTooltip", { enumerable: true, get: function () { return HTMLTooltip_1.HTMLTooltip; } });
    function getXRNode() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.XRNode; }
    function getXRObjects() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.XRObjects; }
    function getHeadWorldMatrix() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.HeadWorldMatrix; }
    function getHeadMatrix() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.HeadMatrix; }
    function getViewer() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.viewer; }
    function getDomOverlay() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.domOverlay; }
    function getDeltaTime() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.dt; }
    function resetInitialXRNodeMatrix() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.resetInitialXRNodeMatrix(); }
    function endXRSession() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.endSession(); }
    function getXRPlanesMatrices() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.getXRPlanesPoses(); }
    function getXRMesh() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.getXRMesh(); }
    function createLabelIndicator(labelText, allowTransparency, forceTextureUpdate) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.indicatorFactory.createLabelIndicator(labelText, allowTransparency, forceTextureUpdate); }
    function createIconIndicator(icon) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.indicatorFactory.createIconIndicator(icon); }
    function buildXRNodeMatrix(viewpointPosition, viewpoinOrientation, positionIsOnFeet) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.buildXRNodeMatrix(viewpointPosition, viewpoinOrientation, positionIsOnFeet); }
    function getCameraProperties() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.getCameraProperties(); }
    function reframe() { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.reframe(getViewer().currentViewpoint.getEyePosition(), getViewer().currentViewpoint.camera.fov); }
    function isStereoRendering() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.isStereoRendering(); }
    function isXRActive() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.isXRActive(); }
    function collab_updateChannelData(channel, msg) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.sendUpdateOverNetwork(channel, msg); }
    function collab_broadcastMsg(channel, msg) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.sendMessageOverNetwork(channel, msg); }
    function collab_subscribeToDataChannel(channel, callback) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.addNetworkBinaryListener(channel, callback); }
    function collab_subscribeToMsgChannel(channel, callback) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.addNetworkMessageListener(channel, callback); }
    function collab_listConnectedUsers() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.listConnectedIds(); }
    function collab_getUserInfo(id) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.getUserInfo(id); }
    function collab_addOnSelfDisconectionCallback(func) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.addOnSelfDisctionnectionCallback(func); }
    function collab_addOnOtherDisconnectionCallback(func) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.addOnOtherDisconnectionCallback(func); }
    function collab_addOnOtherConnectionCallback(func) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.addOnOtherConnectionCallback(func); }
    function collab_addOnLeaderChangeCallback(func) { WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.addOnLeaderChangeCallback(func); }
    function collab_getCurrentUserInfo() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.getCurrentUserInfo(); }
    function collab_getSessionLeaderID() { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.getLeaderID(); }
    function collab_setSessionLeader(id) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.setLeader(id); }
    function collab_toggleMute(id, iOnOff) { return WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.collabManager.toggleMute(id, iOnOff); }
});
