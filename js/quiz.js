"use strict"

export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.numberOfQuestions = this.questions.length;
        this.score = 0;
        this.isCorrect = false;
        this.nextBtn = document.getElementById("next");
        this.nextBtn.addEventListener("click" , this.nextQuestion.bind(this));
        this.displayQuestion();
        document.getElementById("tryAgain").addEventListener("click" , this.tryAgain)
    }

    displayQuestion() {
        document.getElementById("question").innerHTML = `Q: ${this.questions[this.currentQuestion].question}`;
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("numberOfQuestions").innerHTML = this.numberOfQuestions;
        this.getAnswers();
    }


    getAnswers() {
        this.answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers];

        let currentIndex = this.answers.length,  randomIndex;

        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [this.answers[currentIndex], this.answers[randomIndex]] = [
            this.answers[randomIndex], this.answers[currentIndex]];
        }

        this.divs = ``;
        for(let i=0; i<this.answers.length; i++){
            this.divs +=`
            <div class="form-check">
    
                                <input class="form-check-input" type="radio" name="answer" id="answer${i}" value="${this.answers[i]}">
                                <label class="form-check-label" for="answer${i}">
                                ${this.answers[i]}
                                </label>
                            </div>`
        }
        document.getElementById("answers").innerHTML = this.divs;
    }

    nextQuestion(){
        this.checkAnswer();
      (this.isCorrect) ? $("#correct").fadeIn(500 , function(){
        $("#correct").fadeOut(500)
      }) : $("#wrong").fadeIn(500 , function(){
        $("#wrong").fadeOut(500)
      });
        this.currentQuestion++;
        if(this.currentQuestion < this.numberOfQuestions){
            this.displayQuestion();
        }
        else{
            this.finish()
        }

        
    }

    finish(){
        $("#quiz").fadeOut(500 , function(){
            $("#score").fadeIn(500);
        })

        document.getElementById("result").innerHTML = this.score;
    }

    checkAnswer(){
        this.userAnswer = document.getElementsByName("answer");
        if([...this.userAnswer].filter(el => el.checked)[0] != undefined){
            this.userAnswer = [...this.userAnswer].filter(el => el.checked)[0].value;
        
            this.correctAnswer = this.questions[this.currentQuestion].correct_answer;
            if(this.correctAnswer == this.userAnswer){
                this.score++
                this.isCorrect = true
            }
            else{
                this.isCorrect = false
            }
        }
        
    }

    tryAgain(){
        $("#score").fadeOut(500 , function(){
            $("#settings").fadeIn(500);
        })
    }
}