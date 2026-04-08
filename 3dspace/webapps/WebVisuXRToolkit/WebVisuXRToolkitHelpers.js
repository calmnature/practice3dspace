define("DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", ["require", "exports", "DS/Visualization/Node3D", "DS/Visualization/SceneGraphFactory", "DS/Visualization/ThreeJS_DS", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuGLTF/GLTFLoader", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager"], function (require, exports, Node3D, SceneGraphFactoryStatic, THREE, WebappsUtils_1, GLTFLoader, WebVisuXRToolkitManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractLocalEulerRotation = extractLocalEulerRotation;
    exports.makeRotationMatrix = makeRotationMatrix;
    exports.getWorldForwardVector = getWorldForwardVector;
    exports.lookAt = lookAt;
    exports.map_numeric = map_numeric;
    exports.getNodeWorldTransform = getNodeWorldTransform;
    exports.getDebugAxis = getDebugAxis;
    exports.getDebugAxisGLB = getDebugAxisGLB;
    exports.convertXRRigidTransform = convertXRRigidTransform;
    exports.convertXRRigidTransformViewpoint = convertXRRigidTransformViewpoint;
    exports.convertXRRigidTransformScale = convertXRRigidTransformScale;
    exports.getWebXRCapabilitiesLite = getWebXRCapabilitiesLite;
    exports.getWebXRCapabilities = getWebXRCapabilities;
    exports.intersectHTMLNode = intersectHTMLNode;
    exports.intersectBillboardPlane = intersectBillboardPlane;
    const THREEVector3 = THREE.Vector3;
    const THREEMatrix4 = THREE.Matrix4;
    //? Note: Using local vectors will usually be a better idea
    function extractLocalEulerRotation(localMatrix, axis) {
        const rotMat = new THREEMatrix4().extractRotation(localMatrix);
        const te = rotMat.elements;
        const m11 = te[0];
        const m21 = te[1];
        const m31 = te[2], m32 = te[6], m33 = te[10];
        switch (axis.toLowerCase()) {
            case 'x':
                return Math.atan2(m32, m33) / Math.PI;
            case 'y':
                return (Math.atan2(-m31, Math.sqrt(m32 * m32 + m33 * m33)) * 2) / Math.PI;
            case 'z':
                return Math.atan2(m21, m11) / Math.PI;
            default:
                throw new Error('Invalid axis specified');
        }
    }
    const _front = new THREEVector3();
    const _right = new THREEVector3();
    const _correctedUp = new THREEVector3();
    const _fallbackRight = new THREEVector3(1, 0, 0);
    const _defaultUp = new THREEVector3(0, 0, 1);
    function makeRotationMatrix(from, to, up = _defaultUp, target = new THREEMatrix4() // Optional: pass matrix to avoid allocation
    ) {
        _front.subVectors(to, from).normalize();
        _right.crossVectors(_front, up).normalize();
        if (_right.lengthSq() < Number.EPSILON) {
            _right.copy(_fallbackRight);
        }
        _correctedUp.crossVectors(_right, _front).normalize();
        return target.makeBasis(_right, _front, _correctedUp);
    }
    /**
     * Y being the forward direction
    * @param node The object from which we want the forward vector
     * @returns The forward vector in world coordinates
     */
    function getWorldForwardVector(node) {
        return new THREEVector3(0, 1, 0).applyQuaternion(node.getMatrixWorld().decompose()[1]);
    }
    function lookAt(node, at, position = undefined, scale = 1) {
        if (!position)
            position = new THREEVector3().getPositionFromMatrix(node.getMatrix());
        const lookRotationMatrix = makeRotationMatrix(position, at);
        if (node._matrix) {
            node._matrix.compose(position, new THREE.Quaternion().setFromRotationMatrix(lookRotationMatrix), new THREEVector3(scale, scale, scale));
        }
        else {
            node._matrix = new THREEMatrix4().compose(position, new THREE.Quaternion().setFromRotationMatrix(lookRotationMatrix), new THREEVector3(scale, scale, scale));
        }
        node._updateMatrix();
    }
    function map_numeric(current, in_min, in_max, out_min, out_max) {
        const mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        return THREE.Math.clamp(mapped, out_min, out_max);
    }
    function getNodeWorldTransform(node, root, resultMatrix) {
        // Start with the local matrix of the current bone
        resultMatrix.copy(node._matrix || new THREEMatrix4());
        let current = node;
        // Walk up the tree until we hit the root
        while (current !== root && current.parents.length > 0 && current.parents[0]) {
            current = current.parents[0];
            // OPERATION: Target = Parent * Target
            // This achieves the same result as premultiply.
            // Note: multiplyMatrices safely handles the case where input (target) is also the output.
            resultMatrix.multiplyMatrices(current.getMatrix(), resultMatrix);
        }
    }
    function getDebugAxis() {
        const node = new Node3D();
        node.addChild(SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREEVector3(0.0, 0.0, 0.0),
            firstAxis: new THREEVector3(10.0, 0.0, 0.0),
            secondAxis: new THREEVector3(0.0, 1.0, 0.0),
            thirdAxis: new THREEVector3(0.0, 0.0, 1.0),
            material: new THREE.MeshBasicMaterial({
                color: "red",
                force: true
            })
        }));
        node.addChild(SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREEVector3(0.0, 0.0, 0.0),
            firstAxis: new THREEVector3(1.0, 0.0, 0.0),
            secondAxis: new THREEVector3(0.0, 10.0, 0.0),
            thirdAxis: new THREEVector3(0.0, 0.0, 1.0),
            material: new THREE.MeshBasicMaterial({
                color: "green",
                force: true
            })
        }));
        node.addChild(SceneGraphFactoryStatic.createCuboidNode({
            cornerPoint: new THREEVector3(0.0, 0.0, 0.0),
            firstAxis: new THREEVector3(1.0, 0.0, 0.0),
            secondAxis: new THREEVector3(0.0, 1.0, 0.0),
            thirdAxis: new THREEVector3(0.0, 0.0, 10.0),
            material: new THREE.MeshBasicMaterial({
                color: "blue",
                force: true
            })
        }));
        return node;
    }
    async function getDebugAxisGLB() {
        const loader = new GLTFLoader();
        return loader.load((0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkitDebug", "models/dbg_coordinate_system_8mm.glb"));
    }
    const _conversionPre = new THREEMatrix4().makeRotationX(0.5 * Math.PI).rotateY(Math.PI);
    const _conversionPost = new THREEMatrix4().makeRotationX(-0.5 * Math.PI);
    const _scratchMat = new THREEMatrix4();
    function convertXRRigidTransform(transform, target = new THREEMatrix4()) {
        _scratchMat.setFromArray(Array.from(transform.matrix));
        _scratchMat.elements[12] *= 1000;
        _scratchMat.elements[13] *= 1000;
        _scratchMat.elements[14] *= 1000;
        return target.copy(_conversionPre)
            .multiply(_scratchMat)
            .multiply(_conversionPost);
    }
    function convertXRRigidTransformViewpoint(transform, target = new THREEMatrix4()) {
        _scratchMat.setFromArray(Array.from(transform.matrix));
        _scratchMat.elements[12] *= 1000;
        _scratchMat.elements[13] *= 1000;
        _scratchMat.elements[14] *= 1000;
        return target.copy(_conversionPre)
            .multiply(_scratchMat);
    }
    function convertXRRigidTransformScale(transform, target = new THREEMatrix4()) {
        _scratchMat.setFromArray(Array.from(transform.matrix));
        // 4. APPLY UNIFORM SCALE MANUALLY
        // Instead of creating Vectors and calling compose(), we modify the matrix buffer directly.
        // Multiplying the rotation columns (0, 4, 8) by 1000 scales the object.
        // Multiplying the translation column (12) by 1000 scales the position.
        const te = _scratchMat.elements;
        te[0] *= 1000;
        te[1] *= 1000;
        te[2] *= 1000;
        te[4] *= 1000;
        te[5] *= 1000;
        te[6] *= 1000;
        te[8] *= 1000;
        te[9] *= 1000;
        te[10] *= 1000;
        te[12] *= 1000;
        te[13] *= 1000;
        te[14] *= 1000;
        return target.copy(_conversionPre).multiply(_scratchMat);
    }
    async function getWebXRCapabilitiesLite() {
        if (navigator.xr) {
            return {
                "WebXRAvailable": (await navigator.xr.isSessionSupported('immersive-ar') || await navigator.xr.isSessionSupported('immersive-vr')),
                "MixedRealityAvailable": await navigator.xr.isSessionSupported('immersive-ar'),
                "HitTestAvailable": undefined,
                "HandTrackingAvailable": undefined,
                "isSmartphone": undefined,
                "resolution": undefined,
            };
        }
        return {
            "WebXRAvailable": false,
            "MixedRealityAvailable": false,
            "HitTestAvailable": false,
            "HandTrackingAvailable": false,
            "isSmartphone": false,
            "resolution": { "width": 0, "height": 0 }
        };
    }
    async function getWebXRCapabilities() {
        console.warn("In order for the function getWebXRCapabilities() to work, we need it to be called after a button press");
        const canvas = new OffscreenCanvas(800, 600);
        const context = canvas.getContext("webgl");
        if (navigator.xr) {
            const res = {
                "WebXRAvailable": (await navigator.xr.isSessionSupported('immersive-ar') || await navigator.xr.isSessionSupported('immersive-vr')),
                "MixedRealityAvailable": await navigator.xr.isSessionSupported('immersive-ar'),
                "HitTestAvailable": false,
                "HandTrackingAvailable": false,
                "isSmartphone": undefined,
                "resolution": { "width": 0, "height": 0 },
            };
            if (res.WebXRAvailable && context) {
                const mode = res.MixedRealityAvailable ? "immersive-ar" : "immersive-vr";
                const xrDummySession = await navigator.xr.requestSession(mode, {
                    requiredFeatures: ['local-floor'],
                    optionalFeatures: ["hand-tracking", "bounded-floor", "hit-test"]
                });
                if (context.makeXRCompatible) {
                    await context.makeXRCompatible();
                }
                const glBaseLayer = new XRWebGLLayer(xrDummySession, context, {
                    alpha: false
                });
                xrDummySession.updateRenderState({
                    baseLayer: glBaseLayer
                });
                const enabledFeatures = xrDummySession.enabledFeatures;
                if (enabledFeatures && enabledFeatures.includes('hit-test')) {
                    res.HitTestAvailable = true;
                }
                if (enabledFeatures && enabledFeatures.includes('hand-tracking')) {
                    res.HandTrackingAvailable = true;
                }
                const viewer_ref_space = await xrDummySession.requestReferenceSpace("bounded-floor").catch(error => { return xrDummySession.requestReferenceSpace("local-floor"); });
                return new Promise((resolve, reject) => {
                    const debugAnimationFrame = (time, frame) => {
                        const pose = frame.getViewerPose(viewer_ref_space);
                        if (pose) {
                            const views = pose.views;
                            let isStereoRendering = views.length === 2;
                            const glLayer = xrDummySession.renderState.baseLayer;
                            let viewport_view1;
                            let viewport_view2;
                            if (glLayer) {
                                viewport_view1 = glLayer.getViewport(views[0]);
                                if (views.length > 1) {
                                    viewport_view2 = glLayer.getViewport(views[1]);
                                }
                            }
                            if (viewport_view1) {
                                if (viewport_view1.width === 0 || !views[0].eye || views[0].eye === 'none') {
                                    // Here we assume that it is always the second view (right eye) that is of width 0
                                    // Needed for the meta immersive emulator chrome in mono rendering mode at the date of 01/02/2025 or native android chrome before 01/06/2023
                                    isStereoRendering = false;
                                }
                                res.resolution.width += viewport_view1.width;
                                res.resolution.height = viewport_view1.height;
                            }
                            if (viewport_view2) {
                                if (viewport_view2.width === 0 || !views[1].eye || views[1].eye === 'none') {
                                    // Here we assume that it is always the second view (right eye) that is of width 0
                                    // Needed for the meta immersive emulator chrome in mono rendering mode at the date of 01/02/2025 or native android chrome before 01/06/2023
                                    isStereoRendering = false;
                                }
                                res.resolution.width += viewport_view2.width;
                                res.resolution.height = viewport_view2.height;
                            }
                            res.isSmartphone = !isStereoRendering;
                            xrDummySession.end();
                            resolve(res);
                        }
                        else {
                            xrDummySession.requestAnimationFrame(debugAnimationFrame);
                        }
                    };
                    xrDummySession.requestAnimationFrame(debugAnimationFrame);
                });
            }
            else {
                return res;
            }
        }
        return {
            "WebXRAvailable": false,
            "MixedRealityAvailable": false,
            "HitTestAvailable": false,
            "HandTrackingAvailable": false,
            "isSmartphone": false,
            "resolution": { "width": 0, "height": 0 }
        };
    }
    function intersectHTMLNode(ray, intersectables) {
        let closestIntersection = null;
        for (const node of intersectables) {
            if (!node.isEffectivelyVisible(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.XRObjects))
                continue;
            const rectMatrixDec = node.UIBox.getMatrixWorld().decompose();
            const planeNormal = new THREEVector3(0, 0, -1).applyQuaternion(rectMatrixDec[1]); //UI normal is through the user thats why we need to reverse it
            const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, rectMatrixDec[0]);
            // Intersect ray with the plane
            const intersectionPoint = new THREEVector3();
            if (!ray.intersectPlaneInDir(plane, intersectionPoint))
                continue; // No intersection with the plane
            // Transform the intersection point into rectangle's local space
            const rectMatrixInverse = new THREEMatrix4().getInverse(node.UIBox.getMatrixWorld());
            const localPoint = intersectionPoint.clone().applyMatrix4(rectMatrixInverse);
            // Check if the local point is within the rectangle's bounds
            if (localPoint.x < 0 || localPoint.x > 1.0 || localPoint.y < 0 || localPoint.y > 1.0)
                continue; // Intersection point is outside the rectangle break
            const distance = intersectionPoint.distanceTo(ray.origin);
            // Update closest intersection if necessary
            if (!closestIntersection || distance < closestIntersection.distance) {
                closestIntersection = {
                    point: intersectionPoint,
                    uv: new THREE.Vector2(localPoint.x, localPoint.y),
                    distance,
                    node
                };
            }
        }
        return closestIntersection;
    }
    const _axis = new THREEVector3();
    const _vToOrigin_closestPointOnAxis = new THREEVector3();
    const _planeNormal_vToIntersection_pointOnLine = new THREEVector3();
    const _tmp = new THREEVector3(); // Generic temp for math operations
    /**
     * Checks for intersection between a Ray and an imaginary rectangular plane
     * defined by a segment (pointA to pointB) and a width.
     * The plane is mathematically oriented to always face the ray origin.
     * @param ray - The THREE.Ray to cast.
     * @param pointA - The start coordinate of the plane's length (axis).
     * @param pointB - The end coordinate of the plane's length (axis).
     * @param width - The constant width of the plane.
     * @param target - A THREE.Vector3 to store the result in.
     * @returns The 'target' vector if hit, or null if no hit.
     */
    function intersectBillboardPlane(ray, pointA, pointB, width, target) {
        // 1. Setup Axis (The hinge of the plane)
        _axis.subVectors(pointB, pointA);
        const lenSq = _axis.lengthSq();
        if (lenSq === 0)
            return null; // A and B are identical
        // 2. Calculate Plane Normal
        // The plane rotates around _axis to face ray.origin.
        // The Normal is the vector from the Axis to the Ray Origin, perpendicular to the Axis.
        // Find closest point on Infinite Line AB to Ray Origin
        _vToOrigin_closestPointOnAxis.subVectors(ray.origin, pointA); // _vToOrigin
        const tOrigin = _vToOrigin_closestPointOnAxis.dot(_axis) / lenSq;
        // _closestPointOnAxis = A + (Axis * tOrigin)
        _tmp.copy(_axis).multiplyScalar(tOrigin);
        _vToOrigin_closestPointOnAxis.copy(pointA).add(_tmp); // _closestPointOnAxis 
        // Normal = Origin - ClosestPoint (Points towards the ray origin)
        _planeNormal_vToIntersection_pointOnLine.subVectors(ray.origin, _vToOrigin_closestPointOnAxis); // _planeNormal
        // If Ray Origin is exactly ON the axis, orientation is undefined. 
        // We treat this as a miss.
        if (_planeNormal_vToIntersection_pointOnLine.lengthSq() < 0.000001) {
            return null;
        }
        _planeNormal_vToIntersection_pointOnLine.normalize();
        // 3. Intersect Ray with Infinite Plane
        // Plane is defined by: Point A and _planeNormal_vToIntersection_pointOnLine.
        // Ray: Origin + Dir * t
        // t = ((PlanePoint - RayOrigin) . Normal) / (RayDir . Normal)
        const denom = ray.direction.dot(_planeNormal_vToIntersection_pointOnLine);
        // If denom is 0, Ray is parallel to plane.
        // We do NOT check for backface culling (denom > 0) because the prompt 
        // specifies "hits from front or back" (though physically, facing origin implies front).
        if (Math.abs(denom) < 0.000001) {
            return null;
        }
        // Vector from Origin to a point on the plane (we use Point A)
        _tmp.subVectors(pointA, ray.origin);
        const distanceToPlane = _tmp.dot(_planeNormal_vToIntersection_pointOnLine) / denom;
        // Check if intersection is behind the ray origin
        if (distanceToPlane < 0) {
            return null;
        }
        // Calculate actual Hit Point in 3D space
        // target = ray.origin + (ray.direction * distance)
        _tmp.copy(ray.direction).multiplyScalar(distanceToPlane);
        target.copy(ray.origin).add(_tmp);
        // 4. Verify Bounds (Rectangular Check)
        // A. Length Check (Is point between A and B?)
        _planeNormal_vToIntersection_pointOnLine.subVectors(target, pointA); // _vToIntersection
        const tHit = _planeNormal_vToIntersection_pointOnLine.dot(_axis) / lenSq;
        if (tHit < 0 || tHit > 1) {
            return null; // Hit is above or below the segment
        }
        // B. Width Check (Is point within width/2 of axis?)
        // Find the point on the axis perpendicular to the hit
        // PointOnLine = A + (Axis * tHit)
        _tmp.copy(_axis).multiplyScalar(tHit);
        _planeNormal_vToIntersection_pointOnLine.copy(pointA).add(_tmp); // _pointOnLine
        // Calculate squared distance from axis to hit point
        const distSqFromAxis = target.distanceToSquared(_planeNormal_vToIntersection_pointOnLine);
        // Compare with (width/2)^2
        if (distSqFromAxis > (width * width) * 0.25) {
            return null; // Hit is too wide
        }
        return target;
    }
});
