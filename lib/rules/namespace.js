'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _declaredScope = require('eslint-module-utils/declaredScope');

var _declaredScope2 = _interopRequireDefault(_declaredScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    schema: [{
      'type': 'object',
      'properties': {
        'allowComputed': {
          'description': 'If `false`, will report computed (and thus, un-lintable) references ' + 'to namespace members.',
          'type': 'boolean',
          'default': false
        }
      },
      'additionalProperties': false
    }]
  },

  create: function namespaceRule(context) {

    // read options
    var _ref = context.options[0] || {},
        _ref$allowComputed = _ref.allowComputed;

    const allowComputed = _ref$allowComputed === undefined ? false : _ref$allowComputed;


    const namespaces = new Map();

    function makeMessage(last, namepath) {
      return `'${last.name}' not found in` + (namepath.length > 1 ? ' deeply ' : ' ') + `imported namespace '${namepath.join('.')}'.`;
    }

    return {

      // pick up all imports at body entry time, to properly respect hoisting
      'Program': function (_ref2) {
        let body = _ref2.body;

        function processBodyStatement(declaration) {
          if (declaration.type !== 'ImportDeclaration') return;

          if (declaration.specifiers.length === 0) return;

          const imports = _ExportMap2.default.get(declaration.source.value, context);
          if (imports == null) return null;

          if (imports.errors.length) {
            imports.reportErrors(context, declaration);
            return;
          }

          for (let specifier of declaration.specifiers) {
            switch (specifier.type) {
              case 'ImportNamespaceSpecifier':
                if (!imports.size) {
                  context.report(specifier, `No exported names found in module '${declaration.source.value}'.`);
                }
                namespaces.set(specifier.local.name, imports);
                break;
              case 'ImportDefaultSpecifier':
              case 'ImportSpecifier':
                {
                  const meta = imports.get(
                  // default to 'default' for default http://i.imgur.com/nj6qAWy.jpg
                  specifier.imported ? specifier.imported.name : 'default');
                  if (!meta || !meta.namespace) break;
                  namespaces.set(specifier.local.name, meta.namespace);
                  break;
                }
            }
          }
        }
        body.forEach(processBodyStatement);
      },

      // same as above, but does not add names to local map
      'ExportNamespaceSpecifier': function (namespace) {
        var declaration = (0, _importDeclaration2.default)(context);

        var imports = _ExportMap2.default.get(declaration.source.value, context);
        if (imports == null) return null;

        if (imports.errors.length) {
          imports.reportErrors(context, declaration);
          return;
        }

        if (!imports.size) {
          context.report(namespace, `No exported names found in module '${declaration.source.value}'.`);
        }
      },

      // todo: check for possible redefinition

      'MemberExpression': function (dereference) {
        if (dereference.object.type !== 'Identifier') return;
        if (!namespaces.has(dereference.object.name)) return;

        if (dereference.parent.type === 'AssignmentExpression' && dereference.parent.left === dereference) {
          context.report(dereference.parent, `Assignment to member of namespace '${dereference.object.name}'.`);
        }

        // go deep
        var namespace = namespaces.get(dereference.object.name);
        var namepath = [dereference.object.name];
        // while property is namespace and parent is member expression, keep validating
        while (namespace instanceof _ExportMap2.default && dereference.type === 'MemberExpression') {

          if (dereference.computed) {
            if (!allowComputed) {
              context.report(dereference.property, 'Unable to validate computed reference to imported namespace \'' + dereference.object.name + '\'.');
            }
            return;
          }

          if (!namespace.has(dereference.property.name)) {
            context.report(dereference.property, makeMessage(dereference.property, namepath));
            break;
          }

          const exported = namespace.get(dereference.property.name);
          if (exported == null) return;

          // stash and pop
          namepath.push(dereference.property.name);
          namespace = exported.namespace;
          dereference = dereference.parent;
        }
      },

      'VariableDeclarator': function (_ref3) {
        let id = _ref3.id,
            init = _ref3.init;

        if (init == null) return;
        if (init.type !== 'Identifier') return;
        if (!namespaces.has(init.name)) return;

        // check for redefinition in intermediate scopes
        if ((0, _declaredScope2.default)(context, init.name) !== 'module') return;

        // DFS traverse child namespaces
        function testKey(pattern, namespace) {
          let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [init.name];

          if (!(namespace instanceof _ExportMap2.default)) return;

          if (pattern.type !== 'ObjectPattern') return;

          for (let property of pattern.properties) {

            if (property.key.type !== 'Identifier') {
              context.report({
                node: property,
                message: 'Only destructure top-level names.'
              });
              continue;
            }

            if (!namespace.has(property.key.name)) {
              context.report({
                node: property,
                message: makeMessage(property.key, path)
              });
              continue;
            }

            path.push(property.key.name);
            testKey(property.value, namespace.get(property.key.name).namespace, path);
            path.pop();
          }
        }

        testKey(id, namespaces.get(init.name));
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuYW1lc3BhY2UuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJzY2hlbWEiLCJjcmVhdGUiLCJuYW1lc3BhY2VSdWxlIiwiY29udGV4dCIsIm9wdGlvbnMiLCJhbGxvd0NvbXB1dGVkIiwibmFtZXNwYWNlcyIsIk1hcCIsIm1ha2VNZXNzYWdlIiwibGFzdCIsIm5hbWVwYXRoIiwibmFtZSIsImxlbmd0aCIsImpvaW4iLCJib2R5IiwicHJvY2Vzc0JvZHlTdGF0ZW1lbnQiLCJkZWNsYXJhdGlvbiIsInR5cGUiLCJzcGVjaWZpZXJzIiwiaW1wb3J0cyIsImdldCIsInNvdXJjZSIsInZhbHVlIiwiZXJyb3JzIiwicmVwb3J0RXJyb3JzIiwic3BlY2lmaWVyIiwic2l6ZSIsInJlcG9ydCIsInNldCIsImxvY2FsIiwiaW1wb3J0ZWQiLCJuYW1lc3BhY2UiLCJmb3JFYWNoIiwiZGVyZWZlcmVuY2UiLCJvYmplY3QiLCJoYXMiLCJwYXJlbnQiLCJsZWZ0IiwiY29tcHV0ZWQiLCJwcm9wZXJ0eSIsImV4cG9ydGVkIiwicHVzaCIsImlkIiwiaW5pdCIsInRlc3RLZXkiLCJwYXR0ZXJuIiwicGF0aCIsInByb3BlcnRpZXMiLCJrZXkiLCJub2RlIiwibWVzc2FnZSIsInBvcCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsWUFBUSxDQUNOO0FBQ0UsY0FBUSxRQURWO0FBRUUsb0JBQWM7QUFDWix5QkFBaUI7QUFDZix5QkFDRSx5RUFDQSx1QkFIYTtBQUlmLGtCQUFRLFNBSk87QUFLZixxQkFBVztBQUxJO0FBREwsT0FGaEI7QUFXRSw4QkFBd0I7QUFYMUIsS0FETTtBQURKLEdBRFM7O0FBbUJmQyxVQUFRLFNBQVNDLGFBQVQsQ0FBdUJDLE9BQXZCLEVBQWdDOztBQUV0QztBQUZzQyxlQUtsQ0EsUUFBUUMsT0FBUixDQUFnQixDQUFo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QjtBQUZJLGVBQWY7QUFJQTtBQUNEOztBQUVEQSxpQkFBS0wsSUFBTCxDQUFVRixTQUFTUyxHQUFULENBQWFyQyxJQUF2QjtBQUNBaUMsb0JBQVFMLFNBQVNqQixLQUFqQixFQUF3QlMsVUFBVVgsR0FBVixDQUFjbUIsU0FBU1MsR0FBVCxDQUFhckMsSUFBM0IsRUFBaUNvQixTQUF6RCxFQUFvRWUsSUFBcEU7QUFDQUEsaUJBQUtLLEdBQUw7QUFDRDtBQUNGOztBQUVEUCxnQkFBUUYsRUFBUixFQUFZcEMsV0FBV2MsR0FBWCxDQUFldUIsS0FBS2hDLElBQXBCLENBQVo7QUFDRDtBQWhKSSxLQUFQO0FBa0pEO0FBcExjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxuYW1lc3BhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgaW1wb3J0RGVjbGFyYXRpb24gZnJvbSAnLi4vaW1wb3J0RGVjbGFyYXRpb24nXG5pbXBvcnQgZGVjbGFyZWRTY29wZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL2RlY2xhcmVkU2NvcGUnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICdwcm9wZXJ0aWVzJzoge1xuICAgICAgICAgICdhbGxvd0NvbXB1dGVkJzoge1xuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzpcbiAgICAgICAgICAgICAgJ0lmIGBmYWxzZWAsIHdpbGwgcmVwb3J0IGNvbXB1dGVkIChhbmQgdGh1cywgdW4tbGludGFibGUpIHJlZmVyZW5jZXMgJyArXG4gICAgICAgICAgICAgICd0byBuYW1lc3BhY2UgbWVtYmVycy4nLFxuICAgICAgICAgICAgJ3R5cGUnOiAnYm9vbGVhbicsXG4gICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gbmFtZXNwYWNlUnVsZShjb250ZXh0KSB7XG5cbiAgICAvLyByZWFkIG9wdGlvbnNcbiAgICBjb25zdCB7XG4gICAgICBhbGxvd0NvbXB1dGVkID0gZmFsc2UsXG4gICAgfSA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7fVxuXG4gICAgY29uc3QgbmFtZXNwYWNlcyA9IG5ldyBNYXAoKVxuXG4gICAgZnVuY3Rpb24gbWFrZU1lc3NhZ2UobGFzdCwgbmFtZXBhdGgpIHtcbiAgICAgICByZXR1cm4gYCcke2xhc3QubmFtZX0nIG5vdCBmb3VuZCBpbmAgK1xuICAgICAgICAgICAgICAobmFtZXBhdGgubGVuZ3RoID4gMSA/ICcgZGVlcGx5ICcgOiAnICcpICtcbiAgICAgICAgICAgICAgYGltcG9ydGVkIG5hbWVzcGFjZSAnJHtuYW1lcGF0aC5qb2luKCcuJyl9Jy5gXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgLy8gcGljayB1cCBhbGwgaW1wb3J0cyBhdCBib2R5IGVudHJ5IHRpbWUsIHRvIHByb3Blcmx5IHJlc3BlY3QgaG9pc3RpbmdcbiAgICAgICdQcm9ncmFtJzogZnVuY3Rpb24gKHsgYm9keSB9KSB7XG4gICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NCb2R5U3RhdGVtZW50KGRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnR5cGUgIT09ICdJbXBvcnREZWNsYXJhdGlvbicpIHJldHVyblxuXG4gICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnNwZWNpZmllcnMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAgICAgICAgIGNvbnN0IGltcG9ydHMgPSBFeHBvcnRzLmdldChkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICAgICAgaWYgKGltcG9ydHMgPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICAgICAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGltcG9ydHMucmVwb3J0RXJyb3JzKGNvbnRleHQsIGRlY2xhcmF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChsZXQgc3BlY2lmaWVyIG9mIGRlY2xhcmF0aW9uLnNwZWNpZmllcnMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3BlY2lmaWVyLnR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJzpcbiAgICAgICAgICAgICAgICBpZiAoIWltcG9ydHMuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoc3BlY2lmaWVyLFxuICAgICAgICAgICAgICAgICAgICBgTm8gZXhwb3J0ZWQgbmFtZXMgZm91bmQgaW4gbW9kdWxlICcke2RlY2xhcmF0aW9uLnNvdXJjZS52YWx1ZX0nLmApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMuc2V0KHNwZWNpZmllci5sb2NhbC5uYW1lLCBpbXBvcnRzKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInOlxuICAgICAgICAgICAgICBjYXNlICdJbXBvcnRTcGVjaWZpZXInOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0YSA9IGltcG9ydHMuZ2V0KFxuICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byAnZGVmYXVsdCcgZm9yIGRlZmF1bHQgaHR0cDovL2kuaW1ndXIuY29tL25qNnFBV3kuanBnXG4gICAgICAgICAgICAgICAgICBzcGVjaWZpZXIuaW1wb3J0ZWQgPyBzcGVjaWZpZXIuaW1wb3J0ZWQubmFtZSA6ICdkZWZhdWx0JylcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGEgfHwgIW1ldGEubmFtZXNwYWNlKSBicmVha1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMuc2V0KHNwZWNpZmllci5sb2NhbC5uYW1lLCBtZXRhLm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJvZHkuZm9yRWFjaChwcm9jZXNzQm9keVN0YXRlbWVudClcbiAgICAgIH0sXG5cbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUsIGJ1dCBkb2VzIG5vdCBhZGQgbmFtZXMgdG8gbG9jYWwgbWFwXG4gICAgICAnRXhwb3J0TmFtZXNwYWNlU3BlY2lmaWVyJzogZnVuY3Rpb24gKG5hbWVzcGFjZSkge1xuICAgICAgICB2YXIgZGVjbGFyYXRpb24gPSBpbXBvcnREZWNsYXJhdGlvbihjb250ZXh0KVxuXG4gICAgICAgIHZhciBpbXBvcnRzID0gRXhwb3J0cy5nZXQoZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBpZiAoaW1wb3J0cyA9PSBudWxsKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBkZWNsYXJhdGlvbilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW1wb3J0cy5zaXplKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQobmFtZXNwYWNlLFxuICAgICAgICAgICAgYE5vIGV4cG9ydGVkIG5hbWVzIGZvdW5kIGluIG1vZHVsZSAnJHtkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWV9Jy5gKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyB0b2RvOiBjaGVjayBmb3IgcG9zc2libGUgcmVkZWZpbml0aW9uXG5cbiAgICAgICdNZW1iZXJFeHByZXNzaW9uJzogZnVuY3Rpb24gKGRlcmVmZXJlbmNlKSB7XG4gICAgICAgIGlmIChkZXJlZmVyZW5jZS5vYmplY3QudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm5cbiAgICAgICAgaWYgKCFuYW1lc3BhY2VzLmhhcyhkZXJlZmVyZW5jZS5vYmplY3QubmFtZSkpIHJldHVyblxuXG4gICAgICAgIGlmIChkZXJlZmVyZW5jZS5wYXJlbnQudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJyAmJlxuICAgICAgICAgICAgZGVyZWZlcmVuY2UucGFyZW50LmxlZnQgPT09IGRlcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydChkZXJlZmVyZW5jZS5wYXJlbnQsXG4gICAgICAgICAgICAgICAgYEFzc2lnbm1lbnQgdG8gbWVtYmVyIG9mIG5hbWVzcGFjZSAnJHtkZXJlZmVyZW5jZS5vYmplY3QubmFtZX0nLmApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBnbyBkZWVwXG4gICAgICAgIHZhciBuYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmdldChkZXJlZmVyZW5jZS5vYmplY3QubmFtZSlcbiAgICAgICAgdmFyIG5hbWVwYXRoID0gW2RlcmVmZXJlbmNlLm9iamVjdC5uYW1lXVxuICAgICAgICAvLyB3aGlsZSBwcm9wZXJ0eSBpcyBuYW1lc3BhY2UgYW5kIHBhcmVudCBpcyBtZW1iZXIgZXhwcmVzc2lvbiwga2VlcCB2YWxpZGF0aW5nXG4gICAgICAgIHdoaWxlIChuYW1lc3BhY2UgaW5zdGFuY2VvZiBFeHBvcnRzICYmXG4gICAgICAgICAgICAgICBkZXJlZmVyZW5jZS50eXBlID09PSAnTWVtYmVyRXhwcmVzc2lvbicpIHtcblxuICAgICAgICAgIGlmIChkZXJlZmVyZW5jZS5jb21wdXRlZCkge1xuICAgICAgICAgICAgaWYgKCFhbGxvd0NvbXB1dGVkKSB7XG4gICAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KGRlcmVmZXJlbmNlLnByb3BlcnR5LFxuICAgICAgICAgICAgICAgICdVbmFibGUgdG8gdmFsaWRhdGUgY29tcHV0ZWQgcmVmZXJlbmNlIHRvIGltcG9ydGVkIG5hbWVzcGFjZSBcXCcnICtcbiAgICAgICAgICAgICAgICBkZXJlZmVyZW5jZS5vYmplY3QubmFtZSArICdcXCcuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghbmFtZXNwYWNlLmhhcyhkZXJlZmVyZW5jZS5wcm9wZXJ0eS5uYW1lKSkge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICAgIGRlcmVmZXJlbmNlLnByb3BlcnR5LFxuICAgICAgICAgICAgICBtYWtlTWVzc2FnZShkZXJlZmVyZW5jZS5wcm9wZXJ0eSwgbmFtZXBhdGgpKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBleHBvcnRlZCA9IG5hbWVzcGFjZS5nZXQoZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSlcbiAgICAgICAgICBpZiAoZXhwb3J0ZWQgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgICAvLyBzdGFzaCBhbmQgcG9wXG4gICAgICAgICAgbmFtZXBhdGgucHVzaChkZXJlZmVyZW5jZS5wcm9wZXJ0eS5uYW1lKVxuICAgICAgICAgIG5hbWVzcGFjZSA9IGV4cG9ydGVkLm5hbWVzcGFjZVxuICAgICAgICAgIGRlcmVmZXJlbmNlID0gZGVyZWZlcmVuY2UucGFyZW50XG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6IGZ1bmN0aW9uICh7IGlkLCBpbml0IH0pIHtcbiAgICAgICAgaWYgKGluaXQgPT0gbnVsbCkgcmV0dXJuXG4gICAgICAgIGlmIChpbml0LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuXG4gICAgICAgIGlmICghbmFtZXNwYWNlcy5oYXMoaW5pdC5uYW1lKSkgcmV0dXJuXG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHJlZGVmaW5pdGlvbiBpbiBpbnRlcm1lZGlhdGUgc2NvcGVzXG4gICAgICAgIGlmIChkZWNsYXJlZFNjb3BlKGNvbnRleHQsIGluaXQubmFtZSkgIT09ICdtb2R1bGUnKSByZXR1cm5cblxuICAgICAgICAvLyBERlMgdHJhdmVyc2UgY2hpbGQgbmFtZXNwYWNlc1xuICAgICAgICBmdW5jdGlvbiB0ZXN0S2V5KHBhdHRlcm4sIG5hbWVzcGFjZSwgcGF0aCA9IFtpbml0Lm5hbWVdKSB7XG4gICAgICAgICAgaWYgKCEobmFtZXNwYWNlIGluc3RhbmNlb2YgRXhwb3J0cykpIHJldHVyblxuXG4gICAgICAgICAgaWYgKHBhdHRlcm4udHlwZSAhPT0gJ09iamVjdFBhdHRlcm4nKSByZXR1cm5cblxuICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IG9mIHBhdHRlcm4ucHJvcGVydGllcykge1xuXG4gICAgICAgICAgICBpZiAocHJvcGVydHkua2V5LnR5cGUgIT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICAgICAgbm9kZTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ09ubHkgZGVzdHJ1Y3R1cmUgdG9wLWxldmVsIG5hbWVzLicsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbmFtZXNwYWNlLmhhcyhwcm9wZXJ0eS5rZXkubmFtZSkpIHtcbiAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICAgIG5vZGU6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1ha2VNZXNzYWdlKHByb3BlcnR5LmtleSwgcGF0aCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhdGgucHVzaChwcm9wZXJ0eS5rZXkubmFtZSlcbiAgICAgICAgICAgIHRlc3RLZXkocHJvcGVydHkudmFsdWUsIG5hbWVzcGFjZS5nZXQocHJvcGVydHkua2V5Lm5hbWUpLm5hbWVzcGFjZSwgcGF0aClcbiAgICAgICAgICAgIHBhdGgucG9wKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0ZXN0S2V5KGlkLCBuYW1lc3BhY2VzLmdldChpbml0Lm5hbWUpKVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=