import { LightningElement, track, wire } from 'lwc';
import getObjects from '@salesforce/apex/CalendarWorkOrdersController.getObjects';
export default class CalendarWorkorders extends LightningElement {
    @track objects;
    @wire(getObjects, { param: 'WorkOrder' })
    wiredgetObjects(result) {
        console.log('result ' + JSON.stringify(result));
        if (result.data) {
            console.log('workorders ' + result.data);
            this.objects = result.data;
        }
    }
}
