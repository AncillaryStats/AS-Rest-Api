from scrapy.spiders import Spider
from scrapy.loader import ItemLoader
from scrapy.loader.processors import Join, MapCompose
from scrapy.utils.response import get_base_url
from urlparse import urljoin
from scrapy.http import Request

from espn_scraper.items import NFL_Team_2015

class EspnSpider(Spider):
    name = 'nfl_team_rosters'
    allowed_domains = ['espn.com', 'espn.go.com']
    start_urls = ['http://espn.go.com/nfl/teams']

    # Follows all links to nfl teams' depth charts
    def parse(self, response):
        base_url = get_base_url(response)

        depth_charts = response.xpath('//a[text()="Depth Chart"]/@href').extract()
        for depth_chart in depth_charts:
            link = urljoin(base_url, depth_chart)
            yield Request(link, callback = self.parse_depth_chart)

    # Follows all links for individual QBs, WRs, TEs, RBs, and FBs on team depth chart
    def parse_depth_chart(self, response):

        rows = response.xpath('//*[@id="my-teams-table"]/div[4]/div[1]/table/tr')
        for row in rows:
            players = row.xpath('td/strong/a | td/a')
            # players = row.xpath('td//a')

            names = players.xpath('text()').extract()
            links = players.xpath('@href').extract()
            cols = row.xpath('td')
            position = cols[0].xpath('text()').extract()[0]

            if position == 'QB' or position == 'WR' or position == 'TE' or position == 'RB' or position == 'FB':
                if len(links) > 0:
                    for link, name in zip(links, names):
                        meta = {
                            'position': position
                        }
                        yield Request(link, callback = self.get_player_info, meta = meta)

    # Follows link to player's game long for most recent year
    # TODO: add argument for year?
    def get_player_info(self, response):
        position = response.meta['position']
