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

exports.activate = activate;
exports.deactivate = deactivate;
exports.consumeGadgetsService = consumeGadgetsService;
exports.provideOutputService = provideOutputService;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var activation = null;

function activate(state) {
  if (activation == null) {
    var Activation = require('./Activation');
    activation = new Activation(state);
  }
}

function deactivate() {
  if (activation != null) {
    activation.dispose();
    activation = null;
  }
}

function consumeGadgetsService(gadgetsApi) {
  (0, _assert2['default'])(activation);
  return activation.consumeGadgetsService(gadgetsApi);
}

function provideOutputService() {
  (0, _assert2['default'])(activation);
  return activation.provideOutputService();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFlc0IsUUFBUTs7OztBQUU5QixJQUFJLFVBQTJCLEdBQUcsSUFBSSxDQUFDOztBQUVoQyxTQUFTLFFBQVEsQ0FBQyxLQUFjLEVBQUU7QUFDdkMsTUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO0FBQ3RCLFFBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMzQyxjQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDcEM7Q0FDRjs7QUFFTSxTQUFTLFVBQVUsR0FBRztBQUMzQixNQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7QUFDdEIsY0FBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JCLGNBQVUsR0FBRyxJQUFJLENBQUM7R0FDbkI7Q0FDRjs7QUFFTSxTQUFTLHFCQUFxQixDQUNuQyxVQUEwQixFQUNUO0FBQ2pCLDJCQUFVLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLFNBQU8sVUFBVSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ3JEOztBQUVNLFNBQVMsb0JBQW9CLEdBQWtCO0FBQ3BELDJCQUFVLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLFNBQU8sVUFBVSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Q0FDMUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIEFjdGl2YXRpb25UeXBlIGZyb20gJy4vQWN0aXZhdGlvbic7XG5pbXBvcnQgdHlwZSB7R2FkZ2V0c1NlcnZpY2V9IGZyb20gJy4uLy4uL2dhZGdldHMtaW50ZXJmYWNlcyc7XG5pbXBvcnQgdHlwZSBPdXRwdXRTZXJ2aWNlIGZyb20gJy4vT3V0cHV0U2VydmljZSc7XG5cbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0JztcblxubGV0IGFjdGl2YXRpb246ID9BY3RpdmF0aW9uVHlwZSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZShzdGF0ZTogP09iamVjdCkge1xuICBpZiAoYWN0aXZhdGlvbiA9PSBudWxsKSB7XG4gICAgY29uc3QgQWN0aXZhdGlvbiA9IHJlcXVpcmUoJy4vQWN0aXZhdGlvbicpO1xuICAgIGFjdGl2YXRpb24gPSBuZXcgQWN0aXZhdGlvbihzdGF0ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIGlmIChhY3RpdmF0aW9uICE9IG51bGwpIHtcbiAgICBhY3RpdmF0aW9uLmRpc3Bvc2UoKTtcbiAgICBhY3RpdmF0aW9uID0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUdhZGdldHNTZXJ2aWNlKFxuICBnYWRnZXRzQXBpOiBHYWRnZXRzU2VydmljZSxcbik6IGF0b20kRGlzcG9zYWJsZSB7XG4gIGludmFyaWFudChhY3RpdmF0aW9uKTtcbiAgcmV0dXJuIGFjdGl2YXRpb24uY29uc3VtZUdhZGdldHNTZXJ2aWNlKGdhZGdldHNBcGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU91dHB1dFNlcnZpY2UoKTogT3V0cHV0U2VydmljZSB7XG4gIGludmFyaWFudChhY3RpdmF0aW9uKTtcbiAgcmV0dXJuIGFjdGl2YXRpb24ucHJvdmlkZU91dHB1dFNlcnZpY2UoKTtcbn1cbiJdfQ==