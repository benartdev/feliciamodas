/*
*	Função para poder validar todos os tipos de formulários
*	é utilizada como uma segunda contingência de dados
*/
$(function($) {
	 "use strict";
	/**
	 * Validação de formulários em geral para área administrativa
	 */
	 $('form').not('.no-validate').each(function(key, form) {
	 	$(form).data('validator', $(form).validate({
	 		ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
	        errorClass: 'validation-error-label',
	        successClass: 'validation-valid-label',
	 		highlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
	        },
	        unhighlight: function(element, errorClass) {
	            $(element).removeClass(errorClass);
	        },
	 		errorPlacement: function(error, element) {
	            // Styled checkboxes, radios, bootstrap switch
	            if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
	                if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
	                    error.appendTo( element.parent().parent().parent().parent() );
	                }
	                 else {
	                    error.appendTo( element.parent().parent().parent().parent().parent() );
	                }
	            }

	            // Unstyled checkboxes, radios
	            else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
	                error.appendTo( element.parent().parent().parent() );
	            }

	            // Input with icons and Select2
	            else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
	                error.appendTo( element.parent() );
	            }

	            // Inline checkboxes, radios
	            else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
	                error.appendTo( element.parent().parent() );
	            }

	            // Input group, styled file input
	            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
	                error.appendTo( element.parent().parent() );
	            }

	            else {
	                error.insertAfter(element);
	            }
	        },
	        validClass: "validation-valid-label",
	        success: function(label) {
	            // label.addClass("validation-valid-label").text("Success.")
	            label.remove();
	        }
	 	}));
	 });

	 $('[data-rules]').each(function(key, el){
	 	$(el).rules('add', $(el).data('rules'));
	 });

	 /**
	 * Edição básica / Envia dados de um objeto para o formulário
	 */
	 // $('[data-edit]').click(function() {
	 // 	var $el = $(this).closest('[data-' + $(this).data('edit') + ']');
	 // 	var object = $el.data($(this).data('edit'));
	 // 	$('[name]', $(this).data('form')).each(function(key, val) {
	 // 		var value = object[$(val).attr('name')];
	 // 		if (value) {
	 // 			if ($(val).is('.txtKeywords')) {
	 // 				$(val).select2({
	 // 					tags : [value],
	 // 					tokenSeparators : [',', ' '],
	 // 				});
	 // 				$(val).select2("val", [value]);
	 // 			} else if ($(val).is('.ckeditor')) {
	 // 				$(val).ckeditorGet().setData(value);
	 // 			} else if ($(val).is('.input-file')) {
  //   				$('#imageFake').html('<img src="/assets/images/'+value+'" />');
	 // 				$(val).data('image', value);
	 // 			}
	 // 			else if(!$(val).is('.radio')) {
	 // 				$(val).val(value);
	 // 			}
	 // 		}
	 // 	});
	 // });
});

/**
 *  [required 	Variável criada para poder realizar a tradução nativa do Jquery Validate]
 *  @type {String}
 */
$.extend($.validator.messages, {
	required: "Obrigatório.",
	remote: "Por favor, corrija este campo.",
	email: "Por favor, forne&ccedil;a um endere&ccedil;o de email v&aacute;lido.",
	url: "Por favor, forne&ccedil;a uma URL v&aacute;lida.",
	date: "Por favor, forne&ccedil;a uma data v&aacute;lida.",
	dateISO: "Por favor, forne&ccedil;a uma data v&aacute;lida (ISO).",
	number: "Por favor, forne&ccedil;a um n&uacute;mero v&aacute;lido.",
	digits: "Por favor, forne&ccedil;a somente d&iacute;gitos.",
	creditcard: "Por favor, forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.",
	equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente.",
	extension: "Por favor, forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.",
	maxlength: $.validator.format("Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres."),
	minlength: $.validator.format("Por favor, forne&ccedil;a ao menos {0} caracteres."),
	rangelength: $.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento."),
	range: $.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1}."),
	max: $.validator.format("Por favor, forne&ccedil;a um valor menor ou igual a {0}."),
	min: $.validator.format("Por favor, forne&ccedil;a um valor maior ou igual a {0}."),
	nifES: "Por favor, forne&ccedil;a um NIF v&aacute;lido.",
	nieES: "Por favor, forne&ccedil;a um NIE v&aacute;lido.",
	cifEE: "Por favor, forne&ccedil;a um CIF v&aacute;lido.",
	postalcodeBR: "Por favor, forne&ccedil;a um CEP v&aacute;lido.",
	cpfBR: "Por favor, forne&ccedil;a um CPF v&aacute;lido."
});