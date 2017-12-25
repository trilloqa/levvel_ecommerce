/* globals ecommerce */

(function() {

  ecommerce.CatalogGridC = Trillo.inherits(Shared.SharedC, function(viewSpec) {
    Shared.SharedC.call(this, viewSpec);
  });

  var CatalogGridC = ecommerce.CatalogGridC.prototype;
  var SharedC = Shared.SharedC.prototype;

  CatalogGridC.handleAction = function(actionName, selectedObj, $e, targetController) {
    return SharedC.handleAction.call(this, actionName, selectedObj, $e, targetController);
  };

  CatalogGridC.fetchDataLocally = function() {
    return (ecommerce._catalog ? ecommerce._catalog.rows : null);
  };
})();
