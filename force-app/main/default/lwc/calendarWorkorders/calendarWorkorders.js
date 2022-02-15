import { LightningElement, track, wire } from 'lwc';
import getAllWorkOrders from '@salesforce/apex/CalendarWorkOrdersController.getAllWorkOrders';

export default class CalendarWorkorders extends LightningElement {
    @track workOrders;
    @wire(getAllWorkOrders)
    wiredgetAllWorkOrders(result) {
        if (result.data) {
            this.workOrders = result.data;
        }
    }
}
