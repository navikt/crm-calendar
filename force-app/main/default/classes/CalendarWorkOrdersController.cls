public without sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getObjects(String subject, String startDate, String endDate, String record) {
        List<SObject> objects = (List<SObject>) Database.query(
            'SELECT Id, ' +
            subject +
            ', ' +
            startDate +
            ', ' +
            endDate +
            ' FROM ' +
            record
        );
        return objects;
    }
}
