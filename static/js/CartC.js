/* globals ecommerce */

(function() {

  ecommerce.CartC = Trillo.inherits(Shared.SharedC, function(viewSpec) {
    Shared.SharedC.call(this, viewSpec);
  });

  var CartC = ecommerce.CartC.prototype;
  var SharedC = Shared.SharedC.prototype;

  CartC.handleAction = function(actionName, selectedObj, $e, targetController) {
    return SharedC.handleAction.call(this, actionName, selectedObj, $e, targetController);
  };
  
  CartC.fetchDataLocally = function(viewSpec) {
    var dd = [];
    var items = ecommerce._cart ? ecommerce._cart.cart_items : null;
    if (items) {
        for (var i=0; i<items.length; i++) {
            var p = this.getProduct(items[i].product_id);
            if (p) {
                dd.push({
                    img : p.doc.thumbnailImageURL,
                    name : p.doc.name,
                    usdPrice: p.doc.usdPrice,
                    quantity: items[i].quantity,
                    totalPrice : items[i].quantity * p.doc.usdPrice
                })  
            }
        }
    }
    return dd;
  }
  
  CartC.getProduct = function(id) {
    var dd = [];
    var items = ecommerce._catalog ? ecommerce._catalog.rows : null;
    if (items) {
        for (var i=0; i<items.length; i++) {
            if (items[i].id === id) {
                return items[i];
            }
        }
    }
    return null;
  }  
})();
