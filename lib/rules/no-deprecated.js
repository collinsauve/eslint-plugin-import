'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _declaredScope = require('eslint-module-utils/declaredScope');

var _declaredScope2 = _interopRequireDefault(_declaredScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function message(deprecation) {
  return 'Deprecated' + (deprecation.description ? ': ' + deprecation.description : '.');
}

function getDeprecation(metadata) {
  if (!metadata || !metadata.doc) return;

  let deprecation;
  if (metadata.doc.tags.some(t => t.title === 'deprecated' && (deprecation = t))) {
    return deprecation;
  }
}

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    const deprecated = new Map(),
          namespaces = new Map();

    function checkSpecifiers(node) {
      if (node.type !== 'ImportDeclaration') return;
      if (node.source == null) return; // local export, ignore

      const imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      let moduleDeprecation;
      if (imports.doc && imports.doc.tags.some(t => t.title === 'deprecated' && (moduleDeprecation = t))) {
        context.report({ node, message: message(moduleDeprecation) });
      }

      if (imports.errors.length) {
        imports.reportErrors(context, node);
        return;
      }

      node.specifiers.forEach(function (im) {
        let imported, local;
        switch (im.type) {

          case 'ImportNamespaceSpecifier':
            {
              if (!imports.size) return;
              namespaces.set(im.local.name, imports);
              return;
            }

          case 'ImportDefaultSpecifier':
            imported = 'default';
            local = im.local.name;
            break;

          case 'ImportSpecifier':
            imported = im.imported.name;
            local = im.local.name;
            break;

          default:
            return; // can't handle this one
        }

        // unknown thing can't be deprecated
        const exported = imports.get(imported);
        if (exported == null) return;

        // capture import of deep namespace
        if (exported.namespace) namespaces.set(local, exported.namespace);

        const deprecation = getDeprecation(imports.get(imported));
        if (!deprecation) return;

        context.report({ node: im, message: message(deprecation) });

        deprecated.set(local, deprecation);
      });
    }

    return {
      'Program': (_ref) => {
        let body = _ref.body;
        return body.forEach(checkSpecifiers);
      },

      'Identifier': function (node) {
        if (node.parent.type === 'MemberExpression' && node.parent.property === node) {
          return; // handled by MemberExpression
        }

        // ignore specifier identifiers
        if (node.parent.type.slice(0, 6) === 'Import') return;

        if (!deprecated.has(node.name)) return;

        if ((0, _declaredScope2.default)(context, node.name) !== 'module') return;
        context.report({
          node,
          message: message(deprecated.get(node.name))
        });
      },

      'MemberExpression': function (dereference) {
        if (dereference.object.type !== 'Identifier') return;
        if (!namespaces.has(dereference.object.name)) return;

        if ((0, _declaredScope2.default)(context, dereference.object.name) !== 'module') return;

        // go deep
        var namespace = namespaces.get(dereference.object.name);
        var namepath = [dereference.object.name];
        // while property is namespace and parent is member expression, keep validating
        while (namespace instanceof _ExportMap2.default && dereference.type === 'MemberExpression') {

          // ignore computed parts for now
          if (dereference.computed) return;

          const metadata = namespace.get(dereference.property.name);

          if (!metadata) break;
          const deprecation = getDeprecation(metadata);

          if (deprecation) {
            context.report({ node: dereference.property, message: message(deprecation) });
          }

          // stash and pop
          namepath.push(dereference.property.name);
          namespace = metadata.namespace;
          dereference = dereference.parent;
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1kZXByZWNhdGVkLmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJkZXByZWNhdGlvbiIsImRlc2NyaXB0aW9uIiwiZ2V0RGVwcmVjYXRpb24iLCJtZXRhZGF0YSIsImRvYyIsInRhZ3MiLCJzb21lIiwidCIsInRpdGxlIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsImRlcHJlY2F0ZWQiLCJNYXAiLCJuYW1lc3BhY2VzIiwiY2hlY2tTcGVjaWZpZXJzIiwibm9kZSIsInR5cGUiLCJzb3VyY2UiLCJpbXBvcnRzIiwiZ2V0IiwidmFsdWUiLCJtb2R1bGVEZXByZWNhdGlvbiIsInJlcG9ydCIsImVycm9ycyIsImxlbmd0aCIsInJlcG9ydEVycm9ycyIsInNwZWNpZmllcnMiLCJmb3JFYWNoIiwiaW0iLCJpbXBvcnRlZCIsImxvY2FsIiwic2l6ZSIsInNldCIsIm5hbWUiLCJleHBvcnRlZCIsIm5hbWVzcGFjZSIsImJvZHkiLCJwYXJlbnQiLCJwcm9wZXJ0eSIsInNsaWNlIiwiaGFzIiwiZGVyZWZlcmVuY2UiLCJvYmplY3QiLCJuYW1lcGF0aCIsImNvbXB1dGVkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxXQUFqQixFQUE4QjtBQUM1QixTQUFPLGdCQUFnQkEsWUFBWUMsV0FBWixHQUEwQixPQUFPRCxZQUFZQyxXQUE3QyxHQUEyRCxHQUEzRSxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsY0FBVCxDQUF3QkMsUUFBeEIsRUFBa0M7QUFDaEMsTUFBSSxDQUFDQSxRQUFELElBQWEsQ0FBQ0EsU0FBU0MsR0FBM0IsRUFBZ0M7O0FBRWhDLE1BQUlKLFdBQUo7QUFDQSxNQUFJRyxTQUFTQyxHQUFULENBQWFDLElBQWIsQ0FBa0JDLElBQWxCLENBQXVCQyxLQUFLQSxFQUFFQyxLQUFGLEtBQVksWUFBWixLQUE2QlIsY0FBY08sQ0FBM0Ms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bEMsUUFBTCxFQUFlO0FBQ2YsZ0JBQU1ILGNBQWNFLGVBQWVDLFFBQWYsQ0FBcEI7O0FBRUEsY0FBSUgsV0FBSixFQUFpQjtBQUNmYyxvQkFBUVksTUFBUixDQUFlLEVBQUVQLE1BQU0wQixZQUFZSCxRQUFwQixFQUE4QjNDLFNBQVNBLFFBQVFDLFdBQVIsQ0FBdkMsRUFBZjtBQUNEOztBQUVEO0FBQ0ErQyxtQkFBU0UsSUFBVCxDQUFjSixZQUFZSCxRQUFaLENBQXFCTCxJQUFuQztBQUNBRSxzQkFBWXBDLFNBQVNvQyxTQUFyQjtBQUNBTSx3QkFBY0EsWUFBWUosTUFBMUI7QUFDRDtBQUNGO0FBbERJLEtBQVA7QUFvREQ7QUF4SGMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5vLWRlcHJlY2F0ZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgZGVjbGFyZWRTY29wZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL2RlY2xhcmVkU2NvcGUnXG5cbmZ1bmN0aW9uIG1lc3NhZ2UoZGVwcmVjYXRpb24pIHtcbiAgcmV0dXJuICdEZXByZWNhdGVkJyArIChkZXByZWNhdGlvbi5kZXNjcmlwdGlvbiA/ICc6ICcgKyBkZXByZWNhdGlvbi5kZXNjcmlwdGlvbiA6ICcuJylcbn1cblxuZnVuY3Rpb24gZ2V0RGVwcmVjYXRpb24obWV0YWRhdGEpIHtcbiAgaWYgKCFtZXRhZGF0YSB8fCAhbWV0YWRhdGEuZG9jKSByZXR1cm5cblxuICBsZXQgZGVwcmVjYXRpb25cbiAgaWYgKG1ldGFkYXRhLmRvYy50YWdzLnNvbWUodCA9PiB0LnRpdGxlID09PSAnZGVwcmVjYXRlZCcgJiYgKGRlcHJlY2F0aW9uID0gdCkpKSB7XG4gICAgcmV0dXJuIGRlcHJlY2F0aW9uXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7fSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgY29uc3QgZGVwcmVjYXRlZCA9IG5ldyBNYXAoKVxuICAgICAgICAsIG5hbWVzcGFjZXMgPSBuZXcgTWFwKClcblxuICAgIGZ1bmN0aW9uIGNoZWNrU3BlY2lmaWVycyhub2RlKSB7XG4gICAgICBpZiAobm9kZS50eXBlICE9PSAnSW1wb3J0RGVjbGFyYXRpb24nKSByZXR1cm5cbiAgICAgIGlmIChub2RlLnNvdXJjZSA9PSBudWxsKSByZXR1cm4gLy8gbG9jYWwgZXhwb3J0LCBpZ25vcmVcblxuICAgICAgY29uc3QgaW1wb3J0cyA9IEV4cG9ydHMuZ2V0KG5vZGUuc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgaWYgKGltcG9ydHMgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGxldCBtb2R1bGVEZXByZWNhdGlvblxuICAgICAgaWYgKGltcG9ydHMuZG9jICYmXG4gICAgICAgICAgaW1wb3J0cy5kb2MudGFncy5zb21lKHQgPT4gdC50aXRsZSA9PT0gJ2RlcHJlY2F0ZWQnICYmIChtb2R1bGVEZXByZWNhdGlvbiA9IHQpKSkge1xuICAgICAgICBjb250ZXh0LnJlcG9ydCh7IG5vZGUsIG1lc3NhZ2U6IG1lc3NhZ2UobW9kdWxlRGVwcmVjYXRpb24pIH0pXG4gICAgICB9XG5cbiAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgaW1wb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgbm9kZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIG5vZGUuc3BlY2lmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChpbSkge1xuICAgICAgICBsZXQgaW1wb3J0ZWQsIGxvY2FsXG4gICAgICAgIHN3aXRjaCAoaW0udHlwZSkge1xuXG5cbiAgICAgICAgICBjYXNlICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInOntcbiAgICAgICAgICAgIGlmICghaW1wb3J0cy5zaXplKSByZXR1cm5cbiAgICAgICAgICAgIG5hbWVzcGFjZXMuc2V0KGltLmxvY2FsLm5hbWUsIGltcG9ydHMpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJzpcbiAgICAgICAgICAgIGltcG9ydGVkID0gJ2RlZmF1bHQnXG4gICAgICAgICAgICBsb2NhbCA9IGltLmxvY2FsLm5hbWVcbiAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICBjYXNlICdJbXBvcnRTcGVjaWZpZXInOlxuICAgICAgICAgICAgaW1wb3J0ZWQgPSBpbS5pbXBvcnRlZC5uYW1lXG4gICAgICAgICAgICBsb2NhbCA9IGltLmxvY2FsLm5hbWVcbiAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gLy8gY2FuJ3QgaGFuZGxlIHRoaXMgb25lXG4gICAgICAgIH1cblxuICAgICAgICAvLyB1bmtub3duIHRoaW5nIGNhbid0IGJlIGRlcHJlY2F0ZWRcbiAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBpbXBvcnRzLmdldChpbXBvcnRlZClcbiAgICAgICAgaWYgKGV4cG9ydGVkID09IG51bGwpIHJldHVyblxuXG4gICAgICAgIC8vIGNhcHR1cmUgaW1wb3J0IG9mIGRlZXAgbmFtZXNwYWNlXG4gICAgICAgIGlmIChleHBvcnRlZC5uYW1lc3BhY2UpIG5hbWVzcGFjZXMuc2V0KGxvY2FsLCBleHBvcnRlZC5uYW1lc3BhY2UpXG5cbiAgICAgICAgY29uc3QgZGVwcmVjYXRpb24gPSBnZXREZXByZWNhdGlvbihpbXBvcnRzLmdldChpbXBvcnRlZCkpXG4gICAgICAgIGlmICghZGVwcmVjYXRpb24pIHJldHVyblxuXG4gICAgICAgIGNvbnRleHQucmVwb3J0KHsgbm9kZTogaW0sIG1lc3NhZ2U6IG1lc3NhZ2UoZGVwcmVjYXRpb24pIH0pXG5cbiAgICAgICAgZGVwcmVjYXRlZC5zZXQobG9jYWwsIGRlcHJlY2F0aW9uKVxuXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAnUHJvZ3JhbSc6ICh7IGJvZHkgfSkgPT4gYm9keS5mb3JFYWNoKGNoZWNrU3BlY2lmaWVycyksXG5cbiAgICAgICdJZGVudGlmaWVyJzogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50LnR5cGUgPT09ICdNZW1iZXJFeHByZXNzaW9uJyAmJiBub2RlLnBhcmVudC5wcm9wZXJ0eSA9PT0gbm9kZSkge1xuICAgICAgICAgIHJldHVybiAvLyBoYW5kbGVkIGJ5IE1lbWJlckV4cHJlc3Npb25cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlnbm9yZSBzcGVjaWZpZXIgaWRlbnRpZmllcnNcbiAgICAgICAgaWYgKG5vZGUucGFyZW50LnR5cGUuc2xpY2UoMCwgNikgPT09ICdJbXBvcnQnKSByZXR1cm5cblxuICAgICAgICBpZiAoIWRlcHJlY2F0ZWQuaGFzKG5vZGUubmFtZSkpIHJldHVyblxuXG4gICAgICAgIGlmIChkZWNsYXJlZFNjb3BlKGNvbnRleHQsIG5vZGUubmFtZSkgIT09ICdtb2R1bGUnKSByZXR1cm5cbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZShkZXByZWNhdGVkLmdldChub2RlLm5hbWUpKSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgICdNZW1iZXJFeHByZXNzaW9uJzogZnVuY3Rpb24gKGRlcmVmZXJlbmNlKSB7XG4gICAgICAgIGlmIChkZXJlZmVyZW5jZS5vYmplY3QudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm5cbiAgICAgICAgaWYgKCFuYW1lc3BhY2VzLmhhcyhkZXJlZmVyZW5jZS5vYmplY3QubmFtZSkpIHJldHVyblxuXG4gICAgICAgIGlmIChkZWNsYXJlZFNjb3BlKGNvbnRleHQsIGRlcmVmZXJlbmNlLm9iamVjdC5uYW1lKSAhPT0gJ21vZHVsZScpIHJldHVyblxuXG4gICAgICAgIC8vIGdvIGRlZXBcbiAgICAgICAgdmFyIG5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuZ2V0KGRlcmVmZXJlbmNlLm9iamVjdC5uYW1lKVxuICAgICAgICB2YXIgbmFtZXBhdGggPSBbZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWVdXG4gICAgICAgIC8vIHdoaWxlIHByb3BlcnR5IGlzIG5hbWVzcGFjZSBhbmQgcGFyZW50IGlzIG1lbWJlciBleHByZXNzaW9uLCBrZWVwIHZhbGlkYXRpbmdcbiAgICAgICAgd2hpbGUgKG5hbWVzcGFjZSBpbnN0YW5jZW9mIEV4cG9ydHMgJiZcbiAgICAgICAgICAgICAgIGRlcmVmZXJlbmNlLnR5cGUgPT09ICdNZW1iZXJFeHByZXNzaW9uJykge1xuXG4gICAgICAgICAgLy8gaWdub3JlIGNvbXB1dGVkIHBhcnRzIGZvciBub3dcbiAgICAgICAgICBpZiAoZGVyZWZlcmVuY2UuY29tcHV0ZWQpIHJldHVyblxuXG4gICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBuYW1lc3BhY2UuZ2V0KGRlcmVmZXJlbmNlLnByb3BlcnR5Lm5hbWUpXG5cbiAgICAgICAgICBpZiAoIW1ldGFkYXRhKSBicmVha1xuICAgICAgICAgIGNvbnN0IGRlcHJlY2F0aW9uID0gZ2V0RGVwcmVjYXRpb24obWV0YWRhdGEpXG5cbiAgICAgICAgICBpZiAoZGVwcmVjYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KHsgbm9kZTogZGVyZWZlcmVuY2UucHJvcGVydHksIG1lc3NhZ2U6IG1lc3NhZ2UoZGVwcmVjYXRpb24pIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc3Rhc2ggYW5kIHBvcFxuICAgICAgICAgIG5hbWVwYXRoLnB1c2goZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSlcbiAgICAgICAgICBuYW1lc3BhY2UgPSBtZXRhZGF0YS5uYW1lc3BhY2VcbiAgICAgICAgICBkZXJlZmVyZW5jZSA9IGRlcmVmZXJlbmNlLnBhcmVudFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==