from django.db import models

class TaskType:
    MAINTENANCE = "maintenance"
    REPAIR = "repair"
    CLEANING = "cleaning"
    OTHER = "other"
    choices = [
        (MAINTENANCE, "Maintenance"),
        (REPAIR, "Repair"),
        (CLEANING, "Cleaning"),
        (OTHER, "Other"),
    ]

class Task(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=11, choices=tuple(TaskType.choices))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def get_full_name(self):
        return f"{self.name}"
    
    def get_task_type(self):
        return self.type
    
    def get_task_type_display(self):
        return self.get_type_display()
    
    def get_task_type_value(self):
        return self.type
    