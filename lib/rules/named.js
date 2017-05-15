'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    function checkSpecifiers(key, type, node) {
      if (node.source == null) return; // local export, ignore

      if (!node.specifiers.some(function (im) {
        return im.type === type;
      })) {
        return; // no named imports/exports
      }

      const imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, node);
        return;
      }

      node.specifiers.forEach(function (im) {
        if (im.type !== type) return;

        const deepLookup = imports.hasDeep(im[key].name);

        if (!deepLookup.found) {
          if (deepLookup.path.length > 1) {
            const deepPath = deepLookup.path.map(i => path.relative(path.dirname(context.getFilename()), i.path)).join(' -> ');

            context.report(im[key], `${im[key].name} not found via ${deepPath}`);
          } else {
            context.report(im[key], im[key].name + ' not found in \'' + node.source.value + '\'');
          }
        }
      });
    }

    return {
      'ImportDeclaration': checkSpecifiers.bind(null, 'imported', 'ImportSpecifier'),

      'ExportNamedDeclaration': checkSpecifiers.bind(null, 'local', 'ExportSpecifier')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuYW1lZC5qcyJdLCJuYW1lcyI6WyJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsImNoZWNrU3BlY2lmaWVycyIsImtleSIsInR5cGUiLCJub2RlIiwic291cmNlIiwic3BlY2lmaWVycyIsInNvbWUiLCJpbSIsImltcG9ydHMiLCJnZXQiLCJ2YWx1ZSIsImVycm9ycyIsImxlbmd0aCIsInJlcG9ydEVycm9ycyIsImZvckVhY2giLCJkZWVwTG9va3VwIiwiaGFzRGVlcCIsIm5hbWUiLCJmb3VuZCIsImRlZXBQYXRoIiwibWFwIiwiaSIsInJlbGF0aXZlIiwiZGlybmFtZSIsImdldEZpbGVuYW1lIiwiam9pbiIsInJlcG9ydCIsImJpbmQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0lBQVlBLEk7O0FBQ1o7Ozs7Ozs7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNO0FBREYsR0FEUzs7QUFLZkMsVUFBUSxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pCLGFBQVNDLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCQyxJQUE5QixFQUFvQ0MsSUFBcEMsRUFBMEM7QUFDeEMsVUFBSUEsS0FBS0MsTUFBTCxJQUFlLElBQW5CLEVBQXlCLE9BRGUsQ0FDUjs7QUFFaEMsVUFBSSxDQUFDRCxLQUFLRSxVQUFMLENBQ0VDLElBREYsQ0FDTyxVQUFVQyxFQUFWLEVBQWM7QUFBRSxlQUFPQSxHQUFHTCxJQUFILEtBQVlBLElBQW5CO0FBQXlCLE9BRGhELENBQUwsRUFDd0Q7QUFDdEQsZUFEc0QsQ0FDL0M7QUFDUjs7QUFFRCxZQUFNTSxVQUFVLG9CQUFRQyxHQUFSLENBQVlOLEtBQUtDLE1BQUwsQ0FBWU0sS0FBeEIsRUFBK0JYLE9BQS9CLENBQWhCO0FBQ0EsVUFBSVMsV0FBVyxJQUFmLEVBQXFCOztBQUVyQixVQUFJQSxRQUFRRyxNQUFSLENBQWVDLE1BQW5CLEVBQTJCO0FBQ3pCSixnQkFBUUssWUFBUixDQUFxQmQsT0FBckIsRUFBOEJJLElBQTlCO0FBQ0E7QUFDRDs7QUFFREEsV0FBS0UsVUFBTCxDQUFnQlMsT0FBaEIsQ0FBd0IsVUFBVVAsRUFBVixFQUFjO0FBQ3BDLFlBQUlBLEdBQUdMLElBQUgsS0FBWUEsSUFBaEIsRUFBc0I7O0FBRXRCLGNBQU1hLGFBQWFQLFFBQVFRLE9BQVIsQ0FBZ0JULEdBQUdOLEdBQUgsRUFBUWdCLElBQXhCLENBQW5COztBQUVBLFlBQUksQ0FBQ0YsV0FBV0csS0FBaEIsRUFBdUI7QUFDckIsY0FBSUgsV0FBV3RCLElBQVgsQ0FBZ0JtQixNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM5QixrQkFBTU8sV0FBV0osV0FBV3RCLElBQVgsQ0FDZDJCLEdBRGMsQ0FDVkMsS0FBSzVCLEtBQUs2QixRQUFMLENBQWM3QixLQUFLOEIsT0FBTCxDQUFheEIsUUFBUXlCLFdBQVIsRUFBYixDQUFkLEVBQW1ESCxFQUFFNUIsSUFBckQsQ0FESyxFQUVkZ0MsSUFGYyxDQUVULE1BRlMsQ0FBakI7O0FBSUExQixvQkFBUTJCLE1BQVIsQ0FBZW5CLEdBQUdOLEdBQUgsQ0FBZixFQUNHLEdBQUVNLEdBQUdOLEdBQUgsRUFBUWdCLElBQUssa0JBQWlCRSxRQUFTLEVBRDVDO0FBRUQsV0FQRCxNQU9PO0FBQ0xwQixvQkFBUTJCLE1BQVIsQ0FBZW5CLEdBQUdOLEdBQUgsQ0FBZixFQUNFTSxHQUFHTixHQUFILEVBQVFnQixJQUFSLEdBQWUsa0JBQWYsR0FBb0NkLEtBQUtDLE1BQUwsQ0FBWU0sS0FBaEQsR0FBd0QsSUFEMUQ7QUFFRDtBQUNGO0FBQ0YsT0FsQkQ7QUFtQkQ7O0FBRUQsV0FBTztBQUNMLDJCQUFxQlYsZ0JBQWdCMkIsSUFBaEIsQ0FBc0IsSUFBdEIsRUFDc0IsVUFEdEIsRUFFc0IsaUJBRnRCLENBRGhCOztBQU1MLGdDQUEwQjNCLGdCQUFnQjJCLElBQWhCLENBQXNCLElBQXRCLEVBQ3NCLE9BRHRCLEVBRXNCLGlCQUZ0QjtBQU5yQixLQUFQO0FBWUQ7QUF2RGMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5hbWVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vRXhwb3J0TWFwJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBmdW5jdGlvbiBjaGVja1NwZWNpZmllcnMoa2V5LCB0eXBlLCBub2RlKSB7XG4gICAgICBpZiAobm9kZS5zb3VyY2UgPT0gbnVsbCkgcmV0dXJuIC8vIGxvY2FsIGV4cG9ydCwgaWdub3JlXG5cbiAgICAgIGlmICghbm9kZS5zcGVjaWZpZXJzXG4gICAgICAgICAgICAuc29tZShmdW5jdGlvbiAoaW0pIHsgcmV0dXJuIGltLnR5cGUgPT09IHR5cGUgfSkpIHtcbiAgICAgICAgcmV0dXJuIC8vIG5vIG5hbWVkIGltcG9ydHMvZXhwb3J0c1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbXBvcnRzID0gRXhwb3J0cy5nZXQobm9kZS5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICBpZiAoaW1wb3J0cyA9PSBudWxsKSByZXR1cm5cblxuICAgICAgaWYgKGltcG9ydHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBub2RlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbm9kZS5zcGVjaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKGltKSB7XG4gICAgICAgIGlmIChpbS50eXBlICE9PSB0eXBlKSByZXR1cm5cblxuICAgICAgICBjb25zdCBkZWVwTG9va3VwID0gaW1wb3J0cy5oYXNEZWVwKGltW2tleV0ubmFtZSlcblxuICAgICAgICBpZiAoIWRlZXBMb29rdXAuZm91bmQpIHtcbiAgICAgICAgICBpZiAoZGVlcExvb2t1cC5wYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZXBQYXRoID0gZGVlcExvb2t1cC5wYXRoXG4gICAgICAgICAgICAgIC5tYXAoaSA9PiBwYXRoLnJlbGF0aXZlKHBhdGguZGlybmFtZShjb250ZXh0LmdldEZpbGVuYW1lKCkpLCBpLnBhdGgpKVxuICAgICAgICAgICAgICAuam9pbignIC0+ICcpXG5cbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KGltW2tleV0sXG4gICAgICAgICAgICAgIGAke2ltW2tleV0ubmFtZX0gbm90IGZvdW5kIHZpYSAke2RlZXBQYXRofWApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KGltW2tleV0sXG4gICAgICAgICAgICAgIGltW2tleV0ubmFtZSArICcgbm90IGZvdW5kIGluIFxcJycgKyBub2RlLnNvdXJjZS52YWx1ZSArICdcXCcnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ0ltcG9ydERlY2xhcmF0aW9uJzogY2hlY2tTcGVjaWZpZXJzLmJpbmQoIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAnaW1wb3J0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ0ltcG9ydFNwZWNpZmllcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcblxuICAgICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBjaGVja1NwZWNpZmllcnMuYmluZCggbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ2xvY2FsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ0V4cG9ydFNwZWNpZmllcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgIH1cblxuICB9LFxufVxuIl19