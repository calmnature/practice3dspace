define("DS/MePreferencesClientUtilities/MePreferencesWriter", [
    'DS/UWPClientCode/BetaOptions',
    'DS/UWPClientCode/I18n',
    'DS/MePreferencesClientUtilities/MePreferencesPlatformServicesUtils'

],
    function (
        BetaOptions, I18n, MePreferencesPlatformServicesUtils) {
        "use strict";
        var MePreferencesWriterObj = function (mePrefBetaOptionsTab, mePreferencesLangObj) {
            this._mePrefBetaOptionObj = mePrefBetaOptionsTab;
            this._mePrefLangObj = mePreferencesLangObj;
        };

        var WRITE_PREFERENCE_ENDPOINT = "/api/v1/preferences";
        var RESET_ENDPOINT = "/api/v1/preferences";
        var RESET_KEY = "deleteAll";

        MePreferencesWriterObj.prototype.save = async function (serviceurl, requestJson, encryptedKey) {
            try {
                const isStandalonePreference = ("repositories" in requestJson);
                let needRefresh = false;

                if (isStandalonePreference) {
                    await writepreferences(requestJson, serviceurl, encryptedKey);
                    return needRefresh;                 // false
                }

                if (requestJson.getNumberOfVisibleDescendants() > 0) {
                    const { reqBody, needRefresh: refreshFlag } = await prepareRequestBody(requestJson);
                    if (reqBody) {
                        await writepreferences(reqBody, serviceurl, encryptedKey);
                        needRefresh = refreshFlag;
                    }
                }


                return needRefresh;
            } catch (error) {
                console.error("Error saving preferences", error);
                return false;
            }
        };

        MePreferencesWriterObj.prototype.saveBetaOptions = function () {
            var optionToggleValMap = this._mePrefBetaOptionObj.getBetaOptionToogleMap();
            if (optionToggleValMap != null && Object.entries(optionToggleValMap).length > 0) {
                for (var [funId, val] of Object.entries(optionToggleValMap)) {
                    BetaOptions.setBetaOptionsValues(funId, val.checkState);
                }
            }
        };

        MePreferencesWriterObj.prototype.saveLanguage = async function () {

            //Get the current language
            var currentLanguage = this._mePrefLangObj.getCurrentLanguage();

            //Get Selected language
            var languageSelectedValue = this._mePrefLangObj.getSelectedLanguage();

            //If language settings are changed then update cookies and reload the browser tab
            if (currentLanguage != languageSelectedValue) {

                //Set MyProfile Language
                await MePreferencesPlatformServicesUtils.setMyProfileLang(languageSelectedValue);
                //Set cookies
                I18n.setCurrentLanguage(languageSelectedValue);
                return true;
            }

            return false;

        };

        MePreferencesWriterObj.prototype.resetPreferences = async function (currentlySelectedNodesData, serviceUrl) {
            if (serviceUrl) {
                if (currentlySelectedNodesData) {
                    // const isAppIDPresent = Array.from(currentlySelectedNodesData).some(nodeKey => {
                    //     const [appId, repoName, prefName] = nodeKey.split('-');
                    //     return appId === currentlySelectedAppID;
                    // });

                    let resetRequestBody = null;
                    let completeURL = serviceUrl + RESET_ENDPOINT + "?";

                    // Check if deleteAll is true
                    const deleteAll = Array.from(currentlySelectedNodesData).some(nodeKey => nodeKey === 'deleteAll=true');
                    if (deleteAll) {
                        resetRequestBody = { "repositories": [] };
                        completeURL = addDeleteAllFlag(completeURL, true);
                    } else {
                        resetRequestBody = prepareResetRequestBody(currentlySelectedNodesData);
                        completeURL = addDeleteAllFlag(completeURL, false);
                    }

                    let options = {
                        headersInfo: {
                            'Content-Type': 'application/json'
                        }
                    };

                    try {
                        let response = await MePreferencesPlatformServicesUtils.callRestAPI(resetRequestBody, completeURL, 'DELETE', options);

                        // Check the response status
                        if (response && response[1].status === 200) {
                            console.log("Preferences reset successfully.");
                            // Additional success handling can be added here

                            // If the appID is present, refresh the page
                            // if (isAppIDPresent) {
                            //     // window.location.reload();
                            // }
                        } else {
                            console.error("Failed to reset preferences. Response status:", response ? response.status : "No response");
                            // Additional error handling can be added here
                        }

                        return response;
                    } catch (errorInfo) {
                        console.error("Error fetching user modified preferences:", errorInfo);
                        return null;
                    }
                }
            }
        };

        function addDeleteAllFlag(url, value) {
            var completeUrl = url + RESET_KEY + "=" + value;
            return completeUrl;
        }

        function prepareResetRequestBody(currentlySelectedNodesData) {
            const requestBody = {
                repositories: []
            };

            const repoMap = new Map();

            currentlySelectedNodesData.forEach(nodeKey => {
                const [appId, repoName, prefName] = nodeKey.split('-');
                if (!repoMap.has(repoName)) {
                    repoMap.set(repoName, new Set());
                }
                repoMap.get(repoName).add(prefName);
            });

            repoMap.forEach((preferenceNames, repoName) => {
                requestBody.repositories.push({
                    name: repoName,
                    preferenceNames: Array.from(preferenceNames)
                });
            });

            console.log("Prepared reset request body:", requestBody);
            return requestBody;
        }

        function getValueFromNLS(key, nls) {
            var nlsVal = "to be overloaded from NLS";

            if (nls && nls[key] != undefined)
                nlsVal = nls[key];

            return nlsVal;
        }

        async function writepreferences(requestBody, serviceurl, encryptedKey) {
            var completeURL = "";

            completeURL = serviceurl + WRITE_PREFERENCE_ENDPOINT;

            let headersInfo = {
                'x-request-id': ''
            };

            headersInfo["Content-Type"] = "application/json";
            headersInfo["x-request-id"] = encryptedKey;

            let options = {
                headersInfo: headersInfo
            };

            MePreferencesPlatformServicesUtils.callRestAPI(requestBody, completeURL, 'PUT', options).then((data) => {
                return true;
            }).catch((errorInfo) => {
                return null;
            });
        }

        async function prepareRequestBody(selectionModel) {
            let userRepositories = [];
            let needRefresh = false;

            await new Promise((resolve, reject) => {
                selectionModel.processDescendants({
                    processNode: async function (nodeInfos) {
                        if (nodeInfos && nodeInfos.nodeModel) {

                            let prefObject = {};
                            prefObject["name"] = nodeInfos.nodeModel
                                .getAttributeValue("label")
                                .split(".")[1];
                            var repoName = nodeInfos.nodeModel
                                .getAttributeValue("label")
                                .split(".")[0];

                            if (nodeInfos.nodeModel.getAttributeValue("value") != undefined) {
                                prefObject["value"] = nodeInfos.nodeModel
                                    .getAttributeValue("value")
                                    .toString();
                            }

                            if (nodeInfos.nodeModel.getAttributeValue("needRefresh") != undefined) {
                                prefObject["needRefresh"] = nodeInfos.nodeModel
                                    .getAttributeValue("needRefresh");
                                needRefresh = true;
                            }

                            let repository = userRepositories.find(
                                (repo) => repo.name === repoName
                            );

                            if (!repository) {
                                repository = {
                                    name: repoName,
                                    preferences: [],
                                };
                                userRepositories.push(repository);
                            }

                            repository.preferences.push(prefObject);
                        }
                    },
                    treeTraversalOrder: "postOrder",
                });
                resolve();
            });

            let userRequestBody;

            if (userRepositories) {
                userRequestBody = {
                    repositories: userRepositories,
                };
            } else {

                userRequestBody = null;
            }

            return { reqBody: userRequestBody, needRefresh };
        }

        return MePreferencesWriterObj;
    });
