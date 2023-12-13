const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
       button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a tight small space',
    options: [
      {
        text: 'look around',
        nextText: 2
      },
      {
        text: 'feel around',
        setState: {Lsus:true},
        nextText: 40
      }
    ]
  },
  {
    id:40,
    text:"You slice your hand on a poorly made latch. Shake off the pain and climb out you hiding spot! (Sus level Increased).",
    options:[
      {text:"Read Evil Letter",
      setState: {evil:true},
      nextText:39
      },
      {text: "Read Normal Letter",
      nextText:3}],
  },
  {
    id: 2,
    text: 'You barely see a latch in front of you and unhook the poorly made contraption and climb out your hiding spot.',
    options:[
      {text:"Read Evil Letter",
      setState: {evil:true},
      nextText:39
      },
      {text: "Read Normal Letter",
      nextText:3}]
  },
  {
    id:39,
    text: "You are tasked with killing the captain of this ship before it docks. Blend in and get the job done. - Pat",
    options:[{
      text: "pocket the note and head to the upper deck.",
      nextText:4
    }]
  },
  {
    id: 3,
    text: 'Hey that new restuarant opened up! you have to come try it with me. There is a ferry with some awful security that I know you can easily sneak onto and I know you love a good deal! See you soon- AL :)',
    options: [{
        text: 'Pocket the note and head to the upper deck',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'As soon as you reach the upper deck a woman approches you. "Hey... you are the one looking for the Captain right?"',
    options: [
      {
        text:"Yes I am actually",
        requiredState: (currentState) => currentState.evil,
        nextText: 5
      },
      {text: "(Lie)Um... No I'm just a regular crewmate!",
       nextText:5},
      {text: "(Truth) No I just snuck onto this ship to save money.",
      nextText: 100}
    ]
  },
  {
    id: 5,
    text: '"Oh good here are some tasks to keep you busy."She hands you a list of tasks to complete during the trip',
    options: [
      {
        text: 'Take the list',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'You have tasks! try not to get caught by the Captain!',
    options: [
      {
        text: 'Do Random Tasks',
        nextText: 7
      },
      {
        text:"Go lay down.",
        nextText:100
      }
    ]
  },
  {
    id: 7,
    text: 'You do good on some tasks terrible on others some people take notice."Hey... You do not belong here do you?"',
    options: [
      {
        text: 'What do you mean?',
        nextText: 8
      },
      {
        text: 'Huh? me?',
        nextText: 8
      },
    ]
  },
  {id: 100,
   text:"The Captain realizes you are a stowaway and puts you in sea jail.",
  options:[
    {text:"GAME OVER",
    nextText: -1}
  ]},
  {
    id: 8,
    text: '"Yeah the Captain has been notified. She wants to see you in her office." Well you have been found out. Time to see the Captain. You enter she quarters and so far seems pretty chill',
    options: [
      {
        text: 'Prepare to strike.',
        requiredState: (currentState) => currentState.evil,
        nextText: 9
      },
      {text: "Stand there and look nervous",
      nextText: 9}
    ]
  },
  {
    id: 9,
    text: 'The Captain looks you over."I did not see you board my ship."',
    options: [
      {
        text: "that's because you didn't!(you attack)",
        requiredState: (currentState) => currentState.evil,
        nextText: 10
      },
      {
        text:"Sorry I'm just trying to get to Lex.",
        nextText: 100
      },
      {
        text:"I just got this job!",
        requiredState: (currentState) => currentState.Lsus,
        nextText:11

      },
    ]
  },
  {
    id: 10,
    text: 'You somehow kill the Captain using brute strength Ew. Time to go',
    options: [
      {
        text: 'you leave the ship (WIN)',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'The Captain panics and thinks you actuall work here. "Oh my god this is what I get for not reading my emails. we will sort this out in Lex" Congratulations. The Captain is lazy',
    options: [
      {
        text: 'You wait till the ship docks and you slip out when no one is looking (WIN)',
        nextText: -1
      }
    ]
  }
]

startGame()