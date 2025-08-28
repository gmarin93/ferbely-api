import datetime
from django.db import models

class ContractType:
    MONTHLY = "monthly"
    YEARLY = "yearly"
    choices = [
        (MONTHLY, "Monthly"),
        (YEARLY, "Yearly"),
    ]

class ContractStatus:
    ACTIVE = "active"
    INACTIVE = "inactive"
    choices = [
        (ACTIVE, "Active"),
        (INACTIVE, "Inactive"),
    ]

class Contract(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=tuple(ContractType.choices))
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=ContractStatus.choices, default=ContractStatus.ACTIVE)
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, related_name='user_contract')
    building = models.ForeignKey('Building', on_delete=models.CASCADE, related_name='building_contract')
    bill = models.ForeignKey('Bill', on_delete=models.CASCADE, related_name='bill_contract', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def get_full_name(self):
        return f"{self.name}"
    
    def get_short_name(self):
        return self.name
    
    def check_if_contact_overdue(self):
        if self.end_date < datetime.now().date():
            return True
        return False
    
    def check_if_contract_active(self):
        if self.status == ContractStatus.ACTIVE and self.check_bills_paid():
            return True
        return False
    
    def check_bills_paid(self):
        if self.bill.is_paid:
            return True
        return False
    
    def set_contract_active(self):
        if self.check_bills_paid():
            self.status = ContractStatus.ACTIVE
            self.save()
        else:
            self.status = ContractStatus.INACTIVE
            self.save()
            
    def get_tasks(self):
        return self.tasks.all()
    