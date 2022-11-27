import dados from "./banco_notas.js"

function ver_nota(id){
            db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM NOTAS where id = ?', [id], function (tx, results) {
            
            var titulo = results.rows.item(0).titulo;
            var texto = results.rows.item(0).texto;
            var div = document.getElementById("nota_view");
            div.innerHTML += `fernando lucas`;
            
        })
    })
  }
  