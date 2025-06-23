from rest_framework.routers import DefaultRouter
from ferbely_app.views.v0.user_view import UserView
from ferbely_app.views.v0.building_view import BuildingView
from ferbely_app.views.v0.task_view import TaskView
from ferbely_app.views.v0.bill_view import BillView
from ferbely_app.views.v0.contract_view import ContractView

ROUTER_V0 = DefaultRouter()
ROUTER_V0.register(r'users', UserView, basename='user')
ROUTER_V0.register(r'buildings', BuildingView, basename='building')
ROUTER_V0.register(r'tasks', TaskView, basename='task')
ROUTER_V0.register(r'bills', BillView, basename='bill')
ROUTER_V0.register(r'contracts', ContractView, basename='contract')

# This is crucial - expose the URLs
urls = ROUTER_V0.urls