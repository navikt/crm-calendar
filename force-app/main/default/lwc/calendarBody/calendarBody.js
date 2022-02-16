import { LightningElement, track } from 'lwc';

export default class CalendarBody extends LightningElement {
    weekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
    calendarContainer = document.getElementsByClassName('calendar-container');
    monthNav = 0;
    currentMonth = 'Test';

    handlePrev() {
        this.monthNav--;
        this.load(this.template.querySelector('div'));
    }
    handleNext() {
        this.monthNav++;
        this.load(this.template.querySelector('div'));
    }

    renderedCallback() {
        this.load(this.template.querySelector('div'));
    }

    load(element) {
        const dt = new Date();

        if (this.monthNav !== 0) {
            dt.setMonth(new Date().getMonth() + this.monthNav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('no', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        console.log(dateString);

        const paddingDays = this.weekdays.indexOf(dateString.split(' ')[0]);
        console.log('Padding: ', paddingDays);

        this.currentMonth = `${dt.toLocaleDateString('no', { month: 'long' })} ${year}`;

        element.innerHTML = `
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Man </span>
        </div>
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Tir </span>
        </div>
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Ons </span>
        </div>
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Tor </span>
        </div>
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Fre </span>
        </div>
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Lør </span>
        </div>
        <div class="slds-col slds-size_1-of-7 day-header">
            <span> Søn </span>
        </div>`;

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
            daySquare.classList.add('slds-col');
            daySquare.classList.add('slds-size_1-of-7');
            daySquare.style.textAlign = 'center';
            daySquare.style.border = '0.5px solid rgb(154, 154, 154)';
            daySquare.style.height = '150px';

            if (i > paddingDays) {
                daySquare.innerText = i - paddingDays;
            } else {
                daySquare.classList.add('padding');
            }

            element.appendChild(daySquare);
        }
    }
}
