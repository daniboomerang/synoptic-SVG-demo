require 'rack/test'

require_relative '../support/spec_helper'

describe 'Obtener info service' do

	include Rack::Test::Methods

	def app
		@app ||= Capybara.app
	end

  it 'devuelve un json con los datos del satelite' do
    post '/services/satelite/poolData'
    resp_json = JSON.parse last_response.body

    resp_json["temperature"].should_not be_nil
  end

  it 'cuando los grados son mas de 60 el color es amarillo' do
    post '/services/satelite/poolData'
    resp_json = JSON.parse last_response.body

    resp_json["temperature"].should eq 60
    resp_json["color"].should eq "yellow"
  end

  it 'cuando los grados son mas de 80 el color es rojo' do
    post '/services/satelite/poolData'
    post '/services/satelite/poolData'
    resp_json = JSON.parse last_response.body

    resp_json["temperature"].should eq 85
    resp_json["color"].should eq "red"
  end

  it 'cuando los grados son menos o igual de 60 el color es verde' do
    post '/services/satelite/poolData'
    post '/services/satelite/poolData'
    post '/services/satelite/poolData'
    resp_json = JSON.parse last_response.body

    resp_json["temperature"].should eq 45
    resp_json["color"].should eq "green"
  end

end
