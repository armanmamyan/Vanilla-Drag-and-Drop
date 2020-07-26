// show uploaded photo
const getPhotoInput = document.querySelector('input#file');
const imageID = 'uploadedPhoto'

const showUploadedPhoto = (e) => {
    const photoInputWrapper = e.target.parentElement;

    const imagePlaceholder = photoInputWrapper.querySelector('.tasklist--custom-uploader');

    let image;

    if (imagePlaceholder) {
        photoInputWrapper.removeChild(imagePlaceholder);
    }


    if (!photoInputWrapper.children.namedItem(imageID)) {
        image = document.createElement('img');
        image.src = URL.createObjectURL(e.target.files[0]);
        image.alt = 'Item Name';
        image.id = imageID;
        photoInputWrapper.appendChild(image);
        return;
    }

    const getPreviousImage = photoInputWrapper.children.namedItem(imageID);
    getPreviousImage.src = URL.createObjectURL(e.target.files[0]);

}


getPhotoInput.addEventListener('change', showUploadedPhoto)



const createNewItem = (parent) => {

    //  Create Task List Row
    const listItemRow = document.createElement('div');
    listItemRow.classList.add('tasklist--item-row');
    listItemRow.draggable = 'true';


    listItemRow.addEventListener('dragstart', (e) => {
        listItemRow.classList.add('drag-start')
    });

    listItemRow.addEventListener('dragend', (e) => {
        listItemRow.classList.remove('drag-start')
    })
    //  List Item Checkbox Wrapper
    const listItemCheckbox = document.createElement('div');
    listItemCheckbox.className = 'tasklist--item-checkbox-wrapper tasklist--item-label';

    const tasklistCheckboxInput = document.createElement('input');
    tasklistCheckboxInput.type = 'checkbox';
    tasklistCheckboxInput.className = 'tasklis--item-checkbox';

    const taskListCustomCheckbox = document.createElement('div');
    taskListCustomCheckbox.className = 'tasklist--item-custom-checkbox';

    listItemCheckbox.appendChild(tasklistCheckboxInput);
    listItemCheckbox.appendChild(taskListCustomCheckbox);

    //  Photo Wrapper
    const photoWrapper = document.createElement('div');
    photoWrapper.className = 'tasklist--item-label tasklist--item-photo';

    const fileUpload = document.createElement('input');
    fileUpload.type = 'file';
    fileUpload.accept = 'image/*';
    fileUpload.name = 'image';
    fileUpload.id = 'file';
    fileUpload.className = 'tasklist--upload-image';
    fileUpload.addEventListener('change', showUploadedPhoto)

    const taskListPlaceholder = document.createElement('div');
    taskListPlaceholder.className = 'tasklist--custom-uploader';

    const taskListIcon = document.createElement('i');
    taskListIcon.className = 'fas fa-camera';

    taskListPlaceholder.appendChild(taskListIcon);

    photoWrapper.appendChild(fileUpload);
    photoWrapper.appendChild(taskListPlaceholder);


    // Name
    const listName = document.createElement('div');
    listName.className = 'tasklist--item-label tasklist--item-name';

    const listNameInput = document.createElement('input');
    listNameInput.className = 'tasklist--input';
    listNameInput.type = 'text';
    listNameInput.name = 'Item Name';


    listName.appendChild(listNameInput);

    // List Price
    const listPrice = document.createElement('div');
    listPrice.className = 'tasklist--item-label tasklist--item-price';

    const listPriceInput = document.createElement('input');
    listPriceInput.className = 'tasklist--input';
    listPriceInput.type = 'text';
    listPriceInput.name = 'price';

    const listPriceIcon = document.createElement('i');
    listPriceIcon.className = 'fas fa-dollar-sign';

    listPrice.appendChild(listPriceInput);
    listPrice.appendChild(listPriceIcon);

    // TaskList Switcher 1
    const switcher1 = document.createElement('div');
    switcher1.className = 'tasklist--item-label tasklist--item-is-in-stock';

    const switcher1Checkbox = document.createElement('div');
    switcher1Checkbox.className = 'tasklist--checkbox-wrapper';

    const switcher1CheckboxInput = document.createElement('input');
    switcher1CheckboxInput.id = 'checkbox1';
    switcher1CheckboxInput.type = 'checkbox';
    switcher1CheckboxInput.className = 'tasklist--checkbox-switch';

    const switcherCustomCheckbox1 = document.createElement('div');
    switcherCustomCheckbox1.className = 'tasklist--custom-checkbox';

    switcher1Checkbox.appendChild(switcher1CheckboxInput);
    switcher1Checkbox.appendChild(switcherCustomCheckbox1);
    switcher1.appendChild(switcher1Checkbox);

    // TaskList Switcher 2
    const switcher2 = document.createElement('div');
    switcher2.className = 'tasklist--item-label tasklist--item-subcategpry';

    const switcher2Checkbox = document.createElement('div');
    switcher2Checkbox.className = 'tasklist--checkbox-wrapper';

    const switcher2CheckboxInput = document.createElement('input');
    switcher2CheckboxInput.id = 'checkbox1';
    switcher2CheckboxInput.type = 'checkbox';
    switcher2CheckboxInput.className = 'tasklist--checkbox-switch';

    const switcherCustomCheckbox2 = document.createElement('div');
    switcherCustomCheckbox2.className = 'tasklist--custom-checkbox';

    switcher2Checkbox.appendChild(switcher2CheckboxInput);
    switcher2Checkbox.appendChild(switcherCustomCheckbox2);
    switcher2.appendChild(switcher2Checkbox);


    //  Bars
    const barsContainer = document.createElement('div');
    barsContainer.className = 'burger_bar_container';

    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('div');
        bar.className = 'bars';
        barsContainer.appendChild(bar);
    }


    listItemRow.appendChild(listItemCheckbox);
    listItemRow.appendChild(photoWrapper);
    listItemRow.appendChild(listName);
    listItemRow.appendChild(listPrice);
    listItemRow.appendChild(switcher1);
    listItemRow.appendChild(switcher2);
    listItemRow.appendChild(barsContainer);

    parent.appendChild(listItemRow);
}



const getItemsRow = document.querySelector('.tasklist--items-wrapper');
const addItemButton = document.querySelector('.add--new-button');

addItemButton.addEventListener('click', (e) => {
    e.preventDefault();
    createNewItem(getItemsRow);
})


const draggableRows = document.querySelectorAll('.tasklist--item-row');
const droppableContainer = document.querySelector('.tasklist--items-wrapper');

draggableRows.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('drag-start')
    });

    draggable.addEventListener('dragend', (e) => {
        draggable.classList.remove('drag-start')
    })
})


droppableContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(droppableContainer,e.clientY)
    const currentDraggable = document.querySelector('.drag-start');
    if(afterElement == null){
        droppableContainer.appendChild(currentDraggable)
    } else {
        droppableContainer.insertBefore(currentDraggable, afterElement)
    }
});


const getDragAfterElement = (container, yPosition) => {
    const getAllDraggableElements = [...container.querySelectorAll('.tasklist--item-row:not(.drag-start)')];

    // loop through the list and determine after which element cursor is
    return getAllDraggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = yPosition - box.top - box.height / 2; // if number is negative, it means we currently hovering element above that element

        if (offset < 0 && offset > closest.offset) {
            return {
                offset,
                element: child
            }
        } else {
            return closest
        }

        console.log(box);

    }, { offset: Number.NEGATIVE_INFINITY }).element;
}