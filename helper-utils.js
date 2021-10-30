function activateOperator(operatorId){

    let operator = document.getElementById(operatorId);

    closeDropdown();

    if(!operator.classList.contains('active')){

        document.querySelectorAll('.operator').forEach(operator => {

            operator.classList.remove('active');
    
        });
    
        document.getElementById(operatorId).classList.add('active');

        switch(operatorId){

            case 'select-button':
                onSelect();
                break;

            case 'comment-button':
                onSelect();
                openDropdown('comment');
                break;

            case 'review-button':
                onSelect();
                openDropdown('review');
                break;

            case 'report-button':
                onSelect();
                openDropdown('report');
                break;

            case 'settings-button':
                onSelect();
                openDropdown('settings');
                break;
        }
    }else{

        operator.classList.remove('active');

        switch(operatorId){

            case 'select-button':
                onDeselect();
                break;
        }

    }

}

function openDropdown(dropItemId) {

    document.getElementById(dropItemId).classList.add('active');

}

function closeDropdown() {

    document.querySelectorAll('.extension .dropdown-item').forEach(operator => {

        operator.classList.remove('active');

    });
}