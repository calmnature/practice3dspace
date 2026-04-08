/// <amd-module name="DS/DELInfraWeb/store/selectors/DELComputedSelector"/>
define("DS/DELInfraWeb/store/selectors/DELComputedSelector", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createComputedSelector = void 0;
    const createComputedSelector = (selectorComputedCfg, mapCorpusSelector) => {
        let oSelector;
        if (!selectorComputedCfg || !selectorComputedCfg.uri || selectorComputedCfg.uri === "" || !selectorComputedCfg.extended ||
            selectorComputedCfg.extended === "" || !selectorComputedCfg.function || !mapCorpusSelector || !Object.keys(mapCorpusSelector) ||
            Object.keys(mapCorpusSelector).length === 0 || !Object.keys(mapCorpusSelector).find(uri => uri === selectorComputedCfg.extended))
            return oSelector;
        let bCheckInputsFlag = true;
        if (selectorComputedCfg.inputs && selectorComputedCfg.inputs.length > 0) {
            let it = 0;
            const nbInput = selectorComputedCfg.inputs.length;
            while (it < nbInput && bCheckInputsFlag) {
                if (!selectorComputedCfg.inputs[it] || selectorComputedCfg.inputs[it] === "" || !Object.keys(mapCorpusSelector).find(uri => uri === selectorComputedCfg.inputs[it])) {
                    bCheckInputsFlag = false;
                }
                it++;
            }
        }
        if (!bCheckInputsFlag)
            return oSelector;
        const selectorInputs = [];
        selectorInputs.push((state) => {
            if (state && state[selectorComputedCfg.extended] && state[selectorComputedCfg.extended].entities) {
                return state[selectorComputedCfg.extended].entities;
            }
            else {
                return undefined;
            }
        });
        if (selectorComputedCfg.inputs && selectorComputedCfg.inputs.length > 0) {
            selectorComputedCfg.inputs.forEach((input) => {
                selectorInputs.push((state) => {
                    if (state && state[input] && state[input].entities) {
                        return state[input].entities;
                    }
                    else {
                        return undefined;
                    }
                });
            });
        }
        oSelector = (0, Toolkit_1.createSelector)(selectorInputs, selectorComputedCfg.function);
        return oSelector;
    };
    exports.createComputedSelector = createComputedSelector;
});
