'use strict';

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    function isPossibleDirective(node) {
      return node.type === 'ExpressionStatement' && node.expression.type === 'Literal' && typeof node.expression.value === 'string';
    }

    return {
      'Program': function (n) {
        const body = n.body,
              absoluteFirst = context.options[0] === 'absolute-first';
        let nonImportCount = 0,
            anyExpressions = false,
            anyRelative = false;
        body.forEach(function (node) {
          if (!anyExpressions && isPossibleDirective(node)) {
            return;
          }

          anyExpressions = true;

          if (node.type === 'ImportDeclaration') {
            if (absoluteFirst) {
              if (/^\./.test(node.source.value)) {
                anyRelative = true;
              } else if (anyRelative) {
                context.report({
                  node: node.source,
                  message: 'Absolute imports should come before relative imports.'
                });
              }
            }
            if (nonImportCount > 0) {
              context.report({
                node,
                message: 'Import in body of module; reorder to top.'
              });
            }
          } else {
            nonImportCount++;
          }
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxmaXJzdC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJjcmVhdGUiLCJjb250ZXh0IiwiaXNQb3NzaWJsZURpcmVjdGl2ZSIsIm5vZGUiLCJ0eXBlIiwiZXhwcmVzc2lvbiIsInZhbHVlIiwibiIsImJvZHkiLCJhYnNvbHV0ZUZpcnN0Iiwib3B0aW9ucyIsIm5vbkltcG9ydENvdW50IiwiYW55RXhwcmVzc2lvbnMiLCJhbnlSZWxhdGl2ZSIsImZvckVhY2giLCJ0ZXN0Iiwic291cmNlIiwicmVwb3J0IiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU07QUFERixHQURTOztBQUtmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsYUFBU0MsbUJBQVQsQ0FBOEJDLElBQTlCLEVBQW9DO0FBQ2xDLGFBQU9BLEtBQUtDLElBQUwsS0FBYyxxQkFBZCxJQUNMRCxLQUFLRSxVQUFMLENBQWdCRCxJQUFoQixLQUF5QixTQURwQixJQUVMLE9BQU9ELEtBQUtFLFVBQUwsQ0FBZ0JDLEtBQXZCLEtBQWlDLFFBRm5DO0FBR0Q7O0FBRUQsV0FBTztBQUNMLGlCQUFXLFVBQVVDLENBQVYsRUFBYTtBQUN0QixjQUFNQyxPQUFPRCxFQUFFQyxJQUFmO0FBQUEsY0FDTUMsZ0JBQWdCUixRQUFRUyxPQUFSLENBQWdCLENBQWhCLE1BQXVCLGdCQUQ3QztBQUVBLFlBQUlDLGlCQUFpQixDQUFyQjtBQUFBLFlBQ0lDLGlCQUFpQixLQURyQjtBQUFBLFlBRUlDLGNBQWMsS0FGbEI7QUFHQUwsYUFBS00sT0FBTCxDQUFhLFVBQVVYLElBQVYsRUFBZTtBQUMxQixjQUFJLENBQUNTLGNBQUQsSUFBbUJWLG9CQUFvQkMsSUFBcEIsQ0FBdkIsRUFBa0Q7QUFDaEQ7QUFDRDs7QUFFRFMsMkJBQWlCLElBQWpCOztBQUVBLGNBQUlULEtBQUtDLElBQUwsS0FBYyxtQkFBbEIsRUFBdUM7QUFDckMsZ0JBQUlLLGFBQUosRUFBbUI7QUFDakIsa0JBQUksTUFBTU0sSUFBTixDQUFXWixLQUFLYSxNQUFMLENBQVlWLEtBQXZCLENBQUosRUFBbUM7QUFDakNPLDhCQUFjLElBQWQ7QUFDRCxlQUZELE1BRU8sSUFBSUEsV0FBSixFQUFpQjtBQUN0Qlosd0JBQVFnQixNQUFSLENBQWU7QUFDYmQsd0JBQU1BLEtBQUthLE1BREU7QUFFYkUsMkJBQVM7QUFGSSxpQkFBZjtBQUlEO0FBQ0Y7QUFDRCxnQkFBSVAsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3RCVixzQkFBUWdCLE1BQVIsQ0FBZTtBQUNiZCxvQkFEYTtBQUViZSx5QkFBUztBQUZJLGVBQWY7QUFJRDtBQUNGLFdBakJELE1BaUJPO0FBQ0xQO0FBQ0Q7QUFDRixTQTNCRDtBQTRCRDtBQW5DSSxLQUFQO0FBcUNEO0FBakRjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxmaXJzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGZ1bmN0aW9uIGlzUG9zc2libGVEaXJlY3RpdmUgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50JyAmJlxuICAgICAgICBub2RlLmV4cHJlc3Npb24udHlwZSA9PT0gJ0xpdGVyYWwnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLmV4cHJlc3Npb24udmFsdWUgPT09ICdzdHJpbmcnXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdQcm9ncmFtJzogZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgY29uc3QgYm9keSA9IG4uYm9keVxuICAgICAgICAgICAgLCBhYnNvbHV0ZUZpcnN0ID0gY29udGV4dC5vcHRpb25zWzBdID09PSAnYWJzb2x1dGUtZmlyc3QnXG4gICAgICAgIGxldCBub25JbXBvcnRDb3VudCA9IDBcbiAgICAgICAgICAsIGFueUV4cHJlc3Npb25zID0gZmFsc2VcbiAgICAgICAgICAsIGFueVJlbGF0aXZlID0gZmFsc2VcbiAgICAgICAgYm9keS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKXtcbiAgICAgICAgICBpZiAoIWFueUV4cHJlc3Npb25zICYmIGlzUG9zc2libGVEaXJlY3RpdmUobm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGFueUV4cHJlc3Npb25zID0gdHJ1ZVxuXG4gICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0ltcG9ydERlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgaWYgKGFic29sdXRlRmlyc3QpIHtcbiAgICAgICAgICAgICAgaWYgKC9eXFwuLy50ZXN0KG5vZGUuc291cmNlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGFueVJlbGF0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFueVJlbGF0aXZlKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQWJzb2x1dGUgaW1wb3J0cyBzaG91bGQgY29tZSBiZWZvcmUgcmVsYXRpdmUgaW1wb3J0cy4nLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub25JbXBvcnRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ0ltcG9ydCBpbiBib2R5IG9mIG1vZHVsZTsgcmVvcmRlciB0byB0b3AuJyxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9uSW1wb3J0Q291bnQrK1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19