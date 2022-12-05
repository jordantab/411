
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
from django.http import JsonResponse
import json


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('name')
    serializer_class = UserSerializer

# apiKey = '99STUUcDXZs8D6AMKU0RUsqENtx6z5n6UJ1oqm8tB3Mfv2gLLmIH20LHig8X'
apiKey = 'jKsDaQ4sGAM4QNtXLDWyODCVJWKpHxZnVLasy9Dsm6Ly15IzINJqLTZVNFck'

@csrf_exempt
def getBreweries(request):
    ''' master function to get the list of breweries closest to the stadium'''
    table = {
        "team1_logo": None,
        "team2_logo": None,
        "breweries": [],
        "game": None,
        "venue_name": None,
        "venue_address": None,
        "venue_city": None
    }

    # obtain user input
    inputs = request.read().decode("utf-8")
    team_end = inputs.index(",")
    team1 = inputs[9:team_end-1]
    date = inputs[team_end+9:-2]

    ## Get the list of breweries ##
    # get the team1 id
    team1_id_url = f'https://api.sportmonks.com/v3/football/teams/search/{team1}?api_token={apiKey}'
    r_team1_id = requests.get(url=team1_id_url).json()
    team1_id = r_team1_id['data'][0]['id']

    # get the venue id
    venue_id_url = f'https://api.sportmonks.com/v3/football/fixtures/between/{date}/{date}/{team1_id}?api_token={apiKey}'
    r_fixture = requests.get(url=venue_id_url).json()
    venue_id = r_fixture['data'][0]['venue_id']

    #  call function to get coordinates of the venue
    coordinates_url = f'https://api.sportmonks.com/v3/football/venues/{venue_id}?api_token={apiKey}'
    r_coord = requests.get(url=coordinates_url).json()
    latitude = r_coord['data']['latitude']
    longitude = r_coord['data']['longitude']

    # call function to get the list of breweries
    breweries_url = f'https://api.openbrewerydb.org/breweries?by_dist={latitude},{longitude}&per_page=5'
    r_brews = requests.get(url=breweries_url)
    table['breweries'] = r_brews.json()

    ## get the team logos ##
    # get team1 logo
    table['team1_logo'] = r_team1_id['data'][0]['image_path']

    # get team2 name
    game = r_fixture['data'][0]['name']
    teams = game.split(" vs ")
    team1_index = teams.index(team1)
    team2_index = 0
    if team1_index == 0:
        team2_index = 1
    team2 = teams[team2_index]

    # get team2 logo
    team2_id_url = f'https://api.sportmonks.com/v3/football/teams/search/{team2}?api_token={apiKey}'
    r_team2_id = requests.get(url=team2_id_url).json()
    table['team2_logo'] = r_team2_id['data'][0]['image_path']

    ## get game time info ##
    table['game'] = r_fixture['data'][0]['starting_at']

    ## get the venue info ##
    table['venue_name'] = r_coord['data']['name']
    table['venue_address'] = r_coord['data']['address']
    table['venue_city'] = r_coord['data']['city_name']

    # return the dictionary containing all the data
    return HttpResponse(json.dumps(table))



