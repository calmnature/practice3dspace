/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitPointer"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitPointer", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "DS/WebVisuXRToolkitUINode/HTMLNode"], function (require, exports, THREE, SceneGraphFactoryStatic, WebVisuXRToolkit_1, WebVisuXRToolkitConfigManager, WebVisuXRToolkitHelpers_1, HTMLNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MousePointerLaser = exports.ControllerPointerLaser = void 0;
    const BASE_LASER_LENGTH = 1000;
    const rightNetworkedPointers = new Map();
    const leftNetworkedPointers = new Map();
    const otherNetworkedPointers = new Map();
    const encoder = new TextEncoder();
    WebVisuXRToolkitConfigManager.instance.addEventListener("WebVisuXRToolkitSessionStarted", () => {
        if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
            (0, WebVisuXRToolkit_1.collab_subscribeToMsgChannel)("setPointerVisibility", onSetVisibility);
            (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("UpdateLeftPointers", onLeftPointerUpdateBinaryMsg);
            (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("UpdateRightPointers", onRightPointerUpdateBinaryMsg);
            (0, WebVisuXRToolkit_1.collab_subscribeToDataChannel)("UpdateOtherPointers", onOtherPointerUpdateBinaryMsg);
        }
    });
    const onLeftPointerUpdateBinaryMsg = (from, msg) => {
        const matrix = new THREE.Matrix4();
        matrix.elements = new Float32Array(msg, 0, 16);
        const strBytes = new Uint8Array(msg, 16 * 4, 6);
        const decoder = new TextDecoder();
        const decodedString = decoder.decode(strBytes);
        if (!leftNetworkedPointers.has(from)) {
            const left = createLaserCube(new THREE.Color("#" + decodedString));
            left.setMatrix(matrix);
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(left);
            leftNetworkedPointers.set(from, left);
        }
        else {
            const left = leftNetworkedPointers.get(from);
            left.setMatrix(matrix);
        }
    };
    const onRightPointerUpdateBinaryMsg = (from, msg) => {
        const matrix = new THREE.Matrix4();
        matrix.elements = new Float32Array(msg, 0, 16);
        const strBytes = new Uint8Array(msg, 16 * 4, 6);
        const decoder = new TextDecoder();
        const decodedString = decoder.decode(strBytes);
        if (!rightNetworkedPointers.has(from)) {
            const right = createLaserCube(new THREE.Color("#" + decodedString));
            right.setMatrix(matrix);
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(right);
            rightNetworkedPointers.set(from, right);
        }
        else {
            const right = rightNetworkedPointers.get(from);
            right.setMatrix(matrix);
        }
    };
    const onOtherPointerUpdateBinaryMsg = (from, msg) => {
        const matrix = new THREE.Matrix4();
        const vectorbuffer = new Float32Array(msg, 0, 7);
        const startPosition = new THREE.Vector3(vectorbuffer[0], vectorbuffer[1], vectorbuffer[2]);
        const endPosition = new THREE.Vector3(vectorbuffer[3], vectorbuffer[4], vectorbuffer[5]);
        const distance = vectorbuffer[6];
        const quat = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(startPosition, endPosition).decompose()[1];
        matrix.compose(startPosition, quat, new THREE.Vector3(5, distance, 5));
        //    matrix.elements = new Float32Array(msg, 0, 16);
        const strBytes = new Uint8Array(msg, 7 * 4, 6);
        const decoder = new TextDecoder();
        const decodedString = decoder.decode(strBytes);
        if (!otherNetworkedPointers.has(from)) {
            const other = createLaserCube(new THREE.Color("#" + decodedString));
            other.setMatrix(matrix);
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(other);
            otherNetworkedPointers.set(from, other);
        }
        else {
            const other = otherNetworkedPointers.get(from);
            other.setMatrix(matrix);
        }
    };
    const onSetVisibility = (from, msg) => {
        const data = JSON.parse(msg);
        if (data["hand"] === "right" && rightNetworkedPointers.has(from)) {
            rightNetworkedPointers.get(from).setVisibility(data["visible"]);
            //getXRObjects().removeChild(this.rightNetworkedPointers.get(from)!);
            //this.rightNetworkedPointers.delete(from);
        }
        if (data["hand"] === "left" && leftNetworkedPointers.has(from)) {
            leftNetworkedPointers.get(from).setVisibility(data["visible"]);
        }
        if (data["hand"] === "none" && otherNetworkedPointers.has(from)) {
            otherNetworkedPointers.get(from).setVisibility(data["visible"]);
        }
    };
    function createLaserCube(color, input) {
        const material = new THREE.MeshBasicMaterial({ force: true });
        material.color = color;
        const cubeRep = SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREE.Vector3(0.0, 0.0, 0.0),
            firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
            secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
            thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
            material: material
        });
        cubeRep.name = "Picking laser";
        if (input) {
            input.userData.pointerNode = cubeRep;
            input.userData.pointerNode.setVisibility(false);
        }
        return cubeRep;
    }
    class ControllerPointerLaser {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerTouch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
            if (input.targetRayMatrix) {
                const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, "prim");
                const target = input.targetRayMatrix.decompose();
                const pointerMatrix = new THREE.Matrix4().compose(target[0], target[1], new THREE.Vector3(5, intersection.length > 0 ? intersection[0].distance : BASE_LASER_LENGTH, 5));
                input.userData.pointerNode.setMatrix(pointerMatrix);
                if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                    // Encode string to UTF-8 bytes
                    const strBytes = encoder.encode(WebVisuXRToolkitConfigManager.instance.clientInstance.color); // Uint8Array of 6 bytes
                    // Create new buffer with space for original data + string
                    const buffer = new Uint8Array(16 * 4 + 6);
                    // Copy original float buffer
                    buffer.set(new Uint8Array(new Float32Array(input.userData.pointerNode.getMatrixWorld().elements).buffer));
                    // Append string bytes
                    buffer.set(strBytes, 16 * 4);
                    if (input.handedness === WebVisuXRToolkit_1.InputHandedness.Left) {
                        (0, WebVisuXRToolkit_1.collab_updateChannelData)("UpdateLeftPointers", buffer.buffer);
                    }
                    else {
                        (0, WebVisuXRToolkit_1.collab_updateChannelData)("UpdateRightPointers", buffer.buffer);
                    }
                }
            }
        }
        onActivateBegin(input, activatingAction) {
            input.userData.pointerNode.setVisibility(true);
            if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": true, "hand": input.handedness === WebVisuXRToolkit_1.InputHandedness.Left ? "left" : "right" }));
            }
        }
        onActivateEnd(input, deActivatingAction) {
            input.userData.pointerNode.setVisibility(false);
            if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": false, "hand": input.handedness === WebVisuXRToolkit_1.InputHandedness.Left ? "left" : "right" }));
            }
        }
        onUnregisterInput(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(input.userData.pointerNode);
            input.userData.pointerNode = null;
        }
        onRegisterInput(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(createLaserCube(new THREE.Color("#" + (WebVisuXRToolkitConfigManager.instance.clientInstance?.color || "ff0000")), input));
        }
    }
    exports.ControllerPointerLaser = ControllerPointerLaser;
    class MousePointerLaser {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.MousePassive]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.None]);
            this.pointerNode = createLaserCube(new THREE.Color("#" + (WebVisuXRToolkitConfigManager.instance.clientInstance?.color || "ff0000")));
            this.pointerMat = new THREE.Matrix4();
            this._debugNumber = 0;
        }
        onActivate(input) {
            if (input.mousePosition) {
                (0, WebVisuXRToolkit_1.getViewer)().getRootNode().removeChild((0, WebVisuXRToolkit_1.getXRObjects)());
                const pick = (0, WebVisuXRToolkit_1.getViewer)().pick(input.mousePosition, "prim");
                const endPosition = pick.position;
                (0, WebVisuXRToolkit_1.getViewer)().getRootNode().addChild((0, WebVisuXRToolkit_1.getXRObjects)());
                if (endPosition) {
                    if (this.pointerNode.isVisible() === false) {
                        if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                            (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": true, "hand": "none" }));
                        }
                        this.pointerNode.setVisibility(true);
                    }
                    //const viewpoint = getViewer().currentViewpoint;
                    //const startPosition2 = viewpoint.unProject(new THREE.Vector3(getViewer().canvas.offsetWidth, getViewer().canvas.offsetHeight, 0));
                    const startPosition = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().translate(new THREE.Vector3((0, WebVisuXRToolkit_1.getViewer)().canvas.offsetWidth * HTMLNode_1.HTMLNode.getPxToMM() * 0.001, 0, -(0, WebVisuXRToolkit_1.getViewer)().canvas.offsetHeight * HTMLNode_1.HTMLNode.getPxToMM() * 0.001)).decompose()[0];
                    //console.log("debug", startPosition, getHeadWorldMatrix().decompose()[0], startPosition2)
                    const distance = startPosition.distanceTo(endPosition);
                    const quat = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(startPosition, endPosition).decompose()[1];
                    this.pointerMat.compose(startPosition, quat, new THREE.Vector3(5, distance, 5));
                    this.pointerNode.setMatrix(this.pointerMat);
                    this._debugNumber = (this._debugNumber + 1) % 10;
                    if (WebVisuXRToolkitConfigManager.instance.clientInstance && this._debugNumber === 0) {
                        // Encode string to UTF-8 bytes
                        const strBytes = encoder.encode(WebVisuXRToolkitConfigManager.instance.clientInstance.color); // Uint8Array of 6 bytes
                        // Create new buffer with space for original data + string
                        const buffer = new Uint8Array(7 * 4 + 6);
                        const floatData = new Float32Array([
                            startPosition.x, startPosition.y, startPosition.z,
                            endPosition.x, endPosition.y, endPosition.z,
                            distance
                        ]);
                        // Copy original float buffer
                        buffer.set(new Uint8Array(floatData.buffer));
                        // Append string bytes
                        buffer.set(strBytes, 7 * 4);
                        (0, WebVisuXRToolkit_1.collab_updateChannelData)("UpdateOtherPointers", buffer.buffer);
                    }
                }
                else if (this.pointerNode.isVisible()) {
                    if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                        (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": false, "hand": "none" }));
                    }
                    this.pointerNode.setVisibility(false);
                }
            }
            else if (this.pointerNode.isVisible()) {
                if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                    (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": false, "hand": "none" }));
                }
                this.pointerNode.setVisibility(false);
            }
        }
        onActivateBegin(input, activatingAction) {
            console.log("activate begin");
        }
        onActivateEnd(input, deActivatingAction) {
            console.log("activate end");
        }
        onRegisterInput(input) {
            (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint.setControlActive({ picking: false });
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(this.pointerNode);
            if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": true, "hand": "none" }));
            }
        }
        onUnregisterInput(input) {
            (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint.setControlActive({ picking: true });
            if (WebVisuXRToolkitConfigManager.instance.clientInstance) {
                (0, WebVisuXRToolkit_1.collab_broadcastMsg)("setPointerVisibility", JSON.stringify({ "visible": false, "hand": "none" }));
            }
        }
    }
    exports.MousePointerLaser = MousePointerLaser;
});
