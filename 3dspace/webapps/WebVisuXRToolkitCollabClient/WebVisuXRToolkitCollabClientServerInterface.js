/// <amd-module name="DS/WebVisuXRToolkitCollabClient/WebVisuXRToolkitCollabClientServerInterface"/>
define("DS/WebVisuXRToolkitCollabClient/WebVisuXRToolkitCollabClientServerInterface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitCollabClientServerInterface = void 0;
    class WebVisuXRToolkitCollabClientServerInterface extends EventTarget {
        constructor(name, color) {
            super();
            this._leaderId = "";
            this._connectedUsers = new Map();
            this._WebVisuXRToolkitStarted = false;
            this._name = name;
            this._color = color;
            this.addEventListener("onOtherDisconnection", (e) => {
                this._connectedUsers.delete(e.detail.id);
            });
        }
        WebVisuXRToolkitStarted() {
            this._WebVisuXRToolkitStarted = true;
            for (const [id, data] of this._connectedUsers) {
                this.dispatchEvent(new CustomEvent("setupOnOtherConnection", { detail: { "id": id, "name": data.name, "color": data.color } }));
                this.dispatchEvent(new CustomEvent("onOtherConnection", { detail: { "id": id, "name": data.name, "color": data.color } }));
            }
        }
        getUserInfo(id) {
            return this._connectedUsers.get(id);
        }
        get name() {
            return this._name;
        }
        setName(name) {
            this._name = name;
        }
        get id() {
            return this._id;
        }
        get color() {
            return this._color;
        }
        setColor(color) {
            this._color = color;
        }
        getLeaderID() {
            return this._leaderId;
        }
        onNewLeader(id) {
            const previousLeader = this._leaderId;
            this._leaderId = id;
            this.dispatchEvent(new CustomEvent("onNewLeader", { detail: { newLeader: id, formerLeader: previousLeader } }));
        }
        receiveMsg(msg) {
            this.dispatchEvent(new CustomEvent("onReceiveMessage", { detail: msg }));
        }
        ;
        receiveBinary(msg) {
            this.dispatchEvent(new CustomEvent("onReceiveBinary", { detail: msg }));
        }
        ;
        connected() {
            this.dispatchEvent(new Event("onConnection"));
        }
        connectionFailed() {
            this.dispatchEvent(new Event("onConnectionFailed"));
        }
        disconnected() {
            this._leaderId = "";
            this._connectedUsers.clear();
            this.dispatchEvent(new Event("onDisconnection"));
        }
        onOtherUserDisconnection(userID) {
            this.dispatchEvent(new CustomEvent("onOtherDisconnection", { detail: { "id": userID } }));
        }
        onServerInformation(servers) {
            this.dispatchEvent(new CustomEvent("onServerInformation", { detail: servers }));
        }
        onOtherUserConnection(userID, name, color) {
            if (this._WebVisuXRToolkitStarted) {
                this._connectedUsers.set(userID, { name, color });
                this.dispatchEvent(new CustomEvent("setupOnOtherConnection", { detail: { "id": userID, "name": name, "color": color } }));
                this.dispatchEvent(new CustomEvent("onOtherConnection", { detail: { "id": userID, "name": name, "color": color } }));
            }
            else {
                this._connectedUsers.set(userID, { name, color });
            }
        }
    }
    exports.WebVisuXRToolkitCollabClientServerInterface = WebVisuXRToolkitCollabClientServerInterface;
});
