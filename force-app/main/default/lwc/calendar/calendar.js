import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.FirstName';
import { getTermOptions } from './myFunction';

export default class Calendar extends LightningElement {
    weekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
    calendarContainer = document.getElementsByClassName('calendar-container');

    renderedCallback() {
        this.load(this.template.querySelector('div'));
    }

    load(element) {
        const dt = new Date();

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
