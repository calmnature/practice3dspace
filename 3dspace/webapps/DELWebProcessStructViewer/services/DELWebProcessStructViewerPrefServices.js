define("DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerPrefServices", ["require", "exports", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewer"], function (require, exports, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildPreferences = buildPreferences;
    exports.setLastSessionObjectIdType = setLastSessionObjectIdType;
    exports.getLastSessionObjectIdType = getLastSessionObjectIdType;
    exports.getReloadValue = getReloadValue;
    const BULLET = "\u25CF"; // Unicode character - Black Circle
    function buildPreferences(userCollabSpace, defaultCollabSpace, arrPlatformInfo, appInfo) {
        if (typeof widget === "undefined" || typeof widget.setPreferences === "undefined")
            return;
        const arrPreferences = [];
        //Platform
        if (appInfo.platformId !== "OnPremise" &&
            typeof appInfo !== "undefined" &&
            appInfo.platformId !== "" &&
            typeof arrPlatformInfo !== "undefined" &&
            arrPlatformInfo.length > 0) {
            let arrInfo = [];
            if (appInfo.tenantAware === true) {
                const info = arrPlatformInfo.find((info) => info.platformId === appInfo.platformId);
                if (info) {
                    arrInfo.push(info);
                }
            }
            else {
                arrInfo = arrPlatformInfo;
            }
            arrPreferences.push({
                name: "platformId",
                disabled: arrInfo.length === 1 ? true : false,
                type: "list",
                label: nls.Platform_Preference,
                defaultValue: appInfo.platformId,
                options: arrInfo.map((info) => {
                    return { label: info.displayName, value: info.platformId };
                }),
            });
        }
        //Credentials
        if (typeof defaultCollabSpace !== "undefined" &&
            defaultCollabSpace !== "" &&
            typeof userCollabSpace !== "undefined" &&
            typeof userCollabSpace.collabspaces !== "undefined" &&
            userCollabSpace.collabspaces.length > 0 &&
            typeof userCollabSpace.preferredcredentials !== "undefined" &&
            typeof userCollabSpace.preferredcredentials.collabspace !== "undefined" &&
            typeof userCollabSpace.preferredcredentials.organization !== "undefined" &&
            typeof userCollabSpace.preferredcredentials.role !== "undefined") {
            // Check if Organization is the same for all Collabspaces
            const fctCheckIfSameOrganization = (arrCollabSpace) => {
                if (!arrCollabSpace || arrCollabSpace.length === 0)
                    return false;
                const arrOrgPID = [];
                arrCollabSpace.forEach((collabSpace) => {
                    if (collabSpace.couples && collabSpace.name) {
                        collabSpace.couples.forEach((couple) => {
                            if (couple.organization &&
                                couple.organization.pid &&
                                couple.organization.title &&
                                couple.organization.name &&
                                couple.role &&
                                couple.role.name &&
                                couple.role.nls &&
                                arrOrgPID.indexOf(couple.organization.pid) === -1) {
                                arrOrgPID.push(couple.organization.pid);
                            }
                        });
                    }
                });
                return arrOrgPID.length === 1;
            };
            const bSameOrg = fctCheckIfSameOrganization(userCollabSpace.collabspaces);
            const arrCollabSpace = [];
            userCollabSpace.collabspaces.forEach((collabSpace) => {
                if (collabSpace.couples && collabSpace.name) {
                    collabSpace.couples.forEach((couple) => {
                        if (couple.organization &&
                            couple.organization.pid &&
                            couple.organization.title &&
                            couple.organization.name &&
                            couple.role &&
                            couple.role.name &&
                            couple.role.nls) {
                            arrCollabSpace.push({
                                label: collabSpace.title +
                                    " " +
                                    BULLET +
                                    " " +
                                    (bSameOrg ? couple.role.nls : couple.organization.title + " " + BULLET + " " + couple.role.nls),
                                value: couple.role.name + "." + couple.organization.name + "." + collabSpace.name,
                            });
                        }
                    });
                }
            });
            arrPreferences.push({
                name: "credentials",
                type: "list",
                label: nls.Credentials_Preference,
                options: arrCollabSpace,
                defaultValue: defaultCollabSpace,
            });
        }
        // Reload
        arrPreferences.push({ name: "autoReload", type: "boolean", label: nls.Reload_Preference, defaultValue: "false" });
        widget.setPreferences(arrPreferences);
    }
    /**
     * Set Last Session Object Id & Type
     * @param id - The physical id of the object
     * @param type - The type of the object
     * @returns
     */
    function setLastSessionObjectIdType(refSession) {
        if (!refSession || !widget.setValue)
            return;
        widget.setValue("lastSessionObject", refSession);
    }
    /**
     * Get Last Session Object Id and Type
     * @returns
     */
    function getLastSessionObjectIdType() {
        let oLasRefSession;
        if (!widget || !widget.getValue || typeof widget.getValue("lastSessionObject") === "undefined")
            return oLasRefSession;
        oLasRefSession = widget.getValue("lastSessionObject");
        return oLasRefSession;
    }
    /**
     * Get Reload last Session object value
     * @returns
     */
    function getReloadValue() {
        var _a;
        let oValue = false;
        const pref = (_a = widget === null || widget === void 0 ? void 0 : widget.getPreference) === null || _a === void 0 ? void 0 : _a.call(widget, "autoReload");
        if (!widget ||
            !widget.getPreference ||
            typeof widget.getPreference("autoReload") === "undefined" ||
            typeof widget.getPreference("autoReload").value === "undefined")
            return oValue;
        oValue = widget.getPreference("autoReload").value;
        return oValue;
    }
});
