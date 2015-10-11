## AS-Rest-Api

NFL statistics API. Not for public use at this time.

Base url: "http://www.ancillarystats.com/api"

## "GET" routes

- "/players"  
__Returns all quarterbacks, halfbacks, wide recievers and tight ends listed on 2015 depth charts. Ex:__    
  ```json
    {  
      "name" : "Larry Fitzgerald",  
      "team:": "Arizona Cardinals",  
      "position": "QB",  
      "number": "#3"  
    }
  ```  
  
- "/games/qbs"    
__Returns all 2015 NFL quarterback games. Ex:__  
  ```json
    {  
      "avg_yards_per_pass": 9.42,  
      "avg_yards_per_rush": -1.0,  
      "comp_percentage": 60.5,  
      "date": "10/04/2015",  
      "id": 187,  
      "interceptions": 0,  
      "is_season_totals": false,  
      "longest_pass": 68,  
      "longest_rush": -1,  
      "opponent": "CLE",  
      "pass_attempts": 38,  
      "pass_completions": 23,  
      "pass_tds": 3,  
      "pass_yards": 358,  
      "passer_rating": 118.1,  
      "player_name": "Philip Rivers",  
      "qb_rating": 69.0,  
      "result": "30-27",  
      "rush_attempts": 1,  
      "rush_tds": 0,  
      "rush_yards": -1  
    }
  ```  
  
- "/games/rbs"    
__Returns all 2015 NFL running back games. Ex:__  
  ```json
    {  
      "avg_yards_per_rec": 0.5,  
      "avg_yards_per_rush": 6.0,  
      "date": "09/17/2015",  
      "fumbles": 2,  
      "fumbles_lost": 2,  
      "id": 257,  
      "is_season_totals": false,  
      "longest_rec": 6,  
      "longest_rush": 34,  
      "opponent": "DEN",  
      "player_name": "Jamaal Charles",  
      "rec_tds": 0,  
      "rec_yards": 2,
      "receptions": 4,  
      "result": "24-31",  
      "rush_attempts": 21,  
      "rush_tds": 1,  
      "rush_yards": 125  
    }
  ```  
  
- "/games/wrs"    
__Returns all 2015 NFL wide reciever games. Ex:__  
  ```json
    {  
      "avg_yards_per_rec": 14.0,  
      "avg_yards_per_rush": 0.0,  
      "date": "09/20/2015",  
      "fumbles": 0,  
      "fumbles_lost": 0,  
      "id": 253,  
      "is_season_totals": false,  
      "longest_rec": 28,  
      "longest_rush": 0,  
      "opponent": "CHI",  
      "player_name": "Larry Fitzgerald",  
      "rec_tds": 3,  
      "rec_yards": 112,  
      "receptions": 8,  
      "result": "48-23",  
      "rush_attempts": 0,  
      "rush_tds": 0,  
      "rush_yards": 0,  
      "targets": 9  
    }
  ```  
  
- "/games/tes"    
__Returns all 2015 NFL tight end games. Ex:__  
  ```json
    {  
      "avg_yards_per_rec": 18.8,  
      "avg_yards_per_rush": 0.0,  
      "date": "09/10/2015",  
      "fumbles": 0,  
      "fumbles_lost": 0,  
      "id": 150,  
      "is_season_totals": false,  
      "longest_rec": 52,  
      "longest_rush": 0,  
      "opponent": "PIT",  
      "player_name": "Rob Gronkowski",  
      "rec_tds": 3,  
      "rec_yards": 94,  
      "receptions": 5,  
      "result": "28-21",  
      "rush_attempts": 0,  
      "rush_tds": 0,  
      "rush_yards": 0,  
      "targets": 8  
    }
  ```  
  
 
Season totals are the same format as regular season games, but with `"is_season_totals": True`

- "/totals/qbs"

- "/totals/rbs"

- "/totals/wrs"

- "/totals/tes"
