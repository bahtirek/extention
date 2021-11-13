/** 
 * It is called on extension (page) load to add a click
 * event listener to each operator button. The click event will call the 
 * activateOperator() that uses the switch case to perform various tasks.
 */
function setButtonListeners(){
    document.querySelectorAll('.ui-br-ext-operator').forEach(operator => {
        operator.addEventListener('click', function () {
            activateOperator(operator.id, operator.classList)
        })

    });
}

/**
 * It is used to set the corresponding class to the operator
 * buttons. If button is inactive, all other operators switch to inactive state,
 * only the clicked button remains active. If clicked button is active,
 * all operator switch to inactive state, including the clicked operator button.
 * @param {The ID of the clicked operator button} operatorId 
 */
function setOperatorIconStyle(operatorId, operatorClassList){

    let operator = document.getElementById(operatorId);

    let buttonActive = false;

    if(!operatorClassList.contains('ui-br-ext-active')){

        document.querySelectorAll('.ui-br-ext-operator').forEach(operator => {

            operator.classList.remove('ui-br-ext-active');
    
        });
    
        operator.classList.add('ui-br-ext-active');

        buttonActive = true;

    }else{

        operator.classList.remove('ui-br-ext-active');

        buttonActive = false;

    }

    return buttonActive;

}

/**
 * It is used to reset any active operator processes such as 
 * displayed drop down for comment box.
 */
function resetAllOperators(){

    onDeselect();

    closeDropdown();

}

/**
 * It plays the role of activator function for each operator button.
 * It gets added as "click" event listener on extension load.
 * The switch case performs variouls logical tasks based on the operator button's ID.
 * @param {The ID of the clicked operator button} operatorId 
 * @param {The ClassList of the clicked operator button} operatorClassList 
 */
function activateOperator(operatorId, operatorClassList){

    const currentActiveOperator = document.getElementsByClassName('ui-br-ext-active')[0]

    /**
     * Resetting all operators before switching between operators.
     * The selected element should remain selected when the "Report bug" button is clicked.
     */
    if(currentActiveOperator?.id !== 'ui-br-ext-select-button'){
        resetAllOperators();
    }else if(currentActiveOperator?.id === 'ui-br-ext-select-button' 
            && operatorId === 'ui-br-ext-select-button'){
        resetAllOperators();
    }else if(currentActiveOperator?.id === 'ui-br-ext-select-button' 
            && operatorId !== 'ui-br-ext-report-bug-button'){
        resetAllOperators();
    }
    

    if(setOperatorIconStyle(operatorId, operatorClassList)){

        switch(operatorId){

            case 'ui-br-ext-select-button':
                onSelect();
                break;

            case 'ui-br-ext-report-bug-button':
                openDropdown('ui-br-ext-report-bug');
                saveReportButtonInit();
                break;

            case 'ui-br-ext-view-bug-button':
                openDropdown('ui-br-ext-view-bug');
                break;

            case 'ui-br-ext-comments-button':
                openDropdown('ui-br-ext-comments');
                break;

            case 'ui-br-ext-export-button':
                openDropdown('ui-br-ext-export');
                savePdfBtnInit();
                break;

            case 'ui-br-ext-settings-button':
                openDropdown('ui-br-ext-settings');
                break;

            case 'ui-br-ext-close-button':
                hideExtention();
                break;
        }
    }else{
    }   
}

function openDropdown(dropItemId) {

    document.getElementById(dropItemId).classList.add('ui-br-ext-active');

}

function closeDropdown() {

    document.querySelectorAll('.ui-br-ext-extention .ui-br-ext-dropdown-item').forEach(operator => {

        operator.classList.remove('ui-br-ext-active');

    });
}