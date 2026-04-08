define(["require", "exports", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewer"], function (require, exports, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoadingStatus = exports.checkDrwngForImpMBOMForPrc = exports.checkDrawingsforMBOM = exports.columns = exports.normalizeNodes = exports.navigationPreference = exports.showTypeAttribute = exports.showDescriptionAttribute = exports.resourceDrawingsChildrenDepth = exports.resourceDrawingsChildrenRollUp = exports.displayResourceDrawings = exports.drawingsChildrenDepth = exports.drawingsParentDepth = exports.drawingsChildrenRollUp = exports.drawingsParentRollUp = exports.displayDrawings = exports.TYPE_TAGS = exports.MainTYPE_TAGS = exports.SCOPEIMPLEMENTS_TAGS = exports.CAPABILITY_TAGS = exports.objectMap = exports.serviceItemTypes = exports.serviceProcessTypes = exports.drawing = exports.itemInstanceTypes = exports.itemTypes = exports.processTypes = exports.allSupportedObjects = exports.appName = void 0;
    exports.expandObjectRelations = expandObjectRelations;
    exports._parseProgressiveExpandResult = _parseProgressiveExpandResult;
    exports.expandStructure = expandStructure;
    exports.extractParentsAndChildExceptLastParent = extractParentsAndChildExceptLastParent;
    exports.findNodeByPredicate = findNodeByPredicate;
    exports.findParentPath = findParentPath;
    exports.isProcessStructure = isProcessStructure;
    exports.buildProcessStructure = buildProcessStructure;
    exports.buildMBOMStructure = buildMBOMStructure;
    exports.generateModelforProcessStructure = generateModelforProcessStructure;
    exports.generateModelForMBOMStructure = generateModelForMBOMStructure;
    exports.showDrawing = showDrawing;
    exports.appName = "DELWebProcessStructViewer";
    // swimLaneChart colors
    const processAndOperationsColor = "#4D4D4D";
    const ItemNodeRowHeight = 30;
    const resourcesColor = "#FFCD00";
    const itemsColor = "#009DDB";
    //DOCME-HARDCODED - List of object types allowed in the lightviewer grid.
    exports.allSupportedObjects = [
        "DELLmiHeaderWorkPlanReference",
        "DELLmiWorkPlanSystemReference",
        "DELLmiQtyControlProcessReference",
        "DELLmiGeneralSystemReference",
        "DELLmiTransformationSystemReference",
        "DELLmiStorageSystemReference",
        "DELLmiTransferSystemReference",
        "SourceSystem",
        "SinkSystem",
        "BufferSystem",
        "DELLmiServiceHeaderWorkPlanReference",
        "DELLmiServiceWorkPlanSystemReference",
        "DELLmiServiceWorkPlanSupportingTaskReference",
        "DELLmiServiceWorkPlanRectifyingReference",
        "DELLmiServiceWorkPlanOperationalReference",
        "ProcessContinuousCreateMaterial",
        "ProcessContinuousProvide",
        "ContinuousByProduct",
        "MBOMContinuousInProcessItem",
        "CreateMaterial",
        "CreateKit",
        "ElementaryEndItem",
        "CreateAssembly",
        "Provide",
        "Transform",
        "Marking",
        "Annotation",
        "RemoveMaterial",
        "PreDrill",
        "Drill",
        "NoDrill",
        "Cutting",
        "Grinding",
        "Beveling",
        "Machine",
        "Installation",
        "Fasten",
        "DetailedFasten",
        "UnFasten",
        "Disassemble ",
        "SplitProcess",
        "DELServiceAssemblyReference",
        "DELServicePartReference",
        "DELServiceKitReference",
        "DELContinuousServicePartReference",
        "DELServiceAttachingItemReference",
        "DELServiceSpareItemReference",
    ];
    //DOCME-HARDCODED - List of object types for process types.
    exports.processTypes = [
        "DELLmiHeaderWorkPlanReference",
        "DELLmiWorkPlanSystemReference",
        "DELLmiQtyControlProcessReference",
        "DELLmiGeneralSystemReference",
        "DELLmiTransformationSystemReference",
        "DELLmiStorageSystemReference",
        "DELLmiTransferSystemReference",
        "SourceSystem",
        "SinkSystem",
        "BufferSystem",
        "DELLmiHeaderOperationReference",
        "DELLmiGeneralOperationReference",
        "DELLmiLoadingOperationReference",
        "DELLmiUnloadingOperationReference",
        "DELLmiPickingOperationReference",
        "DELLmiSourceOperationReference",
        "DELLmiSinkOperationReference",
        "DELLmiBufferOperationReference",
        "DELLmiRemoveMaterialOperationReference",
        "DELLmiTransferOperationReference",
        "DELLmiInterruptOperationReference",
        "DELLmiPunctualOperationReference",
        "DELLmiCurveOperationReference",
    ];
    //DOCME-HARDCODED - List of object types for manufacturing item types.
    exports.itemTypes = [
        "ProcessContinuousCreateMaterial",
        "ProcessContinuousProvide",
        "ContinuousByProduct",
        "MBOMContinuousInProcessItem",
        "CreateMaterial",
        "CreateKit",
        "ElementaryEndItem",
        "CreateAssembly",
        "Provide",
        "Transform",
        "Marking",
        "Annotation",
        "RemoveMaterial",
        "PreDrill",
        "Drill",
        "NoDrill",
        "Cutting",
        "Grinding",
        "Beveling",
        "Machine",
        "Installation",
        "Fasten",
        "DetailedFasten",
        "UnFasten",
        "Disassemble ",
        "SplitProcess",
    ];
    //DOCME-HARDCODED - List of object types for manufacturing item types.
    exports.itemInstanceTypes = [
        "DELLmiWorkPlanSystemInstance",
        "DELLmiQtyControlProcessInstance",
        "DELLmiGeneralSystemInstance",
        "DELLmiTransformationSystemInstance",
        "DELLmiTransferSystemInstance",
        "DELLmiStorageSystemInstance",
        "DELLmiServiceWorkPlanSystemInstance",
        "DELLmiHeaderOperationInstance",
        "DELLmiGeneralOperationInstance",
        "DELLmiLoadingOperationInstance",
        "DELLmiPunctualOperationInstance",
        "DELLmiCurveOperationInstance",
        "DELLmiUnloadingOperationInstance",
        "DELLmiInterruptOperationInstance",
        "DELLmiPickingOperationInstance",
        "DELLmiSourceOperationInstance",
        "DELLmiSinkOperationInstance",
        "DELLmiBufferOperationInstance",
        "DELLmiTransferOperationInstance",
        "DELLmiRemoveMaterialOperationInstance",
        "DELFmiFunctionIdentifiedInstance",
        "ProcessInstanceContinuous",
        "MBOMContinuousPhaseInstance",
    ];
    //DOCME-HARDCODED - List of object types for drawing from EI types.
    exports.drawing = "Drawing";
    //DOCME-HARDCODED - List of object types for drawing from EI types.
    exports.serviceProcessTypes = [
        "DELLmiServiceHeaderWorkPlanReference",
        "DELLmiServiceWorkPlanSystemReference",
        "DELLmiServiceWorkPlanSupportingTaskReference",
        "DELLmiServiceWorkPlanRectifyingReference",
        "DELLmiServiceWorkPlanOperationalReference",
    ];
    exports.serviceItemTypes = [
        "DELServiceAssemblyReference",
        "DELServicePartReference",
        "DELServiceKitReference",
        "DELContinuousServicePartReference",
        "DELServiceAttachingItemReference",
        "DELServiceSpareItemReference",
    ];
    //DOCME-HARDCODED - List of attributes that can be translated
    exports.objectMap = {
        revision: "revision",
        name: "name",
        physicalid: "id",
        type: "type",
        description: "description",
        current: "state",
        "ds6w:label": "title",
        interface: "interface",
        pathsr: "pathsr",
    };
    //DOCME-HARDCODED - global variables
    exports.CAPABILITY_TAGS = {
        PRIMARY: "Primary",
        SECONDARY: "Secondary",
        SCOPE: "Scope",
    };
    //DOCME-HARDCODED - global variables
    exports.SCOPEIMPLEMENTS_TAGS = {
        LT_BO: "LT_BO",
        LT_REL: "LT_REL",
    };
    //DOCME-HARDCODED - global variables
    exports.MainTYPE_TAGS = {
        ITEM: "item",
        PROCESS: "Process",
        SBOMPROCESS: "SBOMProcess",
        SBOMITEM: "SBOMItem",
        RESOURCE: "Resource",
    };
    //DOCME-HARDCODED - global variables
    exports.TYPE_TAGS = {
        MFGPRODUCTIONPLANNING: "MfgProductionPlanning",
        DELFMIPROCESSIMPLEMENTCNX: "DELFmiProcessImplementCnx",
        DELASMPROCESSCANUSECNX: "DELAsmProcessCanUseCnx",
        SECONDARYCANDIDATERESOURCELINK: "SecondaryCandidateResourceLink",
    };
    // global variables for drawings configuration
    exports.displayDrawings = true;
    exports.drawingsParentRollUp = true;
    exports.drawingsChildrenRollUp = true;
    exports.drawingsParentDepth = 1;
    exports.drawingsChildrenDepth = 1;
    // resource Param Consoles
    exports.displayResourceDrawings = true;
    exports.resourceDrawingsChildrenRollUp = true;
    exports.resourceDrawingsChildrenDepth = 0;
    // User Input to show Items and Resources column
    const displayItemsColumn = true;
    const displayResourcesColumn = true;
    // User Input to show Description & Type Attribute
    exports.showDescriptionAttribute = false;
    exports.showTypeAttribute = false;
    exports.navigationPreference = "One Level";
    // export const navigationPreference: NavigationType = "All Levels";
    let prcCounter = 0;
    let mbomCounter = 0;
    //
    /**
     * Transforms a flat list of resource items from a progressive expand API response
     * into a structured hierarchy of resources and relationships.
     *
     * @param dataArray - The raw input array of resource items (references, instances, drawings, etc.).
     * @param type - The type context (e.g., "Resource", "Process", "item", "SBOM") used for filtering or conditional logic.
     * @param rootId - The root ID (or array of IDs) from which the hierarchical tree should be built.
     *
     * @returns A {@link ProcessResourceItemResult} object containing:
     * - expandResponse: Hierarchical tree of items with `id`, `instanceId`, and `childId` references, .... .
     * - capableResourceIds: Array of capable resource mappings (primary/secondary).
     * - scopedIds: Array of scoped IDs.
     * - drawings: List of drawing-type items (applies mainly for ITEM type).
     * - implementedtoRoot: Combined scoped + implemented relationship paths.
     * - implementedIds: Implemented-only IDs.
     * - implementedMIEIs: Manufacturing Implement Engineering Instance IDs.
     */
    function expandObjectRelations(dataArray, type, rootId) {
        // Step 1: Parse raw API response into categorized buckets
        let expandResults = _parseProgressiveExpandResult(dataArray);
        // Step 2: Build hierarchical tree structure from parsed results
        let finalResult = expandStructure(expandResults, rootId);
        return finalResult;
    }
    /**
     * Parses a progressive expand API response and categorizes items
     * into references, instances, drawings, capable resource links, and scoped/implemented links.
     *
     * @param iRes - Raw progressive expand items (array or JSON string).
     *
     * @returns An {@link expandResult} object containing categorized buckets of items.
     */
    function _parseProgressiveExpandResult(iRes) {
        const drawings = [];
        const capableResourceIds = [];
        const scopedIds = [];
        const implementedIds = []; // legacy array
        const implementedMIEIs = [];
        const implementedtoRoot = [];
        let jsonResults = [];
        let references = [];
        let allReferencePIDs = [];
        let instances = [];
        let allInstancePIDs = [];
        let resourceDetailLinks = [];
        let allPaths = [];
        if (typeof iRes === "string") {
            jsonResults = JSON.parse(iRes);
        }
        else if (Array.isArray(iRes)) {
            jsonResults = iRes;
        }
        else {
            console.warn("Unsupported iRes received!", iRes);
            return {};
        }
        // Helper: extract PS blocks from pathsr
        function extractPSBlocks(pathsr) {
            const regex = /PS\s+((?:[A-Z0-9]{32}\s*)+)PE/g;
            const blocks = [];
            let match;
            while ((match = regex.exec(pathsr)) !== null) {
                blocks.push(match[1].trim().split(/\s+/));
            }
            return blocks;
        }
        jsonResults.forEach(result => {
            const type = result.type;
            const pid = result.resourceid;
            const pathsr = result.pathsr;
            if (!type)
                return;
            // References
            if (exports.processTypes.includes(type) ||
                exports.itemTypes.includes(type) ||
                exports.serviceProcessTypes.includes(type) ||
                exports.serviceItemTypes.includes(type)) {
                references.push(result);
                allReferencePIDs.push(pid);
                return;
            }
            // Instances
            if (exports.itemInstanceTypes.includes(type)) {
                instances.push(result);
                allInstancePIDs.push(pid);
                return;
            }
            // MfgProductionPlanning
            if (type === exports.TYPE_TAGS.MFGPRODUCTIONPLANNING && pathsr) {
                const psBlocks = extractPSBlocks(pathsr);
                if (psBlocks.length > 0) {
                    const combined = [];
                    psBlocks.forEach((block, index) => {
                        if (index < psBlocks.length - 1) {
                            // For all blocks except the last, include all IDs
                            combined.push(...block);
                        }
                        else {
                            // For the last block, include only the last ID
                            combined.push(block[block.length - 1]);
                        }
                    });
                    if (!pathsr.includes(exports.SCOPEIMPLEMENTS_TAGS.LT_BO) && pathsr.includes(exports.SCOPEIMPLEMENTS_TAGS.LT_REL)) {
                        implementedIds.push(combined);
                    }
                    // Handle scoped / implementedtoRoot if needed
                    else if (pathsr.includes(exports.SCOPEIMPLEMENTS_TAGS.LT_BO) && !pathsr.includes(exports.SCOPEIMPLEMENTS_TAGS.LT_REL)) {
                        scopedIds.push(psBlocks.flat());
                    }
                    else if (pathsr.includes(exports.SCOPEIMPLEMENTS_TAGS.LT_BO) && pathsr.includes(exports.SCOPEIMPLEMENTS_TAGS.LT_REL)) {
                        implementedtoRoot.push(psBlocks.flat());
                    }
                }
                return;
            }
            // Engineering links
            if (type === exports.TYPE_TAGS.DELFMIPROCESSIMPLEMENTCNX && result.from && result.to) {
                implementedMIEIs.push([result.from, result.to]);
                return;
            }
            // Capable resources
            if (type === exports.TYPE_TAGS.DELASMPROCESSCANUSECNX && pathsr) {
                const ids = extractPsIds(pathsr);
                capableResourceIds.push([...ids, exports.CAPABILITY_TAGS.PRIMARY]);
                return;
            }
            if (type === exports.TYPE_TAGS.SECONDARYCANDIDATERESOURCELINK && pathsr) {
                const ids = extractPsIds(pathsr);
                if (ids.length > 1) {
                    const primaryRes = jsonResults.find(i => i.resourceid === ids[1]);
                    if (primaryRes === null || primaryRes === void 0 ? void 0 : primaryRes.pathsr) {
                        const secondaryChain = extractPsIds(primaryRes.pathsr);
                        capableResourceIds.push([ids[0], secondaryChain, exports.CAPABILITY_TAGS.SECONDARY]);
                    }
                }
                return;
            }
            // Drawings
            if (type === exports.drawing) {
                drawings.push(result);
                return;
            }
            if (result.Path) {
                allPaths.push(result.Path);
                return;
            }
        });
        return {
            references,
            instances,
            drawings,
            capableResourceIds,
            allReferencePIDs,
            allInstancePIDs,
            resourceDetailLinks,
            scopedIds,
            implementedIds,
            implementedtoRoot,
            implementedMIEIs,
        };
    }
    /**
     * Expands a flat list of references and instances into a hierarchical structure.
     *
     * @param results - The parsed expand result object containing references and instances.
     * @param rootId - The root resource ID (or array of IDs) to start expansion from.
     *
     * @returns A {@link ProcessResourceItemResult} containing:
     * - expandResponse: Hierarchical representation of references and their child instances.
     * - capableResourceIds, scopedIds, drawings, implemented links: passed through from results.
     */
    function expandStructure(results, rootId) {
        var _a, _b, _c, _d, _e, _f;
        const expandResponse = [];
        const refMap = {};
        results.references.forEach(ref => {
            refMap[ref.resourceid] = ref;
        });
        const instFromMap = {};
        results.instances.forEach(inst => {
            const { resourceid, from = "", to = "", ...rest } = inst;
            if (!instFromMap[from])
                instFromMap[from] = [];
            instFromMap[from].push({ resourceid, from, to, ...rest });
        });
        function buildTree(currentId, instanceId = null, parentPath = []) {
            const currentObject = refMap[currentId];
            if (!currentObject)
                return null;
            const newPath = instanceId
                ? [...parentPath, `${currentId}-${instanceId}`]
                : [...parentPath, currentId];
            const comboId = instanceId
                ? `${currentObject.resourceid}-${instanceId}`
                : currentObject.resourceid;
            const currentNode = {
                ...currentObject,
                id: comboId,
                resourceid: currentObject.resourceid,
                instanceId,
                childId: [],
                Path: newPath,
                implementedITEM: []
            };
            expandResponse.push(currentNode);
            const children = instFromMap[currentId] || [];
            for (const child of children) {
                currentNode.childId.push(`${child.to}-${child.resourceid}`);
                buildTree(child.to, child.resourceid, newPath);
            }
            return currentNode;
        }
        if (Array.isArray(rootId)) {
            rootId.forEach(id => buildTree(id, null, []));
        }
        else {
            buildTree(rootId, null, []);
        }
        return {
            expandResponse,
            capableResourceIds: (_a = results.capableResourceIds) !== null && _a !== void 0 ? _a : [],
            scopedIds: (_b = results.scopedIds) !== null && _b !== void 0 ? _b : [],
            drawings: (_c = results.drawings) !== null && _c !== void 0 ? _c : [],
            implementedtoRoot: (_d = results.implementedtoRoot) !== null && _d !== void 0 ? _d : [],
            implementedIds: (_e = results.implementedIds) !== null && _e !== void 0 ? _e : [],
            implementedMIEIs: (_f = results.implementedMIEIs) !== null && _f !== void 0 ? _f : [],
            errors: [],
        };
    }
    /**
     * Extracts all 32-character alphanumeric IDs followed by 'PE' from a `pathsr` string.
     *
     * @param pathsr - The Path string to extract IDs from.
     * @returns An array of matched 32-character IDs.
     */
    function extractParentsAndChildExceptLastParent(pathsr) {
        const regex = /((?:[A-Z0-9]{32}\s+)+)PE/g;
        const matches = [];
        let match;
        // First, collect all blocks of IDs
        while ((match = regex.exec(pathsr)) !== null) {
            const ids = match[1].trim().split(/\s+/);
            matches.push(ids);
        }
        const result = [];
        const lastBlockIndex = matches.length - 1;
        matches.forEach((ids, index) => {
            const child = ids[ids.length - 1];
            if (index === lastBlockIndex) {
                // Last block: include only child
                result.push(child);
            }
            else {
                // Other blocks: include all IDs (parents + child)
                result.push(...ids);
            }
        });
        return result;
    }
    /**
     * Extracts short-form PS-PE style Path IDs from a `pathsr` string.
     *
     * @param pathsr - The Path string to extract PS IDs from.
     * @returns An array of IDs extracted from the `pathsr` string.
     */
    function extractPsIds(pathsr) {
        const regex = /PS\s+([A-Z0-9]+)\s+PE/g;
        const result = [];
        let match;
        while ((match = regex.exec(pathsr)) !== null) {
            result.push(match[1]);
        }
        return result;
    }
    // Function to find object from structured data structure based on the type by passing the condition(find by id, find by label)
    function findNodeByPredicate(structuredData, predicate) {
        if (!structuredData)
            return null;
        for (const obj of structuredData) {
            // checks for the predicate condition on the iterated object
            if (predicate(obj))
                return [obj];
            // If iterated obj has children-> recursive call
            if (obj.children && obj.children.length > 0) {
                const result = findNodeByPredicate(obj.children, predicate);
                if (result)
                    return result;
            }
        }
        return null;
    }
    //  function to find the path of the parent of the filtered node, to show in breadcrumb
    function findParentPath(structuredData, targetId, path = []) {
        var _a, _b;
        if (!structuredData)
            return null;
        for (const obj of structuredData) {
            const currentLabel = (_a = obj["ds6w:label"]) !== null && _a !== void 0 ? _a : obj.label;
            const currentId = obj.id;
            const icon = obj.icon;
            if (currentLabel) {
                const newPath = [...path, { label: currentLabel, id: currentId, icon }];
                if ((_b = obj.children) === null || _b === void 0 ? void 0 : _b.some((child) => child.id === targetId)) {
                    return newPath;
                }
                if (obj.children && obj.children.length > 0) {
                    const result = findParentPath(obj.children, targetId, newPath);
                    if (result)
                        return result;
                }
            }
        }
        return null;
    }
    // Type guard function to check if a given object is of type `ProcessStructure`
    function isProcessStructure(item) {
        // Returns true if the item's type exists in the predefined list `processTypes`
        return exports.processTypes.includes(item.type);
    }
    // function to return the id of nodes
    const normalizeNodes = (nodes) => {
        return nodes.map((node) => ({
            id: node.id,
            // text: node._header?.text,
        }));
    };
    exports.normalizeNodes = normalizeNodes;
    // DGV column
    exports.columns = [
        {
            dataIndex: "tree",
            typeRepresentation: "string",
            editableFlag: false,
            sortableFlag: false,
            showTextFlag: false,
            getCellSemantics: function () {
                return {
                    icon: "https://vsupl131plp.dsone.3ds.com:443/3DSpace/cvservlet/files?fileType=ICON&ipml_46_iconname=I_VPMNavDrawing&taxonomies=types%2FPLMEntity%2FPLMReference%2FPLMCoreRepReference%2FLPAbstractRepReference%2FLPAbstract3DRepReference%2FPHYSICALAbstract3DRepReference%2FVPMRepReference%2FDrawing",
                };
            },
        },
    ];
    // function to check if there are any drawings attached to the item, if yes update the impMBOMWithDrwngArray
    const checkDrawingsforMBOM = (obj, impMBOMWithDrwngArray) => {
        if (obj.parentDrawings || obj.childDrawings || obj.selfDrawings) {
            impMBOMWithDrwngArray.current.push(obj);
        }
        if ("children" in obj && Array.isArray(obj.children) && obj.children.length > 0) {
            obj.children.forEach((child) => {
                (0, exports.checkDrawingsforMBOM)(child, impMBOMWithDrwngArray);
            });
        }
    };
    exports.checkDrawingsforMBOM = checkDrawingsforMBOM;
    // function to check if there are any drawings attached to the implemented item of process, if yes update the impMBOMWithDrwngArray
    const checkDrwngForImpMBOMForPrc = (obj, impMBOMWithDrwngArray) => {
        if (Array.isArray(obj.implmtORscopeddMI) && obj.implmtORscopeddMI.length > 0) {
            obj.implmtORscopeddMI.forEach((implMI) => {
                if (implMI.parentDrawings || implMI.childDrawings || implMI.selfDrawings) {
                    // Add to the array if drawings are found
                    impMBOMWithDrwngArray.current.push(implMI);
                }
            });
        }
        // Recurse through children if they exist
        if ("children" in obj && Array.isArray(obj.children) && obj.children.length > 0) {
            // Iterate over each child
            obj.children.forEach((child) => {
                // Recursively call the function for each child
                (0, exports.checkDrwngForImpMBOMForPrc)(child, impMBOMWithDrwngArray);
            });
        }
    };
    exports.checkDrwngForImpMBOMForPrc = checkDrwngForImpMBOMForPrc;
    // Type for loading
    var LoadingStatus;
    (function (LoadingStatus) {
        LoadingStatus[LoadingStatus["Idle"] = 0] = "Idle";
        LoadingStatus[LoadingStatus["Loading"] = 1] = "Loading";
        LoadingStatus[LoadingStatus["LoadingDone"] = 2] = "LoadingDone";
    })(LoadingStatus || (exports.LoadingStatus = LoadingStatus = {}));
    // Function to build a structure(which contains parent-child and all associated MBOM and resources) for process from webservice response
    function buildProcessStructure(flatProcesses, resources, items, impMBOMWithDrwngArray, InitialImpMBOMWithDrwngArray) {
        // Initialize nodes object
        const nodesRecord = {};
        // Initialize result array which contains the structure
        const result = [];
        // Build a resource lookup map by ID
        const resourceByIDMap = new Map();
        resources.forEach((res) => {
            resourceByIDMap.set(res.resourceid, res);
        });
        // Map items by id for quick lookup
        const itemMap = new Map();
        items.forEach((itm) => {
            if (itm.instanceId) {
                itemMap.set(itm.instanceId, itm);
            }
            if (itm.instanceId === null) {
                itemMap.set(itm.id, itm);
            }
        });
        // Step 1: Create nodes
        flatProcesses.forEach((process) => {
            var _a, _b;
            const structuredResources = [];
            if (Array.isArray(process.primResourceId) && process.primResourceId.length > 0) {
                process.primResourceId.forEach((primId) => {
                    const primaryRes = resourceByIDMap.get(primId);
                    if (!primaryRes)
                        return;
                    // find every secResourceId that matches primId
                    let allSecondaryRes = [];
                    if (Array.isArray(process.secResourceIds)) {
                        allSecondaryRes = process.secResourceIds
                            .filter((group) => group.includes(primId))
                            .flatMap((group) => 
                        // strip out primary itself, leaving all secondaries
                        group.filter((id) => id !== primId));
                    }
                    const secondaryRes = allSecondaryRes
                        .map((secId) => resourceByIDMap.get(secId))
                        .filter((res) => res !== undefined);
                    structuredResources.push({ primaryRes, secondaryRes: secondaryRes });
                });
            }
            // TODO:delete item.primResourceId
            // TODO:delete item.secResourceIds
            const processNode = {
                ...process,
                children: [],
                resources: structuredResources || [],
            };
            // If implementedMBOM exists, attach implementedMI to process
            if (process.implementedITEM && process.implementedITEM.length > 0) {
                (_a = process.implementedITEM) === null || _a === void 0 ? void 0 : _a.forEach((impItm) => {
                    var _a;
                    const originalMI = itemMap.get(impItm);
                    if (originalMI) {
                        let newItemResources = [];
                        if (Array.isArray(originalMI.primResourceId)) {
                            originalMI.primResourceId.forEach((primResourceId) => {
                                const itemResource = resourceByIDMap.get(primResourceId);
                                if (itemResource) {
                                    newItemResources.push(itemResource);
                                }
                            });
                        }
                        //       //     // Create a copy and add the new field
                        const implementedMI = {
                            ...originalMI,
                            itemResources: newItemResources,
                        };
                        // ✅ Only initialize and push if needed
                        if (!processNode.implmtORscopeddMI) {
                            processNode.implmtORscopeddMI = [];
                        }
                        (_a = processNode.implmtORscopeddMI) === null || _a === void 0 ? void 0 : _a.push(implementedMI);
                        if (implementedMI.childDrawings || implementedMI.parentDrawings || implementedMI.selfDrawings) {
                            // Pushing implemented items having drawings into impMBOMWithDrwngArray to render DGV in swimLaneReady in only these nodes
                            impMBOMWithDrwngArray.current.push(implementedMI);
                            InitialImpMBOMWithDrwngArray.current.push(implementedMI);
                        }
                    }
                });
            }
            if (process.scopedItem) {
                const originalMI = itemMap.get(process.scopedItem);
                if (originalMI) {
                    let newItemResources = [];
                    if (Array.isArray(originalMI.primResourceId)) {
                        originalMI.primResourceId.forEach((primResourceId) => {
                            const itemResource = resourceByIDMap.get(primResourceId);
                            if (itemResource) {
                                newItemResources.push(itemResource);
                            }
                        });
                    }
                    //       //     // Create a copy and add the new field
                    const scopedMI = {
                        ...originalMI,
                        itemResources: newItemResources,
                    };
                    // ✅ Only initialize and push if needed
                    if (!processNode.implmtORscopeddMI) {
                        processNode.implmtORscopeddMI = [];
                    }
                    (_b = processNode.implmtORscopeddMI) === null || _b === void 0 ? void 0 : _b.push(scopedMI);
                    if (scopedMI.childDrawings || scopedMI.parentDrawings || scopedMI.selfDrawings) {
                        // Pushing implemented items having drawings into impMBOMWithDrwngArray to render DGV in swimLaneReady in only these nodes
                        impMBOMWithDrwngArray.current.push(scopedMI);
                        InitialImpMBOMWithDrwngArray.current.push(scopedMI);
                    }
                }
            }
            if (!process.id) {
            }
            else {
                nodesRecord[process.id] = processNode;
            }
        });
        // Step 2: Link children
        flatProcesses.forEach((process) => {
            /* here root process is included in the data structure.
            If process webservice response has childId, then push structure created for its children
            in children attribute for process.
            */
            if (process.childId && process.childId.length > 0) {
                process.childId.forEach((id) => {
                    nodesRecord[process.id].children.push(nodesRecord[id]);
                });
            }
            // process.instanceId is null for root process
            if (process.instanceId === null) {
                result.push(nodesRecord[process.id]);
            }
        });
        return result;
    }
    // Function to build a structure(which contains parent-child and associated resources) for MBOM
    function buildMBOMStructure(flatMBOM, resources, impMBOMWithDrwngArray, InitialImpMBOMWithDrwngArray) {
        const mbomNodesById = {};
        // Initialize result array which contains the structure
        const result = [];
        // Resource lookup
        const resourceByID = new Map();
        resources.forEach((res) => resourceByID.set(res.resourceid, res));
        // Build nodes
        flatMBOM.forEach((mbom) => {
            const structuredResources = [];
            if (Array.isArray(mbom.primResourceId) && mbom.primResourceId.length > 0) {
                mbom.primResourceId.forEach((primId) => {
                    const primaryRes = resourceByID.get(primId);
                    if (!primaryRes)
                        return;
                    let allSecondaryRes = [];
                    if (Array.isArray(mbom.secResourceIds)) {
                        allSecondaryRes = mbom.secResourceIds
                            .filter((group) => group.includes(primId))
                            .flatMap((group) => group.filter((id) => id !== primId));
                    }
                    const secondaryRes = allSecondaryRes.map((secId) => resourceByID.get(secId)).filter((r) => r !== undefined);
                    structuredResources.push({ primaryRes, secondaryRes });
                });
            }
            const node = {
                ...mbom,
                children: [],
                resources: structuredResources || [],
            };
            if (mbom.childDrawings || mbom.parentDrawings || mbom.selfDrawings) {
                // Pushing mbom having drawings into impMBOMWithDrwngArray to render DGV in swimLaneReady in only these nodes
                impMBOMWithDrwngArray.current.push(mbom);
                InitialImpMBOMWithDrwngArray.current.push(mbom);
            }
            // Store by unique id
            mbomNodesById[mbom.id] = node;
        });
        // Link children
        // Here we are building a parent-child data structure, root Item is included
        flatMBOM.forEach((mbom) => {
            if (mbom.childId && mbom.childId.length > 0) {
                mbom.childId.forEach((id) => {
                    mbomNodesById[mbom.id].children.push(mbomNodesById[id]);
                });
            }
            if (mbom.instanceId === null) {
                result.push(mbomNodesById[mbom.id]);
            }
        });
        return result;
    }
    // Function to generate Chart model for Process
    function generateModelforProcessStructure(structuredProcess, drawingData, resDrwngsDGVMap, mbomNodeMap) {
        // Initialize process nodes and resource nodes arrays
        const processNodes = [];
        const resourceNodes = [];
        const itemNodes = [];
        // Function to create node recursively (parent-child relation)
        function createNodeRecursive(prc, parentId, groupId) {
            // <--- Prevent further execution if prc is undefined
            // Create node object
            // creating unique Ids for swimlane chart nodes
            // const prcnodeId = parentId ? `${prc.id}_${parentId}_${Math.floor(Math.random() * 100000)}` : `${prc.id}_${Math.floor(Math.random() * 100000)}`;
            var _a, _b, _c;
            const prcnodeId = parentId ? `${prc.id}_${parentId}_${prcCounter}` : `${prc.id}_${prcCounter}`;
            const node = {
                id: prcnodeId,
                groupId,
                ...(parentId && { parentId }),
                header: {
                    // text: prc["ds6w:label"] ?? prc.name,
                    text: (_b = (_a = prc["ds6w:label"]) !== null && _a !== void 0 ? _a : prc.name) !== null && _b !== void 0 ? _b : "",
                    // color: "#78BEFA",
                    // color: "#4D4D4D",
                    color: processAndOperationsColor,
                    textColor: "white",
                    leftIcon: prc.icon,
                    collapsibleIcon: true,
                },
                isCollapsible: true,
                content: (() => {
                    const parts = [];
                    // based on user input to show or not a description
                    if (exports.showDescriptionAttribute && prc.description) {
                        parts.push(`Description: ${prc.description}`);
                    }
                    // parts.push("Description");
                    // based on user input to show or not its type
                    if (exports.showTypeAttribute && prc.type) {
                        parts.push(`Type: ${prc.type}`);
                    }
                    return parts.length ? { text: parts.join("\n") } : undefined;
                })(),
                // content: {
                //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                // },
            };
            processNodes.push(node);
            // Create resource nodes attached to this process with same groupId
            if (Array.isArray(prc.resources) && prc.resources.length > 0) {
                prc.resources.forEach((resGroup, index) => {
                    var _a;
                    const primaryRes = resGroup.primaryRes;
                    const secondaryRes = resGroup.secondaryRes;
                    if (primaryRes) {
                        const primaryNodeId = `${prc.id}_primary_${primaryRes.resourceid}`;
                        const PrimaryResNode = {
                            id: primaryNodeId,
                            groupId,
                            isCollapsible: true,
                            header: {
                                text: (_a = primaryRes["ds6w:label"]) !== null && _a !== void 0 ? _a : primaryRes.name,
                                color: resourcesColor,
                                textColor: "white",
                                leftIcon: primaryRes.icon,
                                collapsibleIcon: true,
                            },
                            isPinnable: true,
                            // content: {
                            //   // text: `Type: ${primaryRes.resourceType}`,
                            //   // text:"sample",
                            //   // collapsibleIcon:true
                            //   fragmentElement: true,
                            // },
                            ...(primaryRes.drawingsIds &&
                                primaryRes.drawingsIds.length > 0 && {
                                content: {
                                    // text: `Type: ${sec.resourceType}`,
                                    // text: "sample",
                                    fragmentElement: true,
                                },
                            }),
                        };
                        resourceNodes.push(PrimaryResNode);
                        if (primaryRes.drawingsIds && primaryRes.drawingsIds.length > 0 && !resDrwngsDGVMap.current.has(primaryNodeId)) {
                            resDrwngsDGVMap.current.set(primaryNodeId, primaryRes.drawingsIds);
                        }
                        secondaryRes === null || secondaryRes === void 0 ? void 0 : secondaryRes.forEach((sec) => {
                            var _a, _b;
                            const secondaryNodeId = `${primaryNodeId}_secondary_${sec.resourceid}`;
                            const SecondaryResNode = {
                                id: secondaryNodeId,
                                parentId: primaryNodeId,
                                groupId,
                                header: {
                                    text: (_a = sec["ds6w:label"]) !== null && _a !== void 0 ? _a : sec.name,
                                    color: resourcesColor,
                                    textColor: "white",
                                    leftIcon: sec.icon,
                                    collapsibleIcon: true,
                                },
                                isCollapsible: true,
                                // content: {
                                //   // text: `Type: ${sec.resourceType}`,
                                //   // text:"sample"
                                //    fragmentElement: true,
                                // },
                                ...(sec.drawingsIds &&
                                    sec.drawingsIds.length > 0 && {
                                    content: {
                                        // text: `Type: ${sec.resourceType}`,
                                        // text: "sample",
                                        fragmentElement: true,
                                    },
                                }),
                            };
                            resourceNodes.push(SecondaryResNode);
                            const dgvSecDrwData = [];
                            if (sec.drawingsIds && sec.drawingsIds.length > 0 && !resDrwngsDGVMap.current.has(secondaryNodeId)) {
                                resDrwngsDGVMap.current.set(secondaryNodeId, sec.drawingsIds);
                            }
                            (_b = sec.drawingsIds) === null || _b === void 0 ? void 0 : _b.forEach((drawingId) => {
                                var _a;
                                const secResMatchingDrawing = (_a = drawingData.drawingResponse) === null || _a === void 0 ? void 0 : _a.find((d) => d.resourceid === drawingId);
                                if (secResMatchingDrawing) {
                                    dgvSecDrwData.push({
                                        tree: secResMatchingDrawing["ds6w:label"],
                                        id: secResMatchingDrawing.resourceid,
                                        type: secResMatchingDrawing.type,
                                    });
                                }
                            });
                        });
                    }
                });
            }
            /*If Process has implemented items, check for drawings for items,
          if present, update the height of the items nodes accordingly
          */
            if (prc.implmtORscopeddMI && prc.implmtORscopeddMI.length > 0) {
                (_c = prc.implmtORscopeddMI) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const implementedMBOM = item;
                    let parentDrawings = implementedMBOM.parentDrawings;
                    let selfDrawings = implementedMBOM.selfDrawings;
                    let childDrawings = implementedMBOM.childDrawings;
                    // Calculate the number of drawing entries in each category
                    const parentLength = (_a = parentDrawings === null || parentDrawings === void 0 ? void 0 : parentDrawings.length) !== null && _a !== void 0 ? _a : 0;
                    const selfLength = (_b = selfDrawings === null || selfDrawings === void 0 ? void 0 : selfDrawings.length) !== null && _b !== void 0 ? _b : 0;
                    const childLength = (_c = childDrawings === null || childDrawings === void 0 ? void 0 : childDrawings.length) !== null && _c !== void 0 ? _c : 0;
                    const totalDRWLength = parentLength + selfLength + childLength;
                    // If any drawings exist, calculate dynamic height
                    let dynamicHeight;
                    if (totalDRWLength > 0) {
                        dynamicHeight = totalDRWLength * ItemNodeRowHeight;
                        if (totalDRWLength >= 10) {
                            dynamicHeight = 250;
                        }
                        // Add height padding if self drawings are missing but parent/child exist
                        if (selfLength === 0 && (parentLength > 0 || childLength > 0)) {
                            dynamicHeight += 100;
                        }
                        // Add extra height if both self and parent/child drawings exist
                        if ((parentLength > 0 || childLength > 0) && selfLength > 0) {
                            dynamicHeight += 140;
                        }
                        // Add some padding if only self drawings exist
                        if (selfLength > 0 && parentLength === 0 && childLength === 0) {
                            dynamicHeight += 100;
                        }
                    }
                    // const nodeId = parentId ? `${implementedMBOM.id}_${parentId}` : implementedMBOM.id;
                    // const nodeId = parentId
                    //   ? `${implementedMBOM.id}_${parentId}_${Math.floor(Math.random() * 100000)}`
                    //   : `${implementedMBOM.id}_${Math.floor(Math.random() * 100000)}`;
                    const nodeId = parentId ? `${implementedMBOM.id}_${parentId}_${prcCounter}` : `${implementedMBOM.id}_${prcCounter}`;
                    // Always add at least one entry: mbom.id → [nodeIds...]
                    const existing = (_d = mbomNodeMap.current.get(implementedMBOM.id)) !== null && _d !== void 0 ? _d : [];
                    mbomNodeMap.current.set(implementedMBOM.id, [...existing, nodeId]);
                    const itemNode = {
                        // id: implementedMBOM.id,
                        id: nodeId,
                        // height: 250,
                        // ...(totalDRWLength > 0 && { height: dynamicHeight }),
                        groupId,
                        header: {
                            text: (_e = implementedMBOM["ds6w:label"]) !== null && _e !== void 0 ? _e : implementedMBOM.name,
                            color: itemsColor,
                            textColor: "white",
                            leftIcon: implementedMBOM.icon,
                            collapsibleIcon: true,
                        },
                        ...((implementedMBOM.selfDrawings || implementedMBOM.parentDrawings || implementedMBOM.childDrawings) && {
                            content: {
                                fragmentElement: true,
                            },
                        }),
                    };
                    if (((_f = implementedMBOM === null || implementedMBOM === void 0 ? void 0 : implementedMBOM.itemResources) === null || _f === void 0 ? void 0 : _f.length) > 0) {
                        (_g = implementedMBOM === null || implementedMBOM === void 0 ? void 0 : implementedMBOM.itemResources) === null || _g === void 0 ? void 0 : _g.forEach((resource) => {
                            const itemResourceNodeId = `${nodeId}_resource_${resource.resourceid}`;
                            const ItemResNode = {
                                id: itemResourceNodeId,
                                groupId,
                                header: {
                                    text: `${implementedMBOM["ds6w:label"]} / ${resource.title}`,
                                    color: "#77797C",
                                    textColor: "white",
                                },
                                content: {
                                    // text: `Type: ${resource.resourceType}`,
                                    text: "sample",
                                },
                            };
                            resourceNodes.push(ItemResNode);
                        });
                    }
                    itemNodes.push(itemNode);
                });
            }
            prcCounter += 1;
            // step 2: check if the item has children and create nodes for them with same groupId
            if (prc.children && prc.children.length > 0) {
                prc.children.forEach((child) => {
                    if (!child)
                        return; // skip null/undefined children (happens if some oprns/wpl are not present in redux store)
                    // creating unique group ID
                    const groupId = `group_${child.id}_${prcnodeId}_${Math.floor(Math.random() * 100000)}`;
                    createNodeRecursive(child, prcnodeId, groupId);
                });
            }
        }
        // Step 1: Create the root(level0) nodes
        structuredProcess.forEach((rootItem) => {
            const groupId = `group_${rootItem.resourceid}`;
            createNodeRecursive(rootItem, undefined, groupId);
        });
        // return columns for items, process, resources
        return {
            columns: [
                ...(displayItemsColumn
                    ? [
                        {
                            id: "mbom",
                            title: nls.SwimLaneItems,
                            color: "white",
                            nodes: itemNodes,
                        },
                    ]
                    : []),
                {
                    id: "process",
                    title: nls.swimLanePrcOprns,
                    color: "white",
                    nodes: processNodes,
                },
                ...(displayResourcesColumn
                    ? [
                        {
                            id: "resources",
                            title: nls.swimLaneRsrcs,
                            color: "white",
                            nodes: resourceNodes,
                        },
                    ]
                    : []),
            ],
        };
    }
    // // function to generate model for mbom structure
    function generateModelForMBOMStructure(structuredMBOM, resDrwngsDGVMap, mbomNodeMap) {
        const itemNodes = [];
        const resourceNodes = [];
        function createMBOMNodeRecursive(mbom, parentId, groupId) {
            var _a, _b, _c, _d, _e;
            //     // Create node object
            let parentDrawings = mbom.parentDrawings;
            let selfDrawings = mbom.selfDrawings;
            let childDrawings = mbom.childDrawings;
            /*Calculate the number of drawing entries in each category, so that we can update the height of
                nodes accordingly */
            const parentDRWLength = (_a = parentDrawings === null || parentDrawings === void 0 ? void 0 : parentDrawings.length) !== null && _a !== void 0 ? _a : 0;
            const selfDRWLength = (_b = selfDrawings === null || selfDrawings === void 0 ? void 0 : selfDrawings.length) !== null && _b !== void 0 ? _b : 0;
            const childDRWLength = (_c = childDrawings === null || childDrawings === void 0 ? void 0 : childDrawings.length) !== null && _c !== void 0 ? _c : 0;
            const totalDRWLength = parentDRWLength + selfDRWLength + childDRWLength;
            // If any drawings exist, calculate dynamic height
            let dynamicHeight;
            if (totalDRWLength > 0) {
                dynamicHeight = totalDRWLength * ItemNodeRowHeight;
                if (totalDRWLength >= 10) {
                    dynamicHeight = 250;
                }
                // Add height padding if self drawings are missing but parent/child exist
                if (selfDRWLength === 0 && (parentDRWLength > 0 || childDRWLength > 0)) {
                    dynamicHeight += 100;
                }
                // Add extra height if both self and parent/child drawings exist
                if ((parentDRWLength > 0 || childDRWLength > 0) && selfDRWLength > 0) {
                    dynamicHeight += 140;
                }
                // Add some padding if only self drawings exist
                if (selfDRWLength > 0 && parentDRWLength === 0 && childDRWLength === 0) {
                    dynamicHeight += 100;
                }
            }
            // Create unique node ID (append parent if it exists)
            // const nodeId: string = parentId
            //   ? `${mbom.id}_${parentId}_${Math.floor(Math.random() * 100000)}`
            //   : `${mbom.id}_${Math.floor(Math.random() * 100000)}`;
            const nodeId = parentId ? `${mbom.id}_${parentId}_${mbomCounter}` : `${mbom.id}_${mbomCounter}`;
            mbomCounter += 1;
            // Always add at least one entry: mbom.id → [nodeIds...]
            const existing = (_d = mbomNodeMap.current.get(mbom.id)) !== null && _d !== void 0 ? _d : [];
            mbomNodeMap.current.set(mbom.id, [...existing, nodeId]);
            const node = {
                // id: mbom.id,
                id: nodeId,
                // ...(totalDRWLength > 0 && { height: dynamicHeight }),
                groupId,
                ...(parentId && { parentId }),
                isCollapsible: true,
                header: {
                    text: (_e = mbom["ds6w:label"]) !== null && _e !== void 0 ? _e : mbom.name,
                    color: itemsColor,
                    textColor: "white",
                    leftIcon: mbom.icon,
                    collapsibleIcon: true,
                },
            };
            /* If there are any drawings attached to this item,
                we want to have WebUI components in SwimLane */
            if (mbom.selfDrawings || mbom.parentDrawings || mbom.childDrawings) {
                node.content = {
                    fragmentElement: true,
                };
            }
            itemNodes.push(node);
            //     // Create resource nodes attached to this process with same groupId
            if (Array.isArray(mbom.resources) && mbom.resources.length > 0) {
                mbom.resources.forEach((resGroup, index) => {
                    var _a;
                    const primaryRes = resGroup.primaryRes;
                    const secondaryRes = resGroup.secondaryRes;
                    if (primaryRes) {
                        const primaryNodeId = `${nodeId}_primary_${primaryRes.resourceid}`;
                        const PrimaryResNode = {
                            id: primaryNodeId,
                            groupId,
                            header: {
                                text: (_a = primaryRes["ds6w:label"]) !== null && _a !== void 0 ? _a : primaryRes.name,
                                color: resourcesColor,
                                textColor: "white",
                                leftIcon: primaryRes.icon,
                                collapsibleIcon: true,
                            },
                            // content: {
                            //   // text: `Type: ${primaryRes.resourceType}`,
                            //   text:"sample"
                            // },
                            ...(primaryRes.drawingsIds &&
                                primaryRes.drawingsIds.length > 0 && {
                                content: {
                                    // text: `Type: ${sec.resourceType}`,
                                    // text: "sample",
                                    fragmentElement: true,
                                },
                            }),
                        };
                        resourceNodes.push(PrimaryResNode);
                        if (primaryRes.drawingsIds && primaryRes.drawingsIds.length > 0 && !resDrwngsDGVMap.current.has(primaryNodeId)) {
                            resDrwngsDGVMap.current.set(primaryNodeId, primaryRes.drawingsIds);
                        }
                        secondaryRes === null || secondaryRes === void 0 ? void 0 : secondaryRes.forEach((sec) => {
                            var _a;
                            const secondaryNodeId = `${primaryNodeId}_secondary_${sec.resourceid}`;
                            const SecondaryResNode = {
                                id: secondaryNodeId,
                                parentId: primaryNodeId,
                                groupId,
                                header: {
                                    text: (_a = sec["ds6w:label"]) !== null && _a !== void 0 ? _a : sec.name,
                                    color: resourcesColor,
                                    textColor: "white",
                                    leftIcon: sec.icon,
                                    collapsibleIcon: true,
                                },
                                // content: {
                                //   // text: `Type: ${sec.resourceType}`,
                                //   text:"sample"
                                // },
                                ...(sec.drawingsIds &&
                                    sec.drawingsIds.length > 0 && {
                                    content: {
                                        // text: `Type: ${sec.resourceType}`,
                                        // text: "sample",
                                        fragmentElement: true,
                                    },
                                }),
                            };
                            resourceNodes.push(SecondaryResNode);
                            if (sec.drawingsIds && sec.drawingsIds.length > 0 && !resDrwngsDGVMap.current.has(primaryNodeId)) {
                                resDrwngsDGVMap.current.set(secondaryNodeId, sec.drawingsIds);
                            }
                        });
                    }
                });
            }
            // step 2: check if the item has children and create nodes for them with same groupId
            if (mbom.children && mbom.children.length > 0) {
                mbom.children.forEach((child) => {
                    if (!child)
                        return; // skip null/undefined children (happens if some items are not present in redux store)
                    // creating unique group id for each mbom
                    const groupId = `group_${child.id}_${nodeId}_${Math.floor(Math.random() * 100000)}`;
                    createMBOMNodeRecursive(child, nodeId, groupId);
                });
            }
        }
        // / Step 1: Create the root(level0) nodes
        structuredMBOM.forEach((rootItem) => {
            // const groupId = `group_${rootItem.id}`;
            const groupId = `group_${rootItem.id}`;
            createMBOMNodeRecursive(rootItem, undefined, groupId);
        });
        // return items and resources columns,
        // based on user input, we decide to show or not resources column
        return {
            columns: [
                {
                    id: "mbom",
                    title: nls.SwimLaneItems,
                    color: "white",
                    nodes: itemNodes,
                },
                ...(displayResourcesColumn
                    ? [
                        {
                            id: "resources",
                            title: nls.swimLaneRsrcs,
                            color: "white",
                            nodes: resourceNodes,
                        },
                    ]
                    : []),
            ],
        };
    }
    function widgetLaunchCallback() {
        window.parent.requirejs(["DS/i3DXCompassServices/i3DXCompassPubSub"], function (i3DXCompassPubSub) {
            i3DXCompassPubSub.publish("resetX3DContent");
        });
    }
    function showDrawing(callback) {
        var _a, _b;
        let objID = (_a = callback.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue("id");
        let objType = (_b = callback.nodeModel) === null || _b === void 0 ? void 0 : _b.getAttributeValue("type");
        if (objType === exports.drawing) {
            var contentObj = {
                protocol: "3DXContent",
                version: "1.0",
                source: "X3DPLAW_AP",
                data: {
                    items: [
                        {
                            envId: "OnPremise",
                            serviceId: "3DSpace",
                            objectId: objID,
                            objectType: objType,
                        },
                    ],
                },
            };
            const params = {
                widgetId: widget.id,
                appId: "X3DPLAW_AP",
                data: {
                    X3DContentId: JSON.stringify(contentObj),
                },
            };
            window.parent.requirejs(["DS/i3DXCompassServices/i3DXCompassPubSub"], function (i3DXCompassPubSub) {
                i3DXCompassPubSub.publish("setX3DContent", contentObj);
                i3DXCompassPubSub.publish("launchApp", params, widgetLaunchCallback);
            });
        }
    }
});
