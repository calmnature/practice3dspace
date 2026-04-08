/// <amd-module name="DS/DELGanttProvidersV1/DELSerializedResourcesToEntriesProvider"/>
define("DS/DELGanttProvidersV1/DELSerializedResourcesToEntriesProvider", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializedResourcesToEntriesProvider = serializedResourcesToEntriesProvider;
    function serializedResourcesToEntriesProvider(serializedResources, mode) {
        if (typeof serializedResources === 'undefined')
            return [];
        let modeValue = (mode === "Planned") ? "Realized" : "Planned";
        return Object.values(serializedResources).map((serializedResource) => {
            return {
                id: serializedResource === null || serializedResource === void 0 ? void 0 : serializedResource.id,
                values: {
                    col0: serializedResource === null || serializedResource === void 0 ? void 0 : serializedResource.displayName,
                    col1: serializedResource === null || serializedResource === void 0 ? void 0 : serializedResource.associedSerializedOrganization
                },
                subEntries: [{
                        id: `${serializedResource === null || serializedResource === void 0 ? void 0 : serializedResource.id}_mode`,
                        values: {
                            col0: modeValue,
                            col1: ''
                        }
                    }]
            };
        });
    }
    ;
});
