/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitMeasure"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitMeasure", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/Visualization/SceneGraphFactory", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/Visualization/Node3D", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "i18n!DS/WebVisuXRToolkit/assets/nls/WebVisuXRToolkitNativeSkills", "DS/WebappsUtils/WebappsUtils"], function (require, exports, THREE, SceneGraphFactoryStatic, WebVisuXRToolkit_1, Node3D, WebVisuXRToolkitHelpers_1, NLS, WebappsUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandMeasureCancel = exports.HandMeasureDelete = exports.HandMeasure = exports.ControllerMeasureLaser = exports.HandMeasureLaserPassive = exports.ControllerMeasureLaserPassive = exports.ControllerMeasureDeleteAll = exports.ControllerMeasureDelete = exports.ControllerMeasure = exports.chainToggle = exports.measureModeRadio = exports.MeasureUI = void 0;
    //#region UI
    exports.MeasureUI = new WebVisuXRToolkit_1.HandMenuUIComponents();
    const measureOptions = new Map();
    measureOptions.set("default", { text: NLS.MeasureModeDefault, icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "VXRT_SkillIcon_Measure.png") });
    measureOptions.set("free", { text: NLS.MeasureModeFree, icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "VXRT_SkillIcon_Measure.png") });
    measureOptions.set("normal", { text: NLS.MeasureModeNormal, icon: (0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitNativeSkills", "VXRT_SkillIcon_Measure.png") });
    exports.measureModeRadio = new WebVisuXRToolkit_1.Radio(measureOptions, "default");
    exports.MeasureUI.insertAtRow(0, new WebVisuXRToolkit_1.Container("start", "row", [new WebVisuXRToolkit_1.Label({ text: NLS.MeasureMode }, 2)]));
    exports.MeasureUI.insertAtRow(1, new WebVisuXRToolkit_1.Container("default", "row", [exports.measureModeRadio]));
    const rescaleToggle = new WebVisuXRToolkit_1.Toggle(NLS.MeasureLabelRescaleSetting, false);
    exports.MeasureUI.insertAtRow(2, new WebVisuXRToolkit_1.Container("default", "row", [rescaleToggle]));
    exports.chainToggle = new WebVisuXRToolkit_1.Toggle(NLS.MeasureChainMode, false);
    exports.MeasureUI.insertAtRow(3, new WebVisuXRToolkit_1.Container("default", "row", [exports.chainToggle]));
    exports.MeasureUI.insertAtRow(4, new WebVisuXRToolkit_1.Container("start", "row", [new WebVisuXRToolkit_1.Label({ text: "Actions" }, 2)]));
    exports.MeasureUI.insertAtRow(5, new WebVisuXRToolkit_1.Container("default", "row", [new WebVisuXRToolkit_1.Button(() => { DeleteAllMeasures(); }, { text: "Remove all measures" })]));
    //#endregion UI
    const BASE_LASER_LENGTH = 5000;
    const HITBOX_RADIUS = 4;
    const MEASURE_LINE_WIDTH = 1;
    const BASE_ETIQUETTE_SCALE = 0.002;
    const DEFAULT_ETIQUETTE_SCALE = 0.1;
    const OFFSET_LINE_LABEL = 35;
    const FREE_MEASURE_ANCHOR = new THREE.Vector3(0, 10, 0); // Position of the 3d cursor for positionning measure points in free mode
    const SPHERE_RADIUS = 10;
    const SHRINK_THRESHOLD = 50; // in millimeters
    const FRAME_INTERVAL = 2;
    // Convert mat B position to mat A local space
    function getVectorBinA(A, B) {
        const returnVector = new THREE.Vector3();
        if (!A.equals(B))
            returnVector.getPositionFromMatrix(B).applyMatrix4(new THREE.Matrix4().getInverse(A));
        return returnVector;
    }
    function createHitboxLine(A, B, lineVector) {
        //? const from = new THREE.Vector3() It is destined to be a child of A, so its 'from' is always the 'origin' 
        // TODO: handle when lineVector = (0,0,0), rn we just don't instanciate a mesure if len < given_threshold
        const lineLength = lineVector.length();
        const linePose = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(tmp_vector3.set(0, 0, 0), lineVector);
        const material = new THREE.MeshBasicMaterial({
            color: "red",
            force: true
        });
        const hitboxNode = SceneGraphFactoryStatic.createCylinderNode({
            bottomCenterPoint: new THREE.Vector3(0, 0, 0),
            topCenterPoint: new THREE.Vector3(0, 1, 0),
            radius: HITBOX_RADIUS,
            sag: 5,
            material: material
        });
        hitboxNode.setVisibility(false);
        hitboxNode.setName("Hitbox");
        hitboxNode.setMatrix(linePose.scale(tmp_vector3.set(HITBOX_RADIUS, lineLength, HITBOX_RADIUS)));
        hitboxNode.applyMatrix(A.getMatrix());
        const newMeasureElem = new Node3D("MeasureElement");
        const xrObjects = (0, WebVisuXRToolkit_1.getXRObjects)();
        xrObjects.removeChild(A);
        xrObjects.removeChild(B);
        newMeasureElem.addChild(hitboxNode);
        newMeasureElem.addChild(A);
        newMeasureElem.addChild(B);
        xrObjects.addChild(newMeasureElem);
        measuresHitbox.push({ node: newMeasureElem, a: new THREE.Vector3().getPositionFromMatrix(A.getMatrix()), b: new THREE.Vector3().getPositionFromMatrix(B.getMatrix()) });
        return newMeasureElem;
    }
    function intersectHitbox(ray) {
        let closestIntersection = null;
        for (const node of measuresHitbox) {
            const intersectionPoint = (0, WebVisuXRToolkitHelpers_1.intersectBillboardPlane)(ray, node.a, node.b, HITBOX_RADIUS * 2, tmp_vector3);
            if (!intersectionPoint)
                continue;
            const distance = intersectionPoint.distanceTo(ray.origin);
            // Update closest intersection if necessary
            if (!closestIntersection || distance < closestIntersection.distance) {
                closestIntersection = {
                    point: intersectionPoint,
                    distance: distance,
                    node: node.node
                };
            }
        }
        return closestIntersection;
    }
    function createLineIndicator(lineVector, parent = undefined) {
        const lineLength = lineVector.length();
        const linePose = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(tmp_vector3.set(0, 0, 0), lineVector);
        const material = new THREE.MeshBasicMaterial({
            color: 0xfa9e01,
            force: true
        });
        const lineNode = SceneGraphFactoryStatic.createCylinderNode({
            bottomCenterPoint: new THREE.Vector3(0, 0, 0),
            topCenterPoint: new THREE.Vector3(0, 1, 0),
            radius: 2,
            sag: 5,
            material: material
        });
        lineNode.setName("Line");
        lineNode.setVisibility(true);
        lineNode.setMatrix(linePose.scale(tmp_vector3.set(MEASURE_LINE_WIDTH, lineLength, MEASURE_LINE_WIDTH)));
        if (!parent)
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(lineNode);
        else
            parent.addChild(lineNode);
        return lineNode;
    }
    function updateLineIndicator(line, lineVector) {
        const lineLength = lineVector.length();
        const linePose = (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(tmp_vector3.set(0, 0, 0), lineVector);
        line.setMatrix(linePose.scale(tmp_vector3.set(MEASURE_LINE_WIDTH, lineLength, MEASURE_LINE_WIDTH)));
        return lineLength;
    }
    function createMeasureSphere(matrix, radius) {
        const material = new THREE.MeshBasicMaterial({
            color: 0xfa9e01,
            force: true
        });
        const sphereRep = SceneGraphFactoryStatic.createSphereNode({
            radius: radius,
            material: material
        });
        sphereRep.name = "Measure Node";
        const mat_pos = new THREE.Vector3().getPositionFromMatrix(matrix);
        sphereRep.setMatrix(tmp_matrix4.compose(mat_pos, tmp_quaternion, tmp_vector3.set(1, 1, 1)));
        (0, WebVisuXRToolkit_1.getXRObjects)().addChild(sphereRep);
        return sphereRep;
    }
    function castRayIntoScenegraph(ray, viewer, granularity) {
        let res;
        res = viewer.castRay(ray, undefined, granularity, { usePickingRules: true });
        return res;
    }
    function raycastFromSurface(viewer, pointOnSurface, normal) {
        const epsilon = 1;
        const scaledVector = normal.clone().multiplyScalar(epsilon);
        const ray = new THREE.Ray(pointOnSurface.clone().add(scaledVector), normal);
        let intersects = [];
        intersects = castRayIntoScenegraph(ray, viewer, "prim");
        if (intersects.length < 1)
            return undefined;
        const oppositeIntersectionPoint = intersects[0].point;
        if (!oppositeIntersectionPoint)
            return;
        let oppositeIntersectionMatrix = new THREE.Matrix4().compose(oppositeIntersectionPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
        return oppositeIntersectionMatrix;
    }
    function getFirstIntersectionFromControllerRay(viewer, input) {
        const intersections = input.castRayIntoScenegraph(viewer, undefined, "prim");
        if (intersections.length < 1)
            return undefined;
        return intersections[0];
    }
    /***
     * Meant to be added to the update function of an HTMLTooltip ('this' here)
     */
    function updateEtiquetteStandalone() {
        //lookAt + resize
        const headset_matrix = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)();
        this.userData.posWorld_headsetVector_localPos.getPositionFromMatrix(this.getMatrixWorld()); // posWorld
        this.userData.headSetPos.getPositionFromMatrix(headset_matrix);
        this.userData.posWorld_headsetVector_localPos.sub(this.userData.headSetPos); // headsetVector
        const headset_distance = this.userData.posWorld_headsetVector_localPos.length();
        this.userData.posWorld_headsetVector_localPos.getPositionFromMatrix(this.getMatrix()); // localPos
        let scale;
        if (rescaleToggle.value)
            scale = headset_distance * BASE_ETIQUETTE_SCALE;
        else {
            const len = parseInt(this.dom.innerHTML);
            scale = len * DEFAULT_ETIQUETTE_SCALE;
            scale = scale > 4 ? 4 : scale;
            scale = scale < 0.5 ? 0.5 : scale;
        }
        (0, WebVisuXRToolkitHelpers_1.lookAt)(this, this.userData.headSetPos, this.userData.posWorld_headsetVector_localPos, scale);
    }
    var MeasuringState;
    (function (MeasuringState) {
        MeasuringState[MeasuringState["Idle"] = 0] = "Idle";
        MeasuringState[MeasuringState["Touching"] = 1] = "Touching";
        MeasuringState[MeasuringState["Measuring"] = 2] = "Measuring";
    })(MeasuringState || (MeasuringState = {}));
    const tmp_vector3 = new THREE.Vector3();
    const tmp_matrix4 = new THREE.Matrix4();
    const tmp_quaternion = new THREE.Quaternion();
    let measures = [];
    let measuresHitbox = [];
    let measureState = MeasuringState.Idle;
    let controllerTriggerTouched = false;
    let switching = false;
    let measureMode = "default";
    class MeasureSkill extends EventTarget {
        constructor() {
            super(...arguments);
            this.bindings = new Set();
            this.desiredHandedness = new Set();
            this.distanceMeasured = 0;
            this.posB_headsetVector = new THREE.Vector3();
            this.middlePosWorld = new THREE.Vector3();
        }
        updateEtiquette(distance = undefined) {
            if (!this.etiquette || !this.pointA || !this.pointB)
                return;
            //line middle
            this.posB_headsetVector.getPositionFromMatrix(this.pointB.getMatrix()); // posB
            this.middlePosWorld.getPositionFromMatrix(this.pointA.getMatrix()).add(this.posB_headsetVector).multiplyScalar(0.5);
            //lookAt + resize
            const headsetPos = new THREE.Vector3().getPositionFromMatrix((0, WebVisuXRToolkit_1.getHeadWorldMatrix)());
            this.posB_headsetVector.copy(headsetPos).sub(this.middlePosWorld); // headsetVector
            let scale;
            if (rescaleToggle.value)
                scale = this.posB_headsetVector.length() * BASE_ETIQUETTE_SCALE;
            else {
                const len = parseInt(this.etiquette.dom.innerHTML);
                scale = len * DEFAULT_ETIQUETTE_SCALE;
                scale = scale > 4 ? 4 : scale;
                scale = scale < 0.5 ? 0.5 : scale;
            }
            (0, WebVisuXRToolkitHelpers_1.lookAt)(this.etiquette, headsetPos, this.middlePosWorld.add(this.posB_headsetVector.normalize().multiplyScalar(OFFSET_LINE_LABEL)), scale);
            //precision
            if (distance)
                this.etiquette.updateText(`${(distance / 10).toFixed()} cm`);
        }
        shrinkPointsAndLine(distance) {
            if (!this.pointA || !this.pointB || !this.line)
                return;
            const ratio = distance / SHRINK_THRESHOLD;
            const vScale = tmp_vector3.set(ratio, ratio, ratio);
            this.pointA.setMatrix(this.pointA.getMatrix().scale(vScale));
            this.pointB.setMatrix(this.pointB.getMatrix().scale(vScale));
            this.line.setMatrix(this.line.getMatrix().scale(tmp_vector3.set(ratio, 1, ratio)));
        }
        resetMeasure(input) {
            // destroy point AB and its line
            this.pointA?.getParents()[0].removeChild(this.pointA);
            this.pointB?.getParents()[0].removeChild(this.pointB);
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(this.etiquette);
            this.etiquette = undefined;
            this.line = undefined;
            this.pointA = undefined;
            this.pointB = undefined;
            input.vibrate(0.3, 10);
            measureState = MeasuringState.Idle;
        }
        /*** Nodes organisation after the end of onActivationBegin :
         * |-xrObjects
         *     |-point A
         *         |-Line
         *     |-point B
         *     |-etiquette
         *     |-...
         */
        startCurrentMeasure(input, startPoint = undefined) {
            if (!input.targetRayMatrix)
                return;
            if (measureMode !== "free") // "default" or "normal"
             {
                if (!startPoint) {
                    const intersection = getFirstIntersectionFromControllerRay((0, WebVisuXRToolkit_1.getViewer)(), input);
                    if (!intersection)
                        return;
                    startPoint = intersection.point;
                }
                const intersectionMatrixWorld = tmp_matrix4.compose(startPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
                this.pointA = createMeasureSphere(intersectionMatrixWorld, SPHERE_RADIUS);
                this.pointB = createMeasureSphere(intersectionMatrixWorld, SPHERE_RADIUS);
            }
            else // "free"
             {
                let anchorWorldMatrix;
                if (!startPoint) {
                    const matParent = (0, WebVisuXRToolkit_1.getXRNode)().getMatrix();
                    const anchorLocalMatrix = tmp_matrix4.copy(input.targetRayMatrix).translate(FREE_MEASURE_ANCHOR);
                    anchorWorldMatrix = matParent.multiply(anchorLocalMatrix);
                }
                else
                    anchorWorldMatrix = tmp_matrix4.compose(startPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
                this.pointA = createMeasureSphere(anchorWorldMatrix, SPHERE_RADIUS * 0.7);
                this.pointB = createMeasureSphere(anchorWorldMatrix, SPHERE_RADIUS * 0.7);
            }
            this.line = createLineIndicator(tmp_vector3.set(0, 0, 0), this.pointA);
            this.etiquette = (0, WebVisuXRToolkit_1.createLabelIndicator)("0", true, true);
            this.etiquette.setName("Etiquette");
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(this.etiquette);
        }
        updateCurrentMeasureNormal(input) {
            let intersection = input.userData.intersection;
            if (!intersection)
                return;
            const intersectionPoint = intersection.point;
            const intersectionMatrixWorld = tmp_matrix4.compose(intersectionPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
            this.pointA.setMatrix(intersectionMatrixWorld);
            this.pointB.setMatrix(intersectionMatrixWorld);
            const scaledVector = intersection.normal.multiplyScalar(10000000);
            const oppositeIntersectionPoint = intersectionPoint.clone().add(scaledVector);
            const oppositeIntersectionMatrix = tmp_matrix4.compose(oppositeIntersectionPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
            const lineVector = getVectorBinA(this.pointA.getMatrix(), oppositeIntersectionMatrix);
            updateLineIndicator(this.line, lineVector);
            this.updateEtiquette();
        }
        updateCurrentMeasureDefault(input) {
            let intersection = input.userData.intersection;
            if (!intersection)
                return null;
            const intersectionPoint = intersection.point;
            const intersectionMatrixWorld = tmp_matrix4.compose(intersectionPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
            this.pointB.setMatrix(intersectionMatrixWorld);
            return getVectorBinA(this.pointA.getMatrix(), intersectionMatrixWorld);
        }
        updateCurrentMeasureFree(input) {
            const matParent = (0, WebVisuXRToolkit_1.getXRNode)().getMatrix();
            const controllerAttachementMatrixWorld = matParent.multiply(input.targetRayMatrix.clone().translate(FREE_MEASURE_ANCHOR));
            this.pointB.setMatrix(controllerAttachementMatrixWorld);
            return getVectorBinA(this.pointA.getMatrix(), controllerAttachementMatrixWorld);
        }
        updateCurrentMeasure(input) {
            if (!this.pointA || !this.pointB || !this.line || !input.targetRayMatrix)
                return;
            let lineVector = getVectorBinA(this.pointA.getMatrix(), this.pointB.getMatrix());
            switch (measureMode) {
                case "normal":
                    this.updateCurrentMeasureNormal(input);
                    return;
                case "default":
                    lineVector = this.updateCurrentMeasureDefault(input);
                    break;
                case "free":
                    lineVector = this.updateCurrentMeasureFree(input);
                    break;
                default:
                    console.warn("MeasureSkill: measureMode set to unknown value");
                    return;
            }
            if (lineVector === null)
                return;
            const distance = updateLineIndicator(this.line, lineVector);
            this.updateEtiquette(distance);
            // gradual haptic feedback
            if (Math.abs(distance - this.distanceMeasured) < 10)
                return;
            input.vibrate(0.2, 1);
            this.distanceMeasured = distance;
        }
        endCurrentMeasureDefault(input) {
            const intersection = getFirstIntersectionFromControllerRay((0, WebVisuXRToolkit_1.getViewer)(), input);
            if (!intersection) {
                this.resetMeasure(input);
                return;
            }
            const intersectionPoint = intersection.point;
            return tmp_matrix4.compose(intersectionPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
        }
        endCurrentMeasureNormal(input) {
            const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, "prim");
            if (intersection.length < 1) {
                this.resetMeasure(input);
                return;
            }
            const intersectionPoint = intersection[0].point;
            if (!intersectionPoint) {
                this.resetMeasure(input);
                return;
            }
            let intersectionMatrix = tmp_matrix4.compose(intersectionPoint, tmp_quaternion, tmp_vector3.set(1, 1, 1));
            this.pointA.setMatrix(intersectionMatrix);
            const MatrixOfB = raycastFromSurface((0, WebVisuXRToolkit_1.getViewer)(), intersectionPoint, intersection[0].normal);
            if (!MatrixOfB) {
                this.resetMeasure(input);
                return;
            }
            return MatrixOfB;
        }
        /*** Nodes organisation after the end of onActivationEnd :
         * |-xrObjects
         *     |-MeasureElement(always at [0,0,0])
         *         |-Hitbox
         *         |-point A
         *         |-point B
         *         |-Line
         *         |-etiquette
         *     |-...
         */
        endCurrentMeasure(input) {
            if (!this.pointA || !this.pointB || !this.line || !this.etiquette) {
                this.resetMeasure(input);
                return;
            }
            let MatrixOfB;
            switch (measureMode) {
                case "default":
                    MatrixOfB = this.endCurrentMeasureDefault(input);
                    break;
                case "free":
                    MatrixOfB = this.pointB.getMatrix();
                    break;
                case "normal":
                    MatrixOfB = this.endCurrentMeasureNormal(input);
                    break;
            }
            if (!MatrixOfB) {
                this.resetMeasure(input);
                return;
            }
            const lineVector = getVectorBinA(this.pointA.getMatrix(), MatrixOfB);
            if (lineVector.length() < 3) {
                this.resetMeasure(input);
                return;
            }
            this.pointB.setMatrix(MatrixOfB);
            const distance = updateLineIndicator(this.line, lineVector);
            this.updateEtiquette(distance);
            const newMeasureElement = createHitboxLine(this.pointA, this.pointB, getVectorBinA(this.pointA.getMatrix(), this.pointB.getMatrix()));
            this.pointA.removeChild(this.line);
            this.line.applyMatrix(this.pointA.getMatrix());
            newMeasureElement.addChild(this.line);
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(this.etiquette);
            newMeasureElement.addChild(this.etiquette);
            if (distance < SHRINK_THRESHOLD)
                this.shrinkPointsAndLine(distance);
            this.etiquette.userData = {};
            this.etiquette.userData.posWorld_headsetVector_localPos = new THREE.Vector3();
            this.etiquette.userData.headSetPos = new THREE.Vector3();
            this.etiquette.update = updateEtiquetteStandalone;
            measures.push(this.etiquette);
            this.dispatchEvent(new Event("MeasureDone"));
            this.pointA = undefined;
            this.pointB = undefined;
            this.line = undefined;
            this.etiquette = undefined;
            return MatrixOfB.decompose()[0];
        }
        cancelCurrentMeasure(input) {
            this.resetMeasure(input);
        }
        onActivate(input) { }
        onActivateBegin(input) {
            if (measureState !== MeasuringState.Measuring) {
                this.startCurrentMeasure(input);
                measureState = MeasuringState.Measuring;
            }
            else {
                const endPoint = this.endCurrentMeasure(input);
                if (measureMode !== "normal" && exports.chainToggle.value)
                    this.startCurrentMeasure(input, endPoint);
                else
                    measureState = MeasuringState.Touching;
            }
        }
        onActivateEnd(input, deActivatingAction) { }
        onRegisterInput(input) { }
        onUnregisterInput(input) {
            this.cancelCurrentMeasure(input);
        }
        initialize() {
        }
    }
    class ControllerMeasure extends MeasureSkill {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivateEnd(input, deActivatingAction) {
            super.onActivateEnd(input, deActivatingAction);
            if (measureState === MeasuringState.Measuring)
                this._buttonindicator.updateText(NLS.MeasureCancelLabel);
            else
                this._buttonindicator.updateText(NLS.MeasureDeleteLabel);
        }
        cancelCurrentMeasure(input) {
            super.cancelCurrentMeasure(input);
            this._buttonindicator.updateText(NLS.MeasureDeleteLabel);
        }
        onRegisterInput(input) {
            super.onRegisterInput(input);
            input.addLabelIndicator(this._triggerindicator, "trigger/center");
            input.addLabelIndicator(this._buttonindicator, "lower_button/center");
        }
        onUnregisterInput(input) {
            super.onUnregisterInput(input);
            input.removeLabelIndicator("trigger/center");
            input.removeLabelIndicator("lower_button/center");
        }
        initialize() {
            super.initialize();
            this._triggerindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.MeasureLabel);
            this._buttonindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.MeasureDeleteLabel, true, true);
        }
    }
    exports.ControllerMeasure = ControllerMeasure;
    class ControllerMeasureDelete {
        constructor(measure) {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FirstButtonPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this.deleteRay = new THREE.Ray();
            this.measureSkill = measure;
        }
        createDestroyLaserCube(input) {
            const material = new THREE.MeshBasicMaterial({
                color: "red",
                force: true
            });
            const cubeRep = SceneGraphFactoryStatic.createCuboidNode({
                cornerPoint: new THREE.Vector3(0.0, 0.0, 0.0),
                firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
                secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
                thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
                material: material
            });
            cubeRep.name = "Destroy laser";
            input.userData.destroyNode = cubeRep;
            input.userData.destroyNode.setVisibility(false);
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(input.userData.destroyNode);
        }
        DeleteMeasure(measure) {
            // Remove from root
            (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(measure);
            // Remove from array
            const child_etiquet = measure.getChildByName("Etiquette");
            if (child_etiquet instanceof WebVisuXRToolkit_1.HTMLTooltip) {
                const index = measures.indexOf(child_etiquet);
                measures.splice(index, 1);
            }
            else
                throw new Error("Expected child_etiquet to be of type HTMLTooltip");
            this.selectedMeasure = undefined;
            this.selectedHitbox = undefined;
        }
        cancelSelection() {
            this.selectedHitbox?.setVisibility(false);
            this.selectedMeasure = undefined;
            this.selectedHitbox = undefined;
        }
        customRaycast(ray) {
            const intersectionHTML = (0, WebVisuXRToolkitHelpers_1.intersectHTMLNode)(this.deleteRay, measures);
            if (intersectionHTML) {
                const parents = intersectionHTML.node.getParents();
                if (parents.length === 0)
                    return undefined;
                return parents[0];
            }
            else {
                const intersectionNode3D = intersectHitbox(this.deleteRay);
                if (!intersectionNode3D)
                    return;
                return intersectionNode3D.node;
            }
        }
        onActivate(input) {
            if (!input.targetRayMatrix || measureState === MeasuringState.Measuring)
                return;
            const target = input.targetRayMatrix.decompose();
            input.userData.destroyNode.setMatrix(tmp_matrix4.compose(target[0], target[1], tmp_vector3.set(1, BASE_LASER_LENGTH, 1)));
        }
        onActivateBegin(input, activatingAction) {
            if (measureState === MeasuringState.Measuring) {
                if (!controllerTriggerTouched)
                    switching = true;
                this.measureSkill.cancelCurrentMeasure(input);
                if (controllerTriggerTouched)
                    measureState = MeasuringState.Touching;
                return;
            }
            if (input.targetRayWorldMatrix === undefined)
                return;
            input.userData.destroyNode.setVisibility(true);
            input.targetRayWorldMatrix.decompose(tmp_vector3, tmp_quaternion, undefined);
            const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(tmp_quaternion);
            this.deleteRay.set(tmp_vector3, raycastForward);
            const hitObject = this.customRaycast(this.deleteRay);
            if (!hitObject)
                return;
            this.selectedMeasure = hitObject;
            if (this.selectedMeasure.name !== "MeasureElement")
                console.warn(new Error("There should be a 'MeasureElement' there but is wasn't found"));
            this.selectedHitbox = this.selectedMeasure.getChildByName("Hitbox");
            this.selectedHitbox.setVisibility(true);
            input.vibrate(0.5, 10);
        }
        onActivateEnd(input, deActivatingAction) {
            input.userData.destroyNode.setVisibility(false);
            if (!this.selectedMeasure || !input.targetRayWorldMatrix)
                return;
            input.targetRayWorldMatrix.decompose(tmp_vector3, tmp_quaternion, undefined);
            const raycastForward = new THREE.Vector3(0, 1, 0).applyQuaternion(tmp_quaternion);
            this.deleteRay.set(tmp_vector3, raycastForward);
            const hitObject = this.customRaycast(this.deleteRay);
            if (!hitObject)
                return;
            if (hitObject === this.selectedMeasure) {
                this.DeleteMeasure(this.selectedMeasure);
                input.vibrate(0.5, 10);
            }
            this.cancelSelection();
        }
        onRegisterInput(input) {
            this.createDestroyLaserCube(input);
        }
        onUnregisterInput(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(input.userData.destroyNode);
        }
        initialize() {
        }
    }
    exports.ControllerMeasureDelete = ControllerMeasureDelete;
    function DeleteAllMeasures() {
        const measures_to_delete = measures.splice(0, measures.length);
        measures_to_delete.forEach(element => {
            if (element) {
                (0, WebVisuXRToolkit_1.getXRObjects)().removeChild(element.getParents()[0]);
            }
        });
    }
    class ControllerMeasureDeleteAll {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FirstButtonPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
        }
        onActivateEnd(input, deActivatingAction) {
            DeleteAllMeasures();
        }
        onRegisterInput(input) {
            input.addLabelIndicator(this._buttonindicator, "lower_button/center");
        }
        onUnregisterInput(input) {
            input.removeLabelIndicator("lower_button/center");
        }
        initialize() {
            this._buttonindicator = (0, WebVisuXRToolkit_1.createLabelIndicator)(NLS.MeasureDeleteLabel);
        }
    }
    exports.ControllerMeasureDeleteAll = ControllerMeasureDeleteAll;
    class MeasureLaserPassive {
        constructor(measure) {
            this.bindings = new Set();
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this.frame_counter = 0;
            this.measureSkill = measure;
        }
        createLaserCube(input) {
            const material = new THREE.MeshBasicMaterial({
                color: 0x88bdd5,
                force: true
            });
            const cubeRep = SceneGraphFactoryStatic.createCuboidNode({
                cornerPoint: new THREE.Vector3(0.0, 0.0, 0.0),
                firstAxis: new THREE.Vector3(1.0, 0.0, 0.0),
                secondAxis: new THREE.Vector3(0.0, 1.0, 0.0),
                thirdAxis: new THREE.Vector3(0.0, 0.0, 1.0),
                material: material
            });
            cubeRep.name = "Picking laser";
            input.userData.laserNode = cubeRep;
            input.userData.laserNode.setVisibility(false);
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(input.userData.laserNode);
        }
        createFreeAnchorSphere(scale = 1) {
            const material = new THREE.MeshBasicMaterial({
                color: 0xfec00f // yellow
                ,
                force: true
            });
            const sphereRep = SceneGraphFactoryStatic.createSphereNode({
                radius: SPHERE_RADIUS * scale,
                material: material
            });
            sphereRep.name = "Free Measure Anchor";
            return sphereRep;
        }
        turnReticleOn(input) {
            measureMode = exports.measureModeRadio.value;
            if (measureMode !== "free") {
                const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, "prim");
                input.userData.intersection = intersection[0];
                input.userData.laserNode.setVisibility(true);
                input.userData.freeAnchorNode.setVisibility(true);
            }
            else {
                input.userData.freeAnchorNode.setVisibility(true);
            }
        }
        checkSwitch(input) {
            if (!switching)
                return false;
            switching = false;
            if (measureState === MeasuringState.Touching)
                this.onActivateBegin(input);
            if (measureState === MeasuringState.Idle) {
                this.onActivateEnd(input);
                return false;
            }
            return true;
        }
        onActivate(input) {
            if (!input.targetRayMatrix)
                return;
            if (measureState === MeasuringState.Idle || switching)
                if (this.checkSwitch(input) === false)
                    return;
            if (measureMode !== "free") {
                if (this.frame_counter >= FRAME_INTERVAL) {
                    const intersection = input.castRayIntoScenegraph((0, WebVisuXRToolkit_1.getViewer)(), undefined, "prim");
                    input.userData.intersection = intersection[0];
                    this.frame_counter = 0;
                }
                this.frame_counter += 1;
                const laserLen = input.userData.intersection?.distance || BASE_LASER_LENGTH;
                const target = input.targetRayMatrix.decompose();
                input.userData.laserNode.setMatrix(tmp_matrix4.compose(target[0], target[1], tmp_vector3.set(1, laserLen, 1)));
                if (!input.userData.intersection) {
                    input.userData.freeAnchorNode.setVisibility(false);
                    return;
                }
                const intersectionMatrixFronInput = input.targetRayMatrix.translate(tmp_vector3.set(0, input.userData.intersection.distance, 0));
                input.userData.freeAnchorNode.setMatrix(intersectionMatrixFronInput);
                input.userData.freeAnchorNode.setVisibility(true);
            }
            else
                input.userData.freeAnchorNode.setMatrix(input.targetRayMatrix.translate(FREE_MEASURE_ANCHOR));
            if (measureState === MeasuringState.Measuring)
                this.measureSkill.updateCurrentMeasure(input);
        }
        onActivateBegin(input) {
            if (measureState !== MeasuringState.Idle)
                this.turnReticleOn(input);
        }
        onActivateEnd(input) {
            this.frame_counter = 0;
            input.userData.laserNode.setVisibility(false);
            input.userData.freeAnchorNode.setVisibility(false);
        }
        onRegisterInput(input) {
            measureMode = exports.measureModeRadio.value;
            this.frame_counter = 0;
            this.createLaserCube(input);
            const freeAnchorSphere = this.createFreeAnchorSphere(0.7);
            input.userData.freeAnchorNode = freeAnchorSphere;
            input.userData.freeAnchorNode.setVisibility(false);
            (0, WebVisuXRToolkit_1.getXRNode)().addChild(input.userData.freeAnchorNode);
        }
        onUnregisterInput(input) {
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(input.userData.laserNode);
            input.userData.laserNode = null;
            (0, WebVisuXRToolkit_1.getXRNode)().removeChild(input.userData.freeAnchorNode);
            input.userData.freeAnchorNode = null;
        }
    }
    class ControllerMeasureLaserPassive extends MeasureLaserPassive {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.ControllerPassive]);
        }
    }
    exports.ControllerMeasureLaserPassive = ControllerMeasureLaserPassive;
    class HandMeasureLaserPassive extends MeasureLaserPassive {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.HandPassive]);
        }
    }
    exports.HandMeasureLaserPassive = HandMeasureLaserPassive;
    class MeasureLaser {
        constructor() {
            this.bindings = new Set();
            this.desiredHandedness = new Set();
        }
        onActivate(input) {
        }
        onActivateBegin(input) {
            if (measureState === MeasuringState.Idle) {
                measureState = MeasuringState.Touching;
                switching = true;
            }
        }
        onActivateEnd(input) {
            if (measureState === MeasuringState.Touching) {
                measureState = MeasuringState.Idle;
                switching = true;
            }
        }
        onRegisterInput(input) {
        }
        onUnregisterInput(input) {
        }
    }
    class ControllerMeasureLaser extends MeasureLaser {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.TriggerTouch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivateBegin(input) {
            controllerTriggerTouched = true;
            super.onActivateBegin(input);
        }
        onActivateEnd(input) {
            controllerTriggerTouched = false;
            super.onActivateEnd(input);
        }
        onRegisterInput(input) {
            controllerTriggerTouched = false;
            super.onRegisterInput(input);
        }
        onUnregisterInput(input) {
            controllerTriggerTouched = false;
            super.onUnregisterInput(input);
        }
    }
    exports.ControllerMeasureLaser = ControllerMeasureLaser;
    class HandMeasure extends MeasureSkill {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.IndexPinch]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivateBegin(input) { }
        onActivateEnd(input) {
            switch (measureState) {
                case MeasuringState.Idle:
                    measureState = MeasuringState.Touching;
                    switching = true;
                    break;
                case MeasuringState.Touching:
                case MeasuringState.Measuring:
                    super.onActivateBegin(input);
                    break;
                default:
                    console.warn("MeasureSkill in HandMeasure class: unknown measuring state found");
                    break;
            }
        }
    }
    exports.HandMeasure = HandMeasure;
    class HandMeasureDelete extends ControllerMeasureDelete {
        constructor() {
            super(...arguments);
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.GunHand]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
    }
    exports.HandMeasureDelete = HandMeasureDelete;
    class HandMeasureCancel {
        constructor(measure) {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.HandPalmUp]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
            this.measureSkill = measure;
        }
        onActivate(input) { }
        onActivateBegin(input, activatingAction) {
            if (measureState === MeasuringState.Idle)
                return;
            switching = true;
            this.measureSkill.cancelCurrentMeasure(input);
        }
        onActivateEnd(input, deActivatingAction) { }
        onRegisterInput(input) { }
        onUnregisterInput(input) { }
    }
    exports.HandMeasureCancel = HandMeasureCancel;
});
