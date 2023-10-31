import {ISkin} from "../models/skin.model";
import fs from "fs";

export const getSkinsFromFile = (): ISkin[] => {
    const skinsJson = fs.readFileSync("path_to_skins.json", "utf-8");
    const skins: ISkin[] = JSON.parse(skinsJson);
    return skins;
};
