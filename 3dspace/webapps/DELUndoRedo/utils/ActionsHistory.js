/// <amd-module name="DS/DELUndoRedo/utils/ActionsHistory"/>
define("DS/DELUndoRedo/utils/ActionsHistory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionsHistory = void 0;
    class ActionsHistory {
        get historyStack() { return this._historyStack; }
        ;
        get historyIndex() { return this._historyIndex; }
        ;
        get historyMaxSize() { return this._historyMaxSize; }
        ;
        constructor(maxHistorySize) {
            this._queuedTransactionsOrder = [];
            this._queuedTransactions = new Map();
            this._historyStack = [];
            this._historyIndex = 0;
            this._historyMaxSize = maxHistorySize;
        }
        canUndo() {
            return this._historyIndex > 0 && this._historyStack.length > 0;
        }
        canRedo() {
            return this._historyIndex <= this._historyStack.length - 1;
        }
        beginTransaction() {
            const newTransactionId = this.generateTransactionId();
            this._queuedTransactions.set(newTransactionId, { status: "ongoing", history: [] });
            this._queuedTransactionsOrder.push(newTransactionId);
            return newTransactionId;
        }
        abortTransaction(transactionId) {
            const transactionToabort = this._queuedTransactions.get(transactionId);
            if (!transactionToabort)
                return null;
            else {
                this._queuedTransactions.delete(transactionId);
                this._queuedTransactionsOrder = this._queuedTransactionsOrder.filter((id) => id === transactionId);
                return transactionToabort.history;
            }
        }
        commitTransaction(transactionId) {
            const transactionToCommit = this._queuedTransactions.get(transactionId);
            if (!transactionToCommit)
                return;
            if (transactionId === this._queuedTransactionsOrder[0]) {
                this._queuedTransactionsOrder.shift();
                this.resetUndoRedoHistory();
                if (transactionToCommit.history.length > 0) {
                    this._historyStack.push(transactionToCommit.history);
                    this.checkHistorySize();
                    this._historyIndex = this._historyStack.length; // reset the index
                }
                this._queuedTransactions.delete(transactionId);
                if (this._queuedTransactionsOrder.length > 0) {
                    const nextTransactionToCommit = this._queuedTransactions.get(this._queuedTransactionsOrder[0]);
                    if ((nextTransactionToCommit === null || nextTransactionToCommit === void 0 ? void 0 : nextTransactionToCommit.status) === "committed")
                        this.commitTransaction(this._queuedTransactionsOrder[0]);
                }
            }
            else {
                // console.log("wait for the first transaction to end");
                this._queuedTransactions.set(transactionId, { ...transactionToCommit, status: "committed" });
            }
        }
        undoAction() {
            if (this._historyStack.length == 0 || this._historyIndex < 1)
                return null;
            this._historyIndex--;
            const undoRecord = this._historyStack[this._historyIndex];
            return undoRecord;
        }
        redoAction() {
            if (this._historyIndex === this._historyStack.length || this._historyIndex < 0)
                return null;
            const redoRecord = this._historyStack[this._historyIndex];
            this._historyIndex++;
            return redoRecord;
        }
        resetUndoRedoHistory() {
            if (this._historyIndex === this._historyStack.length)
                return;
            this._historyStack.splice(this._historyIndex, this._historyStack.length - 1);
        }
        saveAction(record) {
            if (record.transactionId) {
                const recordTransaction = this._queuedTransactions.get(record.transactionId);
                if (recordTransaction) {
                    this._queuedTransactions.set(record.transactionId, { ...recordTransaction, history: [...recordTransaction.history, record] });
                }
                else {
                    console.log("transaction not found");
                }
            }
            else {
                if (this._queuedTransactionsOrder.length === 0) {
                    this.resetUndoRedoHistory();
                    this._historyStack.push([record]);
                    this.checkHistorySize();
                    this._historyIndex = this._historyStack.length; // reset the index
                }
                else {
                    const newTransactionId = this.generateTransactionId();
                    this._queuedTransactions.set(newTransactionId, { status: "committed", history: [record] });
                    this._queuedTransactionsOrder.push(newTransactionId);
                    // console.log("sync with async case", [...this._queuedTransactionsOrder]);
                }
            }
        }
        checkHistorySize() {
            if (this._historyStack.length > this._historyMaxSize) {
                this._historyStack = Array.from(this._historyStack);
                this._historyStack.shift(); // check the history size
            }
        }
        clearHistory() {
            this._historyStack = [];
            this._queuedTransactions = new Map();
            this._queuedTransactionsOrder = [];
            this._historyIndex = 0;
        }
        generateTransactionId() {
            let newTransactionId = Math.floor(Math.random() * 90).toString() + new Date().getMilliseconds();
            while (this._queuedTransactionsOrder.includes(newTransactionId)) {
                newTransactionId = Math.floor(Math.random() * 90).toString() + new Date().getMilliseconds();
            }
            return newTransactionId;
        }
    }
    exports.ActionsHistory = ActionsHistory;
});
