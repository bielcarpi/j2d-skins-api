import {Request, Response} from 'express';
import {SkinModel} from "../models/skin.model";
import {UserSkin} from "../models/user_skin.model";

export const getAvailableSkins = async (req: Request, res: Response) => {
    try {
        // Get all skins
        const skins = await SkinModel.find({});
        res.status(200).json(skins);
    } catch (error) {
        console.log(error);
        res.status(500).send('An internal error occurred');
    }
};

export const buySkin = async (req: Request, res: Response) => {
    const {skinId} = req.body;

    // @ts-ignore (we know req has a user property because we added it in the auth middleware)
    const userId = req.user.id;

    try {
        // Check if the user already owns the skin
        const alreadyOwnedSkin = await UserSkin.find({skin: skinId, user: userId});

        // If the user already owns the skin, return a 409 - Conflict
        if (alreadyOwnedSkin.length > 0) {
            return res.status(409).send("User already owns this skin.");
        }

        // Check if the skin exists, and get its color
        const skin = await SkinModel.findById(skinId);
        const color = skin?.color;

        // If the skin doesn't exist, return a 404 - Not Found
        if (!color) {
            return res.status(404).send("Skin not found.");
        }

        // Otherwise, create a new UserSkin
        await UserSkin.create({
            user: userId,
            skin: skinId,
            color: color
        });

        // Return a 201 - Created
        res.status(201).json({message: "Skin purchased successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).send('An internal error occurred');
    }

};

export const getMySkins = async (req: Request, res: Response) => {
    // @ts-ignore (we know req has a user property because we added it in the auth middleware)
    const userId = req.user.id;

    try {
        // Find the UserSkin by ID and ensure it belongs to the current user
        const userSkins = await UserSkin.find({user: userId});

        // If the user has no skins, return a 404
        if (userSkins.length == 0) {
            return res.status(404).json({message: "No skins found for user."});
        }

        // Otherwise, return a 200 - OK, with the user's skins
        res.status(200).json(userSkins);
    } catch (error) {
        console.log(error);
        res.status(500).send('An internal error occurred');
    }
};

export const changeSkinColor = async (req: Request, res: Response) => {
    const {userSkinId, newColor} = req.body;
    // @ts-ignore (we know req has a user property because we added it in the auth middleware)
    const userId = req.user.id;

    try {
        // Find the UserSkin by ID and ensure it belongs to the current user
        const userSkin = await UserSkin.findOne({_id: userSkinId, user: userId});

        if (!userSkin) {
            return res.status(404).json({message: "Skin not found or not owned by user."});
        }

        // Update the user-specific skin color
        userSkin.color = newColor;
        await userSkin.save();

        res.status(200).json(userSkin);
    } catch (error) {
        console.log(error);
        res.status(500).send('An internal error occurred');
    }
};


export const deleteSkin = async (req: Request, res: Response) => {
    const {userSkinId} = req.body;
    // @ts-ignore (we know req has a user property because we added it in the auth middleware)
    const userId = req.user.id;

    try {
        // Find the UserSkin by ID and ensure it belongs to the current user
        const deletedSkin = await UserSkin.findOneAndDelete({_id: userSkinId, user: userId});

        // If the skin doesn't exist or doesn't belong to the user, return a 404
        if (!deletedSkin) {
            return res.status(404).send('Skin not found');
        }

        // Otherwise, return a 200 - OK
        res.status(200).json(deletedSkin);
    } catch (error) {
        console.log(error);
        res.status(500).send('An internal error occurred');
    }
};

export const getSkin = async (req: Request, res: Response) => {
    const {skinId} = req.body;

    try {
        const skin = await SkinModel.findById(skinId);
        res.status(200).json(skin);
    } catch (error) {
        console.log(error);
        res.status(500).send('An internal error occurred');
    }
};
