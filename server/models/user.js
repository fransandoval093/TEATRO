// User Schema to be used when ready

// const { Schema, model } = require("mongoose");
// const watchlist = require("./List");
// const bcrypt = require("bcrypt");

// const userSchema = new Schema({
//   first_name: {
//     type: String,
//     required: True,
//   },
//   last_name: {
//     type: String,
//     required: True,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/.+@.+\..+/, "Must use a valid email address"],
//   },
//   password: {
//     type: String,
//     require: true,
//     match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/],
//     minLength: 8,
//   },
//   signedRequest: {
//     type: String,
//   },
//   watchlist: [{ type: Schema.Types.ObjectId, ref: "Watchlist" }],
// });

// userSchema.pre("save", async function (next) {
//   if (this.isNew || this.isModified("password")) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const User = model("User", userSchema);

// module.exports = User;
