class ComicsDataStore
  def self.get_data
    {
      :axe_cop => {
        :page => "http://axecop.com/",
        :img_selector => "//div[@id='comic']/img",
        :name => "Axe Cop"
      },
      :cyanide_and_happiness => {
        :page => "http://explosm.net/comics/latest/",
        :img_selector => "//img[@id='main-comic']",
        :name => "Cyanide & Happiness"
      },
      :dilbert => {
        :page => "http://www.dilbert.com/",
        :img_selector => "//img[@class='img-responsive img-comic']",
        :name => "Dilbert"
      },
      :dinosaur_comics => {
        :page => "http://www.qwantz.com/index.php",
        :img_selector => "//img[@class='comic']",
        :name => "Dinosaur Comics"
      },
      :garfield => {
        :page => "http://garfield.com/comic/",
        :img_selector => "//div[@id='comic_wrap']/img",
        :name => "Garfield"
      },
      :grrl_power => {
        :page => "http://www.grrlpowercomic.com/",
        :img_selector => "//div[@id='comic']/a/img",
        :name => "Grrl Power"
      },
      :penny_arcade => {
        :page => "https://www.penny-arcade.com/comic",
        :img_selector => "//div[@id='comicFrame']/img",
        :name => "Penny Arcade"
      },
      :poorly_drawn_lines => {
        :page => "http://poorlydrawnlines.com/",
        :img_selector => "//div[@class='post']/p/img",
        :name => "Poorly Drawn Lines"
      },
      :saturday_morning_breakfast_cereal => {
        :page => "http://www.smbc-comics.com/",
        :img_selector => "//img[@id='comic']",
        :name => "Saturday Morning Breakfast Cereal"
      },
      :xkcd => {
        :page => "http://xkcd.com/",
        :img_selector => "//div[@id='comic']/img",
        :name => "xkcd"
      }
    }
  end
end
