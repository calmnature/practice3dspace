define("DS/WebVisuXRToolkit/WebVisuXRToolkitCollabManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitCollabManager = void 0;
    class WebVisuXRToolkitCollabManager {
        constructor(client) {
            this._networkBinaryListeners = new Map();
            this._networkMsgListeners = new Map();
            this._connectedUsersData = new Map();
            this._playerNumber = 0;
            this.listeners = [];
            this._lastSentState = new Map();
            this._lastReceivedState = new Map();
            this.encoder = new TextEncoder();
            this._clientInstance = client;
            if (this._clientInstance) {
                this._playerNumber++;
                this._clientInstance.addEventListener("onReceiveMessage", (event) => {
                    const data = JSON.parse(event.detail);
                    if (data.sender === undefined) {
                        console.error("Missing sender", data);
                        return;
                    }
                    if (data.sender === this._clientInstance.id) {
                        return;
                    }
                    if (data.channel === undefined) {
                        console.error("Missing channel", data);
                        return;
                    }
                    if (data.sender === undefined) {
                        console.error("Missing sender");
                        return;
                    }
                    if (data.channel === "NeedsToBeSynched" && data.payload === "NeedsToBeSynched") {
                        //console.log("Sending sync")
                        this.syncOverNetwork();
                    }
                    const callbacks = this._networkMsgListeners.get(data.channel);
                    if (callbacks) {
                        for (const callback of callbacks) {
                            callback(data.sender, data.payload);
                        }
                    }
                });
                this._clientInstance.addEventListener("onDisconnection", () => {
                    this._connectedUsersData.clear();
                });
                this._clientInstance.addEventListener("setupOnOtherConnection", (event) => {
                    this._playerNumber++;
                    const data = event.detail;
                    this._connectedUsersData.set(data.id, { headMat: null, rightInputMat: null, leftInputMat: null });
                });
                this.addOnOtherDisconnectionCallback((id) => {
                    this._playerNumber--;
                    this._connectedUsersData.delete(id);
                });
                this._clientInstance.addEventListener("onReceiveBinary", (event) => {
                    const data = event.detail;
                    const view = data instanceof DataView ? data : new DataView(data);
                    const full = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
                    // Step 1: read matrixPayloadLength from the end minus metadata
                    const fullLength = full.length;
                    // Start from the end, work backward:
                    let cursor = fullLength;
                    const isSync = full[cursor - 1] === 1;
                    cursor -= 1;
                    // Read sender length
                    const senderLength = full[cursor - 1];
                    cursor -= 1 + senderLength;
                    // Read ID length
                    const channelLength = full[cursor - 1];
                    cursor -= 1 + channelLength;
                    // Read matrixPayloadLength (2 bytes)
                    cursor -= 2;
                    const payloadLength = new DataView(full.buffer, full.byteOffset + cursor, 2).getUint16(0, true);
                    // Extract sections
                    const payload = full.slice(0, payloadLength);
                    const channel = new TextDecoder().decode(full.slice(payloadLength + 2, payloadLength + 2 + channelLength));
                    const sender = new TextDecoder().decode(full.slice(payloadLength + 2 + 1 + channelLength, fullLength - 2));
                    const StateKey = channel + ":" + sender;
                    if (sender !== this._clientInstance.id) {
                        if (isSync) {
                            this._lastReceivedState.set(StateKey, payload.buffer);
                            //console.log("Synched!", new Float32Array(payload.buffer));
                        }
                        if (!this._lastReceivedState.has(StateKey)) {
                            console.warn("Has not been synched yet on channel ", channel, sender, this._clientInstance.id);
                            this.sendMessageOverNetwork("NeedsToBeSynched", "NeedsToBeSynched");
                            return;
                        }
                        const buffer = isSync ? payload.buffer : this.decodeChanges(this._lastReceivedState.get(StateKey), payload.buffer);
                        //buffer = this.xorBuffers(this._lastSentState.get(channel)!, payload.buffer);
                        this._lastReceivedState.set(StateKey, buffer);
                        const callbacks = this._networkBinaryListeners.get(channel);
                        if (callbacks) {
                            for (const callback of callbacks) {
                                callback(sender, buffer);
                            }
                        }
                    }
                });
            }
        }
        WebVisuXRToolkitStarted() {
            this._clientInstance?.WebVisuXRToolkitStarted();
        }
        addOnSelfDisctionnectionCallback(func) {
            const caller = () => func();
            this.listeners.push(caller);
            this._clientInstance?.addEventListener("onDisconnection", caller);
        }
        addOnOtherDisconnectionCallback(func) {
            const caller = (e) => func(e.detail.id);
            this.listeners.push(caller);
            this._clientInstance?.addEventListener("onOtherDisconnection", caller);
        }
        addOnOtherConnectionCallback(func) {
            const caller = (e) => func(e.detail.id);
            this.listeners.push(caller);
            this._clientInstance?.addEventListener("onOtherConnection", caller);
        }
        addOnLeaderChangeCallback(func) {
            const caller = (e) => func(e.detail.newLeader, e.detail.formerLeader);
            this.listeners.push(caller);
            this._clientInstance?.addEventListener("onNewLeader", caller);
        }
        clean() {
            for (const f of this.listeners) {
                this._clientInstance?.removeEventListener("onDisconnection", f);
                this._clientInstance?.removeEventListener("onOtherDisconnection", f);
                this._clientInstance?.removeEventListener("onOtherConnection", f);
                this._clientInstance?.removeEventListener("onNewLeader", f);
            }
        }
        listConnectedIds() {
            //console.log("debug", this._connectedUsersData, this._connectedUsersData.keys(), Array.from(this._connectedUsersData.keys()))
            return Array.from(this._connectedUsersData.keys());
        }
        getUserInfo(id) {
            if (this._clientInstance) {
                const nameColor = this._clientInstance.getUserInfo(id);
                const connectedUserData = this._connectedUsersData.get(id);
                return { ...connectedUserData, ...nameColor };
            }
        }
        getCurrentUserInfo() {
            if (this._clientInstance) {
                return { name: this._clientInstance.name, id: this._clientInstance.id, color: this._clientInstance.color };
            }
            else {
                throw new Error("Collab is not running");
            }
        }
        getLeaderID() {
            if (this._clientInstance) {
                return this._clientInstance.getLeaderID();
            }
            else {
                throw new Error("Collab is not running");
            }
        }
        setLeader(id) {
            if (this._clientInstance) {
                return this._clientInstance.setLeader(id);
            }
            else {
                throw new Error("Collab is not running");
            }
        }
        toggleMute(id, iOnOff) {
            if (this._clientInstance) {
                return this._clientInstance.ToggleMute(id, iOnOff);
            }
            else {
                throw new Error("Collab is not running");
            }
        }
        setUserInfo(id, key, value) {
            if (!this._connectedUsersData.has(id)) {
                console.error("Missing user");
                return;
            }
            this._connectedUsersData.get(id)[key] = value;
        }
        addNetworkMessageListener(channel, callback) {
            if (this._networkMsgListeners.has(channel)) {
                this._networkMsgListeners.get(channel).push(callback);
            }
            else {
                this._networkMsgListeners.set(channel, [callback]);
            }
        }
        addNetworkBinaryListener(channel, callback) {
            if (this._networkBinaryListeners.has(channel)) {
                this._networkBinaryListeners.get(channel).push(callback);
            }
            else {
                this._networkBinaryListeners.set(channel, [callback]);
            }
        }
        isConnectedToNetwork() {
            return this._clientInstance !== undefined;
        }
        sendMessageOverNetwork(channel, msg) {
            if (!this._clientInstance)
                return;
            const tosend = { sender: this._clientInstance.id, channel: channel, payload: msg };
            this._clientInstance.sendMsg(JSON.stringify(tosend));
        }
        syncOverNetwork() {
            if (!this._clientInstance)
                return;
            for (const el of this._lastSentState) {
                const channelBytes = this.encoder.encode(el[0]);
                const senderBytes = this.encoder.encode(this._clientInstance.id);
                const matrixBytes = new Uint8Array(el[1]);
                const extraBytes = 2 + // payload length (Uint16)
                    channelBytes.length + 1 + // channel + channel length (1 byte)
                    senderBytes.length + 1 + // sender + sender length (1 byte)
                    1; // isSync (1 byte)
                const totalLength = matrixBytes.length + extraBytes;
                const result = new Uint8Array(totalLength);
                result.set(matrixBytes, 0);
                let offset = matrixBytes.length;
                // Write 2-byte payload length
                const view = new DataView(result.buffer);
                view.setUint16(offset, matrixBytes.length, true); // little endian
                offset += 2;
                // Write id bytes
                result.set(channelBytes, offset);
                offset += channelBytes.length;
                // Write id length (1 byte)
                result[offset] = channelBytes.length;
                offset += 1;
                // Write sender bytes
                result.set(senderBytes, offset);
                offset += senderBytes.length;
                // Write sender length (1 byte)
                result[offset] = senderBytes.length;
                offset += 1;
                view.setUint8(offset, 1); //this is a sync, not a diff;
                this._clientInstance.sendBinary(result);
            }
        }
        sendUpdateOverNetwork(channel, msg) {
            if (!this._clientInstance)
                return;
            const channelBytes = this.encoder.encode(channel);
            const senderBytes = this.encoder.encode(this._clientInstance.id);
            let matrixBytes;
            let isSync = 0;
            if (!this._lastSentState.has(channel)) {
                matrixBytes = new Uint8Array(msg);
                isSync = 1;
            }
            else {
                const tmp = this.encodeChanges(msg, this._lastSentState.get(channel));
                if (tmp[1] === false) {
                    return;
                }
                matrixBytes = new Uint8Array(tmp[0]);
                //console.log("encoded msg", matrixBytes)
                //matrixBytes = new Uint8Array(this.xorBuffers(msg, this._lastSentState.get(channel)!));
                //console.log(matrixBytes)
            }
            this._lastSentState.set(channel, msg);
            const extraBytes = 2 + // payload length (Uint16)
                channelBytes.length + 1 + // channel + channel length (1 byte)
                senderBytes.length + 1 + // sender + sender length (1 byte)
                1; // isSync (1 byte)
            const totalLength = matrixBytes.length + extraBytes;
            const result = new Uint8Array(totalLength);
            result.set(matrixBytes, 0);
            let offset = matrixBytes.length;
            // Write 2-byte payload length
            const view = new DataView(result.buffer);
            view.setUint16(offset, matrixBytes.length, true); // little endian
            offset += 2;
            // Write id bytes
            result.set(channelBytes, offset);
            offset += channelBytes.length;
            // Write id length (1 byte)
            result[offset] = channelBytes.length;
            offset += 1;
            // Write sender bytes
            result.set(senderBytes, offset);
            offset += senderBytes.length;
            // Write sender length (1 byte)
            result[offset] = senderBytes.length;
            offset += 1;
            view.setUint8(offset, isSync); //this is not a sync, it's a diff
            /*// === DEBUG BACKWARD READ ===
            {
                let cursor = result.length;
        
                // senderLength (1 byte)
                cursor -= 1;
                const senderLength = result[cursor];
        
                // senderBytes
                cursor -= senderLength;
                const senderBytesDecoded = result.slice(cursor, cursor + senderLength);
                const sender = new TextDecoder().decode(senderBytesDecoded);
        
                // idLength (1 byte)
                cursor -= 1;
                const idLength = result[cursor];
        
                // idBytes
                cursor -= idLength;
                const idBytesDecoded = result.slice(cursor, cursor + idLength);
                const id = new TextDecoder().decode(idBytesDecoded);
        
                // matrix payload length
                cursor -= 2;
                const payloadLength = new DataView(result.buffer).getUint16(cursor, true);
        
                console.log("Decoded id:", id);
                console.log("Decoded sender:", sender);
                console.log("Payload length:", payloadLength);
                console.log("Sender length:", senderLength, "raw:", senderBytesDecoded);
                console.log("ID length:", idLength, "raw:", idBytesDecoded);
            }*/
            this._clientInstance.sendBinary(result);
        }
        encodeChanges(currBuffer, prevBuffer) {
            const currBytes = new Uint8Array(currBuffer);
            const prevBytes = new Uint8Array(prevBuffer);
            const length = Math.min(currBytes.length, prevBytes.length);
            const changes = [];
            let has_changes = false;
            for (let i = 0; i < length; i++) {
                if (currBytes[i] !== prevBytes[i]) {
                    has_changes = true;
                    changes.push({ index: i, value: currBytes[i] });
                }
            }
            for (let i = length; i < currBytes.length; i++) {
                has_changes = true;
                changes.push({ index: i, value: currBytes[i] });
            }
            if (currBytes.length !== prevBytes.length) {
                has_changes = true;
            }
            const count = changes.length;
            const totalBytes = 4 + 4 + count * 5; // 4 for count, 4 for new length, 5 per change
            const buffer = new ArrayBuffer(totalBytes);
            const view = new DataView(buffer);
            view.setUint32(0, count, true);
            view.setUint32(4, currBytes.length, true); // encode new buffer length
            let offset = 8;
            for (const change of changes) {
                view.setUint32(offset, change.index, true);
                view.setUint8(offset + 4, change.value);
                offset += 5;
            }
            return [buffer, has_changes];
        }
        decodeChanges(prevBuffer, changesBuffer) {
            const changesView = new DataView(changesBuffer);
            const count = changesView.getUint32(0, true);
            const newLength = changesView.getUint32(4, true);
            const resultBytes = new Uint8Array(newLength);
            const prevBytes = new Uint8Array(prevBuffer);
            // Copy overlapping part of prevBuffer
            const minLength = Math.min(prevBytes.length, newLength);
            for (let i = 0; i < minLength; i++) {
                resultBytes[i] = prevBytes[i];
            }
            // Apply changes
            let offset = 8;
            for (let i = 0; i < count; i++) {
                const index = changesView.getUint32(offset, true);
                const value = changesView.getUint8(offset + 4);
                resultBytes[index] = value;
                offset += 5;
            }
            return resultBytes.buffer;
        }
    }
    exports.WebVisuXRToolkitCollabManager = WebVisuXRToolkitCollabManager;
});
