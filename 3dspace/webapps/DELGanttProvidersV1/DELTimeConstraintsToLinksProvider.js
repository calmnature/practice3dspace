/// <amd-module name="DS/DELGanttProvidersV1/DELTimeConstraintsToLinksProvider"/>
define("DS/DELGanttProvidersV1/DELTimeConstraintsToLinksProvider", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeConstraintsToLinksProvider = timeConstraintsToLinksProvider;
    /**
     *
     * @param { SerializedOperationTimeConstraintProp[] } timeConstraints
     * @returns { Link[] } Links (arrows) between nodes in Gantt.
     */
    function timeConstraintsToLinksProvider(timeConstraints, mode) {
        if (typeof timeConstraints === 'undefined')
            return [];
        return Object.values(timeConstraints).map((timeConstraint) => ({
            id: timeConstraint.id,
            successor: (mode === "Realized") ? timeConstraint.nextOperation + "_realized" : timeConstraint.nextOperation + "_planned",
            nodeId: (mode === "Realized") ? timeConstraint.prevOperation + "_realized" : timeConstraint.prevOperation + "_planned",
            linkType: convertDependencyTypeToLinkType(timeConstraint.dependencyType),
            lineStyle: 'solid'
        }));
    }
    ;
    /**
     *
     * @param { string } dependencyType
     * @returns { LinkType }
     */
    function convertDependencyTypeToLinkType(dependencyType) {
        let linkType = 'EndStart';
        switch (dependencyType) {
            case 'TimeConstraintDependencyType_StartToStart':
                linkType = 'StartStart';
                break;
            case 'TimeConstraintDependencyType_FinishToStart':
                linkType = 'EndStart';
                break;
            case 'TimeConstraintDependencyType_FinishToFinish':
                linkType = 'EndEnd';
                break;
            case 'TimeConstraintDependencyType_StartToFinish':
                linkType = 'StartEnd';
                break;
        }
        return linkType;
    }
    ;
});
