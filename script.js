const questions =[
    {
        question: "What is the capital of Bayelsa?",
        answers: [
            {text:"Ondo", correct: false},
            {text: "Delta", correct: false},
            {text: "Imo", correct: false},
            {text: "Yenogoa", correct:true}    
    ]
    },
    {
        question: "What is the capital of Imo?",
        answers: [
            {text:"Ondo", correct: false},
            {text: "Delta", correct: false},
            {text: "Owerri", correct: true},
            {text: "Yenogoa", correct:false}    
    ]
    },
    {
        question: "What is the capital of Delta?",
        answers: [
            {text:"Ondo", correct: false},
            {text: "Asaba", correct: true},
            {text: "Imo", correct: false},
            {text: "Yenogoa", correct:false}    
    ]
    },
    {
        question: "What is the capital of Lagos?",
        answers: [
            {text:"Ikeja", correct: true},
            {text: "Ondo", correct: false},
            {text: "Imo", correct: false},
            {text: "Yenogoa", correct:false}    
    ]
    }
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//to start the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
//select the first question and put number 1
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
//create the buttons and append answer text from the array
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //to add the correct value from the question dataset
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
         button.addEventListener('click', selectAnswer)       
    });
}
//to return back to original state and remove previous selections
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//to make button work, check if answer is true, give class correct and disable buttons
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    //disable buttons after a selection
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block'
}
//to show player score and next button display play again
function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}
//when you click next button, it should show next question else show score
function handlenextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}
//to show next question
nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length) {
         handlenextButton()
    }else{
        startQuiz();
    }
})
startQuiz();

