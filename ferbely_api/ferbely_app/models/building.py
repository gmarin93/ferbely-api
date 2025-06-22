from django.db import models


class BuildingRole:
    HOUSE = "house"
    APARTMENT = "apartment"
    OFFICE = "office"
    SHOP = "shop"
    OTHER = "other"
    choices = [
        (HOUSE, "House"),
        (APARTMENT, "Apartment"),
        (OFFICE, "Office"),
        (SHOP, "Shop"),
        (OTHER, "Other"),
    ]

class Building(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=tuple(BuildingRole.choices))
    address = models.CharField(max_length=255)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='owned_buildings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def get_full_name(self):
        return f"{self.name}"
    
    def get_short_name(self):
        return self.name