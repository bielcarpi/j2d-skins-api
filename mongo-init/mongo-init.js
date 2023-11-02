db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [
        {
            role: "dbOwner",
            db: "j2d-skins-api",
        },
    ],
});
