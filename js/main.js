'use strict';

$(document).ready(function () {

    $("#addBtn").on('click', addElement);
    //Apartado 2: Enlazamos a la caja de texto un método keyup
    $("#itemToAdd").on('keyup', disableElement);

    let shoppingList = new MyList();
    let removedList = new MyList();

    function addElement(e) {
        if(document.getElementById("uvus") != null || document.getElementById("uvus") != 'undefined'){
            document.getElementById("uvus").style.display="none";
        }
        
        if(shoppingList.items.includes($('#itemToAdd').val()) || removedList.items.includes($('#itemToAdd').val())){
           alert("Ya existe este elemento");
        } else{
            document.getElementById("addBtn").disabled = true;
            let text = $('#itemToAdd').val();
            shoppingList.addItem(text);
            refresh('#shoppingList',text, "Añadir");
            $('#itemToAdd').val('');
        }


    }


    /* Apartado 2: Hemos creado una función llamada "disableElement" que lo que hace es 
    si la longitud del texto que vamos a enviarle a la lista es cero, lo que va a usar es una función prop
    en la que deshabitilar el botón de añadir, y si el elemento no vale cero, lo que va a hacer es habilitar
    el botón de añadir dándole un valor false.
    
    Si estamos usando una versión muy anterior de JQUERY, tendremos que usar attr() que hace el mismo trabajo.*/
    function disableElement() {
        if ($('#itemToAdd').val().length == 0) {
            $('#addBtn').prop('disabled', true);
        } else {
            $('#addBtn').prop('disabled', false);
        }

    }

    function removeElement() {
        shoppingList.removeItem(event.target.id);
        let textValue = event.target.textContent;
        refresh('#shoppingList', textValue, "Eliminar");
        removedList.addItem(textValue);
        refresh('#removedList', textValue, "Añadir");

    }

    function restoreElement() {
        let textValue = event.target.innerText;
        removedList.removeItem(textValue);
        refresh('#removedList',textValue,"Eliminar");
        shoppingList.addItem(textValue);
        refresh('#shoppingList', textValue,"Añadir");
    }


    /* Apartado 3: Para poder optimizar la función refresh(), lo que hemos hecho es pasarle un parámetro 
    llamado "Action", en el que según la acción que le pasemos, va a añadir o eliminar de la lista.
    */
    function refresh(listName, textValue, Action) {
        // Creación lista
        let htmlList = listName == "#shoppingList" ?
            $('#shoppingList') : $('#removedList');

        
        let item = $('<li>', {
            'id': textValue,
            'text': textValue,
            'class': listName == "#shoppingList" ?
                'list-group-item list-group-item-info' :
                'list-group-item list-group-item-success'
        });

        if(Action == "Añadir"){
            // Si le añadimos la acción añadir
            htmlList.append(item);
        }

        else if(Action == "Eliminar"){
            //Si le hemos dado la funcion eliminar
            $("#"+textValue).remove();
        } 
        
        /* Apartado 1: En vez de usar un boton para poder eliminar y restaurar los elementos, le instalo esas funcionalidades
        al item que estoy creando, y a consecuencia de eso, ya no sería necesario esos botones*/
        item.on('click', listName == "#shoppingList" ? removeElement : restoreElement);
       
    }
});