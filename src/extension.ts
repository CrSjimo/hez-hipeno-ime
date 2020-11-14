// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { trie } from './core';
import { inputCallback } from './input_callback';
export let enabled = {enabled:false};
export let suspended = {suspended:false};
export let mode:{mode: 'Latin'|'Ελληνικά'} = {mode: 'Latin'};
let statusBarItem:vscode.StatusBarItem;
function toggle(){
	if(enabled.enabled==false){
		enabled.enabled = true;
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
		statusBarItem.text = 'hez xipenó';
		statusBarItem.command = 'extension.toggle';
		statusBarItem.show();
	}else{
		enabled.enabled = false;
		statusBarItem!.dispose();
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	context.subscriptions.push(

		vscode.commands.registerCommand('extension.toggle', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			toggle();
		}),

		vscode.commands.registerCommand('extension.start',()=>{
			vscode.workspace.onDidChangeTextDocument((event)=>{
				console.log(JSON.stringify(event.contentChanges));
				if(!enabled.enabled)return;
				if(event.contentChanges[0].text.length != 1)return;
				if(!trie.buffer && event.contentChanges[0].text!='w')return;
				let res = trie.input(event.contentChanges[0].text);
				let editor = vscode.window.activeTextEditor;
				if(!editor)return;
				if(!suspended.suspended){
					if(res.type == 'pending'){
						editor.edit((editBuilder)=>{
							for(let change of event.contentChanges){
								let range = new vscode.Range(change.range.start,change.range.start.translate(0,1));
								editBuilder.delete(range);
							}
						});
					}else if(res.type == 'success'){
						let char = res.callback();
						if(!char)return;
						editor.edit((editBuilder)=>{
							for(let change of event.contentChanges){
								let range = new vscode.Range(change.range.start,change.range.start.translate(0,1));
								editBuilder.replace(range,char!);
							}
						}).then(()=>{
							editor!.selection = new vscode.Selection(editor!.selection.end,editor!.selection.end);
						});
					}
				}
					
				
			});
		})
	)
}

// this method is called when your extension is deactivated
export function deactivate() {}
