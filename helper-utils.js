function setButtonListeners(){
    document.querySelectorAll('.ui-br-ext-operator').forEach(operator => {
        console.log(operator.id);
        operator.addEventListener('click', function () {
            activateOperator(operator.id)
        })

    });
}


function activateOperator(operatorId){

    let operator = document.getElementById(operatorId);

    closeDropdown();

    if(!operator.classList.contains('ui-br-ext-active')){

        document.querySelectorAll('.ui-br-ext-operator').forEach(operator => {

            operator.classList.remove('ui-br-ext-active');
    
        });
    
        document.getElementById(operatorId).classList.add('ui-br-ext-active');

        switch(operatorId){

            case 'ui-br-ext-select-button':
                onSelect();
                break;

            case 'ui-br-ext-comment-button':
                onSelect();
                openDropdown('ui-br-ext-comment');
                break;

            case 'ui-br-ext-review-button':
                onSelect();
                openDropdown('ui-br-ext-review');
                break;

            case 'ui-br-ext-report-button':
                onSelect();
                openDropdown('ui-br-ext-report');
                break;

            case 'ui-br-ext-settings-button':
                onSelect();
                openDropdown('ui-br-ext-settings');
                break;
        }
    }else{

        operator.classList.remove('ui-br-ext-active');

        switch(operatorId){

            case 'ui-br-ext-select-button':
                onDeselect();
                break;
        }

    }

}

function openDropdown(dropItemId) {

    document.getElementById(dropItemId).classList.add('ui-br-ext-active');

}

function closeDropdown() {

    document.querySelectorAll('.ui-br-ext-extension .ui-br-ext-dropdown-item').forEach(operator => {

        operator.classList.remove('ui-br-ext-active');

    });
}