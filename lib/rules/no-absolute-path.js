'use strict';

var _importType = require('../core/importType');

var _importType2 = _interopRequireDefault(_importType);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reportIfMissing(context, node, name) {
  if ((0, _importType2.default)(name, context) === 'absolute') {
    context.report(node, 'Do not import modules using an absolute path');
  }
}

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    return {
      ImportDeclaration: function handleImports(node) {
        reportIfMissing(context, node, node.source.value);
      },
      CallExpression: function handleRequires(node) {
        if ((0, _staticRequire2.default)(node)) {
          reportIfMissing(context, node, node.arguments[0].value);
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1hYnNvbHV0ZS1wYXRoLmpzIl0sIm5hbWVzIjpbInJlcG9ydElmTWlzc2luZyIsImNvbnRleHQiLCJub2RlIiwibmFtZSIsInJlcG9ydCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsImNyZWF0ZSIsIkltcG9ydERlY2xhcmF0aW9uIiwiaGFuZGxlSW1wb3J0cyIsInNvdXJjZSIsInZhbHVlIiwiQ2FsbEV4cHJlc3Npb24iLCJoYW5kbGVSZXF1aXJlcyIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxlQUFULENBQXlCQyxPQUF6QixFQUFrQ0MsSUFBbEMsRUFBd0NDLElBQXhDLEVBQThDO0FBQzVDLE1BQUksMEJBQVdBLElBQVgsRUFBaUJGLE9BQWpCLE1BQThCLFVBQWxDLEVBQThDO0FBQzVDQSxZQUFRRyxNQUFSLENBQWVGLElBQWYsRUFBcUIsOENBQXJCO0FBQ0Q7QUFDRjs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU07QUFERixHQURTOztBQUtmQyxVQUFRLFVBQVVSLE9BQVYsRUFBbUI7QUFDekIsV0FBTztBQUNMUyx5QkFBbUIsU0FBU0MsYUFBVCxDQUF1QlQsSUFBdkIsRUFBNkI7QUFDOUNGLHdCQUFnQkMsT0FBaEIsRUFBeUJDLElBQXpCLEVBQStCQSxLQUFLVSxNQUFMLENBQVlDLEtBQTNDO0FBQ0QsT0FISTtBQUlMQyxzQkFBZ0IsU0FBU0MsY0FBVCxDQUF3QmIsSUFBeEIsRUFBOEI7QUFDNUMsWUFBSSw2QkFBZ0JBLElBQWhCLENBQUosRUFBMkI7QUFDekJGLDBCQUFnQkMsT0FBaEIsRUFBeUJDLElBQXpCLEVBQStCQSxLQUFLYyxTQUFMLENBQWUsQ0FBZixFQUFrQkgsS0FBakQ7QUFDRDtBQUNGO0FBUkksS0FBUDtBQVVEO0FBaEJjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxuby1hYnNvbHV0ZS1wYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGltcG9ydFR5cGUgZnJvbSAnLi4vY29yZS9pbXBvcnRUeXBlJ1xuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5cbmZ1bmN0aW9uIHJlcG9ydElmTWlzc2luZyhjb250ZXh0LCBub2RlLCBuYW1lKSB7XG4gIGlmIChpbXBvcnRUeXBlKG5hbWUsIGNvbnRleHQpID09PSAnYWJzb2x1dGUnKSB7XG4gICAgY29udGV4dC5yZXBvcnQobm9kZSwgJ0RvIG5vdCBpbXBvcnQgbW9kdWxlcyB1c2luZyBhbiBhYnNvbHV0ZSBwYXRoJylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb246IGZ1bmN0aW9uIGhhbmRsZUltcG9ydHMobm9kZSkge1xuICAgICAgICByZXBvcnRJZk1pc3NpbmcoY29udGV4dCwgbm9kZSwgbm9kZS5zb3VyY2UudmFsdWUpXG4gICAgICB9LFxuICAgICAgQ2FsbEV4cHJlc3Npb246IGZ1bmN0aW9uIGhhbmRsZVJlcXVpcmVzKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzU3RhdGljUmVxdWlyZShub2RlKSkge1xuICAgICAgICAgIHJlcG9ydElmTWlzc2luZyhjb250ZXh0LCBub2RlLCBub2RlLmFyZ3VtZW50c1swXS52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=