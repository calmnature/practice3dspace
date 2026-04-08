/// <amd-module name="DS/DELPXPTimeManagerView/view/DELPXPTimeManagerView"/>
define("DS/DELPXPTimeManagerView/view/DELPXPTimeManagerView", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/DELTimeManagerV1/DELTimeManager"], function (require, exports, React, React_1, DELTimeManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const TimeManagerView = () => {
        const [startDate, setStartDate] = (0, React_1.useState)(new Date('2023-09-01T00:00:00.000Z'));
        const [endDate, setEndDate] = (0, React_1.useState)(new Date('2023-12-05T00:00:00.000Z'));
        const [currentDate, setCurrentDate] = (0, React_1.useState)(new Date('2023-10-18T00:00:00.000Z'));
        const [nowDate, setNowDate] = (0, React_1.useState)({
            date: new Date(),
            nowDateText: "LIVE",
            tooltip: "Go to live"
        });
        const [restriction, setRestriction] = (0, React_1.useState)({
            restrictionStart: new Date("Tue Oct 01 2023 18:05:20 GMT+0200"),
            restrictionEnd: new Date("Tue Nov 20 2023 18:05:20 GMT+0200")
        });
        const [mode, setMode] = (0, React_1.useState)('Planned');
        const [period] = (0, React_1.useState)({ startPeriod: new Date("Tue Oct 15 2023 18:05:20 GMT+0200"), endPeriod: new Date("Tue Oct 30 2023 18:05:20 GMT+0200") });
        const [context, setContext] = (0, React_1.useState)({
            startContext: new Date("Tue Oct 01 2023 18:05:20 GMT+0200"),
            endContext: new Date("Tue Nov 20 2023 18:05:20 GMT+0200")
        });
        const [statusValue, setStatusValue] = (0, React_1.useState)("Play_Status_Pause");
        const stateValueRef = (0, React_1.useRef)(statusValue);
        const [lockUnlockValue, setLockUnlockValue] = (0, React_1.useState)("lock");
        const lockUnlockValueRef = (0, React_1.useRef)(lockUnlockValue);
        const [issues, setIssues] = (0, React_1.useState)([{
                "@class": "ResourceEvent~1",
                "physicalId": "",
                "externalId": "4F00D75952792500657C239C0003A3E1",
                "lifeCycleStatus": "LifeCycleStatus_Updated",
                "geometry": "",
                "id": "MfgEvent#e1fc34fe-4529f759",
                "scheduleStartDate": "2023-10-15T10:00:03Z",
                "scheduledEndDate": "2023-10-15T14:00:03Z",
                "actualStartDate": "2023-10-16T10:00:03Z",
                "actualEndDate": "2023-10-16T14:00:03Z",
                "classificationValue": "assign",
                "severityValue": "low",
                "label": "Issue 5",
                "status": "MfgEvent_Status_Unknown",
                "resourceId": null
            },
            {
                "@class": "ResourceEvent~2",
                "physicalId": "",
                "externalId": "4F00D75952792500657C239C0003A3E1",
                "lifeCycleStatus": "LifeCycleStatus_Updated",
                "geometry": "",
                "id": "MfgEvent#e1fc34fe-4529f7592",
                "scheduleStartDate": "2023-10-16T10:00:03Z",
                "scheduledEndDate": "2023-10-16T14:00:03Z",
                "actualStartDate": "2023-10-16T10:00:03Z",
                "actualEndDate": "2023-10-16T14:00:03Z",
                "classificationValue": "review",
                "severityValue": "medium",
                "label": "Issue 5",
                "status": "MfgEvent_Status_Unknown",
                "resourceId": null
            },
            {
                "@class": "ResourceEvent~3",
                "physicalId": "",
                "externalId": "4F00D75952792500657C239C0003A3E1",
                "lifeCycleStatus": "LifeCycleStatus_Updated",
                "geometry": "",
                "id": "MfgEvent#e1fc34fe-4529f7593",
                "scheduleStartDate": "2023-10-17T10:00:03Z",
                "scheduledEndDate": "2023-10-17T14:00:03Z",
                "actualStartDate": "2023-10-16T10:00:03Z",
                "actualEndDate": "2023-10-16T14:00:03Z",
                "classificationValue": "active",
                "severityValue": "high",
                "label": "Issue 5",
                "status": "MfgEvent_Status_Unknown",
                "resourceId": null
            },
            {
                "@class": "ResourceEvent~4",
                "physicalId": "",
                "externalId": "4F00D75952792500657C239C0003A3E1",
                "lifeCycleStatus": "LifeCycleStatus_Updated",
                "geometry": "",
                "id": "MfgEvent#e1fc34fe-4529f7594",
                "scheduleStartDate": "2023-10-18T10:00:03Z",
                "scheduledEndDate": "2023-10-18T14:00:03Z",
                "actualStartDate": "2023-10-16T10:00:03Z",
                "actualEndDate": "2023-10-16T14:00:03Z",
                "classificationValue": "create",
                "severityValue": "urgent",
                "label": "Issue 5",
                "status": "MfgEvent_Status_Unknown",
                "resourceId": null
            }]);
        const [serializedOperations, setSerializedOperations] = (0, React_1.useState)([{
                //@ts-ignore
                "physicalId": "857FEB80000029A062A30E3A00015E9C",
                "externalId": "",
                "lifeCycleStatus": "LifeCycleStatus_Loaded",
                "geometry": "",
                "id": "SerializedOperation#d5540000-00000001",
                "serialOfOpOccurrence": "MfgOperationOccurrence#c3340000-00000000",
                "operationInstanceID": "MfgOperationInstance#a3340000-00000000",
                "outOperands": [],
                "inOperands": [],
                "dueDate": "",
                "earliestStartDate": "",
                "scheduledStartDate": "2023-10-03T06:10:00Z",
                "scheduledEndDate": "2023-10-04T07:05:00Z",
                "actualStartDate": "",
                "actualEndDate": "",
                "status": "SOp_Status_Planned",
                "displayName": "9230",
                "prevSerializedOperations": [
                    "SerializedOperation#66540000-00000000",
                    "SerializedOperation#86540000-00000000"
                ],
                "sequenceNumber": 0,
                "_scheduledRscAssignment": [
                    {
                        "startDate": "2022-02-01T06:10:00Z",
                        "endDate": "2022-02-01T07:05:00Z",
                        "mfgRscRequ": null,
                        "assignedSRsc": "SerializedResource#6ff20000-00000000",
                        "assignedSRscGroup": null
                    }
                ],
                "_actualRscAssignment": [
                    {
                        "startDate": "",
                        "endDate": "",
                        "mfgRscRequ": null,
                        "assignedSRsc": "SerializedResource#6ff20000-00000000",
                        "assignedSRscGroup": null
                    }
                ],
                "scheduledWCAssignment": "SerializedOrganization#3ff20000-00000000",
                "actualWCAssignment": "SerializedOrganization#3ff20000-00000000",
                "duration": null,
                "woOwner": "WorkOrder#c5540000-00000000",
                "icon": "",
                "defaultColor": {
                    "isDefined": true,
                    "red": 22,
                    "green": 73,
                    "blue": 154
                },
                "childrenOperations": [],
                "isOnHold": false,
                "onHoldComment": ""
            },
            {
                //@ts-ignore
                "physicalId": "857FEB80000029A062A30E3A00015E9C",
                "externalId": "",
                "lifeCycleStatus": "LifeCycleStatus_Loaded",
                "geometry": "",
                "id": "SerializedOperation#d5540000-00000000",
                "serialOfOpOccurrence": "MfgOperationOccurrence#c3340000-00000000",
                "operationInstanceID": "MfgOperationInstance#a3340000-00000000",
                "outOperands": [],
                "inOperands": [],
                "dueDate": "",
                "earliestStartDate": "",
                "scheduledStartDate": "2023-10-05T06:10:00Z",
                "scheduledEndDate": "2023-10-06T07:05:00Z",
                "actualStartDate": "",
                "actualEndDate": "",
                "status": "SOp_Status_Planned",
                "displayName": "9230",
                "prevSerializedOperations": [
                    "SerializedOperation#66540000-00000000",
                    "SerializedOperation#86540000-00000000"
                ],
                "sequenceNumber": 0,
                "_scheduledRscAssignment": [
                    {
                        "startDate": "2022-02-01T06:10:00Z",
                        "endDate": "2022-02-01T07:05:00Z",
                        "mfgRscRequ": null,
                        "assignedSRsc": "SerializedResource#6ff20000-00000000",
                        "assignedSRscGroup": null
                    }
                ],
                "_actualRscAssignment": [
                    {
                        "startDate": "",
                        "endDate": "",
                        "mfgRscRequ": null,
                        "assignedSRsc": "SerializedResource#6ff20000-00000000",
                        "assignedSRscGroup": null
                    }
                ],
                "scheduledWCAssignment": "SerializedOrganization#3ff20000-00000000",
                "actualWCAssignment": "SerializedOrganization#3ff20000-00000000",
                "duration": null,
                "woOwner": "WorkOrder#c5540000-00000000",
                "icon": "",
                "defaultColor": {
                    "isDefined": true,
                    "red": 22,
                    "green": 73,
                    "blue": 154
                },
                "childrenOperations": [],
                "isOnHold": false,
                "onHoldComment": ""
            }]);
        const commands = (0, React_1.useRef)([
            {
                onButtonClick: (e) => console.log(e)
            },
            {
                onButtonClick: (e) => console.log(e)
            },
            {
                onButtonClick: (e) => console.log(e)
            },
            {
                onButtonClick: (e) => console.log(e)
            },
            {
                onButtonClick: (e) => console.log(e)
            },
            {
                onButtonClick: (e) => console.log(e)
            },
            {
                onButtonClick: (e) => console.log(e)
            }
        ]);
        const onClickHideShow = (e, isActive) => {
            console.log(e, isActive);
        };
        const onClickNowDate = (event, isActive, isDocked) => {
            console.log(event, isActive, isDocked);
            if (isActive) {
                setCurrentDate(nowDate.date);
                stateValueRef.current = "Play_Status_Live";
                setStatusValue("Play_Status_Live");
            }
            else {
                stateValueRef.current = "Play_Status_Pause";
                setStatusValue("Play_Status_Pause");
            }
        };
        const onChangeStatus = (playerStatus) => {
            console.log(playerStatus);
            stateValueRef.current = playerStatus;
            setStatusValue(playerStatus);
        };
        /*useEffect(() => {
          const interval = setInterval(() => setNowDate({ ...nowDate, date: new Date()}), 1000);
          return () => {
            clearInterval(interval);
          };
        }, []);*/
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "w-100" },
                React.createElement(DELTimeManager_1.default, { key: "svg-overlaytm-c1", id: "svg-overlaytm-c1", onCommands: commands.current, height: 111, currentDate: { date: currentDate, dateText: currentDate.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true }), setDate: setCurrentDate, tooltip: "Go to date" }, nowDate: { ...nowDate, setDate: setNowDate }, restriction: { restriction, setRestriction }, period: period, context: { context, setContext }, timeCommands: { time: currentDate.toLocaleDateString('en-GB'), date: currentDate.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) }, mode: { mode, setMode }, onClickExpander: onClickHideShow, onClickNowDate: onClickNowDate, playerStatus: { statusValue: statusValue, setStatusValue: onChangeStatus }, lock: { lockUnlockValue: lockUnlockValue, setLockUnlockValue: setLockUnlockValue }, serializedOperations: serializedOperations, issues: issues }))));
    };
    exports.default = TimeManagerView;
});
