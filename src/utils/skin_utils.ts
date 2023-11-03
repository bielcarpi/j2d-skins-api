import {ISkin} from "../models/skin.model";
import path from "path";
import {promises as fsPromises} from 'fs';

export const getSkinsFromFile = async (): Promise<ISkin[]> => {
    try {
        const filePath = path.join(__dirname, '../../db.json');
        const data = await fsPromises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading skins from file:', error);
        process.exit(0);
    }
};
