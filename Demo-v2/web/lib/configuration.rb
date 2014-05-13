class Configuration

  def initialize
  end

  def synopticsInformation
    [{:synopticName => 'boxes', :sensibleDataListName => 'randomColors'},
    {:synopticName => 'sum',:sensibleDataListName => 'randomNumbers'},
    {:synopticName => 'thermo', :sensibleDataListName => 'randomTemperature'}]
  end

  def sensibleDataListsInformation
    [{:sensibleDataListName => 'randomColors',
     :propertiesList => [{propertyName: 'sad', propertyValue: 'asd'}]},
    {:sensibleDataListName => 'randomNumbers',
     :propertiesList => [{propertyName: 'sadsa', propertyValue: 'asdas'}]},
    {:sensibleDataListName => 'randomTemperature',
     :propertiesList => [{propertyName: 'thermoColor', propertyValue: 'green'},
                                   {propertyName: 'thermoTemperature', propertyValue: '15'}]}]
  end

  def dynamicsInformation
    {:data => "mockdynamicsInformation"}
  end

end