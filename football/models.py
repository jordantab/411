from django.db import models

# Create your models here.
class User(models.Model):
    team  = models.CharField(max_length=100)
    Date = models.CharField(max_length=100)
    brewery = models.CharField(max_length=100)
    
    