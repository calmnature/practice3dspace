/// <amd-module name="DS/DELGanttProvidersV1/DELIssuesToNodesProvider"/>
define("DS/DELGanttProvidersV1/DELIssuesToNodesProvider", ["require", "exports", "DS/WebappsUtils/WebappsUtils"], function (require, exports, WebappsUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scheduleIssueToNodes = exports.actualIssueToNodes = exports.scheduleIssuesToNodes = exports.actualIssuesToNodes = void 0;
    /**
     * Convert actual issues to node for Gantt.
     * @param { IssueTimeManagerProp[] | IssueTimeManagerProp } issues
     * @returns { CustomNodesTimeManager[] }
     */
    const actualIssuesToNodes = (issues) => {
        return Object.values(issues).map(issue => (0, exports.actualIssueToNodes)(issue));
    };
    exports.actualIssuesToNodes = actualIssuesToNodes;
    /**
     * Convert schedule issues to node for Gantt.
     * @param { IssueTimeManagerProp[] | IssueTimeManagerProp } issues
     * @returns { CustomNodesTimeManager[] }
     */
    const scheduleIssuesToNodes = (issues) => {
        return Object.values(issues).map(issue => (0, exports.scheduleIssueToNodes)(issue));
    };
    exports.scheduleIssuesToNodes = scheduleIssuesToNodes;
    /**
     * Convert actual issue to node for Gantt.
     * @param { IssueTimeManagerProp } issue
     * @returns { CustomNodesTimeManager }
     */
    const actualIssueToNodes = (issue) => {
        return {
            id: issue.id,
            date: new Date(issue.actualStartDate).getTime(),
            type: "milestone",
            dteId: issue.severityValue + "__Severity",
            milestoneType: {
                "image": WebappsUtils.getWebappsAssetUrl('DELTimeManagerV1', 'img/' + getIssueImg(issue.classificationValue))
            },
            tooltip: `<p class=\"delpxp-tooltip-property\">Title: <b>${issue.label}</b></p><p class=\"delpxp-tooltip-property\">Priority: <b>${issue.severityValue}</b></p><p class=\"delpxp-tooltip-property\">Maturity State: <b>${getMaturityState(issue.classificationValue)}</b></p>`,
            color: getIssueColor(issue.classificationValue)
        };
    };
    exports.actualIssueToNodes = actualIssueToNodes;
    /**
     * Convert schedule issue to node for Gantt.
     * @param { IssueTimeManagerProp } issue
     * @returns { CustomNodesTimeManager }
     */
    const scheduleIssueToNodes = (issue) => {
        return {
            id: issue.id,
            date: new Date(issue.scheduleStartDate).getTime(),
            type: "milestone",
            dteId: issue.severityValue + "__Severity",
            milestoneType: {
                "image": WebappsUtils.getWebappsAssetUrl('DELTimeManagerV1', 'img/' + getIssueImg(issue.classificationValue))
            },
            tooltip: `<p class=\"delpxp-tooltip-property\">Title: <b>${issue.label}</b></p><p class=\"delpxp-tooltip-property\">Priority: <b>${issue.severityValue}</b></p><p class=\"delpxp-tooltip-property\">Maturity State: <b>${getMaturityState(issue.classificationValue)}</b></p>`,
            color: getIssueColor(issue.classificationValue)
        };
    };
    exports.scheduleIssueToNodes = scheduleIssueToNodes;
    /**
     * @param { string } classificationValue
     * @returns { string } Return an image file depending on classificationValue
     */
    const getIssueImg = (classificationValue) => {
        var img;
        switch (classificationValue) {
            case "create":
                img = "iconCreateState.png";
                break;
            case "assign":
                img = "iconAssignState.png";
                break;
            case "active":
                img = "iconActiveState.png";
                break;
            case "review":
                img = "iconReviewState.png";
                break;
            case "closed":
                img = "iconClosedState.png";
                break;
            default:
                img = "";
                break;
        }
        return img;
    };
    /**
     * @param { string } classificationValue
     * @returns { string } Return color depending on classificationValue
     */
    const getIssueColor = (classificationValue) => {
        var color;
        switch (classificationValue) {
            case "create":
                color = "#9b2c98";
                break;
            case "assign":
                color = "#ff8a2e";
                break;
            case "active":
                color = "#009DDB";
                break;
            case "review":
                color = "#6fbc4b";
                break;
            case "closed":
                color = "#adadad";
                break;
            default:
                color = "#000";
                break;
        }
        return color;
    };
    /**
     *
     * @param { string } classificationValue
     * @returns { string } Return maturity state depending on classificationValue
     */
    const getMaturityState = (classificationValue) => {
        var maturity;
        switch (classificationValue) {
            case "create":
                maturity = "Draft";
                break;
            case "assign":
                maturity = "To Do";
                break;
            case "active":
                maturity = "In Work";
                break;
            case "review":
                maturity = "In Approval";
                break;
            case "closed":
                maturity = "Completed";
                break;
            default:
                maturity = "";
                break;
        }
        return maturity;
    };
});
