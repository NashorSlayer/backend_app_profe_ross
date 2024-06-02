import * as bcrypt from 'bcrypt';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;

    async hashPassword(password: string, salt: number): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }


}



