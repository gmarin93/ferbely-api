from django.contrib import admin
from ferbely_app.models import User, Building, Task, Bill, Contract

admin.site.register(User)
admin.site.register(Building)
admin.site.register(Task)
admin.site.register(Bill)
admin.site.register(Contract)
