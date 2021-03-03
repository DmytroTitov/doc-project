import API from "./API.js";
import doc from "./VisitComponents.js";
import Card from "./Card.js";

function switchDocs(condition, card) {

    switch (condition) {
        case 'Кардиолог': {
            const doctorVisit = new doc.VisitCardiologist(card);
            const item = new Card(card, doctorVisit);
            item.render();
        }
            break

        case 'Терапевт': {
            const doctorVisit = new doc.VisitTherapist(card);
            const item = new Card(card, doctorVisit);
            item.render();
        }
            break

        case 'Стоматолог': {
            const doctorVisit = new doc.VisitDentist(card);
            const item = new Card(card, doctorVisit);
            item.render();
        }
            break

        default:
            alert('Врач не выбран!')
    }
}

function renderCards() {

    API.getCards().then(data => {
        const cardsText = document.querySelector('.cards__empty-text');

        if (data.length > 0) {
            cardsText.classList.add('hide');
            data.forEach(card => {
                switchDocs(card.doctor, card);
            })
        } else if (data.length === 0) {
            cardsText.classList.remove('hide');
        }
    });
}

export default {switchDocs, renderCards};


