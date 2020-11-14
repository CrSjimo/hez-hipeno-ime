"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.mode = exports.suspended = exports.enabled = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const core_1 = require("./core");
exports.enabled = { enabled: false };
exports.suspended = { suspended: false };
exports.mode = { mode: 'Latin' };
let statusBarItem;
function toggle() {
    if (exports.enabled.enabled == false) {
        exports.enabled.enabled = true;
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        statusBarItem.text = 'hez xipenó';
        statusBarItem.command = 'extension.toggle';
        statusBarItem.show();
    }
    else {
        exports.enabled.enabled = false;
        statusBarItem.dispose();
    }
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('extension.toggle', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        toggle();
    }), vscode.commands.registerCommand('extension.start', () => {
        vscode.workspace.onDidChangeTextDocument((event) => {
            console.log(JSON.stringify(event.contentChanges));
            if (!exports.enabled.enabled)
                return;
            if (event.contentChanges[0].text.length != 1)
                return;
            if (!core_1.trie.buffer && event.contentChanges[0].text != 'w')
                return;
            let res = core_1.trie.input(event.contentChanges[0].text);
            let editor = vscode.window.activeTextEditor;
            if (!editor)
                return;
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
                    let char = res.callback();
                    if (!char)
                        return;
                    editor.edit((editBuilder) => {
                        for (let change of event.contentChanges) {
                            let range = new vscode.Range(change.range.start, change.range.start.translate(0, 1));
                            editBuilder.replace(range, char);
                        }
                    }).then(() => {
                        editor.selection = new vscode.Selection(editor.selection.end, editor.selection.end);
                    });
                }
            }
        });
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map