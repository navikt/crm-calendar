import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.FirstName';

export default class Calendar extends LightningElement {
    userName;
    userId;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    })
    wireuser({ data }) {
        if (data) {
            this.userName = data.fields.FirstName.value;
            this.userId = data.id;
        }
    }

    @api subjectName = 'subject';
    @api startTimeField = 'EarliestStartTime';
    @api endTimeField = 'DueDate';
    @api recordName = 'ServiceAppointment';
}
