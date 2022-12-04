from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'football'
router = routers.DefaultRouter()
router.register("", views.UserView)
urlpatterns = [
    path('', include(router.urls))
    #path('breweries/', views.get_breweries_data, name='breweries_data'),   
]