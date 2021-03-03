import FormComponents from './FormComponents.js';
import API from './API.js';
import renderCards from "./cardRenderFunc.js";
import cardRenderFunc from "./cardRenderFunc.js";

function getDateTimeString() {
    const now = new Date()
    const yearNow = now.getFullYear();
    const monthNow = now.getMonth().toString().length > 1 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
    const dayNow = now.getDate().toString().length > 1 ? now.getDate() : `0${now.getDate()}`;
    const hourNow = now.getHours().toString().length > 1 ? now.getHours() : `0${now.getHours()}`;
    const minuteNow = now.getMinutes().toString().length > 1 ? now.getMinutes() : `0${now.getMinutes()}`
    const nowDateTimeString = `${yearNow}-${monthNow}-${dayNow}T${hourNow}:${minuteNow}`;
    return nowDateTimeString;
}

class Form {
    constructor(buttonText, formClass) {
        this.elements = {
            self: document.createElement('form'),
            submitBtn: document.createElement('button')
        }
        const {self, submitBtn} = this.elements
        submitBtn.textContent = buttonText
        submitBtn.type = 'submit'
        submitBtn.classList.add('login');
        this.elements.self.classList.add(formClass);
        self.addEventListener('submit', (ev) => {
            this.submitHandler(ev);
        })
        self.append(submitBtn)
    }

    submitHandler(ev) {
        ev.preventDefault()
        throw new Error('Submithandler not implemented')
    }

    render(parent) {

        parent.append(this.elements.self)
    }
}

class AuthForm extends Form {
    constructor(buttonText, formClass) {
        super(buttonText, formClass);
        this.elements = {
            ...this.elements,
            logInputWrap: document.createElement('div'),
            logInputImg: document.createElement('img'),
            logInput: new FormComponents.Input('text', ''),
            passInputWrap: document.createElement('div'),
            passInputImg: document.createElement('img'),
            passInput: new FormComponents.Input('password', '')
        }
        const {self, logInputWrap, logInputImg, logInput, passInputWrap, passInputImg, passInput} = this.elements
        logInput.elements.self.placeholder = 'Логин';
        passInput.elements.self.placeholder = 'Пароль';

        logInputWrap.classList.add('container-modal');
        logInputImg.src = './img/mail.svg';
        logInput.elements.self.classList.add('login-form-input', 'email');

        passInputWrap.classList.add('container-modal');
        passInputImg.src = './img/padlock.svg';
        passInput.elements.self.classList.add('login-form-input', 'pass');

        logInputWrap.append(logInputImg, logInput.elements.self);
        passInputWrap.append(passInputImg, passInput.elements.self);

        self.prepend(logInputWrap, passInputWrap)
    }

    submitHandler(e) {
        e.preventDefault();
        const email = this.elements.logInput.elements.self.value;
        const password = this.elements.passInput.elements.self.value;

        const modal = document.querySelector('.modal-wrap');
        const wrapper = document.querySelector('.wrapper');
        const openBtn = document.querySelector('#open-btn');

        API.auth({email, password})
            .then(response => {
                if (response.ok) {
                    response.text().then(token => {
                        const elements = {
                            aboutUs: document.querySelector('#about-js'),
                            services: document.querySelector('#services-js'),
                            footer: document.querySelector('#footer-js'),
                            filter: document.querySelector('#filter-js'),
                            headerContainer: document.querySelector('.header-container'),
                            quitBtn: document.createElement('button'),
                            cardsWrapper: document.querySelector('.cards'),
                            main: document.querySelector('main')
                        }


                        localStorage.setItem('token', token);
                        API.headersTemplate.Authorization = `Bearer ${token}`;
                        modal.remove();
                        wrapper.classList.remove('blur');
                        openBtn.textContent = "Cоздать визит";

                        elements.aboutUs.remove();
                        elements.services.remove();
                        elements.footer.remove();

                        elements.quitBtn.classList.add('btn');
                        elements.quitBtn.textContent = 'Выйти';
                        elements.headerContainer.append(elements.quitBtn);

                        elements.quitBtn.addEventListener('click', () => {

                            localStorage.removeItem('token');
                            window.location.reload();

                        })




                        new FilterForm('Найти', 'filter-form').render(elements.filter);

                        renderCards.renderCards();
                    })
                } else {
                    alert('Wrong login or password')
                }
            })
    }
}

class VisitForm extends Form {

    constructor(buttonText, formClass) {
        super(buttonText, formClass);
        this.elements = {
            ...this.elements,
            select: new FormComponents.Select(['Кардиолог', 'Стоматолог', 'Терапевт'], 'Выберите врача', 'doctor'),
            docFieldsWrap: document.createElement('div'),
        }

        const {self, select, docFieldsWrap, submitBtn} = this.elements;
        docFieldsWrap.className = 'doc-fields-wrap';
        select.elements.self.classList.add = 'doctor';
        self.prepend(select.elements.self);
        submitBtn.remove()

    }

    showDocOptions() {
        const docForm = document.querySelector('.doc-fields-wrap');
        const nowDateTimeString = getDateTimeString();

        if (docForm) {
            [...docForm.children].forEach(el => el.remove());
        }

        this.elements.submitBtn.disabled = false;
        this.elements.clientName = new FormComponents.Input('text', 'visitor');
        this.elements.visitorLabel = new FormComponents.Label('visitor', 'Посетитель');
        this.elements.visitAim = new FormComponents.TextArea('aim');
        this.elements.visitAimLabel = new FormComponents.Label('aim', 'Цель визита');
        this.elements.visitDescription = new FormComponents.TextArea('description');
        this.elements.visitDescLabel = new FormComponents.Label('description', 'Короткое описание визита');
        this.elements.visitUrgencyLabel = new FormComponents.Label('urgency', 'Выберите срочность визита')
        this.elements.visitUrgency = new FormComponents.Select(['Обычная', 'Приоритетная', 'Неотложная'], '', 'urgency');
        this.elements.visitDateLabel = new FormComponents.Label('visit-date', 'Дата и время визита');
        this.elements.visitDate = new FormComponents.Input('datetime-local', 'visit-date');
        this.elements.visitDate.elements.self.min = nowDateTimeString;
        const {
            docFieldsWrap,
            visitorLabel,
            clientName,
            visitAimLabel,
            visitAim,
            visitDescLabel,
            visitDescription,
            visitUrgencyLabel,
            visitUrgency,
            visitDateLabel,
            visitDate
        } = this.elements;

        docFieldsWrap.append(visitorLabel.elements.self, clientName.elements.self, visitAimLabel.elements.self, visitAim.elements.self, visitDescLabel.elements.self, visitDescription.elements.self, visitUrgencyLabel.elements.self, visitUrgency.elements.self, visitDateLabel.elements.self, visitDate.elements.self);

        switch (document.querySelector('select').value) {
            case 'Кардиолог': {
                this.elements.bloodPressure = new FormComponents.Input('text', 'blood-pressure');
                this.elements.bloodPressureLabel = new FormComponents.Label('blood-pressure', 'Давление')
                this.elements.bodyMassIndex = new FormComponents.Input('number', 'body-mass-index');
                this.elements.bodyMassIndexLabel = new FormComponents.Label('body-mass-index', 'Индекс массы тела')
                this.elements.cardioDiseases = new FormComponents.TextArea('cardio-diseases');
                this.elements.cardioDiseasesLabel = new FormComponents.Label('cardio-diseases', 'Перенесенные заболевания сердца/системы')
                this.elements.age = new FormComponents.Input('number', 'age');
                this.elements.age.elements.self.min = 0;
                this.elements.ageLabel = new FormComponents.Label('age', 'Возраст')
                const {
                    bloodPressureLabel,
                    bloodPressure,
                    bodyMassIndexLabel,
                    bodyMassIndex,
                    cardioDiseasesLabel,
                    cardioDiseases,
                    ageLabel,
                    age
                } = this.elements;
                cardioDiseases.elements.self.required = true;
                docFieldsWrap.append(bloodPressureLabel.elements.self, bloodPressure.elements.self, bodyMassIndexLabel.elements.self, bodyMassIndex.elements.self, cardioDiseasesLabel.elements.self, cardioDiseases.elements.self, ageLabel.elements.self, age.elements.self);
                break
            }
            case 'Стоматолог': {
                this.elements.lastVisitDate = new FormComponents.Input('datetime-local', 'last-visit');
                this.elements.lastVisitDate.elements.self.max = nowDateTimeString;
                this.elements.lastVisitDateLabel = new FormComponents.Label('last-visit', 'Дата последнего визита');
                docFieldsWrap.append(this.elements.lastVisitDateLabel.elements.self, this.elements.lastVisitDate.elements.self)
                break
            }
            case 'Терапевт': {
                this.elements.age = new FormComponents.Input('number', 'age');
                this.elements.agelabel = new FormComponents.Label('age', 'Возраст');
                this.elements.age.elements.self.min = 0;
                docFieldsWrap.append(this.elements.agelabel.elements.self, this.elements.age.elements.self);
                break
            }
        }
        this.elements.self.append(docFieldsWrap, this.elements.submitBtn);
    }

    render(parent) {
        this.elements.select.elements.self.addEventListener('change', this.showDocOptions.bind(this))
        super.render(parent);
    }

    submitHandler(ev) {
        ev.preventDefault()
        const modal = document.querySelector('.modal-wrap');
        const wrapper = document.querySelector('.wrapper');
        const formData = {};
        const doctor = this.elements.select.elements.self.value;

        const formFields = [...document.querySelector('.doc-fields-wrap').children];

        formFields.forEach(el => {
            formData[el.name] = el.value;
        });
        formData.doctor = doctor;

        API.addCard(formData).then(resp => {
            if (resp.ok) {
                resp.json()
                    .then(card => {
                        const cardsText = document.querySelector('.cards__empty-text');
                        cardsText.classList.add('hide');
                        renderCards.switchDocs(card.doctor, card);
                        modal.remove();
                        wrapper.classList.remove('blur');
                    })
            }
        })
    }
}

class FilterForm extends Form {
    constructor(buttonText, formClass) {
        super(buttonText, formClass);
        this.elements = {
            ...this.elements,
            textField: new FormComponents.Input('text', 'descriptionSearch'),
            textFieldLabel: new FormComponents.Label('descriptionSearch', 'Поиск по описанию:'),
            urgencyField: new FormComponents.Select(['Обычная', 'Приоритетная', 'Неотложная'], 'Поиск по срочности визита'),
            statusField: new FormComponents.Select(['Пройден', 'Ожидает'], 'Поиск по статусу визита')
        }

        this.elements.submitBtn.remove()

        for (let child of this.elements.urgencyField.elements.self.children) {
            child.disabled = false
        }
        for (let child of this.elements.statusField.elements.self.children) {
            child.disabled = false
        }
    }

    submitHandler(ev) {
        ev.preventDefault();
        [].forEach.call(document.querySelectorAll('.cards-item'), (e) => e.parentNode.removeChild(e)); // Dima
        const text = this.elements.textField.elements.self.value;
        const urgency = this.elements.urgencyField.elements.self.value;
        const status = this.elements.statusField.elements.self.value;

        API.getCards()
            .then(dataArr => {
                const filteredVisits = dataArr.filter(visitInfo => {
                    const visitDateTimeString = visitInfo["visit-date"];
                    const visitYear = visitDateTimeString.substring(0, 4);
                    const visitMonth = visitDateTimeString.substring(5, 7);
                    const visitDay = visitDateTimeString.substring(8, 10);
                    const visitHour = visitDateTimeString.substring(11, 13);
                    const visitMinute = visitDateTimeString.substring(14);

                    const nowDateTime = new Date().getTime();
                    const visitDateTime = new Date(visitYear, visitMonth - 1, visitDay, visitHour, visitMinute).getTime();

                    const textCondition = text === '' ? true : (visitInfo.description).toLowerCase().search(text.toLowerCase()) !== -1;
                    const urgencyCondition = urgency === 'Поиск по срочности визита' ? true : urgency === visitInfo.urgency;
                    let statusCondition = false;

                    if ((status === 'Поиск по статусу визита') || (status === 'Ожидает' && nowDateTime < visitDateTime) || (status === 'Пройден' && nowDateTime > visitDateTime)) {
                        statusCondition = true
                    }

                    if (textCondition && urgencyCondition && statusCondition) {
                        return true
                    }
                })

                filteredVisits.forEach((visitInfo) => {
                    renderCards.switchDocs(visitInfo.doctor, visitInfo)
                })
            })
    }

    render(parent) {
        const {self, textField, textFieldLabel, urgencyField, statusField} = this.elements;
        textField.elements.self.addEventListener('input', this.submitHandler.bind(this));
        urgencyField.elements.self.addEventListener('change', this.submitHandler.bind(this));
        statusField.elements.self.addEventListener('change', this.submitHandler.bind(this));

        self.append(textFieldLabel.elements.self, textField.elements.self, urgencyField.elements.self, statusField.elements.self);

        super.render(parent);
    }

}

class VisitEditForm extends Form {
    constructor(buttonText, card) {
        super(buttonText);
        this.card = card
        this.elements = {
            ...this.elements,
            docFieldsWrap: document.createElement('div'),
            clientName: new FormComponents.Input('text', 'visitor', this.card.visitor),
            visitorLabel: new FormComponents.Label('visitor', 'Посетитель'),
            visitAim: new FormComponents.TextArea('aim', this.card.aim),
            visitAimLabel: new FormComponents.Label('visitAim', 'Цель визита'),
            visitDescription: new FormComponents.TextArea('description', this.card.description),
            visitDescLabel: new FormComponents.Label('visitDesc', 'Короткое описание визита'),
            visitUrgency: new FormComponents.Select(['Обычная', 'Приоритетная', 'Неотложная'], '', 'urgency'),
            visitUrgencyLabel: new FormComponents.Label('urgency', 'Выберите срочность визита'),
            visitDateField: new FormComponents.Input('datetime-local', 'visit-date', this.card["visit-date"]),
            visitDateLabel: new FormComponents.Label('visit-date', 'Дата и время визита'),
            doctor: new FormComponents.Input('text', 'doctor', this.card.doctor)
        }

        const {
            visitDescLabel,
            visitorLabel,
            docFieldsWrap,
            clientName,
            visitAim,
            visitAimLabel,
            visitDescription,
            visitUrgency,
            visitDateLabel,
            visitUrgencyLabel,
            visitDateField,
            doctor
        } = this.elements;

        [...this.elements.visitUrgency.elements.self.children].forEach((option) => {
            if (option.textContent === this.card.urgency) {
                option.selected = true
            }
        })

        docFieldsWrap.classList.add('doc-fields-wrap');
        doctor.elements.self.classList.add('doctor');
        doctor.elements.self.disabled = true;
        this.nowDateTime = getDateTimeString();
        this.elements.visitDateField.elements.self.min = this.nowDateTime;
        this.elements.submitBtn.remove();
        docFieldsWrap.append(visitorLabel.elements.self, clientName.elements.self, visitAimLabel.elements.self, visitAim.elements.self, visitDescLabel.elements.self, visitDescription.elements.self, visitUrgencyLabel.elements.self, visitUrgency.elements.self, visitDateLabel.elements.self, visitDateField.elements.self);
        this.appendDocOptions()
    }

    submitHandler(ev) {
        ev.preventDefault()

        const modal = document.querySelector('.modal-wrap');
        const wrapper = document.querySelector('.wrapper');
        const formData = {};
        const doctor = document.querySelector('.doctor');

        const formFields = [...document.querySelector('.doc-fields-wrap').children];
        formFields.push(doctor)
        formFields.forEach(el => {
            if (typeof el.name !== 'undefined') {
                formData[el.name] = el.value;
            }
        })

        API.changeCard(this.card.id, "PUT", JSON.stringify(formData))
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(card => {
                            cardRenderFunc.switchDocs(card.doctor, card);
                            modal.remove();
                            wrapper.classList.remove('blur');
                        })
                } else {
                    throw new Error('Что то пошло не так при редактировании карточки')
                }
            })
    }

    appendDocOptions() {
        const nowDateTimeString = getDateTimeString();
        switch (this.card.doctor) {
            case 'Кардиолог': {

                this.elements.bloodPressureLabel = new FormComponents.Label('blood-pressure', 'Давление')
                this.elements.bloodPressure = new FormComponents.Input('text', 'blood-pressure', this.card["blood-pressure"]);
                this.elements.bodyMassIndexLabel = new FormComponents.Label('body-mass-index', 'Индекс массы тела')
                this.elements.bodyMassIndex = new FormComponents.Input('number', 'body-mass-index', this.card["body-mass-index"]);
                this.elements.cardioDiseasesLabel = new FormComponents.Label('cardio-diseases', 'Перенесенные заболевания сердца/системы')
                this.elements.cardioDiseases = new FormComponents.TextArea('cardio-diseases', this.card["cardio-diseases"]);
                this.elements.ageLabel = new FormComponents.Label('age', 'Возраст');
                this.elements.age = new FormComponents.Input('number', 'age', this.card.age);
                this.elements.age.elements.self.min = 0;

                const {
                    bloodPressureLabel,
                    bloodPressure,
                    bodyMassIndexLabel,
                    bodyMassIndex,
                    cardioDiseasesLabel,
                    cardioDiseases,
                    ageLabel,
                    age
                } = this.elements;

                this.elements.docFieldsWrap.append(bloodPressureLabel.elements.self, bloodPressure.elements.self, bodyMassIndexLabel.elements.self, bodyMassIndex.elements.self, cardioDiseasesLabel.elements.self, cardioDiseases.elements.self, ageLabel.elements.self, age.elements.self);
                break
            }
            case 'Стоматолог': {

                this.elements.lastVisitDate = new FormComponents.Input('datetime-local', 'last-visit', this.card["last-visit"]);
                this.elements.lastVisitDate.elements.self.max = nowDateTimeString;
                this.elements.lastVisitDateLabel = new FormComponents.Label('last-visit', 'Дата последнего визита');
                this.elements.docFieldsWrap.append(this.elements.lastVisitDateLabel.elements.self, this.elements.lastVisitDate.elements.self)
                break
            }
            case 'Терапевт': {

                this.elements.age = new FormComponents.Input('number', 'age', this.card.age);
                this.elements.age.elements.self.min = 0;
                this.elements.ageLabel = new FormComponents.Label('age', 'Возраст');
                this.elements.docFieldsWrap.append(this.elements.ageLabel.elements.self, this.elements.age.elements.self);
                break
            }
        }
        this.elements.self.append(this.elements.doctor.elements.self, this.elements.docFieldsWrap, this.elements.submitBtn);
    }

    render(parent) {
        super.render(parent);
    }

}


const aboutUs = document.querySelector('#about-js');
const services = document.querySelector('#services-js');
const footer = document.querySelector('#footer-js');
const filter = document.querySelector('#filter-js');
const openBtn = document.querySelector('#open-btn');
const quitBtn = document.createElement('button');
const headerContainer = document.querySelector('.header-container');

for (let i = 0; i < localStorage.length; i++) {

    let key = localStorage.key(i)

    if (key === 'token') {

        aboutUs.remove();
        services.remove();
        footer.remove();

        openBtn.textContent = 'Создать визит'

        quitBtn.classList.add('btn');
        quitBtn.textContent = 'Выйти';
        headerContainer.append(quitBtn);

        quitBtn.addEventListener('click', () => {

            localStorage.removeItem('token');
            window.location.reload();

        })


        new FilterForm('Найти', 'filter-form').render(filter);

        renderCards.renderCards();
    }
}


export default {AuthForm, VisitForm, FilterForm, VisitEditForm}



