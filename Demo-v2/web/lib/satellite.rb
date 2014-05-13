class Satellite

  TEMPERATURE = [45, 57, 68, 90, 85, 20, 60, 80]

  def initialize
  end

  def satelliteData
    [{:name => 'temperature',
     :value => TEMPERATURE.sample}]
  end

end
