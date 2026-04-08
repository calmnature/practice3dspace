/// <amd-module name="DS/DELPXPGanttWOView/store/services/filteringServices"/>
define("DS/DELPXPGanttWOView/store/services/filteringServices", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.selectSerializedResource = exports.selectTimePeriod = exports.filterSOP = void 0;
    const applyFilter = (SOP, sliceObjectFltMask, sliceActiveFltMask) => {
        var _a, _b, _c;
        const allMasksPUID = sliceObjectFltMask.map((objFitlerMask) => { return { objectPUID: objFitlerMask.objectPUID, mask: objFitlerMask.mask }; });
        if (SOP.id && allMasksPUID) {
            //@ts-ignore
            if ((((_a = allMasksPUID.find((obgFilterMask) => obgFilterMask.objectPUID === SOP.id)) === null || _a === void 0 ? void 0 : _a.mask) & sliceActiveFltMask[0].mask)) {
                return false;
            }
            else if (((_b = SOP.id) === null || _b === void 0 ? void 0 : _b.start) != 0 && ((_c = SOP.id) === null || _c === void 0 ? void 0 : _c.end) != 0) {
                return true;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    /**
     * Serialized operations with mask and Bi apply. If Bi --> add biColor attribute to sop
     * @param { SerializedOperation[] } sliceSOP
     * @param { ActiveFiltersMask[] } sliceActiveFltMask
     * @param { ObjectFiltersMask[] } sliceObjectFltMask
     * @param { BIRuleActivated[] } sliceBIRuleActivated
     * @param { any[] } sliceBIComputeValue
     * @param { any[] } sliceBIRule
     * @returns { SerializedOperation[] } sliceSOP
     */
    const filterSOP = (sliceSOP, sliceActiveFltMask, sliceObjectFltMask, sliceBIRuleActivated, sliceBIComputeValue, sliceBIRule) => {
        var _a;
        if (sliceSOP && sliceSOP.length > 0) {
            if (sliceActiveFltMask && sliceActiveFltMask && sliceActiveFltMask.length > 0 && sliceActiveFltMask[0].mask !== undefined &&
                sliceObjectFltMask && sliceObjectFltMask && sliceObjectFltMask.length > 0) {
                return sliceSOP.filter((sop) => applyFilter(sop, sliceObjectFltMask, sliceActiveFltMask));
            }
            else if (sliceBIRuleActivated && sliceBIRuleActivated.length > 0 && sliceBIComputeValue && sliceBIComputeValue.length > 0 &&
                sliceBIRule && sliceBIRule.length > 0) {
                if (Number.isInteger((_a = sliceBIComputeValue[0]) === null || _a === void 0 ? void 0 : _a.value) && sliceBIRule) {
                    const idsToUpdate = new Map();
                    const biRule = sliceBIRule.filter((birule) => birule.id === sliceBIComputeValue[0].ruleId);
                    sliceBIComputeValue.forEach((computeValue) => {
                        //if (sliceBIComputeValue[0].ruleId !== computeValue.biRule) return; // If not same pallet
                        const pallet = biRule[0].pallet[computeValue.value];
                        idsToUpdate.set(computeValue.objectId, pallet);
                    });
                    return sliceSOP.map((sop) => {
                        let sopColor;
                        if (idsToUpdate.has(sop.id)) {
                            sopColor = idsToUpdate.get(sop.id);
                        }
                        if (sopColor && sliceBIRuleActivated[0].biRule !== null) {
                            return {
                                ...sop,
                                biColor: sopColor
                            };
                        }
                        else {
                            if (sop.biColor)
                                delete sop.biColor;
                            return {
                                ...sop
                            };
                        }
                    });
                }
            }
            else {
                return sliceSOP;
            }
        }
        return [];
    };
    exports.filterSOP = filterSOP;
    /**
     * Time period filtered by current period
     * @param { DELPXPCorpusSliceState } timePeriodSlice
     * @param { DELPXPCorpusSliceState } currentPeriodSlice
     * @returns { any[] } period selected (currently in use)
     */
    const selectTimePeriod = (timePeriodSlice, currentPeriodSlice) => {
        if (currentPeriodSlice && currentPeriodSlice.length > 0 && timePeriodSlice && timePeriodSlice && timePeriodSlice.length > 0) {
            return timePeriodSlice.filter((timePeriod) => timePeriod.id === currentPeriodSlice[0].timePeriod);
        }
        else {
            return timePeriodSlice;
        }
    };
    exports.selectTimePeriod = selectTimePeriod;
    /**
     *
     * @param { SerializedResource[] } serializedResourceSlice
     * @param { SerializedOrganization[] } serializedOrganizationSlice
     * @param { ActiveFiltersMask[] } sliceActiveFltMask
     * @param { ObjectFiltersMask[] } sliceObjectFltMask
     * @returns serializedResource
     */
    const selectSerializedResource = (serializedResourceSlice, serializedOrganizationSlice, sliceActiveFltMask, sliceObjectFltMask) => {
        if (serializedOrganizationSlice && serializedOrganizationSlice.length > 0 && serializedResourceSlice && serializedResourceSlice && serializedResourceSlice.length > 0) {
            return serializedResourceSlice.filter((SR) => applyFilter(SR, sliceObjectFltMask, sliceActiveFltMask)).map((serializedResource) => {
                var _a;
                return {
                    ...serializedResource,
                    associedSerializedOrganization: (_a = serializedOrganizationSlice.find((serializedOrganization) => serializedOrganization.id === serializedResource.fatherOrganization)) === null || _a === void 0 ? void 0 : _a.displayName
                };
            });
        }
        else {
            return serializedResourceSlice.filter((SR) => applyFilter(SR, sliceObjectFltMask, sliceActiveFltMask));
        }
    };
    exports.selectSerializedResource = selectSerializedResource;
});
