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
              document.getElementById("nota_list").innerHTML += `<div class="nota" style=" background-color: ${results.rows.item(i).cor};" onclick="ver_nota(${results.rows.item(i).id});">
              <p class="text-center"><b>${results.rows.item(i).titulo}</b></p>
              <p class="">${results.rows.item(i).texto}</p>
              </div>`
            }
            
          });
    })
    
}

listarNotas();  


function ver_nota(id){
  db.transaction(function (tx) {
  tx.executeSql('SELECT * FROM NOTAS where id = ?', [id], function (tx, results) {
  
  var titulo = results.rows.item(0).titulo;
  var texto = results.rows.item(0).texto;
  var cor = results.rows.item(0).cor;
  
  
  localStorage.setItem('titulo', titulo);
  localStorage.setItem('texto', texto);
  localStorage.setItem('cor', cor);
  localStorage.setItem('id', id);

  window.location.assign('editar.html');
  
})
})
}


