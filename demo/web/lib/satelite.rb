class Satelite

  TEMPERATURE = [45, 57, 68, 90, 85, 20, 60, 80]

  def initialize
  end

  def sateliteData
    {:temperature => TEMPERATURE.sample}
  end

end
