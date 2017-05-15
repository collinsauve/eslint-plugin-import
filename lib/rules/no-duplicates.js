'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkImports(imported, context) {
  for (let _ref of imported.entries()) {
    var _ref2 = _slicedToArray(_ref, 2);

    let module = _ref2[0];
    let nodes = _ref2[1];

    if (nodes.size > 1) {
      for (let node of nodes) {
        context.report(node, `'${module}' imported multiple times.`);
      }
    }
  }
}

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    const imported = new Map();
    const typesImported = new Map();
    return {
      'ImportDeclaration': function (n) {
        // resolved path will cover aliased duplicates
        const resolvedPath = (0, _resolve2.default)(n.source.value, context) || n.source.value;
        const importMap = n.importKind === 'type' ? typesImported : imported;

        if (importMap.has(resolvedPath)) {
          importMap.get(resolvedPath).add(n.source);
        } else {
          importMap.set(resolvedPath, new Set([n.source]));
        }
      },

      'Program:exit': function () {
        checkImports(imported, context);
        checkImports(typesImported, context);
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1kdXBsaWNhdGVzLmpzIl0sIm5hbWVzIjpbImNoZWNrSW1wb3J0cyIsImltcG9ydGVkIiwiY29udGV4dCIsImVudHJpZXMiLCJtb2R1bGUiLCJub2RlcyIsInNpemUiLCJub2RlIiwicmVwb3J0IiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiTWFwIiwidHlwZXNJbXBvcnRlZCIsIm4iLCJyZXNvbHZlZFBhdGgiLCJzb3VyY2UiLCJ2YWx1ZSIsImltcG9ydE1hcCIsImltcG9ydEtpbmQiLCJoYXMiLCJnZXQiLCJhZGQiLCJzZXQiLCJTZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBRUEsU0FBU0EsWUFBVCxDQUFzQkMsUUFBdEIsRUFBZ0NDLE9BQWhDLEVBQXlDO0FBQ3ZDLG1CQUE0QkQsU0FBU0UsT0FBVCxFQUE1QixFQUFnRDtBQUFBOztBQUFBLFFBQXRDQyxNQUFzQztBQUFBLFFBQTlCQyxLQUE4Qjs7QUFDOUMsUUFBSUEsTUFBTUMsSUFBTixHQUFhLENBQWpCLEVBQW9CO0FBQ2xCLFdBQUssSUFBSUMsSUFBVCxJQUFpQkYsS0FBakIsRUFBd0I7QUFDdEJILGdCQUFRTSxNQUFSLENBQWVELElBQWYsRUFBc0IsSUFBR0gsTUFBTyw0QkFBaEM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFREEsT0FBT0ssT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU07QUFERixHQURTOztBQUtmQyxVQUFRLFVBQVVWLE9BQVYsRUFBbUI7QUFDekIsVUFBTUQsV0FBVyxJQUFJWSxHQUFKLEVBQWpCO0FBQ0EsVUFBTUMsZ0JBQWdCLElBQUlELEdBQUosRUFBdEI7QUFDQSxXQUFPO0FBQ0wsMkJBQXFCLFVBQVVFLENBQVYsRUFBYTtBQUNoQztBQUNBLGNBQU1DLGVBQWUsdUJBQVFELEVBQUVFLE1BQUYsQ0FBU0MsS0FBakIsRUFBd0JoQixPQUF4QixLQUFvQ2EsRUFBRUUsTUFBRixDQUFTQyxLQUFsRTtBQUNBLGNBQU1DLFlBQVlKLEVBQUVLLFVBQUYsS0FBaUIsTUFBakIsR0FBMEJOLGFBQTFCLEdBQTBDYixRQUE1RDs7QUFFQSxZQUFJa0IsVUFBVUUsR0FBVixDQUFjTCxZQUFkLENBQUosRUFBaUM7QUFDL0JHLG9CQUFVRyxHQUFWLENBQWNOLFlBQWQsRUFBNEJPLEdBQTVCLENBQWdDUixFQUFFRSxNQUFsQztBQUNELFNBRkQsTUFFTztBQUNMRSxvQkFBVUssR0FBVixDQUFjUixZQUFkLEVBQTRCLElBQUlTLEdBQUosQ0FBUSxDQUFDVixFQUFFRSxNQUFILENBQVIsQ0FBNUI7QUFDRDtBQUNGLE9BWEk7O0FBYUwsc0JBQWdCLFlBQVk7QUFDMUJqQixxQkFBYUMsUUFBYixFQUF1QkMsT0FBdkI7QUFDQUYscUJBQWFjLGFBQWIsRUFBNEJaLE9BQTVCO0FBQ0Q7QUFoQkksS0FBUDtBQWtCRDtBQTFCYyxDQUFqQiIsImZpbGUiOiJydWxlc1xcbm8tZHVwbGljYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNvbHZlIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvcmVzb2x2ZSdcblxuZnVuY3Rpb24gY2hlY2tJbXBvcnRzKGltcG9ydGVkLCBjb250ZXh0KSB7XG4gIGZvciAobGV0IFttb2R1bGUsIG5vZGVzXSBvZiBpbXBvcnRlZC5lbnRyaWVzKCkpIHtcbiAgICBpZiAobm9kZXMuc2l6ZSA+IDEpIHtcbiAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZSwgYCcke21vZHVsZX0nIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzLmApXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnN0IGltcG9ydGVkID0gbmV3IE1hcCgpXG4gICAgY29uc3QgdHlwZXNJbXBvcnRlZCA9IG5ldyBNYXAoKVxuICAgIHJldHVybiB7XG4gICAgICAnSW1wb3J0RGVjbGFyYXRpb24nOiBmdW5jdGlvbiAobikge1xuICAgICAgICAvLyByZXNvbHZlZCBwYXRoIHdpbGwgY292ZXIgYWxpYXNlZCBkdXBsaWNhdGVzXG4gICAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHJlc29sdmUobi5zb3VyY2UudmFsdWUsIGNvbnRleHQpIHx8IG4uc291cmNlLnZhbHVlXG4gICAgICAgIGNvbnN0IGltcG9ydE1hcCA9IG4uaW1wb3J0S2luZCA9PT0gJ3R5cGUnID8gdHlwZXNJbXBvcnRlZCA6IGltcG9ydGVkXG5cbiAgICAgICAgaWYgKGltcG9ydE1hcC5oYXMocmVzb2x2ZWRQYXRoKSkge1xuICAgICAgICAgIGltcG9ydE1hcC5nZXQocmVzb2x2ZWRQYXRoKS5hZGQobi5zb3VyY2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW1wb3J0TWFwLnNldChyZXNvbHZlZFBhdGgsIG5ldyBTZXQoW24uc291cmNlXSkpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgICdQcm9ncmFtOmV4aXQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW1wb3J0cyhpbXBvcnRlZCwgY29udGV4dClcbiAgICAgICAgY2hlY2tJbXBvcnRzKHR5cGVzSW1wb3J0ZWQsIGNvbnRleHQpXG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==