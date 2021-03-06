import { Letter } from "./Letter.js"
import { fetchPenPals, fetchTopics, fetchLetters } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const renderAllHTML = () => {
    //We'll also need to invoke Fetch functions here so html rerenders with updated data from API
    fetchPenPals()
    .then(
        () => fetchTopics()
    )
    .then(
        () => fetchLetters()
    )
    .then(
        () => mainContainer.innerHTML = Letter()
    )
}

renderAllHTML()

// We'll need to include an event listener that looks out for state changes - this will call renderAllHTML whenever state changes. 

mainContainer.addEventListener(
    "stateChanged",
    stateChanged => {
        renderAllHTML()
    }
)