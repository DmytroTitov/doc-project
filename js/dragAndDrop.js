export default function dragAndDrop() {

    const cardListElement = document.querySelector('.cards-wrapper');
    const cardsElements = document.querySelectorAll('.cards-item');

    cardsElements.forEach((cards) => {
        cards.draggable = true;
    })


    cardListElement.addEventListener('dragstart', (event) => {
        event.target.classList.add('selected');
    });

    cardListElement.addEventListener('dragend', (event) => {
        event.target.classList.remove('selected');
    });

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        return (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
    };


    cardListElement.addEventListener('dragover', (event) => {
        event.preventDefault();

        const activeElement = cardListElement.querySelector(`.selected`);
        const currentElement = event.target;

        const isMovable = activeElement !== currentElement &&
            currentElement.classList.contains('cards-item');

        if (!isMovable) {
            return;
        }

        const nextElement = getNextElement(event.clientY, currentElement);

        if (
            nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;


        }

        cardListElement.insertBefore(activeElement, nextElement);
    });
}
