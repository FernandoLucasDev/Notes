var db = openDatabase('Notes', '1.0', 'Note DataBase', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS NOTAS (id integer primary key, titulo, texto, cor)');
    //tx.executeSql('DROP TABLE  NOTAS');
    //tx.executeSql('INSERT INTO NOTAS (titulo, texto, cor) VALUES ("Nota 1", "corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo corpo", "#fff")');
    //tx.executeSql('delete from NOTAS where titulo = Nota1');
  });
    
  function nova_nota(){
    ptitulo = document.getElementById("titulo_nota").value;
    pcorpo = document.getElementById("corpo_nota").value;
    pcor = document.getElementById("cor_nota").value;
    db.transaction(function (tx) {
         var sql = "Insert into NOTAS (titulo, texto, cor) values (?,?,?)";
                tx.executeSql(sql, [ptitulo,pcorpo,pcor]); 
      })
    window.location.assign('notas.html')
}       
  
function listarNotas(){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM NOTAS', [], function (tx, results) {
            var len = results.rows.length, i;
            var id = 0;
            for (i = 0; i < len; i++) {
              document.getElementById("nota_list").innerHTML += `<div class="nota" style=" background-color: ${results.rows.item(i).cor};" onclick="dadosNota(${results.rows.item(i).id});" class="">
              <p class="text-center"><b>${results.rows.item(i).titulo}</b></p>
              <p class="">${results.rows.item(i).texto}</p>
              </div>`
            }
          });
    })
    
}    

       

function ver_nota(id){
  window.location.assign('editar.html');
  db.transaction(function (tx) {
    
      tx.executeSql('SELECT * FROM NOTAS where id = ?', [id], function (tx, results) {
         var titulo = results.rows.item(0).titulo;
         var texto = results.rows.item(0).texto;
         var titulo_html = document.getElementById("titulo_nota_edit");
         var texto_html = document.getElementById("text_nota_edit");

         titulo_html.innerHTML = titulo;
         texto_html.innerHTML = texto;
        
      })
  })
  
}
