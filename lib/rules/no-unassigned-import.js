'use strict';

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function report(context, node) {
  context.report({
    node,
    message: 'Imported module should be assigned'
  });
}

function create(context) {
  return {
    ImportDeclaration(node) {
      if (node.specifiers.length === 0) {
        report(context, node);
      }
    },
    ExpressionStatement(node) {
      if (node.expression.type === 'CallExpression' && (0, _staticRequire2.default)(node.expression)) {
        report(context, node.expression);
      }
    }
  };
}

module.exports = {
  create,
  meta: {
    docs: {},
    schema: [{
      'type': 'object',
      'properties': {
        'devDependencies': { 'type': ['boolean', 'array'] },
        'optionalDependencies': { 'type': ['boolean', 'array'] },
        'peerDependencies': { 'type': ['boolean', 'array'] }
      },
      'additionalProperties': false
    }]
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby11bmFzc2lnbmVkLWltcG9ydC5qcyJdLCJuYW1lcyI6WyJyZXBvcnQiLCJjb250ZXh0Iiwibm9kZSIsIm1lc3NhZ2UiLCJjcmVhdGUiLCJJbXBvcnREZWNsYXJhdGlvbiIsInNwZWNpZmllcnMiLCJsZW5ndGgiLCJFeHByZXNzaW9uU3RhdGVtZW50IiwiZXhwcmVzc2lvbiIsInR5cGUiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJzY2hlbWEiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBLFNBQVNBLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxJQUF6QixFQUErQjtBQUM3QkQsVUFBUUQsTUFBUixDQUFlO0FBQ2JFLFFBRGE7QUFFYkMsYUFBUztBQUZJLEdBQWY7QUFJRDs7QUFFRCxTQUFTQyxNQUFULENBQWdCSCxPQUFoQixFQUF5QjtBQUN2QixTQUFPO0FBQ0xJLHNCQUFrQkgsSUFBbEIsRUFBd0I7QUFDdEIsVUFBSUEsS0FBS0ksVUFBTCxDQUFnQkMsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7QUFDaENQLGVBQU9DLE9BQVAsRUFBZ0JDLElBQWhCO0FBQ0Q7QUFDRixLQUxJO0FBTUxNLHdCQUFvQk4sSUFBcEIsRUFBMEI7QUFDeEIsVUFBSUEsS0FBS08sVUFBTCxDQUFnQkMsSUFBaEIsS0FBeUIsZ0JBQXpCLElBQTZDLDZCQUFnQlIsS0FBS08sVUFBckIsQ0FBakQsRUFBbUY7QUFDakZULGVBQU9DLE9BQVAsRUFBZ0JDLEtBQUtPLFVBQXJCO0FBQ0Q7QUFDRjtBQVZJLEdBQVA7QUFZRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQjtBQUNmUixRQURlO0FBRWZTLFFBQU07QUFDSkMsVUFBTSxFQURGO0FBRUpDLFlBQVEsQ0FDTjtBQUNFLGNBQVEsUUFEVjtBQUVFLG9CQUFjO0FBQ1osMkJBQW1CLEVBQUUsUUFBUSxDQUFDLFNBQUQsRUFBWSxPQUFaLENBQVYsRUFEUDtBQUVaLGdDQUF3QixFQUFFLFFBQVEsQ0FBQyxTQUFELEVBQVksT0FBWixDQUFWLEVBRlo7QUFHWiw0QkFBb0IsRUFBRSxRQUFRLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBVjtBQUhSLE9BRmhCO0FBT0UsOEJBQXdCO0FBUDFCLEtBRE07QUFGSjtBQUZTLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxuby11bmFzc2lnbmVkLWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1N0YXRpY1JlcXVpcmUgZnJvbSAnLi4vY29yZS9zdGF0aWNSZXF1aXJlJ1xuXG5mdW5jdGlvbiByZXBvcnQoY29udGV4dCwgbm9kZSkge1xuICBjb250ZXh0LnJlcG9ydCh7XG4gICAgbm9kZSxcbiAgICBtZXNzYWdlOiAnSW1wb3J0ZWQgbW9kdWxlIHNob3VsZCBiZSBhc3NpZ25lZCcsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250ZXh0KSB7XG4gIHJldHVybiB7XG4gICAgSW1wb3J0RGVjbGFyYXRpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUuc3BlY2lmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVwb3J0KGNvbnRleHQsIG5vZGUpXG4gICAgICB9XG4gICAgfSxcbiAgICBFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmV4cHJlc3Npb24udHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyAmJiBpc1N0YXRpY1JlcXVpcmUobm9kZS5leHByZXNzaW9uKSkge1xuICAgICAgICByZXBvcnQoY29udGV4dCwgbm9kZS5leHByZXNzaW9uKVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZSxcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuICAgIHNjaGVtYTogW1xuICAgICAge1xuICAgICAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAnZGV2RGVwZW5kZW5jaWVzJzogeyAndHlwZSc6IFsnYm9vbGVhbicsICdhcnJheSddIH0sXG4gICAgICAgICAgJ29wdGlvbmFsRGVwZW5kZW5jaWVzJzogeyAndHlwZSc6IFsnYm9vbGVhbicsICdhcnJheSddIH0sXG4gICAgICAgICAgJ3BlZXJEZXBlbmRlbmNpZXMnOiB7ICd0eXBlJzogWydib29sZWFuJywgJ2FycmF5J10gfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJzogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59XG4iXX0=