# encoding: utf-8
$LOAD_PATH << 'web/lib'
$LOAD_PATH << 'dinamicas/lib'

require 'json'
require 'satelite'
require 'configuration'
require 'dinamicas_domain'

class Services < Sinatra::Base

    attr_accessor :satelite
    attr_accessor :configuration

    get '/satelite/poolData', :provides => :json do
        processed = dinamicas_domain.process_color_rule satelite.sateliteData
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

    def satelite
        @satelite ||= Satelite.new
    end

    def configuration
        @configuration ||= Configuration.new
    end

end
