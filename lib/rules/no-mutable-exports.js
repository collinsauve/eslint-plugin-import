'use strict';

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    function checkDeclaration(node) {
      const kind = node.kind;

      if (kind === 'var' || kind === 'let') {
        context.report(node, `Exporting mutable '${kind}' binding, use 'const' instead.`);
      }
    }

    function checkDeclarationsInScope(_ref, name) {
      let variables = _ref.variables;

      for (let variable of variables) {
        if (variable.name === name) {
          for (let def of variable.defs) {
            if (def.type === 'Variable' && def.parent) {
              checkDeclaration(def.parent);
            }
          }
        }
      }
    }

    function handleExportDefault(node) {
      const scope = context.getScope();

      if (node.declaration.name) {
        checkDeclarationsInScope(scope, node.declaration.name);
      }
    }

    function handleExportNamed(node) {
      const scope = context.getScope();

      if (node.declaration) {
        checkDeclaration(node.declaration);
      } else if (!node.source) {
        for (let specifier of node.specifiers) {
          checkDeclarationsInScope(scope, specifier.local.name);
        }
      }
    }

    return {
      'ExportDefaultDeclaration': handleExportDefault,
      'ExportNamedDeclaration': handleExportNamed
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1tdXRhYmxlLWV4cG9ydHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsImNoZWNrRGVjbGFyYXRpb24iLCJub2RlIiwia2luZCIsInJlcG9ydCIsImNoZWNrRGVjbGFyYXRpb25zSW5TY29wZSIsIm5hbWUiLCJ2YXJpYWJsZXMiLCJ2YXJpYWJsZSIsImRlZiIsImRlZnMiLCJ0eXBlIiwicGFyZW50IiwiaGFuZGxlRXhwb3J0RGVmYXVsdCIsInNjb3BlIiwiZ2V0U2NvcGUiLCJkZWNsYXJhdGlvbiIsImhhbmRsZUV4cG9ydE5hbWVkIiwic291cmNlIiwic3BlY2lmaWVyIiwic3BlY2lmaWVycyIsImxvY2FsIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQURGLEdBRFM7O0FBS2ZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QixhQUFTQyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0M7QUFBQSxZQUN2QkMsSUFEdUIsR0FDZkQsSUFEZSxDQUN2QkMsSUFEdUI7O0FBRTlCLFVBQUlBLFNBQVMsS0FBVCxJQUFrQkEsU0FBUyxLQUEvQixFQUFzQztBQUNwQ0gsZ0JBQVFJLE1BQVIsQ0FBZUYsSUFBZixFQUFzQixzQkFBcUJDLElBQUssaUNBQWhEO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTRSx3QkFBVCxPQUErQ0MsSUFBL0MsRUFBcUQ7QUFBQSxVQUFsQkMsU0FBa0IsUUFBbEJBLFNBQWtCOztBQUNuRCxXQUFLLElBQUlDLFFBQVQsSUFBcUJELFNBQXJCLEVBQWdDO0FBQzlCLFlBQUlDLFNBQVNGLElBQVQsS0FBa0JBLElBQXRCLEVBQTRCO0FBQzFCLGVBQUssSUFBSUcsR0FBVCxJQUFnQkQsU0FBU0UsSUFBekIsRUFBK0I7QUFDN0IsZ0JBQUlELElBQUlFLElBQUosS0FBYSxVQUFiLElBQTJCRixJQUFJRyxNQUFuQyxFQUEyQztBQUN6Q1gsK0JBQWlCUSxJQUFJRyxNQUFyQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsYUFBU0MsbUJBQVQsQ0FBNkJYLElBQTdCLEVBQW1DO0FBQ2pDLFlBQU1ZLFFBQVFkLFFBQVFlLFFBQVIsRUFBZDs7QUFFQSxVQUFJYixLQUFLYyxXQUFMLENBQWlCVixJQUFyQixFQUEyQjtBQUN6QkQsaUNBQXlCUyxLQUF6QixFQUFnQ1osS0FBS2MsV0FBTCxDQUFpQlYsSUFBakQ7QUFDRDtBQUNGOztBQUVELGFBQVNXLGlCQUFULENBQTJCZixJQUEzQixFQUFpQztBQUMvQixZQUFNWSxRQUFRZCxRQUFRZSxRQUFSLEVBQWQ7O0FBRUEsVUFBSWIsS0FBS2MsV0FBVCxFQUF1QjtBQUNyQmYseUJBQWlCQyxLQUFLYyxXQUF0QjtBQUNELE9BRkQsTUFFTyxJQUFJLENBQUNkLEtBQUtnQixNQUFWLEVBQWtCO0FBQ3ZCLGFBQUssSUFBSUMsU0FBVCxJQUFzQmpCLEtBQUtrQixVQUEzQixFQUF1QztBQUNyQ2YsbUNBQXlCUyxLQUF6QixFQUFnQ0ssVUFBVUUsS0FBVixDQUFnQmYsSUFBaEQ7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBTztBQUNMLGtDQUE0Qk8sbUJBRHZCO0FBRUwsZ0NBQTBCSTtBQUZyQixLQUFQO0FBSUQ7QUFqRGMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5vLW11dGFibGUtZXhwb3J0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge30sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGZ1bmN0aW9uIGNoZWNrRGVjbGFyYXRpb24obm9kZSkge1xuICAgICAgY29uc3Qge2tpbmR9ID0gbm9kZVxuICAgICAgaWYgKGtpbmQgPT09ICd2YXInIHx8IGtpbmQgPT09ICdsZXQnKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KG5vZGUsIGBFeHBvcnRpbmcgbXV0YWJsZSAnJHtraW5kfScgYmluZGluZywgdXNlICdjb25zdCcgaW5zdGVhZC5gKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrRGVjbGFyYXRpb25zSW5TY29wZSh7dmFyaWFibGVzfSwgbmFtZSkge1xuICAgICAgZm9yIChsZXQgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgIGlmICh2YXJpYWJsZS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgZm9yIChsZXQgZGVmIG9mIHZhcmlhYmxlLmRlZnMpIHtcbiAgICAgICAgICAgIGlmIChkZWYudHlwZSA9PT0gJ1ZhcmlhYmxlJyAmJiBkZWYucGFyZW50KSB7XG4gICAgICAgICAgICAgIGNoZWNrRGVjbGFyYXRpb24oZGVmLnBhcmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVFeHBvcnREZWZhdWx0KG5vZGUpIHtcbiAgICAgIGNvbnN0IHNjb3BlID0gY29udGV4dC5nZXRTY29wZSgpXG5cbiAgICAgIGlmIChub2RlLmRlY2xhcmF0aW9uLm5hbWUpIHtcbiAgICAgICAgY2hlY2tEZWNsYXJhdGlvbnNJblNjb3BlKHNjb3BlLCBub2RlLmRlY2xhcmF0aW9uLm5hbWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRXhwb3J0TmFtZWQobm9kZSkge1xuICAgICAgY29uc3Qgc2NvcGUgPSBjb250ZXh0LmdldFNjb3BlKClcblxuICAgICAgaWYgKG5vZGUuZGVjbGFyYXRpb24pICB7XG4gICAgICAgIGNoZWNrRGVjbGFyYXRpb24obm9kZS5kZWNsYXJhdGlvbilcbiAgICAgIH0gZWxzZSBpZiAoIW5vZGUuc291cmNlKSB7XG4gICAgICAgIGZvciAobGV0IHNwZWNpZmllciBvZiBub2RlLnNwZWNpZmllcnMpIHtcbiAgICAgICAgICBjaGVja0RlY2xhcmF0aW9uc0luU2NvcGUoc2NvcGUsIHNwZWNpZmllci5sb2NhbC5uYW1lKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nOiBoYW5kbGVFeHBvcnREZWZhdWx0LFxuICAgICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBoYW5kbGVFeHBvcnROYW1lZCxcbiAgICB9XG4gIH0sXG59XG4iXX0=