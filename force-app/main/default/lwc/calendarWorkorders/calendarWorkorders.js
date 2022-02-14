import { LightningElement, track, wire } from 'lwc';
import getWorkOrder from '@salesforce/apex/CalendarWorkOrdersController.getWorkOrder';

export default class CalendarWorkorders extends LightningElement {
    //henter ut workOrder
    @track workOrder;
    @wire(getWorkOrder)
    wiredGetWorkOrder(result) {
        console.log('test for å se om det er result222222');
        if (result.data) {
            this.workOrder = result.data;
            console.log('test for å se om det er this.workorder.subject' + this.workOrder.subject);
            console.log('test for å se om det er result.data' + result.data);
            this.showAllWorkOrders();
            console.log('test for å se om det er result');
        }
        console.log('test for å se om det er tomt');
    }
    showAllWorkOrders() {
        for (var i = 0; i < this.workOrder.length; i++) {
            console.log('test');
            console.log(this.workOrder[i].subject);
            console.log('test');
        }
    }
}
