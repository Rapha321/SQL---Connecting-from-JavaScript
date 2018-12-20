const myArgv = process.argv[2];

const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


knex.select('*').from('famous_people').where('first_name', myArgv).then((results) => {

  var counter = 1;

  console.log('Searching ...');
  console.log('Found ' + results.length + ' person(s) by the name of ' + myArgv);
  for (var x in results){
    console.log("- " + counter + ": " + results[x]['first_name'] + " " + results[x]['last_name'] + ", born " + results[x]['birthdate'].toString().substring(0,15));
    counter ++;
  }
}).finally(() => {knex.destroy()})


