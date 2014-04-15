require File.join(File.dirname(__FILE__), 'web/app.rb')
require File.join(File.dirname(__FILE__), 'web/services.rb')

map "/" do
   run Web
end

map "/services" do
    run Services
end

