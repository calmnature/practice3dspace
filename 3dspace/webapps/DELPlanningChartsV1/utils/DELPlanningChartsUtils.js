/// <amd-module name="DS/DELPlanningChartsV1/utils/DELPlanningChartsUtils"/>
define("DS/DELPlanningChartsV1/utils/DELPlanningChartsUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.retriveAllNodesIds = exports.findAllEntriesIds = exports.findAllNodesIds = exports.getOriginalId = void 0;
    /**
     * In order to have two different node in **Planned** or **Realized** mode, gantt add "_planned" or "_realized" at the end of node / entries's id.
     * This function will return the initial id value.
     * @param { string } id Node id
     * @returns { string } id without "_planned" or "_realized".
     */
    const getOriginalId = (id) => id.replace('_planned', '').replace('_realized', '');
    exports.getOriginalId = getOriginalId;
    const findAllNodesIds = (ids) => {
        const allIds = [];
        ids.forEach((id) => {
            allIds.push(id + '_realized');
            allIds.push(id + '_planned');
        });
        return allIds;
    };
    exports.findAllNodesIds = findAllNodesIds;
    /**
     * Retrive all nodes in gantt model from id array
     * @param entries
     * @param { string[] } ids
     * @returns
     */
    const retriveAllNodesIds = (nodes, ids) => {
        const allIds = [];
        ids.forEach((id) => {
            nodes.filter((node) => node.id.includes(id)).forEach((node) => {
                allIds.push(node.id);
            });
        });
        return allIds;
    };
    exports.retriveAllNodesIds = retriveAllNodesIds;
    /**
     * Retrive all entries in gantt model from id array
     * @param entries
     * @param { string[] } ids
     * @returns
     */
    const findAllEntriesIds = (entries, ids) => {
        const allIds = [];
        ids.forEach((id) => {
            entries.forEach((entrie) => {
                if (entrie.subEntries && entrie.subEntries.length > 0) {
                    //@ts-ignore
                    allIds.push(findAllEntriesIds(entrie.subEntries, ids));
                }
                else {
                    if (entrie.id.includes(id))
                        allIds.push(entrie.id);
                }
            });
        });
        return allIds;
    };
    exports.findAllEntriesIds = findAllEntriesIds;
});
