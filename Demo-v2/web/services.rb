# encoding: utf-8
$LOAD_PATH << 'web/lib'

require 'json'
require 'satellite'
require 'configuration'

class Services < Sinatra::Base

    attr_accessor :satellite
    attr_accessor :configuration

    get '/satellite/pollData', :provides => :json do
        processed = satellite.satelliteData
        processed.to_json
    end

    get '/configuration/loadSynopticsData', :provides => :json do
            sleep 2

        processed = configuration.synopticsInformation
        processed.to_json
    end

    get '/configuration/loadSensibleListsData', :provides => :json do
            sleep 4

        processed = configuration.sensibleDataListsInformation
        processed.to_json
    end

    get '/configuration/loadDynamicsData', :provides => :json do
            sleep 7

        processed = configuration.dynamicsInformation
        processed.to_json
    end

    def satellite
        @satellite ||= Satellite.new
    end

    def configuration
        @configuration ||= Configuration.new
    end

end
