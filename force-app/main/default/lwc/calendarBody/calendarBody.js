import { LightningElement, track, wire } from 'lwc';
import getObjects from '@salesforce/apex/CalendarWorkOrdersController.getObjects';

export default class CalendarBody extends LightningElement {
    weekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
    reversedWeekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'].reverse();
    monthNav = 0;
    currentMonth = '';
    monthDays = [];
    eventsForMonth = [];

    @track serviceAppointments;
    //@wire(getObjects, { record: 'ServiceAppointment', start: 'EarliestStartTime', endTime: 'DueDate' })
    @wire(getObjects, {
        subject: 'subject',
        startDate: 'EarliestStartTime',
        endDate: 'DueDate',
        record: 'ServiceAppointment'
    })
    wiredGetAllServiceAppointments(result) {
        if (result.data) {
            this.serviceAppointments = result.data;
            this.load();
        }
    }

    handlePrev() {
        this.monthNav--;
        this.load();
    }
    handleNext() {
        this.monthNav++;
        this.load();
    }

    load() {
        const dt = new Date();
        this.eventsForMonth = [];
        this.monthDays = [];

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

        if (this.serviceAppointments) {
            this.serviceAppointments.forEach((sa) => {
                const serviceAppointmentDate = new Date(sa.EarliestStartTime);
                if (serviceAppointmentDate.getMonth() == month) {
                    this.eventsForMonth.push(sa);
                }
            });
        }

        for (let i = 1; i <= paddingDaysFirst + daysInMonth; i++) {
            let eventsForDay = [];
            const dateOfTheDay = new Date(year, month, i - paddingDaysFirst);
            if (i > paddingDaysFirst && i <= daysInMonth + paddingDaysFirst) {
                this.eventsForMonth.forEach((event) => {
                    if (dateOfTheDay.getDate() == new Date(event.EarliestStartTime).getDate()) {
                        eventsForDay.push(event);
                    }
                });
                this.monthDays.push({
                    day: i - paddingDaysFirst,
                    date: dateOfTheDay,
                    events: eventsForDay
                });
            } else if (i <= paddingDaysFirst) {
                this.monthDays.push({});
            }
        }
    }
}
