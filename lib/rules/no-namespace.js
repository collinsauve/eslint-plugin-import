'use strict';

/**
 * @fileoverview Rule to disallow namespace import
 * @author Radek Benkel
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
      'ImportNamespaceSpecifier': function (node) {
        context.report(node, `Unexpected namespace import.`);
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFxuby1uYW1lc3BhY2UuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwiY3JlYXRlIiwiY29udGV4dCIsIm5vZGUiLCJyZXBvcnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7QUFHQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU07QUFERixHQURTOztBQUtmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsV0FBTztBQUNMLGtDQUE0QixVQUFVQyxJQUFWLEVBQWdCO0FBQzFDRCxnQkFBUUUsTUFBUixDQUFlRCxJQUFmLEVBQXNCLDhCQUF0QjtBQUNEO0FBSEksS0FBUDtBQUtEO0FBWGMsQ0FBakIiLCJmaWxlIjoicnVsZXNcXG5vLW5hbWVzcGFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBSdWxlIHRvIGRpc2FsbG93IG5hbWVzcGFjZSBpbXBvcnRcbiAqIEBhdXRob3IgUmFkZWsgQmVua2VsXG4gKi9cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJ1bGUgRGVmaW5pdGlvblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcic6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KG5vZGUsIGBVbmV4cGVjdGVkIG5hbWVzcGFjZSBpbXBvcnQuYClcbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19