"use strict"

import { Quiz } from "./quiz.js";

export class Settings {
    constructor() {
        this.questions;
        this.categoryInput = document.getElementById("category");
        this.numberInput = document.getElementById("number");
        this.difficultyInput = document.getElementsByName("difficulty");
        this.alert = document.getElementById("alert");
        this.startBtn = document.getElementById("start");
        this.startBtn.addEventListener("click", this.startQuiz.bind(this));
    }

    async startQuiz() {
        if (Array.from(this.difficultyInput).filter(el => el.checked).length == 1 && this.categoryInput.value != "Choose..."
            && this.numberInput.value != "") {
            this.category = this.categoryInput.value;
            this.amount = this.numberInput.value;
            this.defficulty = Array.from(this.difficultyInput).filter(el => el.checked)[0].value;
            this.questions = await this.fetchUrl(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.defficulty}`);
            this.alert.classList.add("d-none");
            $("#settings").fadeOut(500, function () {
                $("#quiz").fadeIn(500)
            })
            new Quiz(this.questions);
        }
        else {
            this.alert.classList.remove("d-none");
        }


    }

    async fetchUrl(Url) {
        let response = await fetch(Url);
        response = await response.json();
        return response.results;

    }


}


