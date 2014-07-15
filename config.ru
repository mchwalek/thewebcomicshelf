require './main'
require './rack_middleware/uglify_js'
require 'sass/plugin/rack'

use RackMiddleware::UglifyJs
use Sass::Plugin::Rack
Sass::Plugin.options[:style] = :compressed
Sass::Plugin.options[:template_location] = './app/stylesheets'
Sass::Plugin.options[:css_location] = './public/stylesheets'

run Sinatra::Application