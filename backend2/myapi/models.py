from django.db import models

# import uuid
# from typing import Optional


# Create your models here.
class User(models.Model):
    
    name  = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password =  models.CharField(max_length=100)

    # not sure what to do w the stuff directly below
    # name = models.CharField(max_length=60)

    # def __str__(self):
    #     return self.name

# class UserUpdate(UserModel): 
#     title: Optional[str]
#     username: Optional[str]
#     password: Optional[str]

# class UserGet(UserModel)
