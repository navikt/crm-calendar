public without sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getObjects(String record, String start, String endTime) {
        String variable = record;
        String startDate = start;
        String endDate = endTime;
        List<SObject> objects = (List<SObject>) Database.query(
            'SELECT Id, ' +
            startDate +
            ', ' +
            endDate +
            ', Subject FROM ' +
            variable
        );
        return objects;
    }
}
