'use strict';

var _unambiguous = require('eslint-module-utils/unambiguous');

module.exports = {
  meta: {},

  create: function (context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }

    return {
      Program: function (ast) {
        if (!(0, _unambiguous.isModule)(ast)) {
          context.report({
            node: ast,
            message: 'This module could be parsed as a valid script.'
          });
        }
      }
    };
  }
}; /**
    * @fileOverview Report modules that could parse incorrectly as scripts.
    * @author Ben Mosher
    */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzXFx1bmFtYmlndW91cy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImNyZWF0ZSIsImNvbnRleHQiLCJwYXJzZXJPcHRpb25zIiwic291cmNlVHlwZSIsIlByb2dyYW0iLCJhc3QiLCJyZXBvcnQiLCJub2RlIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNLEVBRFM7O0FBR2ZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QjtBQUNBLFFBQUlBLFFBQVFDLGFBQVIsQ0FBc0JDLFVBQXRCLEtBQXFDLFFBQXpDLEVBQW1EO0FBQ2pELGFBQU8sRUFBUDtBQUNEOztBQUVELFdBQU87QUFDTEMsZUFBUyxVQUFVQyxHQUFWLEVBQWU7QUFDdEIsWUFBSSxDQUFDLDJCQUFTQSxHQUFULENBQUwsRUFBb0I7QUFDbEJKLGtCQUFRSyxNQUFSLENBQWU7QUFDYkMsa0JBQU1GLEdBRE87QUFFYkcscUJBQVM7QUFGSSxXQUFmO0FBSUQ7QUFDRjtBQVJJLEtBQVA7QUFXRDtBQXBCYyxDQUFqQixDLENBUEEiLCJmaWxlIjoicnVsZXNcXHVuYW1iaWd1b3VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IFJlcG9ydCBtb2R1bGVzIHRoYXQgY291bGQgcGFyc2UgaW5jb3JyZWN0bHkgYXMgc2NyaXB0cy5cbiAqIEBhdXRob3IgQmVuIE1vc2hlclxuICovXG5cbmltcG9ydCB7IGlzTW9kdWxlIH0gZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy91bmFtYmlndW91cydcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHt9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAvLyBpZ25vcmUgbm9uLW1vZHVsZXNcbiAgICBpZiAoY29udGV4dC5wYXJzZXJPcHRpb25zLnNvdXJjZVR5cGUgIT09ICdtb2R1bGUnKSB7XG4gICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgUHJvZ3JhbTogZnVuY3Rpb24gKGFzdCkge1xuICAgICAgICBpZiAoIWlzTW9kdWxlKGFzdCkpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICBub2RlOiBhc3QsXG4gICAgICAgICAgICBtZXNzYWdlOiAnVGhpcyBtb2R1bGUgY291bGQgYmUgcGFyc2VkIGFzIGEgdmFsaWQgc2NyaXB0LicsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG5cbiAgfSxcbn1cbiJdfQ==