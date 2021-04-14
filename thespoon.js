const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startthejourney() {
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
        return startthejourney()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Today is 1 Feb 2018. the digital asset market is collapsing massively. The current Bitcoin price is $10,000. What would you do?',
        options: [
            {
                text: 'Buy Bitcoin.',
                setState: { btcholder: true },
                nextText: 2
            },
            {
                text: 'Deposit to Bank.',
                nextText: 10
            }
        ]
    },
    {
        id: 2,
        text: 'Today is 1 April 2020. due to the COVID-19 pandemic, the digital asset market is collapsing massively again. The Bitcoin price is now $3,000 and you are losing 60% of your investment. What would you do?',
        options: [
            {
                text: 'Buy more Bitcoin',
                requiredState: (currentState) => currentState.btcholder,
                setState: { btcholder: false, buymore: true },
                nextText: 3
            },
            {
                text: 'HODL, just hold the current Bitcoin',
                requiredState: (currentState) => currentState.btcholder,
                setState: { btcholder: false, HODL: true },
                nextText: 3
            },
            {
                text: 'FUD is coming and this time it is real!',
                nextText: 11
            }
        ]
    },
    {
        id: 3,
        text: 'After one year, Bitcoin has been soared up +1500%. Elon Musk just tweeted "Bitcoin". \n' +
            'What would you do?',
        options: [
            {
                text: 'HODL to the end with Elon Musk!',
                nextText: 4
            },
            {
                text: 'Take profit and withdrawal some cash.',
                nextText: 6
            },
            {
                text: 'I am skeptical. I will take Short position this time!',
                nextText: 12
            }
        ]
    },
    {
        id: 4,
        text: 'Congrats! Your asset has been 10X! You are now a Platinum spoon!',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'You did a good job but Bitcoin has gone to the moon after you cashed out.\n' +
            'You are just a sliver spoon.',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Bitcoin has reached $61k All Time High. And now you can buy Tesla with Bitcoin. \n' +
            'You have another chance. ',
        options: [
            {
                text: 'HODL to the end with Elon Musk!',
                nextText: 7
            },
            {
                text: 'I had good enough. I am cashing out.',
                nextText: 5
            },
            {
                text: 'I am taking short this time!',
                nextText: 12
            }
        ]
    },
    {
        id: 7,
        text: 'The market is suddenly collapsing because \n' +
            'digital assets are highly correlated to risky asset mainly the SP500. You are down -30% from the peak. What is your action?',
        options: [
            {
                text: 'Sell them off. I am out.',
                nextText: 8
            },
            {
                text: 'Buy more. In Bitcoin we trust.',
                requiredState: (currentState) => currentState.buymore,
                nextText: 9
            }
        ]
    },
    {
        id: 8,
        text: 'You could have earned more but you closed your position on the dip ($50k) and now the Bitcoin is all time high! You are just a Silver spoon',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You have perfectly bought on the dip. Bitcoin has reached $64k, another record and now you have earned 30% more.\n' +
            'You are now a Platinum spoon!',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'You just earned 2% of interest. You are just a dirt spoon.',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You lost 70% of your asset. Now you are just a dirt spoon.',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: 'Ouch!....You lost some of your accumulated profit. Now you are just a gold spoon.',
        options: [
            {
                text: 'Start Again',
                nextText: -1
            }
        ]
    }
]

startthejourney()