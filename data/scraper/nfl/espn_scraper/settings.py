
SPIDER_MODULES = ['espn_scraper.spiders']

DATABASE = {
    'drivername': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'username': 'arosenberg',
    'database': 'nfl_test_1'
}

ITEM_PIPELINES = {
    'espn_scraper.pipelines.NFL_Team_2015_Pipeline': 100
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See http://doc.scrapy.org/en/latest/topics/autothrottle.html
# NOTE: AutoThrottle will honour the standard settings for concurrency and delay
AUTOTHROTTLE_ENABLED=True
# The initial download delay
AUTOTHROTTLE_START_DELAY=3

DOWNLOAD_DELAY=2