var g_itemList = []


window.onload = function() {
    document.getElementById('add_todo').onkeypress = function(ev) { return add_item_keypress(ev) };
}

/**
 * monitor the enter event on the input element
 * @param event 
 * @returns {Boolean} - false if get the enter, true otherwise
 */
function add_item_keypress(event) {
    var keyCode = null;
    if (event.which)
        keyCode = event.which;
    else if (event.keyCode)
        keyCode = event.keyCode;

    if (keyCode == 13) { //get enter
        var addItemInput = document.getElementById('add_todo');
        var content = addItemInput.value;
        if (content == '')
            return true;
        var newItem = {
            'id': Math.random().toString(20),
            'content': content,
            'finished': false,
        };
        //add item
        add_new_item(newItem);
        g_itemList.push(newItem);
        //clear content of input
        addItemInput.value = '';
        return false;
    }
    return true;
}

function change_to_editting(targetContainer) {
    targetContainer.classList.add('editting');
    var value = targetContainer.getElementsByClassName('item-show')[0].getElementsByClassName('item-content')[0].innerText;
    var itemEdit = targetContainer.getElementsByClassName('item-edit')[0]
    itemEdit.value = value;
}

function change_to_show(targetContainer) {
    targetContainer.classList.remove('editting');
    var value = targetContainer.getElementsByClassName('item-edit')[0].value;
    targetContainer.getElementsByClassName('item-show')[0].getElementsByClassName('item-content')[0].innerText = value;
}

function delete_item(targetContainer) {
    targetContainer.parentElement.removeChild(targetContainer);
}

/**
 * add a new item div to the item-list container
 * @param {string} content - the content of the new add item
 */
function add_new_item(newItem) {
    var itemList = document.getElementById('todo-list');

    var itemContainer = document.createElement('li');
    itemContainer.className = 'item-container'
    itemContainer.id = newItem.id;

    var itemShow = document.createElement('div');
    itemShow.className = 'item-show';

    var itemIcon = document.createElement('input');
    itemIcon.className = 'item-icon';
    itemIcon.type = 'checkbox';
    
    var itemContent = document.createElement('div');
    itemContent.className = 'item-content';
    itemContent.innerText = newItem.content;
    itemContent.addEventListener('dblclick', function(event) { //pc use double click
        var container = event.currentTarget.parentElement.parentElement;
        change_to_editting(container);
    }, false);

    var itemDeleteIcon = document.createElement('button');
    itemDeleteIcon.className = 'item-delete-icon'
    itemDeleteIcon.addEventListener('click', function(event) {
        var container = event.currentTarget.parentElement.parentElement;
        delete_item(container);
    }, false);

    var itemEdit = document.createElement('textarea');
    itemEdit.className = 'item-edit';
    itemEdit.addEventListener('blur', function(event) {
        var container = event.currentTarget.parentElement;
        change_to_show(container);
    }, false);

    itemShow.appendChild(itemIcon);
    itemShow.appendChild(itemContent);
    itemShow.appendChild(itemDeleteIcon);

    itemContainer.appendChild(itemShow);
    itemContainer.appendChild(itemEdit);

    itemList.appendChild(itemContainer);
}