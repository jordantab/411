from django.shortcuts import render
import requests
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import http.client
from .serializer import *
# Create your views here.

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@csrf_exempt
def get_match_data(request):
    inputs = request.read().decode("utf-8")
    team_end = inputs.index(",")
    team_name = inputs[9:team_end-1]
    
    from_date = inputs[team_end+13:team_end+23]
    to_date = inputs[team_end+35:team_end+45]
    
    exact_date = inputs[team_end+60:-2]
    
    # if len(inputs) == 71:
    #     exact_date = inputs[team_end+40:-2]
    # else:
    #     from_date = inputs[team_end+13:team_end+23]
    #     to_date = inputs[team_end+35:team_end+45]
    url = "https://v3.football.api-sports.io/teams?name="+team_name
    payload={}
    headers = {
  'x-rapidapi-key': '159c89d050220be2f0323e291eb1b6dc',
  'x-rapidapi-host': 'v3.football.api-sports.io'}
    response = requests.request("GET", url, headers=headers, data=payload)
    response = response.json()['response']

    team_id = response[0]['team']['id']
    if from_date == "yyyy-mm-dd":
        url = "https://v3.football.api-sports.io/fixtures?season=2022&team="+str(team_id)+"&date="+exact_date
    else:
        url = "https://v3.football.api-sports.io/fixtures?season=2022&team="+str(team_id)+"&from="+from_date+"&to="+to_date
    payload={}
    headers = {
  'x-rapidapi-key': '159c89d050220be2f0323e291eb1b6dc',
  'x-rapidapi-host': 'v3.football.api-sports.io'}
    response = requests.request("GET", url, headers=headers, data=payload)
    response = response.json()['response']
    
    match_data = {
        'match_date': response[0]['fixture']['date'],
        'home_team_name': response[0]['teams']['home']['name'],
        'home_team_logo': response[0]['teams']['home']['logo'],
        'away_team_name': response[0]['teams']['away']['name'],
        'away_team_logo': response[0]['teams']['away']['logo'],
        'city': response[0]['fixture']['venue']['city'],
        'stadium': response[0]['fixture']['venue']['name']
    }

    venue_city = response[0]['fixture']['venue']['city']

    url = "https://api.yelp.com/v3/businesses/search?location="+venue_city+"&term=pub&categories=&sort_by=best_match&limit=5"

    headers = {
    "accept": "application/json",
    "Authorization": "Bearer RUokdExOM83iErtvL1Rsm736PNgFz0sNojJ-WLxA0Rtn_yQ1lZ5KN0Yo08DzZljkTrXa8wYXflJ_uVdsQ8zDSAJnvoXk6AS56WVUDFezwuyTEouw8VI7pY3UTiuIY3Yx"
    }

    new_response = requests.get(url, headers=headers)
    new_response = new_response.json()["businesses"]
    breweries = []
  
    for i in range(5):
        pub_details = {
            "pub_name":new_response[i]['name'],
            "address1": new_response[i]['location']['address1'],
            "city":new_response[i]['location']['city'],
            "rating": new_response[i]['rating'],
            "url":new_response[i]['url'],
            "phone":new_response[i]['phone']
        }   
        breweries.append(pub_details)
    context = {'match_data':match_data, 'breweries':breweries}
    
    return HttpResponse(json.dumps(context))
    


