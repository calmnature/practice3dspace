define("DS/MePreferencesUIBuilder/MePreferencesResetDialog", [
  'DS/MePreferencesUIElements/MePreferencesCategoryView',
  "DS/TreeModel/TreeDocument",
  "DS/TreeModel/TreeNodeModel",
  "DS/DataGridView/DataGridView",
  "DS/Windows/ImmersiveFrame",
  "DS/Windows/Dialog",
  "DS/Controls/Button",
  'DS/UWPClientCode/I18n',
  "DS/MePreferencesClientUtilities/MePreferencesPlatformServicesUtils",
  'DS/MePreferencesUIElements/MePreferencesPageView',
  'DS/MePreferencesUIElements/MePreferencesPageModelDataProvider',
  'DS/MePreferencesClientCacheMgr/MePreferencesClientCacheHelper',
  "i18n!DS/MePreferencesUIElements/assets/nls/translation",
  "DS/MePreferencesClientUtilities/MePreferencesWriter",
  "DS/MePreferencesUIElements/MePreferencesCustomView",
  "DS/Utilities/Dom"
], function (
  MePreferencesCategoryView, TreeDocument, TreeNodeModel, DataGridView, WUXImmersiveFrame, WUXDialog, WUXButton, I18n, MePreferencesPlatformServicesUtils,
  MePreferencesPageView, MePreferencesPageModelDataProvider, MePreferencesClientCacheHelper, mePrefTranslation, MePreferencesWriter, MePreferencesCustomView, Dom) {
  "use strict";

  //var mePreferencesCategoryView = new MePreferencesCategoryView();
  var model = null;
  var selectedNodesData = [];
  var currentlySelectedNodesData = new Set();

  var pageViewObj = new MePreferencesPageView();
  var mePreferencesClientCacheHelperObj = new MePreferencesClientCacheHelper();
  var mePreferencesPageModelDataProviderObj = new MePreferencesPageModelDataProvider();
  var mePreferencesCategoryView = new MePreferencesCategoryView();
  var mePreferencesCustomViewObj = new MePreferencesCustomView();


  var tenantId = null;

  var READ_PREFERENCE_ENDPOINT = "/api/v1/preferences";
  var RETRIEVE_ONLY_USERPREF_KEY = "userModified";
  var AUTHORIZATION = "authUser";
  var GET_APPLIST_ENDPOINT = "/api/v1/preferences_panel/apps";
  var PAGEMODEL_ENDPOINT = "/api/v1/preferences_panel/page_model";
  var ENUM__DATA_ENDPOINT = "/api/v1/preferences_metadata/enum_metadata";

  var serviceUrl = null;
  const enumMetadataCache = new Map();

  var prefsCurrentValDefValMap = new Map();
  var appPreferencesMap = new Map();
  var appIdToTitleMap = mePreferencesCategoryView.getAppIdToNodeObjMap();

  var MePreferencesResetDialogObj = function () {
  };

  MePreferencesResetDialogObj.prototype.showResetDialog = function (appPreferencesMap, serviceUrl) {

    let selChildrenParents = true;
    model = new TreeDocument({
      shouldSelectDescendants: function (nodeModel) {
        return selChildrenParents;
      },
      shouldUnselectDescendants: function (nodeModel) {
        return selChildrenParents;
      },
      shouldSelectParents: function (nodeModel) {
        return selChildrenParents;
      },
      shouldUnselectParents: function (nodeModel) {
        return selChildrenParents;
      }
    });

    let columns = [
      {
        text: getValueFromNLS("ResetPreferences.Title", mePrefTranslation),
        dataIndex: "tree",
        typeRepresentation: "textBlock",
        autoRowHeightFlag: true,
        alignment: "near",
        width: "60%",
        sortableFlag: false
      },
      {
        text: getValueFromNLS("ResetPreferencesCurrentValue.Title", mePrefTranslation),
        dataIndex: "currentValue",
        getCellTypeRepresentation: function (cellInfos) {
          return cellInfos.nodeModel ? cellInfos.nodeModel.getAttributeValue("typeRepresentation") : "string";
        },
        getCellSemantics: function (cellInfos) {
          const nodeModel = cellInfos.nodeModel;
          if (nodeModel) {
            const grid = nodeModel._options.grid;
            if (grid.currentValueIcon) {
              return {
                icon: grid.currentValueIcon,
                label: grid.currentValue
              };
            }
            if (grid.linkIcon) {
              return {
                icon: grid.linkIcon
              }
            }
          }
          return {};
        },
        getCellEditableState: function (cellInfos) {

          const nodeModel = cellInfos.nodeModel;
          if (nodeModel) {
            const grid = nodeModel._options.grid;
            if (grid.linkIcon)
              return true;

          }
        },
        alignment: "near",
        width: "20%"
      },
      {
        text: getValueFromNLS("ResetPreferencesDefaultValue.Title", mePrefTranslation),
        dataIndex: "defaultValue",
        getCellTypeRepresentation: function (cellInfos) {
          return cellInfos.nodeModel ? cellInfos.nodeModel.getAttributeValue("typeRepresentation") : "string";
        },
        getCellSemantics: function (cellInfos) {
          const nodeModel = cellInfos.nodeModel;
          if (nodeModel) {
            const grid = nodeModel._options.grid;
            if (grid.currentValueIcon) {
              return {
                icon: grid.currentValueIcon,
                label: grid.currentValue
              };
            }
            if (grid.linkIcon) {
              return {
                icon: grid.linkIcon
              }
            }
          }
          return {};
        },
        getCellEditableState: function (cellInfos) {

          const nodeModel = cellInfos.nodeModel;
          if (nodeModel) {
            const grid = nodeModel._options.grid;
            if (grid.linkIcon)
              return true;

          }
        },
        alignment: "near",
        width: "20%"
      }
    ];

    model.prepareUpdate();


    // Create DataGridView
    let resetDataGridView = new DataGridView({
      identifier: "ResetDataGridView",
      columns: columns,
      treeDocument: model,
      showRowIndexFlag: false,
      selectionBehavior: {
        showMixedStateOnParents: true
      },
      defaultColumnDef: {
        editableFlag: false
      }
    });

    var appPreferencesArray = Array.from(appPreferencesMap.entries());

    appPreferencesArray.sort(([appIDA, preferencesObjA], [appIDB, preferencesObjB]) => {
      const aPriority = appIDA.includes("3DSCommon") ? 1 : appIDA.includes("3DSApp") || appIDA.includes("3DSApps") ? 2 : 3;
      const bPriority = appIDB.includes("3DSCommon") ? 1 : appIDB.includes("3DSApp") || appIDB.includes("3DSApps") ? 2 : 3;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      } else {
        if (appIDA === "3DSCommon.Measure") {
          return 1;
        } else if (appIDB === "3DSCommon.Measure") {
          return -1;
        } else if (aPriority === 2) { // For 3DSApps and 3DSApp nodes
          return preferencesObjA.sortName.localeCompare(preferencesObjB.sortName);
        } else {
          return appIDA.localeCompare(appIDB);
        }
      }
    });

    appPreferencesMap = new Map(appPreferencesArray);
    appPreferencesMap.forEach((preferencesObj, appID) => {

      var appInfo = appIdToTitleMap[appID];
      if (!appInfo) {

        const concatenatedAppID = Object.keys(appIdToTitleMap).find(key => key.includes(appID));
        if (concatenatedAppID) {
          appInfo = appIdToTitleMap[concatenatedAppID];
        }
      }
      if (!appInfo) {
        return;

      }
      let appTitle = appInfo.title;

      let appNode = new TreeNodeModel({
        label: appTitle,
        grid: {
          preference: appTitle,
          defaultValue: "",
          currentValue: ""
        }

      });

      const preferences = preferencesObj.preferences;
      if (Array.isArray(preferences)) {
        preferences.forEach(preference => {
          let preferenceItem = preference.object.preferenceItem;
          let path = preference.object.path;
          let defaultValueLabel = preference.object.defaultValueLabel;
          let currentValueLabel = preference.object.currentValueLabel;
          let tweakerType = preferenceItem.tweakertype;
          let repoName = preferenceItem.repoName;
          let prefName = preferenceItem.prefName;
          let appId = appID;

          let grid = {
            preference: path,
            defaultValue: defaultValueLabel,
            currentValue: currentValueLabel,
            typeRepresentation: tweakerType
          };

          if (tweakerType === 'imageCombo') {
            grid.defaultValueIcon = preference.object.defaultValueIcon;
            grid.currentValueIcon = preference.object.currentValueIcon;
            grid.typeRepresentation = 'string';
          }

          let customButton = new WUXButton({
            styles: {
              display: "contents",
            },
            icon: {
              iconName: "open-in-a-new-window",
              fontIconFamily: WUXManagedFontIcons.Font3DS
            }
          });

          if (tweakerType === 'json') {
            grid.linkIcon = customButton.icon,
              grid.endpoint = preferenceItem.endpoint,
              grid.hostservice = preferenceItem.hostservice,
              grid.typeRepresentation = 'functionIcon';
          }

          let preferenceNode = new TreeNodeModel({
            label: path,
            repoName: repoName,
            prefName: prefName,
            appId: appId,
            grid: grid
          });

          appNode.addChild(preferenceNode);
        });
      } else {
        console.error('Preferences is not an array for appID:', appID);
      }

      model.addChild(appNode);
    });

    model.expandAll();


    model.pushUpdate();

    const allNodes = model.getAllDescendants();
    currentlySelectedNodesData.clear();
    allNodes.forEach(node => {
      if (node._options.repoName) {
        currentlySelectedNodesData.add(`${node._options.appId}-${node._options.repoName}-${node._options.prefName}`);
        resetDataGridView.selectNodeModel(node, true, false);
      }
    });

    currentlySelectedNodesData.add('deleteAll=true');

    // Create the WUXDialog
    var immersiveFrame = new WUXImmersiveFrame({
      identifier: "preference-reset-dialog-immersive-frame"
    });

    var dialogDiv = new UWA.Element("div", {
      styles: {
        //  width: "100%",
        height: "100%"
      }
    });

    var ResetDialog = new WUXDialog({
      immersiveFrame: immersiveFrame,
      title: getValueFromNLS("ResetUserPreferences.Title", mePrefTranslation),
      content: dialogDiv,
      modalFlag: true,
      resizableFlag: true,
      activeFlag: false,
      maximizeButtonFlag: true,
      position: {
        my: "center",
        at: "center",
        of: immersiveFrame
      },
      identifier: "reset-preference-dialog",
      buttons: {
        Reset: new WUXButton({
          domId: "meprefResetButton",
          onClick: async function (e) {
            // console.log("Selected nodes data:", selectedNodesData);
            var mePreferencesWriterObj = new MePreferencesWriter();
            await mePreferencesWriterObj.resetPreferences(currentlySelectedNodesData, serviceUrl);
            ResetDialog.close();

          }
        }),
        Cancel: new WUXButton({
          domId: "meprefResetCancelButton",
          onClick: function (e) {
            ResetDialog.close();
            ResetDialog.destroy();
            ResetDialog = null;
          }
        })
      }
    });

    // ResetDialog.height = 300;

    resetDataGridView.inject(dialogDiv);

    resetDataGridView.addEventListener('click', async function onClick(iEvent, cellInfos) {
      //cellView.identifier
      if (cellInfos.cellView.cellType === "__item__") {
        if (cellInfos.nodeModel.options.grid.linkIcon) {
          var nodeModel = cellInfos.nodeModel.options.grid;
          var tenant = null;
          var customValue = null;
          var repoName = cellInfos.nodeModel._options.repoName;
          var prefName = cellInfos.nodeModel._options.prefName;
          if (cellInfos.columnID === 1)
            customValue = nodeModel.currentValue;
          else
            customValue = nodeModel.defaultValue;


          if (tenantId)
            tenant = tenantId;
          else
            tenant = await MePreferencesPlatformServicesUtils.getTenant();

          var serviceName = nodeModel.hostservice;
          //  tenantId
          //var serviceName = 
          const serviceURL = await MePreferencesPlatformServicesUtils.getServiceUrl(tenant, serviceName);
          if (serviceURL) {
            let endpoint = nodeModel.endpoint;
            let completeURL = serviceURL + endpoint;
            let isStandaloneUI = false;
            let isAdminView = false;
            let lockState = "false";
            let pref_id = repoName + '.' + prefName;
            let readOnly = true;
            return mePreferencesCustomViewObj.createCustomDialog(completeURL, customValue, pref_id, lockState, isStandaloneUI, isAdminView, null, null, null, tenant, null, null, readOnly);
          }
          // console.log("");
        }
      }
      else
        return;
    });

    function compareValues(repo1, repo2) {
      if (typeof repo1 === 'string' && typeof repo2 === 'string') {
        return repo1.toLowerCase() === repo2.toLowerCase();
      }

      return false;
    }

    var nodesXSO = resetDataGridView.getNodesXSO();

    //callback on select
    nodesXSO.onPostAdd(function (addedElements) {

      // Set deleteAll to false
      currentlySelectedNodesData.delete('deleteAll=true');
      //  currentlySelectedNodesData.add('deleteAll=false');
      addedElements.forEach(function (xsoElement) {

        if (xsoElement._options.repoName) {

          var repoName = xsoElement._options.repoName;
          var prefName = xsoElement._options.prefName;
          var appId = xsoElement._options.appId;

          const nodeKey = `${repoName}-${prefName}-${appId}`;

          model.search({
            match: function (cellInfos) {
              if (cellInfos.nodeModel._options.repoName) {
                if (compareValues(cellInfos.nodeModel._options.repoName, repoName) && compareValues(cellInfos.nodeModel._options.prefName, prefName)) {
                  currentlySelectedNodesData.add(`${cellInfos.nodeModel._options.appId}-${cellInfos.nodeModel._options.repoName}-${cellInfos.nodeModel._options.prefName}`);
                  resetDataGridView.selectNodeModel(cellInfos.nodeModel, true, false);
                }
              }
            }
          });

        }

      });
    });

    //callback on unselect
    nodesXSO.onPostRemove(function (removedElements) {
      // Set deleteAll to false
      currentlySelectedNodesData.delete('deleteAll=true');
      //  currentlySelectedNodesData.add('deleteAll=false');

      removedElements.forEach(function (xsoElement) {
        if (xsoElement._options.repoName) {

          var repoName = xsoElement._options.repoName;
          var prefName = xsoElement._options.prefName;
          var appId = xsoElement._options.appId;

          const nodeKey = `${repoName}-${prefName}-${appId}`;

          model.search({
            match: function (cellInfos) {
              if (cellInfos.nodeModel._options.repoName) {
                if (compareValues(cellInfos.nodeModel._options.repoName, repoName) && compareValues(cellInfos.nodeModel._options.prefName, prefName)) {
                  currentlySelectedNodesData.delete(`${cellInfos.nodeModel._options.appId}-${cellInfos.nodeModel._options.repoName}-${cellInfos.nodeModel._options.prefName}`);
                  resetDataGridView.unselectNodeModel(cellInfos.nodeModel);
                }
              }
            }
          });

        }
      });
    });


    ResetDialog.show();
    immersiveFrame.inject(document.body);
    if (ResetDialog.height < 0 && ResetDialog.width < 0) {
      setDialogDimensions(ResetDialog);
    }
  };

  function setDialogDimensions(ResetDialog) {
    ResetDialog.width = 500;
    ResetDialog.height = 300;
  }

  function getValueFromNLS(key, nls) {
    var nlsVal = "to be overloaded from NLS";

    if (nls && nls[key] != undefined)
      nlsVal = nls[key];

    return nlsVal;
  }

  MePreferencesResetDialogObj.prototype.reset = async function (serviceURL) {

    appPreferencesMap.clear();
    prefsCurrentValDefValMap.clear();
    var userModifiedPrefs = null;
    var adminModifiedPrefs = null;

    mePreferencesPageModelDataProviderObj.appsNotInCache.clear();

    if (serviceURL) {
      [userModifiedPrefs, adminModifiedPrefs] = await Promise.all([
        readUserModifiedPrefs(serviceURL),
        readAdminProfileValues()
      ]);
      if (userModifiedPrefs) {

        var adminProfileResponse = adminModifiedPrefs ? JSON.parse(adminModifiedPrefs) : null;
        var commonPreferences = [];
        var remainingPreferences = [];

        userModifiedPrefs.repositories.forEach(repo => {
          repo.preferences.forEach(pref => {

            prefsCurrentValDefValMap.set(`${repo.name}.${pref.name}`, { currentValue: pref.value, defaultValue: null });
          });
        });

        if (adminProfileResponse) {
          if (adminProfileResponse && adminProfileResponse.repositories) {
            for (var repo of adminProfileResponse.repositories) {
              for (var pref of repo.preferences) {
                var key = `${repo.name}.${pref.name}`;
                var mockedRepo = userModifiedPrefs.repositories.find(r => r.name === repo.name);
                if (mockedRepo) {
                  var mockedPref = mockedRepo.preferences.find(p => p.name === pref.name);
                  if (mockedPref) {
                    commonPreferences.push({
                      key: key,
                      value: pref.defValue,
                      datatype: mockedPref.datatype
                    });

                    // Update the default value in prefsCurrentValDefValMap
                    if (prefsCurrentValDefValMap.has(key)) {
                      var currentValueObj = prefsCurrentValDefValMap.get(key);
                      currentValueObj.defaultValue = pref.defValue;
                      prefsCurrentValDefValMap.set(key, currentValueObj);
                    } else {
                      prefsCurrentValDefValMap.set(key, { currentValue: null, defaultValue: pref.defValue });
                    }
                  }
                }
              }
            }
          }
        }

        for (var mockedRepo of userModifiedPrefs.repositories) {
          for (var mockedPref of mockedRepo.preferences) {
            var key = `${mockedRepo.name}.${mockedPref.name}`;
            var foundInAdmin = adminProfileResponse.repositories.some(repo =>
              repo.name === mockedRepo.name && repo.preferences.some(pref => pref.name === mockedPref.name)
            );
            if (!foundInAdmin) {
              remainingPreferences.push({
                key: key,
                value: mockedPref.value,
                datatype: mockedPref.datatype
              });
            }
          }
        }

        var defaultRequestBody = await createRequestBody(remainingPreferences);
        // console.log("Reset Request Body:", defaultRequestBody);


        var combinedPreferences = [];
        commonPreferences.forEach(pref =>
          combinedPreferences.push(pref));
        remainingPreferences.forEach(pref =>
          combinedPreferences.push(pref));
        var appListRequestBody = await createRequestBody(combinedPreferences);

        // Call getAppsList and fetchDefaultValues in parallel
        var [defaultValues, listOfApps] = await Promise.all([
          pageViewObj.fetchDefaultValues(defaultRequestBody),
          getAppsList(appListRequestBody, serviceURL)
        ]);

        if (defaultValues) {
          defaultValues.repositories.forEach(repo => {
            repo.preferences.forEach(pref => {
              var key = `${repo.name}.${pref.name}`;
              if (prefsCurrentValDefValMap.has(key)) {
                var currentValueObj = prefsCurrentValDefValMap.get(key);
                currentValueObj.defaultValue = pref.value;
                prefsCurrentValDefValMap.set(key, currentValueObj);
              } else {
                prefsCurrentValDefValMap.set(key, { currentValue: null, defaultValue: pref.value });
              }
            });
          });
        }

        var appListArray = listOfApps.appList;

        if (appListArray.length > 0) {

          var filteredAppListArray = appListArray.filter(appID => {
            return appIdToTitleMap.hasOwnProperty(appID) || Object.keys(appIdToTitleMap).some(key => key.includes(appID));
          });

          for (const appID of filteredAppListArray) {

            const response = await getResources(appID, I18n.getCurrentLanguage(), serviceURL, true);
            if (response) {
              for (const pref of combinedPreferences) {
                const [repoName, prefName] = pref.key.split('.');
                await searchResourceInAppResponse(response, repoName, prefName);
              }
            }

          }

          const appsNotInCache = Array.from(mePreferencesPageModelDataProviderObj.appsNotInCache); // Convert Set to Array
          const appBatches = [];
          for (let i = 0; i < appsNotInCache.length; i += 3) {
            appBatches.push(appsNotInCache.slice(i, i + 3));
          }

          // Process each batch
          for (const batch of appBatches) {
            const batchAppIds = batch.join(',');
            const batchResponse = await getResources(batchAppIds, I18n.getCurrentLanguage(), serviceURL, false, true);
            const parsedBatchResponse = JSON.parse(batchResponse);

            for (const pref of combinedPreferences) {
              const [repoName, prefName] = pref.key.split('.');

              // Search for the preference in each app within the batch
              for (const appID of batch) {
                await searchResourceInAppResponse(batchResponse, repoName, prefName, appID);

              }
            }
          }

          appPreferencesMap.forEach((preferences, appID) => {
            let appInfo = appIdToTitleMap[appID];
            if (!appInfo) {
              // Check if any concatenated appID contains the appID
              const concatenatedAppID = Object.keys(appIdToTitleMap).find(key => key.includes(appID));
              if (concatenatedAppID) {
                appInfo = appIdToTitleMap[concatenatedAppID];
              }
            }
            if (appInfo) {
              appPreferencesMap.set(appID, {
                type: appInfo.type,
                title: appInfo.title,
                sortName: appInfo.sortName,
                preferences: preferences
              });
            }
          });

          this.showResetDialog(appPreferencesMap, serviceURL);
        } else
          showNoResetPreferencesDialog();
      } else {
        showNoResetPreferencesDialog();
      }

    }

    //console.log("Batch Responses:");
  }

  function showNoResetPreferencesDialog() {
    var resetMessage = new UWA.Element("span", {
      text: getValueFromNLS("noResetPreferences.subTitle", mePrefTranslation),
      class: "resetMessageSpan"
    });

    let resetDialogContentDiv = new UWA.createElement("div", {
      class: "resetDialogContentDiv"
    });
    resetMessage.inject(resetDialogContentDiv);
    var immersiveFrame = new WUXImmersiveFrame({
      identifier: "me-reset-user-pref-dialog-immersive-frame"
    });
    var resetConfrDialog = new WUXDialog({
      width: 350,
      immersiveFrame: immersiveFrame,
      identifier: "mep-user-no-reset-confirmation-dialog",
      title: getValueFromNLS("noResetPreferences.Title", mePrefTranslation),
      content: resetDialogContentDiv,
      activeFlag: false,
      modalFlag: true,
      position: {
        my: "center",
        at: "center",
        of: immersiveFrame
      },
      buttons: {
        Cancel: new WUXButton({
          domId: "mep-reset-cancel",
          onClick: function (e) {
            resetConfrDialog.close();
            removeImmersiveFrame();
          }
        })
      }
    });

    if (resetConfrDialog) {
      var resetConfrDialogCloseButton = resetConfrDialog.elements._closeButton;
      resetConfrDialogCloseButton.addEventListener('click', function () {
        //Remove Immersive Frame
        removeImmersiveFrame();
      });
    }

    function removeImmersiveFrame() {
      //Get all immersive frames present in the application.
      var immFramesList = document.getElementsByClassName('wux-windows-immersive-frame');
      for (let it = 0; it < immFramesList.length; it++) {
        let immFrame = immFramesList[it];
        //Remove the immersive frame added for MePreferenceDialog
        if (immFrame.dsModel.identifier == "me-reset-user-pref-dialog-immersive-frame") {
          immFrame.remove();
          break;
        }
      }
      immersiveFrame = null;
      //  document.dispatchEvent(removeImmEvent);
    }
    immersiveFrame.inject(document.body);
  }

  async function createRequestBody(remainingPreferences) {
    let repositories = [];

    remainingPreferences.forEach(pref => {
      let repoName = pref.key.split('.')[0];
      let prefName = pref.key.split('.')[1];

      let repository = repositories.find(repo => repo.name === repoName);

      if (!repository) {
        repository = {
          name: repoName,
          preferenceNames: []
        };
        repositories.push(repository);
      }

      repository.preferenceNames.push(prefName);
    });

    return {
      repositories: repositories
    };
  }


  async function searchResourceInAppResponse(appResponse, repoName, prefName, appID) {
    const parsedResponse = JSON.parse(appResponse);
    if (!parsedResponse.mePrefUIData) {
      console.log("mePrefUIData is missing in the parsed response");
      return null;
    }

    const nlsJson = await fetchNlsJson(parsedResponse);
    const iconObj = await fetchIcons(parsedResponse);

    async function findPreferenceItem(uiModel, repoName, prefName, currentPath = [], parentRepo = null, headerNames = null, headerIcons = null, cellIndex = null, type = null) {
      // console.log("Searching in UIModel:", uiModel);
      for (const item of uiModel) {
        const newPath = [...currentPath, item.name];
        const currentRepo = item.repository || parentRepo;

        if (item.type === "PreferenceItem" && currentRepo === repoName && item.name === prefName) {
          //  console.log("PreferenceItem found:", item);
          let labelPath = "";
          if (item.tweakertype === 'radio') {
            labelPath = `${newPath.slice(0, -1).join('.')}.Title`;
          } else {
            labelPath = `${newPath.join('.')}.Label`;
          }

          const label = nlsJson[labelPath] || item.name;

          const currentValue = prefsCurrentValDefValMap.get(`${repoName}.${prefName}`).currentValue;
          const defaultValue = prefsCurrentValDefValMap.get(`${repoName}.${prefName}`).defaultValue;

          const preferenceItem = {
            tweakertype: ['radio', 'magnitude', 'percentage', 'enum'].includes(item.tweakertype) ? 'string' : item.tweakertype,
            repoName: repoName,
            prefName: prefName,
            label: label,
          };

          if (item.tweakertype === 'json') {
            preferenceItem.hostservice = item.hostservice;
            preferenceItem.endpoint = item.endpoint;
          }

          if (item.tweakertype === "enum" || item.tweakertype === "imageCombo") {
            const currentValueLabel = nlsJson[`${repoName}.${prefName}.${currentValue}.Label`] || currentValue;
            const defaultValueLabel = nlsJson[`${repoName}.${prefName}.${defaultValue}.Label`] || defaultValue;

            if (item.tweakertype === "imageCombo" && iconObj) {
              const icons = getIcons(item.icons, iconObj);
              const possibleValues = await readPrefEnumMetadata(repoName, prefName);
              const currentValueIcon = getIconForValue(currentValue, possibleValues, icons);
              const defaultValueIcon = getIconForValue(defaultValue, possibleValues, icons);

              return {
                currentValueLabel: currentValueLabel,
                defaultValueLabel: defaultValueLabel,
                currentValueIcon: currentValueIcon,
                defaultValueIcon: defaultValueIcon,
                preferenceItem: preferenceItem,
                path: getNlsPath(newPath, nlsJson, headerNames, headerIcons, cellIndex, type)
              };
            }

            return {
              currentValueLabel: currentValueLabel,
              defaultValueLabel: defaultValueLabel,
              preferenceItem: preferenceItem,
              path: getNlsPath(newPath, nlsJson, headerNames, headerIcons, cellIndex, type)
            };
          }

          if (item.tweakertype === 'magnitude') {
            const convertedCurrentValue = convertMKStoCGS(item.paramType, currentValue);
            const convertedDefaultValue = convertMKStoCGS(item.paramType, defaultValue);
            const suffix = getSuffix(item.paramType);

            // Format the values based on nbdecimal property
            const formattedCurrentValue = convertedCurrentValue.toFixed(item.nbdecimal);
            const formattedDefaultValue = convertedDefaultValue.toFixed(item.nbdecimal);

            return {
              currentValueLabel: formattedCurrentValue + suffix,
              defaultValueLabel: formattedDefaultValue + suffix,
              preferenceItem: preferenceItem,
              path: getNlsPath(newPath, nlsJson, headerNames, headerIcons, cellIndex, type)
            };
          }

          if (item.tweakertype === 'percentage') {
            const updatedCurrentValue = currentValue + " %";
            const updatedDefaultValue = defaultValue + " %";

            return {
              currentValueLabel: updatedCurrentValue,
              defaultValueLabel: updatedDefaultValue,
              preferenceItem: preferenceItem,
              path: getNlsPath(newPath, nlsJson, headerNames, headerIcons, cellIndex, type)
            };
          }

          if (item.tweakertype === 'radio') {
            const currentValueLabel = nlsJson[`${repoName}.${prefName}.${currentValue}.Label`] || currentValue;
            const defaultValueLabel = nlsJson[`${repoName}.${prefName}.${defaultValue}.Label`] || defaultValue;
            const groupPath = currentPath.slice(0, 2).join('.');
            return {
              currentValueLabel: currentValueLabel,
              defaultValueLabel: defaultValueLabel,
              preferenceItem: preferenceItem,
              path: getNlsPath(groupPath.split('.'), nlsJson, headerNames, headerIcons, cellIndex, type)
            };
          }

          return {
            currentValueLabel: currentValue,
            defaultValueLabel: defaultValue,
            preferenceItem: preferenceItem,
            path: getNlsPath(newPath, nlsJson, headerNames, headerIcons, cellIndex, type)
          };
        }

        if (item.type === "TableHeader") {

          headerNames = item.name;
          headerIcons = item.icons;
        }

        if (item.type === "TableData") {

          const tableData = item.CellData;
          for (let i = 0; i < tableData.length; i++) {
            const cell = tableData[i];
            const foundItem = await findPreferenceItem([cell], repoName, prefName, [...currentPath, item.name], currentRepo, headerNames, headerIcons, i, item.type);
            if (foundItem) {
              return foundItem;
            }
          }
        }

        if (item.children) {
          const foundItem = await findPreferenceItem(item.children, repoName, prefName, newPath, currentRepo, headerNames, headerIcons, cellIndex, item.type);
          if (foundItem) {
            return foundItem;
          }
        }
      }
      // console.log("PreferenceItem not found");
      return null;
    }

    for (const prefData of parsedResponse.mePrefUIData) {
      if (prefData.prefStyle && prefData.prefStyle.length > 0) {
        const prefStyleData = JSON.parse(prefData.prefStyle[0].data[0]);
        const foundItem = await findPreferenceItem(prefStyleData, repoName, prefName);
        if (foundItem) {
          //  console.log("Preference found:", foundItem);
          let actualAppID = prefData.appID;
          if (!appIdToTitleMap.hasOwnProperty(prefData.appID)) {

            const concatenatedAppID = Object.keys(appIdToTitleMap).find(key => key.includes(prefData.appID));
            if (concatenatedAppID) {
              actualAppID = concatenatedAppID;
            }
          }
          if (!appPreferencesMap.has(actualAppID)) {
            appPreferencesMap.set(actualAppID, []);
          }


          const existingPreferences = appPreferencesMap.get(actualAppID);
          const isDuplicate = existingPreferences.some(existingPref =>
            existingPref.object.preferenceItem.repoName === repoName &&
            existingPref.object.preferenceItem.prefName === prefName
          );

          if (!isDuplicate) {
            appPreferencesMap.get(actualAppID).push({
              object: foundItem,
              appId: actualAppID
            });
          }
        }
      }
    }

    //  console.log("Preference not found");
    return null;
  }

  function getNlsPath(path, nlsJson, headerNames = null, headerIcons = null, cellIndex = null, type = null) {
    let nlsPath = [];
    let sectionFound = false;
    let groupFound = false;


    let loopEnd = type === 'TableData' ? path.length - 1 : path.length;

    for (let i = 0; i < loopEnd; i++) {
      if (!sectionFound) {
        let sectionKey = `${path.slice(0, i + 1).join('.')}.Title`;
        if (nlsJson[sectionKey]) {
          nlsPath.push(nlsJson[sectionKey]);
          sectionFound = true;
        }
      } else if (!groupFound) {
        let groupKey = `${path.slice(0, i + 1).join('.')}.Title`;
        if (nlsJson[groupKey]) {
          nlsPath.push(nlsJson[groupKey]);
          groupFound = true;
        } else {
          // If no group is found, directly add the item label
          let key = `${path.slice(0, i + 1).join('.')}.Label`;
          nlsPath.push(nlsJson[key] || path[i]);
          groupFound = true;
        }
      } else {
        let key = `${path.slice(0, i + 1).join('.')}.Label`;
        nlsPath.push(nlsJson[key] || path[i]);
      }
    }

    if (headerNames && cellIndex !== null) {

      let basePath = path.slice(0, -2).join('.');
      if (headerNames[cellIndex + 1]) {
        let headerKey = `${basePath}.${headerNames[cellIndex + 1]}.Label`;
        nlsPath.push(nlsJson[headerKey] || headerNames[cellIndex + 1]);
      } else if (headerIcons && headerIcons[cellIndex + 1]) {

        let iconClass = headerIcons[cellIndex + 1];
        if (iconClass.includes('wux-ui-3ds')) {

          // let iconElement = document.createElement('i');
          // iconElement.className = iconClass;

          // let tooltipKey = `${path.slice(0, 2).join('.')}.mep_header_${cellIndex + 1}.Tooltip`;
          // let tooltip = nlsJson[tooltipKey] || '';
          // nlsPath.push(tooltip);
        } else {
          nlsPath.push(headerIcons[cellIndex + 1]);
        }
      }
    }

    return nlsPath.join(' / ');
  }

  async function fetchIcons(parsedResponse) {
    let iconObj = [];
    for (var prefData of parsedResponse.mePrefUIData) {
      if (prefData.icons && prefData.icons.length > 0) {
        iconObj = [...iconObj, ...prefData.icons]; // Ensure iconObj is an array
      }
    }
    return iconObj;
  }

  async function fetchNlsJson(parsedResponse) {
    const nlsJson = {};
    for (const prefData of parsedResponse.mePrefUIData) {
      if (prefData.nlsJSON && prefData.nlsJSON.length > 0) {
        for (const nlsData of prefData.nlsJSON) {
          if (nlsData.data && nlsData.data.length > 0) {
            const parsedNlsData = JSON.parse(nlsData.data[0]);
            Object.assign(nlsJson, parsedNlsData);
          }
        }
      }
    }
    return nlsJson;
  }

  function prepareEnumRequestBody(repoName, prefName) {
    return {
      "repositories": [
        {
          "name": repoName,
          "preferenceNames": [prefName]
        }
      ]
    };
  }

  async function readPrefEnumMetadata(repoName, prefName) {
    let options = {
      headersInfo: {
        'Content-Type': 'application/json'
      },
      typeInfo: 'json'
    };
    var completeURL = serviceUrl + ENUM__DATA_ENDPOINT;

    let cacheKey = `${repoName}.${prefName}`;


    if (enumMetadataCache.has(cacheKey)) {
      return enumMetadataCache.get(cacheKey);
    }

    let ENUM_REQUEST_BODY = prepareEnumRequestBody(repoName, prefName);

    try {
      const responseObject = await MePreferencesPlatformServicesUtils.callRestAPI(ENUM_REQUEST_BODY, completeURL, 'POST', options);
      const response = responseObject[0];


      const possibleValues = response.repositories[0].preferences[0].values;


      enumMetadataCache.set(cacheKey, possibleValues);

      return possibleValues;
    } catch (errorInfo) {
      console.error("Error fetching enum metadata:", errorInfo);
      return null;
    }
  }

  function getIconForValue(value, possibleValues, icons) {
    const index = possibleValues.indexOf(value);

    if (index !== -1 && icons && icons.length > index) {
      return icons[index];
    }

    return null;
  }


  function getIcons(icondata, iconObj) {
    let iconlist = [];

    if (icondata) {
      for (let i = 0; i < icondata.length; i++) {
        if (icondata[i].includes(".")) {
          let iconpath = null;
          for (let j = 0; j < iconObj.length; j++) {
            if (iconObj[j].fileName === icondata[i]) {
              iconpath = "data:image/png;base64," + iconObj[j].data;
              break;
            }
          }
          iconlist.push(iconpath);
        } else {
          iconlist.push(icondata[i]);
        }
      }
    }

    return iconlist;
  }

  async function getResources(appID, currentLanguage, meprefurl, bypassCall, byPassCache) {
    serviceUrl = meprefurl;
    var version = await mePreferencesClientCacheHelperObj.getVersion(meprefurl);
    var url = null;

    if (version)
      url = meprefurl + PAGEMODEL_ENDPOINT + '?appIds="' + appID + '"&lang="' + currentLanguage + '"&v="' + version + '"';
    else
      url = meprefurl + PAGEMODEL_ENDPOINT + '?appIds="' + appID + '"&lang="' + currentLanguage + '"';

    return await mePreferencesPageModelDataProviderObj.getPageModel(url, appID, currentLanguage, bypassCall, byPassCache);
  }

  function getSuffix(paramType) {
    if (paramType.toLowerCase() === "length") {
      return " mm";
    } else if (paramType.toLowerCase() === "angle") {
      return " deg";
    }
  }


  function convertMKStoCGS(paramType, value) {
    if (paramType.toLowerCase() === "length") {
      return value * 1000;
    }

    if (paramType.toLowerCase() === "angle") {
      return value * (180 / Math.PI);
    }
  }


  async function getAppsList(requestBody, serviceURL) {
    var completeURL = null;
    completeURL = serviceURL + GET_APPLIST_ENDPOINT;
    // completeURL = addRetrieveOnlyUserFlag(completeURL, true);
    let options = {
      headersInfo: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await MePreferencesPlatformServicesUtils.callRestAPI(requestBody, completeURL, 'POST', options);
      const parsedResponse = JSON.parse(response[0]);
      return parsedResponse;
      // return '{/"appList/": [/"3DSApp.ENOR3D_AP/"]}'
    } catch (errorInfo) {
      console.error("Error fetching applist:", errorInfo);
      return null;
    }

  }

  function addRetrieveOnlyUserFlag(url, value) {
    var completeUrl = url + RETRIEVE_ONLY_USERPREF_KEY + "=" + value;
    return completeUrl;
  }

  async function readUserModifiedPrefs(serviceURL) {
    var serviceurl = null;
    serviceurl = serviceURL + READ_PREFERENCE_ENDPOINT + "?";
    serviceurl = addRetrieveOnlyUserFlag(serviceurl, true);

    var repoArray = [];
    var reqBody = { "repositories": repoArray };
    let options = {
      headersInfo: {
        'Content-Type': 'application/json'
      },
      typeInfo: "json"
    };

    try {
      const response = await MePreferencesPlatformServicesUtils.callRestAPI(reqBody, serviceurl, 'POST', options);
      return response[0];
    } catch (errorInfo) {
      console.error("Error fetching user modified preferences:", errorInfo);
      return null;
    }

  }

  function addUserAuthFlag(url, value) {
    var completeUrl = url + AUTHORIZATION + "=" + value;
    return completeUrl;
  }

  async function readAdminProfileValues() {
    try {
      var tenantID = await MePreferencesPlatformServicesUtils.getTenant();
      tenantId = tenantID;
      const serviceURL = await MePreferencesPlatformServicesUtils.getServiceUrl(tenantID, "mepreferences");
      var completeURL = serviceURL + "/api/v1/admin_profile/preferences" + "?";
      completeURL = addUserAuthFlag(completeURL, "false");

      const response = await MePreferencesPlatformServicesUtils.callRestAPI(null, completeURL, 'GET');
      return response[0];
    } catch (errorInfo) {
      console.error("Error fetching admin profile values:", errorInfo);
      return null;
    }
  }

  return MePreferencesResetDialogObj;
});
