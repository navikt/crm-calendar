Account acc1 = new Account();
acc1.name = 'Ola Nordmann';
insert acc1;

Account acc2 = new Account();
acc2.name = 'Kari Nordmann';
insert acc2;

Account acc3 = new Account();
acc3.name = 'Nordmann Nordmann';
insert acc3;

Account acc4 = new Account();
acc4.name = 'Mannord Nordmann';
insert acc4;

WorkOrder wo1 = new WorkOrder();
wo1.subject ='Arbeidsordre 1';
insert wo1;

WorkOrder wo2 = new WorkOrder();
wo2.subject ='Arbeidsordre 2';
insert wo2;

WorkOrder wo3 = new WorkOrder();
wo3.subject ='Arbeidsordre 3';
insert wo3;

WorkOrder wo4 = new WorkOrder();
wo4.subject ='Arbeidsordre 4';
insert wo4;

ServiceAppointment sa1 = new ServiceAppointment();
sa1.ParentRecordId = wo1.Id;
sa1.EarliestStartTime = Datetime.now();
sa1.DueDate = Datetime.now().addHours(1);
insert sa1;

ServiceAppointment sa2 = new ServiceAppointment();
sa2.ParentRecordId = wo2.Id;
sa2.EarliestStartTime = Datetime.now().addDays(1);
sa2.DueDate = Datetime.now().addDays(1).addHours(2);
insert sa2;

ServiceAppointment sa3 = new ServiceAppointment();
sa3.ParentRecordId = wo3.Id;
sa3.EarliestStartTime = Datetime.now().addDays(3);
sa3.DueDate = Datetime.now().addDays(3).addHours(4);
insert sa3;

ServiceAppointment sa4 = new ServiceAppointment();
sa4.ParentRecordId = wo4.Id;
sa4.EarliestStartTime = Datetime.now().addHours(5);
sa4.DueDate = Datetime.now().addHours(8);
insert sa4;