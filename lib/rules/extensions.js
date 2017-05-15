'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _importType = require('../core/importType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const enumValues = { enum: ['always', 'ignorePackages', 'never'] };
const patternProperties = {
  type: 'object',
  patternProperties: { '.*': enumValues }
};
const properties = {
  type: 'object',
  properties: {
    'pattern': patternProperties,
    'ignorePackages': { type: 'boolean' }
  }
};

function buildProperties(context) {

  const result = {
    defaultConfig: 'never',
    pattern: {},
    ignorePackages: false
  };

  context.options.forEach(obj => {

    // If this is a string, set defaultConfig to its value
    if (typeof obj === 'string') {
      result.defaultConfig = obj;
      return;
    }

    // If this is not the new structure, transfer all props to result.pattern
    if (obj.pattern === undefined && obj.ignorePackages === undefined) {
      Object.assign(result.pattern, obj);
      return;
    }

    // If pattern is provided, transfer all props
    if (obj.pattern !== undefined) {
      Object.assign(result.pattern, obj.pattern);
    }

    // If ignorePackages is provided, transfer it to result
    if (obj.ignorePackages !== undefined) {
      result.ignorePackages = obj.ignorePackages;
    }
  });

  return result;
}

module.exports = {
  meta: {
    docs: {},

    schema: {
      anyOf: [{
        type: 'array',
        items: [enumValues],
        additionalItems: false
      }, {
        type: 'array',
        items: [enumValues, properties],
        additionalItems: false
      }, {
        type: 'array',
        items: [properties],
        additionalItems: false
      }, {
        type: 'array',
        items: [patternProperties],
        additionalItems: false
      }, {
        type: 'array',
        items: [enumValues, patternProperties],
        additionalItems: false
      }]
    }
  },

  create: function (context) {

    const props = buildProperties(context);

    function getModifier(extension) {
      return props.pattern[extension] || props.defaultConfig;
    }

    function isUseOfExtensionRequired(extension, isPackageMain) {
      return getModifier(extension) === 'always' && (!props.ignorePackages || !isPackageMain);
    }

    function isUseOfExtensionForbidden(extension) {
      return getModifier(extension) === 'never';
    }

    function isResolvableWithoutExtension(file) {
      const extension = _path2.default.extname(file);
      const fileWithoutExtension = file.slice(0, -extension.length);
      const resolvedFileWithoutExtension = (0, _resolve2.default)(fileWithoutExtension, context);

      return resolvedFileWithoutExtension === (0, _resolve2.default)(file, context);
    }

    function checkFileExtension(node) {
      const source = node.source;

      const importPath = source.value;

      // don't enforce anything on builtins
      if ((0, _importType.isBuiltIn)(importPath, context.settings)) return;

      const resolvedPath = (0, _resolve2.default)(importPath, context);

      // get extension from resolved path, if possible.
      // for unresolved, use source value.
      const extension = _path2.default.extname(resolvedPath || importPath).substring(1);

      // determine if this is a module
      const isPackageMain = (0, _importType.isExternalModuleMain)(importPath, context.settings) || (0, _importType.isScopedMain)(importPath);

      if (!extension || !importPath.endsWith(extension)) {
        const extensionRequired = isUseOfExtensionRequired(extension, isPackageMain);
        const extensionForbidden = isUseOfExtensionForbidden(extension);
        if (extensionRequired && !extensionForbidden) {
          context.report({
            node: source,
            message: `Missing file extension ${extension ? `"${extension}" ` : ''}for "${importPath}"`
          });
        }
      } else if (extension) {
        if (isUseOfExtensionForbidden(extension) && isResolvableWithoutExtension(importPath)) {
          context.report({
            node: source,
            message: `Unexpected use of file extension "${extension}" for "${importPath}"`
          });
        }
      }
    }

    return {
      ImportDeclaration: checkFileExtension
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxleHRlbnNpb25zLmpzIl0sIm5hbWVzIjpbImVudW1WYWx1ZXMiLCJlbnVtIiwicGF0dGVyblByb3BlcnRpZXMiLCJ0eXBlIiwicHJvcGVydGllcyIsImJ1aWxkUHJvcGVydGllcyIsImNvbnRleHQiLCJyZXN1bHQiLCJkZWZhdWx0Q29uZmlnIiwicGF0dGVybiIsImlnbm9yZVBhY2thZ2VzIiwib3B0aW9ucyIsImZvckVhY2giLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJzY2hlbWEiLCJhbnlPZiIsIml0ZW1zIiwiYWRkaXRpb25hbEl0ZW1zIiwiY3JlYXRlIiwicHJvcHMiLCJnZXRNb2RpZmllciIsImV4dGVuc2lvbiIsImlzVXNlT2ZFeHRlbnNpb25SZXF1aXJlZCIsImlzUGFja2FnZU1haW4iLCJpc1VzZU9mRXh0ZW5zaW9uRm9yYmlkZGVuIiwiaXNSZXNvbHZhYmxlV2l0aG91dEV4dGVuc2lvbiIsImZpbGUiLCJleHRuYW1lIiwiZmlsZVdpdGhvdXRFeHRlbnNpb24iLCJzbGljZSIsImxlbmd0aCIsInJlc29sdmVkRmlsZVdpdGhvdXRFeHRlbnNpb24iLCJjaGVja0ZpbGVFeHRlbnNpb24iLCJub2RlIiwic291cmNlIiwiaW1wb3J0UGF0aCIsInZhbHVlIiwic2V0dGluZ3MiLCJyZXNvbHZlZFBhdGgiLCJzdWJzdHJpbmciLCJlbmRzV2l0aCIsImV4dGVuc2lvblJlcXVpcmVkIiwiZXh0ZW5zaW9uRm9yYmlkZGVuIiwicmVwb3J0IiwibWVzc2FnZSIsIkltcG9ydERlY2xhcmF0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBLE1BQU1BLGFBQWEsRUFBRUMsTUFBTSxDQUFFLFFBQUYsRUFBWSxnQkFBWixFQUE4QixPQUE5QixDQUFSLEVBQW5CO0FBQ0EsTUFBTUMsb0JBQW9CO0FBQ3hCQyxRQUFNLFFBRGtCO0FBRXhCRCxxQkFBbUIsRUFBRSxNQUFNRixVQUFSO0FBRkssQ0FBMUI7QUFJQSxNQUFNSSxhQUFhO0FBQ2pCRCxRQUFNLFFBRFc7QUFFakJDLGNBQVk7QUFDVixlQUFXRixpQkFERDtBQUVWLHNCQUFrQixFQUFFQyxNQUFNLFNBQVI7QUFGUjtBQUZLLENBQW5COztBQVFBLFNBQVNFLGVBQVQsQ0FBeUJDLE9BQXpCLEVBQWtDOztBQUU5QixRQUFNQyxTQUFTO0FBQ2JDLG1CQUFlLE9BREY7QUFFYkMsYUFBUyxFQUZJO0FBR2JDLG9CQUFnQjtBQUhILEdBQWY7O0FBTUFKLFVBQVFLLE9BQVIsQ0FBZ0JDLE9BQWhCLENBQXdCQyxPQUFPOztBQUU3QjtBQUNBLFFBQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCTixhQUFPQyxhQUFQLEdBQXVCSyxHQUF2QjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFJQSxJQUFJSixPQUFKLEtBQWdCSyxTQUFoQixJQUE2QkQsSUFBSUgsY0FBSixLQUF1QkksU0FBeEQsRUFBbUU7QUFDakVDLGFBQU9DLE1BQVAsQ0FBY1QsT0FBT0UsT0FBckIsRUFBOEJJLEdBQTlCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLFFBQUlBLElBQUlKLE9BQUosS0FBZ0JLLFNBQXBCLEVBQStCO0FBQzdCQyxhQUFPQyxNQUFQLENBQWNULE9BQU9FLE9BQXJCLEVBQThCSSxJQUFJSixPQUFsQztBQUNEOztBQUVEO0FBQ0EsUUFBSUksSUFBSUgsY0FBSixLQUF1QkksU0FBM0IsRUFBc0M7QUFDcENQLGFBQU9HLGNBQVAsR0FBd0JHLElBQUlILGNBQTVCO0FBQ0Q7QUFDRixHQXZCRDs7QUF5QkEsU0FBT0gsTUFBUDtBQUNIOztBQUVEVSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTSxFQURGOztBQUdKQyxZQUFRO0FBQ05DLGFBQU8sQ0FDTDtBQUNFbkIsY0FBTSxPQURSO0FBRUVvQixlQUFPLENBQUN2QixVQUFELENBRlQ7QUFHRXdCLHlCQUFpQjtBQUhuQixPQURLLEVBTUw7QUFDRXJCLGNBQU0sT0FEUjtBQUVFb0IsZUFBTyxDQUNMdkIsVUFESyxFQUVMSSxVQUZLLENBRlQ7QUFNRW9CLHlCQUFpQjtBQU5uQixPQU5LLEVBY0w7QUFDRXJCLGNBQU0sT0FEUjtBQUVFb0IsZUFBTyxDQUFDbkIsVUFBRCxDQUZUO0FBR0VvQix5QkFBaUI7QUFIbkIsT0FkSyxFQW1CTDtBQUNFckIsY0FBTSxPQURSO0FBRUVvQixlQUFPLENBQUNyQixpQkFBRCxDQUZUO0FBR0VzQix5QkFBaUI7QUFIbkIsT0FuQkssRUF3Qkw7QUFDRXJCLGNBQU0sT0FEUjtBQUVFb0IsZUFBTyxDQUNMdkIsVUFESyxFQUVMRSxpQkFGSyxDQUZUO0FBTUVzQix5QkFBaUI7QUFObkIsT0F4Qks7QUFERDtBQUhKLEdBRFM7O0FBeUNmQyxVQUFRLFVBQVVuQixPQUFWLEVBQW1COztBQUV6QixVQUFNb0IsUUFBUXJCLGdCQUFnQkMsT0FBaEIsQ0FBZDs7QUFFQSxhQUFTcUIsV0FBVCxDQUFxQkMsU0FBckIsRUFBZ0M7QUFDOUIsYUFBT0YsTUFBTWpCLE9BQU4sQ0FBY21CLFNBQWQsS0FBNEJGLE1BQU1sQixhQUF6QztBQUNEOztBQUVELGFBQVNxQix3QkFBVCxDQUFrQ0QsU0FBbEMsRUFBNkNFLGFBQTdDLEVBQTREO0FBQzFELGFBQU9ILFlBQVlDLFNBQVosTUFBMkIsUUFBM0IsS0FBd0MsQ0FBQ0YsTUFBTWhCLGNBQVAsSUFBeUIsQ0FBQ29CLGFBQWxFLENBQVA7QUFDRDs7QUFFRCxhQUFTQyx5QkFBVCxDQUFtQ0gsU0FBbkMsRUFBOEM7QUFDNUMsYUFBT0QsWUFBWUMsU0FBWixNQUEyQixPQUFsQztBQUNEOztBQUVELGFBQVNJLDRCQUFULENBQXNDQyxJQUF0QyxFQUE0QztBQUMxQyxZQUFNTCxZQUFZLGVBQUtNLE9BQUwsQ0FBYUQsSUFBYixDQUFsQjtBQUNBLFlBQU1FLHVCQUF1QkYsS0FBS0csS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFDUixVQUFVUyxNQUF6QixDQUE3QjtBQUNBLFlBQU1DLCtCQUErQix1QkFBUUgsb0JBQVIsRUFBOEI3QixPQUE5QixDQUFyQzs7QUFFQSxhQUFPZ0MsaUNBQWlDLHVCQUFRTCxJQUFSLEVBQWMzQixPQUFkLENBQXhDO0FBQ0Q7O0FBRUQsYUFBU2lDLGtCQUFULENBQTRCQyxJQUE1QixFQUFrQztBQUFBLFlBQ3hCQyxNQUR3QixHQUNiRCxJQURhLENBQ3hCQyxNQUR3Qjs7QUFFaEMsWUFBTUMsYUFBYUQsT0FBT0UsS0FBMUI7O0FBRUE7QUFDQSxVQUFJLDJCQUFVRCxVQUFWLEVBQXNCcEMsUUFBUXNDLFFBQTlCLENBQUosRUFBNkM7O0FBRTdDLFlBQU1DLGVBQWUsdUJBQVFILFVBQVIsRUFBb0JwQyxPQUFwQixDQUFyQjs7QUFFQTtBQUNBO0FBQ0EsWUFBTXNCLFlBQVksZUFBS00sT0FBTCxDQUFhVyxnQkFBZ0JILFVBQTdCLEVBQXlDSSxTQUF6QyxDQUFtRCxDQUFuRCxDQUFsQjs7QUFFQTtBQUNBLFlBQU1oQixnQkFDSixzQ0FBcUJZLFVBQXJCLEVBQWlDcEMsUUFBUXNDLFFBQXpDLEtBQ0EsOEJBQWFGLFVBQWIsQ0FGRjs7QUFJQSxVQUFJLENBQUNkLFNBQUQsSUFBYyxDQUFDYyxXQUFXSyxRQUFYLENBQW9CbkIsU0FBcEIsQ0FBbkIsRUFBbUQ7QUFDakQsY0FBTW9CLG9CQUFvQm5CLHlCQUF5QkQsU0FBekIsRUFBb0NFLGFBQXBDLENBQTFCO0FBQ0EsY0FBTW1CLHFCQUFxQmxCLDBCQUEwQkgsU0FBMUIsQ0FBM0I7QUFDQSxZQUFJb0IscUJBQXFCLENBQUNDLGtCQUExQixFQUE4QztBQUM1QzNDLGtCQUFRNEMsTUFBUixDQUFlO0FBQ2JWLGtCQUFNQyxNQURPO0FBRWJVLHFCQUNHLDBCQUF5QnZCLFlBQWEsSUFBR0EsU0FBVSxJQUExQixHQUFnQyxFQUFHLFFBQU9jLFVBQVc7QUFIcEUsV0FBZjtBQUtEO0FBQ0YsT0FWRCxNQVVPLElBQUlkLFNBQUosRUFBZTtBQUNwQixZQUFJRywwQkFBMEJILFNBQTFCLEtBQXdDSSw2QkFBNkJVLFVBQTdCLENBQTVDLEVBQXNGO0FBQ3BGcEMsa0JBQVE0QyxNQUFSLENBQWU7QUFDYlYsa0JBQU1DLE1BRE87QUFFYlUscUJBQVUscUNBQW9DdkIsU0FBVSxVQUFTYyxVQUFXO0FBRi9ELFdBQWY7QUFJRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBTztBQUNMVSx5QkFBbUJiO0FBRGQsS0FBUDtBQUdEO0FBMUdjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxleHRlbnNpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuaW1wb3J0IHsgaXNCdWlsdEluLCBpc0V4dGVybmFsTW9kdWxlTWFpbiwgaXNTY29wZWRNYWluIH0gZnJvbSAnLi4vY29yZS9pbXBvcnRUeXBlJ1xuXG5jb25zdCBlbnVtVmFsdWVzID0geyBlbnVtOiBbICdhbHdheXMnLCAnaWdub3JlUGFja2FnZXMnLCAnbmV2ZXInIF0gfVxuY29uc3QgcGF0dGVyblByb3BlcnRpZXMgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwYXR0ZXJuUHJvcGVydGllczogeyAnLionOiBlbnVtVmFsdWVzIH0sXG59XG5jb25zdCBwcm9wZXJ0aWVzID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcHJvcGVydGllczogeyBcbiAgICAncGF0dGVybic6IHBhdHRlcm5Qcm9wZXJ0aWVzLFxuICAgICdpZ25vcmVQYWNrYWdlcyc6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gIH0sXG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvcGVydGllcyhjb250ZXh0KSB7XG5cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBkZWZhdWx0Q29uZmlnOiAnbmV2ZXInLFxuICAgICAgcGF0dGVybjoge30sXG4gICAgICBpZ25vcmVQYWNrYWdlczogZmFsc2UsXG4gICAgfVxuXG4gICAgY29udGV4dC5vcHRpb25zLmZvckVhY2gob2JqID0+IHtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0cmluZywgc2V0IGRlZmF1bHRDb25maWcgdG8gaXRzIHZhbHVlXG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzdWx0LmRlZmF1bHRDb25maWcgPSBvYmpcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IHRoZSBuZXcgc3RydWN0dXJlLCB0cmFuc2ZlciBhbGwgcHJvcHMgdG8gcmVzdWx0LnBhdHRlcm5cbiAgICAgIGlmIChvYmoucGF0dGVybiA9PT0gdW5kZWZpbmVkICYmIG9iai5pZ25vcmVQYWNrYWdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LnBhdHRlcm4sIG9iailcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHBhdHRlcm4gaXMgcHJvdmlkZWQsIHRyYW5zZmVyIGFsbCBwcm9wc1xuICAgICAgaWYgKG9iai5wYXR0ZXJuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQucGF0dGVybiwgb2JqLnBhdHRlcm4pXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGlnbm9yZVBhY2thZ2VzIGlzIHByb3ZpZGVkLCB0cmFuc2ZlciBpdCB0byByZXN1bHRcbiAgICAgIGlmIChvYmouaWdub3JlUGFja2FnZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQuaWdub3JlUGFja2FnZXMgPSBvYmouaWdub3JlUGFja2FnZXNcbiAgICAgIH0gICAgICBcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuXG4gICAgc2NoZW1hOiB7XG4gICAgICBhbnlPZjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW2VudW1WYWx1ZXNdLFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICBlbnVtVmFsdWVzLCBcbiAgICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW3Byb3BlcnRpZXNdLFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtczogZmFsc2UsXG4gICAgICAgIH0sICAgICAgICAgICAgICAgIFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW3BhdHRlcm5Qcm9wZXJ0aWVzXSxcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgZW51bVZhbHVlcyxcbiAgICAgICAgICAgIHBhdHRlcm5Qcm9wZXJ0aWVzLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cbiAgICBjb25zdCBwcm9wcyA9IGJ1aWxkUHJvcGVydGllcyhjb250ZXh0KVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldE1vZGlmaWVyKGV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIHByb3BzLnBhdHRlcm5bZXh0ZW5zaW9uXSB8fCBwcm9wcy5kZWZhdWx0Q29uZmlnXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVc2VPZkV4dGVuc2lvblJlcXVpcmVkKGV4dGVuc2lvbiwgaXNQYWNrYWdlTWFpbikge1xuICAgICAgcmV0dXJuIGdldE1vZGlmaWVyKGV4dGVuc2lvbikgPT09ICdhbHdheXMnICYmICghcHJvcHMuaWdub3JlUGFja2FnZXMgfHwgIWlzUGFja2FnZU1haW4pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVc2VPZkV4dGVuc2lvbkZvcmJpZGRlbihleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBnZXRNb2RpZmllcihleHRlbnNpb24pID09PSAnbmV2ZXInXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNSZXNvbHZhYmxlV2l0aG91dEV4dGVuc2lvbihmaWxlKSB7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSBwYXRoLmV4dG5hbWUoZmlsZSlcbiAgICAgIGNvbnN0IGZpbGVXaXRob3V0RXh0ZW5zaW9uID0gZmlsZS5zbGljZSgwLCAtZXh0ZW5zaW9uLmxlbmd0aClcbiAgICAgIGNvbnN0IHJlc29sdmVkRmlsZVdpdGhvdXRFeHRlbnNpb24gPSByZXNvbHZlKGZpbGVXaXRob3V0RXh0ZW5zaW9uLCBjb250ZXh0KVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZWRGaWxlV2l0aG91dEV4dGVuc2lvbiA9PT0gcmVzb2x2ZShmaWxlLCBjb250ZXh0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrRmlsZUV4dGVuc2lvbihub2RlKSB7XG4gICAgICBjb25zdCB7IHNvdXJjZSB9ID0gbm9kZVxuICAgICAgY29uc3QgaW1wb3J0UGF0aCA9IHNvdXJjZS52YWx1ZVxuXG4gICAgICAvLyBkb24ndCBlbmZvcmNlIGFueXRoaW5nIG9uIGJ1aWx0aW5zXG4gICAgICBpZiAoaXNCdWlsdEluKGltcG9ydFBhdGgsIGNvbnRleHQuc2V0dGluZ3MpKSByZXR1cm5cblxuICAgICAgY29uc3QgcmVzb2x2ZWRQYXRoID0gcmVzb2x2ZShpbXBvcnRQYXRoLCBjb250ZXh0KVxuXG4gICAgICAvLyBnZXQgZXh0ZW5zaW9uIGZyb20gcmVzb2x2ZWQgcGF0aCwgaWYgcG9zc2libGUuXG4gICAgICAvLyBmb3IgdW5yZXNvbHZlZCwgdXNlIHNvdXJjZSB2YWx1ZS5cbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHBhdGguZXh0bmFtZShyZXNvbHZlZFBhdGggfHwgaW1wb3J0UGF0aCkuc3Vic3RyaW5nKDEpXG5cbiAgICAgIC8vIGRldGVybWluZSBpZiB0aGlzIGlzIGEgbW9kdWxlXG4gICAgICBjb25zdCBpc1BhY2thZ2VNYWluID0gXG4gICAgICAgIGlzRXh0ZXJuYWxNb2R1bGVNYWluKGltcG9ydFBhdGgsIGNvbnRleHQuc2V0dGluZ3MpIHx8IFxuICAgICAgICBpc1Njb3BlZE1haW4oaW1wb3J0UGF0aClcblxuICAgICAgaWYgKCFleHRlbnNpb24gfHwgIWltcG9ydFBhdGguZW5kc1dpdGgoZXh0ZW5zaW9uKSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25SZXF1aXJlZCA9IGlzVXNlT2ZFeHRlbnNpb25SZXF1aXJlZChleHRlbnNpb24sIGlzUGFja2FnZU1haW4pXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbkZvcmJpZGRlbiA9IGlzVXNlT2ZFeHRlbnNpb25Gb3JiaWRkZW4oZXh0ZW5zaW9uKVxuICAgICAgICBpZiAoZXh0ZW5zaW9uUmVxdWlyZWQgJiYgIWV4dGVuc2lvbkZvcmJpZGRlbikge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgIG5vZGU6IHNvdXJjZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgIGBNaXNzaW5nIGZpbGUgZXh0ZW5zaW9uICR7ZXh0ZW5zaW9uID8gYFwiJHtleHRlbnNpb259XCIgYCA6ICcnfWZvciBcIiR7aW1wb3J0UGF0aH1cImAsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChleHRlbnNpb24pIHtcbiAgICAgICAgaWYgKGlzVXNlT2ZFeHRlbnNpb25Gb3JiaWRkZW4oZXh0ZW5zaW9uKSAmJiBpc1Jlc29sdmFibGVXaXRob3V0RXh0ZW5zaW9uKGltcG9ydFBhdGgpKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgbm9kZTogc291cmNlLFxuICAgICAgICAgICAgbWVzc2FnZTogYFVuZXhwZWN0ZWQgdXNlIG9mIGZpbGUgZXh0ZW5zaW9uIFwiJHtleHRlbnNpb259XCIgZm9yIFwiJHtpbXBvcnRQYXRofVwiYCxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIEltcG9ydERlY2xhcmF0aW9uOiBjaGVja0ZpbGVFeHRlbnNpb24sXG4gICAgfVxuICB9LFxufVxuIl19