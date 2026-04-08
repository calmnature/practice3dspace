
(function (workerContext) {


require(["DS/Mesh/ThreeJS_Base", 'DS/Mesh/ImplicitGeometries'], function(THREE, ImplicitGeometries) {
    "use strict";


    workerContext.onmessage = function(e) {

        let data = e.data;
        let indexArray = new Uint32Array(data.indexArray),
            positionArray = new Float32Array(data.positionArray);
        let clippingVolumeComputer = new ClippingVolumeComputer({indexArray: indexArray, positionArray: positionArray});
        clippingVolumeComputer.compute().then(({arrayBuffer, boundingBox, width, height})=> {
            workerContext.postMessage({arrayBuffer: arrayBuffer, boundingBox: boundingBox.createJSON(), width, height}, [arrayBuffer]);
        });
    }

    class ClippingVolumeComputer {
        constructor({indexArray, positionArray}) {
            this.indexArray = indexArray;
            this.positionArray = positionArray;
            this.octree = new ClippingVolumeOctree(6);
            // add triangles to the octree (at depth = this.octree.maxdepth)
            this.octree.compute({
                positionArray: this.positionArray,
                indexArray: this.indexArray
            })
            // compute distance to triangles for each corner of a node containing triangles
            this.octree.fillDistances(this.indexArray, this.positionArray);

            // update status for all leaf nodes (fullIn/fullOut/mixed)
            this.octree.fillStatus();

            this.shaderData = this.octree.buildShaderData();
            this.voxelization = this.octree.buildVoxelization();
        }
        compute() {
            return new Promise((resolve, reject) => {
                let data = this.voxelization.createArrayBuffer();
                resolve({arrayBuffer: data.arrayBuffer, boundingBox: this.octree.boundingBox, width: data.width, height: data.height});
            });
        }
    }

    class ClippingVolumeOctree {
        constructor(maxDepth) {
            this.rootNode = null;
            this.boundingBox = null;
            this.maxDepth = maxDepth;
            this.distanceMap = new Map();
            this.leafSize = 0;
            this.leafDiagonal = 0;
        }
        compute({positionArray, indexArray}) {
            this.boundingBox = this.computeBoundingBox(positionArray);
            let depthFactor = 1/Math.pow(2, this.maxDepth)
            this.leafSize = depthFactor * (this.boundingBox.max.x - this.boundingBox.min.x);
            this.leafDiagonal = Math.sqrt(3) * this.leafSize;
            let trianglesBoundingBox = this.computeTrianglesBoundingBox({positionArray, indexArray});
            this.rootNode = new ClippingVolumeOctreeNode(0, 0, 0, 0, this.boundingBox, null);
            this.rootNode.addTriangles({positionArray, indexArray, trianglesBoundingBox, maxDepth: this.maxDepth});
        }
        computeBoundingBox(positionArray) {
            let i = 0, boundingBox = new ImplicitGeometries.Box3(), point = new THREE.Vector3();
            for(i = 0; i < positionArray.length; i+=3) {
                point.set(positionArray[i], positionArray[i+1], positionArray[i+2]);
                boundingBox.expandByPoint(point);
            }
            let size = boundingBox.size();
            let maxSize = Math.max(size.x, size.y, size.z);
            boundingBox.max.x = boundingBox.min.x + maxSize;
            boundingBox.max.y = boundingBox.min.y + maxSize;
            boundingBox.max.z = boundingBox.min.z + maxSize;

            let r = 0.01;
            boundingBox.min.x -= r*maxSize;
            boundingBox.min.y -= r*maxSize;
            boundingBox.min.z -= r*maxSize;
            boundingBox.max.x += r*maxSize;
            boundingBox.max.y += r*maxSize;
            boundingBox.max.z += r*maxSize;
            return boundingBox;
        }
        computeTrianglesBoundingBox({positionArray, indexArray}) {
            let i, trianglesBoundingBox = [], k1, k2, k3;
            for(i = 0; i < indexArray.length; i += 3) {
                k1 = 3*indexArray[i];
                k2 = 3*indexArray[i+1];
                k3 = 3*indexArray[i+2];
                let x1 = positionArray[k1],
                    y1 = positionArray[k1+1],
                    z1 = positionArray[k1+2];
                let x2 = positionArray[k2],
                    y2 = positionArray[k2+1],
                    z2 = positionArray[k2+2];
                let x3 = positionArray[k3],
                    y3 = positionArray[k3+1],
                    z3 = positionArray[k3+2];
                let minX = Math.min(x1, x2, x3),
                    minY = Math.min(y1, y2, y3),
                    minZ = Math.min(z1, z2, z3);
                let maxX = Math.max(x1, x2, x3),
                    maxY = Math.max(y1, y2, y3),
                    maxZ = Math.max(z1, z2, z3);
                trianglesBoundingBox.push(minX, minY, minZ, maxX, maxY, maxZ);
            }
            return trianglesBoundingBox;
        }
        getBBoxesWithTriangles() {
            let result = [], i;
            let nodes = [];
            this.rootNode.getNodesWithTriangles(nodes);
            for(i = 0; i < nodes.length; i++) {
                result.push(nodes[i].boundingBox);
            }
            return result;
        }
        getOctreeNode(x, y, z, depth) {
            let size = Math.pow(2, depth);
            if(x < 0 || y < 0 || z < 0 || depth < 0
                || x >= size || y >= size || z >= size) {
                    return null;
            }
            let indexPath = new Array(depth);

            let i, lx = x, ly = y, lz = z;
            for(i = depth - 1; i >= 0; i--) {
                let index = (lx % 2) + 2*(ly % 2) + 4*(lz % 2);
                lx = Math.floor(lx/2);
                ly = Math.floor(ly/2);
                lz = Math.floor(lz/2);
                indexPath[i] = index;
            }

            let node = this.rootNode;
            for(i = 0; node && i < indexPath.length; i++) {
                let children = node.children;
                node = children ? children[indexPath[i]] : null;
            }

            if(node && (node.depth !== depth || node.x !== x || node.y !== y || node.z !== z)) {
                console.log("getOctreeNode inconsistensy");
            }
            return node;
        }
        traverse(traverseCB) {
            return this.rootNode.traverse(traverseCB);
        }
        getCornerSignedDistanceFromMap(x, y, z, depth) {
            let depthFactor = Math.pow(2, this.maxDepth - depth);
            let distanceKey = this.getDistanceKey(depthFactor*x, depthFactor*y, depthFactor*z);
            if(this.distanceMap.has(distanceKey)) {
                return this.distanceMap.get(distanceKey);
            } else {
                return null;
            }
        }
        storeCornerSignedDistanceToMap(x, y, z, depth, distance) {
            let depthFactor = Math.pow(2, this.maxDepth - depth);
            let distanceKey = this.getDistanceKey(depthFactor*x, depthFactor*y, depthFactor*z);
            if(!this.distanceMap.has(distanceKey)) {
                return this.distanceMap.set(distanceKey, distance);
            }
        }
        getDistanceKey(x,y,z) {
            return `${x}/${y}/${z}`;
        }
        // computes distance between min corner of an octree node and triangles within
        // the octree node or the nodes sharing the corner
        getCornerSignedDistance(x, y, z, indexArray, positionArray, tmpVecArray, tmpPlane) {
            let distanceKey = this.getDistanceKey(x,y,z);
            if(this.distanceMap.has(distanceKey)) {
                // if distance to this corner has already been computed, return it immediately
                let value = this.distanceMap.get(distanceKey);
                return value;
            }
            let depth = this.maxDepth;
            let nodes = [], dx, dy, dz;
            for (dx = -1; dx <= 0; dx++) {
                for (dy = -1; dy <= 0; dy++) {
                    for (dz = -1; dz <= 0; dz++) {
                        let node = this.getOctreeNode(x + dx, y + dy, z + dz, depth);
                        if(node) {
                            nodes.push(node);
                        }
                    }
                }
            }
            let distance = Infinity, triangleIndex = -1;
            let i,
                size = this.leafSize,
                xc = this.boundingBox.min.x + x * size,
                yc = this.boundingBox.min.y + y * size,
                zc = this.boundingBox.min.z + z * size;
            let diagonal = this.leafDiagonal;
            for(i = 0; i < nodes.length; i++) {
                let triangles = nodes[i].triangles;
                let j;
                if(triangles) {
                    for(j = 0; j < triangles.length; j++) {
                        let index = triangles[j];
                        let localDistance = computeDistanceToTriangle(xc, yc, zc, index, indexArray, positionArray, tmpVecArray, tmpPlane);
                        localDistance = localDistance/(2*diagonal);
                        if(triangleIndex === 0 || Math.abs(localDistance) < Math.abs(distance)) {
                            distance = localDistance;
                            triangleIndex = index;
                        }
                    }
                }
            }
            this.distanceMap.set(distanceKey, distance);
            return distance;
        }
        fillDistances(indexArray, positionArray) {
            let tmpPlane = new ImplicitGeometries.Plane();
            let i, tmpVecArray = [];
            for(i = 0; i < 15; i++) {
                tmpVecArray.push(new THREE.Vector3());
            }
            this.traverse((node) => {
                if(node.triangles && node.depth === this.maxDepth) {
                    node.fillDistances(this, indexArray, positionArray, tmpVecArray, tmpPlane);
                }
            });
        }
        fillStatus() {
            let unknownNodes = [];
            this.traverse((node) => {
                if(node.distances) {
                    let nbPositive = 0, nbNegative = 0;
                    let i;
                    for(i = 0; i < node.distances.length; i++) {
                        let distance = node.distances[i];
                        if(distance !== Infinity) {
                            if(distance > 0) {
                                nbPositive++;
                            } else if(distance < 0) {
                                nbNegative++;
                            }
                        }
                    }
                    if(nbPositive > 0 && nbNegative === 0) {
                        node.distances = null;
                        node.status = ClippingVolumeOctreeNode.STATUS.fullOut;
                    } else if(nbNegative > 0 && nbPositive === 0) {
                        node.distances = null;
                        node.status = ClippingVolumeOctreeNode.STATUS.fullIn;
                    } else {
                        node.status = ClippingVolumeOctreeNode.STATUS.mixed;
                    }
                } else if(!node.children) {
                    this.updateNodeStatusFromDistanceMap(node);
                }
                if(!node.children && node.status === ClippingVolumeOctreeNode.STATUS.unknown) {
                    unknownNodes.push(node);
                }
            });
            let stop = false;
            while(unknownNodes.length > 0 && !stop) {
                let i;
                let previousUnknownNodes = unknownNodes;
                unknownNodes = [];
                for(i = 0; i < previousUnknownNodes.length; i++) {
                    let node = previousUnknownNodes[i];
                    this.updateNodeStatusFromDistanceMap(node);
                    if(!node.children && node.status === ClippingVolumeOctreeNode.STATUS.unknown) {
                        unknownNodes.push(node);
                    }
                }
                if(unknownNodes.length >= previousUnknownNodes.length) {
                    stop = true; // prevent cpu loop
                }
            }
        }
        updateNodeStatusFromDistanceMap(node) {
            let dx, dy, dz, x = node.x, y = node.y, z = node.z, depth = node.depth;
            let nbPositive = 0, nbNegative = 0;

            // getting distance values from already computed distances
            for (dz = 0; dz < 2; dz++) {
                for (dy = 0; dy < 2; dy++) {
                    for (dx = 0; dx < 2; dx++) {
                        let distance = this.getCornerSignedDistanceFromMap(x+dx, y+dy, z + dz, depth);
                        if(distance !== null) {
                            if(distance > 0) {
                                nbPositive++;
                            }
                            if(distance < 0) {
                                nbNegative++;
                            }
                        }
                    }
                }
            }
            if(nbPositive > 0 || nbNegative > 0) {
                let distance = 0;
                if(nbPositive >= nbNegative) {
                    distance = 1;
                    node.status = ClippingVolumeOctreeNode.STATUS.fullOut;
                } else {
                    distance = -1;
                    node.status = ClippingVolumeOctreeNode.STATUS.fullIn;
                }

                // here we store in a map a fake distance ..
                // it will not be sent to the shader
                // only sign is important (will be used by other octree nodes which have no children)
                for (dz = 0; dz < 2; dz++) {
                    for (dy = 0; dy < 2; dy++) {
                        for (dx = 0; dx < 2; dx++) {
                            // does not override an existing value
                            this.storeCornerSignedDistanceToMap(x + dx, y + dy, z + dz, node.depth, distance);
                        }
                    }
                }
            }
        }
        computeShaderDataSize() {
            let nodeDataCount = 0, distancesCount = 0;
            this.rootNode.traverse((node) => {
                if (node.children) {
                    nodeDataCount += 8;
                } else {
                    if (node.distances) {
                        nodeDataCount++;
                        distancesCount++;
                    }
                }
            });
            return {
                nodeDataCount: nodeDataCount,
                distancesCount: distancesCount
            }
        }
        buildShaderData() {
            let shaderData = new ClippingVolumeShaderData(this);
            this.rootNode.fillShaderData(shaderData);
            return shaderData;
        }
        buildVoxelization() {
            let size = Math.pow(2,this.maxDepth);
            let voxelization = new ClippingVolumeVoxelization(this.boundingBox, size);
            this.traverse((node)=>{
                if(!node.children) {
                    let depthFactor = Math.pow(2, this.maxDepth - node.depth);
                    let x0 = depthFactor * node.x,
                        y0 = depthFactor * node.y,
                        z0 = depthFactor * node.z,
                        x1 = x0 + depthFactor,
                        y1 = y0 + depthFactor,
                        z1 = z0 + depthFactor;
                    let x, y, z;
                    for(x = x0; x < x1; x++) {
                        for(y = y0; y < y1; y++) {
                            for(z = z0; z < z1; z++) {
                                voxelization.setVoxel(x, y, z, node.status, node.distances);
                            }
                        }
                    }
                }
            });
            /*
            let x, y, z;
            for(x = 0; x < size; x++) {
                for(y = 0; y < size; y++) {
                    for(z = 0; z < size; z++) {
                        let status = false ? ClippingVolumeOctreeNode.STATUS.fullIn :ClippingVolumeOctreeNode.STATUS.fullOut;
                        voxelization.setVoxel(x, y, z, status, undefined);
                    }
                }
            }
                */
            return voxelization;
        }
    }

    class ClippingVolumeShaderData {
        constructor(octree) {
            let dataSize = octree.computeShaderDataSize();
            let octreeBuffer = new ArrayBuffer(dataSize.nodeDataCount*4); // 1 uint32 per octree node
            let distanceBuffer = new ArrayBuffer(dataSize.distancesCount*4*8);
            this.nodes = new Uint32Array(octreeBuffer);
            this.nodesLength = 0;
            this.distances = new Float32Array(distanceBuffer);
            this.distancesLength = 0;
        }
        setNodeData(index, data) {
            this.nodes[index] = data;
        }
        getFreeNodeDataIndex(size) {
            let index = this.nodesLength;
            this.nodesLength += size;
            return index;
        }
        pushDistances(distances) {
            let i, result = this.distancesLength;
            for(i = 0; i < distances.length; i++) {
                this.distances[this.distancesLength++] = distances[i];
            }
            return result;
        }
    }

    class ClippingVolumeOctreeNode {
        constructor(x, y, z, depth, boundingBox, parent) {
            this.status = ClippingVolumeOctreeNode.STATUS.unknown;
            this.x = x;
            this.y = y;
            this.z = z;
            this.depth = depth;
            this.parent = parent;
            this.children = null;
            this.triangles = null;
            this.boundingBox = boundingBox;
            this.fullDistanceStatus = 0; // -1: in, 0: mixed, +1: out
            this.distances = null; // array with signed distances index: use getChildIndex()
        }
        traverse(traverseCB) {
            traverseCB(this);
            if(this.children) {
                let i;
                for(i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    if(child) {
                        child.traverse(traverseCB);
                    }
                }
            }
        }
        getNodesWithTriangles(outarray) {
            if(this.triangles) {
                outarray.push(this);
            }
            if(this.children) {
                let i;
                for(i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    child && child.getNodesWithTriangles(outarray);
                }
            }
        }
        // x, y, z are 0 or 1
        getChildIndex(x, y, z) {
            let index = x + 2*y + 4*z;
            return index;
        }
 /*       // x, y, z are 0 or 1
        setChildNode(x, y, z, node) {
            if(!this.children) {
                this.children = [null, null, null, null, null, null, null, null];
            };
            let index = this.getChildIndex(x, y, z);
            this.children[index] = node;
        }
        getChildNode(x, y, z) {
            let node = null;
            if(this.children) {
                let index = this.getChildIndex(x, y, z);
                node = this.children[index];
            }
            return node;
        }*/
        getChildBoundingBox(childIndex, tmpBox) {
            let childBoundingBox = tmpBox ? tmpBox.copy(this.boundingBox) : this.boundingBox.clone();
            let boundingBox = this.boundingBox;
            let middlex = (boundingBox.min.x + boundingBox.max.x) / 2,
                middley = (boundingBox.min.y + boundingBox.max.y) / 2,
                middlez = (boundingBox.min.z + boundingBox.max.z) / 2;
            if(childIndex & 1) {
                childBoundingBox.min.x = middlex;
            } else {
                childBoundingBox.max.x = middlex;
            }
            if(childIndex & 2) {
                childBoundingBox.min.y = middley;
            } else {
                childBoundingBox.max.y = middley;
            }
            if(childIndex & 4) {
                childBoundingBox.min.z = middlez;
            } else {
                childBoundingBox.max.z = middlez;
            }
            return childBoundingBox;
        }
        getChildNodeFromIndex(childIndex) {
            if(!this.children) {
                this.children = [null, null, null, null, null, null, null, null];
                let dx, dy, dz, index = 0;
                for (dz = 0; dz < 2; dz++) {
                    for (dy = 0; dy < 2; dy++) {
                        for (dx = 0; dx < 2; dx++) {
                            let child = new ClippingVolumeOctreeNode(this.x*2+dx, this.y*2+dy, this.z*2+dz,
                                this.depth + 1,
                                this.getChildBoundingBox(index), this);
                            this.children[index] = child;
                            index++;
                        }
                    }
                }
            }
            let child = this.children[childIndex];
            return child;
        }
        addTriangles({trianglesBoundingBox, maxDepth, positionArray, indexArray}) {
            let ntriangle = trianglesBoundingBox.length / 6, itriangle;
            let triangleBoundingBox = new ImplicitGeometries.Box3(), tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), tmpC = new THREE.Vector3();
            let tmpBox = new ImplicitGeometries.Box3();
            let tmpVecArray = [], i;
            for(i = 0; i < 13; i++) {
                tmpVecArray.push(new THREE.Vector3());
            }
            for(itriangle = 0; itriangle < ntriangle; itriangle++) {
                let k = 6 * itriangle;
                triangleBoundingBox.min.set(trianglesBoundingBox[k],trianglesBoundingBox[k+1],trianglesBoundingBox[k+2]);
                triangleBoundingBox.max.set(trianglesBoundingBox[k+3],trianglesBoundingBox[k+4],trianglesBoundingBox[k+5]);
                k = 3*indexArray[itriangle*3];
                tmpA.set(positionArray[k], positionArray[k+1], positionArray[k+2]);
                k = 3*indexArray[itriangle*3+1];
                tmpB.set(positionArray[k], positionArray[k+1], positionArray[k+2]);
                k = 3*indexArray[itriangle*3+2];
                tmpC.set(positionArray[k], positionArray[k+1], positionArray[k+2]);
                this.addTriangle(itriangle, triangleBoundingBox, maxDepth, tmpA, tmpB, tmpC, tmpVecArray, tmpBox);
            }
        }
        addTriangle(triangleIndex, triangleBoundingBox, maxDepth, A, B, C, tmpVecArray, tmpBox) {
            if(this.depth < maxDepth) {
                let indices = this.getChildIndicesFromTriangleBoundingBox(triangleBoundingBox);
                if(indices.length > 0) {
                    let i;
                    for(i = 0; i < indices.length; i++) {
                        let index = indices[i];
                        this.getChildBoundingBox(index, tmpBox);
                        if(tmpBox.intersectsTriangle(A, B, C, tmpVecArray)) {
                            let child = this.getChildNodeFromIndex(index);
                            child.addTriangle(triangleIndex, triangleBoundingBox, maxDepth, A,  B,  C, tmpVecArray, tmpBox);
                        }
                    }
                }
            } else {
                if(!this.triangles) {
                    this.triangles = [];
                }
                this.triangles.push(triangleIndex);
            }
        }
        getChildIndicesFromTriangleBoundingBox(triangleBoundingBox) {
            let boundingBox = this.boundingBox;
            let middlex = (boundingBox.min.x + boundingBox.max.x) / 2,
                middley = (boundingBox.min.y + boundingBox.max.y) / 2,
                middlez = (boundingBox.min.z + boundingBox.max.z) / 2;
            let x = -1, y = -1, z = -1, mix = false; 
            if(triangleBoundingBox.max.x <= middlex) {
                x = 0;
            } else if(triangleBoundingBox.min.x > middlex) {
                x = 1;
            }
            if (triangleBoundingBox.max.y <= middley) {
                y = 0;
            } else if (triangleBoundingBox.min.y > middley) {
                y = 1;
            }
            if (triangleBoundingBox.max.z <= middlez) {
                z = 0;
            } else if (triangleBoundingBox.min.z > middlez) {
                z = 1;
            }

            let indices = [];
            if(x === -1) {
                indices.push(0);
                indices.push(1);
            } else {
                indices.push(x);
            }
            let i, newindices = [];
            for(i = 0; i < indices.length; i++) {
                let value = indices[i];
                if(y === -1) {
                    newindices.push(value);
                    newindices.push(value | 2);
                } else {
                    newindices.push(value | (y*2));
                }
            }
            indices = newindices;
            newindices = [];
            for(i = 0; i < indices.length; i++) {
                let value = indices[i];
                if(z === -1) {
                    newindices.push(value);
                    newindices.push(value | 4);
                } else {
                    newindices.push(value | (z*4));
                }
            }
            return newindices;
        }
        fillDistances(octree, indexArray, positionArray, tmpVecArray, tmpPlane) {
            this.distances = new Array(8);
            let dx, dy, dz, index = 0, x = this.x, y = this.y, z = this.z;
            /*if(x === 0 && y === 25 && z === 33) {
                debugger;
            }
            if(x === 0 && y === 25 && z === 34) {
                debugger;
            }*/
            for (dz = 0; dz < 2; dz++) {
                for (dy = 0; dy < 2; dy++) {
                    for (dx = 0; dx < 2; dx++) {
                        let distance = octree.getCornerSignedDistance(x+dx, y+dy, z+dz, indexArray, positionArray, tmpVecArray, tmpPlane);
                        this.distances[index] = distance;
                        index++;
                    }
                }
            }
            //window.tutu = 0;
        }
        fillShaderData(shaderData) {
            let index = 0; // if remains 0, no data is added
            if(this.children) {
                index = shaderData.getFreeNodeDataIndex(8);
                let i;
                for(i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    let childData = child.fillShaderData(shaderData);
                    shaderData.setNodeData(index + i, childData);
                }
            } else {
                if(this.distances) {
                    index = shaderData.getFreeNodeDataIndex(1);
                    let nodeData = 0;
                    nodeData = shaderData.pushDistances(this.distances);
                    shaderData.setNodeData(index, nodeData);
                }
            }
            let mask = this.getStatusMask();
            mask |= index;
            return mask;
        }
        getStatusMask() {
            let result = 0;
            if(this.children) {
                result |= (1 << 31);
            }
            result |= (this.status << 29);
            return result;
        }
    }

    class ClippingVolumeVoxelization {
        constructor(boundingBox, size) {
            this.boundingBox = boundingBox;
            this.size = size;
            let i, totalSize = size*size*size;
            this.statusArray = new Uint8Array(totalSize);
            this.distanceIndexArray = new Uint32Array(totalSize);
            for(i = 0; i < totalSize; i++) {
                this.statusArray[i] = ClippingVolumeOctreeNode.STATUS.unknown;
                this.distanceIndexArray[i] = 0; // 0 => empty
            }
            this.distanceData = [];
            this.fillCount = 0;
        }
        setVoxel(x,y,z,status, distances) {
            /*if(x === 0 && y === 25 && z === 33) {
                debugger;
            }*/
            let k = x + this.size*y + this.size*this.size*z;
            this.statusArray[k] = status;
            this.fillCount++;
            if(distances !== undefined) {
                if(distances) {
                    this.distanceData.push(distances);
                    this.distanceIndexArray[k] = this.distanceData.length;
                } else {
                    this.distanceIndexArray[k] = 0;
                }
            }
        }
        getVoxel(x,y,z) {
            if(x < 0 || y < 0 || z < 0 || x >= this.size || y >= this.size || z >= this.size) {
                return {
                    status: 0,
                    distances: null
                }
            }
            let k = x + this.size*y + this.size*this.size*z;
            return {
                status: this.statusArray[k],
                distances: this.distanceIndexArray[k] >= 0 ? this.distanceData[this.distanceIndexArray[k]] : null
            }
        }
        findVoxelsWithNeighbours() {
            let x, y, z;
            for (x = 0; x < this.size; x++) {
                for (y = 0; y < this.size; y++) {
                    for (z = 0; z < this.size; z++) {
                        let voxel = this.getVoxel(x, y, z);
                        if(voxel.status === ClippingVolumeOctreeNode.STATUS.mixed) {
                            let dx, dy, dz;
                            for (dx = -1; dx < 2; dx++) {
                                for (dy = -1; dy < 2; dy++) {
                                    for (dz = -1; dz < 2; dz++) {
                                        if(Math.abs(dx) + Math.abs(dy) + Math.abs(dz) === 1) {
                                            let voxel2 = this.getVoxel(x+dx, y+dy, z+dz);
                                            if(voxel2.status === ClippingVolumeOctreeNode.STATUS.mixed) {
                                                console.log("coucou");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        createArrayBuffer() {
            let length = this.statusArray.length;
            let neededBufferLength = length*4 + this.distanceData.length*8;
            let textureSize = this.getTextureSize(neededBufferLength);
            let arrayBuffer = new ArrayBuffer(textureSize.width*textureSize.height*4);
            this.fillShaderArrayBuffer(arrayBuffer);
            return {arrayBuffer: arrayBuffer, width: textureSize.width, height: textureSize.height};
        }
        // createTexture() {
        //     let length = this.statusArray.length;
        //     let neededBufferLength = length*4 + this.distanceData.length*8;
        //     let textureSize = this.getTextureSize(neededBufferLength);
        //     let arrayBuffer = new ArrayBuffer(textureSize.width*textureSize.height*4);
        //     this.fillShaderArrayBuffer(arrayBuffer);
        //     this.texture = new THREE.DataTexture(new Uint8Array(arrayBuffer), textureSize.width, textureSize.height,
        //                                         THREE.RGBAFormat, THREE.UnsignedByteType,
        //                                         undefined,
        //                                         THREE.ClampToEdgeWrapping,
        //                                         THREE.ClampToEdgeWrapping,
        //                                         THREE.NearestFilter,
        //                                         THREE.NearestFilter);
        //     this.texture.needsUpdate = true;
        //     return this.texture;
        // }
        fillShaderArrayBuffer(arrayBuffer) {
            let length = this.statusArray.length;
            let cellValueArray = new Uint32Array(arrayBuffer, 0, length);
            let i;
            for(i = 0; i < length; i++) {
                let value = (this.statusArray[i] << 24) + this.distanceIndexArray[i];
                cellValueArray[i] = value;
            }
            let distanceArray = new Uint8Array(arrayBuffer, cellValueArray.byteLength, this.distanceData.length*8), k = 0;
            for(i = 0; i < this.distanceData.length; i++) {
                let j, localDistance = this.distanceData[i];
                for(j = 0; j < 8; j++) {
                    let distance = localDistance[j];
                    let intvalue = Math.round((0.5 + distance)*255);
                    distanceArray[k++] = intvalue;
                }
            }
        }
        /*
        compressShaderArrayBuffer(srcArrayBuffer) {
            let textureSize = this.getTextureSize(this.statusArray.length*3 + this.distanceData.length*8);
            let resultArrayBuffer = new ArrayBuffer(textureSize.width*textureSize.height*4);
            let srcArray = new Uint32Array(srcArrayBuffer);
            let targetArray = new Uint8Array(resultArrayBuffer);
            let i, targetK = 0;
            for(i = 0; i < this.statusArray.length; i++) {
                let value = srcArray[i];
                let newValue = ((value & 0xff000000) >> 2) + (value & 0x00ffffff);
                targetArray[targetK++] = newValue & 0xff;
                targetArray[targetK++] = (newValue & 0xff00) >> 8;
                targetArray[targetK++] = (newValue & 0xff0000) >> 16;
            }
            // targetK is correctly aligned (since this.statusArray contains 64*64*64 elements)
            let target32Array = new Uint32Array(resultArrayBuffer, targetK);
            let k = this.statusArray.length;
            for(i = 0; i < this.distanceData.length*2; i++) {
                target32Array[i] = srcArray[k++];
            }
            return resultArrayBuffer;
        }
            */
        getTextureSize(neededSizeInBytes) {

            let nbNeededTextureElements = neededSizeInBytes/4;
            let maxTextureSize = 1024;
            let width = Math.min(nbNeededTextureElements, maxTextureSize);
            let height = Math.ceil(nbNeededTextureElements/width);
            return {width: width, height: height};
        }
    }

    ClippingVolumeOctreeNode.STATUS = {
        unknown: 3,
        mixed: 2,
        fullOut: 0,
        fullIn: 1
    }

    function computeDistanceToTriangle(x, y, z, triangleIndex, indexArray, positionArray, tmpVecArray, tmpPlane) {
        let vi = 0;
        let tol = 1e-5;
        let k = triangleIndex*3;
        let kA = 3*indexArray[k], kB = 3*indexArray[k+1], kC = 3*indexArray[k+2];
        let A = tmpVecArray[vi++].set(positionArray[kA],positionArray[kA+1],positionArray[kA+2]),
            B = tmpVecArray[vi++].set(positionArray[kB],positionArray[kB+1],positionArray[kB+2]),
            C = tmpVecArray[vi++].set(positionArray[kC],positionArray[kC+1],positionArray[kC+2]);

        let ab = tmpVecArray[vi++].subVectors(B, A),
            ac = tmpVecArray[vi++].subVectors(C, A),
            bc = tmpVecArray[vi++].subVectors(C, B);

        let AB_length = ab.length(),
            AC_length = ac.length(),
            BC_length = bc.length();
        ab.multiplyScalar(1/AB_length);
        ac.multiplyScalar(1/AC_length);
        bc.multiplyScalar(1/BC_length);

        if(AB_length <= tol || AC_length <= tol || BC_length <= tol) {
            // we can skip degenerated case;
            return Infinity;
        }

        let point = tmpVecArray[vi++].set(x, y, z);
        let P = tmpVecArray[vi++];
        let plane = tmpPlane;
        plane.setFromCoplanarPoints(A, B, C);
        plane.projectPoint(point, P);
        let AP = tmpVecArray[vi++].subVectors(P, A);

        let abprime = tmpVecArray[vi++].crossVectors(ab, plane.normal);
        let closestPoint = tmpVecArray[vi++].set(0,0,0);
        
        if(abprime.dot(AP) > 0) { // if point is on "left" side of AB
            let AP_dot_ab = AP.dot(ab);
            if(AP_dot_ab < 0) {
                closestPoint.copy(A); // A point
            } else if(AP_dot_ab > AB_length) {
                closestPoint.copy(B); // B point
            } else {
                // inside AB
                closestPoint.set(A.x + AP_dot_ab * ab.x,
                    A.y + AP_dot_ab * ab.y,
                    A.z + AP_dot_ab * ab.z,
                )
            }
        } else {
            let acprime = tmpVecArray[vi++].crossVectors(plane.normal, ac);
            if (acprime.dot(AP) > 0) { // if point is on "right" side of AC
                let AP_dot_ac = AP.dot(ac);
                if (AP_dot_ac < 0) {
                    closestPoint.copy(A); // A point
                } else if (AP_dot_ac > AC_length) {
                    closestPoint.copy(C); // C point
                } else {
                    // inside AC
                    closestPoint.set(A.x + AP_dot_ac * ac.x,
                        A.y + AP_dot_ac * ac.y,
                        A.z + AP_dot_ac * ac.z,
                    )
                }
            } else {
                let bcprime = tmpVecArray[vi++].crossVectors(bc, plane.normal);
                let BP = tmpVecArray[vi++].subVectors(P, B);

                if (bcprime.dot(BP) > 0) {  // if point is on "left" side of BC
                    let BP_dot_bc = BP.dot(bc);
                    if (BP_dot_bc < 0) {
                        closestPoint.copy(B); // B point
                    } else if (BP_dot_bc > BC_length) {
                        closestPoint.copy(C); // C point
                    } else {
                        // inside BC
                        closestPoint.set(B.x + BP_dot_bc * bc.x,
                            B.y + BP_dot_bc * bc.y,
                            B.z + BP_dot_bc * bc.z,
                        )
                    }
                } else {
                    // inside triangle
                    closestPoint.copy(P);
                }
            }
        }

        let resultVector = tmpVecArray[vi++].subVectors(point, closestPoint);
        let result = resultVector.length();
        if(resultVector.dot(plane.normal) < 0) {
            result *= -1;
        }
        return result;
    }

    workerContext.postMessage({ loaded: true });


    return ClippingVolumeComputer;
});






})(this)


