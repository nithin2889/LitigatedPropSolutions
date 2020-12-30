import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// we use the bcrypt to compare the plain text entered password to
// the one in the DB that is hashed.
userSchema.methods.matchPassword = async function (enteredPassword) {
  // We call the method matchPassword on that specific user and so
  // we can access that password using `this.password`.
  return await bcrypt.compare(enteredPassword, this.password);
};

// pre-save middleware to encrypt the password before saving to DB while registering a new user.
userSchema.pre("save", async function (next) {
  // checking if something is not modified (mongoose) or added or sent
  if (!this.isModified("password")) {
    // if not modified we move on.
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
