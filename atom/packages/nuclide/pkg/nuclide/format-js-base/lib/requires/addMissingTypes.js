

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var FirstNode = require('../utils/FirstNode');

var getUndeclaredTypes = require('../utils/getUndeclaredTypes');
var jscs = require('jscodeshift');

var statement = jscs.template.statement;

function addMissingTypes(root, options) {
  var first = FirstNode.get(root);
  if (!first) {
    return;
  }
  var _first = first; // For flow.

  var moduleMap = options.moduleMap;

  var requireOptions = {
    sourcePath: options.sourcePath,
    typeImport: true
  };

  getUndeclaredTypes(root, options).forEach(function (name) {
    var node = moduleMap.getRequire(name, requireOptions);
    _first.insertBefore(node);
  });
}

module.exports = addMissingTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZE1pc3NpbmdUeXBlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBY0EsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRWhELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDbEUsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztJQUU3QixTQUFTLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBMUIsU0FBUzs7QUFFaEIsU0FBUyxlQUFlLENBQUMsSUFBZ0IsRUFBRSxPQUFzQixFQUFRO0FBQ3ZFLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMsTUFBSSxDQUFDLEtBQUssRUFBRTtBQUNWLFdBQU87R0FDUjtBQUNELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQzs7TUFFZCxTQUFTLEdBQUksT0FBTyxDQUFwQixTQUFTOztBQUNoQixNQUFNLGNBQWMsR0FBRztBQUNyQixjQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7QUFDOUIsY0FBVSxFQUFFLElBQUk7R0FDakIsQ0FBQzs7QUFFRixvQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFFBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3hELFVBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0IsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMiLCJmaWxlIjoiYWRkTWlzc2luZ1R5cGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbGxlY3Rpb259IGZyb20gJy4uL3R5cGVzL2FzdCc7XG5pbXBvcnQgdHlwZSB7U291cmNlT3B0aW9uc30gZnJvbSAnLi4vb3B0aW9ucy9Tb3VyY2VPcHRpb25zJztcblxuY29uc3QgRmlyc3ROb2RlID0gcmVxdWlyZSgnLi4vdXRpbHMvRmlyc3ROb2RlJyk7XG5cbmNvbnN0IGdldFVuZGVjbGFyZWRUeXBlcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldFVuZGVjbGFyZWRUeXBlcycpO1xuY29uc3QganNjcyA9IHJlcXVpcmUoJ2pzY29kZXNoaWZ0Jyk7XG5cbmNvbnN0IHtzdGF0ZW1lbnR9ID0ganNjcy50ZW1wbGF0ZTtcblxuZnVuY3Rpb24gYWRkTWlzc2luZ1R5cGVzKHJvb3Q6IENvbGxlY3Rpb24sIG9wdGlvbnM6IFNvdXJjZU9wdGlvbnMpOiB2b2lkIHtcbiAgY29uc3QgZmlyc3QgPSBGaXJzdE5vZGUuZ2V0KHJvb3QpO1xuICBpZiAoIWZpcnN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IF9maXJzdCA9IGZpcnN0OyAvLyBGb3IgZmxvdy5cblxuICBjb25zdCB7bW9kdWxlTWFwfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHJlcXVpcmVPcHRpb25zID0ge1xuICAgIHNvdXJjZVBhdGg6IG9wdGlvbnMuc291cmNlUGF0aCxcbiAgICB0eXBlSW1wb3J0OiB0cnVlLFxuICB9O1xuXG4gIGdldFVuZGVjbGFyZWRUeXBlcyhyb290LCBvcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBtb2R1bGVNYXAuZ2V0UmVxdWlyZShuYW1lLCByZXF1aXJlT3B0aW9ucyk7XG4gICAgX2ZpcnN0Lmluc2VydEJlZm9yZShub2RlKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTWlzc2luZ1R5cGVzO1xuIl19