/// <amd-module name='DS/DELWebTools/DELPlatformServices'/>
define("DS/DELWebTools/DELPlatformServices", ["require", "exports", "DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices", "DS/WAFData/WAFData", "DS/DELWebTools/DELAuthenticationTools"], function (require, exports, i3DXCompassPlatformServices, WAFData, AuthTools) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DELTranslationPlatformServices {
        /**
         * FOR DEV CONTEXT ONLY: check if standalone mode is activated (through url param)
         * If yes, load app and platform info from a Json file to prevent i3DXCompassPlatformServices API calls
         * @returns
         */
        initStandaloneMode() {
            return new Promise((resolve, reject) => {
                if (DELTranslationPlatformServices._standaloneConfig.initFlag === true)
                    return resolve(true);
                DELTranslationPlatformServices._standaloneConfig.initFlag = true;
                if (!widget || (widget.id && typeof widget.id === "string") || !widget.getUrl || !DELTranslationPlatformServices._standaloneConfig) {
                    return resolve(false);
                }
                const urlStrWidget = widget.getUrl();
                if (urlStrWidget === "") {
                    return resolve(false);
                }
                let urlParams;
                try {
                    const urlWidget = new URL(urlStrWidget);
                    if (urlWidget && urlWidget.searchParams) {
                        urlParams = urlWidget.searchParams;
                    }
                }
                catch (error) {
                    throw new Error('GetStandaloneMode, Widget URL is invalid :' + error + '');
                }
                if (!urlParams || urlParams.size === 0) {
                    return resolve(false);
                }
                const platformId = urlParams.get('platformId');
                DELTranslationPlatformServices._standaloneConfig.platformId = (platformId !== null && platformId !== "") ? platformId : "OnPremise";
                const passportUrl = urlParams.get('passport');
                if (passportUrl !== null && passportUrl !== "") {
                    DELTranslationPlatformServices._standaloneConfig.passportUrl = passportUrl;
                    AuthTools.requestAuthentication().then((isAuthenticated) => {
                        DELTranslationPlatformServices._standaloneConfig.localFlag = true;
                        // Build 3DSpace value: Extract server name from passport url and build url
                        const arrCloudServer = passportUrl.match(/https:\/\/(.*?)\.iam\.3dx-staging\.3ds\.com:443/);
                        if (arrCloudServer !== null && arrCloudServer && arrCloudServer.length === 2 && arrCloudServer[1] !== "") {
                            DELTranslationPlatformServices._standaloneConfig.threeDSpace = "https://" + arrCloudServer[1] + "-space.3dx-staging.3ds.com:443/enovia";
                            DELTranslationPlatformServices._standaloneConfig.mepreferences = "https://" + arrCloudServer[1] + "-mep.3dx-staging.3ds.com:443";
                        }
                        else {
                            const arrE4allServer = passportUrl.match(/https:\/\/(.*?)\:453\/iam/);
                            if (arrE4allServer !== null && arrE4allServer && arrE4allServer.length === 2 && arrE4allServer[1] !== "") {
                                DELTranslationPlatformServices._standaloneConfig.threeDSpace = "https://" + arrE4allServer[1] + "/3DSpace";
                                DELTranslationPlatformServices._standaloneConfig.mepreferences = "https://" + arrE4allServer[1] + ":444/mepreferences";
                            }
                        }
                        resolve(isAuthenticated);
                    }).catch((error) => {
                        resolve(false);
                    });
                }
                else {
                    return resolve(false);
                }
            });
        }
        ;
        /**
         * Standalone: Get FAKE App info
         * @returns
         */
        _getAppInfoLocal() {
            return {
                addin: [],
                apps: [],
                brand: "",
                businessMethod: "",
                checksum: "",
                compatibility: [],
                error: "",
                favoriteOrder: 0,
                icon: "",
                id: "",
                isFamily: false,
                isFavorite: false,
                isolationLevel: 1,
                launchInfos: "",
                launchUrl: "",
                licenses: [],
                lma: false,
                lowerCaseTitle: "",
                platformId: DELTranslationPlatformServices._standaloneConfig.platformId || "OnPremise",
                platforms: [],
                quadrant: "south",
                remoteInfos: {},
                service: 0,
                serviceId: "",
                swymIntegration: "",
                tenantAware: true,
                thirdParty: false,
                title: "",
                tooltip: "",
                transition: false,
                trusted: false,
                type: "",
            };
        }
        ;
        /**
         * Standalone: Get FAKE Platform Info
         * @returns
         */
        _getPlatformInfoLocal() {
            return [{
                    "platformId": DELTranslationPlatformServices._standaloneConfig.platformId || "OnPremise",
                    "displayName": "name",
                    "3DSpace": DELTranslationPlatformServices._standaloneConfig.threeDSpace || "",
                    "mepreferences": DELTranslationPlatformServices._standaloneConfig.mepreferences || "",
                }];
        }
        ;
        /**
         * Get Application info
         * @returns Promise with App info or undefined
         */
        getApplicationInfo() {
            return new Promise(async (resolve, reject) => {
                if (DELTranslationPlatformServices._standaloneConfig.localFlag) {
                    resolve(this._getAppInfoLocal());
                }
                else {
                    let appId = "";
                    if (typeof widget !== 'undefined' && typeof widget.getValue !== 'undefined') {
                        appId = widget.getValue('x3dAppId') ? widget.getValue('x3dAppId') : widget.getValue('appId');
                    }
                    if (appId === "") {
                        reject(); // TO DO Error message
                    }
                    else {
                        i3DXCompassPlatformServices.getAppInfo({
                            appId: appId,
                            onComplete: (appInfo) => {
                                resolve(appInfo);
                            }
                        });
                    }
                }
            });
        }
        ;
        /**
         * Get Platform Information
         * @returns DS.i3DXCompassPlatformServices.PlatformServices | undefined
        */
        getPlatformInfo() {
            return new Promise(async (resolve, reject) => {
                if (DELTranslationPlatformServices._standaloneConfig.localFlag) {
                    resolve(this._getPlatformInfoLocal());
                }
                else {
                    i3DXCompassPlatformServices.getPlatformServices({
                        onComplete: (iPlateformData) => {
                            let arrPlatformInfo;
                            if (typeof iPlateformData !== 'undefined') {
                                if (Array.isArray(iPlateformData) && iPlateformData.length > 0) {
                                    arrPlatformInfo = iPlateformData;
                                }
                                else if (!Array.isArray(iPlateformData)) { // array check for compiler
                                    arrPlatformInfo = [iPlateformData];
                                }
                            }
                            if (arrPlatformInfo) {
                                resolve(arrPlatformInfo);
                            }
                            else {
                                reject(); // TO DO error message
                            }
                        },
                        onFailure: () => {
                            reject(); // TO DO error message
                        }
                    });
                }
            });
        }
        ;
        /**
         * Get Platform Id
         * @returns string - Platform id
         */
        getPlatformId() {
            let oPlatFormId = "OnPremise";
            if (DELTranslationPlatformServices._standaloneConfig.initFlag && DELTranslationPlatformServices._standaloneConfig.platformId) {
                oPlatFormId = DELTranslationPlatformServices._standaloneConfig.platformId;
            }
            else {
                if (typeof widget !== 'undefined' && typeof widget.getValue !== 'undefined') {
                    oPlatFormId = widget.getValue("x3dPlatformId");
                }
            }
            return oPlatFormId;
        }
        ;
        /**
         * Get 3D Space URL
         * @param plateforminfo - DS.i3DXCompassPlatformServices.PlatformServices
         * @returns string - URL if found, empty if not
         */
        get3DSpaceURL(iPlateformInfo) {
            let oURL = "";
            if (!iPlateformInfo || !Object.prototype.hasOwnProperty.call(iPlateformInfo, '3DSpace'))
                return oURL;
            oURL = iPlateformInfo['3DSpace'];
            return oURL;
        }
        /**
         * Get Security Context infos
         * @param iUrl - 3D Space Url
         * @param iTenant - Sandbox tenant or OnPremise
         * @returns UserCollabSpaceResponse | undefined
         */
        getSecurityContextInfo(iUrlSpace, iTenant) {
            return new Promise((resolve, reject) => {
                if (iUrlSpace === null || iTenant === "") {
                    reject([]);
                }
                else {
                    let pathWS = iUrlSpace + '/resources/modeler/pno/person?current=true';
                    pathWS += '&select=preferredcredentials&select=collabspaces';
                    pathWS += '&tenant=' + iTenant;
                    WAFData.authenticatedRequest(pathWS, {
                        method: 'GET',
                        type: 'json',
                        onComplete: (userCollabSpace) => {
                            resolve(userCollabSpace);
                        },
                        onFailure: (error) => {
                            reject();
                        }
                    });
                }
            });
        }
        /**
         * Get Security Context from Collab Space info
         * @param iUserCS - UserCollabSpaceResponse
         * @returns
         */
        getSecurityContext(iUserCS) {
            let oSecurityCtx = "";
            if (iUserCS && iUserCS.preferredcredentials) {
                const { collabspace, organization, role } = iUserCS.preferredcredentials;
                if (collabspace && collabspace.name !== "" && organization && organization.name !== "" && role && role.name !== "") {
                    oSecurityCtx = role.name + "." + organization.name + "." + collabspace.name;
                }
            }
            return oSecurityCtx;
        }
        ;
        /**
         * Get Me Preferences URL
         * @param plateforminfo - DS.i3DXCompassPlatformServices.PlatformServices
         * @returns string - URL if found, empty if not
         */
        getMePreferencesURL(iPlateformInfo) {
            let oURL = "";
            if (!iPlateformInfo || !Object.prototype.hasOwnProperty.call(iPlateformInfo, 'mepreferences'))
                return oURL;
            oURL = iPlateformInfo['mepreferences'];
            return oURL;
        }
    }
    DELTranslationPlatformServices._standaloneConfig = { initFlag: false, localFlag: false };
    exports.default = DELTranslationPlatformServices;
});
