import { Form } from "./Form.js"
import { DisplayLetters } from "./DisplayLetters.js"

export const Letter = () => {
    return `
    <section class="content-container">
        <header>
            <h1>Pen Pal Society</h1>
        </header>

        <section class="form-section">
            ${Form()}
        </section>

        <section class="display-letter-section">
            ${DisplayLetters()}
        </section>
    </section>

    `
}