jQuery.chat = (function(usuario) {
	var chatClass = (function(usuario) {
		var lista = new Firebase('https://<db-firebase>.firebaseIO.com/chat/usuarios/');
		var chat = new Firebase('https://<db-firebase>.firebaseIO.com/chat/mensagens/' + usuario.uuid + '/');
		
		this.init = (function() {
			$('.chat-window').css('margin-left', ($("body").width() - 300));
			$('.msg_container_base')[0].scrollTop = $('.msg_container_base')[0].scrollHeight;
			
			chat.on('child_added', function(snap) {
				var mensagem = snap.val();
				
				var msg = null;
				
				var time = date.time({timestamp: mensagem.timestamp});
				if (mensagem.usuario.uuid == usuario.uuid) {
					msg = '<div class="row msg_container base_sent" data-uuid="' + mensagem.uuid + '">' +
					'<div class="col-md-10 col-xs-10 ">' +
					'<div class="messages msg_sent">' +
					'<p>' + mensagem.mensagem + '</p>' +
					'<time datetime="' + time + '">' + time + '</time>' +
					'</div>' +
					'</div>' +
					'<div class="col-md-2 col-xs-2 avatar">' +
					'<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class="img-responsive" />' +
					'</div>' +
					'</div>';
				} else {
					msg = '<div class="row msg_container base_receive" data-uuid="' + mensagem.uuid + '">' +
					'<div class="col-md-2 col-xs-2 avatar">' +
					'<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class="img-responsive" />' +
					'</div>' +
					'<div class="col-xs-10 col-md-10">' +
					'<div class="messages msg_receive">' +
					'<p>' + mensagem.mensagem + '</p>' +
					'<time datetime="' + time + '">' + time + '</time>' +
					'</div>' +
					'</div>' +
					'</div>';
				}
				
				_self.mostrarMensagem(msg);
			});
			
		    $('.chat_input').keypress(function (e) {
		        if (e.keyCode == 13) {
		        	_self.gravarMensagem(this.value);
		            return false;
		        }
		    });
		    
		    $("#btn-chat").click(function() {
		        var mensagem = $(".chat_input").val();
		        _self.gravarMensagem(mensagem);
		    });
		    
		    $(document).on('click', '.panel-heading span.icon_minim', function (e) {
		        var $this = $(this);
		        if (!$this.hasClass('panel-collapsed')) {
		            $this.parents('.panel').find('.panel-body').slideUp();
		            $this.addClass('panel-collapsed');
		            $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
		        } else {
		            $this.parents('.panel').find('.panel-body').slideDown();
		            $this.removeClass('panel-collapsed');
		            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
		        }
		    });
		});
		
		this.gravarMensagem = (function(mensagem) {
			if (!$.isBlank(mensagem)) {
				Mensagem.inserir({ firebase: chat, mensagem: mensagem, usuario: usuario });
				Mensagem.atualizarUsuarioNaLista({ firebase: lista, mensagem: mensagem, usuario: usuario });
			}
	    });
	    
		this.mostrarMensagem = (function(msg) {
	        $('.msg_container_base').append(msg);
	        $('.msg_container_base')[0].scrollTop = $('.msg_container_base')[0].scrollHeight;
			
	        $(".chat_input").val("");
	    });
		
		var _self = this;
	});
	return new chatClass(usuario);
});

// estanciando chat com usuário
// var chat = $.chat({uuid : "<uuid do usuário>", nome: "<nome do usuário>"});
var chat = $.chat({uuid : "1234567890", nome: "Usuário"});
chat.init();