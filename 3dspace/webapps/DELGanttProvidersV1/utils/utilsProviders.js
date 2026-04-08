/// <amd-module name="DS/DELGanttProvidersV1/utils/utilsProviders"/>
define("DS/DELGanttProvidersV1/utils/utilsProviders", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rgbToHexa = exports.applyColorWO = exports.applyColorSOP = void 0;
    /**
     * Apply color depending on serializedOperations with BI activated
     * @param { SerializedOperationProp } serializedOperations
     * @returns { string } Hexa color
     */
    const applyColorSOP = (serializedOperation) => {
        var _a, _b, _c, _d, _e, _f;
        const red = (_b = (_a = serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.biColor) === null || _a === void 0 ? void 0 : _a.red) !== null && _b !== void 0 ? _b : serializedOperation.defaultColor.red;
        const green = (_d = (_c = serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.biColor) === null || _c === void 0 ? void 0 : _c.green) !== null && _d !== void 0 ? _d : serializedOperation.defaultColor.green;
        const blue = (_f = (_e = serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.biColor) === null || _e === void 0 ? void 0 : _e.blue) !== null && _f !== void 0 ? _f : serializedOperation.defaultColor.blue;
        return (0, exports.rgbToHexa)(red, green, blue);
    };
    exports.applyColorSOP = applyColorSOP;
    /**
     * Apply color depending on workOrder with BI activated
     * @param { WorkOrderProp } workOrder
     * @returns { string } Hexa color
     */
    const applyColorWO = (workOrder) => {
        return (0, exports.rgbToHexa)(workOrder.color.red, workOrder.color.green, workOrder.color.blue);
    };
    exports.applyColorWO = applyColorWO;
    /**
     * Convert RGB to hexa color
     * @param { number } r Red RGB color
     * @param { number } g Green RGB color
     * @param { number } b Blue RGB color
     * @returns { string } Hexa color string
     */
    const rgbToHexa = (r, g, b) => {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    };
    exports.rgbToHexa = rgbToHexa;
});
