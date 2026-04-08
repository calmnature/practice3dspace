/// <amd-module name='DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerAppComp'/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerAppComp", ["require", "exports", "DS/React18Loader/React", "DS/ReactRouterDom/ReactRouterDom", "DS/React18Loader/React", "DS/DELReactControls/Tweakers/Toolbar", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewer", "DS/DELWebProcessStructViewer/components/DELSwimLaneComp", "DS/DELReactControls/Controls/Breadcrumb", "DS/ReactRedux/ReactRedux", "DS/DELReactControls/Controls/DataGridView", "DS/TreeModel/TreeDocument", "DS/TreeModel/TreeNodeModel", "DS/React18Loader/ReactDomClient", "../services/DELWebProcessStructViewerUtils", "DS/React18Loader/FastDeepEqual", "DS/DELReactControls/Controls/Expander", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerNotifSlice"], function (require, exports, React, ReactRouterDom_1, React_1, Toolbar_1, nls, DELSwimLaneComp_1, Breadcrumb_1, ReactRedux_1, DataGridView_1, TreeDocument, TreeNodeModel, ReactDOM, DELWebProcessStructViewerUtils_1, equal, Expander_1, DELWebProcessStructViewerNotifSlice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Toolbar_1 = __importDefault(Toolbar_1);
    DELSwimLaneComp_1 = __importDefault(DELSwimLaneComp_1);
    Breadcrumb_1 = __importDefault(Breadcrumb_1);
    DataGridView_1 = __importDefault(DataGridView_1);
    Expander_1 = __importDefault(Expander_1);
    const DELPSVAppComp = () => {
        // Reference to persisted implemented MBOM with drawings which can be changed on basis of filtered obj
        const impMBOMWithDrwngArray = (0, React_1.useRef)([]);
        // Reference to initial implemented MBOM with drawings
        const InitialImpMBOMWithDrwngArray = (0, React_1.useRef)([]);
        // Reference to store resources with their drawings
        const resDrwngsDGVMap = (0, React_1.useRef)(new Map());
        /*Reference to store mbomId and their swimLane node ID's
      Required for same reference same instance use case
        */
        const mbomNodeMap = (0, React_1.useRef)(new Map());
        const dispatch = (0, ReactRedux_1.useDispatch)();
        // Navigation hook
        const navigate = (0, ReactRouterDom_1.useNavigate)();
        // local variable to store swimlaneChartDocument after model is created to unobserve fragment element while cleaning the component
        let swimLaneChartdoc;
        // Create a ref that holds an array of mbomIds needed to unobserve fragment element
        const mbomNIdsUnobsrvRef = (0, React_1.useRef)([]);
        // State for model properties
        const [modelProperties, setModelProperties] = (0, React_1.useState)(undefined);
        // State for filtered model properties
        const [filteredModelProperties, setFilteredModelProperties] = (0, React_1.useState)(undefined);
        // State for process, resource and Item data
        /*Earlier used this, but got issues as it is considered as a new obj each time so re-rendering again even redux data is not changed */
        // const { processData, resourceData, itemData, drawingData } = useSelector((state: RootState) => ({
        //   processData: state.processData,
        //   resourceData: state.resourceData,
        //   itemData: state.itemData,
        //   drawingData: state.drawingData,
        // }));
        const processData = (0, ReactRedux_1.useSelector)((state) => state.processData);
        const resourceData = (0, ReactRedux_1.useSelector)((state) => state.resourceData);
        const itemData = (0, ReactRedux_1.useSelector)((state) => state.itemData);
        const drawingData = (0, ReactRedux_1.useSelector)((state) => state.drawingData);
        const droppedObjectType = (0, ReactRedux_1.useSelector)((state) => state.droppedObjectType.type);
        const [breadcrumbPath, setBreadcrumbPath] = (0, React_1.useState)([]); // State to hold the breadcrumb path
        const targetItemRootRef = (0, React_1.useRef)(new Map()); // Reference to the target MI root
        const targetResRootRef = (0, React_1.useRef)(new Map()); // Reference to the target Resource root
        const filteredObjRef = (0, React_1.useRef)(null); // Reference to the filtered object either after dbl click of node or breadcrumb click
        // DGV Row height for the calculation of height to pass for the class
        const DGVRowHght = 22;
        // Creating data structure from web service response For DELLmiWorkPlanSystemReference and similar types
        let structuredProcess = (0, React_1.useMemo)(() => {
            var _a, _b, _c;
            // Check if the dropped object type is valid and included in process types
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceProcessTypes.includes(droppedObjectType))) {
                if (!((_a = processData === null || processData === void 0 ? void 0 : processData.expandResponse) === null || _a === void 0 ? void 0 : _a.length) && !((_b = resourceData === null || resourceData === void 0 ? void 0 : resourceData.resourceResponse) === null || _b === void 0 ? void 0 : _b.length) && !((_c = itemData === null || itemData === void 0 ? void 0 : itemData.itemResponse) === null || _c === void 0 ? void 0 : _c.length)) {
                    // Return an empty array if all responses are empty
                    return [];
                }
                return (0, DELWebProcessStructViewerUtils_1.buildProcessStructure)(processData.expandResponse, resourceData.resourceResponse, itemData.itemResponse, impMBOMWithDrwngArray, InitialImpMBOMWithDrwngArray);
            }
            // Return an empty array if the dropped object type is not valid or not included in process types
            return [];
        }, [droppedObjectType, processData, resourceData, itemData]);
        // model for DELLmiWorkPlanSystemReference and similar types generated from structuredProcess
        let processModel = (0, React_1.useMemo)(() => {
            // Check if the dropped object type is valid and included in process types and if structuredProcess has elements
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceProcessTypes.includes(droppedObjectType)) && structuredProcess.length) {
                // Generate the model for the process structure
                return (0, DELWebProcessStructViewerUtils_1.generateModelforProcessStructure)(structuredProcess, drawingData, resDrwngsDGVMap, mbomNodeMap);
            }
            // Return undefined if the conditions are not met
            return undefined;
        }, [droppedObjectType, structuredProcess]);
        // Root Process
        let rootProcess = (0, React_1.useMemo)(() => {
            var _a;
            // Check if the dropped object type is valid and included in process types
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceProcessTypes.includes(droppedObjectType))) {
                return (_a = processData.expandResponse) === null || _a === void 0 ? void 0 : _a.find((prcs) => prcs.instanceId === null);
            }
            // Return undefined if the dropped object type is not valid or not included in process types
            return undefined;
        }, [droppedObjectType, processData]);
        // Creating a datastructure from webservice response For CreateAssembly and similar types
        let structuredMBOM = (0, React_1.useMemo)(() => {
            var _a;
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.itemTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceItemTypes.includes(droppedObjectType))) {
                // If there are no items in the item response, return an empty array
                if (!((_a = itemData === null || itemData === void 0 ? void 0 : itemData.itemResponse) === null || _a === void 0 ? void 0 : _a.length))
                    return [];
                return (0, DELWebProcessStructViewerUtils_1.buildMBOMStructure)(itemData.itemResponse, resourceData.resourceResponse, impMBOMWithDrwngArray, InitialImpMBOMWithDrwngArray);
            }
            // If the dropped object type is not valid or not included in item or service types, return an empty array
            return [];
        }, [droppedObjectType, itemData, resourceData]);
        // model for CreateAssembly and similar types generated from structuredMBOM
        let mbomModel = (0, React_1.useMemo)(() => {
            // Check if the dropped object type is valid and included in item or service types and if structuredMBOM has elements
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.itemTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceItemTypes.includes(droppedObjectType)) && structuredMBOM.length) {
                // Generate the model for the MBOM structure
                return (0, DELWebProcessStructViewerUtils_1.generateModelForMBOMStructure)(structuredMBOM, resDrwngsDGVMap, mbomNodeMap);
            }
            // Return undefined if the conditions are not met
            return undefined;
        }, [droppedObjectType, structuredMBOM]);
        // Root MBOM
        let rootMBOM = (0, React_1.useMemo)(() => {
            // Check if the dropped object type is valid and included in item or service types
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.itemTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceItemTypes.includes(droppedObjectType))) {
                return itemData.itemResponse.find((item) => item.instanceId === null);
            }
            // Return undefined if the dropped object type is not valid or not included in item or service types
            return undefined;
        }, [droppedObjectType, structuredMBOM]);
        // rootTitle based on the type of the dropped object
        let rootTitle = (0, React_1.useMemo)(() => {
            if (droppedObjectType && DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType)) {
                // If the dropped object type is a process type, return the label of the root process
                return rootProcess === null || rootProcess === void 0 ? void 0 : rootProcess["ds6w:label"];
            }
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.itemTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceItemTypes.includes(droppedObjectType))) {
                return rootMBOM === null || rootMBOM === void 0 ? void 0 : rootMBOM["ds6w:label"];
            }
            // If the dropped object type is not valid or not included in process, item, or service types, return undefined
            return undefined;
        }, [droppedObjectType, rootProcess, rootMBOM]);
        (0, React_1.useEffect)(() => {
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceProcessTypes.includes(droppedObjectType)) && rootProcess) {
                if (processModel)
                    setModelProperties(processModel);
            }
            if (droppedObjectType && (DELWebProcessStructViewerUtils_1.itemTypes.includes(droppedObjectType) || DELWebProcessStructViewerUtils_1.serviceItemTypes.includes(droppedObjectType)) && rootMBOM) {
                if (mbomModel) {
                    setModelProperties(mbomModel);
                }
            }
        }, [droppedObjectType, rootProcess, structuredProcess, processModel, rootMBOM, mbomModel]);
        // // Function to handle node double select
        const handleNodeDblSelect = (node) => {
            /*
            from node.id, we are extracting first pair which is the required id
            node.id->099C8F9900001680693A6DD2000150C7-099C8F9900001680693A6DD2000158BB_099C8F9900001680693A6DD2000150F9-099C8F9900001680693A6DD20001575D_40_41
            required id->099C8F9900001680693A6DD2000150C7-099C8F9900001680693A6DD2000158BB
            */
            const pairs = node.id.match(/[A-F0-9]{32}-[A-F0-9]{32}/g);
            const firstPair = pairs ? pairs[0] : null;
            if (firstPair) {
                // Determine if the node is of process type
                const isProcessType = droppedObjectType && DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType);
                const data = isProcessType ? structuredProcess : structuredMBOM;
                // Find the node in the data structure by its ID
                const filteredObj = (0, DELWebProcessStructViewerUtils_1.findNodeByPredicate)(data, (p) => p.id === firstPair);
                const parentLabelPath = (0, DELWebProcessStructViewerUtils_1.findParentPath)(data, firstPair);
                if (filteredObj) {
                    // Check if the filtered object has changed
                    if (filteredObjRef.current === null || !equal((0, DELWebProcessStructViewerUtils_1.normalizeNodes)(filteredObjRef.current), (0, DELWebProcessStructViewerUtils_1.normalizeNodes)(filteredObj))) {
                        filteredObjRef.current = [...filteredObj];
                        // if the user is clicking on the same filteredNode again and again--> nothing should happen(return)
                        //for that we can store the previous filteredObj and check with the new one, if matches->return
                        impMBOMWithDrwngArray.current.length = 0; // Always clear first
                        if (Array.isArray(filteredObj)) {
                            // Iterate through each object in the filtered object array
                            filteredObj.forEach((obj) => {
                                // if obj is of process type, check drawings for its implemented item, and update impMBOMWithDrwngArray accordingly
                                if ((0, DELWebProcessStructViewerUtils_1.isProcessStructure)(obj)) {
                                    // It's a ProcessStructure[] ? recurse
                                    (0, DELWebProcessStructViewerUtils_1.checkDrwngForImpMBOMForPrc)(obj, impMBOMWithDrwngArray);
                                }
                                else {
                                    // Not a ProcessStructure[] ? check each item directly for drawings
                                    (0, DELWebProcessStructViewerUtils_1.checkDrawingsforMBOM)(obj, impMBOMWithDrwngArray);
                                }
                            });
                        }
                        // Generate the filtered model based on the node type
                        const filteredModel = isProcessType
                            ? (0, DELWebProcessStructViewerUtils_1.generateModelforProcessStructure)(filteredObj, drawingData, resDrwngsDGVMap, mbomNodeMap)
                            : (0, DELWebProcessStructViewerUtils_1.generateModelForMBOMStructure)(filteredObj, resDrwngsDGVMap, mbomNodeMap);
                        setFilteredModelProperties(filteredModel);
                        // update breadcrumb accordingly
                        if (parentLabelPath) {
                            setBreadcrumbPath((prev) => {
                                const newPath = [...prev];
                                parentLabelPath.forEach(({ label, id, icon }) => {
                                    if (!newPath.some((entry) => entry.id === id)) {
                                        newPath.push({ label, id, icon });
                                    }
                                });
                                return newPath;
                            });
                        }
                    }
                    // if user dbl clicks on same node multiple times, nothing should happen
                    else if (equal((0, DELWebProcessStructViewerUtils_1.normalizeNodes)(filteredObjRef.current), (0, DELWebProcessStructViewerUtils_1.normalizeNodes)(filteredObj))) {
                        // Return early if the filtered object has not changed
                        return;
                    }
                }
            }
        };
        // // Function to handle breadcrumb click
        const handleBreadcrumbClick = (id, index) => {
            // Determine if the node is of process type
            const isProcessType = droppedObjectType && DELWebProcessStructViewerUtils_1.processTypes.includes(droppedObjectType);
            let rootID = isProcessType ? rootProcess === null || rootProcess === void 0 ? void 0 : rootProcess.id : rootMBOM === null || rootMBOM === void 0 ? void 0 : rootMBOM.id;
            const entry = breadcrumbPath[index];
            if (!entry)
                return;
            const data = isProcessType ? structuredProcess : structuredMBOM;
            const filteredObj = (0, DELWebProcessStructViewerUtils_1.findNodeByPredicate)(data, (p) => p.id === id);
            if (filteredObj) {
                filteredObjRef.current = [...filteredObj];
                if (Array.isArray(filteredObj)) {
                    for (const obj of filteredObj) {
                        // if obj is of process type, check drawings for its implemented item, and update impMBOMWithDrwngArray accordingly
                        if ((0, DELWebProcessStructViewerUtils_1.isProcessStructure)(obj)) {
                            impMBOMWithDrwngArray.current.length = 0;
                            (0, DELWebProcessStructViewerUtils_1.checkDrwngForImpMBOMForPrc)(obj, impMBOMWithDrwngArray);
                        }
                        else {
                            // if obj is of items type, update impMBOMWithDrwngArray accordingly
                            impMBOMWithDrwngArray.current.length = 0;
                            // impMBOMWithDrwngArray.current.push(obj as ExpandItem);
                            (0, DELWebProcessStructViewerUtils_1.checkDrawingsforMBOM)(obj, impMBOMWithDrwngArray);
                        }
                    }
                }
                //  based on the type, set the filtered model
                const filteredModel = isProcessType ? (0, DELWebProcessStructViewerUtils_1.generateModelforProcessStructure)(filteredObj, drawingData, resDrwngsDGVMap, mbomNodeMap) : (0, DELWebProcessStructViewerUtils_1.generateModelForMBOMStructure)(filteredObj, resDrwngsDGVMap, mbomNodeMap);
                setFilteredModelProperties(filteredModel);
                // Trim the path up to the clicked breadcrumb
                setBreadcrumbPath(breadcrumbPath.slice(0, index + 1));
                if (id === rootID) {
                    setBreadcrumbPath([]);
                }
            }
        };
        // Toolbar: Navigate to Home
        const onClickHomeTlb = () => {
            // @ts-ignore
            dispatch((0, DELWebProcessStructViewerNotifSlice_1.clearNotifications)());
            navigate("/");
        };
        const handleSwimLaneReady = (0, React_1.useCallback)((swimLaneChartdocument) => {
            swimLaneChartdoc = swimLaneChartdocument;
            if (resDrwngsDGVMap.current && resDrwngsDGVMap.current.size > 0) {
                resDrwngsDGVMap.current.forEach((ids, resNodeID) => {
                    const dgvPriDrwData = [];
                    const swimLane = document.getElementById("swimLane");
                    if (!swimLane)
                        return; // Exit early if swimLane not found
                    // Find the corresponding <foreignObject> inside swimLane for this Resource
                    const foreignObject = swimLane.querySelector(`#fragmentElement__${resNodeID}`);
                    if (!foreignObject || !foreignObject.isConnected)
                        return; // Skip if element is not found or not attached
                    // Try to get the target <div> inside the <foreignObject> where the DGV will be mounted
                    let targetDiv = foreignObject;
                    // If we still couldn't find or create a targetDiv, warn and skip
                    if (!targetDiv) {
                        return;
                    }
                    ids.forEach((drwID) => {
                        var _a;
                        const priResMatchingDrawing = (_a = drawingData.drawingResponse) === null || _a === void 0 ? void 0 : _a.find((d) => d.resourceid === drwID);
                        if (priResMatchingDrawing) {
                            dgvPriDrwData.push({
                                tree: priResMatchingDrawing["ds6w:label"],
                                id: priResMatchingDrawing.resourceid,
                                type: priResMatchingDrawing.type,
                            });
                        }
                    });
                    const dgvPriDrwtreeDocument = new TreeDocument();
                    dgvPriDrwtreeDocument.prepareUpdate();
                    dgvPriDrwtreeDocument.withTransactionUpdate(() => {
                        dgvPriDrwData.forEach((node) => {
                            const root = new TreeNodeModel({ grid: node });
                            dgvPriDrwtreeDocument.addRoot(root);
                        });
                    });
                    dgvPriDrwtreeDocument.expandAll(); // Expand all tree nodes
                    dgvPriDrwtreeDocument.pushUpdate(); // Commit updates
                    const priDrwDGVProperties = {
                        id: resNodeID,
                        treeDocument: dgvPriDrwtreeDocument,
                        columns: DELWebProcessStructViewerUtils_1.columns,
                        showRowIndexFlag: false,
                        layoutOptions: {
                            columnsHeader: false,
                            rowsHeader: false,
                        },
                    };
                    let existingRoot = targetResRootRef.current.get(resNodeID);
                    // Create and register new React root if it doesn't already exist
                    if (!existingRoot) {
                        const newRoot = ReactDOM.createRoot(targetDiv);
                        targetResRootRef.current.set(resNodeID, newRoot);
                        existingRoot = newRoot;
                    }
                    const directStyleTag = document.createElement("style");
                    let directDGVHeight = DGVRowHght * ids.length;
                    // const priDrwUniqueClass = `dgv-structured-${Math.random().toString(36).slice(2, 11)}`;
                    const priDrwUniqueClass = `dgv-structured-${resNodeID}`;
                    if (ids.length >= 5) {
                        directDGVHeight = 80;
                    }
                    directStyleTag.textContent = `.${priDrwUniqueClass} { height: ${directDGVHeight}px; }`;
                    document.head.appendChild(directStyleTag);
                    swimLaneChartdocument.observeFragmentElement(resNodeID);
                    existingRoot.render(React.createElement(React.Fragment, null, dgvPriDrwData.length > 0 && (React.createElement(Expander_1.default, { expanderProperties: { header: "Drawings", expandedFlag: true } },
                        React.createElement(DataGridView_1.default, { className: priDrwUniqueClass, onAdd: DELWebProcessStructViewerUtils_1.showDrawing, dataGridViewProperties: priDrwDGVProperties })))));
                });
            }
            // Check if the array of MBOMs with drawings is not empty
            if (impMBOMWithDrwngArray.current.length > 0) {
                // Iterate through each MBOM item in the array
                impMBOMWithDrwngArray.current.forEach((mbom, itr) => {
                    // Extract the ID of the current MBOM
                    const mbomId = mbom.id;
                    // mbomid->parentid
                    const nodeIds = mbomNodeMap.current.get(mbomId) || [];
                    // Get the swimLane container from the DOM
                    const swimLane = document.getElementById("swimLane");
                    if (!swimLane)
                        return; // Exit early if swimLane not found
                    nodeIds.forEach((nodeId) => {
                        var _a, _b, _c;
                        const foreignObject = swimLane.querySelector(`#fragmentElement__${nodeId}`);
                        if (!foreignObject || !foreignObject.isConnected)
                            return; // Skip if element is not found or not attached
                        // Try to get the target <div> inside the <foreignObject> where the DGV will be mounted
                        // let targetDiv = foreignObject.querySelector(`#dgv-root-${nodeId}`) as HTMLElement | null;
                        let targetDiv = foreignObject;
                        // If we still couldn't find or create a targetDiv, warn and skip
                        if (!targetDiv) {
                            return;
                        }
                        const parentDrawingsResponse = (_a = drawingData.drawingResponse) === null || _a === void 0 ? void 0 : _a.filter((d) => { var _a; return (_a = mbom.parentDrawings) === null || _a === void 0 ? void 0 : _a.includes(d.resourceid); });
                        const selfDrawingsResponse = (_b = drawingData.drawingResponse) === null || _b === void 0 ? void 0 : _b.filter((d) => { var _a; return (_a = mbom.selfDrawings) === null || _a === void 0 ? void 0 : _a.includes(d.resourceid); });
                        const childDrawingsResponse = (_c = drawingData.drawingResponse) === null || _c === void 0 ? void 0 : _c.filter((d) => { var _a; return (_a = mbom.childDrawings) === null || _a === void 0 ? void 0 : _a.includes(d.resourceid); });
                        const parentDrawingsNodes = (parentDrawingsResponse !== null && parentDrawingsResponse !== void 0 ? parentDrawingsResponse : []).map((d) => ({
                            tree: `${d["ds6w:label"]}`,
                            id: d.resourceid,
                            type: d.type,
                        }));
                        const selfDrawingsNodes = (selfDrawingsResponse !== null && selfDrawingsResponse !== void 0 ? selfDrawingsResponse : []).map((d) => ({
                            tree: `${d["ds6w:label"]}`,
                            id: d.resourceid,
                            type: d.type,
                        }));
                        const childDrawingsNodes = (childDrawingsResponse !== null && childDrawingsResponse !== void 0 ? childDrawingsResponse : []).map((d) => ({
                            tree: `${d["ds6w:label"]}`,
                            id: d.resourceid,
                            type: d.type,
                        }));
                        // Skip rendering if no drawings are available
                        if (selfDrawingsNodes.length === 0 && parentDrawingsNodes.length === 0 && childDrawingsNodes.length === 0) {
                            return;
                        }
                        // Build hierarchical data for the DataGridView
                        const dgvDirectData = [];
                        const dgvIndirectData = [];
                        if (selfDrawingsNodes.length > 0) {
                            dgvDirectData.push(...selfDrawingsNodes.map((node) => ({ tree: node.tree, id: node.id, type: node.type })));
                        }
                        if (parentDrawingsNodes.length > 0 || childDrawingsNodes.length > 0) {
                            dgvIndirectData.push(...parentDrawingsNodes.map((node) => ({ tree: node.tree, id: node.id, type: node.type })), ...childDrawingsNodes.map((node) => ({ tree: node.tree, id: node.id, type: node.type })));
                        }
                        const directGVtreeDocument = new TreeDocument();
                        directGVtreeDocument.prepareUpdate();
                        directGVtreeDocument.withTransactionUpdate(() => {
                            dgvDirectData.forEach((node) => {
                                const root = new TreeNodeModel({ grid: node });
                                directGVtreeDocument.addRoot(root);
                            });
                        });
                        directGVtreeDocument.expandAll(); // Expand all tree nodes
                        directGVtreeDocument.pushUpdate(); // Commit updates
                        const directDGVProperties = {
                            id: nodeId,
                            treeDocument: directGVtreeDocument,
                            columns: DELWebProcessStructViewerUtils_1.columns,
                            showRowIndexFlag: false,
                            layoutOptions: {
                                columnsHeader: false,
                                rowsHeader: false,
                            },
                        };
                        const indirectDGVTreeDocument = new TreeDocument();
                        indirectDGVTreeDocument.prepareUpdate();
                        indirectDGVTreeDocument.withTransactionUpdate(() => {
                            dgvIndirectData.forEach((node) => {
                                const root = new TreeNodeModel({ grid: node });
                                indirectDGVTreeDocument.addRoot(root);
                            });
                        });
                        indirectDGVTreeDocument.expandAll(); // Expand all tree nodes
                        indirectDGVTreeDocument.pushUpdate(); // Commit updates
                        const indirectDGVProperties = {
                            id: nodeId,
                            treeDocument: indirectDGVTreeDocument,
                            columns: DELWebProcessStructViewerUtils_1.columns,
                            showRowIndexFlag: false,
                            layoutOptions: {
                                columnsHeader: false,
                                rowsHeader: false,
                            },
                        };
                        // Check for existing mounted root
                        let existingRoot = targetItemRootRef.current.get(nodeId);
                        // Create and register new React root if it doesn't already exist
                        if (!existingRoot) {
                            const newRoot = ReactDOM.createRoot(targetDiv);
                            targetItemRootRef.current.set(nodeId, newRoot);
                            existingRoot = newRoot;
                        }
                        const directStyleTag = document.createElement("style");
                        // const directUniqueClass = `dgv-structured-${Math.random().toString(36).slice(2, 11)}`;
                        const directUniqueClass = `dgv-structured-${nodeId}`;
                        let directDGVHeight = DGVRowHght * selfDrawingsNodes.length;
                        if (selfDrawingsNodes.length >= 5) {
                            directDGVHeight = 80;
                        }
                        directStyleTag.textContent = `.${directUniqueClass} { height: ${directDGVHeight}px; }`;
                        document.head.appendChild(directStyleTag);
                        let indirectDGVHeight = DGVRowHght * (parentDrawingsNodes.length + childDrawingsNodes.length);
                        if (parentDrawingsNodes.length + childDrawingsNodes.length >= 5) {
                            indirectDGVHeight = 120;
                        }
                        const indirectStyleTag = document.createElement("style");
                        // const indirectUniqueClass = `dgv-aggregated-${Math.random().toString(36).slice(2, 11)}`;
                        const indirectUniqueClass = `dgv-aggregated-${nodeId}`;
                        indirectStyleTag.textContent = `.${indirectUniqueClass} { height: ${indirectDGVHeight}px; }`;
                        document.head.appendChild(indirectStyleTag);
                        swimLaneChartdocument.observeFragmentElement(nodeId);
                        mbomNIdsUnobsrvRef.current.push(nodeId);
                        existingRoot.render(React.createElement(React.Fragment, null,
                            selfDrawingsNodes.length > 0 && (React.createElement(Expander_1.default, { expanderProperties: { header: nls.DirectExpander, expandedFlag: true } },
                                React.createElement(DataGridView_1.default, { className: directUniqueClass, onAdd: DELWebProcessStructViewerUtils_1.showDrawing, dataGridViewProperties: directDGVProperties }))),
                            (parentDrawingsNodes.length > 0 || childDrawingsNodes.length > 0) && (React.createElement(Expander_1.default, { className: "expanderinMBOM", expanderProperties: { header: nls.IndirectExpander } },
                                React.createElement(DataGridView_1.default, { className: indirectUniqueClass, onAdd: DELWebProcessStructViewerUtils_1.showDrawing, dataGridViewProperties: indirectDGVProperties })))));
                    });
                    // Find the corresponding <foreignObject> inside swimLane for this MBOM
                });
            }
        }, []);
        (0, React_1.useEffect)(() => {
            return () => {
                // empyting the variables
                impMBOMWithDrwngArray.current.length = 0;
                InitialImpMBOMWithDrwngArray.current.length = 0;
                resDrwngsDGVMap.current.forEach((_, resNodeID) => {
                    swimLaneChartdoc.unObserveFragmentElement(resNodeID);
                });
                resDrwngsDGVMap.current.clear();
                mbomNIdsUnobsrvRef.current.forEach((mbomNID) => {
                    swimLaneChartdoc.unObserveFragmentElement(mbomNID);
                });
                mbomNIdsUnobsrvRef.current = [];
                const roots = Array.from(targetItemRootRef.current.values());
                setTimeout(() => {
                    roots.forEach((root) => root.unmount());
                    targetItemRootRef.current.clear();
                }, 0);
                targetItemRootRef.current.clear();
                mbomNodeMap.current.clear();
                structuredProcess = [];
                structuredMBOM = [];
                processModel = undefined;
                mbomModel = undefined;
                rootProcess = undefined;
                rootMBOM = undefined;
            };
        }, []);
        return (React.createElement("div", { id: "app-container-PSVApp" },
            React.createElement(Toolbar_1.default, { className: "toolbar-container-PSVApp" },
                React.createElement(Toolbar_1.default.IconButton, { category: "navigation", icon: { iconName: "home", fontIconFamily: 1 }, label: nls.Home, onClick: onClickHomeTlb, position: "far" })),
            DELWebProcessStructViewerUtils_1.navigationPreference === "One Level" && (React.createElement(Breadcrumb_1.default, { options: {
                    expandableSeparatorFlag: false,
                    value: breadcrumbPath.map((entry) => {
                        return { label: entry.label, value: entry.id, icon: entry.icon };
                    }),
                }, navigateTo: (clickedBrdcrumbObj) => {
                    // Find correct index in the breadcrumbPath for the clicked label
                    const index = breadcrumbPath.findIndex((entry, idx) => breadcrumbPath[idx].id === clickedBrdcrumbObj.value);
                    if (index !== -1) {
                        const clickedEntry = breadcrumbPath[index];
                        handleBreadcrumbClick(clickedEntry.id, index);
                    }
                }, separatorClicked: (value) => console.log("value:", value) })),
            React.createElement(DELSwimLaneComp_1.default, { className: "swimLaneChart-PSVApp", id: "swimLane", swimLaneChartProps: {
                    model: filteredModelProperties !== null && filteredModelProperties !== void 0 ? filteredModelProperties : modelProperties,
                    searchBar: true,
                    // used conditional spread based on the user preference
                    ...(DELWebProcessStructViewerUtils_1.navigationPreference === "One Level" ? { onNodeDblSelect: handleNodeDblSelect } : {}),
                }, swimLaneReady: handleSwimLaneReady })));
    };
    DELPSVAppComp.displayName = "DELPSVAppComp";
    exports.default = DELPSVAppComp;
});
