require_relative '../support/spec_helper'

describe "Obtener informacion de satelite", :js do

	describe "puedo pedir informacion" do
		it "tengo un boton para solicitar info" do
			visit '/'
			page.has_css?('#fetch-satelite-info-btn').should be_true
		end
	end

	describe "cuando pido informacion" do
		it "cuando solicito info se muestran los grados" do
			visit '/'
			page.execute_script('APP.fetchSateliteData();');
			page.has_css?('#grados-container').should be_true
			page.find('#grados-container').text.should eq "60grados"
		end
		it "cuando solicito info consecutivamente se refrescan los grados" do
			visit '/'
			page.execute_script('APP.fetchSateliteData();');
			page.find('#grados-container').text.should eq "60grados"
			page.execute_script('APP.fetchSateliteData();');
			page.find('#grados-container').text.should eq "85grados"
		end
	end

	describe "mostrar color dependiendo de los grados" do
		it "cuando los grados son mayor que 60 el color es amarillo" do
			visit '/'
			page.execute_script('APP.fetchSateliteData();');
			page.has_css?('#color-container.yellow').should be_true
		end
		it "cuando los grados son mayor que 80 el color es rojo" do
			visit '/'
			page.execute_script('APP.fetchSateliteData();');
			page.execute_script('APP.fetchSateliteData();');
			page.has_css?('#color-container.red').should be_true
		end
		it "cuando los grados son menor que 60 el color es verde" do
			visit '/'
			page.execute_script('APP.fetchSateliteData();');
			page.execute_script('APP.fetchSateliteData();');
			page.execute_script('APP.fetchSateliteData();');
			page.has_css?('#color-container.green').should be_true
		end
	end
end
