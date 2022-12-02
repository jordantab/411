
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from .serializers import UserSerializer
from .models import User

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import requests
from django.http import HttpResponse
from django.shortcuts import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('name')
    serializer_class = UserSerializer

apiKey = '99STUUcDXZs8D6AMKU0RUsqENtx6z5n6UJ1oqm8tB3Mfv2gLLmIH20LHig8X'

@csrf_exempt
def getTeamID(request):
    ''' master function to get the list of breweries closest to the stadium'''

    # obtain user input
    inputs = request.read().decode("utf-8")
    team_end = inputs.index(",")
    team = inputs[9:team_end-1]
    date = inputs[team_end+9:-2]

    # get the team id
    team_id_url = f'https://api.sportmonks.com/v3/football/teams/search/{team}?api_token={apiKey}'
    r = requests.get(url=team_id_url).json()
    team_id = r['data'][0]['id']

    # get the venue id
    venue_id_url = f'https://api.sportmonks.com/v3/football/fixtures/between/{date}/{date}/{team_id}?api_token={apiKey}'
    r = requests.get(url=venue_id_url).json()
    venue_id = r['data'][0]['venue_id']

    #  call function to get coordinates of the venue
    coordinates_url = f'https://api.sportmonks.com/v3/football/venues/{venue_id}?api_token={apiKey}'
    r = requests.get(url=coordinates_url).json()
    latitude = r['data']['latitude']
    longitude = r['data']['longitude']

    # call function to get the list of breweries
    breweries_url = f'https://api.openbrewerydb.org/breweries?by_dist={latitude},{longitude}&per_page=3'
    r = requests.get(url=breweries_url)
    breweries = r
    return HttpResponse(breweries)

# def getVenueID(team_id, date):
#     '''returns venue id using team_id and date'''
#     venue_id_url = f'https://api.sportmonks.com/v3/football/fixtures/between/{date}/{date}/{team_id}?api_token={apiKey}'
#     r = requests.get(url=venue_id_url).json()
#     venue_id = r['data'][0]['venue_id']
#     # call function to get coordinates of the venue
#     return getCoordinates(venue_id)

# def getCoordinates(venue_id):
#     '''returns the coordinates of a venue'''
#     coordinates_url = f'https://api.sportmonks.com/v3/football/venues/{venue_id}?api_token={apiKey}'
#     r = requests.get(url=coordinates_url).json()
#     latitude = r['data']['latitude']
#     longitude = r['data']['longitude']

#     # call function to get the list of breweries
#     return(getBreweries(latitude, longitude))

# def getBreweries(latitude, longitude):
#     '''returns a list of breweries'''
#     breweries_url = f'https://api.openbrewerydb.org/breweries?by_dist={latitude},{longitude}&per_page=1'
#     r = requests.get(url=breweries_url).json()
#     breweries = r
#     return HttpResponse(breweries)




