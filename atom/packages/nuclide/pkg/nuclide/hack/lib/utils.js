function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _remoteConnection = require('../../remote-connection');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var MATCH_PREFIX_CASE_SENSITIVE_SCORE = 6;
var MATCH_PREFIX_CASE_INSENSITIVE_SCORE = 4;
var MATCH_TOKEN_CASE_SENSITIVE_SCORE = 2;
var MATCH_TOKEN_CASE_INSENSITIVE_SCORE = 0;
var MATCH_PRIVATE_FUNCTION_PENALTY = -4;
var MATCH_APLHABETICAL_SCORE = 1;
var HACK_SERVICE_NAME = 'HackService';

function compareHackCompletions(token) {
  var tokenLowerCase = token.toLowerCase();

  return function (matchText1, matchText2) {
    var matchTexts = [matchText1, matchText2];
    var scores = matchTexts.map(function (matchText, i) {
      if (matchText.startsWith(token)) {
        // Matches starting with the prefix gets the highest score.
        return MATCH_PREFIX_CASE_SENSITIVE_SCORE;
      } else if (matchText.toLowerCase().startsWith(tokenLowerCase)) {
        // Ignore case score matches gets a good score.
        return MATCH_PREFIX_CASE_INSENSITIVE_SCORE;
      }

      var score = undefined;
      if (matchText.indexOf(token) !== -1) {
        // Small score for a match that contains the token case-sensitive.
        score = MATCH_TOKEN_CASE_SENSITIVE_SCORE;
      } else {
        // Zero score for a match that contains the token without case-sensitive matching.
        score = MATCH_TOKEN_CASE_INSENSITIVE_SCORE;
      }

      // Private functions gets negative score.
      if (matchText.startsWith('_')) {
        score += MATCH_PRIVATE_FUNCTION_PENALTY;
      }
      return score;
    });
    // Finally, consider the alphabetical order, but not higher than any other score.
    if (matchTexts[0] < matchTexts[1]) {
      scores[0] += MATCH_APLHABETICAL_SCORE;
    } else {
      scores[1] += MATCH_APLHABETICAL_SCORE;
    }
    return scores[1] - scores[0];
  };
}

function getHackService(filePath) {
  var hackRegisteredService = (0, _remoteConnection.getServiceByNuclideUri)(HACK_SERVICE_NAME, filePath);
  (0, _assert2['default'])(hackRegisteredService);
  return hackRegisteredService;
}

module.exports = {
  compareHackCompletions: compareHackCompletions,
  getHackService: getHackService
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Z0NBYXFDLHlCQUF5Qjs7c0JBQ3hDLFFBQVE7Ozs7QUFFOUIsSUFBTSxpQ0FBaUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsSUFBTSxtQ0FBbUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsSUFBTSxnQ0FBZ0MsR0FBRyxDQUFDLENBQUM7QUFDM0MsSUFBTSxrQ0FBa0MsR0FBRyxDQUFDLENBQUM7QUFDN0MsSUFBTSw4QkFBOEIsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQyxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUNuQyxJQUFNLGlCQUFpQixHQUFHLGFBQWEsQ0FBQzs7QUFFeEMsU0FBUyxzQkFBc0IsQ0FBQyxLQUFhLEVBQXNEO0FBQ2pHLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7QUFFM0MsU0FBTyxVQUFDLFVBQVUsRUFBVSxVQUFVLEVBQWE7QUFDakQsUUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUMsUUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUs7QUFDOUMsVUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFOztBQUUvQixlQUFPLGlDQUFpQyxDQUFDO09BQzFDLE1BQU0sSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFOztBQUU3RCxlQUFPLG1DQUFtQyxDQUFDO09BQzVDOztBQUVELFVBQUksS0FBSyxZQUFBLENBQUM7QUFDVixVQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7O0FBRW5DLGFBQUssR0FBRyxnQ0FBZ0MsQ0FBQztPQUMxQyxNQUFNOztBQUVMLGFBQUssR0FBRyxrQ0FBa0MsQ0FBQztPQUM1Qzs7O0FBR0QsVUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLGFBQUssSUFBSSw4QkFBOEIsQ0FBQztPQUN6QztBQUNELGFBQU8sS0FBSyxDQUFDO0tBQ2QsQ0FBQyxDQUFDOztBQUVILFFBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNqQyxZQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksd0JBQXdCLENBQUM7S0FDdkMsTUFBTTtBQUNMLFlBQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSx3QkFBd0IsQ0FBQztLQUN2QztBQUNELFdBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUM5QixDQUFDO0NBQ0g7O0FBRUQsU0FBUyxjQUFjLENBQUMsUUFBb0IsRUFBVTtBQUNwRCxNQUFNLHFCQUFxQixHQUFHLDhDQUF1QixpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRiwyQkFBVSxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2pDLFNBQU8scUJBQXFCLENBQUM7Q0FDOUI7O0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNmLHdCQUFzQixFQUF0QixzQkFBc0I7QUFDdEIsZ0JBQWMsRUFBZCxjQUFjO0NBQ2YsQ0FBQyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtOdWNsaWRlVXJpfSBmcm9tICcuLi8uLi9yZW1vdGUtdXJpJztcblxuaW1wb3J0IHtnZXRTZXJ2aWNlQnlOdWNsaWRlVXJpfSBmcm9tICcuLi8uLi9yZW1vdGUtY29ubmVjdGlvbic7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2Fzc2VydCc7XG5cbmNvbnN0IE1BVENIX1BSRUZJWF9DQVNFX1NFTlNJVElWRV9TQ09SRSA9IDY7XG5jb25zdCBNQVRDSF9QUkVGSVhfQ0FTRV9JTlNFTlNJVElWRV9TQ09SRSA9IDQ7XG5jb25zdCBNQVRDSF9UT0tFTl9DQVNFX1NFTlNJVElWRV9TQ09SRSA9IDI7XG5jb25zdCBNQVRDSF9UT0tFTl9DQVNFX0lOU0VOU0lUSVZFX1NDT1JFID0gMDtcbmNvbnN0IE1BVENIX1BSSVZBVEVfRlVOQ1RJT05fUEVOQUxUWSA9IC00O1xuY29uc3QgTUFUQ0hfQVBMSEFCRVRJQ0FMX1NDT1JFID0gMTtcbmNvbnN0IEhBQ0tfU0VSVklDRV9OQU1FID0gJ0hhY2tTZXJ2aWNlJztcblxuZnVuY3Rpb24gY29tcGFyZUhhY2tDb21wbGV0aW9ucyh0b2tlbjogc3RyaW5nKTogKG1hdGNoVGV4dDE6IHN0cmluZywgbWF0Y2hUZXh0Mjogc3RyaW5nKSA9PiBudW1iZXIge1xuICBjb25zdCB0b2tlbkxvd2VyQ2FzZSA9IHRva2VuLnRvTG93ZXJDYXNlKCk7XG5cbiAgcmV0dXJuIChtYXRjaFRleHQxOiBzdHJpbmcsIG1hdGNoVGV4dDI6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG1hdGNoVGV4dHMgPSBbbWF0Y2hUZXh0MSwgbWF0Y2hUZXh0Ml07XG4gICAgY29uc3Qgc2NvcmVzID0gbWF0Y2hUZXh0cy5tYXAoKG1hdGNoVGV4dCwgaSkgPT4ge1xuICAgICAgaWYgKG1hdGNoVGV4dC5zdGFydHNXaXRoKHRva2VuKSkge1xuICAgICAgICAvLyBNYXRjaGVzIHN0YXJ0aW5nIHdpdGggdGhlIHByZWZpeCBnZXRzIHRoZSBoaWdoZXN0IHNjb3JlLlxuICAgICAgICByZXR1cm4gTUFUQ0hfUFJFRklYX0NBU0VfU0VOU0lUSVZFX1NDT1JFO1xuICAgICAgfSBlbHNlIGlmIChtYXRjaFRleHQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHRva2VuTG93ZXJDYXNlKSkge1xuICAgICAgICAvLyBJZ25vcmUgY2FzZSBzY29yZSBtYXRjaGVzIGdldHMgYSBnb29kIHNjb3JlLlxuICAgICAgICByZXR1cm4gTUFUQ0hfUFJFRklYX0NBU0VfSU5TRU5TSVRJVkVfU0NPUkU7XG4gICAgICB9XG5cbiAgICAgIGxldCBzY29yZTtcbiAgICAgIGlmIChtYXRjaFRleHQuaW5kZXhPZih0b2tlbikgIT09IC0xKSB7XG4gICAgICAgIC8vIFNtYWxsIHNjb3JlIGZvciBhIG1hdGNoIHRoYXQgY29udGFpbnMgdGhlIHRva2VuIGNhc2Utc2Vuc2l0aXZlLlxuICAgICAgICBzY29yZSA9IE1BVENIX1RPS0VOX0NBU0VfU0VOU0lUSVZFX1NDT1JFO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gWmVybyBzY29yZSBmb3IgYSBtYXRjaCB0aGF0IGNvbnRhaW5zIHRoZSB0b2tlbiB3aXRob3V0IGNhc2Utc2Vuc2l0aXZlIG1hdGNoaW5nLlxuICAgICAgICBzY29yZSA9IE1BVENIX1RPS0VOX0NBU0VfSU5TRU5TSVRJVkVfU0NPUkU7XG4gICAgICB9XG5cbiAgICAgIC8vIFByaXZhdGUgZnVuY3Rpb25zIGdldHMgbmVnYXRpdmUgc2NvcmUuXG4gICAgICBpZiAobWF0Y2hUZXh0LnN0YXJ0c1dpdGgoJ18nKSkge1xuICAgICAgICBzY29yZSArPSBNQVRDSF9QUklWQVRFX0ZVTkNUSU9OX1BFTkFMVFk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2NvcmU7XG4gICAgfSk7XG4gICAgLy8gRmluYWxseSwgY29uc2lkZXIgdGhlIGFscGhhYmV0aWNhbCBvcmRlciwgYnV0IG5vdCBoaWdoZXIgdGhhbiBhbnkgb3RoZXIgc2NvcmUuXG4gICAgaWYgKG1hdGNoVGV4dHNbMF0gPCBtYXRjaFRleHRzWzFdKSB7XG4gICAgICBzY29yZXNbMF0gKz0gTUFUQ0hfQVBMSEFCRVRJQ0FMX1NDT1JFO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY29yZXNbMV0gKz0gTUFUQ0hfQVBMSEFCRVRJQ0FMX1NDT1JFO1xuICAgIH1cbiAgICByZXR1cm4gc2NvcmVzWzFdIC0gc2NvcmVzWzBdO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRIYWNrU2VydmljZShmaWxlUGF0aDogTnVjbGlkZVVyaSk6IE9iamVjdCB7XG4gIGNvbnN0IGhhY2tSZWdpc3RlcmVkU2VydmljZSA9IGdldFNlcnZpY2VCeU51Y2xpZGVVcmkoSEFDS19TRVJWSUNFX05BTUUsIGZpbGVQYXRoKTtcbiAgaW52YXJpYW50KGhhY2tSZWdpc3RlcmVkU2VydmljZSk7XG4gIHJldHVybiBoYWNrUmVnaXN0ZXJlZFNlcnZpY2U7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBhcmVIYWNrQ29tcGxldGlvbnMsXG4gIGdldEhhY2tTZXJ2aWNlLFxufTtcbiJdfQ==