public without sharing class CalendarWorkOrdersController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getObjects(String param) {
        String variable = param;
        List<SObject> objects = (List<SObject>) Database.query(
            'SELECT Id, StartDate, EndDate, Subject FROM ' + variable
        );
        return objects;
    }
}
