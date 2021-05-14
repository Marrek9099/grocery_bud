const form = document.querySelector('form');

const groceryList = document.querySelector('#groceryList');

const groceryInput = document.querySelector('input[type="text"');

const submitButton = document.querySelector('input[type="submit"]');

const editButtons = document.querySelectorAll('.fas-edit');

const deleteButtons = document.querySelectorAll('.fas-delete');

const clearItems = document.querySelector('.clearItems');

const notice = document.querySelector('.notice');


const submitErrorMsg = 'Please Enter Value';
const addMsg = 'Item Added To The List';
const editMsg = 'Value Changed';
const deleteMsg = 'Item Removed';
const deleteList = 'Empty List';

const changeNotice = (option, msg) => {
    if(option === 1){
        notice.classList.add('visibleGreenNotice');
        notice.innerText = msg;
        setTimeout( () => {
            notice.classList.remove('visibleGreenNotice')
        }, 1000);
    }
    else {
        notice.classList.add('visibleRedNotice');
        notice.innerText = msg;
        setTimeout( () => {
            notice.classList.remove('visibleRedNotice')
        }, 1000);
    }
}


clearItems.addEventListener('click', () => {
    groceryList.innerHTML = ' ';
    clearItems.classList.remove('visibleClearButton');
    changeNotice(2, deleteList);
});



const addGrocery = () => {
    clearItems.classList.add('visibleClearButton');
    changeNotice(1, addMsg);
    let iconContaier = document.createElement('div');
    let editIcon = document.createElement('i');
    let deleteIcon = document.createElement('i');
    editIcon.classList.add('fas');
    editIcon.classList.add('fa-edit');
    editIcon.addEventListener( 'click', function() {
       groceryInput.value = this.parentElement.parentElement.childNodes[0].data;       
       submitButton.value = '   Edit   ';
       form.onsubmit = e => {
                e.preventDefault();
                this.parentElement.parentElement.childNodes[0].data = groceryInput.value;
                groceryInput.value = '';
                submitButton.value = 'Submit';
                changeNotice(1,editMsg);
                form.onsubmit = e => {
                    e.preventDefault();
                    if(groceryInput.value && submitButton.value === 'Submit') {
                        addGrocery();
                        groceryInput.value = '';
                    }
                    else {
                        changeNotice(2, submitErrorMsg);
                    };        
                };
       };
    });
    deleteIcon.classList.add('fas');
    deleteIcon.classList.add('fa-trash');
    deleteIcon.addEventListener( 'click', function(){
        this.parentElement.parentElement.remove();
        changeNotice(2, deleteMsg);
        if (groceryList.childNodes.length === 1){
            clearItems.classList.remove('visibleClearButton');
        };
        if (submitButton.value === '   Edit   '){
            submitButton.value = 'Submit';
            groceryInput.value = '';
        };
    });
    let newGrocery = document.createElement('div');
    newGrocery.innerHTML = groceryInput.value;
    iconContaier.appendChild(editIcon);
    iconContaier.appendChild(deleteIcon);
    newGrocery.appendChild(iconContaier);
    groceryList.appendChild(newGrocery);
    
};

form.onsubmit = e => {
    e.preventDefault();
    if(groceryInput.value && submitButton.value === 'Submit') {
        addGrocery();
        groceryInput.value = '';
    }
    else {
        changeNotice(2, submitErrorMsg);
    };    
};

