

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/**
 * This function returns HgRepositoryDescription filled with a repoPath and
 * originURL iff it finds that the given directory is within an Hg repository.
 */
var path = require('path');

function findHgRepository(directoryPath) {
  var fs = require('fs-plus');
  var workingDirectoryPath = directoryPath;
  var repoPath = null;
  var originURL = null;
  /*eslint-disable no-constant-condition */
  while (true) {
    var dirToTest = path.join(workingDirectoryPath, '.hg');
    if (fs.isDirectorySync(dirToTest) && fs.isFileSync(path.join(dirToTest, 'hgrc'))) {
      var ini = require('ini');
      // I'm not quite sure why this header is required, but I copied this
      // from the npm page to make things work: https://www.npmjs.com/package/ini.
      var header = 'scope = global\n';
      var config = ini.parse(header + fs.readFileSync(path.join(dirToTest, 'hgrc')));
      if (typeof config.paths['default'] === 'string') {
        repoPath = dirToTest;
        originURL = config.paths['default'];
        break;
      }
    }

    if (isRootDir(workingDirectoryPath)) {
      break;
    } else {
      workingDirectoryPath = getParentDir(workingDirectoryPath);
    }
  }
  /*eslint-enable no-constant-condition */
  return { repoPath: repoPath, originURL: originURL, workingDirectoryPath: workingDirectoryPath };
}

function isRootDir(directoryPath) {
  var isRoot = require('../../commons').fsPromise.isRoot;

  return isRoot(directoryPath);
}

function getParentDir(directoryPath) {
  return path.resolve(directoryPath, '..');
}

module.exports = findHgRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhnLXJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFXQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBUTdCLFNBQVMsZ0JBQWdCLENBQUMsYUFBcUIsRUFBMkI7QUFDeEUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLE1BQUksb0JBQW9CLEdBQUcsYUFBYSxDQUFDO0FBQ3pDLE1BQUksUUFBUSxHQUFHLElBQUksQ0FBQztBQUNwQixNQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBRXJCLFNBQU8sSUFBSSxFQUFFO0FBQ1gsUUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6RCxRQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUMvQyxVQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQUczQixVQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztBQUNsQyxVQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FDM0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQsVUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLFdBQVEsS0FBSyxRQUFRLEVBQUU7QUFDNUMsZ0JBQVEsR0FBRyxTQUFTLENBQUM7QUFDckIsaUJBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxXQUFRLENBQUM7QUFDakMsY0FBTTtPQUNQO0tBQ0Y7O0FBRUQsUUFBSSxTQUFTLENBQUMsb0JBQW9CLENBQUMsRUFBRTtBQUNuQyxZQUFNO0tBQ1AsTUFBTTtBQUNMLDBCQUFvQixHQUFHLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQzNEO0dBQ0Y7O0FBRUQsU0FBTyxFQUFDLFFBQVEsRUFBUixRQUFRLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxvQkFBb0IsRUFBcEIsb0JBQW9CLEVBQUMsQ0FBQztDQUNwRDs7QUFFRCxTQUFTLFNBQVMsQ0FBQyxhQUFxQixFQUFXO01BQzFDLE1BQU0sR0FBSSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUE1QyxNQUFNOztBQUNiLFNBQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQzlCOztBQUVELFNBQVMsWUFBWSxDQUFDLGFBQXFCLEVBQVU7QUFDbkQsU0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMxQzs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDIiwiZmlsZSI6ImhnLXJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5pbXBvcnQgdHlwZSB7SGdSZXBvc2l0b3J5RGVzY3JpcHRpb259IGZyb20gJy4vbWFpbic7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIEhnUmVwb3NpdG9yeURlc2NyaXB0aW9uIGZpbGxlZCB3aXRoIGEgcmVwb1BhdGggYW5kXG4gKiBvcmlnaW5VUkwgaWZmIGl0IGZpbmRzIHRoYXQgdGhlIGdpdmVuIGRpcmVjdG9yeSBpcyB3aXRoaW4gYW4gSGcgcmVwb3NpdG9yeS5cbiAqL1xuZnVuY3Rpb24gZmluZEhnUmVwb3NpdG9yeShkaXJlY3RvcnlQYXRoOiBzdHJpbmcpOiBIZ1JlcG9zaXRvcnlEZXNjcmlwdGlvbiB7XG4gIGNvbnN0IGZzID0gcmVxdWlyZSgnZnMtcGx1cycpO1xuICBsZXQgd29ya2luZ0RpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoO1xuICBsZXQgcmVwb1BhdGggPSBudWxsO1xuICBsZXQgb3JpZ2luVVJMID0gbnVsbDtcbiAgLyplc2xpbnQtZGlzYWJsZSBuby1jb25zdGFudC1jb25kaXRpb24gKi9cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBkaXJUb1Rlc3QgPSBwYXRoLmpvaW4od29ya2luZ0RpcmVjdG9yeVBhdGgsICcuaGcnKTtcbiAgICBpZiAoZnMuaXNEaXJlY3RvcnlTeW5jKGRpclRvVGVzdCkgJiZcbiAgICAgICAgZnMuaXNGaWxlU3luYyhwYXRoLmpvaW4oZGlyVG9UZXN0LCAnaGdyYycpKSkge1xuICAgICAgY29uc3QgaW5pID0gcmVxdWlyZSgnaW5pJyk7XG4gICAgICAvLyBJJ20gbm90IHF1aXRlIHN1cmUgd2h5IHRoaXMgaGVhZGVyIGlzIHJlcXVpcmVkLCBidXQgSSBjb3BpZWQgdGhpc1xuICAgICAgLy8gZnJvbSB0aGUgbnBtIHBhZ2UgdG8gbWFrZSB0aGluZ3Mgd29yazogaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvaW5pLlxuICAgICAgY29uc3QgaGVhZGVyID0gJ3Njb3BlID0gZ2xvYmFsXFxuJztcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGluaS5wYXJzZShoZWFkZXIgK1xuICAgICAgICAgIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZGlyVG9UZXN0LCAnaGdyYycpKSk7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5wYXRocy5kZWZhdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXBvUGF0aCA9IGRpclRvVGVzdDtcbiAgICAgICAgb3JpZ2luVVJMID0gY29uZmlnLnBhdGhzLmRlZmF1bHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Jvb3REaXIod29ya2luZ0RpcmVjdG9yeVBhdGgpKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgd29ya2luZ0RpcmVjdG9yeVBhdGggPSBnZXRQYXJlbnREaXIod29ya2luZ0RpcmVjdG9yeVBhdGgpO1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tY29uc3RhbnQtY29uZGl0aW9uICovXG4gIHJldHVybiB7cmVwb1BhdGgsIG9yaWdpblVSTCwgd29ya2luZ0RpcmVjdG9yeVBhdGh9O1xufVxuXG5mdW5jdGlvbiBpc1Jvb3REaXIoZGlyZWN0b3J5UGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHtpc1Jvb3R9ID0gcmVxdWlyZSgnLi4vLi4vY29tbW9ucycpLmZzUHJvbWlzZTtcbiAgcmV0dXJuIGlzUm9vdChkaXJlY3RvcnlQYXRoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50RGlyKGRpcmVjdG9yeVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUoZGlyZWN0b3J5UGF0aCwgJy4uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZEhnUmVwb3NpdG9yeTtcbiJdfQ==