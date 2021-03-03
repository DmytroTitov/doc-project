import Modal from "./Modal.js";
import API from "./API.js";
import Form from "./Form.js";
import dragAndDrop from "./dragAndDrop.js";

const cardsWrapper = document.querySelector('#cards-wrapper-js');
const emptyCardsText = document.querySelector('.cards__empty-text');

export default class Card {
    constructor(card, doctorVisit) {

        const {id, doctor, visitor} = card;

        this.card = card;

        this.container = document.querySelector('.cards-wrapper');
        this.doctorVisit = doctorVisit;

        this.elements = {

            cardContainer: document.createElement('div'),
            showMoreContainer: document.createElement('div'),
            showMoreItemsWrap: document.createElement('div'),
            cardFullName: document.createElement('p'),
            cardDoc: document.createElement('p'),
            cardShowMore: document.createElement('button'),

            cardOptionsContainer: document.createElement('div'),
            cardOptionsDefault: document.createElement('button'),
            cardOptionsWrapper: document.createElement('div'),
            cardEditOption: document.createElement('button'),
            cardDeleteOption: document.createElement('button'),

            cardDelete: document.createElement('button'),
        }

        this.elements.cardContainer.classList.add('cards-item');
        this.elements.showMoreContainer.classList.add('cards-btn-container');
        this.elements.cardFullName.classList.add('cards-item__name');
        this.elements.cardDoc.classList.add('cards-item__doctor');
        this.elements.cardShowMore.classList.add('cards-item__btn', 'show-btn');

        this.elements.cardOptionsContainer.classList.add('cards-item__dropdown');
        this.elements.cardOptionsDefault.classList.add('cards-item__btn', 'dropdown-btn');
        this.elements.cardOptionsWrapper.classList.add('cards-item__dropdown-wrapper');
        this.elements.cardEditOption.classList.add('cards-item__btn', 'dropdown-btn', 'dropdown-btn--edit');
        this.elements.cardDeleteOption.classList.add('cards-item__btn', 'dropdown-btn', 'dropdown-btn--delete');

        this.elements.cardDelete.classList.add('delete-btn');

        this.elements.cardFullName.textContent = `ФИО: ${visitor}`;
        this.elements.cardDoc.textContent = `Доктор: ${doctor}`;

        this.elements.cardShowMore.textContent = 'Показать больше';
        this.elements.cardOptionsDefault.textContent = 'Редактировать';

        // this.elements.cardOptionsEdit.name = 'type'
        // this.elements.cardOptionsDefault.textContent = 'Редактировать';
        // this.elements.cardOptionsDefault.value = 'none';
        // this.elements.cardOptionsDefault.hidden = true;

        this.elements.cardEditOption.textContent = 'Редактировать';
        // this.elements.cardEditOption.value = 'Редактировать';
        this.elements.cardDeleteOption.textContent = 'Удалить';
        // this.elements.cardDeleteOption.value = 'Удалить';


        this.elements.cardShowMore.addEventListener('click', () => {
            this.elements.showMoreItemsWrap.classList.toggle('show');
        });

        this.elements.cardContainer.addEventListener('click', (e) => {

            if (e.target.classList.contains('dropdown-btn--delete')) {
                this.deleteCard(id);

            } else if (e.target.classList.contains('dropdown-btn--edit')) {
                this.editCard(this.card);
                this.deleteCardContainer();
            }
        })

        this.elements.cardDelete.addEventListener('click', () => {
            this.deleteCard(id);
        })
    }

    deleteCard(id) {
        API.changeCard(id, 'DELETE').then(r => {
            if (r.status === 200) {
                this.elements.cardContainer.remove()

                if (cardsWrapper.children.length === 0) {
                    emptyCardsText.classList.remove('hide');
                }

            } else {
                throw new Error("Что-то пошло не так")
            }
        })
    }

    deleteCardContainer() {
        this.elements.cardContainer.remove();
    }

    editCard(card) {
        const editForm = new Form.VisitEditForm('Редактировать', card);
        const modal = new Modal(editForm);
        modal.open();
    }

    render() {

        const {
            cardContainer,
            showMoreContainer,
            showMoreItemsWrap,
            cardFullName,
            cardDoc,
            cardShowMore,
            cardDelete,
            cardOptionsContainer,
            cardOptionsDefault,
            cardOptionsWrapper,
            cardEditOption,
            cardDeleteOption

        } = this.elements;

        this.doctorVisit.render(showMoreItemsWrap);
        showMoreContainer.append(cardShowMore, showMoreItemsWrap);

        showMoreItemsWrap.classList.add('hide');

        cardOptionsWrapper.append(cardEditOption, cardDeleteOption);
        cardOptionsContainer.append(cardOptionsDefault, cardOptionsWrapper);
        cardContainer.append(cardFullName, cardDoc, showMoreContainer, cardOptionsContainer, cardDelete);
        this.container.append(cardContainer);

        dragAndDrop()
    }
}

