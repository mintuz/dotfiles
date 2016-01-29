

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var flatten = require('../../utils/flatten');

function printImportDefaultSpecifier(print, node) {
  return flatten(print(node.local));
}

module.exports = printImportDefaultSpecifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW50SW1wb3J0RGVmYXVsdFNwZWNpZmllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBY0EsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRS9DLFNBQVMsMkJBQTJCLENBQ2xDLEtBQVksRUFDWixJQUE0QixFQUNyQjtBQUNQLFNBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNuQzs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDIiwiZmlsZSI6InByaW50SW1wb3J0RGVmYXVsdFNwZWNpZmllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtJbXBvcnREZWZhdWx0U3BlY2lmaWVyfSBmcm9tICdhc3QtdHlwZXMtZmxvdyc7XG5pbXBvcnQgdHlwZSB7TGluZXMsIFByaW50fSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuXG5jb25zdCBmbGF0dGVuID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZmxhdHRlbicpO1xuXG5mdW5jdGlvbiBwcmludEltcG9ydERlZmF1bHRTcGVjaWZpZXIoXG4gIHByaW50OiBQcmludCxcbiAgbm9kZTogSW1wb3J0RGVmYXVsdFNwZWNpZmllcixcbik6IExpbmVzIHtcbiAgcmV0dXJuIGZsYXR0ZW4ocHJpbnQobm9kZS5sb2NhbCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50SW1wb3J0RGVmYXVsdFNwZWNpZmllcjtcbiJdfQ==