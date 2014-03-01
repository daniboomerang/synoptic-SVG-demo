# encoding: utf-8
$LOAD_PATH << 'web/lib'
$LOAD_PATH << 'dinamicas/lib'

require 'json'
require 'satelite'
require 'dinamicas_domain'

class Services < Sinatra::Base

    attr_accessor :satelite

    post '/satelite/dameDatos', :provides => :json do
        procesados = dinamicas_domain.procesar_regla_color satelite.datosSatelite
        procesados.to_json
    end

    def dinamicas_domain
        @dinamicas_domain ||= Dinamicas::Domain.new
    end

    def satelite
        @satelite ||= Satelite.new
    end

end
