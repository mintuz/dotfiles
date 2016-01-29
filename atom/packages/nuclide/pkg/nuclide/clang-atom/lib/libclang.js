var _remoteConnection = require('../../remote-connection');

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

module.exports = {

  getDiagnostics: function getDiagnostics(editor) {
    var src = editor.getPath();
    var contents = editor.getText();

    return (0, _remoteConnection.getServiceByNuclideUri)('ClangService', src).compile(src, contents).toPromise();
  },

  getCompletions: function getCompletions(editor, prefix) {
    var src = editor.getPath();
    var cursor = editor.getLastCursor();

    var line = cursor.getBufferRow();
    var column = cursor.getBufferColumn();
    var tokenStartColumn = column - prefix.length;

    return (0, _remoteConnection.getServiceByNuclideUri)('ClangService', src).getCompletions(src, editor.getText(), line, column, tokenStartColumn, prefix);
  },

  /**
   * If a location can be found for the declaration, it will be available via
   * the 'location' field on the returned object.
   */
  getDeclaration: function getDeclaration(editor, line, column) {
    var src = editor.getPath();
    return (0, _remoteConnection.getServiceByNuclideUri)('ClangService', src).getDeclaration(src, editor.getText(), line, column);
  },

  reset: function reset(editor) {
    var src = editor.getPath();
    if (src != null) {
      return (0, _remoteConnection.getServiceByNuclideUri)('ClangService', src).reset(src);
    }
  }

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYmNsYW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJnQ0FpQnFDLHlCQUF5Qjs7Ozs7Ozs7OztBQUU5RCxNQUFNLENBQUMsT0FBTyxHQUFHOztBQUVmLGdCQUFjLEVBQUEsd0JBQUMsTUFBdUIsRUFBZ0M7QUFDcEUsUUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLFFBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFbEMsV0FBTyw4Q0FBdUIsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUM3QyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUN0QixTQUFTLEVBQUUsQ0FBQztHQUNsQjs7QUFFRCxnQkFBYyxFQUFBLHdCQUFDLE1BQXVCLEVBQUUsTUFBYyxFQUFvQztBQUN4RixRQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsUUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDOztBQUV0QyxRQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDbkMsUUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3hDLFFBQU0sZ0JBQWdCLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0FBRWhELFdBQU8sOENBQXVCLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FDN0MsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztHQUNwRjs7Ozs7O0FBTUQsZ0JBQWMsRUFBQSx3QkFDWixNQUF1QixFQUN2QixJQUFZLEVBQ1osTUFBYyxFQUNvQjtBQUNsQyxRQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsV0FBTyw4Q0FBdUIsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUM3QyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7R0FDMUQ7O0FBRUQsT0FBSyxFQUFBLGVBQUMsTUFBdUIsRUFBRTtBQUM3QixRQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsUUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO0FBQ2YsYUFBTyw4Q0FBdUIsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUMvQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDZjtHQUNGOztDQUVGLENBQUMiLCJmaWxlIjoibGliY2xhbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7XG4gIENsYW5nQ29tcGlsZVJlc3VsdCxcbiAgQ2xhbmdDb21wbGV0aW9uc1Jlc3VsdCxcbiAgQ2xhbmdEZWNsYXJhdGlvblJlc3VsdCxcbn0gZnJvbSAnLi4vLi4vY2xhbmcnO1xuXG5pbXBvcnQge2dldFNlcnZpY2VCeU51Y2xpZGVVcml9IGZyb20gJy4uLy4uL3JlbW90ZS1jb25uZWN0aW9uJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZ2V0RGlhZ25vc3RpY3MoZWRpdG9yOiBhdG9tJFRleHRFZGl0b3IpOiBQcm9taXNlPD9DbGFuZ0NvbXBpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCBzcmMgPSBlZGl0b3IuZ2V0UGF0aCgpO1xuICAgIGNvbnN0IGNvbnRlbnRzID0gZWRpdG9yLmdldFRleHQoKTtcblxuICAgIHJldHVybiBnZXRTZXJ2aWNlQnlOdWNsaWRlVXJpKCdDbGFuZ1NlcnZpY2UnLCBzcmMpXG4gICAgICAgIC5jb21waWxlKHNyYywgY29udGVudHMpXG4gICAgICAgIC50b1Byb21pc2UoKTtcbiAgfSxcblxuICBnZXRDb21wbGV0aW9ucyhlZGl0b3I6IGF0b20kVGV4dEVkaXRvciwgcHJlZml4OiBzdHJpbmcpOiBQcm9taXNlPD9DbGFuZ0NvbXBsZXRpb25zUmVzdWx0PiB7XG4gICAgY29uc3Qgc3JjID0gZWRpdG9yLmdldFBhdGgoKTtcbiAgICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0TGFzdEN1cnNvcigpO1xuXG4gICAgY29uc3QgbGluZSA9IGN1cnNvci5nZXRCdWZmZXJSb3coKTtcbiAgICBjb25zdCBjb2x1bW4gPSBjdXJzb3IuZ2V0QnVmZmVyQ29sdW1uKCk7XG4gICAgY29uc3QgdG9rZW5TdGFydENvbHVtbiA9IGNvbHVtbiAtIHByZWZpeC5sZW5ndGg7XG5cbiAgICByZXR1cm4gZ2V0U2VydmljZUJ5TnVjbGlkZVVyaSgnQ2xhbmdTZXJ2aWNlJywgc3JjKVxuICAgICAgICAuZ2V0Q29tcGxldGlvbnMoc3JjLCBlZGl0b3IuZ2V0VGV4dCgpLCBsaW5lLCBjb2x1bW4sIHRva2VuU3RhcnRDb2x1bW4sIHByZWZpeCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIElmIGEgbG9jYXRpb24gY2FuIGJlIGZvdW5kIGZvciB0aGUgZGVjbGFyYXRpb24sIGl0IHdpbGwgYmUgYXZhaWxhYmxlIHZpYVxuICAgKiB0aGUgJ2xvY2F0aW9uJyBmaWVsZCBvbiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICAgKi9cbiAgZ2V0RGVjbGFyYXRpb24oXG4gICAgZWRpdG9yOiBhdG9tJFRleHRFZGl0b3IsXG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbHVtbjogbnVtYmVyLFxuICApOiBQcm9taXNlPD9DbGFuZ0RlY2xhcmF0aW9uUmVzdWx0PiB7XG4gICAgY29uc3Qgc3JjID0gZWRpdG9yLmdldFBhdGgoKTtcbiAgICByZXR1cm4gZ2V0U2VydmljZUJ5TnVjbGlkZVVyaSgnQ2xhbmdTZXJ2aWNlJywgc3JjKVxuICAgICAgICAuZ2V0RGVjbGFyYXRpb24oc3JjLCBlZGl0b3IuZ2V0VGV4dCgpLCBsaW5lLCBjb2x1bW4pO1xuICB9LFxuXG4gIHJlc2V0KGVkaXRvcjogYXRvbSRUZXh0RWRpdG9yKSB7XG4gICAgY29uc3Qgc3JjID0gZWRpdG9yLmdldFBhdGgoKTtcbiAgICBpZiAoc3JjICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBnZXRTZXJ2aWNlQnlOdWNsaWRlVXJpKCdDbGFuZ1NlcnZpY2UnLCBzcmMpXG4gICAgICAgIC5yZXNldChzcmMpO1xuICAgIH1cbiAgfSxcblxufTtcbiJdfQ==