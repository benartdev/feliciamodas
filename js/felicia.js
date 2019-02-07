jQuery(function($){
	$(document).ready(function(){
		// Abre menu responsivo
		$('#toggle-button').on('click', function(){
			$('#fl-menu-container').toggleClass('opened');
		});

		// Fecha menu responsivo
		$('#close-button').on('click', function(){
			$('#fl-menu-container').toggleClass('opened');
		});

		// Inicia carrossel
		$('#fl-banner-carousel-inner').slick({
	    	infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        autoplay: true,
	        arrows: true,
	        prevArrow: '<i class="fas fa-chevron-circle-left"></i>',
	        nextArrow: '<i class="fas fa-chevron-circle-right"></i>',
	        mobileFirst: true,
	        swipe: true,
	        dots: true
	    });

	    // Muda tab
	    $('#fl-account-menu-container li:not(:last-child) a').on('click', function(e){
	    	e.preventDefault();
	    	var target = $(this).attr('href');
	    	var hash = target.split('#'); // get the hash-part
			if(hash.length > 1) location.hash = hash[1]; // rewrite the url
	    	console.log(target);
	    	$('#fl-account-menu-container li a').removeClass('active');
	    	$(this).addClass('active');
	    	$('.fl-account-tab').removeClass('active');
	    	$('div'+target).addClass('active');
	    });

	    //CEP
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

		// Inicia imagens produtos
		$('.fl-prod-list-image-carousel').slick({
	    	infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        autoplay: false,
	        arrows: true,
	        prevArrow: '<i class="fas fa-chevron-circle-left"></i>',
	        nextArrow: '<i class="fas fa-chevron-circle-right"></i>',
	        mobileFirst: true,
	        swipe: true,
	        dots: true
	    });

	    // Altera order
	    $('#fl-filter-order').on('change', function(){
	    	var $data = $(this).val();
	    	console.log($data);
	    	$('#fl-filter-form').find('[name="filter_order"]').val($data);

	    	$('#fl-filter-form').submit();
	    });

	    // Altera categoria
	    $('#fl-filter-cat').on('change', function(){
	    	var $data = $(this).val();
	    	console.log($data);
	    	$('#fl-filter-form').find('[name="filter_cat"]').val($data);

	    	$('#fl-filter-form').submit();
	    });

	    // Busca interna {
	    $('#fl-search-fake').on('submit', function(e){
	    	e.preventDefault();
	    	var $data = $(this).find('input[type="text"]').val();
	    	$('#fl-filter-form').find('[name="s"]').val($data);

	    	$('#fl-filter-form').submit();
	    });
	    

	    // Paginação
	    $('.pass_page').on('click', function(){
	    	var $page = parseInt($(this).html());
	    	$('#fl-filter-form').find('[name="p"]').val($page);

	    	$('#fl-filter-form').submit();
	    });
	    $('[data-prev]').on('click', function(){
	    	var $page = parseInt($(this).data('prev'));
	    	$('#fl-filter-form').find('[name="p"]').val($page);

	    	$('#fl-filter-form').submit();
	    });
	    $('[data-next]').on('click', function(){
	    	var $page = parseInt($(this).data('next'));
	    	$('#fl-filter-form').find('[name="p"]').val($page);

	    	$('#fl-filter-form').submit();
	    });

	    // Scroll cart
	    $('#fl-cart-products').slimScroll({
	    	height: '75%',
	    	railOpacity: 0.8
	    });

	    // Apagar item do carrinho
	    $(document).on('click', '.fl-cart-prod-info a', function(e){
	    	e.preventDefault();

	    	var action = $(this).attr('href');
	    	var obj = new Object();
				obj.id = $(this).data('item');
	    	var $line = $(this).parents('.fl-cart-product-block');
	    	var $valor = parseFloat($(this).data('valor'));
	    	var $subtotal = parseFloat($('input[name="subtotal"]').val());

	    	var $novo = $subtotal - $valor;

	    	swal({
				title: 'Atenção!',
				text: 'Tem certeza que deseja excluir esse produto do carrinho?',
				type: 'warning',
				confirmButtonColor: '#6a4aff',
				confirmButtonText: 'Excluir',
				showCancelButton: true
			},
				function(){
					$(this).ajaxSubmit({
						type: 'post',
						url: action,
						async : true,
						data: obj,
						success: function(json){
							var $cart = parseInt($('#cart-qtd').html());
							$cart = $cart - 1;
							$('#cart-qtd').html($cart);

							if ( json.redirect ){
								$line.remove();
								$('#fl-cart-subtotal').hide();
								$('#fl-cart-redirect').hide();
								$('#fl-cart-products').html('<p class="text-center">O carrinho está vazio</p>');
							} else {
								$('#fl-cart-subtotal').find('h4').find('span').html($novo);
								$line.remove();
							}
						},
						error: function(xhr, ajaxOptions, thrownError){
							toastr.error('Erro ao processar os dados');
						}
					});
					return false;
				}
			);
	    });

	    // Abre carrinho
	    $('.open-cart').on('click', function(){
	    	$('#fl-cart-window').fadeIn();
	    	$('#fl-cart-container').toggleClass('toggled');
	    });

	    // Fecha carrinho
	    $('#cart-close').on('click', function(){
	    	$('#fl-cart-container').toggleClass('toggled');
	    	$('#fl-cart-window').fadeOut();
	    });

	    // Toogle Simular frete
	    $('#fl-toggle-frete').on('click', function(){
	    	$('#fl-frete-block').slideToggle();
	    	$('#fl-retorno-frete').empty();
	    });

	    // Toggle checkout
	    $('.fl-final-toggle').on('click', function(e){
	    	e.preventDefault();
	    	var $block = $(this).parents('.fl-final-block');
	    	$block.find('.fl-final-done').removeClass('active');
	    	$block.find('.fl-final-todo').addClass('active');
	    });

	    // Toggle voltar
	    $('.fl-checkout-voltar').on('click', function(e){
	    	e.preventDefault();
	    	var $block = $(this).parents('.fl-final-block');
	    	$block.find('.fl-final-todo').removeClass('active');
	    	$block.find('.fl-final-edit').removeClass('active');
	    	$block.find('.fl-final-done').addClass('active');
	    });

	    // Atualiza frete
	    $('[name="fl-endereco"]').on('change', function(){
	    	var $end = $(this).val();
	    	var $val = $(this).parent().find('[name="endereco_user_frete"]').val();
	    	console.log($(this).parent().find('[name="endereco_final-url"]').val());
	    	var obj = new Object();
	    		obj.user_cepf = $val;
	    	$(this).ajaxSubmit({
				dataType : "json",
				type : 'post',
				url : $(this).parent().find('[name="endereco_final-url"]').val(),
				data: obj,
				beforeSend: function(){
					$('body').addClass('onprogress');
					$('#fl-third-done .fl-final-block-info').hide().empty();
					$('#fl-checkout-resume-info-frete').hide();
					$('.fl-checkout-resume-info-block.total').find('p').last().html('R$ ' + parseFloat($('[name="subtotal"]').val()));
					$('[name="pedido_endereco"]').val($end);
					$('[name="pedido_valorfrete"]').val();
	    			$('[name="pedido_codfrete"]').val();
	    			$('[name="pedido_tempo_frete"]').val();
				},
				success : function(json) {
					$('body').removeClass('onprogress');
					console.log(json);
					var $fab = parseInt($('[name="fab"]').val());
					$.each(json, function(i,v){
						var $prazo = $fab + parseInt(json[i].prazo[0]);
						$('#fl-third-done .fl-final-block-info').append('<div class="fl-checkout-frete-forma"><input type="hidden" name="forma_pedido_valorfrete" value="'+ json[i].valor[0].replace(',','.') +'"><input type="hidden" name="forma_pedido_tempo_frete" value="'+$prazo+'"><input id="forma'+i+'" type="radio" value="'+json[i].codigo[0]+'" name="fl-frete-modo"> <label for="forma'+i+'">'+json[i].codigo[0]+'<p>Entrega em até '+$prazo+' dias úteis</p><span>R$'+json[i].valor[0]+'</span></label></div>');
					});
					$('#fl-third-done .fl-final-block-info').fadeIn();
				},
				error : function(e) {
					$('body').removeClass('onprogress');
					//$(this).show_notification({title: 'Error ao processar os dados', msg: e, type: 'danger'});
					toastr.error('Erro ao processar dados');
				}
			});
			return false;
	    });

	    $(document).on('change', '.fl-checkout-frete-forma [name="fl-frete-modo"]', function(){
	    	var $block = $(this).parent();
	    	var $frete = parseFloat($block.find('[name="forma_pedido_valorfrete"]').val());
	    	var $prazo = $block.find('[name="forma_pedido_tempo_frete"]').val();
	    	var $codigo = $(this).val();
	    	var $subtotal = parseFloat($('[name="subtotal"]').val());

	    	var $novofrete = $subtotal + $frete;

	    	$('#fl-checkout-resume-info-frete').find('p').last().html('R$' + $frete.toString().replace('.',','));
	    	$('#fl-checkout-resume-info-frete').show();
	    	$('.fl-checkout-resume-info-block.total').find('p').last().html('R$ ' + $novofrete.toString().replace('.',','));

	    	$('[name="pedido_valorfrete"]').val($frete);
	    	$('[name="pedido_codfrete"]').val($codigo);
	    	$('[name="pedido_tempo_frete"]').val($prazo);
	    });

	    $('[name="fl-metodo"]').on('change', function(){
	    	var $tipo = $(this).val();
	    	$('[name="pedido_tp_pag"]').val($tipo);
	    });

	    $('.fl-avaliacao-nota input[type="radio"]').on('change', function(){
	    	var $valor = $(this).val();
	    	if ( $valor < 5 ){
	    		$('.fl-avaliacao-sugestao').show();
	    	} else {
	    		$('.fl-avaliacao-sugestao').hide();
	    	}
	    });

	    // Toggle minha conta pedidos
	    $('.fl-toggle-pedido').on('click', function(){
	    	var $block = $(this).parents('.fl-account-block');
	    	$block.find('.fl-account-pedidos').slideToggle();
	    });

	    // fixa menu lateral
	    function onScroll(event){
	    	var scrollPos = $(document).scrollTop();
	    	var menu = $('#fl-account-menu');
	    	var footerPos = $('footer').position().top;
	    	var menuPos = menu.position().top;

	    	console.log(scrollPos);
	    	console.log(footerPos);

	    	if ( scrollPos > menuPos + 180 ){
	    		menu.addClass('fixed');
	    	} else {
	    		menu.removeClass('fixed');
	    	}

	    	if ( scrollPos > footerPos - 300 ){
	    		menu.removeClass('fixed');
	    	} else if ( scrollPos > menuPos + 180 ) {
	    		menu.addClass('fixed');
	    	} else {
	    		menu.removeClass('fixed');
	    	}
	    }

	    $(document).on('scroll', onScroll);

	    // Conta caracteres
	    $('[name="avai_text"]').on('keyup', function(){
	    	var $length = $(this).val().length;
	    	console.log($length);
	    	$('#fl-char-count').html($length);
	    });
	});
})