import mongoose from 'mongoose';

const db_type = "mongodb";
const user_name = "utilisateur";
const user_password = "supermotdepasse";
const host = "localhost";
const port = 27017;
const db_name = "loto"

mongoose.connect(`${db_type}://${host}:${port}/${db_name}`, {
  keepAlive: true,
  readPreference: "primary"
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, `⚠️ Error during database connexion ! ⚠️ \n `));
db.once('open', () => {
  console.log(`⚡ connected to database ${db_name} on ${host} with Success ! ⚡`);
});