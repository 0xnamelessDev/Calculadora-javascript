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
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        
        this.actualizarUI();
        
    }

    actualizarUI(){
        //Resetear los elementos de la interfaz gráfica
        this.operand1Element.textContent = this.operand1 + this.operator;
        this.operand2Element.textContent = this.operand2;
    }

    agregarNumero(num){
        //Comprobar que solo se pueda poner un punto para cifras decimales
        if(num=='.' && this.operand2.includes('.')) return;

        //Empleamos una estructura condicional para que no se mantenga el cero inicial en la interfaz
        if(this.operand2 == 0){
            this.operand2 = num;
        }
        else{
            //Se concatena el número seleccionado al operando 2
            this.operand2 = this.operand2.toString() + num;
        }

        this.actualizarUI();
    }

}

const operand1Element = document.querySelector(["[data-operand-1]"]);
const operand2Element = document.querySelector(["[data-operand-2]"]);
const clearButton = document.querySelector(["[data-clear-button]"]);
const numberButtons = document.querySelectorAll("[data-number]"); //Array que recoge todos los elementos de botón numérico

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