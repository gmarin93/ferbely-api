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

class TaskStatus:
    COMPLETED = "completed"
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    choices = [
        (COMPLETED, "Completed"),
        (PENDING, "Pending"),
        (IN_PROGRESS, "In Progress"),
    ]

class Task(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=11, choices=tuple(TaskType.choices), default=TaskType.MAINTENANCE)
    status = models.CharField(max_length=11, choices=tuple(TaskStatus.choices), default=TaskStatus.PENDING)
    contract = models.ForeignKey('Contract', on_delete=models.CASCADE, related_name='contract_task', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']  # Orders by newest first
    
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
    
    def get_task_status(self):
        return self.status
    
    def get_task_status_display(self):
        return self.get_status_display()
    
    def get_task_status_value(self):
        return self.status
    