require 'rspec'

require_relative '../../lib/dinamicas_domain'

describe "Dinamicas Domain" do
    describe "procesa los grados para decidir el color" do

        before do
            @domain = Dinamicas::Domain.new
        end

        it "si mas de 80 rojo" do
            result = @domain.process_color_rule( {:temperature => 85} )
            result[:color].should eq "red"
        end

        it "si mas de 60 amarillo" do
            result = @domain.process_color_rule( {:temperature => 65} )
            result[:color].should eq "yellow"
        end

        it "si menos de 60 verde" do
            result = @domain.process_color_rule( {:temperature => 10} )
            result[:color].should eq "green"
        end
    end  
end