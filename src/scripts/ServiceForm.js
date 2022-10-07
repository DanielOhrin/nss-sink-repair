import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

document.addEventListener(
    "click",
    event => {
        if (event.target.id === "submitRequest") {
            // Get what the user types into the form fields
            const userDescription = document.querySelector("input[name='serviceDescription']").value
            const userAddress = document.querySelector("input[name='serviceAddress']").value
            const userBudget = document.querySelector("input[name='serviceBudget']").value
            const userDate = document.querySelector("input[name='serviceDate']").value

            // Make an object our of the user input
            const dataToSendToAPI = {
                description: userDescription,
                address: userAddress,
                budget: userBudget,
                neededBy: userDate
            }

            if (!Object.values(dataToSendToAPI).includes("")) {

                if (Object.keys(dataToSendToAPI).length === 4) {
                    // Send the data to the API for permanent storage
                    sendRequest(dataToSendToAPI)
                }
            }
        }
    }
)