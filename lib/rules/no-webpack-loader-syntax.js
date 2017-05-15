'use strict';

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reportIfNonStandard(context, node, name) {
  if (name.indexOf('!') !== -1) {
    context.report(node, `Unexpected '!' in '${name}'. ` + 'Do not use import syntax to configure webpack loaders.');
  }
}

module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {
    return {
      ImportDeclaration: function handleImports(node) {
        reportIfNonStandard(context, node, node.source.value);
      },
      CallExpression: function handleRequires(node) {
        if ((0, _staticRequire2.default)(node)) {
          reportIfNonStandard(context, node, node.arguments[0].value);
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby13ZWJwYWNrLWxvYWRlci1zeW50YXguanMiXSwibmFtZXMiOlsicmVwb3J0SWZOb25TdGFuZGFyZCIsImNvbnRleHQiLCJub2RlIiwibmFtZSIsImluZGV4T2YiLCJyZXBvcnQiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJjcmVhdGUiLCJJbXBvcnREZWNsYXJhdGlvbiIsImhhbmRsZUltcG9ydHMiLCJzb3VyY2UiLCJ2YWx1ZSIsIkNhbGxFeHByZXNzaW9uIiwiaGFuZGxlUmVxdWlyZXMiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBLFNBQVNBLG1CQUFULENBQTZCQyxPQUE3QixFQUFzQ0MsSUFBdEMsRUFBNENDLElBQTVDLEVBQWtEO0FBQ2hELE1BQUlBLEtBQUtDLE9BQUwsQ0FBYSxHQUFiLE1BQXNCLENBQUMsQ0FBM0IsRUFBOEI7QUFDNUJILFlBQVFJLE1BQVIsQ0FBZUgsSUFBZixFQUFzQixzQkFBcUJDLElBQUssS0FBM0IsR0FDbkIsd0RBREY7QUFHRDtBQUNGOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQURGLEdBRFM7O0FBS2ZDLFVBQVEsVUFBVVQsT0FBVixFQUFtQjtBQUN6QixXQUFPO0FBQ0xVLHlCQUFtQixTQUFTQyxhQUFULENBQXVCVixJQUF2QixFQUE2QjtBQUM5Q0YsNEJBQW9CQyxPQUFwQixFQUE2QkMsSUFBN0IsRUFBbUNBLEtBQUtXLE1BQUwsQ0FBWUMsS0FBL0M7QUFDRCxPQUhJO0FBSUxDLHNCQUFnQixTQUFTQyxjQUFULENBQXdCZCxJQUF4QixFQUE4QjtBQUM1QyxZQUFJLDZCQUFnQkEsSUFBaEIsQ0FBSixFQUEyQjtBQUN6QkYsOEJBQW9CQyxPQUFwQixFQUE2QkMsSUFBN0IsRUFBbUNBLEtBQUtlLFNBQUwsQ0FBZSxDQUFmLEVBQWtCSCxLQUFyRDtBQUNEO0FBQ0Y7QUFSSSxLQUFQO0FBVUQ7QUFoQmMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5vLXdlYnBhY2stbG9hZGVyLXN5bnRheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1N0YXRpY1JlcXVpcmUgZnJvbSAnLi4vY29yZS9zdGF0aWNSZXF1aXJlJ1xuXG5mdW5jdGlvbiByZXBvcnRJZk5vblN0YW5kYXJkKGNvbnRleHQsIG5vZGUsIG5hbWUpIHtcbiAgaWYgKG5hbWUuaW5kZXhPZignIScpICE9PSAtMSkge1xuICAgIGNvbnRleHQucmVwb3J0KG5vZGUsIGBVbmV4cGVjdGVkICchJyBpbiAnJHtuYW1lfScuIGAgK1xuICAgICAgJ0RvIG5vdCB1c2UgaW1wb3J0IHN5bnRheCB0byBjb25maWd1cmUgd2VicGFjayBsb2FkZXJzLidcbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7fSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIEltcG9ydERlY2xhcmF0aW9uOiBmdW5jdGlvbiBoYW5kbGVJbXBvcnRzKG5vZGUpIHtcbiAgICAgICAgcmVwb3J0SWZOb25TdGFuZGFyZChjb250ZXh0LCBub2RlLCBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBDYWxsRXhwcmVzc2lvbjogZnVuY3Rpb24gaGFuZGxlUmVxdWlyZXMobm9kZSkge1xuICAgICAgICBpZiAoaXNTdGF0aWNSZXF1aXJlKG5vZGUpKSB7XG4gICAgICAgICAgcmVwb3J0SWZOb25TdGFuZGFyZChjb250ZXh0LCBub2RlLCBub2RlLmFyZ3VtZW50c1swXS52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=