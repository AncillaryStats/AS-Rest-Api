from scrapy.item import Item, Field

class NFL_Team_2015(Item):
    """ 2015 NFL team container for scraped data"""
    name = Field()
    division = Field()

class NFL_Player_2015(Item):
    name = Field()
    number = Field()
    team = Field()
    position = Field()