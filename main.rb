require 'sinatra'
require 'nokogiri'
require 'open-uri'
require './data/comics_data_store'

get '/' do
  erb :index, :locals => { :comic_data => ComicsDataStore.get_data }
end

get '/comic/:id' do
  comic_id = params[:id]
  erb :comic, :locals => { :image_node => image_node(comic_id), :comic_name => ComicsDataStore.get_data[comic_id.to_sym][:name] }
end

def image_node(id)
  comic = ComicsDataStore.get_data[id.to_sym]

  page_content = open(comic[:page]).read
  doc = Nokogiri::HTML(page_content)

  if comic.has_key?(:newest_comic_link_selector)
    newest_comic_location = URI::join(comic[:page], doc.xpath(comic[:newest_comic_link_selector])[0]['href'])

    page_content = open(newest_comic_location).read
    doc = Nokogiri::HTML(page_content)
  end

  img_node = doc.xpath(comic[:img_selector])[0]
  img_node['src'] = URI::join(comic[:page], img_node['src'])

  img_node.to_s
end
