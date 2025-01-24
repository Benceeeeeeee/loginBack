import { IsEmail, IsStrongPassword } from "class-validator";
import * as bcrypt from 'bcrypt';

export class CreateUserDto {
    @IsEmail()
    email: string;
    
    @IsStrongPassword()
    password: string;

    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}