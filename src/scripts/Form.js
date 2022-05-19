//Import getter functions
import { getTopics, getPenPals, sendLetter } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

//Create Form.js function that will be reponsible for populating html for form
export const Form = () => {

    // we will have to invoke GETTER functions for pen pal and topics
    const penPals = getPenPals()
    const topics = getTopics()
    let html = ""

    // use pen pals to make "Author" Dropdown
    html += AuthorHTMLBuilder(penPals)

    //Create textarea for letter content
    html += `<h2>Letter</h2>
    <textarea id="letterContentInput" name="letterContent" rows="10"></textArea>
    `
    // use topics to create topic radio buttons
    html += TopicsHTMLBuilder(topics)
    
    //and "Recipient" dropdown
    html += RecipientHTMLBuilder(penPals)
    
    //Create submit letter button, only submit once letter has text, recipeint and author have been selected 
    html += `<button id="sendLetter">Send Letter!</button>`

    return html
}

//function that builds html for author dropdown 
const AuthorHTMLBuilder = (penPals) => {
    let html = `
    <h2>Author</h2>
    <select class="dropdown" id="author-dropdown">
        <option value="0">Choose an author...</option>
    `
    const penPalsAuthorArray = penPals.map(
        penPal => {
            return `<option value="${penPal.id}">${penPal.name}</option>`
        }
    )
    html += penPalsAuthorArray.join(" ")
    html += "</select>"

    return html
}

//function that builds html for topic radio buttons
const TopicsHTMLBuilder = (topics) => {
    let html = `<h2>Topics</h2>
    <ul class="topicsButtonsList">
    `
    const topicButtonsArray = topics.map(
        topic => {
            return `<li>
            <input type="checkbox" name="topics" value="${topic.id}">${topic.name}
            </li>`
        }
    )
    
    html += topicButtonsArray.join(" ")
    html += "</ul>"

    return html
}

//function that builds html for recipient dropdown
const RecipientHTMLBuilder = (penPals) => {
    let html = `
    <div class="authorSelectDiv">
    <h2>Recipient</h2>
    <select class="dropdown" id="recipient-dropdown">
        <option value="0">Choose a recipient...</option>
    `
    const penPalsRecipientArray = penPals.map(
        penPal => {
            return `<option value="${penPal.id}">${penPal.name}</option>`
        }
    )
    html += penPalsRecipientArray.join(" ")
    html += "</select></div>"

    return html
}

//event listener to check for when someone hits submit button
mainContainer.addEventListener(
    "click",
    (clickEvent) => {
        if (clickEvent.target.id === "sendLetter") {
            //Grab current values of form...
            const authorId = parseInt(mainContainer.querySelector("#author-dropdown").value)
            const letterText = mainContainer.querySelector("#letterContentInput").value
            const recipientId = parseInt(mainContainer.querySelector("#recipient-dropdown").value)
            
            const topicIds = []
            const topicCheckBoxes = mainContainer.querySelectorAll('input[type=checkbox]:checked')
            topicCheckBoxes.forEach( checkBox => {
                topicIds.push(parseInt(checkBox.value))
            })

            /*
            if (mainContainer.querySelector("input[name=topics]:checked") !== null) {
                topicId = parseInt(mainContainer.querySelector("input[name=topics]:checked").value)
            }
            */
            //Check to see if all sections of form have been filled...
            if (authorId > 0 && letterText !== "" && topicIds.length > 0 && recipientId > 0) {
                
                
                //Add values to letter object...
                const letterObject = {
                    authorId: authorId,
                    recipientId: recipientId,
                    topicIds: topicIds,
                    letterContent: letterText,
                    dateSent: new Date().toDateString()
                }
                

                // invoke saveLetter function to add letterObject to API
                sendLetter(letterObject)
            } else {
                window.alert("PLEASE FILL OUT ENTIRE FORM BEFORE SENDING! We need that sweet sweet data from ya daddi")
            }
        }
    }
)
