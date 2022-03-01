import { LightningElement, track, wire } from 'lwc';
import getAllWorkOrders from '@salesforce/apex/CalendarWorkOrdersController.getAllWorkOrders';
import getAllAccounts from '@salesforce/apex/CalendarWorkOrdersController.getAllAccounts';
import getAllServiceAppointments from '@salesforce/apex/CalendarWorkOrdersController.getAllServiceAppointments';

export default class CalendarWorkorders extends LightningElement {
    @track workOrders;
    @wire(getAllWorkOrders)
    wiredgetAllWorkOrders(result) {
        if (result.data) {
            this.workOrders = result.data;
        }
    }

    @track allAccounts;
    @wire(getAllAccounts)
    wiredgetAllAccounts(result) {
        if (result.data) {
            this.allAccounts = result.data;
        }
    }

    @track allServiceAppointments;
    @wire(getAllServiceAppointments)
    wiredgetAllServiceAppointments(result) {
        if (result.data) {
            this.allServiceAppointments = result.data;
        }
    }
}
