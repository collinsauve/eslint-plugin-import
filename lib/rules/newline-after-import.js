'use strict';

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Rule to enforce new line after import not followed by another import.
 * @author Radek Benkel
 */

const log = (0, _debug2.default)('eslint-plugin-import:rules:newline-after-import');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function containsNodeOrEqual(outerNode, innerNode) {
  return outerNode.range[0] <= innerNode.range[0] && outerNode.range[1] >= innerNode.range[1];
}

function getScopeBody(scope) {
  if (scope.block.type === 'SwitchStatement') {
    log('SwitchStatement scopes not supported');
    return null;
  }

  const body = scope.block.body;

  if (body && body.type === 'BlockStatement') {
    return body.body;
  }

  return body;
}

function findNodeIndexInScopeBody(body, nodeToFind) {
  return body.findIndex(node => containsNodeOrEqual(node, nodeToFind));
}

function getLineDifference(node, nextNode) {
  return nextNode.loc.start.line - node.loc.end.line;
}

function isClassWithDecorator(node) {
  return node.type === 'ClassDeclaration' && node.decorators && node.decorators.length;
}

module.exports = {
  meta: {
    docs: {},
    schema: [{
      'type': 'object',
      'properties': {
        'count': {
          'type': 'integer',
          'minimum': 1
        }
      },
      'additionalProperties': false
    }]
  },
  create: function (context) {
    let level = 0;
    const requireCalls = [];

    function checkForNewLine(node, nextNode, type) {
      if (isClassWithDecorator(nextNode)) {
        nextNode = nextNode.decorators[0];
      }

      const options = context.options[0] || { count: 1 };
      if (getLineDifference(node, nextNode) < options.count + 1) {
        let column = node.loc.start.column;

        if (node.loc.start.line !== node.loc.end.line) {
          column = 0;
        }

        context.report({
          loc: {
            line: node.loc.end.line,
            column
          },
          message: `Expected empty line after ${type} statement not followed by another ${type}.`
        });
      }
    }

    function incrementLevel() {
      level++;
    }
    function decrementLevel() {
      level--;
    }

    return {
      ImportDeclaration: function (node) {
        const parent = node.parent;

        const nodePosition = parent.body.indexOf(node);
        const nextNode = parent.body[nodePosition + 1];

        if (nextNode && nextNode.type !== 'ImportDeclaration') {
          checkForNewLine(node, nextNode, 'import');
        }
      },
      CallExpression: function (node) {
        if ((0, _staticRequire2.default)(node) && level === 0) {
          requireCalls.push(node);
        }
      },
      'Program:exit': function () {
        log('exit processing for', context.getFilename());
        const scopeBody = getScopeBody(context.getScope());
        log('got scope:', scopeBody);

        requireCalls.forEach(function (node, index) {
          const nodePosition = findNodeIndexInScopeBody(scopeBody, node);
          log('node position in scope:', nodePosition);

          const statementWithRequireCall = scopeBody[nodePosition];
          const nextStatement = scopeBody[nodePosition + 1];
          const nextRequireCall = requireCalls[index + 1];

          if (nextRequireCall && containsNodeOrEqual(statementWithRequireCall, nextRequireCall)) {
            return;
          }

          if (nextStatement && (!nextRequireCall || !containsNodeOrEqual(nextStatement, nextRequireCall))) {

            checkForNewLine(statementWithRequireCall, nextStatement, 'require');
          }
        });
      },
      FunctionDeclaration: incrementLevel,
      FunctionExpression: incrementLevel,
      ArrowFunctionExpression: incrementLevel,
      BlockStatement: incrementLevel,
      ObjectExpression: incrementLevel,
      Decorator: incrementLevel,
      'FunctionDeclaration:exit': decrementLevel,
      'FunctionExpression:exit': decrementLevel,
      'ArrowFunctionExpression:exit': decrementLevel,
      'BlockStatement:exit': decrementLevel,
      'ObjectExpression:exit': decrementLevel,
      'Decorator:exit': decrementLevel
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuZXdsaW5lLWFmdGVyLWltcG9ydC5qcyJdLCJuYW1lcyI6WyJsb2ciLCJjb250YWluc05vZGVPckVxdWFsIiwib3V0ZXJOb2RlIiwiaW5uZXJOb2RlIiwicmFuZ2UiLCJnZXRTY29wZUJvZHkiLCJzY29wZSIsImJsb2NrIiwidHlwZSIsImJvZHkiLCJmaW5kTm9kZUluZGV4SW5TY29wZUJvZHkiLCJub2RlVG9GaW5kIiwiZmluZEluZGV4Iiwibm9kZSIsImdldExpbmVEaWZmZXJlbmNlIiwibmV4dE5vZGUiLCJsb2MiLCJzdGFydCIsImxpbmUiLCJlbmQiLCJpc0NsYXNzV2l0aERlY29yYXRvciIsImRlY29yYXRvcnMiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJzY2hlbWEiLCJjcmVhdGUiLCJjb250ZXh0IiwibGV2ZWwiLCJyZXF1aXJlQ2FsbHMiLCJjaGVja0Zvck5ld0xpbmUiLCJvcHRpb25zIiwiY291bnQiLCJjb2x1bW4iLCJyZXBvcnQiLCJtZXNzYWdlIiwiaW5jcmVtZW50TGV2ZWwiLCJkZWNyZW1lbnRMZXZlbCIsIkltcG9ydERlY2xhcmF0aW9uIiwicGFyZW50Iiwibm9kZVBvc2l0aW9uIiwiaW5kZXhPZiIsIkNhbGxFeHByZXNzaW9uIiwicHVzaCIsImdldEZpbGVuYW1lIiwic2NvcGVCb2R5IiwiZ2V0U2NvcGUiLCJmb3JFYWNoIiwiaW5kZXgiLCJzdGF0ZW1lbnRXaXRoUmVxdWlyZUNhbGwiLCJuZXh0U3RhdGVtZW50IiwibmV4dFJlcXVpcmVDYWxsIiwiRnVuY3Rpb25EZWNsYXJhdGlvbiIsIkZ1bmN0aW9uRXhwcmVzc2lvbiIsIkFycm93RnVuY3Rpb25FeHByZXNzaW9uIiwiQmxvY2tTdGF0ZW1lbnQiLCJPYmplY3RFeHByZXNzaW9uIiwiRGVjb3JhdG9yIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBRUE7Ozs7OztBQVBBOzs7OztBQVFBLE1BQU1BLE1BQU0scUJBQU0saURBQU4sQ0FB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RyxtQkFBbUJwRCxvQkFBb0JrRCx3QkFBcEIsRUFBOENFLGVBQTlDLENBQXZCLEVBQXVGO0FBQ3JGO0FBQ0Q7O0FBRUQsY0FBSUQsa0JBQ0EsQ0FBQ0MsZUFBRCxJQUFvQixDQUFDcEQsb0JBQW9CbUQsYUFBcEIsRUFBbUNDLGVBQW5DLENBRHJCLENBQUosRUFDK0U7O0FBRTdFckIsNEJBQWdCbUIsd0JBQWhCLEVBQTBDQyxhQUExQyxFQUF5RCxTQUF6RDtBQUNEO0FBQ0YsU0FqQkQ7QUFrQkQsT0F0Q0k7QUF1Q0xFLDJCQUFxQmhCLGNBdkNoQjtBQXdDTGlCLDBCQUFvQmpCLGNBeENmO0FBeUNMa0IsK0JBQXlCbEIsY0F6Q3BCO0FBMENMbUIsc0JBQWdCbkIsY0ExQ1g7QUEyQ0xvQix3QkFBa0JwQixjQTNDYjtBQTRDTHFCLGlCQUFXckIsY0E1Q047QUE2Q0wsa0NBQTRCQyxjQTdDdkI7QUE4Q0wsaUNBQTJCQSxjQTlDdEI7QUErQ0wsc0NBQWdDQSxjQS9DM0I7QUFnREwsNkJBQXVCQSxjQWhEbEI7QUFpREwsK0JBQXlCQSxjQWpEcEI7QUFrREwsd0JBQWtCQTtBQWxEYixLQUFQO0FBb0REO0FBdEdjLENBQWpCIiwiZmlsZSI6InJ1bGVzXFxuZXdsaW5lLWFmdGVyLWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBSdWxlIHRvIGVuZm9yY2UgbmV3IGxpbmUgYWZ0ZXIgaW1wb3J0IG5vdCBmb2xsb3dlZCBieSBhbm90aGVyIGltcG9ydC5cbiAqIEBhdXRob3IgUmFkZWsgQmVua2VsXG4gKi9cblxuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5cbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1ZydcbmNvbnN0IGxvZyA9IGRlYnVnKCdlc2xpbnQtcGx1Z2luLWltcG9ydDpydWxlczpuZXdsaW5lLWFmdGVyLWltcG9ydCcpXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSdWxlIERlZmluaXRpb25cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGNvbnRhaW5zTm9kZU9yRXF1YWwob3V0ZXJOb2RlLCBpbm5lck5vZGUpIHtcbiAgICByZXR1cm4gb3V0ZXJOb2RlLnJhbmdlWzBdIDw9IGlubmVyTm9kZS5yYW5nZVswXSAmJiBvdXRlck5vZGUucmFuZ2VbMV0gPj0gaW5uZXJOb2RlLnJhbmdlWzFdXG59XG5cbmZ1bmN0aW9uIGdldFNjb3BlQm9keShzY29wZSkge1xuICAgIGlmIChzY29wZS5ibG9jay50eXBlID09PSAnU3dpdGNoU3RhdGVtZW50Jykge1xuICAgICAgbG9nKCdTd2l0Y2hTdGF0ZW1lbnQgc2NvcGVzIG5vdCBzdXBwb3J0ZWQnKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCB7IGJvZHkgfSA9IHNjb3BlLmJsb2NrXG4gICAgaWYgKGJvZHkgJiYgYm9keS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgIHJldHVybiBib2R5LmJvZHlcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keVxufVxuXG5mdW5jdGlvbiBmaW5kTm9kZUluZGV4SW5TY29wZUJvZHkoYm9keSwgbm9kZVRvRmluZCkge1xuICAgIHJldHVybiBib2R5LmZpbmRJbmRleCgobm9kZSkgPT4gY29udGFpbnNOb2RlT3JFcXVhbChub2RlLCBub2RlVG9GaW5kKSlcbn1cblxuZnVuY3Rpb24gZ2V0TGluZURpZmZlcmVuY2Uobm9kZSwgbmV4dE5vZGUpIHtcbiAgcmV0dXJuIG5leHROb2RlLmxvYy5zdGFydC5saW5lIC0gbm9kZS5sb2MuZW5kLmxpbmVcbn1cblxuZnVuY3Rpb24gaXNDbGFzc1dpdGhEZWNvcmF0b3Iobm9kZSkge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnQ2xhc3NEZWNsYXJhdGlvbicgJiYgbm9kZS5kZWNvcmF0b3JzICYmIG5vZGUuZGVjb3JhdG9ycy5sZW5ndGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7fSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgJ3R5cGUnOiAnb2JqZWN0JyxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ2NvdW50Jzoge1xuICAgICAgICAgICAgJ3R5cGUnOiAnaW50ZWdlcicsXG4gICAgICAgICAgICAnbWluaW11bSc6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJzogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBsZXQgbGV2ZWwgPSAwXG4gICAgY29uc3QgcmVxdWlyZUNhbGxzID0gW11cblxuICAgIGZ1bmN0aW9uIGNoZWNrRm9yTmV3TGluZShub2RlLCBuZXh0Tm9kZSwgdHlwZSkge1xuICAgICAgaWYgKGlzQ2xhc3NXaXRoRGVjb3JhdG9yKG5leHROb2RlKSkge1xuICAgICAgICBuZXh0Tm9kZSA9IG5leHROb2RlLmRlY29yYXRvcnNbMF1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7IGNvdW50OiAxIH1cbiAgICAgIGlmIChnZXRMaW5lRGlmZmVyZW5jZShub2RlLCBuZXh0Tm9kZSkgPCBvcHRpb25zLmNvdW50ICsgMSkge1xuICAgICAgICBsZXQgY29sdW1uID0gbm9kZS5sb2Muc3RhcnQuY29sdW1uXG5cbiAgICAgICAgaWYgKG5vZGUubG9jLnN0YXJ0LmxpbmUgIT09IG5vZGUubG9jLmVuZC5saW5lKSB7XG4gICAgICAgICAgY29sdW1uID0gMFxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIGxvYzoge1xuICAgICAgICAgICAgbGluZTogbm9kZS5sb2MuZW5kLmxpbmUsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXNzYWdlOiBgRXhwZWN0ZWQgZW1wdHkgbGluZSBhZnRlciAke3R5cGV9IHN0YXRlbWVudCBub3QgZm9sbG93ZWQgYnkgYW5vdGhlciAke3R5cGV9LmAsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50TGV2ZWwoKSB7XG4gICAgICBsZXZlbCsrXG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudExldmVsKCkge1xuICAgICAgbGV2ZWwtLVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgY29uc3QgeyBwYXJlbnQgfSA9IG5vZGVcbiAgICAgICAgY29uc3Qgbm9kZVBvc2l0aW9uID0gcGFyZW50LmJvZHkuaW5kZXhPZihub2RlKVxuICAgICAgICBjb25zdCBuZXh0Tm9kZSA9IHBhcmVudC5ib2R5W25vZGVQb3NpdGlvbiArIDFdXG5cbiAgICAgICAgaWYgKG5leHROb2RlICYmIG5leHROb2RlLnR5cGUgIT09ICdJbXBvcnREZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICBjaGVja0Zvck5ld0xpbmUobm9kZSwgbmV4dE5vZGUsICdpbXBvcnQnKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgQ2FsbEV4cHJlc3Npb246IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzU3RhdGljUmVxdWlyZShub2RlKSAmJiBsZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJlcXVpcmVDYWxscy5wdXNoKG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnUHJvZ3JhbTpleGl0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2coJ2V4aXQgcHJvY2Vzc2luZyBmb3InLCBjb250ZXh0LmdldEZpbGVuYW1lKCkpXG4gICAgICAgIGNvbnN0IHNjb3BlQm9keSA9IGdldFNjb3BlQm9keShjb250ZXh0LmdldFNjb3BlKCkpXG4gICAgICAgIGxvZygnZ290IHNjb3BlOicsIHNjb3BlQm9keSlcblxuICAgICAgICByZXF1aXJlQ2FsbHMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgICBjb25zdCBub2RlUG9zaXRpb24gPSBmaW5kTm9kZUluZGV4SW5TY29wZUJvZHkoc2NvcGVCb2R5LCBub2RlKVxuICAgICAgICAgIGxvZygnbm9kZSBwb3NpdGlvbiBpbiBzY29wZTonLCBub2RlUG9zaXRpb24pXG5cbiAgICAgICAgICBjb25zdCBzdGF0ZW1lbnRXaXRoUmVxdWlyZUNhbGwgPSBzY29wZUJvZHlbbm9kZVBvc2l0aW9uXVxuICAgICAgICAgIGNvbnN0IG5leHRTdGF0ZW1lbnQgPSBzY29wZUJvZHlbbm9kZVBvc2l0aW9uICsgMV1cbiAgICAgICAgICBjb25zdCBuZXh0UmVxdWlyZUNhbGwgPSByZXF1aXJlQ2FsbHNbaW5kZXggKyAxXVxuXG4gICAgICAgICAgaWYgKG5leHRSZXF1aXJlQ2FsbCAmJiBjb250YWluc05vZGVPckVxdWFsKHN0YXRlbWVudFdpdGhSZXF1aXJlQ2FsbCwgbmV4dFJlcXVpcmVDYWxsKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5leHRTdGF0ZW1lbnQgJiZcbiAgICAgICAgICAgICAoIW5leHRSZXF1aXJlQ2FsbCB8fCAhY29udGFpbnNOb2RlT3JFcXVhbChuZXh0U3RhdGVtZW50LCBuZXh0UmVxdWlyZUNhbGwpKSkge1xuXG4gICAgICAgICAgICBjaGVja0Zvck5ld0xpbmUoc3RhdGVtZW50V2l0aFJlcXVpcmVDYWxsLCBuZXh0U3RhdGVtZW50LCAncmVxdWlyZScpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIEZ1bmN0aW9uRGVjbGFyYXRpb246IGluY3JlbWVudExldmVsLFxuICAgICAgRnVuY3Rpb25FeHByZXNzaW9uOiBpbmNyZW1lbnRMZXZlbCxcbiAgICAgIEFycm93RnVuY3Rpb25FeHByZXNzaW9uOiBpbmNyZW1lbnRMZXZlbCxcbiAgICAgIEJsb2NrU3RhdGVtZW50OiBpbmNyZW1lbnRMZXZlbCxcbiAgICAgIE9iamVjdEV4cHJlc3Npb246IGluY3JlbWVudExldmVsLFxuICAgICAgRGVjb3JhdG9yOiBpbmNyZW1lbnRMZXZlbCxcbiAgICAgICdGdW5jdGlvbkRlY2xhcmF0aW9uOmV4aXQnOiBkZWNyZW1lbnRMZXZlbCxcbiAgICAgICdGdW5jdGlvbkV4cHJlc3Npb246ZXhpdCc6IGRlY3JlbWVudExldmVsLFxuICAgICAgJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uOmV4aXQnOiBkZWNyZW1lbnRMZXZlbCxcbiAgICAgICdCbG9ja1N0YXRlbWVudDpleGl0JzogZGVjcmVtZW50TGV2ZWwsXG4gICAgICAnT2JqZWN0RXhwcmVzc2lvbjpleGl0JzogZGVjcmVtZW50TGV2ZWwsXG4gICAgICAnRGVjb3JhdG9yOmV4aXQnOiBkZWNyZW1lbnRMZXZlbCxcbiAgICB9XG4gIH0sXG59XG4iXX0=