from django.db import models

class BillStatus:
    PAID = "paid"
    UNPAID = "unpaid"
    choices = [
        (PAID, "Paid"),
        (UNPAID, "Unpaid"),
    ]

class Bill(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def get_full_name(self):
        return f"{self.name}"
    
    def get_short_name(self):
        return self.name
    
    def set_bill_paid(self):
        self.is_paid = True
        self.save()
    
    def set_bill_unpaid(self):
        self.is_paid = False
        self.save()