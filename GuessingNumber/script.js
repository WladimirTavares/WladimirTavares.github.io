let text = document.getElementById("txt");
let submitBtn = document.getElementById("submit");
let secretNumber = Math.floor(Math.random() * 100) + 1;
let textarea = document.getElementById('myTextarea')


submitBtn.addEventListener("click", () => {
  
  valor = text.value
  
  if (valor > secretNumber){
    textarea.value += valor + ' é maior que o secreto\n';
  }else { 
    if (valor < secretNumber){
      textarea.value += valor + ' é menor que o secreto\n';
    }else{
        textarea.value += 'Parabéns!!Você acertou!!';
        secretNumber = Math.floor(Math.random() * 100);
    }
  }  
});


