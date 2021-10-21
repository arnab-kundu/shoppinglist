db.createCollection("products", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "name", "group", "category", "price", "price_without_discount", "count", "availability", "review", "short_description", "long_description", "image_url"],
            properties: {
                id: {
                    bsonType: "int",
                    description: "must be a int and is required"
                },
                name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                group: {
                    enum: ["Men", "Women", "Kids", "Sports", "Digital", "Furniture", null],
                    description: "can only be one of the enum values and is required"
                },
                category: {
                    enum: ["Casual", "Sports", "Formal", "Standard", "T-Shirts", "Shirts", "Jeans", "Trousers", "Sleep Wear", "Sandals", "Loafers", "Kurta & Kurti", "Sarees", "Shoes", "Rings", "Earrings", "Jewellery Sets", "Lockets", "Polo T-Shirts", "SKirts", "Jackets", "Tops", "Make Up", "Hair Care", "Perfumes", "Skin Care", "Hand Bags", "Single Bags", "Travel Bags", "Wallets & Belts", "Sunglases", "Nail", "Camera", "Mobile", "Tablet", "Laptop", "Accessories", null],
                    description: "can only be one of the enum values and is required"
                },
                price: {
                    bsonType: ["int"],
                    description: "must be a double if the field exists"
                },
                price_without_discount: {
                    bsonType: ["int"],
                    description: "must be a double if the field exists"
                },
                count: {
                    bsonType: ["int"],
                    description: "must be an int and is required"
                },
                availability: {
                    enum: ["In Stock", "Out of Stock", "Comming Soon"],
                    description: "must be required"
                },
                review: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 5,
                    description: "must be an int in[1 to 5] and is required"
                },
                short_description: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                long_description: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                image_url: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },

            }
        }
    }
});
db.products.createIndex({id: 1}, {unique: true});
db.products.insertMany([`products.json`]);