module Dinamicas
    class Domain
        def process_color_rule sateliteData
            processed = {}
            processed[:temperature] = sateliteData[:temperature]
            processed.merge!({:color => "green"})
            processed.merge!({:color => "yellow"}) if sateliteData[:temperature] > 60
            processed.merge!({:color => "red"}) if sateliteData[:temperature] > 80
            processed
        end
    end
end