var Mensagem = {
    inserir: (function(dado) {
        var uuid = Math.uuid(25, 10);
        
        dado.firebase.push({ uuid: uuid, usuario: dado.usuario, mensagem: dado.mensagem, timestamp: Firebase.ServerValue.TIMESTAMP });
        dado["uuid"] = uuid;
        return dado;
    }),
    
    atualizarUsuarioNaLista: (function(dado) {
        var usuario = {};
        usuario[dado.usuario.uuid] = {};
        usuario[dado.usuario.uuid]['uuid'] = dado.usuario.uuid;
        
        if (dado.visualizado == null) {
            usuario[dado.usuario.uuid]['visualizado'] = false;
        } else {
            usuario[dado.usuario.uuid]['visualizado'] = dado.visualizado;
        }
        
        if (dado.usuario.nome != null) {
            usuario[dado.usuario.uuid]['nome'] = dado.usuario.nome;
        }
        
        if (dado.mensagem != null) {
            usuario[dado.usuario.uuid]['mensagem'] = dado.mensagem;
        }
        
        dado.firebase.update(usuario);
    })
};