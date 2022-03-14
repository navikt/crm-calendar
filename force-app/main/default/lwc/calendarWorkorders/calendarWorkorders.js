import { LightningElement, track, wire } from 'lwc';
import getObjects from '@salesforce/apex/CalendarWorkOrdersController.getObjects';
export default class CalendarWorkorders extends LightningElement {
    @track objects;
    @wire(getObjects, { record: 'WorkOrder', start: 'StartDate', endTime: 'EndDate' })
    wiredgetObjects(result) {
        if (result.data) {
            this.objects = result.data;
        }
    }
}
