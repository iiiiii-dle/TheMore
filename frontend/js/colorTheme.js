import { Calendar, ExpensesBox, ExpenseAdd } from "../js/account.js";

document.addEventListener('DOMContentLoaded', () => {
    

    const circleButtons = document.querySelectorAll('.circle');
    function handleButtonClick(event) {
        const clickedButton = event.target;

        document.querySelectorAll('.clicked').forEach((button) => {
            button.classList.remove('clicked');
        });

        clickedButton.classList.add('clicked');
    }

    circleButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
    });

    circleButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
})