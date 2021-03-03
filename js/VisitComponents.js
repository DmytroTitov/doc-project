import Visit from './Visit.js';

class VisitDentist extends Visit {

    constructor(options) {
        super(options);

        this.dateOfLastVisit = options.dateOfLastVisit
    }

    render(parent) {

        super.createElem()

        this.dateOfLastVisit = document.createElement('p');
        this.dateOfLastVisit.textContent =`Дата последнего визита: ${this.options["last-visit"].substring(0, 10) + ' ' + this.options["last-visit"].substring(11)}`;


        parent.append(this.urgency, this.purpose, this.description, this.dateOfLastVisit, this.dateOfVisit)
    }
}


class  VisitCardiologist extends Visit {

    constructor(options) {
        super(options);

        this.pressure = options.pressure;
        this.bodyMassIndex = options.bodyMassIndex;
        this.cardiovascularSystemIlnesses = options.cardiovascularSystemIlnesses;
        this.age = options.age;
    }

    render(parent) {

        super.createElem()

        this.pressure = document.createElement('p');
        this.bodyMassIndex = document.createElement('p');
        this.cardiovascularSystemIlnesses = document.createElement('p');
        this.age = document.createElement('p');


        this.pressure.textContent = `Обычное давление: ${this.options["blood-pressure"]}`;
        this.bodyMassIndex.textContent = `Индекс массы тела: ${this.options["body-mass-index"]}`;
        this.cardiovascularSystemIlnesses.textContent = `Перенесенные заболевания сердечно-сосудистой системы: ${this.options["cardio-diseases"]}`;
        this.age.textContent = `Возраст: ${this.options.age}`;

        parent.append(this.urgency, this.purpose, this.description, this.pressure, this.bodyMassIndex, this.cardiovascularSystemIlnesses, this.age, this.dateOfVisit)
    }
}



class VisitTherapist extends Visit{
    constructor(options) {
        super(options);

        this.age = options.age;
    }

    render(parent) {

        super.createElem()

        this.age = document.createElement('p');
        this.age.textContent = `Возраст: ${this.options.age}`;

        parent.append(this.urgency, this.purpose, this.description, this.age, this.dateOfVisit)
    }
}


export default {
    VisitDentist, VisitCardiologist, VisitTherapist
}