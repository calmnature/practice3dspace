/// <amd-module name="DS/DELPXPGanttWOView/store/store"/>
define("DS/DELPXPGanttWOView/store/store", ["require", "exports", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/DELInfraWeb/store/DELStore", "DS/DELPXPGanttWOView/store/services/filteringServices", "DS/DELPXPGanttWOView/store/services/convertBICommputeValue"], function (require, exports, DELPXPBackendCommunicationType_1, DELStore_1, filteringServices_1, convertBICommputeValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const optionsPXPStore = {
        slicesCorpusCfg: [
            { uri: '/Execution/SerializedOperation' },
            { uri: '/Execution/WorkOrder' },
            { uri: '/Analytics/BIRuleActivated', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Analytics/BIComputeValue', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true, convertObject: convertBICommputeValue_1.convertBICommputeValue },
            { uri: '/Analytics/BIRule', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Experience/ActiveFiltersMask', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Experience/ObjectFiltersMask', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Experience/TimePeriod' },
            { uri: '/Playground/CurrentDisplayMode', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Rendering/CSO', stateSubscription: true },
            { uri: '/Rendering/HSO', stateSubscription: true },
            { uri: '/Playground/Player', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Playground/PlayerTime', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Playground/CurrentPeriod', endPointType: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User, stateSubscription: true },
            { uri: '/Resource/SerializedResource' },
            { uri: '/Resource/SerializedOrganization' },
            { uri: '/Experience/SelectionFilter' },
            { uri: '/Resource/ResourceEvent' }
        ],
        slicesEndPointCfg: [{
                uri: 'MXPv1_UserSessionLOCAL',
                type: DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User
            }],
        selectorComputedCfg: [
            {
                uri: "/computedSerializedOperation",
                extended: '/Execution/SerializedOperation',
                inputs: ['/Experience/ActiveFiltersMask', '/Experience/ObjectFiltersMask', '/Analytics/BIRuleActivated', '/Analytics/BIComputeValue', '/Analytics/BIRule'],
                function: filteringServices_1.filterSOP
            },
            {
                uri: "/computedSerializedResource",
                extended: '/Resource/SerializedResource',
                inputs: ['/Resource/SerializedOrganization', '/Experience/ActiveFiltersMask', '/Experience/ObjectFiltersMask'],
                function: filteringServices_1.selectSerializedResource
            },
            {
                uri: "/computedTimePeriod",
                extended: '/Experience/TimePeriod',
                inputs: ['/Playground/CurrentPeriod'],
                function: filteringServices_1.selectTimePeriod
            }
        ]
    };
    const pxpStore = (0, DELStore_1.createPXPStore)(optionsPXPStore);
    exports.default = pxpStore;
});
