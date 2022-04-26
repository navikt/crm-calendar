import { LightningElement, track, wire, api } from 'lwc';
import getObjects from '@salesforce/apex/CalendarWorkOrdersController.getObjects';

export default class CalendarBody extends LightningElement {
    weekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
    monthNav = 0;
    currentMonth = '';
    monthDays = [];
    eventsForMonth = [];

    @api subjectName;
    @api startTimeField;
    @api endTimeField;
    @api recordName;

    @track records;
    @wire(getObjects, {
        subject: '$subjectName',
        startDate: '$startTimeField',
        endDate: '$endTimeField',
        record: '$recordName'
    })
    wiredGetObjects(result) {
        if (result.data) {
            this.records = result.data;
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

    getEventInfo(event){
        var id = event.target.dataset.id;
        var subject = event.target.dataset.subject;
        console.log(id);
        console.log(subject);
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

        let prevPaddingDays = [];
        for (let j = 1; j <= paddingDaysFirst; j++) {
            let d = firstDayOfMonth;
            d.setDate(d.getDate() - 1);
            prevPaddingDays.push(d.getDate());
        }
        prevPaddingDays.reverse();

        this.currentMonth = `${dt.toLocaleDateString('no', { month: 'long' })} ${year}`;

        if (this.records) {
            this.records.forEach((r) => {
                const serviceAppointmentDate = new Date(r[this.startTimeField]);
                if (serviceAppointmentDate.getMonth() == month) {
                    this.eventsForMonth.push(r);
                }
            });
        }

        for (let i = 1; i <= paddingDaysFirst + daysInMonth; i++) {
            let eventsForDay = [];
            const dateOfTheDay = new Date(year, month, i - paddingDaysFirst);
            if (i > paddingDaysFirst && i <= daysInMonth + paddingDaysFirst) {
                this.eventsForMonth.forEach((event) => {
                    if (dateOfTheDay.getDate() == new Date(event[this.startTimeField]).getDate()) {
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
