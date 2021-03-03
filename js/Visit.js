export default class Visit {

    constructor(options) {

        this.fullName = options.fullName
        this.urgency = options.urgency
        this.purpose = options.purpose
        this.description = options.description
        this.dateOfVisit = options.dateOfVisit
        this.options = options
    }

    createElem() {
        this.fullName = document.createElement('p');
        this.urgency = document.createElement('p');
        this.purpose = document.createElement('p');
        this.description = document.createElement('p');
        this.dateOfVisit = document.createElement('p');

        this.fullName.textContent = `ФИО: ${this.options.visitor}`;
        this.urgency.textContent = `Срочность: ${this.options.urgency}`;
        this.purpose.textContent = `Цель визита: ${this.options.aim}`;
        this.description.textContent = `Описание визита: ${this.options.description}`;
        this.dateOfVisit.textContent = `Дата визита: ${this.options["visit-date"].substring(0, 10) + ' ' + this.options["visit-date"].substring(11)}`
    }
}

