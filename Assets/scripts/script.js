let score = 0
let current = 0
let time = 20
let timer
let questions = [
  {
    question: 'Which HTML element is used to specify a header for a document or section?',
    choices: ['header', 'section', 'head'],
    answer: 'header'
  },
  {
    question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
    choices: ['title', 'src', 'alt'],
    answer: 'alt'
  },
  {
    question: 'What is the correct HTML for inserting a background image?',
    choices: [
      'background img="background.gif"',
       'body bg="background.gif"',
        'body style="background-image:url(background.gif)"'
    ],
    answer: 'body style="background-image:url(background.gif)"'
  },
  {
    question: 'How can you make a bulleted list?',
    choices: ['ul', 'list', 'ol'],
    answer: 'ul'
  },
  {
    question: 'Choose the correct HTML element to define emphasized text',
    choices: ['i', 'italic', 'em'],
    answer: 'em'
  },
]

const verbal = score =>{
  if (score < 2){
    return (';   You really need to study! Please try again MUCH later.')
  }else if (score < 4){
    return (';   You did just "okay" kid. Probably could try again.')
  }else{
    return(';   Good job Genius!')
  }
}
 
const endGame = () => {
  document.getElementById('question').innerHTML = ''
  document.getElementById('result').textContent = `
  Score: ${score}
  ${verbal(score)}
  `
  document.getElementById('scoreForm').className = ''
}
const renderQuestion = () => {
  document.getElementById('question').innerHTML = ''
  let qElem = document.createElement('div')
  qElem.innerHTML =`
          <h3>Question: ${questions[current].question}</h3>
          <ul class="list-group">
            <li 
            class="list-group-item choice"
            data-value="${questions[current].choices[0]}">
              ${questions[current].choices[0]}
            </li>
            <li 
            class="list-group-item choice"
            data-value="${questions[current].choices[1]}">
              ${questions[current].choices[1]}
            </li>
            <li 
            class="list-group-item choice"
            data-value="${questions[current].choices[2]}">
              ${questions[current].choices[2]}
            </li>
          </ul>
        `
  document.getElementById('question').append(qElem)
}
document.getElementById('startQuiz').addEventListener('click', () => {
  document.getElementById('startQuiz').remove()
  timer = setInterval(() => {
    document.getElementById('time').textContent = `Time Left: ${time}`
    time--
    if (time < 0) {
      endGame()
      clearInterval(timer)
    }
  }, 1000)
  renderQuestion()
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value === questions[current].answer) {
      score++
    }
    current++

    if (current >= questions.length) {
      endGame()
      clearInterval(timer)
    } else {
      renderQuestion()
    }
  }
})

document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  let initials = document.getElementById('initials').value
  let scores = JSON.parse(localStorage.getItem('scores')) || []
  scores.push({ initials, score })
  localStorage.setItem('scores', JSON.stringify(scores))

  scores.sort((a, b) => b.score - a.score)

  let tableElem = document.createElement('table')
  tableElem.className = 'table'
  tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Initials</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      `
  let tableBody = document.createElement('tbody')

  for (let i = 0; i < scores.length; i++) {
    tableBody.innerHTML += `
          <tr>
            <td>${scores[i].initials}</td>
            <td>${scores[i].score}</td>
          </tr>
        `
  }

  tableElem.append(tableBody)
  document.getElementById('question').append(tableElem)
  document.getElementById('submitScore').disabled =true

  document.getElementById('reset').addEventListener('click', event=>{
    event.preventDefault()
    let clear = confirm('Are you sure you want to clear EVERYTHING?')
    if(clear){
      let scores = []
      tableElem.style.display= "none"
      localStorage.setItem('scores', JSON.stringify(scores))
    }else{
      return
    }
  })
})



document.getElementById('playAgain').addEventListener('click', event=> {
  window.location.reload(true)  
})

