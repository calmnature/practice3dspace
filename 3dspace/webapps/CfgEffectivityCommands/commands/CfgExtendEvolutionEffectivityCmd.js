/**
 * @quickreview ABE70   25:12:10 IR-1477832 Adjust loading panel container styles so the progress bar appears in front of the UI
 * @quickreview ABE70   25:11:25 IR-1469879 | IR-1472000: Show warning message for each extend result (success, partial, error)
 * @quickreview ABE70   25:10:07 FUN156337 - added progression bar to see the progression of extend operation.
 * @quickreview H37     25:05:23 FUN159054
 * @quickreview KR5     25:03:19 IR-1373571 and TSK11967241 : Variant + Explicit CFG_Extend_Evolution_Not_Allowed_Evolution_criteria_not_active error message and getAvailableDomainDetails call for Effectivity based Extend scenario
 * @quickreview KR5     25:02:03 TSK11976182 : Variant + Explicit getMultipleConfigurationContextInfo unwanted parameter removal
 * @quickreview KR5     25:01:15 TSK11976181 : Variant + Explicit getMultipleConfigurationContextInfo version 1.2
 * @quickreview KR5     24:10:07 FUN147459 - added selectedInstancesInfoMap for PCS improvement.
 * @quickreview KR5     24:09:24 FUN147459 - Improve error message for the extend operation. Show Failure message in report.
 * DO NOT SAVE THIS file in VScode for formating. This changes to non-working code.
 */
define('DS/CfgEffectivityCommands/commands/CfgExtendEvolutionEffectivityCmd', [
    'DS/CfgBaseUX/scripts/CfgController',
    'DS/CfgTracker/CfgTracker',
    'DS/CfgTracker/CfgDimension',
    'DS/CfgTracker/CfgValue',
    'DS/CfgBaseUX/scripts/CfgUtility',
    'DS/CfgBaseUX/scripts/CfgData',
    'i18n!DS/CfgWebAppEffectivityUX/assets/nls/CfgEffectivityNLS',
    'DS/CfgEffectivityCommands/commands/CfgEffCmd',
    'DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext',
    'DS/CfgBaseUX/scripts/CfgReportPanel',
    'DS/ControlsEx/LoadingPanel',
    'DS/CfgBaseUX/scripts/CfgUXEnvVariables',
    'text!DS/CfgBaseUX/assets/CfgUXEnvVariables.json',
], function (CfgController, CfgTracker, CfgDimension, CfgValue, CfgUtility, CfgData, EffectivityNLS, CfgEffCmd, CfgAuthoringContext, CfgReportPanel, LoadingPanel, CfgUXEnvVariablesJS, CfgUXEnvVariables) {
    'use strict';
    var availableEvolutionList = [];
    let emptyEvolutionList = [];
    var CfgExtendEvolutionEffectivityCmd = CfgEffCmd.extend({
        _loadingPanel: null,
        selectedInstancesInfoMap: null,
        /**
         * Override base class CfgEffCmd function for selectedNodes.length >= 1 because Extend Effectivity functionality is supported for multuiple products
         */
        _checkSelection: function () {
            //-- Init the selection
            this._SelectedID = '';

            var data = this.getData();
            if (data.selectedNodes.length >= 1) {
                this._SelectedID = data.selectedNodes[0].id || '';
                this._SelectedAlias = data.selectedNodes[0].alias || '?';
                this.isRoot = data.selectedNodes[0].isRoot;
            }

            //-- State of the command
            this._setStateCmd();
        },

        /**
         * Used to get empty Evolution Effectivity check before Extend Evolution Effectivity operation. For PCS improvement lightweight _getAvailableDomainDetails is used.
         */
        _getAvailableDomainDetails: function (instanceList) {
            var returnedPromise = new Promise(function (resolve, reject) {
                var success = function (response) {
                    for (var key in response) {
                        if (response.hasOwnProperty(key)) {
                            if (response[key].length == 2 || (response[key].length == 1 && response[key].toString() == 'Evolution')) availableEvolutionList.push(key);
                            else if (response[key].length == 1 && response[key].toString() != 'Evolution') emptyEvolutionList.push(key);
                        }
                    }
                    resolve(response);
                };
                var failure = function (response) {
                    reject(response);
                };
                var inputjson = ' ';
                inputjson = {
                    version: '1.0',
                    pidList: instanceList,
                };

                var url = '/resources/modeler/configuration/expressionServices/getAvailableDomains';
                var inputjsonTxt = JSON.stringify(inputjson);

                CfgUtility.makeWSCall(url, 'POST', 'enovia', 'json', inputjsonTxt, success, failure, true);
            });
            return returnedPromise;
        },

        /**
         * Function used to send infromation to Tracker for Extend Evolution Effectivity operation.
         */
        sendExtendEvolutionTrackerEvent: function (options) {
            try {
                CfgTracker.createEventBuilder({
                    category: CfgTracker.Category['USAGE'],
                    action: CfgTracker.Events['CLICK'],
                    tenant: widget.getValue('x3dPlatformId'),
                })
                    .setLabel(CfgTracker.Labels['EXTEND_EVOLUTION_EFFECTIVITY'])
                    .setAppId(widget.data.appId || 'NO_APP_ID')
                    .addDimension(CfgDimension.EXTEND_EVOLUTION_EFFECTIVITY.EXTEND_EVOLUTION_EFFECTIVITY_WIDGET, widget.data.title || widget.options.title || 'ODT Environment')
                    .addDimension(CfgDimension.EXTEND_EVOLUTION_EFFECTIVITY.EXTEND_EVOLUTION_EFFECTIVITY_WORK_UNDER, options.authoringMode)
                    .addDimension(CfgDimension.EXTEND_EVOLUTION_EFFECTIVITY.EXTEND_EVOLUTION_EFFECTIVITY_OPERATION_STATUS, options.operationStatus)
                    .addDimension(CfgDimension.EXTEND_EVOLUTION_EFFECTIVITY.EXTEND_EVOLUTION_EFFECTIVITY_EXTEND_TYPE, options.extendType)
                    .addPersonalValue(CfgValue.EXTEND_EVOLUTION_EFFECTIVITY.EXTEND_EVOLUTION_EFFECTIVITY_SELECTED_REFERENCES, options.selectedNodesLength)
                    .addPersonalValue(CfgValue.EXTEND_EVOLUTION_EFFECTIVITY.EXTEND_EVOLUTION_EFFECTIVITY_AVAILABLE_EVOLUTION, options.availableEvolutionLength)
                    .send();
            } catch (e) {
                console.error(e);
            }
        },

        _postExtendResponse: function (response, wsOptions, instanceList, extendType) {
            var that = this;
            that.enable();

            if (response && response.globalStatus !== undefined) {
                let authoringMode = wsOptions.operationheader.key;
                let operationStatus = response.globalStatus;
                let selectedNodesLength = availableEvolutionList.length;
                let availableEvolutionLength = instanceList.length;

                let probesOptions = {
                    authoringMode: authoringMode,
                    operationStatus: operationStatus,
                    selectedNodesLength: selectedNodesLength,
                    availableEvolutionLength: availableEvolutionLength,
                    extendType: extendType
                };

                if (operationStatus !== 'ERROR') {
                    var refreshEventMessage = {
                        commandName: 'cfgExtendEvolutionEffectivity',
                        widgetId: widget.id,
                        response: response,
                        data: {}
                    };
                    CfgUtility.publishPostProcessingEventForApplications(refreshEventMessage);
                }

                if (operationStatus === 'SUCCESS') {
                    CfgUtility.showwarning(EffectivityNLS.CFG_Extend_Successful, 'success');
                } else if (operationStatus === 'ERROR') {
                    CfgUtility.showwarning(EffectivityNLS.CFG_Extend_Failure, 'error');
                } else if (operationStatus === 'ATLEAST_ONEFAILURE') {
                    CfgUtility.showwarning(EffectivityNLS.CFG_Extend_PartialSuccessful, 'info');
                }

                that.sendExtendEvolutionTrackerEvent(probesOptions);

                // Magic Cloud Probes
                let magicAppId = 'defaultAppID';
                let magicAppName = 'ODT Environment';
                let mProbesOptions = {
                    AppId: magicAppId,
                    AppName: magicAppName,
                    CommandName: CfgTracker.Labels['EXTEND_EVOLUTION_EFFECTIVITY'],
                    CommandOperation: 'Extend_Evolution_Effectivity_Operation',
                    ConfigMode: CfgTracker.ConfigMode['CONTEXTUAL'],
                    ApplicationMode: CfgTracker.ApplicationMode['DASHBOARD']
                };
                CfgUtility.sendConfgurationCommandsClickEventForMagicProbes(mProbesOptions);
            }
        },


         // Show the progress bar
        _showLoadingPanel: function (panel, message) {
            if (!panel) return;
            panel.info = message;
            panel.value = 0;
            panel.on();
            try {
                if (panel.elements && panel.elements.container) {
                    panel.elements.container.style.display = 'block';
                    panel.elements.container.style.position = 'fixed';
                    panel.elements.container.style.top = '0'; 
                    panel.elements.container.style.left = '50%';
                    panel.elements.container.style.transform = 'translateX(-50%)';
                    panel.elements.container.style.zIndex = '9999';
                    panel.elements.container.style.background = '';
                }
            } catch (error) {
                console.error('LoadingPanel style error', error);
            }
        },

        // Finish the progress bar (set to 100% and hide it)
        _finishLoadingPanel: function (panel) {
            if (!panel) return;
            panel.value = 100;
            panel.off();
        },

        // Hide the progress bar in case of error or cancel
        _failLoadingPanel: function (panel) {
            if (!panel) return;
            panel.off();
        },

        // Decide the batch size depending on total items
        _getBatchSize: function (total) {
            if (total <= 10)   return 1;
            if (total <= 30)   return 10;
            if (total <= 80)   return 20;
            if (total <= 150)  return 30;
            if (total <= 500)  return 50;
            return 100;
        },

        // Make sure the value is always an array
        _asArray: function(value) {
            return Array.isArray(value) ? value : [];
        },

        // Update progress bar with current percentage and info
        _updateProgress: function (panel, processed, total, message) {
            if (!panel) return;
            panel.value = Math.min(99, Math.floor((processed / total) * 100));
            panel.info  = `${message} (${processed}/${total})`;
        },

        // Run operations in batches with progress updates
        _processInBatches: async function (items, batchSize, callExtend, panel, message) {
            var that = this;
            const list = that._asArray(items);
            const size = Math.max(1, batchSize | 0);
            const totalItems = list.length;

            let processedCount = 0;
            const allResponses = [];

            for (let counter = 0; counter < totalItems; counter += size) {
                const batch = list.slice(counter, counter + size);
                try {
                    allResponses.push(await callExtend(batch));
                } catch (error) {
                    allResponses.push({ globalStatus: 'ERROR', error: error });
                }
                processedCount += batch.length;
                that._updateProgress(panel, processedCount, totalItems, message);
            }

            let hasSuccess = false;
            let hasPartial = false;
            let hasError = false;

            allResponses.forEach(function (resp) {
                if (!resp || !resp.globalStatus) return;

                if (resp.globalStatus === 'SUCCESS') {
                    hasSuccess = true;
                } else if (resp.globalStatus === 'ATLEAST_ONEFAILURE') {
                    hasPartial = true;
                } else if (resp.globalStatus === 'ERROR') {
                    hasError = true;
                }
            });

            let globalStatus;
            if (hasError && (hasSuccess || hasPartial)) {
                globalStatus = 'ATLEAST_ONEFAILURE';
            } else if (hasError) {
                globalStatus = 'ERROR';
            } else if (hasPartial) {
                globalStatus = 'ATLEAST_ONEFAILURE';
            } else {
                globalStatus = 'SUCCESS';
            }

            let mergedResources = [];
            allResponses.forEach(function (resp) {
                if (resp && Array.isArray(resp.resources)) {
                    mergedResources = mergedResources.concat(resp.resources);
                }
            });

            return {
                version: '1.0',
                globalStatus: globalStatus,
                resources: mergedResources
            };
        },


        /**
         * Used to perform Extend Evolution Effectivity operation.
         */
        _processExtendEffectivityOperation: function (options) {
            var that = this;
            this.cfgUXEnvVariables = CfgUXEnvVariablesJS.getCfgUXEnvVariables();

            // Check if progress bar is enabled from configuration
            var cfgExtendProgressBarEnabled =
                (this.cfgUXEnvVariables && this.cfgUXEnvVariables.cfgExtendProgressBarEnabled === true);

            var data = options.data;
            var authHeaders = options.authHeaders;

            that.selectedInstancesInfoMap = new Map();

            // Create loading panel if progress bar is enabled and not already created
            if (cfgExtendProgressBarEnabled && !that._loadingPanel) {
                that._loadingPanel = new LoadingPanel({
                    value: 0, shape: 'linear', modalFlag: true, width: '300px', showButtonsFlag: false
                }).inject(widget.body || document.body);
            }

             //Called after tennant and security context details are fetched.
            var getExtendEvolutionEffectivity_callback = function () {
                var instanceList = [];
                // Collect all unique instances from selected nodes
                for (var i = 0; i < data.selectedNodes.length; i++) {
                    //[IR-1145388 02-Aug-2023] added unique instances as instanceList length check fails with availableEvolutionList length for duplidate instnaces.
                    let instanceId = data.selectedNodes[i].id;
                    if (instanceList.indexOf(instanceId) === -1) {
                        instanceList.push(instanceId);
                        that.selectedInstancesInfoMap.set(instanceId, {
                            alias: data.selectedNodes[i].alias,
                            revision: data.selectedNodes[i].revision
                        });
                    }
                }

                // Prepare headers for web service call
                var wsOptions = {
                    operationheader: {
                        key: authHeaders[0].key,
                        value: authHeaders[0].value,
                    },
                };

                //Evolution criteria enabled check is performed in method getMultipleConfigurationContextInfo for parent of all selected instances.
                let uniqueParentIDs = [];
                for (let count = 0; count < data.selectedNodes.length; count++) {
                    let parentId = data.selectedNodes[count].parentID;
                    if (uniqueParentIDs.indexOf(parentId) === -1) uniqueParentIDs.push(parentId);
                }

                //[TSK10220343 23-Oct-2023] Passed multiple unique parent ids of selected products.
                let options = { referenceIds: uniqueParentIDs };
                CfgUtility.getMultipleConfigurationContextInfo(options).then(
                    async function (criteriaResponse) {
                        let extendType = 'Model';

                        // Case 1: response contains xRevision content
                        if (criteriaResponse.xRevisionContent && criteriaResponse.xRevisionContent.length > 0) {
                            extendType = 'xRevision';
                            availableEvolutionList = [];
                            emptyEvolutionList = [];
                            //[IR-1373571 17-Mar-2025] Need to check Evolution Domain to show Empty Evolution error message.
                            await that._getAvailableDomainDetails(instanceList);

                            // Case 2: response contains reference info (not xRevision)
                        } else if (criteriaResponse.referencesInfo !== undefined) {
                            //Copy Evolution Effectivity operation not allowed as parent reference attached with Model Version as Configuration Context
                            if (criteriaResponse.referencesInfo.length > 0 &&
                                criteriaResponse.referencesInfo[0].revisionMode === 'Explicit' &&
                                criteriaResponse.referencesInfo[0].hasConfigContext === 'YES') {
                                CfgUtility.showwarning(EffectivityNLS.CFG_Extend_Evolution_Not_Allowed_Evolution_criteria_not_active, 'error');
                                extendType = 'ModelVersion';
                                that._failLoadingPanel(that._loadingPanel);
                                that.enable();
                                return;
                            }

                            for (let counter = 0; counter < criteriaResponse.referencesInfo.length; counter++) {
                                if (criteriaResponse.referencesInfo[counter] &&
                                    criteriaResponse.referencesInfo[counter].hasConfigContext === 'NO') {
                                        //error message for context not attached to parent reference.
                                        CfgUtility.showNotifs('error',
                                        EffectivityNLS.CFG_Extend_Failure_Header,
                                        EffectivityNLS.CFG_Extend_No_Context_SubTitle,
                                        EffectivityNLS.CFG_Extend_No_Context_Message);
                                    that._failLoadingPanel(that._loadingPanel);
                                    that.enable();
                                    return;
                                }
                            }

                            let extendCriteria = [];
                            if (criteriaResponse.enabledCriteria && criteriaResponse.enabledCriteria.length > 0) {
                                for (let counter = 0; counter < criteriaResponse.enabledCriteria.length; counter++) {
                                    if (criteriaResponse.enabledCriteria[counter].criteriaName !== 'feature') {
                                        extendCriteria.push(criteriaResponse.enabledCriteria[counter].criteriaName);
                                    }
                                }
                            }

                            CfgData.extendEvolutionCriteria = extendCriteria;

                            if (CfgData.extendEvolutionCriteria && CfgData.extendEvolutionCriteria.length > 0) {
                                availableEvolutionList = [];
                                emptyEvolutionList = [];
                                // For PCS improvement lightweight _getAvailableDomainDetails is used to check Evolution Effectivity is present or not.
                                await that._getAvailableDomainDetails(instanceList);
                            } else {
                                //error message for No Evolution criteria selected.
                                CfgUtility.showwarning(EffectivityNLS.CFG_Extend_No_Criteria, 'error');
                                that._failLoadingPanel(that._loadingPanel);
                                that.enable();
                            }
                        }

                        //All products should have Evolution Effectivity then only passed for Extend operation.
                        if (availableEvolutionList.length === instanceList.length) {
                            that._showLoadingPanel(that._loadingPanel, EffectivityNLS.CFG_Extend_In_Progress);

                            const url = '/resources/modeler/configuration/authoringServices/extendEffectivities';

                            //IR-1469879 | IR-1472000 : Show warning message for each extend result (success, partial, error)
                            if (cfgExtendProgressBarEnabled) {
                                // Execute extend operation in batches with progress updates
                                const total = instanceList.length;
                                const batchSize = that._getBatchSize(total);

                                function callExtend(batch) {
                                    return new Promise((resolve, reject) => {
                                        const postdata = JSON.stringify({ version: '1.0', resources: batch });
                                        const failure = (jsonresponse1, error) => reject(error || jsonresponse1);
                                        const onComplete = (resp) => resolve(resp);
                                        CfgUtility.makeWSCall(url, 'POST', 'enovia', 'application/json',
                                            postdata, onComplete, failure, true, wsOptions);
                                    });
                                }
                                that._processInBatches(instanceList, batchSize, callExtend, that._loadingPanel, EffectivityNLS.CFG_Extend_In_Progress)
                                    .then(function (response) {
                                        that._finishLoadingPanel(that._loadingPanel);
                                        that._postExtendResponse(response, wsOptions, instanceList, extendType);
                                    })
                                    .catch(function (error) {
                                        that._failLoadingPanel(that._loadingPanel);
                                        that.enable();

                                        if (error && error.errorMessage) {
                                            CfgUtility.showwarning(error.errorMessage, 'error');
                                        } else {
                                            CfgUtility.showwarning(EffectivityNLS.CFG_Service_Fail, 'error');
                                        }
                                    });
                            } else {
                                var returnedPromiseEff = new Promise(function (resolve, reject) {
                                    let jsonData = {
                                        version: '1.0',
                                        resources: instanceList,
                                    };

                                    let url = '/resources/modeler/configuration/authoringServices/extendEffectivities';
                                    let postdata = JSON.stringify(jsonData);

                                    let failure = function (jsonresponse1, error) {
                                        var jsonresponse = error ? error : jsonresponse1;
                                        reject(jsonresponse);
                                    };

                                    let onCompleteCallBack = function (extendEffectivitiesResponse) {
                                        resolve(extendEffectivitiesResponse);
                                    };

                                    CfgUtility.makeWSCall(url, 'POST', 'enovia', 'application/json',
                                        postdata, onCompleteCallBack, failure, true, wsOptions);
                                });

                                //After Extend Evolution Effectiviy operation, Effectivity modification event is published to refresh update Effectivity column values.
                                returnedPromiseEff.then(
                                    function (response) {
                                        that._postExtendResponse(response, wsOptions, instanceList, extendType);
                                    },
                                    function (errorResponse) {
                                        if (errorResponse && errorResponse.errorMessage) {
                                            CfgUtility.showwarning(errorResponse.errorMessage, 'error');
                                        }
                                        that.enable();
                                    }
                                );
                            }
                            // Otherwise, show error for missing evolution effectivity
                        } else {
                            //[FUN147459 24-Sep-2024] Show failure message in summary report panel
                            if (emptyEvolutionList.length > 0) {
                                let emptyInstanceDetails = [];
                                for (let counter = 0; counter < emptyEvolutionList.length; counter++) {
                                    let instanceId = emptyEvolutionList[counter];
                                    emptyInstanceDetails.push(
                                        EffectivityNLS.CFG_Extend_Summary_Report_Message
                                            .replace('{1}', that.selectedInstancesInfoMap.get(instanceId).alias)
                                            .replace('{2}', that.selectedInstancesInfoMap.get(instanceId).revision)
                                    );
                                }

                                if (emptyInstanceDetails.length > 0) {
                                    emptyInstanceDetails.sort();
                                    //show empty evolution list in report.
                                    that.reportPanel = new CfgReportPanel({
                                        title: EffectivityNLS.CFG_Extend_Summary_Report_Title,
                                        success: [],
                                        failure: emptyInstanceDetails,
                                        neutral: [],
                                        aborted: [],
                                    });
                                }
                            }
                            //error message for empty Evolution Effectivity is shown.
                            CfgUtility.showNotifs('error',
                                EffectivityNLS.CFG_Extend_Failure_Header,
                                EffectivityNLS.CFG_Extend_No_Evolution_SubTitle,
                                EffectivityNLS.CFG_Extend_No_Evolution_Message);
                            that._failLoadingPanel(that._loadingPanel);
                            that.enable();
                        }
                    },
                    function () {
                        // Handle service call failure
                        that._failLoadingPanel(that._loadingPanel);
                        that.enable();
                        CfgUtility.showwarning(EffectivityNLS.CFG_Service_Fail, 'error');
                    }
                );
            };

            CfgController.init();

            if (widget.getValue('x3dPlatformId'))
                enoviaServerFilterWidget.tenant = widget.getValue('x3dPlatformId');
            else
                enoviaServerFilterWidget.tenant = 'OnPremise';

            CfgUtility.populate3DSpaceURL().then(function () {
                CfgUtility.populateSecurityContext().then(function () {
                    getExtendEvolutionEffectivity_callback();
                });
            });
        },
        /*
         * Don't overload it. Method execute is called when user clicks Extend Evolution Effectivity command
         */
        execute: function () {
            var that = this;
            that.disable();

            if (!this.isConfigAuthorized()) return; //FUN159054
            //User selection for Extend Evolution Effectivity operation.
            var data = that.getData();

            //For valid single / multiple child selection Extend Evolution Effectivity operation is supported.
            if (data.selectedNodes && data.selectedNodes.length > 0) {
                //Check work under authoring context details for Extend Evolution Effectivity operation.
                var authHeaders = [];
                var cfg = CfgAuthoringContext.get();
                if (cfg && cfg.AuthoringContextHeader) {
                    for (var key in cfg.AuthoringContextHeader) {
                        authHeaders.push({
                            key: key,
                            value: cfg.AuthoringContextHeader[key],
                        });
                    }
                }

                if (authHeaders.length == 0) {
                    that.enable();
                    CfgUtility.showwarning(EffectivityNLS.CFG_Extend_With_Session_Allowed, 'error');
                    return;
                }

                var options = { data: data, authHeaders: authHeaders };
                that._processExtendEffectivityOperation(options);
            }
        },
    });

    return CfgExtendEvolutionEffectivityCmd;
});
