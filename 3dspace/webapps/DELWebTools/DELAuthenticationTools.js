/// <amd-module name="DS/DELWebTools/DELAuthenticationTools"/>
define("DS/DELWebTools/DELAuthenticationTools", ["require", "exports", "DS/DELPXPFoundations/PXPPassport", "DS/Logger/Logger", "DS/DELPXPFoundations/PXPRegistry"], function (require, exports, PXPPassport_1, Logger, PXPRegistry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requestAuthentication = requestAuthentication;
    var _logger = Logger.getLogger('PXP.SYS');
    async function requestAuthentication() {
        let currentUrlParams;
        return new Promise(async (resolve, reject) => {
            var _a, _b;
            const oAuthInfo = {};
            if (widget === undefined || (widget.id && typeof widget.id === "string") || widget.getUrl === undefined)
                reject(new Error('Authentication - Widget object is undefined'));
            // URL Parameters
            if (widget.getUrl) {
                const currentUrl = widget.getUrl();
                if (typeof currentUrl === 'string') {
                    try {
                        let url = new URL(currentUrl);
                        currentUrlParams = url.searchParams;
                    }
                    catch (error) {
                        reject(new Error('Authentication - Widget URL is invalid ! (' + error + ')'));
                    }
                }
            }
            // Tenant
            oAuthInfo.tenant = (_a = currentUrlParams === null || currentUrlParams === void 0 ? void 0 : currentUrlParams.get('tenant')) !== null && _a !== void 0 ? _a : 'OnPremise';
            // Registry
            let registryUrl = (_b = currentUrlParams === null || currentUrlParams === void 0 ? void 0 : currentUrlParams.get('registry')) !== null && _b !== void 0 ? _b : currentUrlParams === null || currentUrlParams === void 0 ? void 0 : currentUrlParams.get('cluster');
            if (registryUrl) {
                oAuthInfo.registryAPI = (0, PXPRegistry_1.createRegistryClient)(registryUrl);
            }
            // Passport: Url OR Registry
            const passport = currentUrlParams === null || currentUrlParams === void 0 ? void 0 : currentUrlParams.get('passport');
            if (passport) {
                try {
                    oAuthInfo.passportUrl = passport ? new URL(passport) : undefined;
                }
                catch (error) {
                    throw new Error('Authentication - Invalid Passport URL (' + passport + ' failed: ' + error + ')');
                }
            }
            resolve(oAuthInfo);
        }).then((authInfo) => {
            if (authInfo.passportUrl instanceof URL) {
                const passpportAPI = (0, PXPPassport_1.createPassportHTTP)(authInfo.passportUrl);
                // Check if already authenticated
                return passpportAPI.isAuthenticated().then((isAuthenticated) => {
                    if (!isAuthenticated) {
                        const user = currentUrlParams === null || currentUrlParams === void 0 ? void 0 : currentUrlParams.get('user');
                        const password = currentUrlParams === null || currentUrlParams === void 0 ? void 0 : currentUrlParams.get('password');
                        if (user && password) {
                            return passpportAPI.login(user, password).then(() => {
                                _logger.debug("Authentication - Login User '" + user + "'");
                                return true;
                            });
                        }
                        else {
                            // Redirect to 3DPassport Login...
                            window.location.href = authInfo.passportUrl + '/login?service=' + encodeURI(window.location.href);
                            return false;
                        }
                    }
                    else {
                        _logger.debug("Authentication - Already authenticated...");
                        return true;
                    }
                });
            }
            else {
                return false;
            }
        });
    }
});
