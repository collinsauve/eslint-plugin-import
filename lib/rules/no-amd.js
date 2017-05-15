'use strict';

/**
 * @fileoverview Rule to prefer imports to AMD
 * @author Jamund Ferguson
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {}
    },

    create: function (context) {

        return {

            'CallExpression': function (node) {
                if (context.getScope().type !== 'module') return;

                if (node.callee.type !== 'Identifier') return;
                if (node.callee.name !== 'require' && node.callee.name !== 'define') return;

                // todo: capture define((require, module, exports) => {}) form?
                if (node.arguments.length !== 2) return;

                const modules = node.arguments[0];
                if (modules.type !== 'ArrayExpression') return;

                // todo: check second arg type? (identifier or callback)

                context.report(node, `Expected imports instead of AMD ${node.callee.name}().`);
            }
        };
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1hbWQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsIm5vZGUiLCJnZXRTY29wZSIsInR5cGUiLCJjYWxsZWUiLCJuYW1lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwibW9kdWxlcyIsInJlcG9ydCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsVUFBTTtBQUNGQyxjQUFNO0FBREosS0FETzs7QUFLYkMsWUFBUSxVQUFVQyxPQUFWLEVBQW1COztBQUV2QixlQUFPOztBQUVILDhCQUFrQixVQUFVQyxJQUFWLEVBQWdCO0FBQ3BDLG9CQUFJRCxRQUFRRSxRQUFSLEdBQW1CQyxJQUFuQixLQUE0QixRQUFoQyxFQUEwQzs7QUFFMUMsb0JBQUlGLEtBQUtHLE1BQUwsQ0FBWUQsSUFBWixLQUFxQixZQUF6QixFQUF1QztBQUN2QyxvQkFBSUYsS0FBS0csTUFBTCxDQUFZQyxJQUFaLEtBQXFCLFNBQXJCLElBQ0FKLEtBQUtHLE1BQUwsQ0FBWUMsSUFBWixLQUFxQixRQUR6QixFQUNtQzs7QUFFbkM7QUFDQSxvQkFBSUosS0FBS0ssU0FBTCxDQUFlQyxNQUFmLEtBQTBCLENBQTlCLEVBQWlDOztBQUVqQyxzQkFBTUMsVUFBVVAsS0FBS0ssU0FBTCxDQUFlLENBQWYsQ0FBaEI7QUFDQSxvQkFBSUUsUUFBUUwsSUFBUixLQUFpQixpQkFBckIsRUFBd0M7O0FBRXhDOztBQUVNSCx3QkFBUVMsTUFBUixDQUFlUixJQUFmLEVBQXNCLG1DQUFrQ0EsS0FBS0csTUFBTCxDQUFZQyxJQUFLLEtBQXpFO0FBQ0g7QUFsQkUsU0FBUDtBQXFCSDtBQTVCWSxDQUFqQiIsImZpbGUiOiJydWxlc1xcbm8tYW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gcHJlZmVyIGltcG9ydHMgdG8gQU1EXG4gKiBAYXV0aG9yIEphbXVuZCBGZXJndXNvblxuICovXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSdWxlIERlZmluaXRpb25cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1ldGE6IHtcbiAgICAgICAgZG9jczoge30sXG4gICAgfSxcblxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcblxuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAnQ2FsbEV4cHJlc3Npb24nOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIGlmIChjb250ZXh0LmdldFNjb3BlKCkudHlwZSAhPT0gJ21vZHVsZScpIHJldHVyblxuXG4gICAgICAgICAgaWYgKG5vZGUuY2FsbGVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuXG4gICAgICAgICAgaWYgKG5vZGUuY2FsbGVlLm5hbWUgIT09ICdyZXF1aXJlJyAmJlxuICAgICAgICAgICAgICBub2RlLmNhbGxlZS5uYW1lICE9PSAnZGVmaW5lJykgcmV0dXJuXG5cbiAgICAgICAgICAvLyB0b2RvOiBjYXB0dXJlIGRlZmluZSgocmVxdWlyZSwgbW9kdWxlLCBleHBvcnRzKSA9PiB7fSkgZm9ybT9cbiAgICAgICAgICBpZiAobm9kZS5hcmd1bWVudHMubGVuZ3RoICE9PSAyKSByZXR1cm5cblxuICAgICAgICAgIGNvbnN0IG1vZHVsZXMgPSBub2RlLmFyZ3VtZW50c1swXVxuICAgICAgICAgIGlmIChtb2R1bGVzLnR5cGUgIT09ICdBcnJheUV4cHJlc3Npb24nKSByZXR1cm5cblxuICAgICAgICAgIC8vIHRvZG86IGNoZWNrIHNlY29uZCBhcmcgdHlwZT8gKGlkZW50aWZpZXIgb3IgY2FsbGJhY2spXG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBgRXhwZWN0ZWQgaW1wb3J0cyBpbnN0ZWFkIG9mIEFNRCAke25vZGUuY2FsbGVlLm5hbWV9KCkuYClcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgIH0sXG59XG4iXX0=