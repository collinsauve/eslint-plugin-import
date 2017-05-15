'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @fileoverview Rule to warn about potentially confused use of name exports
 * @author Desmond Brand
 * @copyright 2016 Desmond Brand. All rights reserved.
 * See LICENSE in root directory for full license.
 */
module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {

    const fileImports = new Map();
    const allPropertyLookups = new Map();

    function handleImportDefault(node) {
      const declaration = (0, _importDeclaration2.default)(context);
      const exportMap = _ExportMap2.default.get(declaration.source.value, context);
      if (exportMap == null) return;

      if (exportMap.errors.length) {
        exportMap.reportErrors(context, declaration);
        return;
      }

      fileImports.set(node.local.name, {
        exportMap,
        sourcePath: declaration.source.value
      });
    }

    function storePropertyLookup(objectName, propName, node) {
      const lookups = allPropertyLookups.get(objectName) || [];
      lookups.push({ node, propName });
      allPropertyLookups.set(objectName, lookups);
    }

    function handlePropLookup(node) {
      const objectName = node.object.name;
      const propName = node.property.name;
      storePropertyLookup(objectName, propName, node);
    }

    function handleDestructuringAssignment(node) {
      const isDestructure = node.id.type === 'ObjectPattern' && node.init != null && node.init.type === 'Identifier';
      if (!isDestructure) return;

      const objectName = node.init.name;
      for (const _ref of node.id.properties) {
        const key = _ref.key;

        if (key == null) continue; // true for rest properties
        storePropertyLookup(objectName, key.name, key);
      }
    }

    function handleProgramExit() {
      allPropertyLookups.forEach((lookups, objectName) => {
        const fileImport = fileImports.get(objectName);
        if (fileImport == null) return;

        for (const _ref2 of lookups) {
          const propName = _ref2.propName;
          const node = _ref2.node;

          // the default import can have a "default" property
          if (propName === 'default') continue;
          if (!fileImport.exportMap.namespace.has(propName)) continue;

          context.report({
            node,
            message: `Caution: \`${objectName}\` also has a named export ` + `\`${propName}\`. Check if you meant to write ` + `\`import {${propName}} from '${fileImport.sourcePath}'\` ` + 'instead.'
          });
        }
      });
    }

    return {
      'ImportDefaultSpecifier': handleImportDefault,
      'MemberExpression': handlePropLookup,
      'VariableDeclarator': handleDestructuringAssignment,
      'Program:exit': handleProgramExit
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJjcmVhdGUiLCJjb250ZXh0IiwiZmlsZUltcG9ydHMiLCJNYXAiLCJhbGxQcm9wZXJ0eUxvb2t1cHMiLCJoYW5kbGVJbXBvcnREZWZhdWx0Iiwibm9kZSIsImRlY2xhcmF0aW9uIiwiZXhwb3J0TWFwIiwiZ2V0Iiwic291cmNlIiwidmFsdWUiLCJlcnJvcnMiLCJsZW5ndGgiLCJyZXBvcnRFcnJvcnMiLCJzZXQiLCJsb2NhbCIsIm5hbWUiLCJzb3VyY2VQYXRoIiwic3RvcmVQcm9wZXJ0eUxvb2t1cCIsIm9iamVjdE5hbWUiLCJwcm9wTmFtZSIsImxvb2t1cHMiLCJwdXNoIiwiaGFuZGxlUHJvcExvb2t1cCIsIm9iamVjdCIsInByb3BlcnR5IiwiaGFuZGxlRGVzdHJ1Y3R1cmluZ0Fzc2lnbm1lbnQiLCJpc0Rlc3RydWN0dXJlIiwiaWQiLCJ0eXBlIiwiaW5pdCIsInByb3BlcnRpZXMiLCJrZXkiLCJoYW5kbGVQcm9ncmFtRXhpdCIsImZvckVhY2giLCJmaWxlSW1wb3J0IiwibmFtZXNwYWNlIiwiaGFzIiwicmVwb3J0IiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7O0FBWEE7Ozs7OztBQWFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQURGLEdBRFM7O0FBS2ZDLFVBQVEsVUFBU0MsT0FBVCxFQUFrQjs7QUFFeEIsVUFBTUMsY0FBYyxJQUFJQyxHQUFKLEVBQXBCO0FBQ0EsVUFBTUMscUJBQXFCLElBQUlELEdBQUosRUFBM0I7O0FBRUEsYUFBU0UsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DO0FBQ2pDLFlBQU1DLGNBQWMsaUNBQWtCTixPQUFsQixDQUFwQjtBQUNBLFlBQU1PLFlBQVksb0JBQVFDLEdBQVIsQ0FBWUYsWUFBWUcsTUFBWixDQUFtQkMsS0FBL0IsRUFBc0NWLE9BQXRDLENBQWxCO0FBQ0EsVUFBSU8sYUFBYSxJQUFqQixFQUF1Qjs7QUFFdkIsVUFBSUEsVUFBVUksTUFBVixDQUFpQkMsTUFBckIsRUFBNkI7QUFDM0JMLGtCQUFVTSxZQUFWLENBQXVCYixPQUF2QixFQUFnQ00sV0FBaEM7QUFDQTtBQUNEOztBQUVETCxrQkFBWWEsR0FBWixDQUFnQlQsS0FBS1UsS0FBTCxDQUFXQyxJQUEzQixFQUFpQztBQUMvQlQsaUJBRCtCO0FBRS9CVSxvQkFBWVgsWUFBWUcsTUFBWixDQUFtQkM7QUFGQSxPQUFqQztBQUlEOztBQUVELGFBQVNRLG1CQUFULENBQTZCQyxVQUE3QixFQUF5Q0MsUUFBekMsRUFBbURmLElBQW5ELEVBQXlEO0FBQ3ZELFlBQU1nQixVQUFVbEIsbUJBQW1CSyxHQUFuQixDQUF1QlcsVUFBdkIsS0FBc0MsRUFBdEQ7QUFDQUUsY0FBUUMsSUFBUixDQUFhLEVBQUNqQixJQUFELEVBQU9lLFFBQVAsRUFBYjtBQUNBakIseUJBQW1CVyxHQUFuQixDQUF1QkssVUFBdkIsRUFBbUNFLE9BQW5DO0FBQ0Q7O0FBRUQsYUFBU0UsZ0JBQVQsQ0FBMEJsQixJQUExQixFQUFnQztBQUM5QixZQUFNYyxhQUFhZCxLQUFLbUIsTUFBTCxDQUFZUixJQUEvQjtBQUNBLFlBQU1JLFdBQVdmLEtBQUtvQixRQUFMLENBQWNULElBQS9CO0FBQ0FFLDBCQUFvQkMsVUFBcEIsRUFBZ0NDLFFBQWhDLEVBQTBDZixJQUExQztBQUNEOztBQUVELGFBQVNxQiw2QkFBVCxDQUF1Q3JCLElBQXZDLEVBQTZDO0FBQzNDLFlBQU1zQixnQkFDSnRCLEtBQUt1QixFQUFMLENBQVFDLElBQVIsS0FBaUIsZUFBakIsSUFDQXhCLEtBQUt5QixJQUFMLElBQWEsSUFEYixJQUVBekIsS0FBS3lCLElBQUwsQ0FBVUQsSUFBVixLQUFtQixZQUhyQjtBQUtBLFVBQUksQ0FBQ0YsYUFBTCxFQUFvQjs7QUFFcEIsWUFBTVIsYUFBYWQsS0FBS3lCLElBQUwsQ0FBVWQsSUFBN0I7QUFDQSx5QkFBc0JYLEtBQUt1QixFQUFMLENBQVFHLFVBQTlCLEVBQTBDO0FBQUEsY0FBN0JDLEdBQTZCLFFBQTdCQSxHQUE2Qjs7QUFDeEMsWUFBSUEsT0FBTyxJQUFYLEVBQWlCLFNBRHVCLENBQ2I7QUFDM0JkLDRCQUFvQkMsVUFBcEIsRUFBZ0NhLElBQUloQixJQUFwQyxFQUEwQ2dCLEdBQTFDO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTQyxpQkFBVCxHQUE2QjtBQUMzQjlCLHlCQUFtQitCLE9BQW5CLENBQTJCLENBQUNiLE9BQUQsRUFBVUYsVUFBVixLQUF5QjtBQUNsRCxjQUFNZ0IsYUFBYWxDLFlBQVlPLEdBQVosQ0FBZ0JXLFVBQWhCLENBQW5CO0FBQ0EsWUFBSWdCLGNBQWMsSUFBbEIsRUFBd0I7O0FBRXhCLDRCQUErQmQsT0FBL0IsRUFBd0M7QUFBQSxnQkFBNUJELFFBQTRCLFNBQTVCQSxRQUE0QjtBQUFBLGdCQUFsQmYsSUFBa0IsU0FBbEJBLElBQWtCOztBQUN0QztBQUNBLGNBQUllLGFBQWEsU0FBakIsRUFBNEI7QUFDNUIsY0FBSSxDQUFDZSxXQUFXNUIsU0FBWCxDQUFxQjZCLFNBQXJCLENBQStCQyxHQUEvQixDQUFtQ2pCLFFBQW5DLENBQUwsRUFBbUQ7O0FBRW5EcEIsa0JBQVFzQyxNQUFSLENBQWU7QUFDYmpDLGdCQURhO0FBRWJrQyxxQkFDRyxjQUFhcEIsVUFBVyw2QkFBekIsR0FDQyxLQUFJQyxRQUFTLGtDQURkLEdBRUMsYUFBWUEsUUFBUyxXQUFVZSxXQUFXbEIsVUFBVyxNQUZ0RCxHQUdBO0FBTlcsV0FBZjtBQVNEO0FBQ0YsT0FuQkQ7QUFvQkQ7O0FBRUQsV0FBTztBQUNMLGdDQUEwQmIsbUJBRHJCO0FBRUwsMEJBQW9CbUIsZ0JBRmY7QUFHTCw0QkFBc0JHLDZCQUhqQjtBQUlMLHNCQUFnQk87QUFKWCxLQUFQO0FBTUQ7QUFsRmMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gd2FybiBhYm91dCBwb3RlbnRpYWxseSBjb25mdXNlZCB1c2Ugb2YgbmFtZSBleHBvcnRzXG4gKiBAYXV0aG9yIERlc21vbmQgQnJhbmRcbiAqIEBjb3B5cmlnaHQgMjAxNiBEZXNtb25kIEJyYW5kLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU2VlIExJQ0VOU0UgaW4gcm9vdCBkaXJlY3RvcnkgZm9yIGZ1bGwgbGljZW5zZS5cbiAqL1xuaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vRXhwb3J0TWFwJ1xuaW1wb3J0IGltcG9ydERlY2xhcmF0aW9uIGZyb20gJy4uL2ltcG9ydERlY2xhcmF0aW9uJ1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBEZWZpbml0aW9uXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24oY29udGV4dCkge1xuXG4gICAgY29uc3QgZmlsZUltcG9ydHMgPSBuZXcgTWFwKClcbiAgICBjb25zdCBhbGxQcm9wZXJ0eUxvb2t1cHMgPSBuZXcgTWFwKClcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUltcG9ydERlZmF1bHQobm9kZSkge1xuICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBpbXBvcnREZWNsYXJhdGlvbihjb250ZXh0KVxuICAgICAgY29uc3QgZXhwb3J0TWFwID0gRXhwb3J0cy5nZXQoZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgaWYgKGV4cG9ydE1hcCA9PSBudWxsKSByZXR1cm5cblxuICAgICAgaWYgKGV4cG9ydE1hcC5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIGV4cG9ydE1hcC5yZXBvcnRFcnJvcnMoY29udGV4dCwgZGVjbGFyYXRpb24pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBmaWxlSW1wb3J0cy5zZXQobm9kZS5sb2NhbC5uYW1lLCB7XG4gICAgICAgIGV4cG9ydE1hcCxcbiAgICAgICAgc291cmNlUGF0aDogZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9yZVByb3BlcnR5TG9va3VwKG9iamVjdE5hbWUsIHByb3BOYW1lLCBub2RlKSB7XG4gICAgICBjb25zdCBsb29rdXBzID0gYWxsUHJvcGVydHlMb29rdXBzLmdldChvYmplY3ROYW1lKSB8fCBbXVxuICAgICAgbG9va3Vwcy5wdXNoKHtub2RlLCBwcm9wTmFtZX0pXG4gICAgICBhbGxQcm9wZXJ0eUxvb2t1cHMuc2V0KG9iamVjdE5hbWUsIGxvb2t1cHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlUHJvcExvb2t1cChub2RlKSB7XG4gICAgICBjb25zdCBvYmplY3ROYW1lID0gbm9kZS5vYmplY3QubmFtZVxuICAgICAgY29uc3QgcHJvcE5hbWUgPSBub2RlLnByb3BlcnR5Lm5hbWVcbiAgICAgIHN0b3JlUHJvcGVydHlMb29rdXAob2JqZWN0TmFtZSwgcHJvcE5hbWUsIG5vZGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRGVzdHJ1Y3R1cmluZ0Fzc2lnbm1lbnQobm9kZSkge1xuICAgICAgY29uc3QgaXNEZXN0cnVjdHVyZSA9IChcbiAgICAgICAgbm9kZS5pZC50eXBlID09PSAnT2JqZWN0UGF0dGVybicgJiZcbiAgICAgICAgbm9kZS5pbml0ICE9IG51bGwgJiZcbiAgICAgICAgbm9kZS5pbml0LnR5cGUgPT09ICdJZGVudGlmaWVyJ1xuICAgICAgKVxuICAgICAgaWYgKCFpc0Rlc3RydWN0dXJlKSByZXR1cm5cblxuICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IG5vZGUuaW5pdC5uYW1lXG4gICAgICBmb3IgKGNvbnN0IHsga2V5IH0gb2Ygbm9kZS5pZC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCkgY29udGludWUgIC8vIHRydWUgZm9yIHJlc3QgcHJvcGVydGllc1xuICAgICAgICBzdG9yZVByb3BlcnR5TG9va3VwKG9iamVjdE5hbWUsIGtleS5uYW1lLCBrZXkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlUHJvZ3JhbUV4aXQoKSB7XG4gICAgICBhbGxQcm9wZXJ0eUxvb2t1cHMuZm9yRWFjaCgobG9va3Vwcywgb2JqZWN0TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSW1wb3J0ID0gZmlsZUltcG9ydHMuZ2V0KG9iamVjdE5hbWUpXG4gICAgICAgIGlmIChmaWxlSW1wb3J0ID09IG51bGwpIHJldHVyblxuXG4gICAgICAgIGZvciAoY29uc3Qge3Byb3BOYW1lLCBub2RlfSBvZiBsb29rdXBzKSB7XG4gICAgICAgICAgLy8gdGhlIGRlZmF1bHQgaW1wb3J0IGNhbiBoYXZlIGEgXCJkZWZhdWx0XCIgcHJvcGVydHlcbiAgICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdkZWZhdWx0JykgY29udGludWVcbiAgICAgICAgICBpZiAoIWZpbGVJbXBvcnQuZXhwb3J0TWFwLm5hbWVzcGFjZS5oYXMocHJvcE5hbWUpKSBjb250aW51ZVxuXG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IChcbiAgICAgICAgICAgICAgYENhdXRpb246IFxcYCR7b2JqZWN0TmFtZX1cXGAgYWxzbyBoYXMgYSBuYW1lZCBleHBvcnQgYCArXG4gICAgICAgICAgICAgIGBcXGAke3Byb3BOYW1lfVxcYC4gQ2hlY2sgaWYgeW91IG1lYW50IHRvIHdyaXRlIGAgK1xuICAgICAgICAgICAgICBgXFxgaW1wb3J0IHske3Byb3BOYW1lfX0gZnJvbSAnJHtmaWxlSW1wb3J0LnNvdXJjZVBhdGh9J1xcYCBgICtcbiAgICAgICAgICAgICAgJ2luc3RlYWQuJ1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcic6IGhhbmRsZUltcG9ydERlZmF1bHQsXG4gICAgICAnTWVtYmVyRXhwcmVzc2lvbic6IGhhbmRsZVByb3BMb29rdXAsXG4gICAgICAnVmFyaWFibGVEZWNsYXJhdG9yJzogaGFuZGxlRGVzdHJ1Y3R1cmluZ0Fzc2lnbm1lbnQsXG4gICAgICAnUHJvZ3JhbTpleGl0JzogaGFuZGxlUHJvZ3JhbUV4aXQsXG4gICAgfVxuICB9LFxufVxuIl19