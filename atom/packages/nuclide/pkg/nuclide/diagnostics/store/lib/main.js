function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _atom = require('atom');

var _featureConfig = require('../../../feature-config');

var _featureConfig2 = _interopRequireDefault(_featureConfig);

var legacyLinterSetting = 'nuclide-diagnostics-store.consumeLegacyLinters';

var legacyLintOnTheFlySetting = 'nuclide-diagnostics-store.legacyLintOnTheFly';

var disposables = null;
var diagnosticStore = null;
var diagnosticUpdater = null;

function addDisposable(disposable) {
  if (disposables) {
    disposables.add(disposable);
  } else {
    var logger = require('../../../logging').getLogger();
    logger.error('disposables is null');
  }
}

function getDiagnosticStore() {
  if (!diagnosticStore) {
    diagnosticStore = new (require('../../base').DiagnosticStore)();
  }
  return diagnosticStore;
}

/**
 * @return A wrapper around the methods on DiagnosticStore that allow reading data.
 */
function getDiagnosticUpdater() {
  if (!diagnosticUpdater) {
    var store = getDiagnosticStore();
    diagnosticUpdater = {
      onFileMessagesDidUpdate: store.onFileMessagesDidUpdate.bind(store),
      onProjectMessagesDidUpdate: store.onProjectMessagesDidUpdate.bind(store),
      onAllMessagesDidUpdate: store.onAllMessagesDidUpdate.bind(store),
      applyFix: store.applyFix.bind(store),
      applyFixesForFile: store.applyFixesForFile.bind(store)
    };
  }
  return diagnosticUpdater;
}

var consumeLegacyLinters = false;
var lintOnTheFly = false;
var allLinterAdapters = new Set();

module.exports = {
  activate: function activate(state) {
    if (!disposables) {
      disposables = new _atom.CompositeDisposable();
    }

    // Returns mixed so a cast is necessary.
    consumeLegacyLinters = _featureConfig2['default'].get(legacyLinterSetting);
    _featureConfig2['default'].observe(legacyLinterSetting, function (newValue) {
      // To make this really solid, we should also probably trigger the linter
      // for the active text editor. Possibly more trouble than it's worth,
      // though, since this may be a temporary option.
      consumeLegacyLinters = newValue;
      allLinterAdapters.forEach(function (adapter) {
        return adapter.setEnabled(newValue);
      });
    });

    lintOnTheFly = _featureConfig2['default'].get(legacyLintOnTheFlySetting);
    _featureConfig2['default'].observe(legacyLintOnTheFlySetting, function (newValue) {
      lintOnTheFly = newValue;
      allLinterAdapters.forEach(function (adapter) {
        return adapter.setLintOnFly(newValue);
      });
    });
  },

  consumeLinterProvider: function consumeLinterProvider(provider) {
    var _this = this;

    var _require = require('./LinterAdapterFactory');

    var createAdapters = _require.createAdapters;

    var newAdapters = createAdapters(provider);
    var adapterDisposables = new _atom.CompositeDisposable();

    var _loop = function (adapter) {
      adapter.setEnabled(consumeLegacyLinters);
      adapter.setLintOnFly(lintOnTheFly);
      allLinterAdapters.add(adapter);
      var diagnosticDisposable = _this.consumeDiagnosticProvider(adapter);
      var adapterDisposable = new _atom.Disposable(function () {
        diagnosticDisposable.dispose();
        adapter.dispose();
        allLinterAdapters['delete'](adapter);
      });
      adapterDisposables.add(adapterDisposable);
      addDisposable(adapter);
    };

    for (var adapter of newAdapters) {
      _loop(adapter);
    }
    return adapterDisposables;
  },

  consumeDiagnosticProvider: function consumeDiagnosticProvider(provider) {
    var store = getDiagnosticStore();
    // Register the diagnostic store for updates from the new provider.
    var compositeDisposable = new _atom.CompositeDisposable();
    compositeDisposable.add(provider.onMessageUpdate(function (update) {
      store.updateMessages(provider, update);
    }));
    compositeDisposable.add(provider.onMessageInvalidation(function (invalidationMessage) {
      store.invalidateMessages(provider, invalidationMessage);
    }));
    compositeDisposable.add(new _atom.Disposable(function () {
      store.invalidateMessages(provider, { scope: 'all' });
    }));
    addDisposable(compositeDisposable);
    return compositeDisposable;
  },

  provideDiagnosticUpdates: function provideDiagnosticUpdates() {
    return getDiagnosticUpdater();
  },

  deactivate: function deactivate() {
    if (disposables) {
      disposables.dispose();
      disposables = null;
    }
    if (diagnosticStore) {
      diagnosticStore.dispose();
      diagnosticStore = null;
    }
    diagnosticUpdater = null;
  }
};
//# sourceMappingURL=data:application/json;base64,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QUN4QyxDQUFDLENBQ0gsQ0FBQztBQUNGLHVCQUFtQixDQUFDLEdBQUcsQ0FDckIsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFVBQUMsbUJBQW1CLEVBQTBCO0FBQzNFLFdBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztLQUN6RCxDQUFDLENBQ0gsQ0FBQztBQUNGLHVCQUFtQixDQUFDLEdBQUcsQ0FBQyxxQkFBZSxZQUFNO0FBQzNDLFdBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUN0RCxDQUFDLENBQUMsQ0FBQztBQUNKLGlCQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNuQyxXQUFPLG1CQUFtQixDQUFDO0dBQzVCOztBQUVELDBCQUF3QixFQUFBLG9DQUFzQjtBQUM1QyxXQUFPLG9CQUFvQixFQUFFLENBQUM7R0FDL0I7O0FBRUQsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsUUFBSSxXQUFXLEVBQUU7QUFDZixpQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLGlCQUFXLEdBQUcsSUFBSSxDQUFDO0tBQ3BCO0FBQ0QsUUFBSSxlQUFlLEVBQUU7QUFDbkIscUJBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQixxQkFBZSxHQUFHLElBQUksQ0FBQztLQUN4QjtBQUNELHFCQUFpQixHQUFHLElBQUksQ0FBQztHQUMxQjtDQUNGLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtcbiAgRGlhZ25vc3RpY1N0b3JlLFxuICBEaWFnbm9zdGljVXBkYXRlcixcbiAgRGlhZ25vc3RpY1Byb3ZpZGVyVXBkYXRlLFxuICBEaWFnbm9zdGljUHJvdmlkZXIsXG4gIEludmFsaWRhdGlvbk1lc3NhZ2UsXG59IGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHR5cGUge0xpbnRlclByb3ZpZGVyfSBmcm9tICcuL0xpbnRlckFkYXB0ZXInO1xuXG5pbXBvcnQge0Rpc3Bvc2FibGUsIENvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGZlYXR1cmVDb25maWcgZnJvbSAnLi4vLi4vLi4vZmVhdHVyZS1jb25maWcnO1xuXG5jb25zdCBsZWdhY3lMaW50ZXJTZXR0aW5nID0gJ251Y2xpZGUtZGlhZ25vc3RpY3Mtc3RvcmUuY29uc3VtZUxlZ2FjeUxpbnRlcnMnO1xuXG5jb25zdCBsZWdhY3lMaW50T25UaGVGbHlTZXR0aW5nID0gJ251Y2xpZGUtZGlhZ25vc3RpY3Mtc3RvcmUubGVnYWN5TGludE9uVGhlRmx5JztcblxubGV0IGRpc3Bvc2FibGVzID0gbnVsbDtcbmxldCBkaWFnbm9zdGljU3RvcmUgPSBudWxsO1xubGV0IGRpYWdub3N0aWNVcGRhdGVyID0gbnVsbDtcblxuZnVuY3Rpb24gYWRkRGlzcG9zYWJsZShkaXNwb3NhYmxlOiBhdG9tJElEaXNwb3NhYmxlKSB7XG4gIGlmIChkaXNwb3NhYmxlcykge1xuICAgIGRpc3Bvc2FibGVzLmFkZChkaXNwb3NhYmxlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuLi8uLi8uLi9sb2dnaW5nJykuZ2V0TG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKCdkaXNwb3NhYmxlcyBpcyBudWxsJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlhZ25vc3RpY1N0b3JlKCk6IERpYWdub3N0aWNTdG9yZSB7XG4gIGlmICghZGlhZ25vc3RpY1N0b3JlKSB7XG4gICAgZGlhZ25vc3RpY1N0b3JlID0gbmV3IChyZXF1aXJlKCcuLi8uLi9iYXNlJykuRGlhZ25vc3RpY1N0b3JlKSgpO1xuICB9XG4gIHJldHVybiBkaWFnbm9zdGljU3RvcmU7XG59XG5cbi8qKlxuICogQHJldHVybiBBIHdyYXBwZXIgYXJvdW5kIHRoZSBtZXRob2RzIG9uIERpYWdub3N0aWNTdG9yZSB0aGF0IGFsbG93IHJlYWRpbmcgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0RGlhZ25vc3RpY1VwZGF0ZXIoKTogRGlhZ25vc3RpY1VwZGF0ZXIge1xuICBpZiAoIWRpYWdub3N0aWNVcGRhdGVyKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBnZXREaWFnbm9zdGljU3RvcmUoKTtcbiAgICBkaWFnbm9zdGljVXBkYXRlciA9IHtcbiAgICAgIG9uRmlsZU1lc3NhZ2VzRGlkVXBkYXRlOiBzdG9yZS5vbkZpbGVNZXNzYWdlc0RpZFVwZGF0ZS5iaW5kKHN0b3JlKSxcbiAgICAgIG9uUHJvamVjdE1lc3NhZ2VzRGlkVXBkYXRlOiBzdG9yZS5vblByb2plY3RNZXNzYWdlc0RpZFVwZGF0ZS5iaW5kKHN0b3JlKSxcbiAgICAgIG9uQWxsTWVzc2FnZXNEaWRVcGRhdGU6IHN0b3JlLm9uQWxsTWVzc2FnZXNEaWRVcGRhdGUuYmluZChzdG9yZSksXG4gICAgICBhcHBseUZpeDogc3RvcmUuYXBwbHlGaXguYmluZChzdG9yZSksXG4gICAgICBhcHBseUZpeGVzRm9yRmlsZTogc3RvcmUuYXBwbHlGaXhlc0ZvckZpbGUuYmluZChzdG9yZSksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gZGlhZ25vc3RpY1VwZGF0ZXI7XG59XG5cbmxldCBjb25zdW1lTGVnYWN5TGludGVycyA9IGZhbHNlO1xubGV0IGxpbnRPblRoZUZseSA9IGZhbHNlO1xuY29uc3QgYWxsTGludGVyQWRhcHRlcnMgPSBuZXcgU2V0KCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhY3RpdmF0ZShzdGF0ZTogP09iamVjdCk6IHZvaWQge1xuICAgIGlmICghZGlzcG9zYWJsZXMpIHtcbiAgICAgIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIG1peGVkIHNvIGEgY2FzdCBpcyBuZWNlc3NhcnkuXG4gICAgY29uc3VtZUxlZ2FjeUxpbnRlcnMgPSAoKGZlYXR1cmVDb25maWcuZ2V0KGxlZ2FjeUxpbnRlclNldHRpbmcpOiBhbnkpOiBib29sZWFuKTtcbiAgICBmZWF0dXJlQ29uZmlnLm9ic2VydmUobGVnYWN5TGludGVyU2V0dGluZywgbmV3VmFsdWUgPT4ge1xuICAgICAgLy8gVG8gbWFrZSB0aGlzIHJlYWxseSBzb2xpZCwgd2Ugc2hvdWxkIGFsc28gcHJvYmFibHkgdHJpZ2dlciB0aGUgbGludGVyXG4gICAgICAvLyBmb3IgdGhlIGFjdGl2ZSB0ZXh0IGVkaXRvci4gUG9zc2libHkgbW9yZSB0cm91YmxlIHRoYW4gaXQncyB3b3J0aCxcbiAgICAgIC8vIHRob3VnaCwgc2luY2UgdGhpcyBtYXkgYmUgYSB0ZW1wb3Jhcnkgb3B0aW9uLlxuICAgICAgY29uc3VtZUxlZ2FjeUxpbnRlcnMgPSBuZXdWYWx1ZTtcbiAgICAgIGFsbExpbnRlckFkYXB0ZXJzLmZvckVhY2goYWRhcHRlciA9PiBhZGFwdGVyLnNldEVuYWJsZWQobmV3VmFsdWUpKTtcbiAgICB9KTtcblxuICAgIGxpbnRPblRoZUZseSA9ICgoZmVhdHVyZUNvbmZpZy5nZXQobGVnYWN5TGludE9uVGhlRmx5U2V0dGluZyk6IGFueSk6IGJvb2xlYW4pO1xuICAgIGZlYXR1cmVDb25maWcub2JzZXJ2ZShsZWdhY3lMaW50T25UaGVGbHlTZXR0aW5nLCBuZXdWYWx1ZSA9PiB7XG4gICAgICBsaW50T25UaGVGbHkgPSBuZXdWYWx1ZTtcbiAgICAgIGFsbExpbnRlckFkYXB0ZXJzLmZvckVhY2goYWRhcHRlciA9PiBhZGFwdGVyLnNldExpbnRPbkZseShuZXdWYWx1ZSkpO1xuICAgIH0pO1xuICB9LFxuXG4gIGNvbnN1bWVMaW50ZXJQcm92aWRlcihwcm92aWRlcjogTGludGVyUHJvdmlkZXIgfCBBcnJheTxMaW50ZXJQcm92aWRlcj4pOiBhdG9tJElEaXNwb3NhYmxlIHtcbiAgICBjb25zdCB7Y3JlYXRlQWRhcHRlcnN9ID0gcmVxdWlyZSgnLi9MaW50ZXJBZGFwdGVyRmFjdG9yeScpO1xuICAgIGNvbnN0IG5ld0FkYXB0ZXJzID0gY3JlYXRlQWRhcHRlcnMocHJvdmlkZXIpO1xuICAgIGNvbnN0IGFkYXB0ZXJEaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgZm9yIChjb25zdCBhZGFwdGVyIG9mIG5ld0FkYXB0ZXJzKSB7XG4gICAgICBhZGFwdGVyLnNldEVuYWJsZWQoY29uc3VtZUxlZ2FjeUxpbnRlcnMpO1xuICAgICAgYWRhcHRlci5zZXRMaW50T25GbHkobGludE9uVGhlRmx5KTtcbiAgICAgIGFsbExpbnRlckFkYXB0ZXJzLmFkZChhZGFwdGVyKTtcbiAgICAgIGNvbnN0IGRpYWdub3N0aWNEaXNwb3NhYmxlID0gdGhpcy5jb25zdW1lRGlhZ25vc3RpY1Byb3ZpZGVyKGFkYXB0ZXIpO1xuICAgICAgY29uc3QgYWRhcHRlckRpc3Bvc2FibGUgPSBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIGRpYWdub3N0aWNEaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgYWRhcHRlci5kaXNwb3NlKCk7XG4gICAgICAgIGFsbExpbnRlckFkYXB0ZXJzLmRlbGV0ZShhZGFwdGVyKTtcbiAgICAgIH0pO1xuICAgICAgYWRhcHRlckRpc3Bvc2FibGVzLmFkZChhZGFwdGVyRGlzcG9zYWJsZSk7XG4gICAgICBhZGREaXNwb3NhYmxlKGFkYXB0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gYWRhcHRlckRpc3Bvc2FibGVzO1xuICB9LFxuXG4gIGNvbnN1bWVEaWFnbm9zdGljUHJvdmlkZXIocHJvdmlkZXI6IERpYWdub3N0aWNQcm92aWRlcik6IGF0b20kSURpc3Bvc2FibGUge1xuICAgIGNvbnN0IHN0b3JlID0gZ2V0RGlhZ25vc3RpY1N0b3JlKCk7XG4gICAgLy8gUmVnaXN0ZXIgdGhlIGRpYWdub3N0aWMgc3RvcmUgZm9yIHVwZGF0ZXMgZnJvbSB0aGUgbmV3IHByb3ZpZGVyLlxuICAgIGNvbnN0IGNvbXBvc2l0ZURpc3Bvc2FibGUgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIGNvbXBvc2l0ZURpc3Bvc2FibGUuYWRkKFxuICAgICAgcHJvdmlkZXIub25NZXNzYWdlVXBkYXRlKCh1cGRhdGU6IERpYWdub3N0aWNQcm92aWRlclVwZGF0ZSkgPT4ge1xuICAgICAgICBzdG9yZS51cGRhdGVNZXNzYWdlcyhwcm92aWRlciwgdXBkYXRlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb21wb3NpdGVEaXNwb3NhYmxlLmFkZChcbiAgICAgIHByb3ZpZGVyLm9uTWVzc2FnZUludmFsaWRhdGlvbigoaW52YWxpZGF0aW9uTWVzc2FnZTogSW52YWxpZGF0aW9uTWVzc2FnZSkgPT4ge1xuICAgICAgICBzdG9yZS5pbnZhbGlkYXRlTWVzc2FnZXMocHJvdmlkZXIsIGludmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgfSlcbiAgICApO1xuICAgIGNvbXBvc2l0ZURpc3Bvc2FibGUuYWRkKG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIHN0b3JlLmludmFsaWRhdGVNZXNzYWdlcyhwcm92aWRlciwgeyBzY29wZTogJ2FsbCcgfSk7XG4gICAgfSkpO1xuICAgIGFkZERpc3Bvc2FibGUoY29tcG9zaXRlRGlzcG9zYWJsZSk7XG4gICAgcmV0dXJuIGNvbXBvc2l0ZURpc3Bvc2FibGU7XG4gIH0sXG5cbiAgcHJvdmlkZURpYWdub3N0aWNVcGRhdGVzKCk6IERpYWdub3N0aWNVcGRhdGVyIHtcbiAgICByZXR1cm4gZ2V0RGlhZ25vc3RpY1VwZGF0ZXIoKTtcbiAgfSxcblxuICBkZWFjdGl2YXRlKCkge1xuICAgIGlmIChkaXNwb3NhYmxlcykge1xuICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgICAgZGlzcG9zYWJsZXMgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZGlhZ25vc3RpY1N0b3JlKSB7XG4gICAgICBkaWFnbm9zdGljU3RvcmUuZGlzcG9zZSgpO1xuICAgICAgZGlhZ25vc3RpY1N0b3JlID0gbnVsbDtcbiAgICB9XG4gICAgZGlhZ25vc3RpY1VwZGF0ZXIgPSBudWxsO1xuICB9LFxufTtcbiJdfQ==