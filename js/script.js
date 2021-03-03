import Form from './Form.js';
import Modal from './Modal.js';

const btnRef = document.querySelector('#open-btn');

btnRef.addEventListener('click', (e) => {

    if (btnRef.textContent === "Вход") {
        const authForm = new Form.AuthForm('Подтвердить', 'login-form');
        const modal = new Modal(authForm, 'Добро пожаловать!');
        modal.open();

    } else {
        const visitForm = new Form.VisitForm('Создать', 'visit-form');
        const modal = new Modal(visitForm, 'Создайте карту!');
        modal.open();
    }
});





