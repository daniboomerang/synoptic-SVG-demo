module Dinamicas
    class Domain
        def process_color_rule satelliteData
            processed = {}
            processed[:temperature] = satelliteData[:temperature]
            processed.merge!({:color => "green"})
            processed.merge!({:color => "yellow"}) if satelliteData[:temperature] > 60
            processed.merge!({:color => "red"}) if satelliteData[:temperature] > 80
            processed
        end
    end
end