db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "username", "email", "password"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string(uuid) and is required"
                },
                username: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },

            }
        }
    }
});
db.users.createIndex({email: 1}, {unique: true});
