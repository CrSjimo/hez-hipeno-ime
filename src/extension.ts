// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { type } from 'os';
import * as vscode from 'vscode';
import { convert } from './convert';
import { trie } from './core';
export let enabled = {enabled:false};
export let suspended = {suspended:false};
export let mode:{mode: 'Latin'|'Ελληνικά'} = {mode: 'Latin'};
let statusBarItem:vscode.StatusBarItem;
let bufferStatus:vscode.StatusBarItem;
export function toggle(){
	enabled.enabled = !enabled.enabled;
	if(enabled.enabled==true){
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
		statusBarItem.text = 'hez xipenó';
		statusBarItem.command = 'extension.toggle';
		statusBarItem.show();
		bufferStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,-114514);
		bufferStatus.show();
	}else{
		statusBarItem!.dispose();
		bufferStatus.dispose();
	}
	toggleMode();toggleMode();
}
export function toggleSuspend(){
	if(!enabled.enabled)return;
	suspended.suspended = !suspended.suspended;
	if(suspended.suspended == true){
		statusBarItem.text += ' (suspended)';
	}else{
		statusBarItem.text = statusBarItem.text.replace(' (suspended)','');
	}
}
export function toggleMode(){
	if(mode.mode=='Latin'){
		mode.mode = 'Ελληνικά';
		if(enabled.enabled)statusBarItem.text = 'ηεζ χιπενό';
	}else if(mode.mode=='Ελληνικά'){
		mode.mode = 'Latin';
		if(enabled.enabled)statusBarItem.text = 'hez xipenó';
	}
	if(suspended.suspended == true){
		if(enabled.enabled)statusBarItem.text += ' (suspended)';
	}
}

function isAlphabetical(char:string){
	return /[A-Za-z]/.test(char);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let editing = false;
	context.subscriptions.push(

		vscode.commands.registerCommand('extension.toggle', () => {
			toggle();
		}),

		vscode.commands.registerCommand('extension.suspend',() => {
			toggleSuspend();
		}),

		vscode.commands.registerCommand('extension.mode',() => {
			toggleMode();
		}),

		vscode.commands.registerCommand('extension.convert.mode',() => {
			let editor = vscode.window.activeTextEditor;
			if(!editor)return;
			vscode.window.showQuickPick(['Latin','Ἐληινικά']).then((value)=>{
				if(!value)return;
				let selections = editor!.selections;
				editing = true;
				editor!.edit((editBuilder)=>{
					for(let selection of selections){
						let text = editor!.document.getText(selection);
						editBuilder.replace(selection,convert(text,value as any));
					}
				}).then(()=>{
					editing = false;
				});
			});
		}),
	);

	vscode.workspace.onDidChangeTextDocument((event)=>{
		if(editing)return;
		console.log(JSON.stringify(event.contentChanges));
		if(!enabled.enabled)return;
		if(event.contentChanges[0].text.length != 1)return;
		if(mode.mode == 'Latin' && !trie.buffer && event.contentChanges[0].text!='w' && event.contentChanges[0].text!='W')return;
		if(!isAlphabetical(event.contentChanges[0].text))return;
		let res = trie.input(event.contentChanges[0].text,suspended.suspended);
		if(bufferStatus.text=='(failed)')bufferStatus.text = '';
		if(!suspended.suspended)bufferStatus.text+=event.contentChanges[0].text;
		let editor = vscode.window.activeTextEditor;
		if(!editor)return;
		console.log(res);
		if(!suspended.suspended){
			if(res.type == 'pending'){
				editor.edit((editBuilder)=>{
					for(let change of event.contentChanges){
						let range = new vscode.Range(change.range.start,change.range.start.translate(0,1));
						editBuilder.delete(range);
					}
				});
			}else if(res.type == 'success'){
				bufferStatus.text = '';
				let char = res.callback();
				if(typeof char != 'string')return;
				if(res.caps){
					if(char == 'ς')char = 'Ϲ';
					else char = char.toUpperCase();
				}
				editing = true;
				editor.edit((editBuilder)=>{
					for(let change of event.contentChanges){
						let range = new vscode.Range(change.range.start,change.range.start.translate(0,1));
						editBuilder.delete(range);
						editBuilder.insert(range.start,char as string);
					}
				}).then(()=>{
					editing = false;
				});
			}else if(res.type == 'fail'){
				bufferStatus.text = '(failed)';
				let char = res.buffer;
				editing = true;
				editor.edit((editBuilder)=>{
					for(let change of event.contentChanges){
						let range = new vscode.Range(change.range.start,change.range.start.translate(0,1));
						editBuilder.delete(range);
						editBuilder.insert(range.start,char as string);
					}
				}).then(()=>{
					editing = false;
				});
			}
		}else{
			if(res.type == 'success'){
				bufferStatus.text = '';
				toggleSuspend();
				editor.edit((editBuilder)=>{
					for(let change of event.contentChanges){
						let range = new vscode.Range(change.range.start.translate(0,-1),change.range.start.translate(0,1));
						editBuilder.delete(range);
					}
				});
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
