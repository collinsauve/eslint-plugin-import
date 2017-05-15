'use strict';

/**
 * @fileoverview Rule to prefer ES6 to CJS
 * @author Jamund Ferguson
 */

const EXPORT_MESSAGE = 'Expected "export" or "export default"',
      IMPORT_MESSAGE = 'Expected "import" instead of "require()"';

function allowPrimitive(node, context) {
  if (context.options.indexOf('allow-primitive-modules') < 0) return false;
  if (node.parent.type !== 'AssignmentExpression') return false;
  return node.parent.right.type !== 'ObjectExpression';
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {

    return {

      'MemberExpression': function (node) {

        // module.exports
        if (node.object.name === 'module' && node.property.name === 'exports') {
          if (allowPrimitive(node, context)) return;
          context.report({ node, message: EXPORT_MESSAGE });
        }

        // exports.
        if (node.object.name === 'exports') {
          context.report({ node, message: EXPORT_MESSAGE });
        }
      },
      'CallExpression': function (call) {
        if (context.getScope().type !== 'module') return;

        if (call.callee.type !== 'Identifier') return;
        if (call.callee.name !== 'require') return;

        if (call.arguments.length !== 1) return;
        var module = call.arguments[0];

        if (module.type !== 'Literal') return;
        if (typeof module.value !== 'string') return;

        // keeping it simple: all 1-string-arg `require` calls are reported
        context.report({
          node: call.callee,
          message: IMPORT_MESSAGE
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1jb21tb25qcy5qcyJdLCJuYW1lcyI6WyJFWFBPUlRfTUVTU0FHRSIsIklNUE9SVF9NRVNTQUdFIiwiYWxsb3dQcmltaXRpdmUiLCJub2RlIiwiY29udGV4dCIsIm9wdGlvbnMiLCJpbmRleE9mIiwicGFyZW50IiwidHlwZSIsInJpZ2h0IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwib2JqZWN0IiwibmFtZSIsInByb3BlcnR5IiwicmVwb3J0IiwibWVzc2FnZSIsImNhbGwiLCJnZXRTY29wZSIsImNhbGxlZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBLE1BQU1BLGlCQUFpQix1Q0FBdkI7QUFBQSxNQUNNQyxpQkFBaUIsMENBRHZCOztBQUdBLFNBQVNDLGNBQVQsQ0FBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF1QztBQUNyQyxNQUFJQSxRQUFRQyxPQUFSLENBQWdCQyxPQUFoQixDQUF3Qix5QkFBeEIsSUFBcUQsQ0FBekQsRUFBNEQsT0FBTyxLQUFQO0FBQzVELE1BQUlILEtBQUtJLE1BQUwsQ0FBWUMsSUFBWixLQUFxQixzQkFBekIsRUFBaUQsT0FBTyxLQUFQO0FBQ2pELFNBQVFMLEtBQUtJLE1BQUwsQ0FBWUUsS0FBWixDQUFrQkQsSUFBbEIsS0FBMkIsa0JBQW5DO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBOzs7QUFHQUUsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU07QUFERixHQURTOztBQUtmQyxVQUFRLFVBQVVWLE9BQVYsRUFBbUI7O0FBRXpCLFdBQU87O0FBRUwsMEJBQW9CLFVBQVVELElBQVYsRUFBZ0I7O0FBRWxDO0FBQ0EsWUFBSUEsS0FBS1ksTUFBTCxDQUFZQyxJQUFaLEtBQXFCLFFBQXJCLElBQWlDYixLQUFLYyxRQUFMLENBQWNELElBQWQsS0FBdUIsU0FBNUQsRUFBdUU7QUFDckUsY0FBSWQsZUFBZUMsSUFBZixFQUFxQkMsT0FBckIsQ0FBSixFQUFtQztBQUNuQ0Esa0JBQVFjLE1BQVIsQ0FBZSxFQUFFZixJQUFGLEVBQVFnQixTQUFTbkIsY0FBakIsRUFBZjtBQUNEOztBQUVEO0FBQ0EsWUFBSUcsS0FBS1ksTUFBTCxDQUFZQyxJQUFaLEtBQXFCLFNBQXpCLEVBQW9DO0FBQ2xDWixrQkFBUWMsTUFBUixDQUFlLEVBQUVmLElBQUYsRUFBUWdCLFNBQVNuQixjQUFqQixFQUFmO0FBQ0Q7QUFFRixPQWZJO0FBZ0JMLHdCQUFrQixVQUFVb0IsSUFBVixFQUFnQjtBQUNoQyxZQUFJaEIsUUFBUWlCLFFBQVIsR0FBbUJiLElBQW5CLEtBQTRCLFFBQWhDLEVBQTBDOztBQUUxQyxZQUFJWSxLQUFLRSxNQUFMLENBQVlkLElBQVosS0FBcUIsWUFBekIsRUFBdUM7QUFDdkMsWUFBSVksS0FBS0UsTUFBTCxDQUFZTixJQUFaLEtBQXFCLFNBQXpCLEVBQW9DOztBQUVwQyxZQUFJSSxLQUFLRyxTQUFMLENBQWVDLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDakMsWUFBSWQsU0FBU1UsS0FBS0csU0FBTCxDQUFlLENBQWYsQ0FBYjs7QUFFQSxZQUFJYixPQUFPRixJQUFQLEtBQWdCLFNBQXBCLEVBQStCO0FBQy9CLFlBQUksT0FBT0UsT0FBT2UsS0FBZCxLQUF3QixRQUE1QixFQUFzQzs7QUFFdEM7QUFDQXJCLGdCQUFRYyxNQUFSLENBQWU7QUFDYmYsZ0JBQU1pQixLQUFLRSxNQURFO0FBRWJILG1CQUFTbEI7QUFGSSxTQUFmO0FBSUQ7QUFqQ0ksS0FBUDtBQW9DRDtBQTNDYyxDQUFqQiIsImZpbGUiOiJydWxlc1xcbm8tY29tbW9uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUnVsZSB0byBwcmVmZXIgRVM2IHRvIENKU1xuICogQGF1dGhvciBKYW11bmQgRmVyZ3Vzb25cbiAqL1xuXG5jb25zdCBFWFBPUlRfTUVTU0FHRSA9ICdFeHBlY3RlZCBcImV4cG9ydFwiIG9yIFwiZXhwb3J0IGRlZmF1bHRcIidcbiAgICAsIElNUE9SVF9NRVNTQUdFID0gJ0V4cGVjdGVkIFwiaW1wb3J0XCIgaW5zdGVhZCBvZiBcInJlcXVpcmUoKVwiJ1xuXG5mdW5jdGlvbiBhbGxvd1ByaW1pdGl2ZShub2RlLCBjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm9wdGlvbnMuaW5kZXhPZignYWxsb3ctcHJpbWl0aXZlLW1vZHVsZXMnKSA8IDApIHJldHVybiBmYWxzZVxuICBpZiAobm9kZS5wYXJlbnQudHlwZSAhPT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykgcmV0dXJuIGZhbHNlXG4gIHJldHVybiAobm9kZS5wYXJlbnQucmlnaHQudHlwZSAhPT0gJ09iamVjdEV4cHJlc3Npb24nKVxufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBEZWZpbml0aW9uXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgJ01lbWJlckV4cHJlc3Npb24nOiBmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgIC8vIG1vZHVsZS5leHBvcnRzXG4gICAgICAgIGlmIChub2RlLm9iamVjdC5uYW1lID09PSAnbW9kdWxlJyAmJiBub2RlLnByb3BlcnR5Lm5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgICAgIGlmIChhbGxvd1ByaW1pdGl2ZShub2RlLCBjb250ZXh0KSkgcmV0dXJuXG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoeyBub2RlLCBtZXNzYWdlOiBFWFBPUlRfTUVTU0FHRSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwb3J0cy5cbiAgICAgICAgaWYgKG5vZGUub2JqZWN0Lm5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHsgbm9kZSwgbWVzc2FnZTogRVhQT1JUX01FU1NBR0UgfSlcbiAgICAgICAgfVxuXG4gICAgICB9LFxuICAgICAgJ0NhbGxFeHByZXNzaW9uJzogZnVuY3Rpb24gKGNhbGwpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuZ2V0U2NvcGUoKS50eXBlICE9PSAnbW9kdWxlJykgcmV0dXJuXG5cbiAgICAgICAgaWYgKGNhbGwuY2FsbGVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuXG4gICAgICAgIGlmIChjYWxsLmNhbGxlZS5uYW1lICE9PSAncmVxdWlyZScpIHJldHVyblxuXG4gICAgICAgIGlmIChjYWxsLmFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHJldHVyblxuICAgICAgICB2YXIgbW9kdWxlID0gY2FsbC5hcmd1bWVudHNbMF1cblxuICAgICAgICBpZiAobW9kdWxlLnR5cGUgIT09ICdMaXRlcmFsJykgcmV0dXJuXG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlLnZhbHVlICE9PSAnc3RyaW5nJykgcmV0dXJuXG5cbiAgICAgICAgLy8ga2VlcGluZyBpdCBzaW1wbGU6IGFsbCAxLXN0cmluZy1hcmcgYHJlcXVpcmVgIGNhbGxzIGFyZSByZXBvcnRlZFxuICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgbm9kZTogY2FsbC5jYWxsZWUsXG4gICAgICAgICAgbWVzc2FnZTogSU1QT1JUX01FU1NBR0UsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH1cblxuICB9LFxufVxuIl19