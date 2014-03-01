module Dinamicas
    class Domain
        def procesar_regla_color datosSatelite
            procesado = {}
            procesado[:grados] = datosSatelite[:grados]
            procesado.merge!({:color => "green"})
            procesado.merge!({:color => "yellow"}) if datosSatelite[:grados] >= 60
            procesado.merge!({:color => "red"}) if datosSatelite[:grados] >= 80
            procesado
        end
    end
end