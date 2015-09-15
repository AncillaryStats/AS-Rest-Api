from scrapy.item import Item, Field

class NFL_Team_2015(Item):
    """2015 NFL team container for scraped data"""
    name = Field()
    division = Field()

class NFL_Player_2015(Item):
    """2015 NFL player container for scraped data"""
    name = Field()
    number = Field()
    team = Field()
    position = Field()

class NFL_QB_Game_2015(Item):

class NFL_RB_Game_2015(Item):

class NFL_WR_Game_2015(Item):

class NFL_TE_Game_2015(Item):