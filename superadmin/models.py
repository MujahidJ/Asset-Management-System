from django.db import models

class SuperAdmin(models.Model):
    username = models.CharField(max_length=40)
    email = models.CharField(max_length=70)
    password = models.CharField(max_length=65)
    
    def __str__(self):
        return f"{self.username}, {self.password}, {self.email}"
    
class Admin(models.Model):
    adminid = models.CharField(max_length=10)
    adminname = models.CharField(max_length=40)
    
    def __str__(self):
        return f"{self.adminid}: {self.adminname}" 
        
class Vendor(models.Model):
    name = models.CharField(max_length=40)
    contact = models.CharField(max_length=50)
    cities = models.CharField(max_length=64)
    countries = models.CharField(max_length=70)
    description = models.CharField(max_length=500, default="No description available", blank=True)
    
    def __str__(self):
        return f"{self.name}: {self.contact}, {self.countries}, {self.cities}"
        
class Category(models.Model):
    category = models.CharField(max_length=150)
    categorytype = models.CharField(max_length=200)
    
    def __str__(self):
        return f"{self.category}: {self.categorytype}"

