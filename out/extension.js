"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.enabled = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const input_callback_1 = require("./input_callback");
exports.enabled = { enabled: false };
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.text = 'Enable HHBÏM';
    statusBarItem.command = 'extension.toggle';
    statusBarItem.show();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.toggle', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        if (exports.enabled.enabled == false) {
            exports.enabled.enabled = true;
            statusBarItem.text = 'Disable HHBÏM';
        }
        else {
            exports.enabled.enabled = false;
            statusBarItem.text = 'Enable HHBÏM';
        }
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.commands.registerCommand('extension.start', () => {
        vscode.workspace.onDidChangeTextDocument((event) => {
            if (exports.enabled.enabled) {
                let editor = vscode.window.activeTextEditor;
                let text = editor.document.lineAt(vscode.window.activeTextEditor.document.lineCount - 1).text;
                let res = input_callback_1.inputCallback(text);
                if (res) {
                    let offset = res.s.length;
                    let value = res.t;
                    let RPos = editor.selection.start.translate(0, 1);
                    let LPos = RPos.translate(0, -offset);
                    if (editor.document.getText(new vscode.Range(LPos, RPos)) != '') {
                        editor.edit((editBuilder) => {
                            editBuilder.replace(new vscode.Range(LPos, RPos), value);
                        }).then(() => {
                            if (!editor.selection.end.isEqual(editor.selection.start)) {
                                editor.edit((editBuilder) => {
                                    editBuilder.delete(editor.selection);
                                });
                            }
                        });
                    }
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