// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "html-to-react" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "html-to-react.convert",
    function () {
      // The code you place here will be executed every time your command is executed
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      // var selection = editor.selection;
      // var text = editor.document.getText(selection);

      var firstLine = editor.document.lineAt(0);
      var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
      var textRange = new vscode.Range(
        firstLine.range.start,
        lastLine.range.end
      );

      var text = editor.document.getText(textRange);

      function replaceAll(str, mapObj) {
        var re = new RegExp(Object.keys(mapObj).join("|"), "gi");

        return str.replace(re, (matched) => mapObj[matched.toLowerCase()]);
      }

      var mapObj = {
        "class=": "className=",
        "for=": "htmlFor=",
        "-label": "Label",
        "-rule": "Rule",
        "stroke-l": "strokeL",
        "stroke-w": "strokeW",
        "<!--": "{/*",
        "-->": "*/}",
      };

      var formattedText = replaceAll(text, mapObj);

      // console.log("text", text, formattedText);

      editor.edit((editBuilder) =>
        editBuilder.replace(textRange, formattedText)
      );

      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Your file has just been formatted!"
      );
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
