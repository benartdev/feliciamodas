$(document).ready(function () {
	$('[name="user_cep"]').blur(function(){
		console.log('aqui');
		var cep = $(this).val().replace(/\D/g, '');
		if (cep != '') {
			var validacep = /^[0-9]{8}$/;
			//Valida o formato do CEP.
			if (validacep.test(cep)){
				$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2xICdpFdVdf0Yz43HvwZj0_fvMc_jBGA&address="+cep+"&sensor=true", function(dados) {
					//console.log(dados);
					var obj = JSON.stringify(dados);
					var city = dados['results'][0]['address_components'][2]['long_name'];
					var bairro = dados['results'][0]['address_components'][1]['long_name'];
					var estado = dados['results'][0]['address_components'][3]['short_name'];
					var pais = dados['results'][0]['address_components'][4]['long_name'];
					var lat = dados['results'][0]['geometry']['location']['lat'];
					var lnt = dados['results'][0]['geometry']['location']['lng'];
					
					$('input[name="user_cidade"]').val(city);
					$('input[name="user_bairro"]').val(bairro);
					$('[name="user_estado"]').val(estado);
					$('input[name="user_pais"]').val(pais);
					$('input[name="user_lat"]').val(lat);
					$('input[name="user_lnt"]').val(lnt);
					$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lnt+"&key=AIzaSyB2xICdpFdVdf0Yz43HvwZj0_fvMc_jBGA", function(result) {
						console.log(result);
						var obj2 = JSON.stringify(result);
						var address;
						$.each(result['results'][0]['address_components'], function(i,v){
							console.log(result['results'][0]['address_components'][i]['types'][0]);
							if ( result['results'][0]['address_components'][i]['types'][0] == 'route' ) {
								address = result['results'][0]['address_components'][i]['long_name'];
								return false;
							}
						});
						$('input[name="user_endereco"]').val(address);
					});
				});
			}
		}
	});
	
	$('[name="parc_cep"]').blur(function(){
		console.log('aqui');
		var cep = $(this).val().replace(/\D/g, '');
		if (cep != '') {
			var validacep = /^[0-9]{8}$/;
			//Valida o formato do CEP.
			if (validacep.test(cep)){
				$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2xICdpFdVdf0Yz43HvwZj0_fvMc_jBGA&address="+cep+"&sensor=true", function(dados) {
					//console.log(dados);
					var obj = JSON.stringify(dados);
					var city = dados['results'][0]['address_components'][2]['long_name'];
					var bairro = dados['results'][0]['address_components'][1]['long_name'];
					var estado = dados['results'][0]['address_components'][3]['short_name'];
					var pais = dados['results'][0]['address_components'][4]['long_name'];
					var lat = dados['results'][0]['geometry']['location']['lat'];
					var lnt = dados['results'][0]['geometry']['location']['lng'];
					
					$('input[name="parc_cidade"]').val(city);
					$('input[name="parc_bairro"]').val(bairro);
					$('[name="parc_estado"]').val(estado);
					$('input[name="parc_pais"]').val(pais);
					$('input[name="parc_lat"]').val(lat);
					$('input[name="parc_lnt"]').val(lnt);
					$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lnt+"&key=AIzaSyB2xICdpFdVdf0Yz43HvwZj0_fvMc_jBGA", function(result) {
						console.log(result);
						var obj2 = JSON.stringify(result);
						var address;
						$.each(result['results'][0]['address_components'], function(i,v){
							console.log(result['results'][0]['address_components'][i]['types'][0]);
							if ( result['results'][0]['address_components'][i]['types'][0] == 'route' ) {
								address = result['results'][0]['address_components'][i]['long_name'];
								return false;
							}
						});
						$('input[name="parc_endereco"]').val(address);
					});
				});
			}
		}
	});
	
	$('[name="campus_cep"]').blur(function(){
		var $form = $(this).parents('form');
		var cep = $(this).val().replace(/\D/g, '');
		if (cep != '') {
			var validacep = /^[0-9]{8}$/;
			//Valida o formato do CEP.
			if (validacep.test(cep)){
				$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2xICdpFdVdf0Yz43HvwZj0_fvMc_jBGA&address="+cep+"&sensor=true", function(dados) {
					//console.log(dados);
					var obj = JSON.stringify(dados);
					var city = dados['results'][0]['address_components'][2]['long_name'];
					var bairro = dados['results'][0]['address_components'][1]['long_name'];
					var estado = dados['results'][0]['address_components'][3]['short_name'];
					var pais = dados['results'][0]['address_components'][4]['long_name'];
					var lat = dados['results'][0]['geometry']['location']['lat'];
					var lnt = dados['results'][0]['geometry']['location']['lng'];
					
					$form.find('input[name="campus_cidade"]').val(city);
					$form.find('input[name="campus_bairro"]').val(bairro);
					$form.find('[name="campus_estado"]').val(estado);
					$form.find('input[name="campus_pais"]').val(pais);
					$form.find('input[name="campus_lat"]').val(lat);
					$form.find('input[name="campus_lnt"]').val(lnt);
					$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lnt+"&key=AIzaSyB2xICdpFdVdf0Yz43HvwZj0_fvMc_jBGA", function(result) {
						console.log(result);
						var obj2 = JSON.stringify(result);
						var address;
						$.each(result['results'][0]['address_components'], function(i,v){
							console.log(result['results'][0]['address_components'][i]['types'][0]);
							if ( result['results'][0]['address_components'][i]['types'][0] == 'route' ) {
								address = result['results'][0]['address_components'][i]['long_name'];
								return false;
							}
						});
						$form.find('input[name="campus_endereco"]').val(address);
					});
				});
			}
		}
	});
});



