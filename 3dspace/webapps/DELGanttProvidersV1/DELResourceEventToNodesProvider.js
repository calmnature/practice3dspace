/// <amd-module name="DS/DELGanttProvidersV1/DELResourceEventToNodesProvider"/>
define("DS/DELGanttProvidersV1/DELResourceEventToNodesProvider", ["require", "exports", "DS/WebappsUtils/WebappsUtils", "DS/DELCorpusLegacyTypings/CorpusExecution"], function (require, exports, WebappsUtils, CorpusExecution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resourceEventToNodesProvider = resourceEventToNodesProvider;
    /**
     * Convert Resource Event to nodes understood by Gantt
     * @param { ResourceEventProp[] | ResourceEventProp } resourceEvent Collection of Serialized Operations
     * @param { Mode } mode
     * @returns { Node[] } Collection of Nodes
     */
    function resourceEventToNodesProvider(resourceEvent, mode) {
        /**
         * Convert Resource Events into Nodes for Gantt
         * @param { ResourceEventProp[] } resourceEvents
         * @returns { Node[] } Returns Actual Node
         */
        const getNodesProviderActual = (resourceEvents) => {
            if (typeof resourceEvents === 'undefined' || resourceEvents === null || Object.keys(resourceEvents).length === 0)
                return [];
            return Object.values(resourceEvents).filter((resourceEvent) => typeof resourceEvent !== "undefined" && resourceEvent.scheduleStartDate !== "" && resourceEvent.scheduledEndDate !== "").map((node) => convert(node, "Planned")).filter((node) => typeof node !== 'undefined');
        };
        /**
         * Convert Resource Events into Nodes for Gantt
         * @param { ResourceEventProp[] } resourceEvents
         * @returns { Node[] } Returns Scheduled Node
         */
        const getNodesProviderScheduled = (resourceEvents) => {
            if (typeof resourceEvents === 'undefined' || resourceEvents === null || Object.keys(resourceEvents).length === 0)
                return [];
            return Object.values(resourceEvents).filter((resourceEvent) => typeof resourceEvent !== "undefined" && resourceEvent.actualStartDate !== "" && resourceEvent.actualEndDate !== "").map((node) => convert(node, "Realized")).filter((node) => typeof node !== 'undefined');
        };
        if (typeof resourceEvent === 'undefined' || resourceEvent === null || Object.keys(resourceEvent).length === 0)
            return [];
        if (Object.keys(resourceEvent).length > 0) {
            return [...getNodesProviderActual(resourceEvent), ...getNodesProviderScheduled(resourceEvent)];
        }
        else {
            return [convert(resourceEvent, "Planned"), convert(resourceEvent, "Realized")];
        }
    }
    const convert = (resourceEvent, mode) => {
        if (resourceEvent.resourceId == null)
            return;
        return {
            id: (mode === "Realized") ? resourceEvent.id + "_realized" : resourceEvent.id + "_planned",
            start: new Date((resourceEvent.actualStartDate) ? resourceEvent.actualStartDate : resourceEvent.scheduleStartDate).getTime(),
            end: new Date((resourceEvent.actualEndDate) ? resourceEvent.actualEndDate : resourceEvent.scheduledEndDate).getTime(),
            dteId: (mode === "Realized") ? resourceEvent.resourceId + "_mode" : resourceEvent.resourceId,
            lines: [resourceEvent.label],
            //tooltip: this.getTooltip(),
            color: 'white',
            alertLevel: resourceEvent.severityValue,
            markers: [
                {
                    image: getClassificationIcon(resourceEvent.classificationValue),
                },
                {
                    image: WebappsUtils.getWebappsAssetUrl('DELGanttCommonV1', 'icons/I_PXPReportedAgainst.png')
                }
            ]
        };
    };
    /**
     * Get the right icon depending on the classificationValue.
     * @param { ClassificationValue } classificationValue
     * @returns { string } Asset url string.
     */
    const getClassificationIcon = (classificationValue) => {
        let uriIcon = 'icons/';
        switch (classificationValue) {
            case CorpusExecution_1.ClassificationValue.Create:
                uriIcon = uriIcon + "iconCreateState.png";
                break;
            case CorpusExecution_1.ClassificationValue.Active:
                uriIcon = uriIcon + "iconActiveState.png";
                break;
            case CorpusExecution_1.ClassificationValue.Closed:
                uriIcon = uriIcon + "iconClosedState.png";
                break;
            case CorpusExecution_1.ClassificationValue.Review:
                uriIcon = uriIcon + "iconReviewState.png";
                break;
            case CorpusExecution_1.ClassificationValue.Assign:
                uriIcon = uriIcon + "iconAssignState.png";
                break;
        }
        return WebappsUtils.getWebappsAssetUrl('DELGanttCommonV1', uriIcon);
    };
});
