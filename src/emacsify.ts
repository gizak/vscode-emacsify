import * as vscode from 'vscode';

/**
 * Emacs
 */
export class Emacs {
	private minibuf: vscode.StatusBarItem;

	constructor() {
		this.minibuf = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

		vscode.window.onDidChangeTextEditorSelection((e) => {
			this.clearMiniBuf();
		});

		this.updateMiniBuf("Emacs mode activated !");
	}

	clearMiniBuf() {
		this.minibuf.text = "";
		this.minibuf.hide();
	}

	updateMiniBuf(tx: string) {
		this.minibuf.text = tx;
		this.minibuf.show();
	}

	killLine(editor: vscode.TextEditor, edit: vscode.TextEditorEdit): void {
		let cursor = editor.selection.active
		let txrange = editor.document.lineAt(cursor.line).range;
		let nlCursor = new vscode.Position(cursor.line + 1, 0);
		// If used at the end of a line, 
		// it kills the line-ending newline character, 
		// merging the next line into the current one.
		if (cursor.isEqual(txrange.end) && nlCursor.line < editor.document.lineCount) {
			edit.delete(new vscode.Range(cursor, nlCursor));
		} else {
			// Otherwise, kills all the text from point up to the end of the line.
			edit.delete(new vscode.Range(cursor, txrange.end));
		}
	}

	killBuffer(editor: vscode.TextEditor, edit: vscode.TextEditorEdit): void {

	}

	isearchForward(context) {
		return vscode.commands.executeCommand(
			!context.context.findWidgetVisible ? "actions.find" : "editor.action.nextMatchFindAction");
	}

	isearchBackward(context) {
		return vscode.commands.executeCommand(
			!context.context.findWidgetVisible ? "actions.find" : "editor.action.previousMatchFindAction");
	}
	dispose() {
		this.minibuf.dispose();
	}
}