import bcrypt from "bcryptjs"

const hash = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hashedData = await bcrypt.hash(data,salt) 
    return hashedData;
}

export default hash;