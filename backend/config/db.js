const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MONGODB CONNECTION");
  } catch (err) {
    console.error("error connecting to mongodb", err);
    process.exit(1);
  }
};
module.exports = connectDB;

///

// jayse jab forntend se data bhjatae hian

// const data = {
//   name: "tj",
// };

// JSON.stringify(data); //yeah server ko bhajte hian is format main "{"name":"tj"}" //ayse bjata server
//phir server isse json main convert kr deta hian phir server isse dubrat wapis original form kr leta hian
// {
//   name: "tj",
// };
//samjh aya kya tj dikhne m to same hih hahahaa kya yeah kya haese kese phele string hian laga ok ok vse server ko ky ese chahiye hota h sidha sidha ku ni leta
//acha sidha kuch hian kya jo server bhi sidha len are logically puch rhi hu are nahi tj string ko modify nahi kiya ja sakta  mtlb jab data FE se BE ata hian aur bhi bahut se tarike hian data ko bhajne ka abhi maan ligiye ayse hi kaam krta hain ok v
