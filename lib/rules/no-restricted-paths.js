'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _containsPath = require('contains-path');

var _containsPath2 = _interopRequireDefault(_containsPath);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    docs: {},

    schema: [{
      type: 'object',
      properties: {
        zones: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              target: { type: 'string' },
              from: { type: 'string' }
            },
            additionalProperties: false
          }
        },
        basePath: { type: 'string' }
      },
      additionalProperties: false
    }]
  },

  create: function noRestrictedPaths(context) {
    const options = context.options[0] || {};
    const restrictedPaths = options.zones || [];
    const basePath = options.basePath || process.cwd();
    const currentFilename = context.getFilename();
    const matchingZones = restrictedPaths.filter(zone => {
      const targetPath = _path2.default.resolve(basePath, zone.target);

      return (0, _containsPath2.default)(currentFilename, targetPath);
    });

    function checkForRestrictedImportPath(importPath, node) {
      const absoluteImportPath = (0, _resolve2.default)(importPath, context);

      if (!absoluteImportPath) {
        return;
      }

      matchingZones.forEach(zone => {
        const absoluteFrom = _path2.default.resolve(basePath, zone.from);

        if ((0, _containsPath2.default)(absoluteImportPath, absoluteFrom)) {
          context.report({
            node,
            message: `Unexpected path "${importPath}" imported in restricted zone.`
          });
        }
      });
    }

    return {
      ImportDeclaration(node) {
        checkForRestrictedImportPath(node.source.value, node.source);
      },
      CallExpression(node) {
        if ((0, _staticRequire2.default)(node)) {
          var _node$arguments = _slicedToArray(node.arguments, 1);

          const firstArgument = _node$arguments[0];


          checkForRestrictedImportPath(firstArgument.value, firstArgument);
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1yZXN0cmljdGVkLXBhdGhzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsInNjaGVtYSIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiem9uZXMiLCJtaW5JdGVtcyIsIml0ZW1zIiwidGFyZ2V0IiwiZnJvbSIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiYmFzZVBhdGgiLCJjcmVhdGUiLCJub1Jlc3RyaWN0ZWRQYXRocyIsImNvbnRleHQiLCJvcHRpb25zIiwicmVzdHJpY3RlZFBhdGhzIiwicHJvY2VzcyIsImN3ZCIsImN1cnJlbnRGaWxlbmFtZSIsImdldEZpbGVuYW1lIiwibWF0Y2hpbmdab25lcyIsImZpbHRlciIsInpvbmUiLCJ0YXJnZXRQYXRoIiwicmVzb2x2ZSIsImNoZWNrRm9yUmVzdHJpY3RlZEltcG9ydFBhdGgiLCJpbXBvcnRQYXRoIiwibm9kZSIsImFic29sdXRlSW1wb3J0UGF0aCIsImZvckVhY2giLCJhYnNvbHV0ZUZyb20iLCJyZXBvcnQiLCJtZXNzYWdlIiwiSW1wb3J0RGVjbGFyYXRpb24iLCJzb3VyY2UiLCJ2YWx1ZSIsIkNhbGxFeHByZXNzaW9uIiwiYXJndW1lbnRzIiwiZmlyc3RBcmd1bWVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU0sRUFERjs7QUFHSkMsWUFBUSxDQUNOO0FBQ0VDLFlBQU0sUUFEUjtBQUVFQyxrQkFBWTtBQUNWQyxlQUFPO0FBQ0xGLGdCQUFNLE9BREQ7QUFFTEcsb0JBQVUsQ0FGTDtBQUdMQyxpQkFBTztBQUNMSixrQkFBTSxRQUREO0FBRUxDLHdCQUFZO0FBQ1ZJLHNCQUFRLEVBQUVMLE1BQU0sUUFBUixFQURFO0FBRVZNLG9CQUFNLEVBQUVOLE1BQU0sUUFBUjtBQUZJLGFBRlA7QUFNTE8sa0NBQXNCO0FBTmpCO0FBSEYsU0FERztBQWFWQyxrQkFBVSxFQUFFUixNQUFNLFFBQVI7QUFiQSxPQUZkO0FBaUJFTyw0QkFBc0I7QUFqQnhCLEtBRE07QUFISixHQURTOztBQTJCZkUsVUFBUSxTQUFTQyxpQkFBVCxDQUEyQkMsT0FBM0IsRUFBb0M7QUFDMUMsVUFBTUMsVUFBVUQsUUFBUUMsT0FBUixDQUFnQixDQUFoQixLQUFzQixFQUF0QztBQUNBLFVBQU1DLGtCQUFrQkQsUUFBUVYsS0FBUixJQUFpQixFQUF6QztBQUNBLFVBQU1NLFdBQVdJLFFBQVFKLFFBQVIsSUFBb0JNLFFBQVFDLEdBQVIsRUFBckM7QUFDQSxVQUFNQyxrQkFBa0JMLFFBQVFNLFdBQVIsRUFBeEI7QUFDQSxVQUFNQyxnQkFBZ0JMLGdCQUFnQk0sTUFBaEIsQ0FBd0JDLElBQUQsSUFBVTtBQUNyRCxZQUFNQyxhQUFhLGVBQUtDLE9BQUwsQ0FBYWQsUUFBYixFQUF1QlksS0FBS2YsTUFBNUIsQ0FBbkI7O0FBRUEsYUFBTyw0QkFBYVcsZUFBYixFQUE4QkssVUFBOUIsQ0FBUDtBQUNELEtBSnFCLENBQXRCOztBQU1BLGFBQVNFLDRCQUFULENBQXNDQyxVQUF0QyxFQUFrREMsSUFBbEQsRUFBd0Q7QUFDcEQsWUFBTUMscUJBQXFCLHVCQUFRRixVQUFSLEVBQW9CYixPQUFwQixDQUEzQjs7QUFFQSxVQUFJLENBQUNlLGtCQUFMLEVBQXlCO0FBQ3ZCO0FBQ0Q7O0FBRURSLG9CQUFjUyxPQUFkLENBQXVCUCxJQUFELElBQVU7QUFDOUIsY0FBTVEsZUFBZSxlQUFLTixPQUFMLENBQWFkLFFBQWIsRUFBdUJZLEtBQUtkLElBQTVCLENBQXJCOztBQUVBLFlBQUksNEJBQWFvQixrQkFBYixFQUFpQ0UsWUFBakMsQ0FBSixFQUFvRDtBQUNsRGpCLGtCQUFRa0IsTUFBUixDQUFlO0FBQ2JKLGdCQURhO0FBRWJLLHFCQUFVLG9CQUFtQk4sVUFBVztBQUYzQixXQUFmO0FBSUQ7QUFDRixPQVREO0FBVUg7O0FBRUQsV0FBTztBQUNMTyx3QkFBa0JOLElBQWxCLEVBQXdCO0FBQ3RCRixxQ0FBNkJFLEtBQUtPLE1BQUwsQ0FBWUMsS0FBekMsRUFBZ0RSLEtBQUtPLE1BQXJEO0FBQ0QsT0FISTtBQUlMRSxxQkFBZVQsSUFBZixFQUFxQjtBQUNuQixZQUFJLDZCQUFnQkEsSUFBaEIsQ0FBSixFQUEyQjtBQUFBLCtDQUNDQSxLQUFLVSxTQUROOztBQUFBLGdCQUNqQkMsYUFEaUI7OztBQUd6QmIsdUNBQTZCYSxjQUFjSCxLQUEzQyxFQUFrREcsYUFBbEQ7QUFDRDtBQUNGO0FBVkksS0FBUDtBQVlEO0FBckVjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxuby1yZXN0cmljdGVkLXBhdGhzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbnRhaW5zUGF0aCBmcm9tICdjb250YWlucy1wYXRoJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG5cbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICB6b25lczoge1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIG1pbkl0ZW1zOiAxLFxuICAgICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBmcm9tOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBiYXNlUGF0aDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICB9LFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiBub1Jlc3RyaWN0ZWRQYXRocyhjb250ZXh0KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7fVxuICAgIGNvbnN0IHJlc3RyaWN0ZWRQYXRocyA9IG9wdGlvbnMuem9uZXMgfHwgW11cbiAgICBjb25zdCBiYXNlUGF0aCA9IG9wdGlvbnMuYmFzZVBhdGggfHwgcHJvY2Vzcy5jd2QoKVxuICAgIGNvbnN0IGN1cnJlbnRGaWxlbmFtZSA9IGNvbnRleHQuZ2V0RmlsZW5hbWUoKVxuICAgIGNvbnN0IG1hdGNoaW5nWm9uZXMgPSByZXN0cmljdGVkUGF0aHMuZmlsdGVyKCh6b25lKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCB6b25lLnRhcmdldClcblxuICAgICAgcmV0dXJuIGNvbnRhaW5zUGF0aChjdXJyZW50RmlsZW5hbWUsIHRhcmdldFBhdGgpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGNoZWNrRm9yUmVzdHJpY3RlZEltcG9ydFBhdGgoaW1wb3J0UGF0aCwgbm9kZSkge1xuICAgICAgICBjb25zdCBhYnNvbHV0ZUltcG9ydFBhdGggPSByZXNvbHZlKGltcG9ydFBhdGgsIGNvbnRleHQpXG5cbiAgICAgICAgaWYgKCFhYnNvbHV0ZUltcG9ydFBhdGgpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIG1hdGNoaW5nWm9uZXMuZm9yRWFjaCgoem9uZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFic29sdXRlRnJvbSA9IHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgem9uZS5mcm9tKVxuXG4gICAgICAgICAgaWYgKGNvbnRhaW5zUGF0aChhYnNvbHV0ZUltcG9ydFBhdGgsIGFic29sdXRlRnJvbSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogYFVuZXhwZWN0ZWQgcGF0aCBcIiR7aW1wb3J0UGF0aH1cIiBpbXBvcnRlZCBpbiByZXN0cmljdGVkIHpvbmUuYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihub2RlKSB7XG4gICAgICAgIGNoZWNrRm9yUmVzdHJpY3RlZEltcG9ydFBhdGgobm9kZS5zb3VyY2UudmFsdWUsIG5vZGUuc291cmNlKVxuICAgICAgfSxcbiAgICAgIENhbGxFeHByZXNzaW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzU3RhdGljUmVxdWlyZShub2RlKSkge1xuICAgICAgICAgIGNvbnN0IFsgZmlyc3RBcmd1bWVudCBdID0gbm9kZS5hcmd1bWVudHNcblxuICAgICAgICAgIGNoZWNrRm9yUmVzdHJpY3RlZEltcG9ydFBhdGgoZmlyc3RBcmd1bWVudC52YWx1ZSwgZmlyc3RBcmd1bWVudClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=