@isTest
private class CalendarWorkOrdersControllerTest {
    @TestSetup
    static void makeData() {
        WorkOrder wo1 = new WorkOrder();
        wo1.subject = 'Arbeidsordre 1';
        wo1.StartDate = Datetime.now();
        wo1.EndDate = Datetime.now().addHours(1);
        insert wo1;

        Account acc1 = new Account();
        acc1.Name = 'Jedi Order';
        insert acc1;

        ServiceAppointment sa1 = new ServiceAppointment();
        sa1.ParentRecordId = wo1.Id;
        sa1.subject = 'Oppdrag 1';
        sa1.EarliestStartTime = Datetime.now();
        sa1.DueDate = Datetime.now().addHours(1);
        insert sa1;
    }

    @isTest
    static void workOrdersListNotEmpty() {
        List<ServiceAppointment> allWorkOrders = CalendarWorkOrdersController.getObjects(
            'subject',
            'EarliestStartTime',
            'DueDate',
            'ServiceAppointment'
        );
        System.assertEquals(1, allWorkOrders.size());
    }

    @isTest
    static void workOrderListSubjectMatches() {
        List<WorkOrder> allWorkOrders = CalendarWorkOrdersController.getObjects(
            'subject',
            'StartDate',
            'EndDate',
            'WorkOrder'
        );

        System.assertEquals('Arbeidsordre 1', allWorkOrders[0].subject);
        System.assertNotEquals('Arbekjdsårdre 1', allWorkOrders[0].subject);
    }
}
