function activateOperator(operatorId){

    let operator = document.getElementById(operatorId);

    if(!operator.classList.contains('active')){

        document.querySelectorAll('.operator').forEach(operator => {

            operator.classList.remove('active');
    
        });
    
        document.getElementById(operatorId).classList.add('active');

        switch(operatorId){

            case 'select-button':
                onSelect();
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