import {compare, compareSync, genSaltSync, hashSync} from 'bcryptjs';

export class HashManager {
    createHash = (input: string): string => {
        const salt = genSaltSync(12);
        const inputText = hashSync(input, salt);
        return inputText;
    }

    compareHash = (input: string, inputTextHashed: string) => {
        return compareSync(input, inputTextHashed);
    }
}