(function (workerContext) {
    require(['DS/Mesh/ThreeJS_Base'], function (THREE) {
        const distanceMapRange = 1 << 16;
        const frequencies = new Int32Array(distanceMapRange * 2);
        let distancesBuffer = new Float32Array();

        /**
         * nodeId - {centers, splatCount, splatIndices, splatTree, indicesOut}
         */
        let nodeDatas = {};
        let transfertBuffer = null; // used in order to reduce memory transfert
        workerContext.onmessage = function (message) {
            function onInit(payload) {
                const splatCount = payload.data.centers.length / 3;
                const nodeData = {
                    centers: payload.data.centers,
                    splatCount: splatCount,
                    indicesOut: new Uint32Array(splatCount),

                    // Initialized on frustum culling
                    splatIndices: null,
                    splatTree: null,
                };
                nodeDatas[payload.nodeId] = nodeData;

                if (distancesBuffer.length < splatCount) {
                    distancesBuffer = new Float32Array(splatCount);
                }
            }

            function onSort(payload) {
                // console.log(`received onSort data with array of size ${payload.data.splatIndices.length}`);

                // Frustum Culling to reduce sort load
                const nodeData = nodeDatas[payload.nodeId];
                let nbRendered = nodeData.splatCount;
                if (payload.useFrustumCulling) {
                    if (nodeData.splatTree === null) {
                        nodeData.splatIndices = new Uint32Array(nodeData.splatCount);
                        for (let i = 0; i < nodeData.splatCount; i++)
                            nodeData.splatIndices[i] = i;

                        nodeData.splatTree = new SplatTree(8, 1000);
                        nodeData.splatTree.processSplatCenters(nodeData.centers);
                    }

                    nbRendered = gatherSceneNodesForSort(payload.data.camera, nodeData.splatTree, nodeData.splatIndices, payload.data.matrixWorld, payload.data.viewportDims);
                }
                splatSort(nodeData.splatIndices, payload.data.mvpMatrix, nodeData.centers, nodeData.indicesOut, distancesBuffer, nbRendered);

                transfertBuffer = new Float32Array(nodeData.indicesOut, 0, nbRendered);
                workerContext.postMessage({ sortComplete: true, nodeId: payload.nodeId, data: { nbRendered, indicesOut: transfertBuffer } }, [transfertBuffer.buffer]);
            }

            function splatSort(splatIndices, mvpMatrix, splatCenters, indicesOut, splatDistances, renderCount) {
                let maxDistance = -2147483640;
                let minDistance = 2147483640;

                for (let i = 0; i < renderCount; i++) {
                    const indexOffset = 3 * (splatIndices ? splatIndices[i] : i);
                    const distance =
                        (mvpMatrix.elements[2] * splatCenters[indexOffset] +
                            mvpMatrix.elements[6] * splatCenters[indexOffset + 1] +
                            mvpMatrix.elements[10] * splatCenters[indexOffset + 2]) *
                        4096.0;
                    splatDistances[i] = distance;
                    if (distance > maxDistance) maxDistance = distance;
                    if (distance < minDistance) minDistance = distance;
                }

                let distancesRange = maxDistance - minDistance;
                let rangeMap = (distanceMapRange - 1) / distancesRange;

                for (let i = 0; i < distanceMapRange * 2; i++) {
                    frequencies[i] = 0;
                }

                for (let i = 0; i < renderCount; i++) {
                    let frequenciesIndex = Math.round(
                        (splatDistances[i] - minDistance) * rangeMap
                    );
                    splatDistances[i] = frequenciesIndex;
                    frequencies[frequenciesIndex] = frequencies[frequenciesIndex] + 1;
                }

                let cumulativeFreq = frequencies[0];
                for (let i = 1; i < distanceMapRange; i++) {
                    let freq = frequencies[i];
                    cumulativeFreq += freq;
                    frequencies[i] = cumulativeFreq;
                }

                for (let i = renderCount - 1; i >= 0; i--) {
                    let frequenciesIndex = splatDistances[i];
                    let freq = frequencies[frequenciesIndex];
                    indicesOut[renderCount - freq] = splatIndices ? splatIndices[i] : i;
                    frequencies[frequenciesIndex] = freq - 1;
                }

                return indicesOut;
            };

            let payload = message.data;
            if (payload.init) {
                onInit(payload);
            } else if (payload.sort) {
                onSort(payload);
            }
        };

        class Box3 {
            min = [-Infinity, -Infinity, -Infinity];
            max = [Infinity, Infinity, Infinity];

            constructor(minX, minY, minZ, maxX, maxY, maxZ) {
                this.min[0] = minX;
                this.min[1] = minY;
                this.min[2] = minZ;

                this.max[0] = maxX;
                this.max[1] = maxY;
                this.max[2] = maxZ;
            }

            containsPoint(point) {
                if (point[0] < this.min[0] || point[0] > this.max[0] ||
                    point[1] < this.min[1] || point[1] > this.max[1] ||
                    point[2] < this.min[2] || point[2] > this.max[2]) {

                    return false;
                }

                return true;
            }
        }

        class SplatTreeNode {
            min = [-Infinity, -Infinity, -Infinity];
            max = [Infinity, Infinity, Infinity];
            center = [0, 0, 0];
            /**
             * @param {Array[3]} min
             * @param {Array[3]} max
             * @param {number} depth
             */
            constructor(min, max, depth) {
                this.min[0] = min[0];
                this.min[1] = min[1];
                this.min[2] = min[2];

                this.max[0] = max[0];
                this.max[1] = max[1];
                this.max[2] = max[2];

                this.boundingBox = new Box3(this.min[0], this.min[1], this.min[2], this.max[0], this.max[1], this.max[2]);
                this.center[0] = (this.max[0] - this.min[0]) * 0.5 + this.min[0];
                this.center[1] = (this.max[1] - this.min[1]) * 0.5 + this.min[1];
                this.center[2] = (this.max[2] - this.min[2]) * 0.5 + this.min[2];
                this.depth = depth;
                this.children = [];
                this.data = null;
                this.id = SplatTreeNode.idGen++;
            }
        }
        SplatTreeNode.idGen = 0;

        class SplatSubTree {
            /**
             * @param {number} maxDepth
             * @param {number} maxCentersPerNode
             */
            constructor(maxDepth, maxCentersPerNode) {
                this.maxDepth = maxDepth;
                this.maxCentersPerNode = maxCentersPerNode;
                this.sceneDimensions = [0, 0, 0];
                this.sceneMin = [0, 0, 0];
                this.sceneMax = [0, 0, 0];
                this.rootNode = null;
                this.addedIndexes = {};
                this.nodesWithIndexes = [];
            }
        }

        class SplatTree {
            /**
             * @param {number} maxDepth
             * @param {number} maxCentersPerNode
             */
            constructor(maxDepth, maxCentersPerNode) {
                this.maxDepth = maxDepth;
                this.maxCentersPerNode = maxCentersPerNode;
                this.splatCenters = null;
                this.subTrees = [];
            }

            /**
             * @param {*} centers
             */
            processSplatCenters(centers) {
                let splatCount = centers.length / 3;
                this.subTrees = [];
                const center = [0.0, 0.0, 0.0];

                const buildSubTree = function (splatCount, maxDepth, maxCentersPerNode) {
                    const subTree = new SplatSubTree(maxDepth, maxCentersPerNode);
                    let validSplatCount = 0;
                    const indices = [];
                    for (let i = 0; i < splatCount; i++) {
                        center[0] = centers[i * 3 + 0];
                        center[1] = centers[i * 3 + 1];
                        center[2] = centers[i * 3 + 2];
                        if (validSplatCount === 0 || center[0] < subTree.sceneMin[0]) subTree.sceneMin[0] = center[0];
                        if (validSplatCount === 0 || center[0] > subTree.sceneMax[0]) subTree.sceneMax[0] = center[0];
                        if (validSplatCount === 0 || center[1] < subTree.sceneMin[1]) subTree.sceneMin[1] = center[1];
                        if (validSplatCount === 0 || center[1] > subTree.sceneMax[1]) subTree.sceneMax[1] = center[1];
                        if (validSplatCount === 0 || center[2] < subTree.sceneMin[2]) subTree.sceneMin[2] = center[2];
                        if (validSplatCount === 0 || center[2] > subTree.sceneMax[2]) subTree.sceneMax[2] = center[2];
                        validSplatCount++;
                        indices.push(i);
                    }

                    subTree.sceneDimensions[0] = subTree.sceneMax[0] - subTree.sceneMin[0]
                    subTree.sceneDimensions[1] = subTree.sceneMax[1] - subTree.sceneMin[1]
                    subTree.sceneDimensions[2] = subTree.sceneMax[2] - subTree.sceneMin[2]

                    subTree.rootNode = new SplatTreeNode(subTree.sceneMin, subTree.sceneMax, 0);
                    subTree.rootNode.data = {
                        'indexes': indices
                    };

                    return subTree;
                };

                const sceneIndex = 0;
                const subTree = buildSubTree(splatCount, this.maxDepth, this.maxCentersPerNode);
                this.subTrees[sceneIndex] = subTree;
                SplatTree.processNode(centers, subTree, subTree.rootNode);
            }

            static processNode(centers, tree, node) {
                const splatCount = node.data.indexes.length;

                if (splatCount < tree.maxCentersPerNode || node.depth > tree.maxDepth) {
                    const newIndexes = [];
                    for (let i = 0; i < node.data.indexes.length; i++) {
                        if (!tree.addedIndexes[node.data.indexes[i]]) {
                            newIndexes.push(node.data.indexes[i]);
                            tree.addedIndexes[node.data.indexes[i]] = true;
                        }
                    }
                    node.data.indexes = newIndexes;
                    tree.nodesWithIndexes.push(node);
                    return;
                }

                const nodeDimensions = [
                    node.max[0] - node.min[0],
                    node.max[1] - node.min[1],
                    node.max[2] - node.min[2],
                ];
                const halfDimensions = [
                    nodeDimensions[0] * 0.5,
                    nodeDimensions[1] * 0.5,
                    nodeDimensions[2] * 0.5,
                ];
                const nodeCenter = [
                    node.min[0] + halfDimensions[0],
                    node.min[1] + halfDimensions[1],
                    node.min[2] + halfDimensions[2],
                ];

                const childrenBounds = [
                    // top section, clockwise from upper-left (looking from above, +Y)
                    new Box3(nodeCenter[0] - halfDimensions[0], nodeCenter[1], nodeCenter[2] - halfDimensions[2], nodeCenter[0], nodeCenter[1] + halfDimensions[1], nodeCenter[2]),
                    new Box3(nodeCenter[0], nodeCenter[1], nodeCenter[2] - halfDimensions[2], nodeCenter[0] + halfDimensions[0], nodeCenter[1] + halfDimensions[1], nodeCenter[2]),
                    new Box3(nodeCenter[0], nodeCenter[1], nodeCenter[2], nodeCenter[0] + halfDimensions[0], nodeCenter[1] + halfDimensions[1], nodeCenter[2] + halfDimensions[2]),
                    new Box3(nodeCenter[0] - halfDimensions[0], nodeCenter[1], nodeCenter[2], nodeCenter[0], nodeCenter[1] + halfDimensions[1], nodeCenter[2] + halfDimensions[2]),

                    // bottom section, clockwise from lower-left (looking from above, +Y)
                    new Box3(nodeCenter[0] - halfDimensions[0], nodeCenter[1] - halfDimensions[1], nodeCenter[2] - halfDimensions[2], nodeCenter[0], nodeCenter[1], nodeCenter[2]),
                    new Box3(nodeCenter[0], nodeCenter[1] - halfDimensions[1], nodeCenter[2] - halfDimensions[2], nodeCenter[0] + halfDimensions[0], nodeCenter[1], nodeCenter[2]),
                    new Box3(nodeCenter[0], nodeCenter[1] - halfDimensions[1], nodeCenter[2], nodeCenter[0] + halfDimensions[0], nodeCenter[1], nodeCenter[2] + halfDimensions[2]),
                    new Box3(nodeCenter[0] - halfDimensions[0], nodeCenter[1] - halfDimensions[1], nodeCenter[2], nodeCenter[0], nodeCenter[1], nodeCenter[2] + halfDimensions[2]),
                ];

                const splatCounts = [];
                const baseIndexes = [];
                for (let i = 0; i < childrenBounds.length; i++) {
                    splatCounts[i] = 0;
                    baseIndexes[i] = [];
                }

                const center = [0, 0, 0];
                for (let i = 0; i < splatCount; i++) {
                    const splatGlobalIndex = node.data.indexes[i];
                    center[0] = centers[splatGlobalIndex * 3 + 0];
                    center[1] = centers[splatGlobalIndex * 3 + 1];
                    center[2] = centers[splatGlobalIndex * 3 + 2];
                    for (let j = 0; j < childrenBounds.length; j++) {
                        if (childrenBounds[j].containsPoint(center)) {
                            splatCounts[j]++;
                            baseIndexes[j].push(splatGlobalIndex);
                        }
                    }
                }

                for (let i = 0; i < childrenBounds.length; i++) {
                    const childNode = new SplatTreeNode(childrenBounds[i].min, childrenBounds[i].max, node.depth + 1);
                    childNode.data = {
                        'indexes': baseIndexes[i]
                    };
                    node.children.push(childNode);
                }

                node.data = {};
                for (let child of node.children) {
                    SplatTree.processNode(centers, tree, child);
                }
            }
        }

        /**
         * Determine which splats to render by checking which are inside or close to the view frustum
         * @param {{far: number, fov: number, matrixWorldInverse: THREE.Matrix4}} camera
         * @param {SplatTree} splatTree
         * @param {ArrayBuffer} indicesToSort
         * @param {THREE.Matrix4} modelMatrix
         * @returns {number} splatCount
         */
        function gatherSceneNodesForSort(camera, splatTree, indicesToSort, modelMatrix, viewportDims_ = null) {
            const nodeRenderList = [];
            const tempVectorYZ = new THREE.Vector3();
            const tempVectorXZ = new THREE.Vector3();
            const tempVector = new THREE.Vector3();
            const modelView = new THREE.Matrix4();
            const baseModelView = new THREE.Matrix4();
            const renderDimensions = new THREE.Vector3();
            const forward = new THREE.Vector3(0, 0, -1);

            const tempMax = new THREE.Vector3();
            const nodeSize = (node) => {
                tempMax.x = node.max[0] - node.min[0];
                tempMax.y = node.max[1] - node.min[1];
                tempMax.z = node.max[2] - node.min[2];
                return tempMax.length();
            };

            const useFrustumCulling = true;

            const MaximumDistanceToRender = camera.far;

            let viewportDims = { width: 512, height: 512 };
            if (viewportDims_) {
                viewportDims = viewportDims_;
            }
            renderDimensions.x = viewportDims.width;
            renderDimensions.y = viewportDims.height;

            const cameraFocalLength = (renderDimensions.y / 2.0) / Math.tan(camera.fov / 2.0 * (Math.PI / 180.0));
            const fovXOver2 = Math.atan(renderDimensions.x / 2.0 / cameraFocalLength);
            const fovYOver2 = Math.atan(renderDimensions.y / 2.0 / cameraFocalLength);
            const cosFovXOver2 = Math.cos(fovXOver2);
            const cosFovYOver2 = Math.cos(fovYOver2);

            baseModelView.copy(camera.viewMatrix);
            baseModelView.multiplyMatrices(baseModelView, modelMatrix);

            let nodeRenderCount = 0;
            let splatRenderCount = 0;

            for (let s = 0; s < splatTree.subTrees.length; s++) {
                const subTree = splatTree.subTrees[s];
                modelView.copy(baseModelView);

                const nodeCount = subTree.nodesWithIndexes.length;
                for (let i = 0; i < nodeCount; i++) {
                    const node = subTree.nodesWithIndexes[i];
                    tempVector.x = node.center[0];
                    tempVector.y = node.center[1];
                    tempVector.z = node.center[2];
                    tempVector.applyMatrix4(modelView);

                    const distanceToNode = tempVector.length();
                    if (!useFrustumCulling) {
                        tempVector.normalize();
                    }

                    tempVectorYZ.copy(tempVector).setX(0).normalize();
                    tempVectorXZ.copy(tempVector).setY(0).normalize();

                    const cameraAngleXZDot = forward.dot(tempVectorXZ);
                    const cameraAngleYZDot = forward.dot(tempVectorYZ);

                    const ns = nodeSize(node);
                    const outOfFovY = cameraAngleYZDot < (cosFovYOver2 - .6);
                    const outOfFovX = cameraAngleXZDot < (cosFovXOver2 - .6);

                    if (useFrustumCulling) {
                        if (((outOfFovX || outOfFovY || distanceToNode > MaximumDistanceToRender) && distanceToNode > ns)) {
                            continue;
                        }
                    }

                    splatRenderCount += node.data.indexes.length;
                    nodeRenderList[nodeRenderCount] = node;
                    node.data.distanceToNode = distanceToNode;
                    nodeRenderCount++;
                }
            }

            nodeRenderList.length = nodeRenderCount;
            nodeRenderList.sort((a, b) => {
                if (a.data.distanceToNode < b.data.distanceToNode) return -1;
                else return 1;
            });

            const bytesPerInt = 4;
            let currentByteOffset = splatRenderCount * bytesPerInt;
            for (let i = 0; i < nodeRenderCount; i++) {
                const node = nodeRenderList[i];
                const windowSizeInts = node.data.indexes.length;
                const windowSizeBytes = windowSizeInts * bytesPerInt;
                let destView = new Uint32Array(indicesToSort.buffer, currentByteOffset - windowSizeBytes, windowSizeInts);
                destView.set(node.data.indexes);
                currentByteOffset -= windowSizeBytes;
            }

            return splatRenderCount;
        }

        workerContext.postMessage({ loaded: true });
    });
})(this);
