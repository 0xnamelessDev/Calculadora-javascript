//Para realizar la calculadora voy a emplear el paradigma de POO
class Calculator{

    //Constructor de la clase Calculator
    constructor(operand1Element, operand2Element){
        this.operand1Element = operand1Element;
        this.operand2Element = operand2Element;
        this.resetearVariables();
    }

    //Método para restaurar todos los valores a su estado inicial
    resetearVariables(){
        //Resetear los dos operandos y el operador
        this.operand1 = '0';    //Es el operando superior de menor tamaño
        this.operand2 = '0';    //Es el operando inferior de mayor tamaño
        this.operator = '';
        this.result = '';
        this.isOperationDone = false;
        this.isOperatorAsigned = false;
        this.showCompleteOperation = false;
        
        this.actualizarUI();
    }

    //Resetear los elementos de la interfaz gráfica
    actualizarUI(){
        
        if(this.showCompleteOperation){
            this.operand1Element.textContent = this.operand1 + this.operator + this.result + '=';
            
            this.showCompleteOperation = false;
        }
        else{
            this.operand1Element.textContent = this.operand1 + this.operator;
        }

        this.operand2Element.textContent = this.operand2;

        
    }

    agregarNumero(num){
        //Comprobar que solo se pueda poner un punto para cifras decimales
        if(num=='.' && this.operand2.includes('.')) return;

      
        if(this.isOperationDone){           //Ejecutar en caso de que se haya realizado previamente una operación
            this.operand1 = this.operand2;
            this.operand2 = num;
            this.isOperationDone = false;
        }  
        else if(this.isOperatorAsigned){
            this.operand2 = num;
            this.isOperatorAsigned = false;
        }
        else if(this.operand2 == '0' && num != '.'){             //Empleamos una estructura condicional para que no se mantenga el cero inicial en la interfaz
            this.operand2 = num;
        }
        else{
            this.operand2 = this.operand2.toString() + num;         //Se concatena el número seleccionado al operando 2
        }

        this.actualizarUI();
    }

    borrarNumero(){
        if(this.operand2 !== 0){
            this.operand2 = +this.operand2.toString().slice(0,-1);
            this.actualizarUI();
        }
        
    }

    asignarOperador(operator){
        this.operator = operator;
        this.operand1 = this.operand2;
        //this.operand2 = 0;
        this.isOperatorAsigned = this.isOperationDone == true? false : true;

        this.showCompleteOperation = false;

        this.actualizarUI();

    }

    resultado(){
        this.result = this.operand2;

        //En función del valor de la variable operator se determina el valor mostrado.
        switch(this.operator){
            case '+':
                this.operand2 = +this.operand1 + +this.operand2;
                break;
            case '-':
                this.operand2 = +this.operand1 - +this.operand2;
                break;
            case '*':
                this.operand2 = +this.operand1 * +this.operand2;
                break;
            case '/':
                this.operand2 = +this.operand2 != 0? +this.operand1 / +this.operand2 : "INFINITY";
                break;
            default:
                return;
        }
        this.isOperationDone = true;
        this.showCompleteOperation = true;

        this.actualizarUI();
    }
}

const operand1Element = document.querySelector("[data-operand-1]");
const operand2Element = document.querySelector("[data-operand-2]");
const clearButton = document.querySelector("[data-clear-button]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete-button]");
const numberButtons = document.querySelectorAll("[data-number]"); //Array que recoge todos los elementos de botón numérico
const operatorButtons = document.querySelectorAll("[data-operator]");  //Array que recoge todos los elementos de botón de operador

//Creamos el objeto calculator a partir de la clase Calculator
const calculadora = new Calculator(operand1Element, operand2Element);

clearButton.addEventListener("click", () =>{
    calculadora.resetearVariables();
});

//Como la variable numberButtons es un array, lo recorremos con un bucle foreach y mediante un eventListener determinamos el valor del botón pulsado
numberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculadora.agregarNumero(button.textContent);
    });
});

operatorButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculadora.asignarOperador(button.textContent);
    });
});

equalButton.addEventListener("click", () =>{
    calculadora.resultado();
});

deleteButton.addEventListener("click", ()=>{
    calculadora.borrarNumero();
});