var admin = {uuid: "g6technology", nome: "G6 | Technology"};
var lista = new Firebase('https://<db-firebase>.firebaseIO.com/chat/usuarios/');

jQuery.chatPainel = (function(usuario) {
	var Class = (function(usuario) {
        var chat = new Firebase('https://<db-firebase>.firebaseIO.com/chat/mensagens/' + usuario.uuid + '/');
		
        this.init = (function() {
            $('.msg-wrap')[0].scrollTop = $('.msg-wrap')[0].scrollHeight;
            
			$('textarea').keypress(function (e) {
                if (e.keyCode == 13) {
					_self.gravarMensagem(this.value);
                    return false;
                }
            });
            
            $("#send-message").click(function() {
                var mensagem = $("textarea").val();
                _self.gravarMensagem(mensagem);
            });
			
			$("#remove-message").click(function() {
				Mensagem.excluir({ firebase: chat });
				Mensagem.excluir({ firebase: (new Firebase('https://<db-firebase>.firebaseIO.com/chat/usuarios/' + usuario.uuid + '/')) });
				var href = document.location.href;
				window.location = href.substring(0, href.indexOf("?"));
            });
            
            chat.on('child_added', function(snap) {
                var mensagem = snap.val();
				var time = date.getFormat({"dd/mm/yyyy hh:mm:ss": date.create({timestamp: mensagem.timestamp})});
                _self.mostrarMensagem(mensagem, time, {uuid: mensagem.usuario.uuid, nome: mensagem.usuario.nome});
            });
            
            lista.on('child_added', function(snap) {
                var usuario = snap.val();
                
                var user = '<div class="media conversation" data-uuid="' + usuario.uuid + '">' +
                           '<a class="pull-left" href="?' + usuario.uuid + '=' + usuario.nome + '">' +
                           '<img class="media-object" alt="' + usuario.nome + '" style="width: 50px; height: 50px;" src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" />' +
                           '</a>' +
                           '<div class="media-body">' +
                           '<a class="pull-left ' + ((usuario.visualizado) ? 'visualizado' : '') + '" href="?' + usuario.uuid + '=' + usuario.nome + '" title="' + usuario.nome + '">' +
                           '<h5 class="media-heading">' + usuario.nome + '</h5>' +
                           '<small>' + usuario.mensagem + '</small>' +
                           '</a>' +
                           '</div>' +
                           '</div>';
                
                $('.conversation-wrap').prepend(user);
                $('.conversation-wrap')[0].scrollTop = 0;
            });
            
            lista.on('child_changed', function(snap, prevChildKey) {
                var usuario = snap.val();
                
                $(".conversation-wrap div").each(function(i) {
                    var uuid = $(this).attr("data-uuid");
                    if (usuario.uuid == uuid) {
                        $(this).find(".media-body a small").empty().append(usuario.mensagem);
                        if ($(this).find(".media-body a").hasClass("visualizado")) {
                            $(this).find(".media-body a").removeClass("visualizado");
                        }
                        
                        $(this).prependTo($(".conversation-wrap"));
                    }
                });
            });
        });
        
        this.gravarMensagem = (function(mensagem) {
			if (!$.isBlank(mensagem)) {
				Mensagem.inserir({ firebase: chat, mensagem: mensagem, usuario: admin });
			}
        });
        
        this.mostrarMensagem = (function (mensagem, time, usuario) {
            var msg = '<div class="media msg" data-uuid="' + mensagem.uuid + '">' +
            		  '<a class="pull-left" href="#">' +
            		  '<img class="media-object" alt="Avatar" style="width: 32px; height: 32px;" src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" />' +
            		  '</a>' +
            		  '<div class="media-body">' +
            		  '<small class="pull-right time"><i class="fa fa-clock-o"></i> ' + time + '</small>' +
            		  '<h5 class="media-heading">' + usuario.nome + '</h5>' +
            		  '<small class="col-lg-10">' + mensagem.mensagem + '</small>' +
            		  '</div>' +
            		  '</div>';
            
            $('.msg-wrap').append(msg);
            $('.msg-wrap')[0].scrollTop = $('.msg-wrap')[0].scrollHeight;
    
            $("textarea").val("");
        });
        
        var _self = this;
    });
    
    return new Class(usuario);
});

var usuario = document.location.search;
if (usuario != null && usuario != "") {
    usuario = usuario.replace("?", "").split("=");
    Mensagem.atualizarUsuarioNaLista({ firebase: lista, usuario: {uuid: usuario[0], nome: decodeURI(usuario[1])}, mensagem: "", visualizado: true });
} else {
    usuario = ["G6", "G6 | Technology"];
}
var chatPainel = $.chatPainel({uuid: usuario[0], nome: usuario[1]});
chatPainel.init();