'use strict';

import * as vscode from 'vscode';
import * as em from './emacsify';

export function activate(context: vscode.ExtensionContext) {
	let emacs = new em.Emacs();
	vscode.commands.registerTextEditorCommand("emacsify.killLine", emacs.killLine);
	vscode.commands.registerTextEditorCommand("emacsify.killBuffer", emacs.killBuffer);
	vscode.commands.registerCommand("emacsify.isearchForward", emacs.isearchForward);
	vscode.commands.registerCommand("emacsify.isearchBackward", emacs.isearchBackward);
	context.subscriptions.push(emacs);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("Emacsify deactivated");
}