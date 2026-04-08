/// <amd-module name='DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerDDServices'/>
define("DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerDDServices", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getObjectData = exports.isObject = void 0;
    /**
     * Check Drag Event content is an object
     * @param iDragEvent
     * @returns
     */
    const isObject = (iDragEvent) => {
        let obIsObject = false;
        if (!iDragEvent)
            return obIsObject;
        const dataTransfer = iDragEvent.dataTransfer;
        if (!dataTransfer)
            return obIsObject;
        if (dataTransfer.items) {
            // Chrome (IE, Safari and Firefox don't support dataTransfer.items)
            // If there are several items, it can be two things :
            // - An object comming from the search, in that case we need to accept it
            // - Several objects dragged from the hard drive, in that case in refuse it
            // Else there is only one item, we only accept what is comming from 3DSpace
            if (dataTransfer.items.length > 1) {
                let it = 0;
                const nbItem = dataTransfer.items.length;
                while (it < nbItem && !obIsObject) {
                    if (dataTransfer.items[it].type === "text/searchitems") {
                        obIsObject = true;
                    }
                    it++;
                }
            }
            else if (dataTransfer.items[0].kind === "string" && dataTransfer.items[0].type === "text/plain") {
                obIsObject = true;
            }
        }
        else if (dataTransfer.types) {
            // Firefox and IE
            // We accept: - An object coming from the search or from 3DSpace
            if (dataTransfer.types.length == 1) {
                // 3DSpace (one item)
                if (dataTransfer.types[0] == "text/plain" || dataTransfer.types[0] == "Text") {
                    obIsObject = true;
                }
            }
            else {
                // Search (one item or several items)
                if ((dataTransfer.types instanceof DOMStringList && dataTransfer.types.contains("text/searchitems")) ||
                    (dataTransfer.types instanceof Array && dataTransfer.types.indexOf("text/searchitems") > -1)) {
                    obIsObject = true;
                }
            }
        }
        return obIsObject;
    };
    exports.isObject = isObject;
    /**
     * Get Object data from Drag Event
     * @param {object} iDragEvent
     * @returns {object} information object from input dropped object: envId, contextId, objectId, displayName and displayType
     */
    const getObjectData = (iDragEvent) => {
        let oData = {
            envId: "",
            contextId: "",
            objectId: "",
            objectType: "",
            displayName: "",
            displayType: "",
        };
        if (!iDragEvent || !iDragEvent.dataTransfer)
            return oData;
        let searchItem = "";
        try {
            searchItem = iDragEvent.dataTransfer.getData("text/searchitems");
            if (searchItem === "") {
                searchItem = iDragEvent.dataTransfer.getData("text");
            }
        }
        catch (error) {
            // IE : need try catch because getData('non-existent param') triggers a JS error
            searchItem = iDragEvent.dataTransfer.getData("Text"); // IE
        }
        if (searchItem && searchItem !== "") {
            const objSearchItem = JSON.parse(searchItem);
            if (objSearchItem && objSearchItem.data && objSearchItem.data.items && objSearchItem.data.items.length > 0) {
                const dropParam = objSearchItem.data.items[0];
                if (dropParam) {
                    oData = {
                        envId: dropParam.envId,
                        contextId: dropParam.contextId,
                        objectId: dropParam.objectId,
                        objectType: dropParam.objectType,
                        displayName: dropParam.displayName,
                        displayType: dropParam.displayType,
                    };
                }
            }
        }
        return oData;
    };
    exports.getObjectData = getObjectData;
});
