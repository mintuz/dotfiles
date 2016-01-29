

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var flatten = require('../../utils/flatten');
var markers = require('../../constants/markers');

function printIdentifier(print, node) {
  return flatten([node.name, node.typeAnnotation ? print(node.typeAnnotation) : markers.empty]);
}

module.exports = printIdentifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW50SWRlbnRpZmllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBY0EsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDL0MsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0FBRW5ELFNBQVMsZUFBZSxDQUFDLEtBQVksRUFBRSxJQUFnQixFQUFTO0FBQzlELFNBQVEsT0FBTyxDQUFDLENBQ2QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FDakUsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMiLCJmaWxlIjoicHJpbnRJZGVudGlmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHR5cGUge0lkZW50aWZpZXJ9IGZyb20gJ2FzdC10eXBlcy1mbG93JztcbmltcG9ydCB0eXBlIHtMaW5lcywgUHJpbnR9IGZyb20gJy4uLy4uL3R5cGVzL2NvbW1vbic7XG5cbmNvbnN0IGZsYXR0ZW4gPSByZXF1aXJlKCcuLi8uLi91dGlscy9mbGF0dGVuJyk7XG5jb25zdCBtYXJrZXJzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL21hcmtlcnMnKTtcblxuZnVuY3Rpb24gcHJpbnRJZGVudGlmaWVyKHByaW50OiBQcmludCwgbm9kZTogSWRlbnRpZmllcik6IExpbmVzIHtcbiAgcmV0dXJuICBmbGF0dGVuKFtcbiAgICBub2RlLm5hbWUsXG4gICAgbm9kZS50eXBlQW5ub3RhdGlvbiA/IHByaW50KG5vZGUudHlwZUFubm90YXRpb24pIDogbWFya2Vycy5lbXB0eSxcbiAgXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJpbnRJZGVudGlmaWVyO1xuIl19