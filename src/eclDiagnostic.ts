import * as vscode from "vscode";

export let eclDiagnosticCollection: vscode.DiagnosticCollection;

let eclDiagnostic: ECLDiagnostic;
export class ECLDiagnostic {
    _ctx: vscode.ExtensionContext;

    private constructor(ctx: vscode.ExtensionContext) {
        this._ctx = ctx;
        eclDiagnosticCollection = vscode.languages.createDiagnosticCollection("ecl");
        ctx.subscriptions.push(eclDiagnosticCollection);
        vscode.workspace.onDidCloseTextDocument(event => {
            eclDiagnosticCollection.delete(event.uri);
        }, null, this._ctx.subscriptions);
    }

    static attach(ctx: vscode.ExtensionContext): ECLDiagnostic {
        if (!eclDiagnostic) {
            eclDiagnostic = new ECLDiagnostic(ctx);
        }
        return eclDiagnostic;
    }
}