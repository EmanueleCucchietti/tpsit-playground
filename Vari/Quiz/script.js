window.onload = function(){

    let wrapper = document.getElementById("wrapper")

    let dataQuiz = [
        {
            question: "quanti anni ha eleonora",
            answers: [49, 20, 16, 17],
            correctAnswer: 16
        },
        {
            question: "linguaggio scritto in minecraft",
            answers: ["C", "Java", "C++", "Python"],
            correctAnswer: "Java"
        },
        {
            question: "quante visioni ha eleonora",
            answers: [400, 220, 163, 127],
            correctAnswer: 400
        }
    ]
    
    let quizIndex = 0;
    let correctIndex = 0;
    let finished = false;
    let contCorrette = 0;
    
    caricaDomanda();

    function caricaDomanda(){
        wrapper.innerHTML = "";
        //carica domanda
        let questionContainer = document.createElement("div");
        questionContainer.innerHTML = dataQuiz[quizIndex].question;
        questionContainer.classList.add("questionContainer");
        wrapper.appendChild(questionContainer);

        //carica Risposte
        let divCheckBoxes = document.createElement("div");
        divCheckBoxes.classList.add("checkboxes");
        wrapper.appendChild(divCheckBoxes);
        let ul = document.createElement("ul");
        divCheckBoxes.appendChild(ul);

        let i=0;
        let indexChecked = 0;
        for (const answ of dataQuiz[quizIndex].answers) {
            let li = document.createElement("li")
            
            li.classList.add("li-element-checkbox");
            li.id = "lblParent"+ i;
            ul.appendChild(li);
            console.log(li)
            let input = document.createElement("input");
            if(i == 0){                
                input.checked = true;
                indexChecked = input.id.slice(3);
            }
            input.type = "radio";
            input.id = "ans"+ i;
            input.name = "answer";
            input.classList.add("answer");
            input.addEventListener("click",function(){
                selezionataCheck(li,input);
            })
            li.appendChild(input);

            let label = document.createElement("label");
            label.for= "ans"+ i;
            label.classList.add("textCheckboxes");
            label.id = "ans" + i;
            label.innerHTML = " " + dataQuiz[quizIndex].answers[i];
            li.appendChild(label);

            i++;
        }

        let btnInvia = document.createElement("button");
        btnInvia.id = "btnSubmit";
        btnInvia.innerHTML = "Submit";
        btnInvia.addEventListener("click",inviaDomanda);
        wrapper.appendChild(btnInvia);
    }

    function selezionataCheck(li,input){
        indexChecked = input.id.slice(3);
        alert(indexChecked);
        for(let i=0;i<4;i++){
            let lbl = document.getElementById("lblParent"+ i);
            lbl.style.borderBottom = "2px solid green";
        }
        li.style.borderBottom= "2px solid red";
    }

    function inviaDomanda(){
        if(quizIndex != dataQuiz.length-1){
            if(dataQuiz[quizIndex].correctAnswer == dataQuiz[quizIndex].answers[indexChecked])
                contCorrette++;
            quizIndex++;
            caricaDomanda();
        }
        else{
            let btn = document.getElementById("btnSubmit");
            btn.disabled = true;
            alert("Il numero di risposte Corrette è "+contCorrette + "/"+dataQuiz.length);
        }
    }
    
    /*
    submitBtn.addEventListener("click", e => {
        if(finished == false){
            let answer = getSelected()
    
            if(answer == undefined){
                questionContainer.innerHTML += "<br><strong>Seleziona un bottone</strong>"
            } else{
                if(dataQuiz[quizIndex].correctAnswer == dataQuiz[quizIndex].answers[answer]){
                    correctIndex++
                }
                quizIndex++
                loadQuiz()
            }
        } else {
            quizIndex = 0
            correctIndex = 0
            finished = false
            submitBtn.innerHTML = "Submit"
            Array.from(document.getElementsByClassName("li-element-checkbox")).forEach(elem => {
                elem.style.display = "list-item"
            })
            loadQuiz()
        }
    })*/
}