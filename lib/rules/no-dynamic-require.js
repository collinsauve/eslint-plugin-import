'use strict';

function isRequire(node) {
  return node && node.callee && node.callee.type === 'Identifier' && node.callee.name === 'require' && node.arguments.length >= 1;
}

function isStaticValue(arg) {
  return arg.type === 'Literal' || arg.type === 'TemplateLiteral' && arg.expressions.length === 0;
}

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    return {
      CallExpression(node) {
        if (isRequire(node) && !isStaticValue(node.arguments[0])) {
          context.report({
            node,
            message: 'Calls to require() should use string literals'
          });
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1keW5hbWljLXJlcXVpcmUuanMiXSwibmFtZXMiOlsiaXNSZXF1aXJlIiwibm9kZSIsImNhbGxlZSIsInR5cGUiLCJuYW1lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiaXNTdGF0aWNWYWx1ZSIsImFyZyIsImV4cHJlc3Npb25zIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsIkNhbGxFeHByZXNzaW9uIiwicmVwb3J0IiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUN2QixTQUFPQSxRQUNMQSxLQUFLQyxNQURBLElBRUxELEtBQUtDLE1BQUwsQ0FBWUMsSUFBWixLQUFxQixZQUZoQixJQUdMRixLQUFLQyxNQUFMLENBQVlFLElBQVosS0FBcUIsU0FIaEIsSUFJTEgsS0FBS0ksU0FBTCxDQUFlQyxNQUFmLElBQXlCLENBSjNCO0FBS0Q7O0FBRUQsU0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUIsU0FBT0EsSUFBSUwsSUFBSixLQUFhLFNBQWIsSUFDSkssSUFBSUwsSUFBSixLQUFhLGlCQUFiLElBQWtDSyxJQUFJQyxXQUFKLENBQWdCSCxNQUFoQixLQUEyQixDQURoRTtBQUVEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQURGLEdBRFM7O0FBS2ZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QixXQUFPO0FBQ0xDLHFCQUFlZixJQUFmLEVBQXFCO0FBQ25CLFlBQUlELFVBQVVDLElBQVYsS0FBbUIsQ0FBQ00sY0FBY04sS0FBS0ksU0FBTCxDQUFlLENBQWYsQ0FBZCxDQUF4QixFQUEwRDtBQUN4RFUsa0JBQVFFLE1BQVIsQ0FBZTtBQUNiaEIsZ0JBRGE7QUFFYmlCLHFCQUFTO0FBRkksV0FBZjtBQUlEO0FBQ0Y7QUFSSSxLQUFQO0FBVUQ7QUFoQmMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5vLWR5bmFtaWMtcmVxdWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGlzUmVxdWlyZShub2RlKSB7XG4gIHJldHVybiBub2RlICYmXG4gICAgbm9kZS5jYWxsZWUgJiZcbiAgICBub2RlLmNhbGxlZS50eXBlID09PSAnSWRlbnRpZmllcicgJiZcbiAgICBub2RlLmNhbGxlZS5uYW1lID09PSAncmVxdWlyZScgJiZcbiAgICBub2RlLmFyZ3VtZW50cy5sZW5ndGggPj0gMVxufVxuXG5mdW5jdGlvbiBpc1N0YXRpY1ZhbHVlKGFyZykge1xuICByZXR1cm4gYXJnLnR5cGUgPT09ICdMaXRlcmFsJyB8fFxuICAgIChhcmcudHlwZSA9PT0gJ1RlbXBsYXRlTGl0ZXJhbCcgJiYgYXJnLmV4cHJlc3Npb25zLmxlbmd0aCA9PT0gMClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7fSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIENhbGxFeHByZXNzaW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZShub2RlKSAmJiAhaXNTdGF0aWNWYWx1ZShub2RlLmFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0NhbGxzIHRvIHJlcXVpcmUoKSBzaG91bGQgdXNlIHN0cmluZyBsaXRlcmFscycsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=