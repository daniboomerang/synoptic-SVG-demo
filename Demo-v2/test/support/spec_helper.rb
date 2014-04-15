ENV['RACK_ENV'] = 'test'

require 'rack/test'
require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'
require 'capybara-webkit'
require 'bundler/setup'

Capybara.app = eval "Rack::Builder.new {( " + File.read(File.dirname(__FILE__) + '/../../config.ru') + "\n )}"
Capybara.javascript_driver = :webkit

RSpec.configure do |config|
  config.mock_with :rspec

  config.before :each do
    dummy_satelite
  end

  config.after :each do
  end

  config.include Capybara::DSL

  config.treat_symbols_as_metadata_keys_with_true_values = true

end

def dummy_satelite
    fake_satelite = double()
    allow(fake_satelite).to receive(:datosSatelite).and_return({:grados => 60}, {:grados => 85}, {:grados => 45})
    Services.any_instance.stub(:satelite).and_return fake_satelite
end

def selector string
  find :css, string
end

