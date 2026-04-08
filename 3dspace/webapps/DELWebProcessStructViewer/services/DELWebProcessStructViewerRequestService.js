/// <amd-module name='DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerRequestService'/>
define("DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerRequestService", ["require", "exports", "DS/WAFData/WAFData", "./DELWebProcessStructViewerUtils", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewerReqServices"], function (require, exports, WAFData, DELWebProcessStructViewerUtils_1, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Globals assumed in usage context
    let processExpandResponse = [];
    let itemExpandResponse = [];
    const implementedItemIds = [];
    const scopedProcessMI = [];
    const implementedMIIds = [];
    const implementedMIEIIds = [];
    //DOCME-API - API main class to progressiveexpand + CRUD operations
    class DELLightViewRequestService {
        /**
         * Check Platform info (3DSpace URL && SecurityContext ) are available & returns boolean
         * @returns boolean
         */
        checkPlatformInfo() {
            var _a, _b, _c, _d, _e;
            //@ts-ignore
            return ((_c = (_b = (_a = DELLightViewRequestService === null || DELLightViewRequestService === void 0 ? void 0 : DELLightViewRequestService.headOptions) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.SecurityContext) === null || _c === void 0 ? void 0 : _c.length) > 0 && ((_e = (_d = DELLightViewRequestService === null || DELLightViewRequestService === void 0 ? void 0 : DELLightViewRequestService.Config) === null || _d === void 0 ? void 0 : _d.baseUrl) === null || _e === void 0 ? void 0 : _e.length) > 0;
        }
        static getInstance() {
            if (!DELLightViewRequestService.instance) {
                DELLightViewRequestService.instance = new DELLightViewRequestService();
            }
            return DELLightViewRequestService.instance;
        }
        static setPlatformInfo(baseUrl, ctx) {
            if (!baseUrl || baseUrl === "" || !ctx || ctx === "" || !this.Config || !this.headOptions || !this.headOptions.headers)
                return;
            this.Config.baseUrl = baseUrl;
            if (typeof this.headOptions.headers === "object" && this.headOptions.headers !== null && "SecurityContext" in this.headOptions.headers) {
                this.headOptions.headers.SecurityContext = ctx;
            }
        }
        //DOCME-API - progressiveExpand from cvservlet. Retrieve objects + desired attributes for N+1 levels
        /**
         * Expand
         * @param id
         * @param onComplete
         * @param onFailure
         */
        progressiveExpand(id, type, mainType, physical_id_paths, onComplete, onFailure) {
            if (!this.checkPlatformInfo())
                return onFailure(nls.Error_Plateforminfo);
            // creates a RequestBody for a API call
            const requestBody = this.buildExpandRequestBody(id, physical_id_paths);
            // API call
            WAFData.handleRequest(`${DELLightViewRequestService.Config.baseUrl}${DELLightViewRequestService.Config.progresiveExpand}`, {
                ...DELLightViewRequestService.headOptions,
                method: "POST",
                data: JSON.stringify(requestBody),
                onComplete: (response) => this.handleExpandSuccess(response, id, type, mainType, onComplete, onFailure),
                onFailure: (error) => onFailure((error === null || error === void 0 ? void 0 : error.message) || nls.Error_Expand),
            });
        }
        // creates a request body
        buildExpandRequestBody(ids, physical_id_paths) {
            const idArray = Array.isArray(ids) ? ids : [ids];
            return {
                batch: {
                    expands: idArray.map((id) => {
                        const expandItem = {
                            label: `DELLightViewerWeb-${new Date().toISOString()}-${id}`,
                            root: { physical_id: id },
                            filter: physical_id_paths && physical_id_paths.length > 0
                                ? {
                                    or: {
                                        filters: [
                                            {
                                                or: {
                                                    filters: [
                                                        {
                                                            prefix_filter: {
                                                                prefix_path: [
                                                                    {
                                                                        physical_id_path: physical_id_paths,
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            sequence_filter: {
                                                                sequence: [
                                                                    {
                                                                        uql: "flattenedtaxonomies:types/MfgProductionPlanning",
                                                                    },
                                                                    {
                                                                        statement: "END",
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                }
                                : {
                                    prefix_filter: {
                                        prefix_path: [{ physical_id_path: [id] }],
                                    },
                                },
                            graph: {
                                descending_condition: {
                                    uql: "availability:1",
                                },
                            },
                        };
                        return expandItem;
                    }),
                },
                outputs: {
                    format: "entity_relation_occurrence",
                    select_object: Object.keys(DELWebProcessStructViewerUtils_1.objectMap),
                    select_relation: ["physicalid", "from.physicalid", "to.physicalid", "type", "interface", "pathsr"],
                    hits: {
                        predefined_computation: ["icons"],
                    },
                },
            };
        }
        /**
         * Handles the success of a progressive expand request.
         * @param response - The response from the progressive expand request.
         * @param id - The ID of the resource to expand.
         * @param type - The type of resource to expand (ITEM or Process).
         * @param onComplete - The callback function to call when the request is complete.
         * @param onFailure - The callback function to call when the request fails.
         */
        async handleExpandSuccess(response, id, type, mainType, onComplete, onFailure) {
            if (!response)
                return onFailure(nls.Error_EmptyResponse);
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(response);
            }
            catch {
                return onFailure(nls.Error_ParseFail);
            }
            const items = parsedResponse.results;
            if ((!items || items.length === 0) && mainType === DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.RESOURCE) {
                return onFailure(nls.Error_Expand);
            }
            if (!items || items.length === 0) {
                return onFailure(nls.Error_Expand);
            }
            else {
                // if manufactring or service item id is passed
                if (mainType === DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.ITEM || mainType === DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.SBOMITEM) {
                    const instAndRef = items.filter((item) => item.resourceid);
                    itemExpandResponse = instAndRef;
                    const expandItems = (0, DELWebProcessStructViewerUtils_1.expandObjectRelations)(items, mainType, id);
                    // from implemented manufacturing items build a array of pair implemented engineering item and manufacturing item
                    this.getImplementedMIEI(itemExpandResponse, implementedItemIds, implementedMIEIIds);
                    this.getscopedMIEI(expandItems.implementedMIEIs, implementedMIEIIds, scopedProcessMI);
                    //  Assign ITEM response
                    expandItems.itemResponse = expandItems.expandResponse;
                    //Assign ITEM capableResourceIds
                    expandItems.itemResourceIds = expandItems.capableResourceIds;
                    // Assign drawings safely
                    expandItems.drawings = expandItems.drawings;
                    //  handle item drop
                    if (type !== mainType) {
                        expandItems.expandResponse = [];
                        await this.enrichWithSelfDrawings(expandItems, expandItems.implementedMIEIs, expandItems.drawings, itemExpandResponse);
                        this.enrichWithParentDrawings(expandItems, expandItems.implementedMIEIs, expandItems.drawings, itemExpandResponse);
                        this.enrichWithChildrenDrawings(expandItems, expandItems.implementedMIEIs, expandItems.drawings, itemExpandResponse);
                        await this.enrichWithResources(expandItems);
                        await this.enrichWithResourcesMapping(expandItems, expandItems.itemResourceIds, expandItems.itemResponse);
                        this.enrichResourceIcons(expandItems);
                        onComplete(expandItems);
                    }
                    // workplan drop which has scoped ITEM
                    else {
                        await this.enrichWithSelfDrawings(expandItems, implementedMIEIIds, expandItems.drawings, itemExpandResponse);
                        this.enrichWithParentDrawings(expandItems, implementedMIEIIds, expandItems.drawings, itemExpandResponse);
                        this.enrichWithChildrenDrawings(expandItems, implementedMIEIIds, expandItems.drawings, itemExpandResponse);
                        onComplete([expandItems, instAndRef]);
                    }
                }
                // if resource id is passed
                else if (mainType === DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.RESOURCE) {
                    onComplete(parsedResponse);
                }
                // if process id is passed
                else {
                    const instAndRef = items.filter((item) => item.resourceid);
                    processExpandResponse = instAndRef;
                    this.handleProcessExpand(id, items, mainType, onComplete, onFailure);
                }
            }
        }
        /**
         * Handles the work-plan expand request.
         * @param id - The ID of the resource to expand.
         * @param instAndRef - The instance and reference objects.
         * @param onComplete - The callback function to call when the request is complete.
         * @param onFailure - The callback function to call when the request fails.
         */
        async handleProcessExpand(id, instAndRef, mainType, onComplete, onFailure) {
            var _a, _b;
            // created a array of parent-child relation and other related attributes like drawing, resources, scoped and implemented ids
            const expandItems = (0, DELWebProcessStructViewerUtils_1.expandObjectRelations)(instAndRef, DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.PROCESS, id);
            if (!expandItems || !Array.isArray(expandItems.expandResponse) || expandItems.expandResponse.length === 0)
                return onFailure(nls.Error_ObjectNotFound);
            //Assign process capableResourceIds
            expandItems.processResourceIds = expandItems.capableResourceIds;
            for (const arr of expandItems.scopedIds) {
                // scopedProcessMI.push(arr.slice(0, -1));
                scopedProcessMI.push(...expandItems.scopedIds);
            }
            implementedItemIds.push(...expandItems.implementedIds);
            const tasks = [
                await this.enrichWithscopedItem(id, mainType, expandItems),
                await this.enrichWithscopedItems(expandItems),
                await this.enrichWithResources(expandItems),
                this.enrichWithImplementedLinks(expandItems, processExpandResponse),
                this.enrichWithResourcesMapping(expandItems, expandItems.processResourceIds, expandItems.expandResponse),
                this.enrichWithResourcesMapping(expandItems, (_a = expandItems.itemResourceIds) !== null && _a !== void 0 ? _a : [], (_b = expandItems.itemResponse) !== null && _b !== void 0 ? _b : []),
                this.enrichResourceIcons(expandItems),
            ];
            await Promise.all(tasks)
                .then(() => onComplete(expandItems))
                .catch((err) => onFailure((err === null || err === void 0 ? void 0 : err.message) || nls.Error_PromisesFail));
        }
        /**
         * progressive expand on resources webservice call
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when API call is completed.
         */
        enrichWithResources(expandItems) {
            return new Promise((resolve, reject) => {
                var _a, _b;
                if (!DELWebProcessStructViewerUtils_1.displayResourceDrawings) {
                    return resolve();
                }
                if (!expandItems ||
                    ((!Array.isArray(expandItems.itemResourceIds) || expandItems.itemResourceIds.length === 0) &&
                        (!Array.isArray(expandItems.processResourceIds) || expandItems.processResourceIds.length === 0)))
                    return resolve();
                // take all resource ids of item and process
                const rawLists = [...((_a = expandItems.itemResourceIds) !== null && _a !== void 0 ? _a : []), ...((_b = expandItems.processResourceIds) !== null && _b !== void 0 ? _b : [])];
                const firstElements = rawLists.flatMap((inner) => {
                    const first = inner[0];
                    return Array.isArray(first) ? first : [first];
                });
                const unique = Array.from(new Set(firstElements));
                const capableResourceIds = unique.length === 1 ? unique[0] : unique;
                // API call on capableResourceIds
                this.progressiveExpand(capableResourceIds, DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.RESOURCE, DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.RESOURCE, undefined, (response) => {
                    var _a, _b, _c, _d;
                    var _e;
                    if (response && response.results) {
                        const resourcesResults = response.results;
                        const resources = resourcesResults.filter((item) => item.resourceid);
                        const resourceIdsArray = Array.isArray(capableResourceIds) ? capableResourceIds : [capableResourceIds];
                        for (let i = 0; i < resourceIdsArray.length; i++) {
                            const resourceId = resourceIdsArray[i];
                            const matchedResource = resources.find((r) => r.resourceid === resourceId);
                            if (matchedResource) {
                                let mainItem = matchedResource;
                                if (DELWebProcessStructViewerUtils_1.resourceDrawingsChildrenRollUp && DELWebProcessStructViewerUtils_1.resourceDrawingsChildrenDepth !== 1) {
                                    this.enrichWithResourcesChildrenDrawings(expandItems, mainItem, resources, DELWebProcessStructViewerUtils_1.resourceDrawingsChildrenDepth);
                                }
                                // logic to add corresponding resource drawings
                                const matches = resources.filter((n) => n.from === mainItem.resourceid && n.type === "VPMRepInstance");
                                ((_a = expandItems.resourceResponse) !== null && _a !== void 0 ? _a : (expandItems.resourceResponse = [])).push(mainItem);
                                for (const match of matches) {
                                    const matcheddrawing = resources.find((q) => q.resourceid === match.to && q.type === "Drawing");
                                    if (matcheddrawing) {
                                        (_b = (_e = mainItem).drawingsIds) !== null && _b !== void 0 ? _b : (_e.drawingsIds = []);
                                        if (!mainItem.drawingsIds.includes(matcheddrawing.resourceid)) {
                                            mainItem.drawingsIds.push(matcheddrawing.resourceid);
                                        }
                                        if (!((_c = expandItems.drawings) === null || _c === void 0 ? void 0 : _c.some((drawing) => drawing.resourceid === matcheddrawing.resourceid))) {
                                            (_d = expandItems.drawings) === null || _d === void 0 ? void 0 : _d.push(matcheddrawing);
                                        }
                                    }
                                }
                            }
                        }
                        resolve();
                    }
                    else {
                        if (expandItems) {
                            expandItems.errors.push([nls.Error_ResourceLinkFail]);
                        }
                        resolve();
                    }
                }, (error) => {
                    if (expandItems) {
                        expandItems.errors.push([nls.Error_ResourceLinkFail]);
                    }
                    resolve();
                });
            });
        }
        /**
         * Enriches the expand items with scoped ITEM data.
         * @param id - The ID of the resource to expand.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithscopedItem(id, mainType, expandItems) {
            return new Promise((resolve) => {
                if (!expandItems || !expandItems.scopedIds || !Array.isArray(expandItems.scopedIds) || !expandItems.scopedIds.length) {
                    expandItems.errors.push([nls.Error_NoScope]);
                    return resolve();
                }
                if (typeof id !== "string")
                    return resolve();
                const result = expandItems.scopedIds.filter((item) => item[0] === id);
                if (result) {
                    if (result.length > 1) {
                        expandItems.errors.push([nls.Error_MoreScopes]);
                        resolve();
                    }
                    else {
                        const scopedId = result[0][1];
                        const tag = mainType === "Process" ? DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.ITEM : DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.SBOMITEM;
                        // API call on scoped MBOM ( For now: we have considered it will be only one )
                        this.progressiveExpand(scopedId, tag, tag, undefined, ([itemData]) => {
                            const extendedExpandItems = expandItems;
                            // Update root Process with scoped ITEM ID
                            const rootProcess = extendedExpandItems.expandResponse.find((item) => item.id === id);
                            if (rootProcess) {
                                rootProcess.scopedItem = scopedId;
                            }
                            // Update root ITEM with scoped Process ID
                            const rootITEM = itemData.expandResponse.find((item) => item.id === scopedId);
                            if (rootITEM) {
                                rootITEM.scopedProcessId = id;
                            }
                            // Assign ITEM response
                            extendedExpandItems.itemResponse = itemData.expandResponse;
                            // Assign drawings safely
                            extendedExpandItems.drawings = itemData.drawings;
                            //Assign ITEM capableResourceIds
                            expandItems.itemResourceIds = itemData.capableResourceIds;
                            resolve();
                        }, () => {
                            if (expandItems) {
                                expandItems.errors.push([nls.Error_Expand]);
                            }
                            resolve();
                        });
                    }
                }
                else {
                    resolve();
                }
            });
        }
        /**
         * Enriches the expand items with scoped ITEM data.
         * @param id - The ID of the resource to expand.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithscopedItems(expandItems) {
            return new Promise((resolve) => {
                if (!expandItems || !expandItems.scopedIds || !Array.isArray(expandItems.scopedIds) || !expandItems.scopedIds.length)
                    return resolve();
                for (let i = 0; i < expandItems.scopedIds.length; i++) {
                    const [id1, id2, label] = expandItems.scopedIds[i];
                    // Update root Process with scoped ITEM ID
                    const processItems = expandItems.expandResponse.filter((item) => item.resourceid === id1);
                    if (processItems) {
                        for (const processItem of processItems) {
                            // Update the root process with the scoped item ID
                            processItem.scopedItem = id2;
                        }
                    }
                }
                resolve();
            });
        }
        /**
         * Enriches the expanditems with implemented links.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithImplementedLinks(expandItems, processExpandResponse) {
            const implementedIds = expandItems.implementedIds;
            if (!implementedIds.length)
                return;
            implementedIds.forEach((pathArray) => {
                if (pathArray.length < 2)
                    return;
                const implementedItemId = pathArray[pathArray.length - 1];
                const targetInstanceId = pathArray[pathArray.length - 2];
                const targetNode = expandItems.expandResponse.find((item) => {
                    if (item.instanceId !== targetInstanceId)
                        return false;
                    if (!item.Path)
                        return false;
                    if (item.Path.length !== pathArray.length)
                        return false;
                    const itemPathInstanceIds = item.Path.map((p) => p.split("-").pop());
                    const hierarchyPath = itemPathInstanceIds.slice(1);
                    return hierarchyPath.every((id, idx) => id === pathArray[idx]);
                });
                if (!targetNode)
                    return;
                if (!Array.isArray(targetNode.implementedITEM)) {
                    targetNode.implementedITEM = [];
                }
                if (!targetNode.implementedITEM.includes(implementedItemId)) {
                    targetNode.implementedITEM.push(implementedItemId);
                }
            });
        }
        /**
         * Enriches the expand items with resources mapping.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithResourcesMapping(expandItems, capableResourceIds, response) {
            return new Promise((resolve) => {
                if (!expandItems ||
                    !Array.isArray(capableResourceIds) ||
                    capableResourceIds.length === 0 ||
                    !Array.isArray(expandItems.resourceResponse) ||
                    expandItems.resourceResponse.length === 0)
                    return resolve();
                for (const resourceId of capableResourceIds) {
                    if (resourceId[2] === DELWebProcessStructViewerUtils_1.CAPABILITY_TAGS.PRIMARY) {
                        const isMatches = response.filter((entry) => entry.resourceid === resourceId[1]);
                        if (isMatches) {
                            for (const isMatch of isMatches) {
                                if (!Array.isArray(isMatch.primResourceId)) {
                                    isMatch.primResourceId = [];
                                }
                                if (!isMatch.primResourceId.includes(resourceId[0])) {
                                    isMatch.primResourceId.push(resourceId[0]);
                                }
                            }
                        }
                    }
                    else if (resourceId[2] === DELWebProcessStructViewerUtils_1.CAPABILITY_TAGS.SECONDARY) {
                        const isMatches = response.filter((entry) => entry.resourceid === resourceId[1][1]);
                        if (isMatches) {
                            for (const isMatch of isMatches) {
                                if (!Array.isArray(isMatch.secResourceIds)) {
                                    isMatch.secResourceIds = [];
                                }
                                isMatch.secResourceIds.push([resourceId[0], resourceId[1][0]]);
                            }
                        }
                    }
                    else {
                        console.log("something went wrong with resources");
                    }
                }
                // assign resources Response into resourceResponse array
                expandItems.resourceResponse = expandItems.resourceResponse;
                resolve();
            });
        }
        /**
         * Enriches the expand items with self drawings.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithSelfDrawings(expandItems, implementedMIEIs, drawingsResponse, itemExpandResponse) {
            return new Promise((resolve) => {
                if (!DELWebProcessStructViewerUtils_1.displayDrawings) {
                    return resolve();
                }
                if (!expandItems ||
                    !Array.isArray(expandItems.itemResponse) ||
                    expandItems.itemResponse.length === 0 ||
                    !drawingsResponse ||
                    !Array.isArray(drawingsResponse) ||
                    drawingsResponse.length === 0 ||
                    !implementedMIEIs ||
                    !Array.isArray(implementedMIEIs) ||
                    implementedMIEIs.length === 0)
                    return resolve();
                const itemResponse = expandItems.itemResponse;
                if (itemResponse) {
                    for (const implementedMIEI of implementedMIEIs) {
                        const matches = itemExpandResponse.filter((item) => item.from === implementedMIEI[1] && item.type === "VPMRepInstance");
                        for (const match of matches) {
                            const item1 = drawingsResponse.find((item1) => item1.resourceid === match.to);
                            if (item1) {
                                const MIItems = itemResponse.filter((p) => p.resourceid === implementedMIEI[0]);
                                if (MIItems) {
                                    for (const MIItem of MIItems) {
                                        if (!MIItem.selfDrawings) {
                                            MIItem.selfDrawings = [];
                                        }
                                        const drawingExists = MIItem.selfDrawings.some((existingId) => existingId === item1.resourceid);
                                        if (!drawingExists) {
                                            MIItem.selfDrawings.push(item1.resourceid);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                resolve();
            });
        }
        /**
         * Enriches the expand items with parent drawings.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithParentDrawings(expandItems, implementedMIEIs, drawingsResponse, itemExpandResponse) {
            return new Promise((resolve) => {
                if (!DELWebProcessStructViewerUtils_1.drawingsParentRollUp || !DELWebProcessStructViewerUtils_1.displayDrawings) {
                    return resolve();
                }
                if (!expandItems ||
                    !Array.isArray(expandItems.itemResponse) ||
                    expandItems.itemResponse.length === 0 ||
                    !Array.isArray(drawingsResponse) ||
                    drawingsResponse.length === 0 ||
                    !Array.isArray(implementedMIEIs) ||
                    implementedMIEIs.length === 0)
                    return resolve();
                if (DELWebProcessStructViewerUtils_1.drawingsParentDepth === 1) {
                    for (const implementedMIEI of implementedMIEIs) {
                        const EIParent = itemExpandResponse.find((item) => item.type === "VPMInstance" && item.to === implementedMIEI[1]);
                        if (EIParent) {
                            const matches = itemExpandResponse.filter((item) => item.from === EIParent.from && item.type === "VPMRepInstance");
                            for (const match of matches) {
                                const item1 = drawingsResponse.find((item1) => item1.resourceid === match.to);
                                if (item1) {
                                    const MIItems = expandItems.itemResponse.filter((p) => p.resourceid === implementedMIEI[0]);
                                    if (MIItems) {
                                        for (const MIItem of MIItems) {
                                            if (!MIItem.parentDrawings) {
                                                MIItem.parentDrawings = [];
                                            }
                                            const drawingExists = MIItem.parentDrawings.some((existingId) => existingId === item1.resourceid);
                                            if (!drawingExists) {
                                                MIItem.parentDrawings.push(item1.resourceid);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                resolve();
            });
        }
        /**
         * Enriches the expand items with children drawings.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithChildrenDrawings(expandItems, implementedMIEIs, drawingsResponse, itemExpandResponse) {
            return new Promise((resolve) => {
                if (!DELWebProcessStructViewerUtils_1.drawingsChildrenRollUp || !DELWebProcessStructViewerUtils_1.displayDrawings) {
                    return resolve();
                }
                if (!expandItems ||
                    !Array.isArray(expandItems.itemResponse) ||
                    expandItems.itemResponse.length === 0 ||
                    !drawingsResponse ||
                    !Array.isArray(drawingsResponse) ||
                    drawingsResponse.length === 0 ||
                    !implementedMIEIs ||
                    !Array.isArray(implementedMIEIs) ||
                    implementedMIEIs.length === 0)
                    return resolve();
                if (DELWebProcessStructViewerUtils_1.drawingsChildrenDepth === 1) {
                    for (const implementedMIEI of implementedMIEIs) {
                        const EIChilds = itemExpandResponse.filter((item) => item.type === "VPMInstance" && item.from === implementedMIEI[1]);
                        if (EIChilds && EIChilds.length > 0) {
                            for (const EIChild of EIChilds) {
                                // this is child of EI
                                const matches = itemExpandResponse.filter((item) => item.from === EIChild.to && item.type === "VPMRepInstance");
                                if (matches && matches.length > 0) {
                                    for (const match of matches) {
                                        const item1 = drawingsResponse.find((item1) => item1.resourceid === match.to);
                                        // this item1 is the drawing of child
                                        if (item1) {
                                            const MIItems = expandItems.itemResponse.filter((p) => p.resourceid === implementedMIEI[0]);
                                            if (MIItems) {
                                                for (const MIItem of MIItems) {
                                                    if (!MIItem.childDrawings) {
                                                        MIItem.childDrawings = [];
                                                    }
                                                    const drawingExists = MIItem.childDrawings.some((existingId) => existingId === item1.resourceid);
                                                    if (!drawingExists) {
                                                        MIItem.childDrawings.push(item1.resourceid);
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
                resolve();
            });
        }
        /**
         * Get implemented MI and EI items.
         * @param itemExpandResponse - The expand items response to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        getImplementedMIEI(itemExpandResponse, implementedItemIds, implementedMIEIIds) {
            for (const resourceId of implementedItemIds) {
                const item = itemExpandResponse.find((item) => item.resourceid === resourceId[resourceId.length - 1]);
                if (item) {
                    implementedMIIds.push(item.to);
                    const item1 = itemExpandResponse.find((item2) => item2.from === item.to && item2.type === "DELFmiProcessImplementCnx");
                    if (item1) {
                        implementedMIEIIds.push([item.to, item1.to]);
                    }
                }
            }
        }
        getscopedMIEI(implementedItemIds, implementedMIEIIds, scopedProcessMI) {
            const workplanSecondIds = new Set(scopedProcessMI.map((item) => item[1]));
            const matchedMBOMEIs = implementedItemIds.filter((mbomEI) => workplanSecondIds.has(mbomEI[0]));
            // Push filtered matches into existing array, preserving previous values
            implementedMIEIIds.push(...matchedMBOMEIs);
        }
        /**
         * Enriches the expand items with resources children drawings.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichWithResourcesChildrenDrawings(expandItems, mainItem, resources, maxDepth // 0 means unlimited depth
        ) {
            return new Promise((resolve) => {
                var _a, _b;
                var _c;
                if (!expandItems ||
                    !Array.isArray(expandItems.itemResponse) ||
                    expandItems.itemResponse.length === 0 ||
                    !mainItem ||
                    !resources ||
                    !Array.isArray(resources) ||
                    resources.length === 0) {
                    return resolve();
                }
                (_a = (_c = mainItem).drawingsIds) !== null && _a !== void 0 ? _a : (_c.drawingsIds = []);
                (_b = expandItems.drawings) !== null && _b !== void 0 ? _b : (expandItems.drawings = []);
                const visited = new Set();
                const collectDrawingsRecursively = (parentId, currentDepth) => {
                    // Stop if we’ve reached the maximum depth (unless 0 = unlimited)
                    if (maxDepth > 0 && currentDepth >= maxDepth)
                        return;
                    const children = resources.filter((item) => item.from === parentId && item.type === "VPMInstance");
                    for (const child of children) {
                        if (visited.has(child.to))
                            continue;
                        visited.add(child.to);
                        const repInstances = resources.filter((item) => item.from === child.to && item.type === "VPMRepInstance");
                        for (const rep of repInstances) {
                            const drawing = resources.find((item) => item.resourceid === rep.to && item.type === "Drawing");
                            if (drawing) {
                                if (!mainItem.drawingsIds.includes(drawing.resourceid)) {
                                    mainItem.drawingsIds.push(drawing.resourceid);
                                }
                                if (!expandItems.drawings.some((d) => d.resourceid === drawing.resourceid)) {
                                    expandItems.drawings.push(drawing);
                                }
                            }
                        }
                        // Go deeper if within depth
                        collectDrawingsRecursively(child.to, currentDepth + 1);
                    }
                };
                // Start from depth 0 (mainItem is level 0, children are level 1)
                collectDrawingsRecursively(mainItem.resourceid, 0);
                return resolve();
            });
        }
        /**
         * Enriches the expand items with resources mapping.
         * @param expandItems - The expand items to enrich.
         * @returns A promise that resolves when the enrichment is complete.
         */
        enrichResourceIcons(expandItems) {
            return new Promise((resolve) => {
                if (!expandItems || !Array.isArray(expandItems.resourceResponse) || expandItems.resourceResponse.length === 0)
                    return resolve();
                expandItems.resourceResponse.forEach((item) => {
                    var _a;
                    const parsedUrl = new URL(item.icon);
                    const iconName = (_a = parsedUrl.searchParams.get("ipml_46_iconname")) !== null && _a !== void 0 ? _a : "";
                    // overwrite icon field with extracted name
                    if (iconName) {
                        item.icon = `${DELLightViewRequestService.Config.baseUrl}/snresources/images/icons/small/${iconName}.png`;
                    }
                });
                resolve();
            });
        }
    }
    DELLightViewRequestService.Config = {
        baseUrl: "",
        progresiveExpand: "/cvservlet/progressiveexpand/v2?output_format=cvjson",
    };
    //Reused in each request
    DELLightViewRequestService.headOptions = {
        authentication: "passport",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            SecurityContext: "",
        },
    };
    exports.default = DELLightViewRequestService;
});
