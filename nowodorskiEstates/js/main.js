// UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        addItem: '.add__item',
        removeAllItems: '.remove__all',
        removeItem: 'remove__item',
        updateItem: 'update__item',
        inputCity: '.add__city',
        inputStreet: '.add__street',
        inputProperty: '.add__property',
        inputApartment: '.add__apartment',
        inputPrice: '.add__price',
        inputType: '.add__type',
        inputDescription: '.add__description',
        updateId: '.item__id',
        updateCity: '.item__city',
        updateStreet: '.item__street',
        updateProperty: '.item__property',
        updateApartment: '.item__apartment',
        updatePrice: '.item__price',
        updateType: '.item__type',
        updateDescription: '.item__description',
        postContainer: '.post__list',
        popupContainer: '.popup__overlay',
        saveItem: 'save__item'
    };
    return {
        getInput: function() {
            return {
                city: document.querySelector(DOMstrings.inputCity).value,
                street: document.querySelector(DOMstrings.inputStreet).value,
                property: document.querySelector(DOMstrings.inputProperty).value,
                apartment: document.querySelector(DOMstrings.inputApartment).value,
                price: document.querySelector(DOMstrings.inputPrice).value,
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value
            };
        },
        getUpdateInput: function() {
            return {
                id: document.querySelector(DOMstrings.updateId).value,
                city: document.querySelector(DOMstrings.updateCity).value,
                street: document.querySelector(DOMstrings.updateStreet).value,
                property: document.querySelector(DOMstrings.updateProperty).value,
                apartment: document.querySelector(DOMstrings.updateApartment).value,
                price: document.querySelector(DOMstrings.updatePrice).value,
                type: document.querySelector(DOMstrings.updateType).value,
                description: document.querySelector(DOMstrings.updateDescription).value
            };
        },

        drawRow: function(obj) {
            var html, newHtml, element;
            element = DOMstrings.postContainer;

            html = '<div class="item cl" id="%id%"><div class="city">%city%</div><div class="street">%street%</div><div class="property">%property%</div><div class="apartment">%apartment%</div><div class="price">%price%</div><div class="type">%type%</div><div class="description">%description%</div><div class="item__buttons"><button type="button" class="button update__item">edytuj</button><button type="button" class="button remove__item">usuń</button></div><div class="popup__overlay"></div></div>';
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%city%', obj.city);
            newHtml = newHtml.replace('%street%', obj.street);
            newHtml = newHtml.replace('%property%', obj.property);
            newHtml = newHtml.replace('%apartment%', obj.apartment);
            newHtml = newHtml.replace('%price%', obj.price);
            newHtml = newHtml.replace('%type%', obj.type);
            newHtml = newHtml.replace('%description%', obj.description);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearRows: function() {
            document.getElementById("list").innerHTML = "";
        },

        clearElement: function(id) {
            var item = document.getElementById(id);
            item.remove();
        },

        popup: function(obj, callupdateDataFun) {
            var html, newHtml, element, objData;

            element = DOMstrings.popupContainer;
            objData = obj.data;

            html = '<div class="popup__content cl"><input type="hidden" class="item__id" value="%id%"><div class="cityPopup">Miasto:<input type="text" class="item__city" value="%city%"></div><div class="streetPopup">Ulica:<input type="text" class="item__street" value="%street%"></div><div class="propertyPopup">Budynek:<input type="text" class="item__property" value="%property%"></div><div class="apartmentPopup">Lokal:<input type="text" class="item__apartment" value="%apartment%"></div><div class="pricePopup">Cena:<input type="number" class="item__price" value="%price%"></div><div class="typePopup">Typ:<input type="number" class="item__type" value="%type%"></div><div class="descriptionPopup">Opis:<input type="text" class="item__description" value="%description%"></div><button type="button" class="button save__item">zapisz</button><button type="button" class="button cancel__item">zamknij</button></div>';
           
            newHtml = html.replace('%id%', objData.id);
            newHtml = newHtml.replace('%city%', objData.city);
            newHtml = newHtml.replace('%street%', objData.street);
            newHtml = newHtml.replace('%property%', objData.property);
            newHtml = newHtml.replace('%apartment%', objData.apartment);
            newHtml = newHtml.replace('%price%', objData.price);
            newHtml = newHtml.replace('%type%', objData.type);
            newHtml = newHtml.replace('%description%', objData.description);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            $("popup__overlay, .popup__content").addClass("active");

            document.querySelector('.save__item').addEventListener('click', callupdateDataFun);
            
            var closePupup = function() {
                document.querySelector('.popup__content').remove();
            };
            document.querySelector('.cancel__item').addEventListener('click', closePupup);
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();



// GLOBAL APP CONTROLLER
    
var controller = (function(UICtrl) {

var initTable = function() {
    $.ajax({
        async: false,
        method: 'GET',
        contentType: 'aplication/json',
        dataType: 'json',
        url: "https://alfa.propertygrouppoland.pl/q/natalianalepa/getAll",
    })
    .done(res => drawTable(res))
    .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
};

var drawTable = function(listOfProperties) {
    var listOfPropertiesArr = listOfProperties.data;
    listOfPropertiesArr.forEach(element => {
        UICtrl.drawRow(element);
        setupTableEventListeners();
    });
};

var setupTableEventListeners = function() {
    var DOM, remItems, updateItems;
    
    DOM = UICtrl.getDOMstrings();

    remItems = document.getElementsByClassName(DOM.removeItem);
    for (i = 0; i < remItems.length; i++) {
        remItems[i].addEventListener('click', ctrlRemoveItem);
    }  

    updateItems = document.getElementsByClassName(DOM.updateItem);
    for (i = 0; i < updateItems.length; i++) {
        updateItems[i].addEventListener('click', ctrlUpdateItem);
    }  

};

var setupEventListeners = function() {
    var DOM;
    
    DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.addItem).addEventListener('click', ctrlAddItem);
    document.querySelector(DOM.removeAllItems).addEventListener('click', ctrlRemoveAllItems);
};

var ctrlAddItem = function() {
    var input;

    input = UICtrl.getInput();   

     var data = {
        city: input.city, 
        street: input.street, 
        property: input.property, 
        apartment: input.apartment, 
        price: input.price, 
        type: input.type, 
        description: input.description
     }

    $.ajax({
        async: false,
        method: 'POST',
        contentType: 'aplication/json',
        dataType: 'json',
        url: "https://alfa.propertygrouppoland.pl/q/natalianalepa/create",
        data: JSON.stringify(data)
    })
    .done(function() {
        UICtrl.clearRows();
        initTable();
    })
    .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
};

var ctrlRemoveAllItems = function() {
    $.ajax({
        url :  "https://alfa.propertygrouppoland.pl/q/natalianalepa/deleteAll",
        dataType : "json"
    })
    .done(function() {
        UICtrl.clearRows();
        initTable();
    })
    .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}

var ctrlRemoveItem = function() {
    var itemID;
        
        itemID = event.target.parentNode.parentNode.id;

    $.ajax({
        url :  "https://alfa.propertygrouppoland.pl/q/natalianalepa/delete/" + itemID + "",
        dataType : "json"
    })
    .done(function() {
        UICtrl.clearElement(itemID);
    })
    .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });


}
var updateData = function() {

    var input;

    input = UICtrl.getUpdateInput();   

     var updateData = {
        id: input.id,
        city: input.city, 
        street: input.street, 
        property: input.property, 
        apartment: input.apartment, 
        price: input.price, 
        type: input.type, 
        description: input.description
     }

     var itemID = updateData.id;

    console.log(updateData);

    $.ajax({
        async: false,
        method: 'POST',
        contentType: 'aplication/json',
        dataType: 'json',
        url: "https://alfa.propertygrouppoland.pl/q/natalianalepa/update/"  + itemID + "",
        data: JSON.stringify(updateData)
    })
    .done(function() {
       UICtrl.clearRows();
       initTable();
    })
    .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
};
var ctrlUpdateItem = function() {
    var itemID;
        
    itemID = event.target.parentNode.parentNode.id;

    $.ajax({
        url :  "https://alfa.propertygrouppoland.pl/q/natalianalepa/get/" + itemID + "",
        dataType : "json"
    })
    .done(res => UICtrl.popup(res, updateData))
    .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

}

return {
    init: function() {
        console.log('Application has started.');
        initTable();
        setupEventListeners();
    }
    
};

})(UIController);
    
    
controller.init();
    
     
     
    