from scrapy.item import Item, Field

class NFL_Team_2015(Item):
    """ 2015 NFL team container for scraped data"""
    name = Field()
    division = Field()
