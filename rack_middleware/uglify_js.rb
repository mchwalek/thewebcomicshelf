require 'uglifier'
require 'digest/md5'

module RackMiddleware
  class UglifyJs
    def initialize(app)
      @app = app
    end

    def call(env)
      cache_changed = false
      cache = deserialize_cache

      Dir.glob('./app/scripts/**/*.js').each do |js_filepath|
        js_file_content = File.read(js_filepath)
        js_file_checksum = Digest::MD5.hexdigest(File.read(js_filepath)).to_s

        cached_checksum = cache[js_filepath]

        if js_file_checksum != cached_checksum
          cache[js_filepath] = js_file_checksum
          cache_changed = true

          uglified_js = Uglifier.new.compile(js_file_content)

          js_filename = File.basename(js_filepath)
          File.write("./public/scripts/#{js_filename}", uglified_js)
        end
      end

      serialize_cache(cache) if cache_changed
      @app.call(env)
    end

    private

    def deserialize_cache
      cache = {}

      if File.exist?('./.uglifier_js_cache/cache')
        File.open('./.uglifier_js_cache/cache', 'r') do |f|
          f.each_line do |line|
            fields = line.split("\t")
            cache[fields[0]] = fields[1].chomp
          end
        end
      end

      cache
    end

    def serialize_cache(cache)
      Dir.mkdir('./.uglifier_js_cache') unless File.exist?('./.uglifier_js_cache')

      File.open('./.uglifier_js_cache/cache', 'w') do |f|
        cache.each do |k, v|
          f.puts([k, v].join("\t"))
        end
      end
    end
  end
end
