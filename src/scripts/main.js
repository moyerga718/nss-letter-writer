import { Letter } from "./Letter.js"


const mainContainer = document.querySelector("#container")

const renderAllHTML = () => {
    //We'll also need to invoke Fetch functions here so html rerenders with updated data from API
    mainContainer.innerHTML = Letter()
}

renderAllHTML()

// We'll need to include an event listener that looks out for state changes - this will call renderAllHTML whenever state changes. 