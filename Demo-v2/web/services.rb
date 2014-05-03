# encoding: utf-8
$LOAD_PATH << 'web/lib'
$LOAD_PATH << 'dinamicas/lib'

require 'json'
require 'satellite'
require 'configuration'
require 'dinamicas_domain'

class Services < Sinatra::Base

    attr_accessor :satellite
    attr_accessor :configuration

    get '/satellite/poolData', :provides => :json do
        processed = dinamicas_domain.process_color_rule satellite.satelliteData
        processed.to_json
    end

    get '/configuration/loadSynopticsData', :provides => :json do
            sleep 6

        processed = configuration.synopticsInformation
        processed.to_json
    end

    get '/configuration/loadDynamicsData', :provides => :json do
            sleep 2

        processed = configuration.dynamicsInformation
        processed.to_json
    end

    def dinamicas_domain
        @dinamicas_domain ||= Dinamicas::Domain.new
    end

    def satellite
        @satellite ||= Satellite.new
    end

    def configuration
        @configuration ||= Configuration.new
    end

end
