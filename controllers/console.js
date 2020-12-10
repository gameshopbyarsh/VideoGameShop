const getDatabase = require("../db/db").getDatabase;

module.exports.getConsole = async (req, res) => {
  const console_id = req.params.id;
  console.log(console_id)
  const get_q = `SELECT * FROM console WHERE id=${console_id}`;
  console.log(get_q)
  const db = getDatabase();
  const [rows, fields] = await db.promise().query(get_q);
  console.log(rows);
  if (rows.length > 0) {
    res.render("console", { data: rows[0] });
  } else {
    res.redirect("/");
  }
};

module.exports.consoles = async (req, res)=>{
  const consolesPerPage = 12
  const pageno = req.params.page - 1
  const db = getDatabase()
  const [console_ids, fields] = await db.promise().query("SELECT id FROM console ORDER BY id DESC")
  var total_pages = Math.ceil(console_ids.length / consolesPerPage);
  //display consolesPerPage consoles per page

  var consoles = []
  var nextconsoles = console_ids.slice(pageno*consolesPerPage, pageno*consolesPerPage + consolesPerPage)
 
  for(var i = 0;i < nextconsoles.length;i++){
    var getconsole = `SELECT * FROM console WHERE id = ${nextconsoles[i].id}`
    var [console, f] = await db.promise().query(getconsole)
    consoles.push(console[0])

  }

 

  res.render('consoles', {data1:consoles, totalPages:total_pages, currpage:pageno+1})
}
