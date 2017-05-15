'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {

    function checkDefault(specifierType, node) {

      // poor man's Array.find
      let defaultSpecifier;
      node.specifiers.some(n => {
        if (n.type === specifierType) {
          defaultSpecifier = n;
          return true;
        }
      });

      if (!defaultSpecifier) return;
      var imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, node);
      } else if (imports.get('default') === undefined) {
        context.report(defaultSpecifier, 'No default export found in module.');
      }
    }

    return {
      'ImportDeclaration': checkDefault.bind(null, 'ImportDefaultSpecifier'),
      'ExportNamedDeclaration': checkDefault.bind(null, 'ExportDefaultSpecifier')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxkZWZhdWx0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsImNyZWF0ZSIsImNvbnRleHQiLCJjaGVja0RlZmF1bHQiLCJzcGVjaWZpZXJUeXBlIiwibm9kZSIsImRlZmF1bHRTcGVjaWZpZXIiLCJzcGVjaWZpZXJzIiwic29tZSIsIm4iLCJ0eXBlIiwiaW1wb3J0cyIsImdldCIsInNvdXJjZSIsInZhbHVlIiwiZXJyb3JzIiwibGVuZ3RoIiwicmVwb3J0RXJyb3JzIiwidW5kZWZpbmVkIiwicmVwb3J0IiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNO0FBREYsR0FEUzs7QUFLZkMsVUFBUSxVQUFVQyxPQUFWLEVBQW1COztBQUV6QixhQUFTQyxZQUFULENBQXNCQyxhQUF0QixFQUFxQ0MsSUFBckMsRUFBMkM7O0FBRXpDO0FBQ0EsVUFBSUMsZ0JBQUo7QUFDQUQsV0FBS0UsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBc0JDLENBQUQsSUFBTztBQUMxQixZQUFJQSxFQUFFQyxJQUFGLEtBQVdOLGFBQWYsRUFBOEI7QUFDNUJFLDZCQUFtQkcsQ0FBbkI7QUFDQSxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQUxEOztBQU9BLFVBQUksQ0FBQ0gsZ0JBQUwsRUFBdUI7QUFDdkIsVUFBSUssVUFBVSxvQkFBUUMsR0FBUixDQUFZUCxLQUFLUSxNQUFMLENBQVlDLEtBQXhCLEVBQStCWixPQUEvQixDQUFkO0FBQ0EsVUFBSVMsV0FBVyxJQUFmLEVBQXFCOztBQUVyQixVQUFJQSxRQUFRSSxNQUFSLENBQWVDLE1BQW5CLEVBQTJCO0FBQ3pCTCxnQkFBUU0sWUFBUixDQUFxQmYsT0FBckIsRUFBOEJHLElBQTlCO0FBQ0QsT0FGRCxNQUVPLElBQUlNLFFBQVFDLEdBQVIsQ0FBWSxTQUFaLE1BQTJCTSxTQUEvQixFQUEwQztBQUMvQ2hCLGdCQUFRaUIsTUFBUixDQUFlYixnQkFBZixFQUFpQyxvQ0FBakM7QUFDRDtBQUNGOztBQUVELFdBQU87QUFDTCwyQkFBcUJILGFBQWFpQixJQUFiLENBQWtCLElBQWxCLEVBQXdCLHdCQUF4QixDQURoQjtBQUVMLGdDQUEwQmpCLGFBQWFpQixJQUFiLENBQWtCLElBQWxCLEVBQXdCLHdCQUF4QjtBQUZyQixLQUFQO0FBSUQ7QUFqQ2MsQ0FBakIiLCJmaWxlIjoicnVsZXNcXGRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXG4gICAgZnVuY3Rpb24gY2hlY2tEZWZhdWx0KHNwZWNpZmllclR5cGUsIG5vZGUpIHtcblxuICAgICAgLy8gcG9vciBtYW4ncyBBcnJheS5maW5kXG4gICAgICBsZXQgZGVmYXVsdFNwZWNpZmllclxuICAgICAgbm9kZS5zcGVjaWZpZXJzLnNvbWUoKG4pID0+IHtcbiAgICAgICAgaWYgKG4udHlwZSA9PT0gc3BlY2lmaWVyVHlwZSkge1xuICAgICAgICAgIGRlZmF1bHRTcGVjaWZpZXIgPSBuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKCFkZWZhdWx0U3BlY2lmaWVyKSByZXR1cm5cbiAgICAgIHZhciBpbXBvcnRzID0gRXhwb3J0cy5nZXQobm9kZS5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICBpZiAoaW1wb3J0cyA9PSBudWxsKSByZXR1cm5cblxuICAgICAgaWYgKGltcG9ydHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBub2RlKVxuICAgICAgfSBlbHNlIGlmIChpbXBvcnRzLmdldCgnZGVmYXVsdCcpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQoZGVmYXVsdFNwZWNpZmllciwgJ05vIGRlZmF1bHQgZXhwb3J0IGZvdW5kIGluIG1vZHVsZS4nKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAnSW1wb3J0RGVjbGFyYXRpb24nOiBjaGVja0RlZmF1bHQuYmluZChudWxsLCAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcicpLFxuICAgICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBjaGVja0RlZmF1bHQuYmluZChudWxsLCAnRXhwb3J0RGVmYXVsdFNwZWNpZmllcicpLFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==