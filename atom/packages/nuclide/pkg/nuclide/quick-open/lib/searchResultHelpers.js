Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

exports.filterEmptyResults = filterEmptyResults;
exports.flattenResults = flattenResults;

var isEmpty = require('../../commons').object.isEmpty;

function filterEmptyResults(resultsGroupedByService) {
  var filteredTree = {};

  for (var serviceName in resultsGroupedByService) {
    var directories = resultsGroupedByService[serviceName].results;
    var nonEmptyDirectories = {};
    for (var dirName in directories) {
      if (directories[dirName].results.length) {
        nonEmptyDirectories[dirName] = directories[dirName];
      }
    }
    if (!isEmpty(nonEmptyDirectories)) {
      filteredTree[serviceName] = { results: nonEmptyDirectories };
    }
  }
  return filteredTree;
}

function flattenResults(resultsGroupedByService) {
  var items = [];
  for (var serviceName in resultsGroupedByService) {
    for (var dirName in resultsGroupedByService[serviceName].results) {
      items.push(resultsGroupedByService[serviceName].results[dirName].results);
    }
  }
  return Array.prototype.concat.apply([], items);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaFJlc3VsdEhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBaUJFLE9BQU8sR0FDTCxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQURqQyxPQUFPOztBQUdGLFNBQVMsa0JBQWtCLENBQUMsdUJBQXNDLEVBQWlCO0FBQ3hGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzs7QUFFeEIsT0FBSyxJQUFNLFdBQVcsSUFBSSx1QkFBdUIsRUFBRTtBQUNqRCxRQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDakUsUUFBTSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFDL0IsU0FBSyxJQUFNLE9BQU8sSUFBSSxXQUFXLEVBQUU7QUFDakMsVUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUN2QywyQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDckQ7S0FDRjtBQUNELFFBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRTtBQUNqQyxrQkFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFDLENBQUM7S0FDNUQ7R0FDRjtBQUNELFNBQU8sWUFBWSxDQUFDO0NBQ3JCOztBQUVNLFNBQVMsY0FBYyxDQUFDLHVCQUFzQyxFQUFxQjtBQUN4RixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsT0FBSyxJQUFNLFdBQVcsSUFBSSx1QkFBdUIsRUFBRTtBQUNqRCxTQUFLLElBQU0sT0FBTyxJQUFJLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRTtBQUNsRSxXQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzRTtHQUNGO0FBQ0QsU0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hEIiwiZmlsZSI6InNlYXJjaFJlc3VsdEhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7XG4gIEZpbGVSZXN1bHQsXG4gIEdyb3VwZWRSZXN1bHQsXG59IGZyb20gJy4uLy4uL3F1aWNrLW9wZW4taW50ZXJmYWNlcyc7XG5cbmNvbnN0IHtcbiAgaXNFbXB0eSxcbn0gPSByZXF1aXJlKCcuLi8uLi9jb21tb25zJykub2JqZWN0O1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRW1wdHlSZXN1bHRzKHJlc3VsdHNHcm91cGVkQnlTZXJ2aWNlOiBHcm91cGVkUmVzdWx0KTogR3JvdXBlZFJlc3VsdCB7XG4gIGNvbnN0IGZpbHRlcmVkVHJlZSA9IHt9O1xuXG4gIGZvciAoY29uc3Qgc2VydmljZU5hbWUgaW4gcmVzdWx0c0dyb3VwZWRCeVNlcnZpY2UpIHtcbiAgICBjb25zdCBkaXJlY3RvcmllcyA9IHJlc3VsdHNHcm91cGVkQnlTZXJ2aWNlW3NlcnZpY2VOYW1lXS5yZXN1bHRzO1xuICAgIGNvbnN0IG5vbkVtcHR5RGlyZWN0b3JpZXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGRpck5hbWUgaW4gZGlyZWN0b3JpZXMpIHtcbiAgICAgIGlmIChkaXJlY3Rvcmllc1tkaXJOYW1lXS5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICBub25FbXB0eURpcmVjdG9yaWVzW2Rpck5hbWVdID0gZGlyZWN0b3JpZXNbZGlyTmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNFbXB0eShub25FbXB0eURpcmVjdG9yaWVzKSkge1xuICAgICAgZmlsdGVyZWRUcmVlW3NlcnZpY2VOYW1lXSA9IHtyZXN1bHRzOiBub25FbXB0eURpcmVjdG9yaWVzfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkVHJlZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5SZXN1bHRzKHJlc3VsdHNHcm91cGVkQnlTZXJ2aWNlOiBHcm91cGVkUmVzdWx0KTogQXJyYXk8RmlsZVJlc3VsdD4ge1xuICBjb25zdCBpdGVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IHNlcnZpY2VOYW1lIGluIHJlc3VsdHNHcm91cGVkQnlTZXJ2aWNlKSB7XG4gICAgZm9yIChjb25zdCBkaXJOYW1lIGluIHJlc3VsdHNHcm91cGVkQnlTZXJ2aWNlW3NlcnZpY2VOYW1lXS5yZXN1bHRzKSB7XG4gICAgICBpdGVtcy5wdXNoKHJlc3VsdHNHcm91cGVkQnlTZXJ2aWNlW3NlcnZpY2VOYW1lXS5yZXN1bHRzW2Rpck5hbWVdLnJlc3VsdHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgaXRlbXMpO1xufVxuIl19