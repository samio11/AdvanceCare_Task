import { model, Schema } from "mongoose";
import { IRole, IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, min: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userImage: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: Object.values(IRole),
        message: "{VALUE} is not a valid role",
      },
      default: IRole.customer,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT));
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<IUser>("User", userSchema);
