"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.toggleMode = exports.toggleSuspend = exports.toggle = exports.mode = exports.suspended = exports.enabled = void 0;
const vscode = require("vscode");
const convert_1 = require("./convert");
const core_1 = require("./core");
exports.enabled = { enabled: false };
exports.suspended = { suspended: false };
exports.mode = { mode: 'Latin' };
let statusBarItem;
let bufferStatus;
function toggle() {
    exports.enabled.enabled = !exports.enabled.enabled;
    if (exports.enabled.enabled == true) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        statusBarItem.text = 'hez xipenó';
        statusBarItem.command = 'extension.toggle';
        statusBarItem.show();
        bufferStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -114514);
        bufferStatus.show();
    }
    else {
        statusBarItem.dispose();
        bufferStatus.dispose();
    }
    toggleMode();
    toggleMode();
}
exports.toggle = toggle;
function toggleSuspend() {
    if (!exports.enabled.enabled)
        return;
    exports.suspended.suspended = !exports.suspended.suspended;
    if (exports.suspended.suspended == true) {
        statusBarItem.text += ' (suspended)';
    }
    else {
        statusBarItem.text = statusBarItem.text.replace(' (suspended)', '');
    }
}
exports.toggleSuspend = toggleSuspend;
function toggleMode() {
    if (exports.mode.mode == 'Latin') {
        exports.mode.mode = 'Ελληνικά';
        if (exports.enabled.enabled)
            statusBarItem.text = 'ηεζ χιπενό';
    }
    else if (exports.mode.mode == 'Ελληνικά') {
        exports.mode.mode = 'Latin';
        if (exports.enabled.enabled)
            statusBarItem.text = 'hez xipenó';
    }
    if (exports.suspended.suspended == true) {
        if (exports.enabled.enabled)
            statusBarItem.text += ' (suspended)';
    }
}
exports.toggleMode = toggleMode;
function isAlphabetical(char) {
    return /[A-Za-z]/.test(char);
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let editing = false;
    context.subscriptions.push(vscode.commands.registerCommand('extension.toggle', () => {
        toggle();
    }), vscode.commands.registerCommand('extension.suspend', () => {
        toggleSuspend();
    }), vscode.commands.registerCommand('extension.mode', () => {
        toggleMode();
    }), vscode.commands.registerCommand('extension.convert.mode', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        vscode.window.showQuickPick(['Latin', 'Ἐληινικά']).then((value) => {
            if (!value)
                return;
            let selections = editor.selections;
            editing = true;
            editor.edit((editBuilder) => {
                for (let selection of selections) {
                    let text = editor.document.getText(selection);
                    editBuilder.replace(selection, convert_1.convert(text, value));
                }
            }).then(() => {
                editing = false;
            });
        });
    }));
    vscode.workspace.onDidChangeTextDocument((event) => {
        if (editing)
            return;
        console.log(JSON.stringify(event.contentChanges));
        if (!exports.enabled.enabled)
            return;
        if (event.contentChanges[0].text.length != 1)
            return;
        if (exports.mode.mode == 'Latin' && !core_1.trie.buffer && event.contentChanges[0].text != 'w' && event.contentChanges[0].text != 'W')
            return;
        if (!isAlphabetical(event.contentChanges[0].text))
            return;
        let res = core_1.trie.input(event.contentChanges[0].text, exports.suspended.suspended);
        if (bufferStatus.text == '(failed)')
            bufferStatus.text = '';
        if (!exports.suspended.suspended)
            bufferStatus.text += event.contentChanges[0].text;
        let editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        console.log(res);
        if (!exports.suspended.suspended) {
            if (res.type == 'pending') {
                editor.edit((editBuilder) => {
                    for (let change of event.contentChanges) {
                        let range = new vscode.Range(change.range.start, change.range.start.translate(0, 1));
                        editBuilder.delete(range);
                    }
                });
            }
            else if (res.type == 'success') {
                bufferStatus.text = '';
                let char = res.callback();
                if (typeof char != 'string')
                    return;
                if (res.caps) {
                    if (char == 'ς')
                        char = 'Ϲ';
                    else
                        char = char.toUpperCase();
                }
                editing = true;
                editor.edit((editBuilder) => {
                    for (let change of event.contentChanges) {
                        let range = new vscode.Range(change.range.start, change.range.start.translate(0, 1));
                        editBuilder.delete(range);
                        editBuilder.insert(range.start, char);
                    }
                }).then(() => {
                    editing = false;
                });
            }
            else if (res.type == 'fail') {
                bufferStatus.text = '(failed)';
                let char = res.buffer;
                editing = true;
                editor.edit((editBuilder) => {
                    for (let change of event.contentChanges) {
                        let range = new vscode.Range(change.range.start, change.range.start.translate(0, 1));
                        editBuilder.delete(range);
                        editBuilder.insert(range.start, char);
                    }
                }).then(() => {
                    editing = false;
                });
            }
        }
        else {
            if (res.type == 'success') {
                bufferStatus.text = '';
                toggleSuspend();
                editor.edit((editBuilder) => {
                    for (let change of event.contentChanges) {
                        let range = new vscode.Range(change.range.start.translate(0, -1), change.range.start.translate(0, 1));
                        editBuilder.delete(range);
                    }
                });
            }
        }
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map