/* globals ecommerce */

(function() {

  ecommerce.headerC = Trillo.inherits(Shared.SharedC, function(viewSpec) {
    Shared.SharedC.call(this, viewSpec);
  });

  var headerC = ecommerce.headerC.prototype;
  var SharedC = Shared.SharedC.prototype;

  headerC.handleAction = function(actionName, selectedObj, $e, targetController) {
    return SharedC.handleAction.call(this, actionName, selectedObj, $e, targetController);
  };

  headerC.loadData = function(pageNumber, requireClearing) {
    var self = this;
    var myDeferred = $.Deferred();

    $.get("/api/catalog/_all_docs?include_docs=true", function(data) {
      ecommerce._catalog = data;
      var items = data.rows;
      if (items) {
        for (var i = 0; i < items.length; i++) {
          items[i].doc.thumbnailImageURL += "/";
        }
        items._total = items.length;
      }
      self.loadCart(myDeferred);
    });
    return myDeferred.promise();
  };

  headerC.loadCart = function(myDeferred) {
    var self = this;
    var cartId = "cart_" + Trillo.appContext.user.userId;
    var url = "/api/cart/" + cartId + "?attachments=true";
    $.ajax({
      url : url
    }).done(function(data) {
      ecommerce._cart = data;
      var headerData = {
        cartItemCount : data.cart_items ? data.cart_items.length : 0
      };
      self.dataAvailable(headerData);
      myDeferred.resolve(self._model);
    }).fail(function() {
      self.creatCart(myDeferred);
    });
  }

  headerC.creatCart = function(myDeferred) {
    var self = this;
    var body = {
      _id : "cart_" + Trillo.appContext.user.userId,
      user : Trillo.appContext.user.userId
    }
    var options = {
      url : "/api/cart/",
      type : "post",
      data : Trillo.stringify(body),
      contentType : "application/json",
      datatype : "application/json"
    };

    $.ajax(options).done(function(data) {
      ecommerce._cart = data;
      var headerData = {
        cartItemCount : data.cart_items ? data.cart_items.length : 0
      };
      self.dataAvailable(headerData);
      myDeferred.resolve(self._model);
    }).fail(function() {
      myDeferred.reject({
        errorMsg : "Failed to load model"
      });
    });
  }

  headerC.newItemAdded = function() {
    var dt = this.getData();
    dt.cartItemCount++;
    this.view().reRenderView();
  }
})();
