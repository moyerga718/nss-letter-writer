const applicationState = {

}

const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

//Here we need to make fetch functions for Topics ,penPals, and letters, store this data in Application State

export const fetchPenPals = () => {
    return fetch(`${API}/penPals`)
    .then(response => response.json())
    .then (
        (penPals) => {
            applicationState.penPals = penPals
        }
    )
}

export const fetchTopics = () => {
    //use fetch on url/topics
    return fetch(`${API}/topics`)
    .then(response => response.json())
    .then(
        (topics) => {
            //store topics data in application state.
            applicationState.topics = topics
        }
    )
}

export const fetchLetters = () => {
    //use fetch on url/topics
    return fetch(`${API}/sentLetters`)
    .then(response => response.json())
    .then(
        (letters) => {
            //store topics data in application state.
            applicationState.sentLetters = letters
        }
    )
}


//Then we need to make getter functions to grab a copy of the data from application state, export it to Form.js

export const getPenPals = () => {
    return applicationState.penPals.map( 
        (p) => ({...p})
    )
}

export const getTopics = () => {
    return applicationState.topics.map(
        (topic) => ({...topic})
    )
}

export const getLetters = () => {
    return applicationState.sentLetters.map(
        (letter) => ({...letter})
    )
}

//We need a sendLetter function to add data from letter form to api.

export const sendLetter = (letterObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(letterObj)
    }

    return fetch(`${API}/sentLetters`, fetchOptions)
        .then( response => response.json())
        .then( () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}