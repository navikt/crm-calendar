import { LightningElement, track, wire } from 'lwc';
import getAllWorkOrders from '@salesforce/apex/CalendarWorkOrdersController.getAllWorkOrders';

export default class CalendarBody extends LightningElement {
    weekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
    reversedWeekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'].reverse();
    calendarContainer = document.getElementsByClassName('calendar-container');
    monthNav = 0;
    currentMonth = 'Test';

    @track workOrders;
    @wire(getAllWorkOrders)
    wiredGetAllWorkOrders(result) {
        if (result.data) {
            console.log('DATA WORKS: ', result.data);
            this.workOrders = result.data;
            //console.log('Show StartDate: ', this.workOrders[0].StartDate);
            this.load(this.template.querySelector('div'));
        }
    }

    handlePrev() {
        this.monthNav--;
        this.load(this.template.querySelector('div'));
    }
    handleNext() {
        this.monthNav++;
        this.load(this.template.querySelector('div'));
    }

    load(element) {
        const dt = new Date();

        if (this.workOrders) {
            this.workOrders.forEach((wo) => {
                console.log('Show StartDate: ', wo.StartDate);
            });
        }

        if (this.monthNav !== 0) {
            dt.setMonth(new Date().getMonth() + this.monthNav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const firstDateString = firstDayOfMonth.toLocaleDateString('no', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        //  console.log(firstDateString);

        const lastDateString = lastDayOfMonth.toLocaleDateString('no', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        const paddingDaysFirst = this.weekdays.indexOf(firstDateString.split(' ')[0]);
        const paddingDaysLast = this.reversedWeekdays.indexOf(lastDateString.split(' ')[0]);

        let prevPaddingDays = [];
        for (let j = 1; j <= paddingDaysFirst; j++) {
            let d = firstDayOfMonth;
            d.setDate(d.getDate() - 1);
            prevPaddingDays.push(d.getDate());
        }
        prevPaddingDays.reverse();

        let nextPaddingDays = [];
        for (let j = 1; j <= paddingDaysLast; j++) {
            let d = lastDayOfMonth;
            d.setDate(d.getDate() + 1);
            nextPaddingDays.push(d.getDate());
        }

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

        for (let i = 1; i <= paddingDaysFirst + daysInMonth + paddingDaysLast; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
            daySquare.classList.add('slds-col');
            daySquare.classList.add('slds-size_1-of-7');
            daySquare.style.float = 'right';
            daySquare.style.border = '0.5px solid rgb(154, 154, 154)';
            daySquare.style.height = '150px';
            daySquare.style.paddingLeft = '6px';
            daySquare.style.paddingTop = '3px';
            daySquare.style.fontWeight = '500';

            if (i > paddingDaysFirst && i <= daysInMonth + 1) {
                daySquare.innerText = i - paddingDaysFirst;
            } else if (i <= paddingDaysFirst) {
                daySquare.innerText = prevPaddingDays[i - 1];
                daySquare.style.opacity = '0.5';
            } else if (i > daysInMonth) {
                // console.log(nextPaddingDays[i]);
                daySquare.innerText = nextPaddingDays[i - 1];
            }

            element.appendChild(daySquare);
        }
    }
}
