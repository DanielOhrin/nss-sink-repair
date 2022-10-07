import { getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"

const SelectPlumbers = (request) => {
    const completions = getCompletions()
    const plumbers = getPlumbers()



    return `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>`
}

const requestToHTML = (request) => {

    return `<li><strong>$${request.budget}</strong> ${request.description} ${request.address} by ${request.neededBy}.
    ${SelectPlumbers(request)}
    <button id="delete--${request.id}">Delete</button></li>`
}

const sortRequests = () => {
    const requests = getRequests()
    const completions = getCompletions()

    const completedRequests = completions.map(completion => {
        const completedRequest = requests.find(request => request.id === completion.requestId)
        requests.splice(requests.indexOf(completedRequest), 1)
        return completedRequest
    })

    return [completedRequests, requests.sort((a, b) => sortMethod(a, b))]
}

const sortMethod = (a, b) => {
    const completions = getCompletions()

    const matchingA = completions.find(completion => completion.requestId === a.id)
    const matchingB = completions.find(completion => completion.requestId === b.id)

    return (matchingA && matchingB) ? 0 : matchingA ? -1 : 1
}

export const Requests = () => {
    const [completedRequests, requests] = sortRequests()

    let html = `
        <ul>
            ${requests.map(requestToHTML).join("")
        }
    `

    html += completedRequests.map(request => {
        return `<li><strong>$${request.budget}</strong> ${request.description} ${request.address} by ${request.neededBy}.
            <button id="delete--${request.id}">Delete</button></li>`
    }).join("")

    return html += `</ul>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    event => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                    1. requestId
                    2. plumberId
                    3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }

            //     Invoke the function that performs the POST request to the "completions" resource for your API. Send the completion object as a parameter.
            saveCompletion(completion)
        }
    }
)