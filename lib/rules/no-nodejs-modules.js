'use strict';

var _importType = require('../core/importType');

var _importType2 = _interopRequireDefault(_importType);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reportIfMissing(context, node, allowed, name) {
  if (allowed.indexOf(name) === -1 && (0, _importType2.default)(name, context) === 'builtin') {
    context.report(node, 'Do not import Node.js builtin module "' + name + '"');
  }
}

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    const options = context.options[0] || {};
    const allowed = options.allow || [];

    return {
      ImportDeclaration: function handleImports(node) {
        reportIfMissing(context, node, allowed, node.source.value);
      },
      CallExpression: function handleRequires(node) {
        if ((0, _staticRequire2.default)(node)) {
          reportIfMissing(context, node, allowed, node.arguments[0].value);
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1ub2RlanMtbW9kdWxlcy5qcyJdLCJuYW1lcyI6WyJyZXBvcnRJZk1pc3NpbmciLCJjb250ZXh0Iiwibm9kZSIsImFsbG93ZWQiLCJuYW1lIiwiaW5kZXhPZiIsInJlcG9ydCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsImNyZWF0ZSIsIm9wdGlvbnMiLCJhbGxvdyIsIkltcG9ydERlY2xhcmF0aW9uIiwiaGFuZGxlSW1wb3J0cyIsInNvdXJjZSIsInZhbHVlIiwiQ2FsbEV4cHJlc3Npb24iLCJoYW5kbGVSZXF1aXJlcyIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxlQUFULENBQXlCQyxPQUF6QixFQUFrQ0MsSUFBbEMsRUFBd0NDLE9BQXhDLEVBQWlEQyxJQUFqRCxFQUF1RDtBQUNyRCxNQUFJRCxRQUFRRSxPQUFSLENBQWdCRCxJQUFoQixNQUEwQixDQUFDLENBQTNCLElBQWdDLDBCQUFXQSxJQUFYLEVBQWlCSCxPQUFqQixNQUE4QixTQUFsRSxFQUE2RTtBQUMzRUEsWUFBUUssTUFBUixDQUFlSixJQUFmLEVBQXFCLDJDQUEyQ0UsSUFBM0MsR0FBa0QsR0FBdkU7QUFDRDtBQUNGOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQURGLEdBRFM7O0FBS2ZDLFVBQVEsVUFBVVYsT0FBVixFQUFtQjtBQUN6QixVQUFNVyxVQUFVWCxRQUFRVyxPQUFSLENBQWdCLENBQWhCLEtBQXNCLEVBQXRDO0FBQ0EsVUFBTVQsVUFBVVMsUUFBUUMsS0FBUixJQUFpQixFQUFqQzs7QUFFQSxXQUFPO0FBQ0xDLHlCQUFtQixTQUFTQyxhQUFULENBQXVCYixJQUF2QixFQUE2QjtBQUM5Q0Ysd0JBQWdCQyxPQUFoQixFQUF5QkMsSUFBekIsRUFBK0JDLE9BQS9CLEVBQXdDRCxLQUFLYyxNQUFMLENBQVlDLEtBQXBEO0FBQ0QsT0FISTtBQUlMQyxzQkFBZ0IsU0FBU0MsY0FBVCxDQUF3QmpCLElBQXhCLEVBQThCO0FBQzVDLFlBQUksNkJBQWdCQSxJQUFoQixDQUFKLEVBQTJCO0FBQ3pCRiwwQkFBZ0JDLE9BQWhCLEVBQXlCQyxJQUF6QixFQUErQkMsT0FBL0IsRUFBd0NELEtBQUtrQixTQUFMLENBQWUsQ0FBZixFQUFrQkgsS0FBMUQ7QUFDRDtBQUNGO0FBUkksS0FBUDtBQVVEO0FBbkJjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxuby1ub2RlanMtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpbXBvcnRUeXBlIGZyb20gJy4uL2NvcmUvaW1wb3J0VHlwZSdcbmltcG9ydCBpc1N0YXRpY1JlcXVpcmUgZnJvbSAnLi4vY29yZS9zdGF0aWNSZXF1aXJlJ1xuXG5mdW5jdGlvbiByZXBvcnRJZk1pc3NpbmcoY29udGV4dCwgbm9kZSwgYWxsb3dlZCwgbmFtZSkge1xuICBpZiAoYWxsb3dlZC5pbmRleE9mKG5hbWUpID09PSAtMSAmJiBpbXBvcnRUeXBlKG5hbWUsIGNvbnRleHQpID09PSAnYnVpbHRpbicpIHtcbiAgICBjb250ZXh0LnJlcG9ydChub2RlLCAnRG8gbm90IGltcG9ydCBOb2RlLmpzIGJ1aWx0aW4gbW9kdWxlIFwiJyArIG5hbWUgKyAnXCInKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250ZXh0Lm9wdGlvbnNbMF0gfHwge31cbiAgICBjb25zdCBhbGxvd2VkID0gb3B0aW9ucy5hbGxvdyB8fCBbXVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIEltcG9ydERlY2xhcmF0aW9uOiBmdW5jdGlvbiBoYW5kbGVJbXBvcnRzKG5vZGUpIHtcbiAgICAgICAgcmVwb3J0SWZNaXNzaW5nKGNvbnRleHQsIG5vZGUsIGFsbG93ZWQsIG5vZGUuc291cmNlLnZhbHVlKVxuICAgICAgfSxcbiAgICAgIENhbGxFeHByZXNzaW9uOiBmdW5jdGlvbiBoYW5kbGVSZXF1aXJlcyhub2RlKSB7XG4gICAgICAgIGlmIChpc1N0YXRpY1JlcXVpcmUobm9kZSkpIHtcbiAgICAgICAgICByZXBvcnRJZk1pc3NpbmcoY29udGV4dCwgbm9kZSwgYWxsb3dlZCwgbm9kZS5hcmd1bWVudHNbMF0udmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19