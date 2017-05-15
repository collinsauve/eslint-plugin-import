'use strict';

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    let specifierExportCount = 0;
    let hasDefaultExport = false;
    let hasStarExport = false;
    let namedExportNode = null;

    function captureDeclaration(identifierOrPattern) {
      if (identifierOrPattern.type === 'ObjectPattern') {
        // recursively capture
        identifierOrPattern.properties.forEach(function (property) {
          captureDeclaration(property.value);
        });
      } else {
        // assume it's a single standard identifier
        specifierExportCount++;
      }
    }

    return {
      'ExportDefaultSpecifier': function () {
        hasDefaultExport = true;
      },

      'ExportSpecifier': function (node) {
        if (node.exported.name === 'default') {
          hasDefaultExport = true;
        } else {
          specifierExportCount++;
          namedExportNode = node;
        }
      },

      'ExportNamedDeclaration': function (node) {
        // if there are specifiers, node.declaration should be null
        if (!node.declaration) return;

        // don't count flow types exports
        if (node.exportKind === 'type') return;

        if (node.declaration.declarations) {
          node.declaration.declarations.forEach(function (declaration) {
            captureDeclaration(declaration.id);
          });
        } else {
          // captures 'export function foo() {}' syntax
          specifierExportCount++;
        }

        namedExportNode = node;
      },

      'ExportDefaultDeclaration': function () {
        hasDefaultExport = true;
      },

      'ExportAllDeclaration': function () {
        hasStarExport = true;
      },

      'Program:exit': function () {
        if (specifierExportCount === 1 && !hasDefaultExport && !hasStarExport) {
          context.report(namedExportNode, 'Prefer default export.');
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxwcmVmZXItZGVmYXVsdC1leHBvcnQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsInNwZWNpZmllckV4cG9ydENvdW50IiwiaGFzRGVmYXVsdEV4cG9ydCIsImhhc1N0YXJFeHBvcnQiLCJuYW1lZEV4cG9ydE5vZGUiLCJjYXB0dXJlRGVjbGFyYXRpb24iLCJpZGVudGlmaWVyT3JQYXR0ZXJuIiwidHlwZSIsInByb3BlcnRpZXMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJ2YWx1ZSIsIm5vZGUiLCJleHBvcnRlZCIsIm5hbWUiLCJkZWNsYXJhdGlvbiIsImV4cG9ydEtpbmQiLCJkZWNsYXJhdGlvbnMiLCJpZCIsInJlcG9ydCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNO0FBREYsR0FEUzs7QUFLZkMsVUFBUSxVQUFTQyxPQUFULEVBQWtCO0FBQ3hCLFFBQUlDLHVCQUF1QixDQUEzQjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLGdCQUFnQixLQUFwQjtBQUNBLFFBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxhQUFTQyxrQkFBVCxDQUE0QkMsbUJBQTVCLEVBQWlEO0FBQy9DLFVBQUlBLG9CQUFvQkMsSUFBcEIsS0FBNkIsZUFBakMsRUFBa0Q7QUFDaEQ7QUFDQUQsNEJBQW9CRSxVQUFwQixDQUNHQyxPQURILENBQ1csVUFBU0MsUUFBVCxFQUFtQjtBQUMxQkwsNkJBQW1CSyxTQUFTQyxLQUE1QjtBQUNELFNBSEg7QUFJRCxPQU5ELE1BTU87QUFDUDtBQUNFVjtBQUNEO0FBQ0Y7O0FBRUQsV0FBTztBQUNMLGdDQUEwQixZQUFXO0FBQ25DQywyQkFBbUIsSUFBbkI7QUFDRCxPQUhJOztBQUtMLHlCQUFtQixVQUFTVSxJQUFULEVBQWU7QUFDaEMsWUFBSUEsS0FBS0MsUUFBTCxDQUFjQyxJQUFkLEtBQXVCLFNBQTNCLEVBQXNDO0FBQ3BDWiw2QkFBbUIsSUFBbkI7QUFDRCxTQUZELE1BRU87QUFDTEQ7QUFDQUcsNEJBQWtCUSxJQUFsQjtBQUNEO0FBQ0YsT0FaSTs7QUFjTCxnQ0FBMEIsVUFBU0EsSUFBVCxFQUFlO0FBQ3ZDO0FBQ0EsWUFBSSxDQUFDQSxLQUFLRyxXQUFWLEVBQXVCOztBQUV2QjtBQUNBLFlBQUlILEtBQUtJLFVBQUwsS0FBb0IsTUFBeEIsRUFBZ0M7O0FBRWhDLFlBQUlKLEtBQUtHLFdBQUwsQ0FBaUJFLFlBQXJCLEVBQW1DO0FBQ2pDTCxlQUFLRyxXQUFMLENBQWlCRSxZQUFqQixDQUE4QlIsT0FBOUIsQ0FBc0MsVUFBU00sV0FBVCxFQUFzQjtBQUMxRFYsK0JBQW1CVSxZQUFZRyxFQUEvQjtBQUNELFdBRkQ7QUFHRCxTQUpELE1BS0s7QUFDSDtBQUNBakI7QUFDRDs7QUFFREcsMEJBQWtCUSxJQUFsQjtBQUNELE9BaENJOztBQWtDTCxrQ0FBNEIsWUFBVztBQUNyQ1YsMkJBQW1CLElBQW5CO0FBQ0QsT0FwQ0k7O0FBc0NMLDhCQUF3QixZQUFXO0FBQ2pDQyx3QkFBZ0IsSUFBaEI7QUFDRCxPQXhDSTs7QUEwQ0wsc0JBQWdCLFlBQVc7QUFDekIsWUFBSUYseUJBQXlCLENBQXpCLElBQThCLENBQUNDLGdCQUEvQixJQUFtRCxDQUFDQyxhQUF4RCxFQUF1RTtBQUNyRUgsa0JBQVFtQixNQUFSLENBQWVmLGVBQWYsRUFBZ0Msd0JBQWhDO0FBQ0Q7QUFDRjtBQTlDSSxLQUFQO0FBZ0REO0FBeEVjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxwcmVmZXItZGVmYXVsdC1leHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7fSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBsZXQgc3BlY2lmaWVyRXhwb3J0Q291bnQgPSAwXG4gICAgbGV0IGhhc0RlZmF1bHRFeHBvcnQgPSBmYWxzZVxuICAgIGxldCBoYXNTdGFyRXhwb3J0ID0gZmFsc2VcbiAgICBsZXQgbmFtZWRFeHBvcnROb2RlID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gY2FwdHVyZURlY2xhcmF0aW9uKGlkZW50aWZpZXJPclBhdHRlcm4pIHtcbiAgICAgIGlmIChpZGVudGlmaWVyT3JQYXR0ZXJuLnR5cGUgPT09ICdPYmplY3RQYXR0ZXJuJykge1xuICAgICAgICAvLyByZWN1cnNpdmVseSBjYXB0dXJlXG4gICAgICAgIGlkZW50aWZpZXJPclBhdHRlcm4ucHJvcGVydGllc1xuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBjYXB0dXJlRGVjbGFyYXRpb24ocHJvcGVydHkudmFsdWUpXG4gICAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAvLyBhc3N1bWUgaXQncyBhIHNpbmdsZSBzdGFuZGFyZCBpZGVudGlmaWVyXG4gICAgICAgIHNwZWNpZmllckV4cG9ydENvdW50KytcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ0V4cG9ydERlZmF1bHRTcGVjaWZpZXInOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaGFzRGVmYXVsdEV4cG9ydCA9IHRydWVcbiAgICAgIH0sXG5cbiAgICAgICdFeHBvcnRTcGVjaWZpZXInOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGlmIChub2RlLmV4cG9ydGVkLm5hbWUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgIGhhc0RlZmF1bHRFeHBvcnQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BlY2lmaWVyRXhwb3J0Q291bnQrK1xuICAgICAgICAgIG5hbWVkRXhwb3J0Tm9kZSA9IG5vZGVcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBzcGVjaWZpZXJzLCBub2RlLmRlY2xhcmF0aW9uIHNob3VsZCBiZSBudWxsXG4gICAgICAgIGlmICghbm9kZS5kZWNsYXJhdGlvbikgcmV0dXJuXG5cbiAgICAgICAgLy8gZG9uJ3QgY291bnQgZmxvdyB0eXBlcyBleHBvcnRzXG4gICAgICAgIGlmIChub2RlLmV4cG9ydEtpbmQgPT09ICd0eXBlJykgcmV0dXJuXG5cbiAgICAgICAgaWYgKG5vZGUuZGVjbGFyYXRpb24uZGVjbGFyYXRpb25zKSB7XG4gICAgICAgICAgbm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihkZWNsYXJhdGlvbikge1xuICAgICAgICAgICAgY2FwdHVyZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9uLmlkKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gY2FwdHVyZXMgJ2V4cG9ydCBmdW5jdGlvbiBmb28oKSB7fScgc3ludGF4XG4gICAgICAgICAgc3BlY2lmaWVyRXhwb3J0Q291bnQrK1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZWRFeHBvcnROb2RlID0gbm9kZVxuICAgICAgfSxcblxuICAgICAgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgICBoYXNEZWZhdWx0RXhwb3J0ID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgJ0V4cG9ydEFsbERlY2xhcmF0aW9uJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGhhc1N0YXJFeHBvcnQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICAnUHJvZ3JhbTpleGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzcGVjaWZpZXJFeHBvcnRDb3VudCA9PT0gMSAmJiAhaGFzRGVmYXVsdEV4cG9ydCAmJiAhaGFzU3RhckV4cG9ydCkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KG5hbWVkRXhwb3J0Tm9kZSwgJ1ByZWZlciBkZWZhdWx0IGV4cG9ydC4nKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==