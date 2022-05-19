//This module will be responsible for displaying letters beneath the form!

import { getLetters, getPenPals, getTopics } from "./dataAccess.js"

export const DisplayLetters = () => {
    // so....
    // for each object in getLetters, I want to make a new div that has...

    // "Dear RECIPIENT NAME (recipient email)" on first line
    // "letter text" below this
    // "Sincerely, AUTHOR NAME (author email)" below that
    // "Sent on DATE"
    // cute lil div with topic in it

    const letters = getLetters()

    let html = "<h2>Letters</h2>"

    if (letters.length === 0) {
        html += "<h3>No letters written yet :( sawwy</h3>"
    } else {
        const allLettersHTML = letters.map(
            letter => {
                return letterBuilder(letter)
            }
        )

        html += allLettersHTML.join("")
    }

    return html
}

const letterBuilder = (letterObj) => {
    const [authorName,authorEmail] = authorFinder(letterObj)
    const [recipientName,recipientEmail] = recipientFinder(letterObj)

    let html = `<div class="sentLetterDiv">
    <p><b>Dear ${recipientName}, (${recipientEmail})</b></p>
    <p>${letterObj.letterContent}</p>
    <p><b>Sincerely, ${authorName} (${authorEmail})</b></p>
    <p>Sent on ${letterObj.dateSent}
    <div class="topic-section">
        ${topicBuilder(letterObj)}
    </div>
    </div>
    `
    return html
}

const authorFinder = (letterObj) => {
    const penPals = getPenPals()
    const authorObj = penPals.find( penPal => penPal.id === letterObj.authorId )
    return [authorObj.name,authorObj.email]
}

const recipientFinder = (letterObj) => {
    const penPals = getPenPals()
    const recipientObj = penPals.find( penPal => penPal.id === letterObj.recipientId )
    return [recipientObj.name,recipientObj.email]
}

const topicFinder = (topicId,topics) => {
    const topicObj = topics.find( topic => topic.id === topicId)
    return topicObj.name
}

const topicBuilder = (letterObj) => {

    const topics = getTopics()
    const topicNames = letterObj.topicIds.map(
        topicId => {
            return topicFinder(topicId,topics)
        }
    )

    const topicHTMLArray = topicNames.map(
        topicName => {
            return `
            <div class="topic-div">
                <p><i>${topicName}</i></p>
            </div>`
        }
    )

    let html = topicHTMLArray.join(" ")

    return html
}

