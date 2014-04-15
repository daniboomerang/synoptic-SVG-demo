require 'sinatra/base'
require 'sinatra/contrib'

$LOAD_PATH.push(File.expand_path(File.join(File.dirname(__FILE__), '../')))

class Web < Sinatra::Base

  use Rack::Session::Cookie, secret: 'change_me'

  configure do
    set :run, false
    set :public_folder, './web/public'
    set :static, true
  end

  #get '/' do
  #  erb :index, :layout => :home_layout
  #end

  # Redirecting to the Angular Application
  get '/' do
    redirect '/index.html'
  end

  #get '/monitor' do
  #  redirect '/app/modules/monitor/index.html'
  #end

end
